/**
 * Town × service pages that are indexable (in the sitemap), by service.
 *
 * Kept as a small static list so cost and hub pages can link to them without
 * loading the 100 KB service-town content table. A test checks it against
 * `indexableServiceTownPairs()` in src/data/service-town-content.ts, so it
 * cannot drift: when a page is opened or closed there, the test names the
 * change to make here.
 */
export const INDEXABLE_TOWN_SERVICES: Record<string, string[]> = {
  "roof-replacement": ["cashiers-nc", "franklin-nc", "highlands-nc", "sylva-nc", "waynesville-nc"],
  "roof-repair": ["cashiers-nc", "franklin-nc", "highlands-nc", "sylva-nc", "waynesville-nc"],
  "metal-roofing": ["cashiers-nc", "franklin-nc", "highlands-nc", "sylva-nc", "waynesville-nc"],
  "synthetic-brava": ["cashiers-nc", "highlands-nc"],
  roofing: ["cashiers-nc", "highlands-nc", "waynesville-nc"],
  gutters: ["cashiers-nc", "franklin-nc", "highlands-nc", "waynesville-nc"],
  handyman: ["waynesville-nc"],
  construction: ["cashiers-nc", "franklin-nc", "highlands-nc"],
  "home-repairs": ["cashiers-nc", "franklin-nc", "highlands-nc"],
  additions: ["highlands-nc"],
  "outdoor-living": ["highlands-nc"],
  "roofing-construction": ["sylva-nc"],
};
