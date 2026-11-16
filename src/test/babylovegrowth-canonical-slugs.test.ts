import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { blogPosts, getBlogBySlug } from "@/data/blogs";

const corrections = [
  { slug: "tree-on-roof", previous: ["tree-on-roof_2"], partners: ["villageprecisionpros.com", "betterqualitybuilders.com"] },
  { slug: "roof-replacement-tax-deductible", previous: ["roof-replacement-tax-deductible_1"], partners: ["myfloridasolar.com"] },
  { slug: "roof-underlayment-types", previous: ["roof-underlayment-types_1", "roof-underlayment-types_2", "roof-underlayment-types_3"], partners: ["energysion.com"] },
];

describe("BabyLoveGrowth approved canonical URLs", () => {
  const rules = readFileSync("public/_redirects", "utf8");
  const sitemap = readFileSync("public/sitemap.xml", "utf8");
  const manifest = JSON.parse(readFileSync("public/prerender-manifest.json", "utf8"));

  for (const { slug, previous, partners } of corrections) {
    it(`publishes ${slug} once, retains backlinks and redirects previous URLs in one hop`, () => {
      const post = getBlogBySlug(slug);
      expect(post).toBeDefined();
      expect(blogPosts.filter((p) => p.slug === slug)).toHaveLength(1);
      expect(post?.canonicalTo).toBeUndefined();
      expect(sitemap).toContain(`<loc>https://highlandernc.com/blog/${slug}</loc>`);
      expect(JSON.stringify(manifest)).toContain(`"/blog/${slug}"`);
      for (const domain of partners) expect(post?.content).toContain(domain);
      expect(rules.split("\n").some((line) => line.trim().split(/\s+/)[0] === `/blog/${slug}`)).toBe(false);
      for (const old of previous) {
        expect(getBlogBySlug(old)).toBeUndefined();
        expect(sitemap).not.toContain(`<loc>https://highlandernc.com/blog/${old}</loc>`);
        expect(rules).toMatch(new RegExp(`/blog/${old}\\s+/blog/${slug}\\s+301!`));
        for (const p of blogPosts) expect(p.content).not.toContain(`](/blog/${old})`);
      }
    });
  }
});