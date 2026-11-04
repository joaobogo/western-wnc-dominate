import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { blogPosts, getBlogBySlug, isLinkableBlogPost } from "@/data/blogs";

const slugs = ["master-suite-addition", "roof-flashing-types", "roof-insurance-claim-process"];

describe("November 4 uploaded articles", () => {
  for (const slug of slugs) {
    it(`publishes ${slug} once at its filename slug with its own cover`, () => {
      const post = getBlogBySlug(slug);
      expect(post).toBeDefined();
      if (!post) return;
      expect(blogPosts.filter((p) => p.slug === slug)).toHaveLength(1);
      expect(isLinkableBlogPost(post)).toBe(true);
      expect(String(post.image)).toContain(`${slug}-hero`);
      expect(post.metaTitle!.length).toBeLessThanOrEqual(60);
      expect(post.metaDescription!.length).toBeLessThanOrEqual(160);
      expect(post.faqs!.length).toBeGreaterThanOrEqual(4);
      expect(post.content).not.toMatch(/[\u2013\u2014]|in-house|babylovegrowth|highlandernc\.com/i);
    });
  }

  it("redirects the duplicate underlayment upload to the existing article", () => {
    expect(getBlogBySlug("roof-underlayment-types_2")).toBeUndefined();
    const r = readFileSync("public/_redirects", "utf8");
    expect(r).toMatch(/\/blog\/roof-underlayment-types_2\s+\/blog\/roof-underlayment-types_1\s+301!/);
  });
});
