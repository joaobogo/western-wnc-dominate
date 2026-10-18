import { describe, expect, it } from "vitest";
import { readFileSync, statSync } from "node:fs";
import { blogPosts, getBlogBySlug, isLinkableBlogPost } from "@/data/blogs";
import { canonicalUrlFor } from "@/components/SEOHead";

describe("October 13 uploaded pergola article", () => {
  it("preserves the uploaded filename and supplies a matching optimized cover", () => {
    const slug = "pergola-vs-covered-patio";
    const post = getBlogBySlug(slug);
    expect(post).toBeDefined();
    if (!post) return;
    expect(blogPosts.filter(p => p.slug === slug)).toHaveLength(1);
    expect(isLinkableBlogPost(post)).toBe(true);
    expect(post.canonicalTo).toBeUndefined();
    expect(post.date).toBe("2026-10-13");
    expect(canonicalUrlFor(`/blog/${slug}`)).toBe(`https://highlandernc.com/blog/${slug}`);
    expect(post.image).toContain(`${slug}-hero.jpg`);
    expect(statSync(`src/assets/blog/${slug}-hero.jpg`).size).toBeLessThan(100_000);
    expect(post.imageAlt).toMatch(/^Generated illustration/);
    expect(post.metaTitle.length).toBeLessThanOrEqual(60);
    expect(post.metaDescription.length).toBeLessThanOrEqual(160);
    expect(post.faqs?.length).toBeGreaterThanOrEqual(4);
    expect(post.content).not.toMatch(/babylovegrowth|data-blg-cta|supabase\.co|<script|<iframe|\barchitectural\b|[—–]/i);
    expect(post.content).toContain("Do not assume an existing slab is a structural footing");
    expect(post.content).toContain("not automatically mean a permit exemption");
    expect(post.content).not.toContain("blocks sun and rain completely");
    expect(readFileSync("public/sitemap.xml", "utf8")).toContain(`<loc>https://highlandernc.com/blog/${slug}</loc>`);
    expect(readFileSync("public/prerender-manifest.json", "utf8")).toContain(`/blog/${slug}`);
    for (const match of post.content.matchAll(/\]\((\/blog\/[^)]+)\)/g)) {
      const target = getBlogBySlug(match[1].replace("/blog/", ""));
      expect(target, match[1]).toBeDefined();
      if (target) expect(isLinkableBlogPost(target)).toBe(true);
    }
  });
});