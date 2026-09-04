import { describe, it, expect } from "vitest";
import { blogPosts, isLinkableBlogPost, linkableBlogPosts, type BlogPost } from "@/data/blogs";
import { canonicalUrlFor } from "@/components/SEOHead";

// P3.5: a post with `canonicalTo` is folded into a survivor. It must drop out
// of every link block and the sitemap, and its head must point at the survivor.
describe("blog consolidation (canonicalTo)", () => {
  it("no post is folded until João confirms the clusters", () => {
    expect(blogPosts.filter((p) => p.canonicalTo)).toEqual([]);
    expect(linkableBlogPosts()).toHaveLength(blogPosts.length);
  });

  it("isLinkableBlogPost excludes folded posts and keeps the rest", () => {
    const base = blogPosts[0];
    const folded: BlogPost = { ...base, slug: "folded-copy", canonicalTo: base.slug };
    expect(isLinkableBlogPost(base)).toBe(true);
    expect(isLinkableBlogPost(folded)).toBe(false);
  });

  it("every canonicalTo (when set) must name an existing, non-folded survivor", () => {
    const slugs = new Set(blogPosts.map((p) => p.slug));
    for (const p of blogPosts) {
      if (!p.canonicalTo) continue;
      expect(slugs.has(p.canonicalTo), `${p.slug} → ${p.canonicalTo} does not exist`).toBe(true);
      const survivor = blogPosts.find((s) => s.slug === p.canonicalTo)!;
      expect(survivor.canonicalTo, `${p.canonicalTo} is itself folded`).toBeUndefined();
      expect(p.canonicalTo).not.toBe(p.slug);
    }
  });

  it("the canonical URL a folded post would emit is the survivor's URL", () => {
    expect(canonicalUrlFor("/blog/storm-season-prep-bryson-city-nc")).toBe("https://highlandernc.com/blog/storm-season-prep-bryson-city-nc");
  });
});
