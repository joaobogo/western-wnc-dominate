import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = "https://western-wnc-dominate.lovable.app";
const today = new Date().toISOString().split("T")[0];

// Static routes with priority + change frequency
const staticRoutes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/roofing", priority: "0.95", changefreq: "weekly" },
  { path: "/construction", priority: "0.95", changefreq: "weekly" },
  { path: "/service-areas", priority: "0.9", changefreq: "monthly" },
  { path: "/gallery", priority: "0.8", changefreq: "weekly" },
  { path: "/reviews", priority: "0.8", changefreq: "weekly" },
  { path: "/about", priority: "0.7", changefreq: "monthly" },
  { path: "/team", priority: "0.6", changefreq: "monthly" },
  { path: "/certifications", priority: "0.6", changefreq: "monthly" },
  { path: "/contact", priority: "0.85", changefreq: "monthly" },
  { path: "/blog", priority: "0.85", changefreq: "weekly" },
  { path: "/financing", priority: "0.7", changefreq: "monthly" },
  { path: "/careers", priority: "0.5", changefreq: "monthly" },
  // Roofing sub-services (focused set)
  { path: "/roofing/roof-replacement", priority: "0.85", changefreq: "monthly" },
  { path: "/roofing/roof-repair", priority: "0.85", changefreq: "monthly" },
  { path: "/roofing/metal", priority: "0.9", changefreq: "monthly" },
  { path: "/roofing/brava-synthetic", priority: "0.85", changefreq: "monthly" },
  { path: "/roofing/storm-damage", priority: "0.85", changefreq: "monthly" },
  { path: "/roofing/commercial", priority: "0.8", changefreq: "monthly" },
  // Construction sub-services (focused set)
  { path: "/construction/additions", priority: "0.8", changefreq: "monthly" },
  { path: "/construction/outdoor-living", priority: "0.8", changefreq: "monthly" },
  { path: "/construction/flatwork", priority: "0.8", changefreq: "monthly" },
  { path: "/construction/consultation", priority: "0.7", changefreq: "monthly" },
];

async function loadDataModule(modulePath) {
  // Read raw TS file and extract slugs via regex (avoids needing TS loader at build time)
  const fs = await import("node:fs");
  const src = fs.readFileSync(modulePath, "utf8");
  const matches = [...src.matchAll(/slug:\s*["']([^"']+)["']/g)];
  return matches.map((m) => m[1]);
}

async function buildSitemap() {
  const townSlugs = await loadDataModule(resolve(__dirname, "../src/data/towns.ts"));
  const serviceSlugs = await loadDataModule(resolve(__dirname, "../src/data/services.ts"));
  const blogSlugs = await loadDataModule(resolve(__dirname, "../src/data/blogs.ts"));
  const projectSlugs = await loadDataModule(resolve(__dirname, "../src/data/projects.ts"));

  // Tier 1 service × town pairings — parsed from service-town-content.ts
  const fs = await import("node:fs");
  const stcSrc = fs.readFileSync(resolve(__dirname, "../src/data/service-town-content.ts"), "utf8");
  const pairMatches = [...stcSrc.matchAll(/townSlug:\s*["']([^"']+)["'][\s\S]{0,120}?serviceSlug:\s*["']([^"']+)["']/g)];
  const pairRoutes = pairMatches.map(([, t, s]) => ({
    path: `/service-areas/${t}/${s}`,
    priority: "0.85",
    changefreq: "monthly",
  }));

  const dynamicRoutes = [
    ...townSlugs.map((s) => ({ path: `/service-areas/${s}`, priority: "0.85", changefreq: "monthly" })),
    ...blogSlugs.map((s) => ({ path: `/blog/${s}`, priority: "0.7", changefreq: "monthly" })),
    ...projectSlugs.map((s) => ({ path: `/projects/${s}`, priority: "0.65", changefreq: "monthly" })),
    ...pairRoutes,
  ];
  // serviceSlugs intentionally unused — /services/:slug routes have been removed.
  void serviceSlugs;

  const all = [...staticRoutes, ...dynamicRoutes];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all
  .map(
    (r) => `  <url>
    <loc>${BASE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

  writeFileSync(resolve(__dirname, "../public/sitemap.xml"), xml, "utf8");
  console.log(`✓ sitemap.xml generated with ${all.length} URLs`);
}

buildSitemap().catch((e) => {
  console.error("Sitemap generation failed:", e);
  process.exit(1);
});