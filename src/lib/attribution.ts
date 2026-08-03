/**
 * First-touch marketing attribution.
 *
 * Captured once on the first page of a session (before any client-side
 * routing happens), persisted to sessionStorage, and attached to every lead
 * payload. Values are first-touch: once a session has a campaign, later
 * navigations never overwrite it — unless the visitor arrives on a *new*
 * campaign link mid-session (a fresh utm_source / click id in the URL), which
 * starts a new touch.
 */

export const ATTRIBUTION_STORAGE_KEY = "hl_attribution";

export type Attribution = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  gclid: string | null;
  fbclid: string | null;
  msclkid: string | null;
  li_fat_id: string | null;
  /** External referrer of the first page in this session (self-referrals ignored). */
  referrer: string | null;
  /** Path (+query) of the first page seen in this session. */
  landing_page: string | null;
  /** Absolute URL of the first page seen in this session. */
  landing_url: string | null;
  /** ISO timestamp of the first page view in this session. */
  first_seen_at: string | null;
};

const EMPTY: Attribution = {
  utm_source: null,
  utm_medium: null,
  utm_campaign: null,
  utm_term: null,
  utm_content: null,
  gclid: null,
  fbclid: null,
  msclkid: null,
  li_fat_id: null,
  referrer: null,
  landing_page: null,
  landing_url: null,
  first_seen_at: null,
};

const CAMPAIGN_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "msclkid",
  "li_fat_id",
] as const;

function clean(v: string | null | undefined): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim().slice(0, 500);
  return t.length ? t : null;
}

function currentParams(): URLSearchParams {
  try {
    return new URLSearchParams(window.location.search);
  } catch {
    return new URLSearchParams();
  }
}

/** document.referrer, but only when it points at another site. */
function externalReferrer(): string | null {
  if (typeof document === "undefined") return null;
  const ref = clean(document.referrer);
  if (!ref) return null;
  try {
    if (new URL(ref).host === window.location.host) return null;
  } catch {
    /* unparseable referrer — keep it as-is */
  }
  return ref;
}

function read(): Attribution {
  if (typeof window === "undefined") return { ...EMPTY };
  try {
    const raw = window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!raw) return { ...EMPTY };
    const parsed = JSON.parse(raw) as Partial<Attribution>;
    return { ...EMPTY, ...parsed };
  } catch {
    return { ...EMPTY };
  }
}

function write(value: Attribution) {
  try {
    window.sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(value));
  } catch {
    /* private mode / storage disabled — attribution degrades to page/referrer only */
  }
}

/**
 * Captures attribution for the current URL.
 *
 * Safe to call on every route change: stored values win, so nothing is lost
 * during client-side navigation. Returns the stored attribution.
 */
export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return { ...EMPTY };

  const stored = read();
  const params = currentParams();
  const fromUrl = Object.fromEntries(
    CAMPAIGN_KEYS.map((k) => [k, clean(params.get(k))]),
  ) as Pick<Attribution, (typeof CAMPAIGN_KEYS)[number]>;

  const urlHasCampaign = CAMPAIGN_KEYS.some((k) => fromUrl[k]);
  const storedHasCampaign = CAMPAIGN_KEYS.some((k) => stored[k]);
  // A campaign link opened mid-session starts a new touch.
  const startNewTouch = urlHasCampaign && !storedHasCampaign;

  const next: Attribution = {
    ...stored,
    ...(startNewTouch ? fromUrl : {}),
    // First page of the session defines the landing page and referrer.
    referrer: stored.referrer ?? externalReferrer(),
    landing_page: stored.landing_page ?? window.location.pathname + window.location.search,
    landing_url: stored.landing_url ?? window.location.href,
    first_seen_at: stored.first_seen_at ?? new Date().toISOString(),
  };

  // Backfill any campaign field the very first capture may have missed.
  for (const k of CAMPAIGN_KEYS) next[k] = next[k] ?? fromUrl[k];

  write(next);
  return next;
}

/** Reads the persisted attribution without touching the current URL. */
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return { ...EMPTY };
  const stored = read();
  // If the session never captured (e.g. storage blocked), derive what we can.
  if (!stored.landing_page) return captureAttribution();
  return stored;
}

/** Current page path + query, used as the submission page on every lead. */
export function currentPagePath(): string | null {
  if (typeof window === "undefined") return null;
  return window.location.pathname + window.location.search;
}
