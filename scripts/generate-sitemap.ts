// Runs before `vite dev` and `vite build` (predev/prebuild hooks).
// Writes public/sitemap.xml sourced from src/data/{blogs,towns}.ts plus the
// curated list of indexable static routes below. Redirects, /lp/* paid
// landing pages, form-only funnels, and admin routes are intentionally excluded.

import { writeFileSync } from "fs";
import { resolve } from "path";
import { blogPosts } from "../src/data/blogs";
import { towns } from "../src/data/towns";

const BASE_URL = "https://highlandernc.com";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const today = new Date().toISOString().slice(0, 10);

// Indexable static routes. Copied verbatim from src/App.tsx and pruned:
// - excluded: <Navigate> redirects, /lp/* paid landing pages (noindex),
//   /admin/*, /roofing-intake, /construction-intake, /*-builder,
//   /design-intake, /quote-flow, /request-quote-form*, /seo-monitoring,
//   /roof-designer form, /highlands-nc (legacy redirect duplicate).
const staticRoutes: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  // Core pages
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/team", changefreq: "monthly", priority: "0.6" },
  { path: "/certifications", changefreq: "monthly", priority: "0.6" },
  { path: "/reviews", changefreq: "weekly", priority: "0.7" },
  { path: "/recent-projects", changefreq: "weekly", priority: "0.7" },
  { path: "/careers", changefreq: "monthly", priority: "0.5" },
  { path: "/community", changefreq: "monthly", priority: "0.5" },
  { path: "/giving-back", changefreq: "monthly", priority: "0.5" },
  { path: "/faq", changefreq: "monthly", priority: "0.6" },
  { path: "/financing", changefreq: "monthly", priority: "0.6" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  { path: "/request-inspection", changefreq: "monthly", priority: "0.8" },

  // Roofing money pages
  { path: "/roofing", changefreq: "weekly", priority: "0.9" },
  { path: "/roofing/roof-replacement", changefreq: "weekly", priority: "0.9" },
  { path: "/roofing/roof-repair", changefreq: "weekly", priority: "0.9" },
  { path: "/roofing/storm-damage", changefreq: "weekly", priority: "0.8" },
  { path: "/roofing/commercial", changefreq: "weekly", priority: "0.8" },
  { path: "/roofing/residential", changefreq: "weekly", priority: "0.9" },
  { path: "/roofing/specialty", changefreq: "weekly", priority: "0.7" },
  { path: "/roofing/metal", changefreq: "weekly", priority: "0.9" },
  { path: "/roofing/brava-synthetic", changefreq: "weekly", priority: "0.8" },
  { path: "/roofing/skylights", changefreq: "monthly", priority: "0.7" },
  { path: "/roofing/gutters", changefreq: "monthly", priority: "0.7" },

  // Construction money pages
  { path: "/construction", changefreq: "weekly", priority: "0.9" },
  { path: "/construction/additions", changefreq: "weekly", priority: "0.8" },
  { path: "/construction/outdoor-living", changefreq: "weekly", priority: "0.8" },
  { path: "/construction/renovations", changefreq: "weekly", priority: "0.8" },
  { path: "/construction/siding", changefreq: "weekly", priority: "0.8" },
  { path: "/construction/design", changefreq: "monthly", priority: "0.7" },
  { path: "/construction/consultation", changefreq: "monthly", priority: "0.7" },

  // Gutter & exterior hubs
  { path: "/exterior-improvements", changefreq: "monthly", priority: "0.6" },
  { path: "/layouts-planning", changefreq: "monthly", priority: "0.5" },

  // Service Areas hub
  { path: "/service-areas", changefreq: "weekly", priority: "0.8" },
  { path: "/blog", changefreq: "daily", priority: "0.8" },

  // Legal
  { path: "/privacy-policy", changefreq: "yearly", priority: "0.2" },
  { path: "/accessibility", changefreq: "yearly", priority: "0.2" },
];

// Dynamic: one entry per town page
const townRoutes: SitemapEntry[] = towns.map((t) => ({
  path: `/service-areas/${t.slug}`,
  changefreq: "monthly",
  priority: "0.7",
  lastmod: today,
}));

// Dynamic: one entry per blog post (use post.date as lastmod when valid)
const blogRoutes: SitemapEntry[] = blogPosts.map((p) => {
  const d = new Date(p.date);
  const lastmod = isNaN(d.getTime()) ? today : d.toISOString().slice(0, 10);
  return {
    path: `/blog/${p.slug}`,
    changefreq: "monthly",
    priority: "0.6",
    lastmod,
  };
});

const entries: SitemapEntry[] = [...staticRoutes, ...townRoutes, ...blogRoutes];

function generateSitemap(items: SitemapEntry[]) {
  const urls = items.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
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
  `sitemap.xml written (${entries.length} entries — ${staticRoutes.length} static, ${townRoutes.length} towns, ${blogRoutes.length} blog posts)`,
);