import { describe, it, expect } from "vitest";
import { readFileSync, statSync } from "node:fs";
import { blogPosts, getBlogBySlug, isLinkableBlogPost } from "@/data/blogs";

const slugs = ["skylight-replacement-cost_1", "drip-edge-vs-gutter-apron", "copper-gutters-cost", "5-inch-vs-6-inch-gutters", "metal-roof-noise"];

describe("October 12 uploaded articles", () => {
  for (const slug of slugs) {
    it(`publishes ${slug} once with correct search metadata and its own cover`, () => {
      const post = getBlogBySlug(slug);
      expect(post).toBeDefined();
      if (!post) return;
      expect(blogPosts.filter(p => p.slug === slug)).toHaveLength(1);
      expect(isLinkableBlogPost(post)).toBe(true);
      expect(post.date).toBe("2026-10-12");
      expect(post.image).toContain(`${slug}-hero.jpg`);
      expect(statSync(`src/assets/blog/${slug}-hero.jpg`).size).toBeLessThan(100_000);
      expect(post.faqs?.length).toBeGreaterThanOrEqual(4);
      expect(post.metaTitle.length).toBeLessThanOrEqual(60);
      expect(post.metaDescription.length).toBeLessThanOrEqual(160);
      expect(post.content).not.toMatch(/data-blg-cta|babylovegrowth|<script|<iframe|supabase\.co|free estimate|[—–]/);
      expect(readFileSync("public/sitemap.xml", "utf8")).toContain(`<loc>https://highlandernc.com/blog/${slug}</loc>`);
      expect(readFileSync("public/prerender-manifest.json", "utf8")).toContain(`/blog/${slug}`);
      for (const match of post.content.matchAll(/\]\((\/blog\/[^)]+)\)/g)) {
        const target = getBlogBySlug(match[1].replace("/blog/", ""));
        expect(target, match[1]).toBeDefined();
        if (target) expect(isLinkableBlogPost(target), match[1]).toBe(true);
      }
    });
  }
  it("redirects the identical suffixed attachment without a duplicate article", () => {
    expect(getBlogBySlug("drip-edge-vs-gutter-apron_1")).toBeUndefined();
    expect(readFileSync("public/_redirects", "utf8")).toMatch(/\/blog\/drip-edge-vs-gutter-apron_1\s+\/blog\/drip-edge-vs-gutter-apron\s+301!/);
  });
  it("does not advertise expired tax credits or guaranteed noise reductions", () => {
    expect(getBlogBySlug("skylight-replacement-cost_1")?.content).toContain("unavailable for property placed in service after December 31, 2025");
    expect(getBlogBySlug("metal-roof-noise")?.content).not.toMatch(/61 dBA|52 dBA|46 dBA|fixed every few inches/);
    expect(getBlogBySlug("5-inch-vs-6-inch-gutters")?.content).not.toMatch(/1\.2 gallons|2 gallons|15% to 25%/);
  });
});