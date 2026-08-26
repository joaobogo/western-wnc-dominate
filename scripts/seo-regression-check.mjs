#!/usr/bin/env node
/**
 * Technical SEO regression checks for Highlander.
 * Runs against the built `dist/` output and the live sitemap.
 *
 * Usage:  node scripts/seo-regression-check.mjs [--base=https://highlandernc.com]
 *
 * Exits non-zero on any hard failure (see FAIL_ON below). Warnings are logged
 * but do not fail the build. Wire into CI via `npm run seo:check` after
 * `vite build`.
 */
import { readFileSync, existsSync, statSync } from "node:fs";
import { resolve } from "node:path";

const BASE = (process.argv.find(a => a.startsWith("--base=")) || "--base=https://highlandernc.com").split("=")[1];
const CANONICAL_HOST = new URL(BASE).host;

const failures = [];
const warnings = [];
const fail = (msg) => failures.push(msg);
const warn = (msg) => warnings.push(msg);

// ---------- 0. Canonical host redirect checks ----------
const redirectsPath = resolve("public/_redirects");
const requiredHostRedirects = [
  "http://highlandernc.com/* https://highlandernc.com/:splat 301!",
  "http://www.highlandernc.com/* https://highlandernc.com/:splat 301!",
  "https://www.highlandernc.com/* https://highlandernc.com/:splat 301!",
];

let activeRedirectRules = [];
if (!existsSync(redirectsPath)) {
  fail("public/_redirects missing.");
} else {
  activeRedirectRules = readFileSync(redirectsPath, "utf8")
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line && !line.startsWith("#"))
    .map(line => line.split(/\s+/).join(" "));

  requiredHostRedirects.forEach((requiredRule, index) => {
    if (activeRedirectRules[index] !== requiredRule) {
      fail(`Canonical host redirect rule ${index + 1} must be the ${index + 1}${index === 0 ? "st" : index === 1 ? "nd" : "rd"} active rule in public/_redirects: ${requiredRule}`);
    }
  });

  const requiredLegacyRules = [
    "/roof-inspection-services /request-inspection 301!",
    "/residential-re-roof-specialists /roofing/roof-replacement 301!",
    "/sylva-nc-showroom /service-areas/sylva-nc 301!",
    "/sylva-nc-roofers-reroofing-repairs /service-areas/sylva-nc 301!",
    "/contact-us_em /contact 301!",
    "/service-locations /service-areas 301!",
    "/service-locations/* /service-areas 301!",
    "/contact/:service/:town /service-areas/:town 301!",
    "/free-tools /404.html 410",
  ];
  for (const rule of requiredLegacyRules) {
    if (!activeRedirectRules.includes(rule)) fail(`Required legacy redirect missing or incorrect: ${rule}`);
  }

  const firstRewrite = activeRedirectRules.findIndex(rule => /\s200$/.test(rule));
  if (firstRewrite >= 0) {
    const lateRedirect = activeRedirectRules.slice(firstRewrite + 1).find(rule => /\s301!$/.test(rule));
    if (lateRedirect) fail(`Legacy 301 appears after an SPA rewrite and will not reliably run: ${lateRedirect}`);
  }
  if (activeRedirectRules.some(rule => rule === "/* /index.html 200"))
    fail("Global SPA fallback /* /index.html 200 creates soft 404s.");
  if (activeRedirectRules.some(rule => rule === "/roof-designer / 301!" || rule === "/free-tools / 301!"))
    fail("Tool URL redirects to the homepage, which search engines may treat as a soft 404.");
}

// Marketing redirects belong at the edge, not in the client router.
const routerSource = readFileSync(resolve("src/App.tsx"), "utf8");
const clientRedirects = [...routerSource.matchAll(/<Route\s+path="([^"]+)"[^\n]*<Navigate/g)]
  .map(match => match[1])
  .filter(path => !path.startsWith("/intake"));
if (clientRedirects.length > 0)
  fail(`Marketing <Navigate> aliases remain in App.tsx: ${clientRedirects.join(", ")}`);

// ---------- 1. index.html static-head checks ----------
const indexHtml = readFileSync(resolve("index.html"), "utf8");

// GTM installed exactly once
const gtmScriptCount = (indexHtml.match(/GTM-W26D39LJ/g) || []).length;
// Expected: 1 in script snippet + 1 in <noscript> iframe = 2 occurrences total.
if (gtmScriptCount !== 2) fail(`GTM occurrences in index.html = ${gtmScriptCount} (expected 2: script + noscript).`);

