#!/usr/bin/env node
/**
 * Boilerplate detector for town / location pages (P3.4).
 *
 * For every prerendered page under /service-areas/** and /locations/**, take
 * the visible <p> and <li> text inside <main>, normalise whitespace, and count
 * on how many pages each paragraph (>= 12 words) appears.
 *
 * Prints:
 *   1. every paragraph that appears on 3+ pages, with the page list, sorted by
 *      page count (top 10 by default; --all for everything)
 *   2. per page, the share of its words that sit in paragraphs shared with 3+
 *      OTHER pages (i.e. the paragraph appears on 4+ pages in total)
 *
 * This is a WARNING in `npm run seo:check` (exit 0). Use --fail-over=<pct> to
 * turn a core-town share above <pct> into a failure, --core to print only the
 * four core towns, --json for machine-readable output.
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

const DIST = resolve("dist");
const SHOW_ALL = process.argv.includes("--all");
const JSON_OUT = process.argv.includes("--json");
const CORE_ONLY = process.argv.includes("--core");
const failOverArg = process.argv.find((a) => a.startsWith("--fail-over="));
const FAIL_OVER = failOverArg ? Number(failOverArg.split("=")[1]) : null;
const MIN_WORDS = 12;
const CORE_TOWNS = ["/service-areas/franklin-nc", "/service-areas/highlands-nc", "/service-areas/cashiers-nc", "/service-areas/sylva-nc"];

function pages() {
  const out = [];
  const walk = (dir, prefix) => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) {
        if (["assets", "og"].includes(entry)) continue;
        walk(full, `${prefix}/${entry}`);
      } else if (entry.endsWith(".html") && entry !== "index.html" && !(prefix === "" && entry === "404.html")) {
        out.push({ route: `${prefix}/${entry.slice(0, -".html".length)}`, file: full });
      }
    }
  };
  walk(DIST, "");
  return out.filter((p) => p.route.startsWith("/service-areas") || p.route.startsWith("/locations"));
}

const decode = (s) =>
  s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;|&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&middot;/g, "·")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));

const mainHtml = (html) => {
  const m = html.match(/<main[\s\S]*?<\/main>/i);
  return (m ? m[0] : html).replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<svg[\s\S]*?<\/svg>/gi, " ");
};

/** <p> and <li> text inside <main>, whitespace-normalised. */
function paragraphs(html) {
  const body = mainHtml(html);
  const out = [];
  for (const mm of body.matchAll(/<(p|li)\b[^>]*>([\s\S]*?)<\/\1>/gi)) {
    const text = decode(mm[2].replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
    if (text.split(" ").length >= MIN_WORDS) out.push(text);
  }
  return out;
}

/** Total visible words in <main> (headings, lists, CTAs and FAQs included). */
function mainWordCount(html) {
  const text = decode(mainHtml(html).replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
  return text ? text.split(" ").length : 0;
}

if (!existsSync(DIST)) {
  console.error("duplicate-paragraphs: dist/ not found — run the build (and prerender) first.");
  process.exit(1);
}

const all = pages();
const perPage = new Map(); // route → paragraphs[]
const mainWords = new Map(); // route → total words in <main>
const paraPages = new Map(); // paragraph → Set(routes)
for (const { route, file } of all) {
  const html = readFileSync(file, "utf8");
  const paras = paragraphs(html);
  perPage.set(route, paras);
  mainWords.set(route, mainWordCount(html));
  for (const p of new Set(paras)) {
    if (!paraPages.has(p)) paraPages.set(p, new Set());
    paraPages.get(p).add(route);
  }
}

const shared = [...paraPages.entries()].filter(([, routes]) => routes.size >= 3).sort((a, b) => b[1].size - a[1].size);

const pageStats = [...perPage.entries()].map(([route, paras]) => {
  const totalWords = paras.reduce((n, p) => n + p.split(" ").length, 0);
  const sharedParas = paras.filter((p) => paraPages.get(p).size >= 4);
  const sharedWords = sharedParas.reduce((n, p) => n + p.split(" ").length, 0);
  return {
    route,
    mainWords: mainWords.get(route),
    totalWords,
    sharedWords,
    sharePct: totalWords ? Math.round((sharedWords / totalWords) * 1000) / 10 : 0,
    paragraphs: paras.length,
    sharedParagraphs: sharedParas.map((p) => ({ pages: paraPages.get(p).size, words: p.split(" ").length, text: p })),
  };
});

if (JSON_OUT) {
  console.log(JSON.stringify({ pages: pageStats, shared: shared.map(([text, routes]) => ({ text, pages: [...routes] })) }, null, 2));
  process.exit(0);
}

console.log(`duplicate-paragraphs: ${all.length} town/location pages scanned; ${paraPages.size} distinct paragraphs (>= ${MIN_WORDS} words); ${shared.length} appear on 3+ pages.`);
const top = SHOW_ALL ? shared : shared.slice(0, 10);
for (const [text, routes] of top) {
  const r = [...routes];
  console.log(`\n  ${routes.size} pages | ${text.split(" ").length} words: "${text.slice(0, 160)}${text.length > 160 ? "…" : ""}"`);
  console.log(`    ${r.slice(0, 5).join(", ")}${r.length > 5 ? `, +${r.length - 5} more` : ""}`);
}
if (!SHOW_ALL && shared.length > 10) console.log(`\n  … ${shared.length - 10} more shared paragraph(s) — run with --all.`);

console.log("\n  Shared-word share per page (paragraph words in paragraphs that appear on 3+ OTHER pages) · total words in <main>:");
const rows = (CORE_ONLY ? pageStats.filter((s) => CORE_TOWNS.includes(s.route)) : pageStats).sort((a, b) => b.sharePct - a.sharePct);
for (const s of rows.slice(0, CORE_ONLY ? 4 : 25)) {
  console.log(`    ${String(s.sharePct).padStart(5)}% shared  ${String(s.totalWords).padStart(5)} paragraph words  ${String(s.mainWords).padStart(5)} total words  ${s.route}${CORE_TOWNS.includes(s.route) ? "  (core)" : ""}`);
}
if (!CORE_ONLY && rows.length > 25) console.log(`    … ${rows.length - 25} more page(s) — run with --json for all.`);
if (CORE_ONLY) {
  console.log("\n  Shared paragraphs ON each core town page (what to remove or rewrite there):");
  for (const s of rows) {
    console.log(`    ${s.route} — ${s.sharedParagraphs.length} shared paragraph(s), ${s.sharedWords} words`);
    for (const p of s.sharedParagraphs.sort((a, b) => b.pages - a.pages)) {
      console.log(`      · on ${p.pages} pages, ${p.words} words: "${p.text.slice(0, 110)}${p.text.length > 110 ? "…" : ""}"`);
    }
  }
}

if (FAIL_OVER !== null) {
  const bad = pageStats.filter((s) => CORE_TOWNS.includes(s.route) && s.sharePct > FAIL_OVER);
  if (bad.length) {
    console.error(`\nduplicate-paragraphs: FAILED — core town page(s) above ${FAIL_OVER}% shared words: ${bad.map((b) => `${b.route} ${b.sharePct}%`).join(", ")}`);
    process.exit(1);
  }
}
