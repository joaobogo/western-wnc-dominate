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
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const BASE = (process.argv.find(a => a.startsWith("--base=")) || "--base=https://highlandernc.com").split("=")[1];
const CANONICAL_HOST = new URL(BASE).host;

const failures = [];
const warnings = [];
const fail = (msg) => failures.push(msg);
const warn = (msg) => warnings.push(msg);

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
  // OAI-SearchBot must not be explicitly blocked
  if (/User-agent:\s*OAI-SearchBot[\s\S]*?Disallow:\s*\//i.test(robots))
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