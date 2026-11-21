// Daily import of Highlander's Google reviews (Franklin and Sylva listings)
// through the Google Business Profile API, into public.google_reviews and
// public.google_review_summary. The website build reads those tables, so new
// reviews, the star rating and the review count stay current on every page.
//
// Review text is stored exactly as Google returns it and never edited.
// Runs on pg_cron with the google_reviews_token, or by hand with the admin
// secret. POST {"dry_run": true} fetches and reports without writing.
//
// Secrets (set in Lovable Cloud):
//   GOOGLE_GBP_CLIENT_ID, GOOGLE_GBP_CLIENT_SECRET, GOOGLE_GBP_REFRESH_TOKEN
//     OAuth client and the refresh token of a Google account that owns or
//     manages both listings (scope https://www.googleapis.com/auth/business.manage).
//   GBP_FRANKLIN_LOCATION, GBP_SYLVA_LOCATION (optional)
//     "accounts/…/locations/…" when automatic matching cannot tell them apart.
//   NETLIFY_BUILD_HOOK_URL (optional)
//     Called after a run that changed something, so the site rebuilds with it.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-admin-secret",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const env = (k: string) => (globalThis as { Deno?: { env: { get(k: string): string | undefined } } }).Deno?.env.get(k) ?? "";
const SUPABASE_URL = env("SUPABASE_URL");
const SERVICE_ROLE = env("SUPABASE_SERVICE_ROLE_KEY");
const ADMIN_SECRET = env("SEO_ADMIN_SECRET");

/** Google Maps CIDs of the two listings (same values as src/data/business.ts). */
export const PROFILE_CIDS: Record<Profile, string> = {
  franklin: "1442261483869937048",
  sylva: "1690022713833215904",
};
export type Profile = "franklin" | "sylva";

export type GbpLocation = {
  name?: string;
  title?: string;
  storefrontAddress?: { locality?: string };
  metadata?: { mapsUri?: string; placeId?: string };
};

export type GbpReview = {
  name?: string;
  reviewId?: string;
  reviewer?: { displayName?: string; isAnonymous?: boolean };
  starRating?: string;
  comment?: string;
  createTime?: string;
  updateTime?: string;
  reviewReply?: { comment?: string };
};

const STARS: Record<string, number> = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };
export const starToNumber = (s?: string): number | null => (s && STARS[s]) || null;

/**
 * Which Highlander listing a Business Profile location is: by its Maps CID
 * first, then by town. Returns null when it is neither (or ambiguous).
 */
export function matchProfile(loc: GbpLocation): Profile | null {
  const uri = loc.metadata?.mapsUri ?? "";
  for (const p of Object.keys(PROFILE_CIDS) as Profile[]) {
    if (uri.includes(PROFILE_CIDS[p])) return p;
  }
  const town = (loc.storefrontAddress?.locality ?? "").trim().toLowerCase();
  if (town === "franklin") return "franklin";
  if (town === "sylva") return "sylva";
  return null;
}

/** A Google review as a google_reviews row. Null when it cannot be stored. */
export function toRow(r: GbpReview, profile: Profile, now: string) {
  const rating = starToNumber(r.starRating);
  const id = r.reviewId || r.name;
  if (!id || !rating || !r.createTime) return null;
  const anonymous = !!r.reviewer?.isAnonymous;
  return {
    review_id: id,
    profile,
    author_name: anonymous ? "A Google user" : (r.reviewer?.displayName || "A Google user").trim(),
    rating,
    comment: r.comment ?? null,
    created_at_google: r.createTime,
    updated_at_google: r.updateTime ?? null,
    has_owner_reply: !!r.reviewReply?.comment,
    removed_at: null,
    last_seen_at: now,
  };
}

async function accessToken(): Promise<string> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: env("GOOGLE_GBP_CLIENT_ID"),
      client_secret: env("GOOGLE_GBP_CLIENT_SECRET"),
      refresh_token: env("GOOGLE_GBP_REFRESH_TOKEN"),
    }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.access_token) throw new Error(`Google sign-in failed (${res.status}): ${json.error ?? "no token"}`);
  return json.access_token;
}

