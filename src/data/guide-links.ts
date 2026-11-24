/**
 * Website fix instructions (Nov 23, 2026), Task 2: pages Google crawled but
 * has not indexed yet get crawlable links from closely related pages, with
 * descriptive anchors. Rendered in the prerendered HTML as plain <a href>.
 */
export interface GuideLink {
  href: string;
  anchor: string;
}

/** Blog post slug → related guides it links to (shown near the top of the article). */
export const BLOG_RELATED_GUIDES: Record<string, GuideLink[]> = {
  "wnc-construction-permitting-guide": [{ href: "/blog/home-addition-permits", anchor: "home addition permits in North Carolina" }],
  "standing-seam-vs-exposed-fastener": [{ href: "/blog/metal-shingles-vs-standing-seam", anchor: "metal shingles vs. standing seam" }],
  "storm-damage-checklist-western-nc": [{ href: "/blog/storm-chaser-roofing", anchor: "how to spot storm-chaser roofers" }],
  "metal-roof-colors": [{ href: "/blog/dark-vs-light-roof", anchor: "dark vs. light roof colors for Western NC" }],
  "energy-efficient-roofing": [{ href: "/blog/dark-vs-light-roof", anchor: "dark vs. light roof colors for Western NC" }],
  "roof-leak-repair-western-nc": [{ href: "/blog/brown-ceiling-stains", anchor: "what brown ceiling stains mean" }],
  "copper-roof-cost": [{ href: "/blog/copper-roof-lifespan", anchor: "how long a copper roof lasts" }],
  "ice-and-water-shield": [{ href: "/blog/roof-underlayment-types", anchor: "roof underlayment types compared" }],
  "roof-lifespan-mountain-home-wnc": [{ href: "/blog/roof-lifespan-western-nc-by-material", anchor: "roof lifespan in Western NC by material" }],
};

/** Service page → guides it links to (the "Related guides" line). */
export const SERVICE_RELATED_GUIDES: Record<string, GuideLink[]> = {
  "/roofing/metal": [{ href: "/blog/metal-shingles-vs-standing-seam", anchor: "metal shingles vs. standing seam" }],
  "/roofing/storm-damage": [{ href: "/blog/storm-chaser-roofing", anchor: "how to spot storm-chaser roofers" }],
  "/roofing/roof-repair": [{ href: "/blog/brown-ceiling-stains", anchor: "what brown ceiling stains mean" }],
  "/roofing/specialty": [{ href: "/blog/copper-roof-lifespan", anchor: "how long a copper roof lasts" }],
  "/roofing/roof-replacement": [
    { href: "/blog/roof-underlayment-types", anchor: "roof underlayment types compared" },
    { href: "/blog/roof-lifespan-western-nc-by-material", anchor: "roof lifespan in Western NC by material" },
  ],
};
