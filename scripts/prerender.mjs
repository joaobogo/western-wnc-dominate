#!/usr/bin/env node
/**
 * Build-time prerendering.
 *
 * Every route in public/prerender-manifest.json (written in prebuild by
 * scripts/generate-prerender-manifest.ts: the sitemap URLs plus the noindex
 * coverage pages, county hubs and funnel steps) is rendered in headless
 * Chromium against the built `dist/` output and written back as a real HTML
 * file (`dist/<route>.html`, so the host serves `/<route>` directly with no
 * trailing-slash redirect; "/" → dist/index.html). Crawlers that do not execute JavaScript
 * (OAI-SearchBot, PerplexityBot, ClaudeBot, social scrapers) therefore see
 * the route's own <title>, description, canonical, JSON-LD and <h1>.
 *
 * React still boots on top of the snapshot (src/main.tsx hydrates when
 * #root already has children), so the SPA behaves exactly as before.
 *
 * Run: node scripts/prerender.mjs   (wired as npm "postbuild")
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";
import { createServer } from "node:http";
import { chromium } from "playwright";

const DIST = resolve("dist");
const PORT = Number(process.env.PRERENDER_PORT || 4173);
const ORIGIN = `http://127.0.0.1:${PORT}`;
const BASE_URL = "https://highlandernc.com";
const CONCURRENCY = Number(process.env.PRERENDER_CONCURRENCY || 6);
const PAGE_TIMEOUT_MS = 20_000;
const SOFT_BUDGET_MS = 10 * 60 * 1000;

/** App-only paths that must never be prerendered (noindex / form funnels / admin). */
const EXCLUDED_PREFIXES = [
  "/admin",
  "/lp",
  "/.lovable",
  "/front-desk",
  "/intake",
  "/consultation",
  "/quote-flow",
  "/seo-monitoring",
];

// The noindex funnel routes that used to be listed here (NOINDEX_ROUTES) now
// live in scripts/generate-prerender-manifest.ts, so there is one list of
// "routes that must exist as HTML" and it ships as public/prerender-manifest.json.

const isExcluded = (p) =>
  EXCLUDED_PREFIXES.some((x) => p === x || p.startsWith(`${x}/`));

/** Third-party origins blocked during prerender: faster, and no tracking markup. */
const BLOCKED_HOSTS = [
  "googletagmanager.com",
  "google-analytics.com",
  "connect.facebook.net",
  "analytics.tiktok.com",
  "snap.licdn.com",
  "maps.googleapis.com",
  "app.realworklabs.com",
  "veluxsolutions.com",
  "supabase.co",
  "fonts.googleapis.com",
  "fonts.gstatic.com",
];

// ---------------------------------------------------------------- routes
function routesFromManifest() {
  const file = resolve("public/prerender-manifest.json");
  if (!existsSync(file)) {
    console.error(
      "prerender: public/prerender-manifest.json missing — run `bun scripts/generate-prerender-manifest.ts` (prebuild does this after generate-sitemap).",
    );
    process.exit(1);
  }
  const manifest = JSON.parse(readFileSync(file, "utf8"));
  const paths = (manifest.routes || []).map((p) => p.replace(/\/+$/, "") || "/");
  return [...new Set(paths)].filter((p) => !isExcluded(p));
}

// ---------------------------------------------------------- static server
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

function startServer() {
  const server = createServer((req, res) => {
    const url = new URL(req.url, ORIGIN);
    const filePath = join(DIST, decodeURIComponent(url.pathname));
    const ext = url.pathname.slice(url.pathname.lastIndexOf("."));
    if (MIME[ext] && existsSync(filePath)) {
      res.writeHead(200, { "content-type": MIME[ext] });
      res.end(readFileSync(filePath));
      return;
    }
    // SPA fallback — every route serves the shell, React renders it.
    res.writeHead(200, { "content-type": MIME[".html"] });
    res.end(readFileSync(join(DIST, "index.html")));
  });
  return new Promise((ok) => server.listen(PORT, "127.0.0.1", () => ok(server)));
}

