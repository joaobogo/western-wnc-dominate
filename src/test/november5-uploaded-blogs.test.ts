import { describe, expect, it } from "vitest";
import { blogPosts, getBlogBySlug, isLinkableBlogPost } from "@/data/blogs";

describe("November 5 uploaded articles", () => {
  it("publishes class-4-shingles-cost once at its filename slug with its own cover", () => {
    const post = getBlogBySlug("class-4-shingles-cost");
    expect(post).toBeDefined();
    if (!post) return;
    expect(blogPosts.filter((p) => p.slug === "class-4-shingles-cost")).toHaveLength(1);
    expect(isLinkableBlogPost(post)).toBe(true);
    expect(String(post.image)).toContain("class-4-shingles-cost-hero");
    expect(post.metaTitle!.length).toBeLessThanOrEqual(60);
    expect(post.metaDescription!.length).toBeLessThanOrEqual(160);
    expect(post.content).not.toMatch(/[\u2013\u2014]|in-house|babylovegrowth|highlandernc\.com|architectural|GAF/i);
    for (const m of post.content.matchAll(/\]\(\/blog\/([^)]+)\)/g)) {
      const linked = getBlogBySlug(m[1]);
      expect(linked && isLinkableBlogPost(linked), m[1]).toBeTruthy();
    }
  });
});