// Google's JSON responses, read field by field below.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Json = Record<string, any>;

async function google(url: string, token: string): Promise<Json> {
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  const text = await res.text();
  if (!res.ok) throw new Error(`Google API ${res.status} on ${new URL(url).pathname}: ${text.slice(0, 300)}`);
  return text ? JSON.parse(text) : {};
}

/** Finds the Franklin and Sylva listings among every account the user manages. */
export async function findLocations(token: string): Promise<Partial<Record<Profile, string>>> {
  const found: Partial<Record<Profile, string>> = {};
  const fixed: Partial<Record<Profile, string>> = {
    franklin: env("GBP_FRANKLIN_LOCATION") || undefined,
    sylva: env("GBP_SYLVA_LOCATION") || undefined,
  };
  if (fixed.franklin && fixed.sylva) return fixed;

  let accountPage = "";
  do {
    const acc = await google(
      `https://mybusinessaccountmanagement.googleapis.com/v1/accounts?pageSize=20${accountPage ? `&pageToken=${accountPage}` : ""}`,
      token,
    );
    for (const a of acc.accounts ?? []) {
      let locPage = "";
      do {
        const locs = await google(
          `https://mybusinessbusinessinformation.googleapis.com/v1/${a.name}/locations?readMask=name,title,storefrontAddress,metadata&pageSize=100${locPage ? `&pageToken=${locPage}` : ""}`,
          token,
        );
        for (const l of (locs.locations ?? []) as GbpLocation[]) {
          const p = matchProfile(l);
          if (p && !found[p] && l.name) found[p] = `${a.name}/${l.name}`;
        }
        locPage = locs.nextPageToken ?? "";
      } while (locPage);
    }
    accountPage = acc.nextPageToken ?? "";
  } while (accountPage);
  return { ...found, ...Object.fromEntries(Object.entries(fixed).filter(([, v]) => v)) };
}

/** Every review on one listing, plus Google's average and total. */
export async function fetchReviews(location: string, token: string) {
  const reviews: GbpReview[] = [];
  let averageRating: number | null = null;
  let totalReviewCount: number | null = null;
  let page = "";
  let guard = 0;
  do {
    const r = await google(
      `https://mybusiness.googleapis.com/v4/${location}/reviews?pageSize=50&orderBy=updateTime%20desc${page ? `&pageToken=${page}` : ""}`,
      token,
    );
    reviews.push(...(r.reviews ?? []));
    if (typeof r.averageRating === "number") averageRating = r.averageRating;
    if (typeof r.totalReviewCount === "number") totalReviewCount = r.totalReviewCount;
    page = r.nextPageToken ?? "";
  } while (page && ++guard < 100);
  return { reviews, averageRating, totalReviewCount };
}

