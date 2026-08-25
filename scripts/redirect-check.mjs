#!/usr/bin/env node
/**
 * Static validation of public/_redirects.
 *
 *  1. Every 301/410 rule appears BEFORE the first rewrite (200).
 *  2. No duplicate `from` paths.
 *  3. Every destination resolves to a real route in src/App.tsx, a sitemap URL,
 *     a static file in public/, or an external/absolute URL.
 *  4. Known-good spot checks (e.g. the Hibu /contact/... town pattern).
 *
 * Usage: node scripts/redirect-check.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const failures = [];
const fail = (m) => failures.push(m);

const redirectsPath = resolve("public/_redirects");
if (!existsSync(redirectsPath)) {
  console.error("✖ public/_redirects missing.");
  process.exit(1);
}

const lines = readFileSync(redirectsPath, "utf8").split(/\r?\n/);
const rules = [];
lines.forEach((raw, i) => {
  const line = raw.trim();
  if (!line || line.startsWith("#")) return;
  const parts = line.split(/\s+/);
  if (parts.length < 2) {
    fail(`Line ${i + 1}: malformed rule "${line}"`);
    return;
  }
  const [from, to, statusRaw] = parts;
  const status = (statusRaw || "301").replace("!", "");
  rules.push({ from, to, status: Number(status), force: (statusRaw || "").endsWith("!"), line: i + 1 });
});

// ---------- 1. ordering ----------
const firstRewrite = rules.findIndex(r => r.status === 200);
if (firstRewrite !== -1) {
  rules.forEach((r, idx) => {
    if (idx > firstRewrite && r.status !== 200) {
      fail(`Line ${r.line}: ${r.status} rule "${r.from}" sits after the first rewrite (line ${rules[firstRewrite].line}) and will never execute.`);
    }
  });
}

// ---------- 2. duplicates ----------
const seen = new Map();
for (const r of rules) {
  if (seen.has(r.from)) {
    fail(`Duplicate "from" path ${r.from} (lines ${seen.get(r.from)} and ${r.line}).`);
  } else {
    seen.set(r.from, r.line);
  }
}

// ---------- 3. destinations ----------
const app = readFileSync(resolve("src/App.tsx"), "utf8");
const routePaths = new Set(
  [...app.matchAll(/path="([^"]+)"/g)].map(m => m[1]).map(p => (p.endsWith("/*") ? p.slice(0, -2) : p))
);
routePaths.add("/");

let sitemapPaths = new Set();
const sitemapPath = resolve("public/sitemap.xml");
if (existsSync(sitemapPath)) {
  const xml = readFileSync(sitemapPath, "utf8");
  sitemapPaths = new Set(
    [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => {
      try { return new URL(m[1]).pathname.replace(/\/$/, "") || "/"; } catch { return m[1]; }
    })
  );
}

const dynamicRouteRe = [...routePaths]
  .filter(p => p.includes(":"))
  .map(p => new RegExp("^" + p.replace(/:[^/]+/g, "[^/]+") + "$"));

const destinationExists = (dest) => {
  if (/^https?:\/\//.test(dest)) return true;                 // absolute host rules
  const clean = dest.split("#")[0].split("?")[0];
  if (clean.includes(":")) return true;                       // placeholder destination
  const noSlash = clean.replace(/\/$/, "") || "/";
  if (routePaths.has(noSlash)) return true;
  if (sitemapPaths.has(noSlash)) return true;
  if (dynamicRouteRe.some(re => re.test(noSlash))) return true;
  if (existsSync(resolve("public" + clean))) return true;     // 404.html, assets
  if (clean === "/index.html" || clean === "/404.html") return true;
  return false;
};

for (const r of rules) {
  if (!destinationExists(r.to)) {
    fail(`Line ${r.line}: destination "${r.to}" (from ${r.from}) is not a route, sitemap URL, or public file.`);
  }
}

// ---------- 4. spot checks ----------
const applyRule = (path) => {
  for (const r of rules) {
    if (/^https?:\/\//.test(r.from)) continue;
    if (r.from.endsWith("/*")) {
      const base = r.from.slice(0, -2);
      if (path === base || path.startsWith(base + "/")) {
        return { rule: r, to: r.to.replace(":splat", path.slice(base.length + 1)) };
      }
      continue;
    }
    if (r.from.includes(":")) {
      const names = [];
      const re = new RegExp("^" + r.from.replace(/:[^/]+/g, (m) => { names.push(m.slice(1)); return "([^/]+)"; }) + "$");
      const m = path.match(re);
      if (m) {
        let to = r.to;
        names.forEach((n, i) => { to = to.replace(":" + n, m[i + 1]); });
        return { rule: r, to };
      }
      continue;
    }
    if (r.from === path) return { rule: r, to: r.to };
  }
  return null;
};

const spotChecks = [
  ["/contact/roofing-company-service-area/franklin-nc", "/service-areas/franklin-nc", 301],
  ["/contact/anything-else", "/service-areas", 301],
  ["/service-locations", "/service-areas", 301],
  ["/service-locations/highlands-nc", "/service-areas", 301],
  ["/free-tools", "/404.html", 410],
  ["/contact-us_em", "/contact", 301],
  ["/sylva-nc-showroom", "/service-areas/sylva-nc", 301],
];
for (const [from, expected, status] of spotChecks) {
  const res = applyRule(from);
  if (!res) fail(`Spot check: ${from} matches no rule (expected ${expected}).`);
  else if (res.to !== expected || res.rule.status !== status) {
    fail(`Spot check: ${from} → ${res.to} (${res.rule.status}); expected ${expected} (${status}).`);
  }
}

// /blog must never be caught by a legacy catch-all
const blogHit = applyRule("/blog/western-north-carolina-mountain-roofing-guide");
if (blogHit && blogHit.rule.status !== 200) {
  fail(`/blog/* must not be redirected (matched line ${blogHit.rule.line}).`);
}

if (failures.length) {
  console.error("✖ Redirect map check failed:\n" + failures.map(f => "  - " + f).join("\n"));
  process.exit(1);
}
console.log(`✓ Redirect map OK — ${rules.length} rules, ${rules.filter(r => r.status === 200).length} rewrites last.`);
