#!/usr/bin/env node
/**
 * Blog near-duplicate report (P3.5).
 *
 * Loads every post from src/data/blogs.ts (via bun, so programmatic posts pushed
 * after the literal array are included) and finds clusters of location-swapped
 * or near-identical posts:
 *   - TITLE match: two titles are identical once every town / county name is
 *     replaced by a placeholder ("Roof Repair vs Replacement in {TOWN}")
 *   - BODY match: Jaccard similarity of 5-word shingles over the rendered text
 *     of `content` >= 0.6
 * A cluster is a connected group of posts joined by either relation.
 *
 * For each cluster the recommended canonical survivor is: most 90-day GSC
 * clicks (scripts/fixtures/gsc-pages.csv, columns "Top pages,Clicks,Impressions",
 * read if present) → else the post for a core town (Franklin / Highlands /
 * Cashiers / Sylva) → else the oldest post.
 *
 * Read-only: nothing is deleted or rewritten. Apply decisions later by setting
 * `canonicalTo` on the losing posts.
 *
 * Usage: node scripts/blog-similarity.mjs [--threshold=0.6] [--json]
 */
import { execFileSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const JSON_OUT = process.argv.includes("--json");
const thresholdArg = process.argv.find((a) => a.startsWith("--threshold="));
const THRESHOLD = thresholdArg ? Number(thresholdArg.split("=")[1]) : 0.6;
const CORE_TOWNS = ["Franklin", "Highlands", "Cashiers", "Sylva"];

// ---------------------------------------------------------------- load data
const dump = execFileSync(
  "bun",
  [
    "-e",
    `import { blogPosts } from "./src/data/blogs";
     import { towns } from "./src/data/towns";
     import { counties } from "./src/data/counties";
     console.log(JSON.stringify({
       posts: blogPosts.map(p => ({ slug: p.slug, title: p.title, date: p.date, town: p.town ?? null, category: p.category, content: p.content })),
       towns: towns.map(t => t.name),
       counties: counties.map(c => c.name),
     }));`,
  ],
  { encoding: "utf8", maxBuffer: 256 * 1024 * 1024, cwd: process.cwd() },
);
const { posts, towns, counties } = JSON.parse(dump);

// ------------------------------------------------------------ GSC clicks
const clicksFor = new Map();
const gscPath = resolve("scripts/fixtures/gsc-pages.csv");
if (existsSync(gscPath)) {
  const lines = readFileSync(gscPath, "utf8").split(/\r?\n/).filter(Boolean);
  const header = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const iPage = header.findIndex((h) => h.startsWith("top pages") || h === "page" || h === "url");
  const iClicks = header.findIndex((h) => h === "clicks");
  for (const line of lines.slice(1)) {
    const cells = line.split(",");
    const url = (cells[iPage] || "").trim().replace(/"/g, "");
    let path;
    try {
      path = new URL(url).pathname.replace(/\/+$/, "");
    } catch {
      path = url.replace(/\/+$/, "");
    }
    const clicks = Number((cells[iClicks] || "0").replace(/[",]/g, "")) || 0;
    if (path.startsWith("/blog/")) clicksFor.set(path.slice("/blog/".length), (clicksFor.get(path.slice("/blog/".length)) || 0) + clicks);
  }
}

// --------------------------------------------------------------- helpers
const placeNames = [...new Set([...towns, ...counties.map((c) => c.replace(/ County$/, "")), ...counties])]
  .sort((a, b) => b.length - a.length);
const placeRe = new RegExp(`\\b(${placeNames.map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b(,?\\s*NC)?`, "gi");
const normTitle = (t) => t.replace(placeRe, "{TOWN}").replace(/\s+/g, " ").replace(/[“”"']/g, "").trim().toLowerCase();

const textOf = (md) =>
  String(md || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_>`~\-]+/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .toLowerCase()
    .replace(placeRe, " town ")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

const shingles = (words, k = 5) => {
  const s = new Set();
  for (let i = 0; i + k <= words.length; i++) s.add(words.slice(i, i + k).join(" "));
  return s;
};
const jaccard = (a, b) => {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter);
};

// -------------------------------------------------------------- relations
const sh = posts.map((p) => shingles(textOf(p.content)));
const nt = posts.map((p) => normTitle(p.title));
const parent = posts.map((_, i) => i);
const find = (i) => (parent[i] === i ? i : (parent[i] = find(parent[i])));
const union = (a, b) => { parent[find(a)] = find(b); };
const pairs = [];
for (let i = 0; i < posts.length; i++) {
  for (let j = i + 1; j < posts.length; j++) {
    const titleMatch = nt[i] === nt[j] && /\{town\}/.test(nt[i]);
    const sim = jaccard(sh[i], sh[j]);
    if (titleMatch || sim >= THRESHOLD) {
      pairs.push({ a: posts[i].slug, b: posts[j].slug, titleMatch, body: Math.round(sim * 100) / 100 });
      union(i, j);
    }
  }
}

const groups = new Map();
posts.forEach((p, i) => {
  const root = find(i);
  if (!groups.has(root)) groups.set(root, []);
  groups.get(root).push(i);
});
const clusters = [...groups.values()].filter((g) => g.length > 1);

const survivorOf = (idx) => {
  const members = idx.map((i) => posts[i]);
  const withClicks = members.map((p) => ({ p, clicks: clicksFor.get(p.slug) || 0 }));
  const maxClicks = Math.max(...withClicks.map((m) => m.clicks));
  if (maxClicks > 0) return { slug: withClicks.find((m) => m.clicks === maxClicks).p.slug, reason: `most GSC clicks (${maxClicks})` };
  const core = members.find((p) => p.town && CORE_TOWNS.includes(p.town));
  if (core) return { slug: core.slug, reason: `core town (${core.town})` };
  const oldest = [...members].sort((a, b) => new Date(a.date) - new Date(b.date))[0];
  return { slug: oldest.slug, reason: `oldest (${oldest.date})` };
};

const report = clusters
  .map((idx) => {
    const members = idx.map((i) => posts[i]);
    const rel = pairs.filter((pr) => idx.some((i) => posts[i].slug === pr.a) && idx.some((i) => posts[i].slug === pr.b));
    return {
      titlePattern: nt[idx[0]],
      size: idx.length,
      survivor: survivorOf(idx),
      posts: members
        .map((p) => ({ slug: p.slug, date: p.date, town: p.town, category: p.category, clicks: clicksFor.get(p.slug) ?? null }))
        .sort((a, b) => new Date(a.date) - new Date(b.date)),
      maxBodySimilarity: Math.max(0, ...rel.map((r) => r.body)),
      titleMatched: rel.some((r) => r.titleMatch),
    };
  })
  .sort((a, b) => b.size - a.size);

if (JSON_OUT) {
  console.log(JSON.stringify({ threshold: THRESHOLD, posts: posts.length, gscRows: clicksFor.size, clusters: report }, null, 2));
  process.exit(0);
}

console.log(
  `blog-similarity: ${posts.length} posts, ${pairs.length} near-duplicate pair(s), ${report.length} cluster(s) covering ${report.reduce((n, c) => n + c.size, 0)} posts ` +
    `(body threshold ${THRESHOLD}; GSC clicks ${clicksFor.size ? `loaded for ${clicksFor.size} URLs` : "not available — add scripts/fixtures/gsc-pages.csv"})`,
);
report.forEach((c, i) => {
  console.log(`\n#${i + 1}  ${c.size} posts — ${c.titleMatched ? "location-swapped title" : "body match"}${c.maxBodySimilarity ? `, body similarity up to ${c.maxBodySimilarity}` : ""}`);
  console.log(`    pattern: ${c.titlePattern}`);
  for (const p of c.posts) {
    const mark = p.slug === c.survivor.slug ? "★ keep " : "  fold ";
    console.log(`    ${mark} /blog/${p.slug}  ${p.date}  ${p.town ?? "—"}${p.clicks !== null ? `  ${p.clicks} clicks` : ""}`);
  }
  console.log(`    → survivor: /blog/${c.survivor.slug} (${c.survivor.reason})`);
});
if (!report.length) console.log("No clusters found.");