// No duplicate standalone gtag.js loader (GA4 must flow through GTM)
if (/gtag\/js\?id=G-/.test(indexHtml)) fail("Standalone gtag.js loader present in index.html — GA4 must fire via GTM only.");

// dataLayer created once
const dataLayerInits = (indexHtml.match(/window\.dataLayer\s*=\s*window\.dataLayer\s*\|\|\s*\[\]/g) || []).length;
if (dataLayerInits > 1) fail(`dataLayer initialized ${dataLayerInits} times in index.html.`);

// Title / description / canonical presence
if (!/<title>[^<]{5,}<\/title>/.test(indexHtml)) fail("index.html missing <title>.");
if (!/<meta\s+name="description"\s+content="[^"]{20,}"/.test(indexHtml)) fail("index.html missing meta description.");
if (/Lovable App|Lovable Generated Project/.test(indexHtml)) fail("index.html still contains Lovable template defaults.");

// ---------- 2. robots.txt checks ----------
const robotsPath = resolve("public/robots.txt");
if (!existsSync(robotsPath)) fail("public/robots.txt missing.");
else {
  const robots = readFileSync(robotsPath, "utf8");
  if (/^\s*Disallow:\s*\/\s*$/m.test(robots) && !/User-agent:\s*[^*\n]+/.test(robots))
    fail("robots.txt disallows entire site.");
  // Public money paths must not be blocked
  const mustAllow = ["/roofing", "/service-areas", "/blog", "/construction"];
  for (const p of mustAllow) {
    const re = new RegExp(`^\\s*Disallow:\\s*${p.replace(/\//g, "\\/")}\\s*$`, "m");
    if (re.test(robots)) fail(`robots.txt blocks public path ${p}.`);
  }
  // OAI-SearchBot must not be explicitly blocked (scoped to its own block only)
  const oai = robots.match(/User-agent:\s*OAI-SearchBot[^\n]*\n([\s\S]*?)(?=\n\s*User-agent:|\Z)/i);
  if (oai && /^\s*Disallow:\s*\/\s*$/m.test(oai[1]))
    fail("robots.txt blocks OAI-SearchBot.");
}

// ---------- 3. sitemap.xml checks ----------
const sitemapPath = resolve("public/sitemap.xml");
if (!existsSync(sitemapPath)) fail("public/sitemap.xml missing.");
else {
  const xml = readFileSync(sitemapPath, "utf8");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  if (locs.length === 0) fail("sitemap.xml has zero <loc> entries.");
  const seen = new Set();
  for (const loc of locs) {
    let u;
    try { u = new URL(loc); } catch { fail(`Invalid sitemap URL: ${loc}`); continue; }
    if (u.protocol !== "https:") fail(`Non-HTTPS sitemap URL: ${loc}`);
    if (u.host !== CANONICAL_HOST) fail(`Non-canonical host in sitemap: ${loc} (expected ${CANONICAL_HOST}).`);
    if (u.search) fail(`Sitemap URL contains query params: ${loc}`);
    // Utility routes must not be in sitemap
    const bad = ["/consultation", "/quote-flow", "/roofing-intake", "/construction-intake", "/design-intake", "/admin", "/lp/"];
    if (bad.some(b => u.pathname.startsWith(b))) fail(`Noindex/utility URL in sitemap: ${loc}`);
    if (seen.has(loc)) fail(`Duplicate sitemap URL: ${loc}`);
    seen.add(loc);
  }
}

// ---------- 4. SEOHead component sanity ----------
const seoHeadPath = resolve("src/components/SEOHead.tsx");
if (existsSync(seoHeadPath)) {
  const src = readFileSync(seoHeadPath, "utf8");
  if (!/canonical/i.test(src)) warn("SEOHead.tsx has no canonical logic.");
  if (!/highlandernc\.com/.test(src)) warn("SEOHead.tsx missing canonical host reference.");
}

// ---------- 5. Prerender output checks (run after `npm run build`) ----------
// Skipped when dist/ has not been built yet, so `npm run seo:check` still
// works standalone; enforced hard whenever a build exists.
const HOME_TITLE = "Roofing Company in Franklin, NC | Highlander";
const APP_ONLY_PREFIXES = [
  "/admin", "/lp", "/.lovable", "/front-desk", "/intake", "/consultation", "/roofing-intake",
  "/construction-intake", "/roofing-builder", "/construction-builder",
  "/design-intake", "/quote-flow", "/seo-monitoring", "/realwork-diagnostics",
];

