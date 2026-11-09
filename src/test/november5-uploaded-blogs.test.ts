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
    expect(post.content).not.toMatch(/[\u2013\u2014]|in-house|babylovegrowth|highlandernc\.com/i);
    for (const m of post.content.matchAll(/\]\(\/blog\/([^)]+)\)/g)) {
      const linked = getBlogBySlug(m[1]);
      expect(linked && isLinkableBlogPost(linked), m[1]).toBeTruthy();
    }
  });

  it("publishes fascia-and-soffit-repair once with its cover and approved uploaded backlink", () => {
    const post = getBlogBySlug("fascia-and-soffit-repair");
    expect(post).toBeDefined();
    if (!post) return;
    expect(blogPosts.filter((p) => p.slug === "fascia-and-soffit-repair")).toHaveLength(1);
    expect(String(post.image)).toContain("fascia-and-soffit-repair-hero");
    expect(post.content).toContain("](https://sandiegosolar.com/blog/why-staggered-installs-cause-roof-damage)");
    expect(post.content).not.toMatch(/[\u2013\u2014]|in-house|highlandernc\.com/i);
  });
});

describe("November 9 uploaded articles", () => {
  const slugs = ["cedar-shake-maintenance", "gutter-hanger-types", "hidden-deck-fasteners-vs-screws"];
  it.each(slugs)("publishes %s exactly once at its filename slug", (slug) => {
    expect(blogPosts.filter((p) => p.slug === slug)).toHaveLength(1);
    expect(getBlogBySlug(slug)?.date).toBe("2026-11-09");
  });
  it("keeps the uploaded outside source links", () => {
    expect(getBlogBySlug("cedar-shake-maintenance")?.content).toContain("https://www.cedarbureau.org/literature-education/maintenance-faq/");
    expect(getBlogBySlug("gutter-hanger-types")?.content).toContain("https://www.finehomebuilding.com/project-guides/roofing/gutter-hangers");
    expect(getBlogBySlug("hidden-deck-fasteners-vs-screws")?.content).toContain("https://www.moistureshield.com/about/blog/hidden-fasteners-vs-deck-screws/");
  });
});
