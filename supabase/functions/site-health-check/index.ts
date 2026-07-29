// Lightweight uptime + content monitor for highlandernc.com.
// Fetches a list of key pages, checks HTTP status, response time, and that
// required content markers are present in the HTML. Also verifies the live
// build fingerprint so "stale content" (an old build still being served) is
// caught. Failures are posted to the Highlander Teams channel, deduplicated so
// the same failure doesn't spam every run. Runs on pg_cron and can be invoked
// manually with the admin secret.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-admin-secret",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SITE = "https://highlandernc.com";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY") ?? "";
const TEAMS_API_KEY = Deno.env.get("MICROSOFT_TEAMS_API_KEY") ?? "";
const ADMIN_SECRET = Deno.env.get("SEO_ADMIN_SECRET") ?? "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const TEAMS_GATEWAY = "https://connector-gateway.lovable.dev/microsoft_teams";
const TEAM_ID =
  Deno.env.get("TEAMS_TEAM_ID") ?? "23502890-88dc-4bf9-9c15-7257018e2a47";
const CHANNEL_ID =
  Deno.env.get("TEAMS_CHANNEL_ID") ??
  "19:nIJeqUKA79SIyW6vfYoNvVKUzc1Vv-DAZzuT-erYcl01@thread.tacv2";

// Alert at most once per this window for the identical set of failures.
const REALERT_HOURS = 3;
// Treat a page as slow (warning, not failure) above this.
const SLOW_MS = 4000;
// A page counts as stale if the build it was served from is older than this
// and no newer build has shipped — surfaced as context, not a hard failure.
const STALE_BUILD_HOURS = Number(Deno.env.get("STALE_BUILD_HOURS") ?? "72");

type Check = {
  path: string;
  label: string;
  /** Case-insensitive strings that MUST appear in the response body. */
  mustContain: string[];
  /** Case-insensitive strings that must NOT appear (banned / broken output). */
  mustNotContain?: string[];
  contentType?: string;
};

// Key pages. Content markers are deliberately structural (nav, phone, headings)
// so they only fail if the page truly broke, not on routine copy edits.
const CHECKS: Check[] = [
  {
    path: "/",
    label: "Homepage",
    mustContain: ["Highlander Roofing", "828-524-7773", "</html>"],
    mustNotContain: ["Lovable Generated Project"],
  },
  {
    path: "/roofing",
    label: "Roofing services hub",
    mustContain: ["Highlander Roofing", "828-524-7773"],
  },
  {
    path: "/service-areas",
    label: "Service areas index",
    mustContain: ["Highlander Roofing"],
  },
  {
    path: "/service-areas/highlands-nc",
    label: "Highlands NC town page",
    mustContain: ["Highlands", "828-524-7773"],
  },
  {
    path: "/service-areas/cashiers-nc",
    label: "Cashiers NC town page",
    mustContain: ["Cashiers", "828-524-7773"],
  },
  {
    path: "/blog",
    label: "Blog index",
    mustContain: ["Highlander Roofing"],
  },
  {
    path: "/blog/highlands-nc-storm-damage-july-28-2026",
    label: "Latest storm-damage post",
    mustContain: ["Highlander Roofing"],
  },
  {
    path: "/contact",
    label: "Contact page",
    mustContain: ["828-524-7773"],
  },
  {
    path: "/sitemap.xml",
    label: "Sitemap",
    mustContain: ["<urlset", "https://highlandernc.com/"],
    contentType: "xml",
  },
  {
    path: "/robots.txt",
    label: "robots.txt",
    mustContain: ["Sitemap:"],
    contentType: "text",
  },
];

function esc(v: unknown): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function eastern(iso?: string | null): string {
  const d = iso ? new Date(iso) : new Date();
  return d.toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "medium",
    timeStyle: "short",
  });
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

type Result = {
  path: string;
  label: string;
  status: number | null;
  ok: boolean;
  ms: number;
  slow: boolean;
  problems: string[];
};

async function runCheck(check: Check): Promise<Result> {
  const started = Date.now();
  const problems: string[] = [];
  let status: number | null = null;
  try {
    const res = await fetch(`${SITE}${check.path}`, {
      headers: {
        "Cache-Control": "no-cache",
        // Identify the monitor so traffic analytics can filter it out.
        "User-Agent": "HighlanderSiteMonitor/1.0 (+https://highlandernc.com)",
      },
      redirect: "follow",
    });
    status = res.status;
    const body = await res.text();

    if (!res.ok) problems.push(`HTTP ${res.status}`);

    if (check.contentType === "xml" || check.contentType === "text") {
      // no SPA-shell check for non-HTML assets
    } else if (body.length < 500) {
      problems.push("response body suspiciously small");
    }

    const hay = body.toLowerCase();
    for (const needle of check.mustContain) {
      if (!hay.includes(needle.toLowerCase())) {
        problems.push(`missing expected content: "${needle}"`);
      }
    }
    for (const needle of check.mustNotContain ?? []) {
      if (hay.includes(needle.toLowerCase())) {
        problems.push(`unexpected content present: "${needle}"`);
      }
    }
  } catch (err) {
    problems.push(
      `request failed: ${err instanceof Error ? err.message : "unknown error"}`,
    );
  }

  const ms = Date.now() - started;
  return {
    path: check.path,
    label: check.label,
    status,
    ok: problems.length === 0,
    ms,
    slow: ms > SLOW_MS,
    problems,
  };
}

