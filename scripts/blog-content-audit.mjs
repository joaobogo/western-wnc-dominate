// Blog content audit: builds a per-post table (URL, title, date, word count,
// target query, closest overlapping post) plus MERGE / PRUNE candidates.
// GSC impressions/clicks are left blank — paste the Search Console export into
// the generated CSV before approving the 301 list.
//
// Usage: bunx tsx scripts/blog-content-audit.mjs

import { writeFileSync, mkdirSync } from "fs";
import { blogPosts } from "../src/data/blogs";

const BASE = "https://highlandernc.com";

const STOP = new Set([
  "the","a","an","and","or","for","to","in","of","on","your","you","what","how",
  "is","are","it","with","from","by","at","that","this","when","why","best","guide",
  "vs","nc","north","carolina","western","wnc","2026","2025",
]);

const tokens = (s) =>
  new Set(
    s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/)
      .filter((w) => w.length > 2 && !STOP.has(w)),
  );

const jaccard = (a, b) => {
  const inter = [...a].filter((x) => b.has(x)).length;
  const union = new Set([...a, ...b]).size;
  return union ? inter / union : 0;
};

const wordCount = (s) =>
  String(s || "").replace(/<[^>]+>/g, " ").replace(/[#*_>`|-]/g, " ")
    .split(/\s+/).filter(Boolean).length;

// Target query = metaTitle stripped of the brand suffix, lowercased.
const targetQuery = (p) =>
  (p.metaTitle || p.title).split("|")[0].replace(/[:—–].*$/, "").trim().toLowerCase();

const rows = blogPosts.map((p) => ({
  url: `${BASE}/blog/${p.slug}`,
  slug: p.slug,
  title: p.title,
  date: p.date,
  words: wordCount(p.content) + wordCount(p.excerpt),
  category: p.category,
  town: p.town || "",
  targetQuery: targetQuery(p),
  tokens: tokens(`${p.title} ${p.excerpt}`),
}));

for (const r of rows) {
  let best = null;
  for (const o of rows) {
    if (o.slug === r.slug) continue;
    const score = jaccard(r.tokens, o.tokens);
    if (!best || score > best.score) best = { slug: o.slug, title: o.title, score };
  }
  r.overlapSlug = best?.slug ?? "";
  r.overlapTitle = best?.title ?? "";
  r.overlapScore = Number((best?.score ?? 0).toFixed(3));
}

// MERGE groups: mutual-or-high overlap pairs above threshold. Stronger = more
// words, tie-break older date (established URL).
const MERGE_THRESHOLD = 0.34;
const seen = new Set();
const mergeGroups = [];
for (const r of [...rows].sort((a, b) => b.overlapScore - a.overlapScore)) {
  if (r.overlapScore < MERGE_THRESHOLD) continue;
  if (seen.has(r.slug) || seen.has(r.overlapSlug)) continue;
  const other = rows.find((x) => x.slug === r.overlapSlug);
  if (!other) continue;
  const [strong, weak] =
    other.words === r.words
      ? (new Date(r.date) <= new Date(other.date) ? [r, other] : [other, r])
      : (r.words > other.words ? [r, other] : [other, r]);
  seen.add(r.slug); seen.add(other.slug);
  mergeGroups.push({ strong, weak, score: r.overlapScore });
}

// PRUNE candidates (repo-side signal only — needs GSC impressions to confirm):
// thin posts older than 6 months with a near-duplicate sibling.
const sixMonthsAgo = new Date(Date.now() - 182 * 864e5);
const pruneCandidates = rows.filter(
  (r) => r.words < 450 && new Date(r.date) < sixMonthsAgo && r.overlapScore >= 0.25,
);

// REFRESH shortlist stand-in: longest, oldest evergreen posts. Replace with the
// GSC top-20-by-impressions once the export is pasted in.
const refreshShortlist = [...rows]
  .filter((r) => !mergeGroups.some((g) => g.weak.slug === r.slug))
  .sort((a, b) => b.words - a.words || new Date(a.date) - new Date(b.date))
  .slice(0, 20);

mkdirSync("/mnt/documents", { recursive: true });

const csv = [
  ["url","title","publish_date","word_count","category","town","target_query","gsc_impressions","gsc_clicks","closest_overlap_url","overlap_score","proposed_action"].join(","),
  ...rows.map((r) => {
    const action = mergeGroups.find((g) => g.weak.slug === r.slug)
      ? "MERGE (301 into stronger)"
      : mergeGroups.find((g) => g.strong.slug === r.slug)
        ? "MERGE (target)"
        : pruneCandidates.includes(r)
          ? "PRUNE (noindex/410)"
          : refreshShortlist.includes(r)
            ? "REFRESH"
            : "KEEP";
    const q = (v) => `"${String(v).replace(/"/g, '""')}"`;
    return [q(r.url), q(r.title), r.date, r.words, q(r.category), q(r.town),
      q(r.targetQuery), "", "", q(`${BASE}/blog/${r.overlapSlug}`), r.overlapScore, q(action)].join(",");
  }),
].join("\n");

writeFileSync("/mnt/documents/blog-content-audit.csv", csv + "\n");

const redirects = mergeGroups
  .map((g) => `/blog/${g.weak.slug}    /blog/${g.strong.slug}    301!`)
  .join("\n");
writeFileSync("/mnt/documents/blog-301-proposal.txt", redirects + "\n");

console.log(`posts: ${rows.length}`);
console.log(`merge groups: ${mergeGroups.length}`);
mergeGroups.forEach((g) =>
  console.log(`  ${g.score}  WEAK ${g.weak.slug} (${g.weak.words}w) -> STRONG ${g.strong.slug} (${g.strong.words}w)`),
);
console.log(`prune candidates: ${pruneCandidates.length}`);
pruneCandidates.forEach((r) => console.log(`  ${r.slug} (${r.words}w, ${r.date})`));
console.log(`refresh shortlist: ${refreshShortlist.length}`);
