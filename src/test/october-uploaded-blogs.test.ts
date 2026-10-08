import { describe, expect, it } from "vitest";
import { readFileSync, statSync } from "node:fs";
import { blogPosts, getBlogBySlug, isLinkableBlogPost } from "@/data/blogs";
import { canonicalUrlFor } from "@/components/SEOHead";

const uploadedFiles = [
  "tree-on-roof_2.html",
  "under-deck-drainage.html",
  "deck-ledger-flashing.html",
  "acv-vs-rcv-roof.html",
  "architectural-vs-3-tab.html",
  "roof-replacement-tax-deductible_1.html",
];

describe("October 8 uploaded articles", () => {
  const sitemap = readFileSync("public/sitemap.xml", "utf8");
  const manifest = JSON.parse(readFileSync("public/prerender-manifest.json", "utf8"));

  for (const filename of uploadedFiles) {
    const slug = filename.replace(/\.html$/, "");
    it(`keeps ${filename} as an indexable canonical article with its own image`, () => {
      const post = getBlogBySlug(slug);
      expect(post).toBeDefined();
      if (!post) return;
      expect(blogPosts.filter((p) => p.slug === slug)).toHaveLength(1);
      expect(isLinkableBlogPost(post)).toBe(true);
      expect(post.canonicalTo).toBeUndefined();
      expect(canonicalUrlFor(`/blog/${slug}`)).toBe(`https://highlandernc.com/blog/${slug}`);
      expect(sitemap).toContain(`<loc>https://highlandernc.com/blog/${slug}</loc>`);
      expect(JSON.stringify(manifest)).toContain(`/blog/${slug}`);
      expect(post.date).toBe("2026-10-08");
      expect(post.image).toContain(`${slug}-hero.jpg`);
      expect(statSync(`src/assets/blog/${slug}-hero.jpg`).size).toBeLessThan(100_000);
      expect(post.imageAlt).toMatch(/^Generated illustration/);
      expect(post.faqs?.length).toBeGreaterThanOrEqual(4);
      expect(post.relatedServices?.some((s) => s.path === "/service-areas/franklin-nc")).toBe(true);
      expect(post.metaTitle.length).toBeLessThanOrEqual(60);
      expect(post.metaDescription.length).toBeLessThanOrEqual(160);
      expect(post.content).not.toMatch(/data-blg-cta|babylovegrowth|<script|<iframe|supabase\.co/);
      expect(post.title + post.content + JSON.stringify(post.faqs)).not.toMatch(/\barchitectural\b|24\/7|from a ladder|deck safety inspection partners/);
    });
  }

  it("does not advertise the expired federal solar credit for new 2026 roofs", () => {
    const post = getBlogBySlug("roof-replacement-tax-deductible_1");
    expect(post?.title).not.toContain("30%");
    expect(post?.content).toContain("unavailable for property placed in service after December 31, 2025");
    expect(post?.content).toContain("https://www.irs.gov/credits-deductions/residential-clean-energy-credit");
  });

  it("does not promise recoverable depreciation or postpone policy deadlines", () => {
    const post = getBlogBySlug("acv-vs-rcv-roof");
    expect(post?.content).toContain("The policy determines when the clock starts");
    expect(post?.content).not.toContain("still gets released in full");
    expect(post?.content).not.toContain("What you get on day one is what you get, period");
  });
});