// ------------------------------------------------------------ post-process
function postProcess(html, route) {
  // No trailing slash — the one URL shape used by internal links, the sitemap,
  // og:url and the file the host serves, so a crawler never follows a redirect
  // from the canonical. The homepage is always "/".
  const canonical =
    route === "/__404"
      ? null
      : route === "/"
        ? `${BASE_URL}/`
        : `${BASE_URL}${route.toLowerCase().replace(/\/+$/, "")}`;

  // Exactly one canonical, self-referencing.
  const canonicalTag = canonical
    ? `<link rel="canonical" href="${canonical}">`
    : "";
  let seenCanonical = false;
  html = html.replace(/<link[^>]+rel="canonical"[^>]*>/gi, () => {
    if (seenCanonical || !canonicalTag) return "";
    seenCanonical = true;
    return canonicalTag;
  });
  if (canonicalTag && !seenCanonical) {
    html = html.replace(/<\/head>/i, `  ${canonicalTag}\n</head>`);
  }

  // Keep only the first injected SEOHead JSON-LD node (static Organization +
  // WebSite scripts in index.html carry no data-seo-ld and are untouched).
  let seenLd = false;
  html = html.replace(
    /<script[^>]*data-seo-ld[^>]*>[\s\S]*?<\/script>/gi,
    (m) => {
      if (seenLd) return "";
      seenLd = true;
      return m;
    },
  );

  // The inline loaders in index.html (GTM, RealWork Labs) insert their
  // <script src> tags at runtime; those inserted tags were being frozen into
  // the snapshot, so every visitor's browser loaded each vendor twice — once
  // from the static tag, once from the inline snippet. Strip any script whose
  // host is a blocked third party; the snippet re-adds it on the real page.
  html = html.replace(
    /<script\b[^>]*\bsrc="https?:\/\/([^/"]+)[^"]*"[^>]*>\s*<\/script>\s*/gi,
    (m, host) => (BLOCKED_HOSTS.some((h) => host === h || host.endsWith(`.${h}`)) ? "" : m),
  );

  if (!/<html[^>]*\slang=/i.test(html)) {
    html = html.replace(/<html/i, '<html lang="en"');
  }

  html = html.replace(
    /<\/head>/i,
    `  <meta name="prerendered-at" content="${new Date().toISOString()}">\n</head>`,
  );

  return `<!doctype html>\n${html}`;
}

// dist/<route>.html (not dist/<route>/index.html): with Netlify's default
// pretty-URL handling a file at service-areas/franklin-nc.html is served for
// /service-areas/franklin-nc with a 200 and no redirect, while
// /service-areas/franklin-nc/ is 301'd to the slash-less form. A folder
// index.html would do the opposite and force a redirect on every internal link.
function outPathFor(route) {
  if (route === "/") return join(DIST, "index.html");
  if (route === "/__404") return join(DIST, "404.html");
  return join(DIST, `${route.replace(/^\//, "").replace(/\/+$/, "")}.html`);
}

// ------------------------------------------------------------------- run
const TITLE_NOT_APPLIED = "SKIPPED (title not applied)";
/** How long a lazy-loaded section may keep its placeholder before the route is failed. */
const LAZY_TIMEOUT_MS = 20_000;

/**
 * The static <title> and <meta name="description"> of the SPA shell
 * (dist/index.html), read at runtime. A non-home route is only ready once
 * SEOHead has replaced BOTH with the route's own values — comparing against a
 * hard-coded constant silently broke the moment index.html's title changed,
 * and pages were snapshotted with the homepage head.
 */
function readStaticHead() {
  const shell = readFileSync(join(DIST, "index.html"), "utf8");
  const title = (shell.match(/<title>([^<]*)<\/title>/i) || [, ""])[1].trim();
  const description = (shell.match(/<meta\s+name="description"\s+content="([^"]*)"/i) || [, ""])[1].trim();
  if (!title) throw new Error("dist/index.html has no static <title> to compare against.");
  return { title, description };
}

