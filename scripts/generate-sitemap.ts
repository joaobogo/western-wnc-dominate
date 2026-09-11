// Runs before `vite dev` and `vite build` (predev/prebuild hooks).
// Writes public/sitemap.xml sourced from src/data/{blogs,towns}.ts plus the
// curated list of indexable static routes below. Redirects, /lp/* paid
// landing pages, form-only funnels, and admin routes are intentionally excluded.
//
// The sitemap lists ONLY indexable URLs. The list of routes that must exist as
// prerendered HTML (a superset: noindex coverage pages, county hubs, funnel
// steps) is public/prerender-manifest.json, written by
// scripts/generate-prerender-manifest.ts immediately after this script.

import { writeFileSync } from "fs";
import { resolve } from "path";
import { blogPosts } from "../src/data/blogs";
import { towns } from "../src/data/towns";
import { indexableServiceTownPairs } from "../src/data/service-town-content";
import { projectDetails } from "../src/data/projects";

const BASE_URL = "https://western-wnc-dominate.lovable.app";

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
  { path: "/community" }, // /giving-back 301s here — one URL only
  { path: "/faq" },
  { path: "/roofing-cost-western-nc", changefreq: "monthly", priority: "0.8" },
  { path: "/roofing/metal/cost", changefreq: "monthly", priority: "0.8" },
  { path: "/financing" },
  { path: "/contact" },
  { path: "/request-inspection" },

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
// Towns switched off with `indexable: false` (Task 7) render noindex,follow and
// are excluded here; they stay prerendered via the manifest.
const townRoutes: SitemapEntry[] = towns
  .filter((t) => t.indexable !== false)
  .map((t) => ({
    path: `/service-areas/${t.slug}`,
  }));

// County hub pages (/service-areas/county/{slug}) render noindex,follow — they
// are internal link hubs, not ranking targets — so they are NOT in the sitemap.
// They are still prerendered via public/prerender-manifest.json.
const countyRoutes: SitemapEntry[] = [];

// Dynamic: service-town landing pages (/service-areas/{town}/{service}).
// Only hand-written pairs are indexable and listed here. The generated
// coverage pages render noindex,follow; they are still prerendered (so an
// internal link returns a 200) via public/prerender-manifest.json, but a
// noindex URL must never be submitted in the sitemap.
const indexablePairs = indexableServiceTownPairs();
const serviceTownRoutes: SitemapEntry[] = indexablePairs.map((e) => ({
  path: `/service-areas/${e.townSlug}/${e.serviceSlug}`,
}));

// Flat-slug service×town URLs ("/roofing-highlands-nc") are legacy shapes that
// render the SAME page as /service-areas/{town}/{service}. They 301 to the
// nested URL in public/_redirects, so they are deliberately NOT in the sitemap.
const flatSlugRoutes: SitemapEntry[] = [];

// Dynamic: individual project case-study pages (/projects/{slug}).
const projectRoutes: SitemapEntry[] = projectDetails.map((p) => ({
  path: `/projects/${p.slug}`,
}));

// Dynamic: one entry per blog post. lastmod = post.date (authoritative,
// page-specific). Skip lastmod if the date is unparseable.
// Posts folded into a survivor (canonicalTo set, P3.5) render noindex with a
// canonical to the survivor and are NOT listed here.
const blogRoutes: SitemapEntry[] = blogPosts
  .filter((p) => !p.canonicalTo && p.indexable !== false)
  .map((p) => {
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

// One URL shape sitewide: NO trailing slash (the homepage is always "/").
// Internal links, UrlNormalizer, the canonical tag, og:url and the prerendered
// file names (dist/<route>.html) all use this shape, so the sitemap must too —
// a crawler never follows a redirect from a sitemap URL or a canonical.
const withoutTrailingSlash = (path: string) =>
  path === "/" ? "/" : path.replace(/\/+$/, "");

function generateSitemap(items: SitemapEntry[]) {
  const urls = items.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${withoutTrailingSlash(e.path)}</loc>`,
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