const rest = (path: string, init: RequestInit = {}) =>
  fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SERVICE_ROLE,
      Authorization: `Bearer ${SERVICE_ROLE}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });

async function isSchedulerToken(provided: string): Promise<boolean> {
  try {
    const res = await rest("internal_config?select=value&key=eq.google_reviews_token&limit=1");
    if (!res.ok) return false;
    const rows = await res.json();
    const token = Array.isArray(rows) && rows[0]?.value ? String(rows[0].value) : "";
    return token.length > 0 && token === provided;
  } catch {
    return false;
  }
}

async function knownIds(profile: Profile): Promise<Map<string, string | null>> {
  const res = await rest(`google_reviews?select=review_id,updated_at_google,removed_at&profile=eq.${profile}&limit=5000`);
  const rows = res.ok ? await res.json() : [];
  return new Map(
    (rows as Array<{ review_id: string; updated_at_google: string | null; removed_at: string | null }>)
      .map((r) => [r.review_id, r.removed_at ? "removed" : r.updated_at_google]),
  );
}

async function syncProfile(profile: Profile, location: string, token: string, dryRun: boolean) {
  const now = new Date().toISOString();
  const { reviews, averageRating, totalReviewCount } = await fetchReviews(location, token);
  const rows = reviews.map((r) => toRow(r, profile, now)).filter((r): r is NonNullable<typeof r> => !!r);
  const before = await knownIds(profile);
  const added = rows.filter((r) => !before.has(r.review_id)).length;
  const updated = rows.filter((r) => before.has(r.review_id) && before.get(r.review_id) !== r.updated_at_google).length;
  const seen = new Set(rows.map((r) => r.review_id));
  const gone = [...before.entries()].filter(([id, v]) => !seen.has(id) && v !== "removed").map(([id]) => id);

  if (!dryRun) {
    if (rows.length) {
      const up = await rest("google_reviews?on_conflict=review_id", {
        method: "POST",
        headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
        body: JSON.stringify(rows),
      });
      if (!up.ok) throw new Error(`saving reviews failed: ${(await up.text()).slice(0, 200)}`);
    }
    // Only a complete fetch may mark reviews as gone from Google.
    if (gone.length && reviews.length > 0) {
      for (let i = 0; i < gone.length; i += 100) {
        const ids = gone.slice(i, i + 100).map((id) => `"${id.replace(/"/g, "")}"`).join(",");
        await rest(`google_reviews?review_id=in.(${ids})`, {
          method: "PATCH",
          headers: { Prefer: "return=minimal" },
          body: JSON.stringify({ removed_at: now }),
        });
      }
    }
    await rest("google_review_summary?on_conflict=profile", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify([{ profile, average_rating: averageRating, total_review_count: totalReviewCount, fetched_at: now, last_error: null }]),
    });
  }
  return { profile, location, fetched: reviews.length, added, updated, removed: gone.length, averageRating, totalReviewCount };
}

async function recordError(profile: Profile, message: string) {
  await rest("google_review_summary?on_conflict=profile", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify([{ profile, last_error: message.slice(0, 500), fetched_at: new Date().toISOString() }]),
  }).catch(() => undefined);
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

export async function handle(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  const provided = req.headers.get("x-admin-secret") ?? "";
  const authorized = (!!ADMIN_SECRET && provided === ADMIN_SECRET) || (provided.length > 0 && (await isSchedulerToken(provided)));
  if (!authorized) return json({ error: "Unauthorized" }, 401);

  const missing = ["GOOGLE_GBP_CLIENT_ID", "GOOGLE_GBP_CLIENT_SECRET", "GOOGLE_GBP_REFRESH_TOKEN"].filter((k) => !env(k));
  if (missing.length) return json({ ok: false, error: `Not connected to Google yet. Missing secrets: ${missing.join(", ")}` }, 200);

  const body = await req.json().catch(() => ({} as Record<string, unknown>));
  const dryRun = body?.dry_run === true;
  const results: unknown[] = [];
  const errors: string[] = [];
  let changed = false;
  try {
    const token = await accessToken();
    const locations = await findLocations(token);
    for (const p of ["franklin", "sylva"] as Profile[]) {
      const loc = locations[p];
      if (!loc) {
        const msg = `No Google Business Profile listing found for ${p}. Set GBP_${p.toUpperCase()}_LOCATION.`;
        errors.push(msg);
        if (!dryRun) await recordError(p, msg);
        continue;
      }
      try {
        const r = await syncProfile(p, loc, token, dryRun);
        results.push(r);
        if (r.added || r.updated || r.removed) changed = true;
      } catch (e) {
        const msg = (e as Error).message;
        errors.push(`${p}: ${msg}`);
        if (!dryRun) await recordError(p, msg);
      }
    }
  } catch (e) {
    errors.push((e as Error).message);
  }

  const hook = env("NETLIFY_BUILD_HOOK_URL");
  let rebuild = false;
  if (!dryRun && changed && hook) {
    rebuild = (await fetch(hook, { method: "POST" }).catch(() => null))?.ok ?? false;
  }
  return json({ ok: errors.length === 0, dry_run: dryRun, results, errors, changed, rebuild_requested: rebuild });
}

const D = (globalThis as { Deno?: { serve?: (h: (r: Request) => Promise<Response>) => unknown } }).Deno;
if (D?.serve) D.serve(handle);