async function renderRoute(context, route, staticHead) {
  const started = Date.now();
  const page = await context.newPage();
  const isHome = route === "/";
  let status = "ok";
  try {
    await page.goto(`${ORIGIN}${route === "/__404" ? "/__404" : route}`, {
      waitUntil: "domcontentloaded",
      timeout: PAGE_TIMEOUT_MS,
    });

    // Readiness. Non-home routes: title AND description differ from the static
    // shell, SEOHead's JSON-LD node is attached, and an <h1> exists inside
    // #root. The homepage legitimately keeps the shell's title/description, so
    // it waits for the <h1> and the JSON-LD node only.
    // The 404 page is the one route that emits no JSON-LD node by design.
    const needsLd = route !== "/__404";
    const ready = await page
      .waitForFunction(
        ([staticTitle, staticDescription, home, wantLd]) => {
          const root = document.getElementById("root");
          const hasH1 = !!root && !!root.querySelector("h1");
          const hasLd = !wantLd || !!document.querySelector("script[data-seo-ld]");
          if (home) return hasH1 && hasLd;
          const desc = document.querySelector('meta[name="description"]');
          const titleReady = document.title.trim() !== staticTitle;
          const descReady = !!desc && (desc.getAttribute("content") || "").trim() !== staticDescription;
          return hasH1 && titleReady && descReady && hasLd;
        },
        [staticHead.title, staticHead.description, isHome, needsLd],
        { timeout: PAGE_TIMEOUT_MS },
      )
      .then(() => true)
      .catch(() => false);

    if (!ready) {
      // Timed out. Pages without a JSON-LD node (the 404 page) still get a
      // snapshot as long as their own head landed; the post-check below
      // decides whether the title was applied.
      const hasH1 = await page.evaluate(() => !!document.querySelector("#root h1"));
      if (!hasH1) throw new Error(`no <h1> inside #root after ${PAGE_TIMEOUT_MS / 1000}s`);
    }
    await page.waitForLoadState("networkidle", { timeout: 5_000 }).catch(() => {});

    // Lazy below-the-fold sections (Suspense fallbacks marked
    // data-prerender-pending, see Index.tsx) carry SEO content — FAQ questions,
    // town and footer links. The snapshot must not be taken while any
    // placeholder is still on the page (P3.7 caught the homepage FAQPage being
    // emitted with none of its questions rendered).
    const lazyReady = await page
      .waitForFunction(() => !document.querySelector("[data-prerender-pending]"), null, {
        timeout: LAZY_TIMEOUT_MS,
      })
      .then(() => true)
      .catch(() => false);
    if (!lazyReady) {
      throw new Error(`lazy sections still pending after ${LAZY_TIMEOUT_MS / 1000}s`);
    }

    const html = await page.evaluate(() => document.documentElement.outerHTML);

    // Post-check: a non-home snapshot that still carries the shell's title was
    // captured before SEOHead ran. Never ship it — mark and let main() fail.
    const snapTitle = (html.match(/<title>([^<]*)<\/title>/i) || [, ""])[1].trim();
    if (!isHome && snapTitle === staticHead.title) {
      status = TITLE_NOT_APPLIED;
    } else {
      if (!ready) status = "ok (no JSON-LD node)";
      const out = outPathFor(route);
      mkdirSync(resolve(out, ".."), { recursive: true });
      writeFileSync(out, postProcess(html, route));
    }
  } catch (err) {
    status = `SKIPPED (${err.message.split("\n")[0]})`;
  } finally {
    await page.close();
  }
  return { route, ms: Date.now() - started, status };
}

async function runPool(context, routes, results, staticHead) {
  let i = 0;
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (i < routes.length) {
      const route = routes[i++];
      const r = await renderRoute(context, route, staticHead);
      results.push(r);
      if (r.status !== "ok") console.warn(`  ⚠ ${r.route} — ${r.status}`);
    }
  });
  await Promise.all(workers);
}

