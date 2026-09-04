#!/usr/bin/env node
/**
 * P6.1 — the one consolidated `npm run seo:check`.
 *
 * Prints ONE PASS/FAIL line per rule (details indented underneath), then a
 * summary, and exits 1 on any FAIL. Run it after `npm run build` — most rules
 * read the prerendered HTML in dist/.
 *
 *   1  Sitemap: every URL on https://highlandernc.com, no trailing slash, present in
 *      the prerender manifest, and not rendering noindex
 *   2  No prerendered non-home page shares the homepage <title> or description
 *   3  Every prerendered page has exactly one <h1>, exactly one canonical, and the
 *      canonical is self-referencing (noindex pages may canonicalise elsewhere)
 *   4  Structured data: no AggregateRating/Review outside /reviews, FAQPage questions
 *      visible, JSON-LD parses, only showroom addresses  (scripts/validate-schema.mjs)
 *   5  No rating / review-count / project-count literals outside src/data/business.ts
 *   6  "Highlander Roofing" only in the allowed places
 *   7  No internal href to a redirect source, to www./http://, to lovable.app, or to
 *      images.unsplash.com; no broken internal links  (scripts/internal-links.mjs)
 *   8  Every legacy URL in scripts/fixtures/legacy-urls-from-gsc.txt is a single 301
 *      to a live page
 *   9  public/_redirects: no 301 after the first 200 rewrite, no duplicate "from"
 *  10  copy-lint clean  (scripts/copy-lint.mjs)
 *  11  No prerender route skipped (every manifest route has its dist/ HTML)
 *
 * The earlier suites still run in full and are reported as rule 0 lines, so
 * nothing that was guarded before is un-guarded now.
 */
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import {
  loadRedirectRules,
  loadSiteInventory,
  parseRedirectRules,
  runLegacyUrlCheck,
} from "./lib/redirect-rules.mjs";

const ROOT = process.cwd();
const DIST = path.resolve(ROOT, "dist");
const BASE = "https://highlandernc.com";
const rel = (p) => path.relative(ROOT, p).split(path.sep).join("/");

// ----------------------------------------------------------------- report

const results = [];
/** Record a rule outcome. `details` empty → PASS. */
const rule = (id, title, details, { info = false } = {}) => {
  results.push({ id, title, details, ok: details.length === 0, info });
};

// ----------------------------------------------------------------- helpers

const prerenderedPages = () => {
  const pages = [];
  const walk = (dir, prefix) => {
    if (!existsSync(dir)) return;
    for (const entry of readdirSync(dir)) {
      const full = path.join(dir, entry);
      if (statSync(full).isDirectory()) {
        if (["assets", "og"].includes(entry)) continue;
        walk(full, `${prefix}/${entry}`);
      } else if (entry === "index.html") {
        if (prefix === "") pages.push({ route: "/", file: full });
      } else if (entry.endsWith(".html") && !(prefix === "" && entry === "404.html")) {
        pages.push({ route: `${prefix}/${entry.slice(0, -".html".length)}`, file: full });
      }
    }
  };
  walk(DIST, "");
  return pages;
};

const fileFor = (route) => (route === "/" ? path.join(DIST, "index.html") : path.join(DIST, `${route}.html`));

const decode = (s) =>
  String(s)
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const head = (html) => {
  const title = decode(html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? "");
  const description = decode(html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i)?.[1] ?? "");
  const robots = html.match(/<meta[^>]+name="robots"[^>]+content="([^"]*)"/i)?.[1] ?? "";
  const canonicals = [...html.matchAll(/<link[^>]+rel="canonical"[^>]*href="([^"]+)"/gi)].map((m) => m[1]);
  const h1s = (html.match(/<h1\b/gi) || []).length;
  return { title, description, robots, canonicals, h1s, noindex: /noindex/i.test(robots) };
};

/** Run a sibling checker; returns { ok, out, lines } where lines are its failure lines. */
const runChecker = (script, args = []) => {
  const r = spawnSync(process.execPath, [path.join(ROOT, "scripts", script), ...args], {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  const out = `${r.stdout || ""}${r.stderr || ""}`;
  const lines = out
    .split("\n")
    .map((l) => l.trimEnd())
    .filter((l) => /✗|\bFAIL\b|error/i.test(l) && !/0 FAIL|no error|errors: 0/i.test(l));
  return { ok: r.status === 0, out, lines, status: r.status };
};

const walkSrc = (dir, out = []) => {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (["node_modules", "dist", ".git"].includes(entry)) continue;
      walkSrc(full, out);
    } else out.push(full);
  }
  return out;
};

