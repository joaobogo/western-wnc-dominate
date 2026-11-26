import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { blogPosts } from "@/data/blogs";
import { loadRedirectRules, loadSiteInventory, resolveUrl } from "../../scripts/lib/redirect-rules.mjs";
const suppliedLinks = {
  "cedar-shake-roofing": [
    "https://abcbins.com/pressure-washing-cedar-fence",
    "https://extension.oregonstate.edu/catalog/pnw-733-care-maintenance-wood-shingle-shake-roofs",
    "https://highlandernc.com/",
    "https://highlandernc.com/blog/brava-synthetic-vs-cedar-shake-vs-slate-wnc",
    "https://highlandernc.com/blog/cedar-shake-maintenance",
    "https://highlandernc.com/blog/moss-on-roof-removal",
    "https://highlandernc.com/blog/mountain-roof-ventilation-science",
    "https://highlandernc.com/blog/roof-lifespan-mountain-home-wnc",
    "https://highlandernc.com/blog/roof-lifespan-western-nc-by-material",
    "https://highlandernc.com/projects/cedar-shake-estate-highlands",
    "https://highlandernc.com/roofing",
    "https://highlandernc.com/roofing-cost-western-nc",
    "https://highlandernc.com/roofing/roof-repair",
    "https://ibhs.org/guidance/ricowi-roof-guide-cedar-shingles-and-shakes/",
    "https://research.fs.usda.gov/download/treesearch/32444.pdf",
    "https://www.cedarbureau.org/cms-assets/documents/24826-485192.cssb-adjusters-guide-to-hail.pdf",
    "https://www.cedarbureau.org/literature-education/product-faq/",
    "https://www.cedarbureau.org/the-shingle-news/shakes-vs-shingles-for-your-roof/",
    "https://www.cedarbureau.org/wp-content/uploads/2025/05/RoofManual_DIGITAL.pdf",
    "https://www.consumerreports.org/home-garden/roofing/buying-guide/",
    "https://www.thisoldhouse.com/roofing/cedar-shake-roof-cost"
  ]
};
const rules = loadRedirectRules();
const inventory = loadSiteInventory();
const sitemap = readFileSync("public/sitemap.xml", "utf8");
describe("November 26 uploaded blogs", () => {
  for (const [slug, links] of Object.entries(suppliedLinks)) {
    it(`${slug} uses its exact uploaded filename once`, () => {
      const posts = blogPosts.filter(post => post.slug === slug);
      expect(posts).toHaveLength(1);
      expect(posts[0]?.date).toBe("2026-11-26");
      expect(posts[0]?.canonicalTo).toBeUndefined();
      expect(sitemap.match(new RegExp(`<loc>https://highlandernc.com/blog/${slug}</loc>`, "g"))).toHaveLength(1);
      expect(resolveUrl(rules, `/blog/${slug}`, {isLive: inventory.isLive}).hops).toHaveLength(0);
    });
    it(`${slug} retains every uploaded source and internal destination`, () => {
      const post = blogPosts.find(post => post.slug === slug);
      for (const link of links) {
        expect(post?.content, link).toContain(`](${link})`);
        if (new URL(link).hostname === "highlandernc.com") {
          expect(resolveUrl(rules, link, {isLive: inventory.isLive}).terminal, link).toBe("live");
        }
      }
    });
  }
});
