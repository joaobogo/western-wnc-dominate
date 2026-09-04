#!/usr/bin/env node
/**
 * Copy lint for prerendered pages (P3.3).
 *
 * Templated pages stitch data strings into sentence frames; when a full
 * sentence lands inside a clause the grammar breaks ("we account for heavy
 * valley moisture traps and fog create…", "…systems. which demands…"). This
 * scans the visible text of <main> on EVERY prerendered page in dist/ and
 * fails the build on:
 *   - a sentence fragment starting with lowercase "which" after a full stop
 *   - stitched verb collisions such as "traps and fog create"
 *   - "within as soon as"
 *   - doubled words ("the the", "in in") — a few legitimate doubles are allowed
 *   - a lowercase letter right after ". " (not after e.g. / i.e. / vs. / ft. …)
 *   - leaked template values: "undefined", "NaN", "[object Object]", "{town}", "{{"
 *   - the string "Lorem"
 *
 * Usage: node scripts/copy-lint.mjs            (fails on any hit)
 *        node scripts/copy-lint.mjs --list     (prints hits, exit 0)
 * Runs in `npm run seo:check` after the build (needs dist/).
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, resolve, relative } from "node:path";

const DIST = resolve("dist");
const LIST_ONLY = process.argv.includes("--list");

/** Every prerendered page: dist/index.html ("/") and dist/**\/<route>.html. */
function pages() {
  const out = [];
  const walk = (dir, prefix) => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) {
        if (["assets", "og"].includes(entry)) continue;
        walk(full, `${prefix}/${entry}`);
      } else if (entry === "index.html") {
        if (prefix === "") out.push({ route: "/", file: full });
      } else if (entry.endsWith(".html") && !(prefix === "" && entry === "404.html")) {
        out.push({ route: `${prefix}/${entry.slice(0, -".html".length)}`, file: full });
      }
    }
  };
  walk(DIST, "");
  return out;
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

/**
 * Visible text of <main>, one line per block-level element so a sentence
 * never spans two paragraphs (a heading followed by a lowercase word is fine;
 * a lowercase word after a period INSIDE one paragraph is not).
 */
function mainText(html) {
  const m = html.match(/<main[\s\S]*?<\/main>/i);
  let body = m ? m[0] : html;
  body = body
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<(?:img|input|br|hr)\b[^>]*>/gi, " ")
    // hidden accessibility copy is still copy — keep it; just drop attributes.
    .replace(/<\/(p|div|section|li|h[1-6]|tr|td|th|article|header|footer|blockquote|figcaption|dt|dd|button|a|span|label|summary|details)>/gi, "\n")
    .replace(/<[^>]+>/g, " ");
  return decode(body)
    .split("\n")
    .map((l) => l.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

/** Sentence-ending tokens that legitimately precede a lowercase word. */
const ABBREVIATIONS = /\b(e\.g|i\.e|vs|approx|etc|ft|sq|no|st|rd|dr|mt|inc|jr|sr|a\.m|p\.m|min|max|est|dept|co|ave|blvd|hwy|lbs|oz|fig)\.$/i;
/** Doubled words that are correct English. */
const DOUBLE_OK = new Set(["had", "that", "very", "really", "so", "long", "bye", "no"]);

const RULES = [
  {
    id: "which-fragment",
    test: (line) => [...line.matchAll(/\.\s+which\b[^.]*\.?/g)].map((m) => m[0]),
    why: 'sentence fragment starting with lowercase "which" after a full stop',
  },
  {
    id: "stitched-verbs",
    test: (line) => [...line.matchAll(/\b\w+ (traps|holds|drives|pushes|pulls|keeps) and \w+ (create|creates|cause|causes|make|makes|accelerate|accelerates)\b[^.]*/g)].map((m) => m[0]),
    why: "two consecutive verbs from stitched data (e.g. \"traps and fog create\")",
  },
  {
    id: "within-asap",
    test: (line) => [...line.matchAll(/within as soon as[^.]*/gi)].map((m) => m[0]),
    why: '"within as soon as"',
  },
  {
    id: "doubled-word",
    // Whole words only: "you're re-roofing" must not read as "re re", so a word
    // glued to an apostrophe or hyphen on either side does not count.
    test: (line) =>
      [...line.matchAll(/(?<![\w'’-])([A-Za-z]{2,})\s+\1(?![\w'’-])/gi)]
        .filter((m) => !DOUBLE_OK.has(m[1].toLowerCase()))
        .map((m) => line.slice(Math.max(0, m.index - 40), m.index + m[0].length + 40)),
    why: "doubled word",
  },
  {
    id: "lowercase-after-period",
    test: (line) =>
      [...line.matchAll(/([A-Za-z0-9.'")\]]+\.)\s+([a-z][a-z]+)/g)]
        .filter(
          (m) =>
            !ABBREVIATIONS.test(m[1]) &&
            !/^\d/.test(m[1]) &&
            !/^(?:[A-Za-z]{1,2}\.){2,}$/.test(m[1]) && // acronyms: N.C.G.S., U.S., a.m.
            !/\.[a-z]{2,4}$/i.test(m[1].replace(/\.$/, "")), // domains: highlandernc.com.
        )
        .map((m) => line.slice(Math.max(0, m.index - 50), m.index + m[0].length + 50)),
    why: "lowercase letter immediately after a full stop",
  },
  {
    id: "leaked-value",
    test: (line) => [...line.matchAll(/\bundefined\b|\bNaN\b|\[object Object\]|\{town\}|\{\{/g)].map((m) => line.slice(Math.max(0, m.index - 40), m.index + m[0].length + 40)),
    why: "leaked template value",
  },
  {
    id: "lorem",
    test: (line) => [...line.matchAll(/Lorem/g)].map((m) => line.slice(Math.max(0, m.index - 20), m.index + 60)),
    why: "placeholder text",
  },
];

if (!existsSync(DIST)) {
  console.error("copy-lint: dist/ not found — run the build (and prerender) first.");
  process.exit(1);
}

const all = pages();
const hits = [];
for (const { route, file } of all) {
  const lines = mainText(readFileSync(file, "utf8"));
  for (const line of lines) {
    for (const rule of RULES) {
      for (const snippet of rule.test(line)) hits.push({ route, file: relative(process.cwd(), file), rule: rule.id, why: rule.why, snippet: snippet.trim() });
    }
  }
}

// Group identical sentences so a templated defect shows once with its page count.
const grouped = new Map();
for (const h of hits) {
  const key = `${h.rule}|${h.snippet}`;
  if (!grouped.has(key)) grouped.set(key, { ...h, routes: new Set() });
  grouped.get(key).routes.add(h.route);
}

console.log(`copy-lint: ${all.length} pages scanned — ${hits.length} hit(s) across ${grouped.size} distinct sentence(s).`);
for (const g of [...grouped.values()].sort((a, b) => b.routes.size - a.routes.size)) {
  const routes = [...g.routes];
  console.log(`\n  [${g.rule}] ${g.why}`);
  console.log(`    "${g.snippet.slice(0, 220)}${g.snippet.length > 220 ? "…" : ""}"`);
  console.log(`    ${routes.length} page(s): ${routes.slice(0, 4).join(", ")}${routes.length > 4 ? `, +${routes.length - 4} more` : ""}`);
}

if (hits.length && !LIST_ONLY) {
  console.error(`\ncopy-lint: FAILED — fix the source data/template for every sentence above.`);
  process.exit(1);
}
if (!hits.length) console.log("copy-lint: OK — no template-stitching copy defects.");