// ----------------------------------------------------------------- inputs

if (!existsSync(DIST) || !existsSync(path.join(DIST, "index.html"))) {
  console.error("seo:check — dist/ not found. Run `npm run build` first.");
  process.exit(1);
}

const pages = prerenderedPages();
const htmlOf = new Map(pages.map((p) => [p.route, readFileSync(p.file, "utf8")]));
const headOf = new Map([...htmlOf].map(([route, html]) => [route, head(html)]));
const inventory = loadSiteInventory(ROOT);
const redirectsText = readFileSync(path.join(ROOT, "public/_redirects"), "utf8");
const rules = loadRedirectRules(path.join(ROOT, "public/_redirects"));

// ----------------------------------------------------------------- rule 1

{
  const details = [];
  const locs = [...readFileSync(path.join(ROOT, "public/sitemap.xml"), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  for (const loc of locs) {
    if (!loc.startsWith(`${BASE}/`)) details.push(`${loc} — host is not ${BASE}`);
    if (loc !== `${BASE}/` && loc.endsWith("/")) details.push(`${loc} — trailing slash`);
    let p;
    try {
      p = new URL(loc).pathname.replace(/\/+$/, "") || "/";
    } catch {
      details.push(`${loc} — not a valid URL`);
      continue;
    }
    if (!inventory.manifest.has(p)) details.push(`${p} — in sitemap but not in public/prerender-manifest.json`);
    const h = headOf.get(p);
    if (!h) details.push(`${p} — in sitemap but no prerendered HTML in dist/`);
    else if (h.noindex) details.push(`${p} — in sitemap but renders robots "${h.robots}"`);
  }
  rule(1, `Sitemap: ${locs.length} URLs on ${BASE}, no trailing slash, all prerendered, none noindex`, details);
}

// ----------------------------------------------------------------- rule 2

{
  const details = [];
  const home = headOf.get("/");
  for (const [route, h] of headOf) {
    if (route === "/" || route === "/__404") continue;
    if (h.title && h.title === home.title) details.push(`${route} — same <title> as the homepage ("${h.title}")`);
    if (h.description && h.description === home.description) details.push(`${route} — same description as the homepage`);
  }
  rule(2, `Homepage title/description unique across ${headOf.size - 1} other prerendered pages`, details);
}

// ----------------------------------------------------------------- rule 3

{
  const details = [];
  for (const [route, h] of headOf) {
    if (h.h1s !== 1) details.push(`${route} — ${h.h1s} <h1>`);
    if (h.canonicals.length !== 1) details.push(`${route} — ${h.canonicals.length} canonical link(s)`);
    const expected = route === "/" ? `${BASE}/` : `${BASE}${route}`;
    if (h.canonicals.length === 1 && h.canonicals[0] !== expected && !h.noindex) {
      details.push(`${route} — canonical ${h.canonicals[0]} is not self-referencing (expected ${expected})`);
    }
  }
  rule(3, `Every prerendered page: one <h1>, one canonical, self-referencing (${headOf.size} pages)`, details);
}

// ----------------------------------------------------------------- rule 4

{
  const r = runChecker("validate-schema.mjs");
  rule(4, "Structured data: rating markup only on /reviews, FAQPage questions visible, JSON-LD parses, showroom addresses only", r.ok ? [] : r.lines.length ? r.lines : ["validate-schema.mjs exited non-zero"]);
}

// ----------------------------------------------------------------- rule 5

{
  const details = [];
  const business = readFileSync(path.join(ROOT, "src/data/business.ts"), "utf8");
  const rating = business.match(/ratingValue:\s*([0-9.]+)/)?.[1];
  const count = business.match(/reviewCount:\s*(\d+)/)?.[1];
  const patterns = [
    // any "4.8★ / 4.8 stars / 4.8 rating / 4.8/5" style literal, current or stale
    { name: "rating literal", re: /\b[1-5]\.\d\s*(?:★|\\u2605|\/\s*5\b|-?\s?stars?\b|\s?rating\b|\s?out of 5)/i },
    // a review count next to "reviews"
    { name: "review-count literal", re: /\b\d{2,4}\+?\s*(?:google\s+|verified\s+|five-star\s+|5-star\s+)?reviews?\b/i },
    // a project count — business.ts has no verifiable count, so any such literal is invented
    { name: "project-count literal", re: /\b\d{2,5}\+?\s+(?:completed\s+|finished\s+)?(?:projects|roofs installed|roofs replaced)\b/i },
  ];
  if (rating) patterns.push({ name: `the current rating ${rating} typed by hand`, re: new RegExp(`(?<![\\d.])${rating.replace(".", "\\.")}(?![\\d])\\s*(?:★|stars?|/5)`, "i") });
  if (count) patterns.push({ name: `the current review count ${count} typed by hand`, re: new RegExp(`\\b${count}\\b[^\\n]{0,12}\\breviews?\\b`, "i") });
  const files = walkSrc(path.join(ROOT, "src")).filter(
    (f) =>
      /\.(ts|tsx)$/.test(f) &&
      !/[\\/]src[\\/]data[\\/]business\.ts$/.test(f) &&
      !/[\\/]src[\\/]test[\\/]/.test(f) &&
      !/\.generated\.ts$/.test(f) &&
      !/\.d\.ts$/.test(f),
  );
  for (const f of files) {
    const lines = readFileSync(f, "utf8").split("\n");
    lines.forEach((line, i) => {
      const code = line.trim();
      if (/^(\/\/|\*|\/\*)/.test(code)) return; // comments may cite numbers
      for (const p of patterns) {
        if (p.re.test(line)) {
          details.push(`${rel(f)}:${i + 1} — ${p.name}: ${code.slice(0, 110)}`);
          break;
        }
      }
    });
  }
  rule(5, `No rating / review-count / project-count literals outside src/data/business.ts (${files.length} files scanned)`, details);
}

// ----------------------------------------------------------------- rule 6

{
  // Built from parts so this file never contains the old name as a literal
  // (src/test/banned-terms.test.ts scans scripts/ too).
  const OLD = ["Highlander", "Roofing"].join(" ");
  const OLD_NAME = new RegExp(OLD);
  const ALLOWED_LINE = [
    /alternateNames?\s*[:=]/, // the declaration in business.ts / generated JSON key
    new RegExp(`^\\s*"${OLD} Services(?:, Inc\\.)?",?\\s*$`), // alternateName array items (index.html)
    /also known as|former name|formerly /i, // llms.txt + the one deliberate footer line
    /https?:\/\/[^\s"']*highlander[-_]?roofing/i, // external profile URLs
    /\/\/|^\s*\*|\/\*/, // code comments
  ];
  const roots = ["src", "scripts", "supabase/functions"].map((d) => path.join(ROOT, d)).filter(existsSync);
  const files = [...roots.flatMap((d) => walkSrc(d)), path.join(ROOT, "index.html"), path.join(ROOT, "public/llms.txt")].filter(
    (f) =>
      existsSync(f) &&
      /\.(ts|tsx|mjs|js|html|txt|md)$/.test(f) &&
      !/banned-terms\.test\.ts$/.test(f) &&
      !/\.generated\.ts$/.test(f) &&
      !/supabase[\\/]functions[\\/]mcp[\\/]index\.ts$/.test(f) &&
      !/[\\/]scripts[\\/]seo-check\.mjs$/.test(f),
  );
  const details = [];
  for (const f of files) {
    readFileSync(f, "utf8")
      .split("\n")
      .forEach((line, i) => {
        if (OLD_NAME.test(line) && !ALLOWED_LINE.some((re) => re.test(line))) details.push(`${rel(f)}:${i + 1} — ${line.trim().slice(0, 110)}`);
      });
  }
  rule(6, `"${OLD}" only in the allowed places (${files.length} files scanned)`, details);
}

// ----------------------------------------------------------------- rule 7

{
  const details = [];
  const r = runChecker("internal-links.mjs", ["--check", "--json"]);
  try {
    const json = JSON.parse(r.out.slice(r.out.indexOf("{")));
    details.push(...(json.fails || []));
  } catch {
    if (!r.ok) details.push(...(r.lines.length ? r.lines : ["internal-links.mjs exited non-zero"]));
  }
  for (const [route, html] of htmlOf) {
    const hits = [...html.matchAll(/(?:href|src|srcset)="([^"]*images\.unsplash\.com[^"]*)"/gi)];
    for (const m of hits.slice(0, 3)) details.push(`${route} — references ${m[1].slice(0, 80)}`);
  }
  rule(7, "Internal links: no redirect-source, www./http://, lovable.app or images.unsplash.com hrefs; no broken links", details);
}

// ----------------------------------------------------------------- rule 8

{
  const res = runLegacyUrlCheck({ root: ROOT });
  const details = res.nonOk.map((r) => `${r.url} → ${r.final} [${r.category}] ${r.reason || r.note || ""}`.trim());
  rule(8, `Legacy URLs: ${res.counts.total} fixture URLs each a single 301 to a live page (or intentional 410)`, details);
}

// ----------------------------------------------------------------- rule 9

{
  const details = [];
  const parsed = parseRedirectRules(redirectsText).filter((r) => !r.malformed);
  const firstRewrite = parsed.findIndex((r) => r.status === 200);
  if (firstRewrite >= 0) {
    for (const r of parsed.slice(firstRewrite + 1)) {
      if ([301, 302, 307, 308].includes(r.status)) details.push(`line ${r.line}: ${r.from} → ${r.to} ${r.status} is placed after the first 200 rewrite (line ${parsed[firstRewrite].line})`);
    }
  }
  const seen = new Map();
  for (const r of parsed) {
    const key = `${r.host || ""}${r.from}`;
    if (seen.has(key)) details.push(`line ${r.line}: duplicate "from" ${r.from} (first at line ${seen.get(key)})`);
    else seen.set(key, r.line);
  }
  rule(9, `public/_redirects: ${parsed.length} rules, no 301 after the first 200 rewrite, no duplicate "from"`, details);
}

// ----------------------------------------------------------------- rule 10

{
  const r = runChecker("copy-lint.mjs");
  const summary = r.out.split("\n").find((l) => /copy-lint: .*hit/.test(l));
  rule(10, `copy-lint clean${summary ? ` (${summary.replace(/^copy-lint:\s*/, "")})` : ""}`, r.ok ? [] : r.lines.length ? r.lines : ["copy-lint.mjs exited non-zero"]);
}

// ----------------------------------------------------------------- rule 11

{
  const details = [];
  for (const route of inventory.manifest) {
    if (!existsSync(fileFor(route))) details.push(`${route} — in the prerender manifest but no ${rel(fileFor(route))} (route was SKIPPED)`);
  }
  if (!existsSync(path.join(DIST, "404.html"))) details.push("dist/404.html missing");
  rule(11, `Prerender: all ${inventory.manifest.size} manifest routes written, no route skipped`, details);
}

// ----------------------------------------------------------------- rule 0 — the earlier suites, unchanged

for (const [script, label] of [
  ["check-future-dates.mjs", "no future-dated content"],
  ["redirect-check.mjs", "redirect map spot checks"],
  ["seo-regression-check.mjs", "seo-regression-check suite"],
]) {
  const r = runChecker(script);
  rule(0, label, r.ok ? [] : r.lines.length ? r.lines : [`${script} exited non-zero`]);
}
{
  const r = runChecker("duplicate-paragraphs.mjs", ["--core"]);
  const shareLines = r.out.split("\n").filter((l) => /% shared/.test(l)).map((l) => l.trim());
  rule(0, "duplicate paragraphs on core town pages (informational)", shareLines, { info: true });
}

// ----------------------------------------------------------------- output

console.log(`seo:check — ${pages.length} prerendered pages, ${inventory.sitemap.size} sitemap URLs\n`);
let fails = 0;
for (const r of results) {
  const tag = r.info ? "INFO" : r.ok ? "PASS" : "FAIL";
  if (!r.ok && !r.info) fails += 1;
  console.log(`${tag}  ${String(r.id).padStart(2)}. ${r.title}`);
  for (const d of r.details.slice(0, 40)) console.log(`        · ${d}`);
  if (r.details.length > 40) console.log(`        · … ${r.details.length - 40} more`);
}
const passes = results.filter((r) => r.ok && !r.info).length;
console.log(`\nseo:check: ${fails ? `${fails} FAIL` : "all rules PASS"} · ${passes} PASS · ${results.filter((r) => r.info).length} informational`);
process.exit(fails ? 1 : 0);