const distIndexPath = resolve("dist/index.html");
const distIsCurrent =
  existsSync(distIndexPath) &&
  existsSync(sitemapPath) &&
  statSync(distIndexPath).mtimeMs >= statSync(sitemapPath).mtimeMs;

if (distIsCurrent) {
  const xml = readFileSync(sitemapPath, "utf8");
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map(m => new URL(m[1]).pathname.replace(/\/+$/, "") || "/")
    .filter(p => !APP_ONLY_PREFIXES.some(x => p === x || p.startsWith(`${x}/`)));

  const fileFor = (p) => (p === "/" ? resolve("dist/index.html") : resolve(`dist${p}/index.html`));
  const present = paths.filter(p => existsSync(fileFor(p)));
  const coverage = paths.length ? present.length / paths.length : 0;
  if (coverage < 0.95)
    fail(`Prerender coverage ${(coverage * 100).toFixed(1)}% (${present.length}/${paths.length}) — below the 95% floor.`);

  if (!existsSync(resolve("dist/404.html"))) fail("dist/404.html missing — NotFound was not prerendered.");

  // Two indexable pages must never share a <title> — duplicate titles are the
  // clearest signal of templated pages competing with each other.
  const titlesSeen = new Map();

  for (const p of present) {
    const html = readFileSync(fileFor(p), "utf8");
    const title = (html.match(/<title>([^<]*)<\/title>/i) || [, ""])[1].trim();
    const robots = (html.match(/<meta[^>]+name="robots"[^>]+content="([^"]*)"/i) || [, ""])[1];
    if (!/noindex/i.test(robots) && title) {
      if (titlesSeen.has(title))
        fail(`Duplicate <title> on indexable pages: "${title}" (${titlesSeen.get(title)} and ${p}).`);
      else titlesSeen.set(title, p);
    }
    if (p !== "/" && title === HOME_TITLE)
      fail(`Prerendered ${p} still carries the homepage <title>.`);

    const canonicals = [...html.matchAll(/<link[^>]+rel="canonical"[^>]*href="([^"]+)"/gi)].map(m => m[1]);
    const expected = p === "/" ? `${BASE}/` : `${BASE}${p}`;
    if (canonicals.length !== 1)
      fail(`Prerendered ${p} has ${canonicals.length} canonical tags (expected exactly 1).`);
    else if (canonicals[0].replace(/\/+$/, "") !== expected.replace(/\/+$/, ""))
      fail(`Prerendered ${p} canonical is ${canonicals[0]} (expected ${expected}).`);

    const h1s = (html.match(/<h1[\s>]/gi) || []).length;
    if (h1s > 1) fail(`Prerendered ${p} has ${h1s} <h1> elements (expected 1).`);
  }

  // Route audit: every public route in the router must be either prerendered
  // or covered by an explicit SPA rewrite / 301 in public/_redirects.
  const appSrc = readFileSync(resolve("src/App.tsx"), "utf8");
  const redirects = readFileSync(resolve("public/_redirects"), "utf8");
  const routeDecls = [...appSrc.matchAll(/<Route\s+path="([^"]+)"\s+element=\{(<[A-Za-z]+)/g)];
  const staticPublicRoutes = routeDecls
    .filter(([, , el]) => el !== "<Navigate")
    .map(([, path]) => path)
    .filter(p => p.startsWith("/") && !p.includes(":") && !p.includes("*"));

  const rewriteCovered = (p) =>
    APP_ONLY_PREFIXES.some(x => p === x || p.startsWith(`${x}/`)) ||
    new RegExp(`^${p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s`, "m").test(redirects);

  const uncovered = [...new Set(staticPublicRoutes)].filter(
    p => !existsSync(fileFor(p.replace(/\/+$/, "") || "/")) && !rewriteCovered(p),
  );
  for (const p of uncovered)
    fail(`Public route ${p} is neither prerendered nor covered by a rewrite/redirect.`);
}


// ---------- Report ----------
for (const w of warnings) console.warn(`⚠  ${w}`);
for (const f of failures) console.error(`✗  ${f}`);
if (failures.length === 0) {
  console.log(`✓ SEO regression checks passed (${warnings.length} warning${warnings.length===1?"":"s"}).`);
  process.exit(0);
} else {
  console.error(`\n${failures.length} SEO regression failure${failures.length===1?"":"s"}.`);
  process.exit(1);
}