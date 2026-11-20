/**
 * Prebuild: pulls the Google reviews that the google-reviews-sync edge
 * function imports every day (public.google_reviews / google_review_summary)
 * into src/data/generated/google-reviews.json, so every build ships the
 * current reviews, star rating and review count.
 *
 * Never fails the build: if the database can't be reached, the last snapshot
 * in the file is kept and only `generatedOn` (the rotation day) moves on.
 * Review text is written exactly as stored; nothing is edited.
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const out = path.join(root, "src/data/generated/google-reviews.json");
const indexHtml = path.join(root, "index.html");

function readEnv() {
  const env = { ...process.env };
  const file = path.join(root, ".env");
  if (fs.existsSync(file)) {
    for (const line of fs.readFileSync(file, "utf8").split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\n]*)"?\s*$/);
      if (m && !env[m[1]]) env[m[1]] = m[2];
    }
  }
  return env;
}

const today = new Date().toISOString().slice(0, 10);
const previous = fs.existsSync(out) ? JSON.parse(fs.readFileSync(out, "utf8")) : { summary: {}, reviews: [] };

async function fetchJson(url, key) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 15000);
  try {
    const res = await fetch(url, { headers: { apikey: key, Authorization: `Bearer ${key}` }, signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(t);
  }
}

async function main() {
  const env = readEnv();
  const base = env.VITE_SUPABASE_URL;
  const key = env.VITE_SUPABASE_PUBLISHABLE_KEY;
  let next = { ...previous, generatedOn: today };
  if (base && key) {
    try {
      const [reviews, summary] = await Promise.all([
        fetchJson(
          `${base}/rest/v1/google_reviews?select=review_id,profile,author_name,rating,comment,created_at_google&order=created_at_google.desc&limit=1000`,
          key,
        ),
        fetchJson(`${base}/rest/v1/google_review_summary?select=profile,average_rating,total_review_count,fetched_at`, key),
      ]);
      const sum = {};
      for (const s of summary) {
        if (s.total_review_count > 0 && s.average_rating > 0) {
          sum[s.profile] = { rating: Number(s.average_rating), count: s.total_review_count, fetchedAt: s.fetched_at };
        }
      }
      next = { generatedOn: today, fetchedAt: new Date().toISOString(), summary: sum, reviews };
      console.log(`fetch-google-reviews: ${reviews.length} reviews, summary for ${Object.keys(sum).join(", ") || "none"}`);
    } catch (e) {
      console.warn(`fetch-google-reviews: kept the last snapshot (${e.message})`);
    }
  } else {
    console.warn("fetch-google-reviews: no Supabase settings; kept the last snapshot");
  }
  fs.writeFileSync(out, `${JSON.stringify(next, null, 2)}\n`);

  // The static page shell's fallback descriptions carry the rating line too.
  const f = next.summary?.franklin;
  if (f && fs.existsSync(indexHtml)) {
    const html = fs.readFileSync(indexHtml, "utf8");
    const line = `${Number(f.rating).toFixed(1)}★ · ${f.count} Google reviews`;
    const updated = html.replace(/\d\.\d★ · \d+ Google reviews/g, line);
    if (updated !== html) fs.writeFileSync(indexHtml, updated);
  }
}

main();
