// Deployment drift monitor.
// Compares the build fingerprint served by highlandernc.com (/build-info.json)
// against the newest commit on GitHub (main + any edit/** branches). If the live
// site is serving an older build than the current source, it posts an alert to
// the Highlander Teams channel. Runs on a schedule (pg_cron) and can be invoked
// manually with the admin secret.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-admin-secret",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SITE = "https://highlandernc.com";
const OWNER = "joaobogo";
const REPO = "western-wnc-dominate";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY") ?? "";
const GITHUB_API_KEY = Deno.env.get("GITHUB_API_KEY") ?? "";
const TEAMS_API_KEY = Deno.env.get("MICROSOFT_TEAMS_API_KEY") ?? "";
const ADMIN_SECRET = Deno.env.get("SEO_ADMIN_SECRET") ?? "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const GH_GATEWAY = "https://connector-gateway.lovable.dev/github";
const TEAMS_GATEWAY = "https://connector-gateway.lovable.dev/microsoft_teams";
const TEAM_ID =
  Deno.env.get("TEAMS_TEAM_ID") ?? "23502890-88dc-4bf9-9c15-7257018e2a47";
const CHANNEL_ID =
  Deno.env.get("TEAMS_CHANNEL_ID") ??
  "19:nIJeqUKA79SIyW6vfYoNvVKUzc1Vv-DAZzuT-erYcl01@thread.tacv2";

// A deploy needs time to build. Only alert once the newest commit is older than
// this, so a normal in-flight Netlify build never triggers a false alarm.
const GRACE_MINUTES = Number(Deno.env.get("DRIFT_GRACE_MINUTES") ?? "25");
// Don't re-alert about the same drift more often than this.
const REALERT_HOURS = 6;

function esc(v: unknown): string {
  return String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function eastern(iso?: string | null): string {
  const d = iso ? new Date(iso) : new Date();
  return d.toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "medium",
    timeStyle: "short",
  });
}

async function gh(path: string) {
  const res = await fetch(`${GH_GATEWAY}${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": GITHUB_API_KEY,
    },
  });
  if (!res.ok) {
    const detail = await res.text();
    console.error(`GitHub request failed [${res.status}] ${path}: ${detail}`);
    throw new Error(`[${res.status}] ${detail}`);
  }
  return await res.json();
}

async function postToTeams(html: string) {
  if (!LOVABLE_API_KEY || !TEAMS_API_KEY) {
    throw new Error("Microsoft Teams connection is not configured");
  }
  const res = await fetch(
    `${TEAMS_GATEWAY}/teams/${TEAM_ID}/channels/${CHANNEL_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": TEAMS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body: { contentType: "html", content: html } }),
    },
  );
  if (!res.ok) {
    const detail = await res.text();
    console.error(`Teams post failed [${res.status}]: ${detail}`);
    throw new Error(`[${res.status}] ${detail}`);
  }
}

type LiveBuild = {
  commit: string;
  branch: string;
  builtAt: string | null;
  reachable: boolean;
  note?: string;
};

async function readLiveBuild(): Promise<LiveBuild> {
  try {
    const res = await fetch(`${SITE}/build-info.json?ts=${Date.now()}`, {
      headers: { "Cache-Control": "no-cache" },
    });
    if (!res.ok) {
      return {
        commit: "",
        branch: "",
        builtAt: null,
        reachable: false,
        note: `build-info.json returned ${res.status}`,
      };
    }
    const text = await res.text();
    // A SPA fallback would return index.html instead of JSON.
    if (text.trim().startsWith("<")) {
      return {
        commit: "",
        branch: "",
        builtAt: null,
        reachable: false,
        note: "build-info.json is not published yet (HTML fallback returned)",
      };
    }
    const json = JSON.parse(text);
    return {
      commit: String(json.commit ?? ""),
      branch: String(json.branch ?? ""),
      builtAt: json.builtAt ?? null,
      reachable: true,
    };
  } catch (err) {
    return {
      commit: "",
      branch: "",
      builtAt: null,
      reachable: false,
      note: `fetch failed: ${err instanceof Error ? err.message : "unknown"}`,
    };
  }
}

async function newestSourceCommit() {
  const detail = async (branch: string, ref: string) => {
    const c = await gh(`/repos/${OWNER}/${REPO}/commits/${ref}`);
    return {
      branch,
      sha: String(c.sha),
      date: String(c.commit?.committer?.date ?? c.commit?.author?.date ?? ""),
      message: String(c.commit?.message ?? "").split("\n")[0],
    };
  };

  // main is the branch the host builds from — always resolve it directly
  // instead of paging through the (hundreds of) Lovable sync branches.
  const main = await detail("main", "main");

  // Find the newest un-merged work branch. Lovable sync branches encode an
  // epoch in the name (lovable-sync-<epoch>), so we can rank cheaply and only
  // fetch commit detail for the single best candidate.
  let candidates: Array<{ name: string; sha: string; rank: number }> = [];
  for (let page = 1; page <= 5; page++) {
    const branches: Array<{ name: string; commit: { sha: string } }> = await gh(
      `/repos/${OWNER}/${REPO}/branches?per_page=100&page=${page}`,
    );
    if (!Array.isArray(branches) || branches.length === 0) break;
    for (const b of branches) {
      const m = /^(?:edit\/.*?|lovable-sync-)(\d{9,})$/.exec(b.name);
      if (b.name.startsWith("lovable-sync-") || b.name.startsWith("edit/")) {
        candidates.push({
          name: b.name,
          sha: b.commit.sha,
          rank: m ? Number(m[1]) : 0,
        });
      }
    }
    if (branches.length < 100) break;
  }
  candidates.sort((a, b) => b.rank - a.rank);
  const top = candidates[0] ?? null;
  const latestSource = top ? await detail(top.name, top.sha) : null;

  // Newest = whichever of main / newest work branch has the later commit date.
  const all = [main, ...(latestSource ? [latestSource] : [])];
  all.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  return { newest: all[0] ?? null, main, latestSource, all };
}

