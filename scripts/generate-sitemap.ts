// Runs before `vite dev` and `vite build` (predev/prebuild hooks).
// Writes public/sitemap.xml sourced from src/data/{blogs,towns}.ts plus the
// curated list of indexable static routes below. Redirects, /lp/* paid
// landing pages, form-only funnels, and admin routes are intentionally excluded.

import { writeFileSync } from "fs";
import { resolve } from "path";
import { blogPosts } from "../src/data/blogs";
import { towns } from "../src/data/towns";
import { counties } from "../src/data/counties";
import { indexableServiceTownPairs } from "../src/data/service-town-content";
import { tier1FlatEntries, tier2FlatEntries } from "../src/data/service-town-slugs";
import { projectDetails } from "../src/data/projects";

const BASE_URL = "https://highlandernc.com";

interface SitemapEntry {
  path: string;
  // Only set from a page-specific authoritative timestamp (e.g. blog post date).
  // Never derived from generation time / build time. Omit when unknown.
  lastmod?: string;
}

// Indexable static routes. Copied verbatim from src/App.tsx and pruned:
// - excluded: <Navigate> redirects, /lp/* paid landing pages (noindex),
//   /admin/*, /roofing-intake, /construction-intake, /*-builder,
//   /design-intake, /quote-flow, /consultation, /request-quote-form*,
//   /seo-monitoring and legacy /highlands-nc duplicate.
// changefreq and priority are intentionally omitted — Google ignores them
// and they would fabricate signals we can't back with real data.
const staticRoutes: SitemapEntry[] = [
  { path: "/" },
  // Core pages
  { path: "/about" },
  { path: "/team" },
  { path: "/certifications" },
  { path: "/reviews" },
  { path: "/recent-projects" },
  { path: "/careers" },
  { path: "/community" },
  { path: "/giving-back" },
  { path: "/faq" },
  { path: "/roofing-cost-western-nc", changefreq: "monthly", priority: "0.8" },
  { path: "/roofing/metal/cost", changefreq: "monthly", priority: "0.8" },
  { path: "/financing" },
  { path: "/contact" },
  { path: "/request-inspection" },
  { path: "/roof-designer" },

  // Roofing money pages
  { path: "/roofing" },
  { path: "/roofing/roof-replacement" },
  { path: "/roofing/roof-repair" },
  { path: "/roofing/storm-damage" },
  { path: "/roofing/commercial" },
  { path: "/roofing/residential" },
  { path: "/roofing/specialty" },
  { path: "/roofing/metal" },
  { path: "/roofing/brava-synthetic" },
  { path: "/roofing/skylights" },
  { path: "/roofing/gutters" },

  // Construction money pages
  { path: "/construction" },
  { path: "/construction/additions" },
  { path: "/construction/outdoor-living" },
  { path: "/construction/renovations" },
  { path: "/construction/siding" },
  { path: "/construction/design" },
  { path: "/construction/consultation" },

  // Gutter & exterior hubs
  { path: "/exterior-improvements" },
  { path: "/layouts-planning" },

  // Physical showroom (location) pages
  { path: "/locations" },
  { path: "/locations/franklin-nc" },
  { path: "/locations/sylva-nc" },

  // Service Areas hub + blog hub
  { path: "/service-areas" },
  { path: "/blog" },

  // Legal
  { path: "/privacy-policy" },
  { path: "/accessibility" },
];

// Dynamic: one entry per town page. No lastmod — we have no per-town
// authoritative update timestamp; using generation time would fabricate one.
const townRoutes: SitemapEntry[] = towns.map((t) => ({
  path: `/service-areas/${t.slug}`,
}));

// Dynamic: county hub pages (/service-areas/county/{slug}).
const countyRoutes: SitemapEntry[] = counties.map((c) => ({
  path: `/service-areas/county/${c.slug}`,
}));

// Dynamic: service-town landing pages (/service-areas/{town}/{service}).
// Only hand-written pairs are indexable; templated coverage pages render
// noindex,follow and are deliberately excluded here.
const indexablePairs = indexableServiceTownPairs();
const indexablePairKeys = new Set(
  indexablePairs.map((p) => `${p.townSlug}|${p.serviceSlug}`),
);
const serviceTownRoutes: SitemapEntry[] = indexablePairs.map((e) => ({
  path: `/service-areas/${e.townSlug}/${e.serviceSlug}`,
}));

// Dynamic: flat-slug service×town pages ("/roofing-highlands-nc"). These are
// real, self-canonical, indexable routes in src/App.tsx.
const flatSlugRoutes: SitemapEntry[] = [...tier1FlatEntries, ...tier2FlatEntries]
  .filter((e) => indexablePairKeys.has(`${e.townSlug}|${e.serviceSlug}`))
  .map((e) => ({ path: `/${e.flatSlug}` }));

// Dynamic: individual project case-study pages (/projects/{slug}).
const projectRoutes: SitemapEntry[] = projectDetails.map((p) => ({
  path: `/projects/${p.slug}`,
}));

// Dynamic: one entry per blog post. lastmod = post.date (authoritative,
// page-specific). Skip lastmod if the date is unparseable.
const blogRoutes: SitemapEntry[] = blogPosts.map((p) => {
  const d = new Date(p.date);
  const entry: SitemapEntry = { path: `/blog/${p.slug}` };
  if (!isNaN(d.getTime())) entry.lastmod = d.toISOString().slice(0, 10);
  return entry;
});

// If there are slugs in the public sitemap that ARE NOT in blogPosts, they must
// be removed. The generator already handles this by only sourcing from blogPosts.

// De-duplicate by path (first wins) to guarantee no duplicate <url> entries.
const seen = new Set<string>();
const entries: SitemapEntry[] = [
  ...staticRoutes,
  ...townRoutes,
  ...countyRoutes,
  ...serviceTownRoutes,
  ...flatSlugRoutes,
  ...projectRoutes,
  ...blogRoutes,
].filter((e) => {
  if (seen.has(e.path)) return false;
  seen.add(e.path);
  return true;
});

function generateSitemap(items: SitemapEntry[]) {
  const urls = items.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
    ``,
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(
  `sitemap.xml written (${entries.length} entries — ${staticRoutes.length} static, ${townRoutes.length} towns, ${countyRoutes.length} counties, ${serviceTownRoutes.length} service-town, ${flatSlugRoutes.length} flat-slug, ${projectRoutes.length} projects, ${blogRoutes.length} blog posts)`,
);