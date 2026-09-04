#!/usr/bin/env node
/**
 * Build-time prerendering.
 *
 * Every public URL in public/sitemap.xml is rendered in headless Chromium
 * against the built `dist/` output and written back as a real HTML file
 * (`dist/<route>/index.html`). Crawlers that do not execute JavaScript
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
const HOME_TITLE = "Highlander Building Services | Western NC";
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
  "/realwork-diagnostics",
];

/**
 * Noindex funnel routes that are deliberately absent from sitemap.xml but must
 * still be prerendered, so the server emits their own title, canonical, og:url
 * and `noindex,nofollow` instead of falling back to the homepage shell.
 */
const NOINDEX_ROUTES = [
  "/roofing-intake",
  "/construction-intake",
  "/design-intake",
  "/roofing-builder",
  "/construction-builder",
  // Removed from sitemap.xml (it carries noindex) but still publicly reachable.
  "/construction/consultation",
];

const isExcluded = (p) =>
  EXCLUDED_PREFIXES.some((x) => p === x || p.startsWith(`${x}/`));

/** Third-party origins blocked during prerender: faster, and no tracking markup. */
const BLOCKED_HOSTS = [
  "googletagmanager.com",
  "google-analytics.com",
  "connect.facebook.net",
  "analytics.tiktok.com",
  "snap.licdn.com",
  "app.realworklabs.com",
  "maps.googleapis.com",
  "veluxsolutions.com",
  "supabase.co",
  "fonts.googleapis.com",
  "fonts.gstatic.com",
];

// ---------------------------------------------------------------- routes
function routesFromSitemap() {
  const xml = readFileSync(resolve("public/sitemap.xml"), "utf8");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const paths = locs.map((l) => new URL(l).pathname.replace(/\/+$/, "") || "/");
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
  // Trailing-slash form — matches the URL the server serves, the sitemap and
  // og:url, so a crawler never follows a redirect from the canonical.
  const canonical =
    route === "/__404"
      ? null
      : route === "/"
        ? `${BASE_URL}/`
        : `${BASE_URL}${route.toLowerCase().replace(/\/+$/, "")}/`;

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

  if (!/<html[^>]*\slang=/i.test(html)) {
    html = html.replace(/<html/i, '<html lang="en"');
  }

  html = html.replace(
    /<\/head>/i,
    `  <meta name="prerendered-at" content="${new Date().toISOString()}">\n</head>`,
  );

  return `<!doctype html>\n${html}`;
}

function outPathFor(route) {
  if (route === "/") return join(DIST, "index.html");
  if (route === "/__404") return join(DIST, "404.html");
  return join(DIST, route.replace(/^\//, ""), "index.html");
}

// ------------------------------------------------------------------- run
async function renderRoute(context, route) {
  const started = Date.now();
  const page = await context.newPage();
  let status = "ok";
  try {
    await page.goto(`${ORIGIN}${route === "/__404" ? "/__404" : route}`, {
      waitUntil: "domcontentloaded",
      timeout: PAGE_TIMEOUT_MS,
    });
    await page.waitForFunction(
      ([homeTitle, isHome]) => {
        const root = document.getElementById("root");
        const hasH1 = !!root && !!root.querySelector("h1");
        const titleReady = isHome || document.title !== homeTitle;
        return hasH1 && titleReady;
      },
      [HOME_TITLE, route === "/"],
      { timeout: PAGE_TIMEOUT_MS },
    );
    // SEOHead injects its JSON-LD in an effect — make sure it landed before we
    // snapshot, otherwise the page ships without its structured data.
    await page
      .waitForSelector("script[data-seo-ld]", { state: "attached", timeout: 15_000 })
      .catch(() => {});
    await page
      .waitForLoadState("networkidle", { timeout: 5_000 })
      .catch(() => {});


    const html = await page.evaluate(() => document.documentElement.outerHTML);
    const out = outPathFor(route);
    mkdirSync(resolve(out, ".."), { recursive: true });
    writeFileSync(out, postProcess(html, route));
  } catch (err) {
    status = `SKIPPED (${err.message.split("\n")[0]})`;
  } finally {
    await page.close();
  }
  return { route, ms: Date.now() - started, status };
}

async function runPool(context, routes, results) {
  let i = 0;
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (i < routes.length) {
      const route = routes[i++];
      const r = await renderRoute(context, route);
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

  let all = routesFromSitemap();
  // PRERENDER_LIMIT=n renders only the first n routes — for local smoke tests.
  const limit = Number(process.env.PRERENDER_LIMIT || 0);
  if (limit > 0) all = all.slice(0, limit);
  const routes = [...all, ...NOINDEX_ROUTES.filter((r) => !all.includes(r)), "/__404"];
  const blogRoutes = routes.filter((r) => r.startsWith("/blog/"));
  const coreRoutes = routes.filter((r) => !r.startsWith("/blog/"));

  console.log(
    `prerender: ${routes.length} routes (${coreRoutes.length} core, ${blogRoutes.length} blog) @ ${CONCURRENCY} pages`,
  );

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
  await runPool(context, coreRoutes, results);

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
      runPool(context, blogRoutes.filter((_, i) => i % 2 === 0), results),
      runPool(extra, blogRoutes.filter((_, i) => i % 2 === 1), results),
    ]);
    await extra.close();
  } else {
    await runPool(context, blogRoutes, results);
  }

  await browser.close();
  server.close();

  const total = Date.now() - t0;
  const ok = results.filter((r) => r.status === "ok");
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
  if (ok.length < results.length) {
    console.warn(`  ⚠ ${results.length - ok.length} route(s) skipped — see warnings above.`);
  }
}

main().catch((e) => {
  console.error("prerender failed:", e);
  process.exit(1);
});