// The pg_cron scheduler authenticates with a private token stored in the
// backend-only internal_config table (never exposed to the browser).
async function isSchedulerToken(provided: string): Promise<boolean> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/internal_config?select=value&key=eq.drift_check_token&limit=1`,
      {
        headers: {
          apikey: SERVICE_ROLE,
          Authorization: `Bearer ${SERVICE_ROLE}`,
        },
      },
    );
    if (!res.ok) return false;
    const rows = await res.json();
    const token = Array.isArray(rows) && rows[0]?.value ? String(rows[0].value) : "";
    return token.length > 0 && token === provided;
  } catch {
    return false;
  }
}

async function recordAndShouldAlert(
  supabaseFetch: typeof fetch,
  deployed: string,
  expected: string,
) {
  const since = new Date(Date.now() - REALERT_HOURS * 3600_000).toISOString();
  const q =
    `${SUPABASE_URL}/rest/v1/deploy_drift_alerts?select=id&expected_commit=eq.${expected}` +
    `&deployed_commit=eq.${deployed || "unknown"}&created_at=gte.${since}&limit=1`;
  const res = await supabaseFetch(q, {
    headers: {
      apikey: SERVICE_ROLE,
      Authorization: `Bearer ${SERVICE_ROLE}`,
    },
  });
  const rows = res.ok ? await res.json() : [];
  if (Array.isArray(rows) && rows.length > 0) return false;

  await supabaseFetch(`${SUPABASE_URL}/rest/v1/deploy_drift_alerts`, {
    method: "POST",
    headers: {
      apikey: SERVICE_ROLE,
      Authorization: `Bearer ${SERVICE_ROLE}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      deployed_commit: deployed || "unknown",
      expected_commit: expected,
    }),
  });
  return true;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const provided = req.headers.get("x-admin-secret") ?? "";
  const authorized =
    (!!ADMIN_SECRET && provided === ADMIN_SECRET) ||
    (provided.length > 0 && (await isSchedulerToken(provided)));
  if (!authorized) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json().catch(() => ({} as Record<string, unknown>));
    const dryRun = body?.dry_run === true;

    const [live, source] = await Promise.all([
      readLiveBuild(),
      newestSourceCommit(),
    ]);

    const newest = source.newest;
    if (!newest) throw new Error("No branches found on GitHub");

    const ageMinutes = (Date.now() - Date.parse(newest.date)) / 60000;
    const inSync = live.reachable && live.commit === newest.sha;
    const withinGrace = ageMinutes < GRACE_MINUTES;

    // Drift = live build isn't the newest source commit, and the newest commit
    // has had enough time to build and deploy.
    const drift = !inSync && !withinGrace;

    const result = {
      checked_at: new Date().toISOString(),
      site: SITE,
      live: live,
      newest_commit: newest,
      main_commit: source.main,
      newest_commit_age_minutes: Math.round(ageMinutes),
      in_sync: inSync,
      within_grace_period: withinGrace,
      drift,
      alerted: false as boolean,
    };

    if (drift && !dryRun) {
      const shouldAlert = await recordAndShouldAlert(fetch, live.commit, newest.sha);
      if (shouldAlert) {
        const reason = live.reachable
          ? `Live build is <b>${esc(live.commit.slice(0, 7))}</b> (${esc(live.branch)}), built ${esc(eastern(live.builtAt))}.`
          : `Could not read the live build fingerprint — ${esc(live.note ?? "unknown reason")}.`;
        const html =
          `<h3>🚨 Deployment drift on highlandernc.com</h3>` +
          `<p>${reason}</p>` +
          `<ul>` +
          `<li><b>Expected commit:</b> ${esc(newest.sha.slice(0, 7))} on <b>${esc(newest.branch)}</b></li>` +
          `<li><b>Commit message:</b> ${esc(newest.message)}</li>` +
          `<li><b>Committed:</b> ${esc(eastern(newest.date))} (${Math.round(ageMinutes)} min ago)</li>` +
          `<li><b>main HEAD:</b> ${esc(source.main?.sha.slice(0, 7) ?? "unknown")}</li>` +
          `</ul>` +
          `<p>The site is serving an older build. Check that the edit branch merged into <b>main</b> and that the Netlify build succeeded.</p>` +
          `<p><i>Automated deployment drift check.</i></p>`;
        await postToTeams(html);
        result.alerted = true;
      }
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("deploy-drift-check failed:", err);
    return new Response(JSON.stringify({ error: "Drift check failed" }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
