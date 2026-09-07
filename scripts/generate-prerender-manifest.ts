// Runs in predev/prebuild right AFTER generate-sitemap.ts.
//
// Writes public/prerender-manifest.json: every public route that must exist as
// a real prerendered HTML file in dist/. This is deliberately a superset of the
// sitemap — "what we prerender" and "what we ask Google to index" are separate
// lists:
//   1. every URL in public/sitemap.xml (indexable pages)
//   2. every service×town coverage page that is NOT hand-written (they render
//      <meta name="robots" content="noindex,follow"> and must not be in the
//      sitemap, but a crawler that follows an internal link still needs a 200)
//   3. every county hub page
//   4. the noindex funnel routes that used to live in prerender.mjs as
//      NOINDEX_ROUTES (form steps that need their own title/canonical/noindex)
//
// scripts/prerender.mjs reads this file; scripts/seo-regression-check.mjs
// fails the build if a sitemap URL is ever missing from it.
//
// Run: bun scripts/generate-prerender-manifest.ts

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { serviceTownContent, isServiceTownIndexable } from "../src/data/service-town-content";
import { counties } from "../src/data/counties";
import { towns } from "../src/data/towns";
import { blogPosts } from "../src/data/blogs";

const OUT = resolve("public/prerender-manifest.json");

/**
 * Noindex funnel routes that are deliberately absent from sitemap.xml but must
 * still be prerendered, so the server emits their own title, canonical, og:url
 * and `noindex,nofollow` instead of falling back to the homepage shell.
 * (Moved here from scripts/prerender.mjs — this file is now the single list.)
 */
export const NOINDEX_ROUTES = [
  "/roofing-intake",
  "/construction-intake",
  "/design-intake",
  "/roofing-builder",
  "/construction-builder",
  // Removed from sitemap.xml (it carries noindex) but still publicly reachable.
  "/construction/consultation",
];

const normalize = (p: string) => (p === "/" ? "/" : p.replace(/\/+$/, ""));

// 1. sitemap URLs — read the file generate-sitemap.ts just wrote, so the two
//    can never disagree about what "indexable" means.
const xml = readFileSync(resolve("public/sitemap.xml"), "utf8");
const sitemapRoutes = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
  normalize(new URL(m[1]).pathname),
);

// 2. every NON-indexable service×town page → noindex,follow (generated coverage
//    pages AND hand-written pages switched off with `indexable: false`)
const coverageRoutes = serviceTownContent
  .filter((e) => !isServiceTownIndexable(e.townSlug, e.serviceSlug))
  .map((e) => `/service-areas/${e.townSlug}/${e.serviceSlug}`);

// 3. county hubs (noindex,follow — never in the sitemap, always prerendered)
const countyRoutes = counties.map((c) => `/service-areas/county/${c.slug}`);

// 4. every town page and every blog post, whatever its indexable flag (Task 7):
//    a page switched to noindex,follow must still exist as HTML for visitors
//    and for crawlers following internal links — only the sitemap drops it.
const townRoutes = towns.map((t) => `/service-areas/${t.slug}`);
const blogRoutes = blogPosts.map((p) => `/blog/${p.slug}`);

const seen = new Set<string>();
const routes: string[] = [];
for (const r of [...sitemapRoutes, ...coverageRoutes, ...countyRoutes, ...townRoutes, ...blogRoutes, ...NOINDEX_ROUTES]) {
  const p = normalize(r);
  if (seen.has(p)) continue;
  seen.add(p);
  routes.push(p);
}

const manifest = {
  // Keep this file deterministic: no timestamps, so an unchanged site produces
  // an unchanged manifest (public/build-info.json carries the build time).
  source: "scripts/generate-prerender-manifest.ts",
  counts: {
    sitemap: sitemapRoutes.length,
    coverageNoindex: coverageRoutes.filter((r) => !sitemapRoutes.includes(r)).length,
    counties: countyRoutes.filter((r) => !sitemapRoutes.includes(r)).length,
    noindexTowns: townRoutes.filter((r) => !sitemapRoutes.includes(r)).length,
    noindexBlogPosts: blogRoutes.filter((r) => !sitemapRoutes.includes(r)).length,
    noindexFunnels: NOINDEX_ROUTES.filter((r) => !sitemapRoutes.includes(r)).length,
    total: routes.length,
  },
  routes,
};

writeFileSync(OUT, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(
  `prerender-manifest.json written (${manifest.counts.total} routes — ${manifest.counts.sitemap} sitemap, +${manifest.counts.coverageNoindex} noindex coverage, +${manifest.counts.counties} counties not in sitemap, +${manifest.counts.noindexFunnels} noindex funnels)`,
);
