#!/usr/bin/env node
/**
 * Build-time guard: no blog post `date` (datePublished) and no sitemap
 * <lastmod> may be in the future relative to the build date (UTC).
 *
 * Usage: node scripts/check-future-dates.mjs
 * Exits non-zero on any future-dated entry.
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const today = new Date().toISOString().slice(0, 10);
const failures = [];

// ---------- 1. Blog post publication dates ----------
const blogSources = ["src/data/blogs.ts", "src/data/blog-index.generated.ts"];
for (const rel of blogSources) {
  const path = resolve(rel);
  if (!existsSync(path)) continue;
  const src = readFileSync(path, "utf8");
  const lines = src.split("\n");
  let currentSlug = "unknown";
  lines.forEach((line, i) => {
    const slugMatch = line.match(/"?slug"?\s*:\s*"([^"]+)"/);
    if (slugMatch) currentSlug = slugMatch[1];
    const dateMatch = line.match(/"?date"?\s*:\s*"(\d{4}-\d{2}-\d{2})"/);
    if (dateMatch && dateMatch[1] > today) {
      failures.push(
        `${rel}:${i + 1} post "${currentSlug}" has a future datePublished ${dateMatch[1]} (today is ${today})`
      );
    }
  });
}

// ---------- 2. Sitemap lastmod values ----------
const sitemapPath = resolve("public/sitemap.xml");
if (existsSync(sitemapPath)) {
  const xml = readFileSync(sitemapPath, "utf8");
  const entries = xml.match(/<url>[\s\S]*?<\/url>/g) || [];
  for (const entry of entries) {
    const lastmod = entry.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]?.trim();
    if (!lastmod) continue;
    const day = lastmod.slice(0, 10);
    if (day > today) {
      const loc = entry.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? "unknown";
      failures.push(`public/sitemap.xml: ${loc} has a future lastmod ${lastmod} (today is ${today})`);
    }
  }
}

if (failures.length) {
  console.error("\n[check-future-dates] FAILED\n");
  for (const f of failures) console.error("  ✗ " + f);
  console.error("");
  process.exit(1);
}

console.log(`[check-future-dates] OK — no future datePublished or lastmod values (today ${today}).`);
