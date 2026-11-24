/**
 * Website fix list, Nov 23, 2026, Task 2: pages Google crawled but had not
 * indexed got new internal links on this date, so the sitemap gives them that
 * <lastmod>. Read by scripts/generate-sitemap.ts and its test.
 */
export const TASK2_LINKED_ON = "2026-11-24";
export const TASK2_PAGES = new Set([
  "/services",
  "/construction/handyman",
  "/construction/outdoor-living/hardscape",
  "/blog/home-addition-permits",
  "/blog/metal-shingles-vs-standing-seam",
  "/blog/storm-chaser-roofing",
  "/blog/dark-vs-light-roof",
  "/blog/brown-ceiling-stains",
  "/blog/copper-roof-lifespan",
  "/blog/roof-underlayment-types",
  "/blog/roof-lifespan-western-nc-by-material",
]);
