import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { blogPosts } from "@/data/blogs";
import { loadRedirectRules, loadSiteInventory, resolveUrl } from "../../scripts/lib/redirect-rules.mjs";
const suppliedLinks = {
  "shingle-nail-pops_1": [
    "https://basc.pnnl.gov/resource-guides/asphalt-shingle-roofs",
    "https://blog.airanddryerventcleaningavondale.com/blog/dryer-vent-roof-problems",
    "https://highlandernc.com/",
    "https://highlandernc.com/blog/roof-inspection-signs-sylva-nc",
    "https://highlandernc.com/blog/roof-leak-repair-western-nc",
    "https://highlandernc.com/blog/roof-lifespan-mountain-home-wnc",
    "https://highlandernc.com/blog/shingle-blistering",
    "https://highlandernc.com/blog/storm-damage-roof-inspection_1",
    "https://highlandernc.com/blog/wind-damaged-shingles",
    "https://highlandernc.com/roofing",
    "https://highlandernc.com/roofing/roof-repair",
    "https://highlandernc.com/roofing/roof-replacement",
    "https://highlandernc.com/service-areas/franklin-nc/roof-repair",
    "https://highlandernc.com/service-areas/sylva-nc/roof-repair",
    "https://www.asphaltroofing.org/wp-content/uploads/2017/05/Nail-Application-of-Asphalt-Shingles-_20240717_FINAL.pdf",
    "https://www.nachi.org/asphalt-comp-shingles-part26-80.htm",
    "https://www.thisoldhouse.com/roofing/what-is-a-roof-inspection"
  ]
};
const rules = loadRedirectRules();
const inventory = loadSiteInventory();
const sitemap = readFileSync("public/sitemap.xml", "utf8");
describe("November 25 uploaded blogs", () => {
  for (const [slug, links] of Object.entries(suppliedLinks)) {
    it(`${slug} uses its exact uploaded filename once`, () => {
      const posts = blogPosts.filter(post => post.slug === slug);
      expect(posts).toHaveLength(1);
      expect(posts[0]?.date).toBe("2026-11-25");
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
  it("shingle-nail-pops forwards once to the uploaded filename", () => {
    const r = resolveUrl(rules, "/blog/shingle-nail-pops", {isLive: inventory.isLive});
    expect(r.hops).toHaveLength(1);
    expect(r.terminal).toBe("live");
  });
});