async function main() {
  if (!existsSync(join(DIST, "index.html"))) {
    console.error("prerender: dist/index.html missing — run vite build first.");
    process.exit(1);
  }

  let all = routesFromManifest();
  // PRERENDER_LIMIT=n renders only the first n routes — for local smoke tests.
  const limit = Number(process.env.PRERENDER_LIMIT || 0);
  if (limit > 0) all = all.slice(0, limit);
  const routes = [...all, "/__404"];
  const blogRoutes = routes.filter((r) => r.startsWith("/blog/"));
  const coreRoutes = routes.filter((r) => !r.startsWith("/blog/"));

  const staticHead = readStaticHead();
  console.log(
    `prerender: ${routes.length} routes (${coreRoutes.length} core, ${blogRoutes.length} blog) @ ${CONCURRENCY} pages`,
  );
  console.log(`  static shell title: "${staticHead.title}" — non-home routes must replace it before snapshot`);

  const server = await startServer();
  const browser = await chromium.launch(
    // Escape hatch for environments that ship their own Chromium build.
    process.env.PRERENDER_CHROMIUM ? { executablePath: process.env.PRERENDER_CHROMIUM } : {},
  );
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    userAgent:
      "Mozilla/5.0 (compatible; HighlanderPrerender/1.0; +https://highlandernc.com)",
  });
  await context.route("**/*", (r) => {
    const host = new URL(r.request().url()).hostname;
    if (BLOCKED_HOSTS.some((h) => host === h || host.endsWith(`.${h}`))) {
      return r.abort();
    }
    return r.continue();
  });

  const t0 = Date.now();
  const results = [];
  await runPool(context, coreRoutes, results, staticHead);

  // Budget guard: if core alone ate the budget, widen the pool for blog posts
  // so the whole build still fits inside Netlify's limit.
  if (Date.now() - t0 > SOFT_BUDGET_MS / 2) {
    const extra = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    await extra.route("**/*", (r) => {
      const host = new URL(r.request().url()).hostname;
      if (BLOCKED_HOSTS.some((h) => host === h || host.endsWith(`.${h}`))) return r.abort();
      return r.continue();
    });
    console.log("prerender: core pass slow — running blog posts in a second pool");
    await Promise.all([
      runPool(context, blogRoutes.filter((_, i) => i % 2 === 0), results, staticHead),
      runPool(extra, blogRoutes.filter((_, i) => i % 2 === 1), results, staticHead),
    ]);
    await extra.close();
  } else {
    await runPool(context, blogRoutes, results, staticHead);
  }

  await browser.close();
  server.close();

  const total = Date.now() - t0;
  const ok = results.filter((r) => r.status.startsWith("ok"));
  const skipped = results.filter((r) => !r.status.startsWith("ok"));
  const titleNotApplied = results.filter((r) => r.status === TITLE_NOT_APPLIED);
  const slow = [...results].sort((a, b) => b.ms - a.ms).slice(0, 10);
  console.log(`\nprerender: ${ok.length}/${results.length} pages in ${(total / 1000).toFixed(1)}s`);
  console.log(
    `  avg ${(results.reduce((s, r) => s + r.ms, 0) / results.length / 1000).toFixed(2)}s/page`,
  );
  console.log("  slowest:");
  for (const r of slow) console.log(`    ${(r.ms / 1000).toFixed(2)}s  ${r.route}`);
  if (total > SOFT_BUDGET_MS) {
    console.warn(`  ⚠ prerender exceeded the ${SOFT_BUDGET_MS / 60000}-minute budget.`);
  }
  if (skipped.length) {
    console.warn(`  ⚠ ${skipped.length} route(s) skipped:`);
    for (const r of skipped) console.warn(`    ${r.route} — ${r.status}`);
  }
  if (titleNotApplied.length) {
    console.error(
      `\nprerender: ${titleNotApplied.length} route(s) were snapshotted with the static shell title — SEOHead never applied. Build failed.`,
    );
    process.exit(1);
  }
  // A skipped route is a missing page on Netlify (no SPA fallback, P1.2/P1.4),
  // so any skip fails the build — the same rule seo:check enforces (P6.1 #11).
  if (skipped.length) {
    console.error(`\nprerender: ${skipped.length} route(s) skipped — every manifest route must be written. Build failed.`);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error("prerender failed:", e);
  process.exit(1);
});
