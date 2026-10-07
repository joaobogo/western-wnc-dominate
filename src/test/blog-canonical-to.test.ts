import { describe, it, expect } from "vitest";
import { blogPosts, isLinkableBlogPost, linkableBlogPosts, type BlogPost } from "@/data/blogs";
import { canonicalUrlFor } from "@/components/SEOHead";

// P3.5: a post with `canonicalTo` is folded into a survivor. It must drop out
// of every link block and the sitemap, and its head must point at the survivor.
describe("blog consolidation (canonicalTo)", () => {
  // João confirmed these 13 clusters on 7 Oct 2026. Folding any other post needs the owner's OK
  // and an update to this list.
  const CONFIRMED_FOLDED = [
    "how-to-choose-roofing-contractor-franklin-nc",
    "metal-roofing-vs-shingles-cashiers-nc",
    "metal-roofing-vs-shingles-highlands-nc",
    "metal-vs-shingle-roof-franklin-highlands-cashiers",
    "roof-repair-franklin-nc",
    "roof-repair-vs-replacement-cashiers-nc",
    "roof-repair-vs-replacement-cullowhee-nc",
    "roof-repair-vs-replacement-franklin-nc",
    "roof-repair-vs-replacement-sylva-nc",
    "roof-repair-vs-roof-replacement-highlands-nc",
    "roof-replacement-franklin-nc",
    "roofing-company-cashiers-nc-choosing-contractor",
    "roofing-contractor-sylva-nc-roofing-gutters-repairs",
  ];

  it("only the owner-confirmed clusters are folded", () => {
    const folded = blogPosts.filter((p) => p.canonicalTo || p.indexable === false).map((p) => p.slug).sort();
    expect(folded).toEqual([...CONFIRMED_FOLDED].sort());
    expect(linkableBlogPosts()).toHaveLength(blogPosts.length - CONFIRMED_FOLDED.length);
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