async function readBuildInfo() {
  try {
    const res = await fetch(`${SITE}/build-info.json?ts=${Date.now()}`, {
      headers: { "Cache-Control": "no-cache" },
    });
    if (!res.ok) return { available: false as const, note: `HTTP ${res.status}` };
    const text = await res.text();
    if (text.trim().startsWith("<")) {
      return { available: false as const, note: "not published yet" };
    }
    const json = JSON.parse(text);
    const builtAt = json.builtAt ? String(json.builtAt) : null;
    const ageHours = builtAt
      ? (Date.now() - Date.parse(builtAt)) / 3600_000
      : null;
    return {
      available: true as const,
      commit: String(json.commit ?? ""),
      branch: String(json.branch ?? ""),
      builtAt,
      ageHours,
      stale: ageHours !== null && ageHours > STALE_BUILD_HOURS,
    };
  } catch (err) {
    return {
      available: false as const,
      note: err instanceof Error ? err.message : "unknown error",
    };
  }
}

async function isSchedulerToken(provided: string): Promise<boolean> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/internal_config?select=value&key=eq.site_health_token&limit=1`,
      { headers: { apikey: SERVICE_ROLE, Authorization: `Bearer ${SERVICE_ROLE}` } },
    );
    if (!res.ok) return false;
    const rows = await res.json();
    const token = Array.isArray(rows) && rows[0]?.value ? String(rows[0].value) : "";
    return token.length > 0 && token === provided;
  } catch {
    return false;
  }
}

async function recentlyAlerted(failureKey: string): Promise<boolean> {
  const since = new Date(Date.now() - REALERT_HOURS * 3600_000).toISOString();
  const q =
    `${SUPABASE_URL}/rest/v1/site_health_checks?select=id&alerted=is.true` +
    `&failure_key=eq.${encodeURIComponent(failureKey)}&created_at=gte.${since}&limit=1`;
  const res = await fetch(q, {
    headers: { apikey: SERVICE_ROLE, Authorization: `Bearer ${SERVICE_ROLE}` },
  });
  if (!res.ok) return false;
  const rows = await res.json();
  return Array.isArray(rows) && rows.length > 0;
}

async function recordRun(row: Record<string, unknown>) {
  await fetch(`${SUPABASE_URL}/rest/v1/site_health_checks`, {
    method: "POST",
    headers: {
      apikey: SERVICE_ROLE,
      Authorization: `Bearer ${SERVICE_ROLE}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });
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

    const [results, build] = await Promise.all([
      Promise.all(CHECKS.map(runCheck)),
      readBuildInfo(),
    ]);

    const failures = results.filter((r) => !r.ok);
    const slow = results.filter((r) => r.ok && r.slow);
    const buildStale = build.available && build.stale === true;
    const ok = failures.length === 0 && !buildStale;

    // Stable key so identical failures dedupe across runs.
    const failureKey = [
      ...failures.map((f) => `${f.path}:${f.problems.join("|")}`),
      buildStale ? `stale-build:${build.available ? build.commit : ""}` : "",
    ]
      .filter(Boolean)
      .join(" ;; ")
      .slice(0, 500) || "none";

    let alerted = false;
    if (!ok && !dryRun && !(await recentlyAlerted(failureKey))) {
      const rows = failures
        .map(
          (f) =>
            `<li><b>${esc(f.label)}</b> — <code>${esc(f.path)}</code>` +
            ` (${f.status ?? "no response"}, ${f.ms} ms)<br/>` +
            `${esc(f.problems.join("; "))}</li>`,
        )
        .join("");
      const slowRow = slow.length
        ? `<p>⏱ Slow but healthy: ${esc(slow.map((s) => `${s.path} (${s.ms} ms)`).join(", "))}</p>`
        : "";
      const staleRow = buildStale && build.available
        ? `<p>📦 Live build <b>${esc(build.commit.slice(0, 7))}</b> was built ${esc(eastern(build.builtAt))}` +
          ` — ${Math.round(build.ageHours ?? 0)} h old (stale threshold ${STALE_BUILD_HOURS} h).</p>`
        : "";
      const html =
        `<h3>🚨 Site health check failed on highlandernc.com</h3>` +
        (rows ? `<ul>${rows}</ul>` : "") +
        staleRow +
        slowRow +
        `<p>${results.length - failures.length}/${results.length} pages healthy · checked ${esc(eastern())} ET</p>` +
        `<p><i>Automated uptime &amp; content monitor.</i></p>`;
      await postToTeams(html);
      alerted = true;
    }

    await recordRun({
      ok,
      checked_count: results.length,
      failure_count: failures.length,
      failure_key: ok ? null : failureKey,
      build_commit: build.available ? build.commit : null,
      results,
      alerted,
    });

    return new Response(
      JSON.stringify({
        checked_at: new Date().toISOString(),
        site: SITE,
        ok,
        checked: results.length,
        failures: failures.length,
        slow: slow.map((s) => ({ path: s.path, ms: s.ms })),
        build,
        build_stale: buildStale,
        results,
        alerted,
        dry_run: dryRun,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("site-health-check failed:", err);
    return new Response(
      JSON.stringify({
        error: "Site health check failed",
        details: err instanceof Error ? err.message : String(err),
      }),
      {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});