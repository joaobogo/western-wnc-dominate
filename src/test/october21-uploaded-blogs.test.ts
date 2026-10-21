import { describe, expect, it } from "vitest";
import { readFileSync, statSync } from "node:fs";
import { blogPosts, getBlogBySlug, isLinkableBlogPost } from "@/data/blogs";
import { canonicalUrlFor } from "@/components/SEOHead";

const slugs = ["roof-wind-mitigation", "shingle-blistering", "roof-decking-replacement", "copper-roof-cost"];

describe("October 21 uploaded articles", () => {
  for (const slug of slugs) {
    it(`publishes ${slug} once at its filename slug with its own cover`, () => {
      const post = getBlogBySlug(slug);
      expect(post).toBeDefined();
      if (!post) return;
      expect(blogPosts.filter((p) => p.slug === slug)).toHaveLength(1);
      expect(isLinkableBlogPost(post)).toBe(true);
      expect(post.date).toBe("2026-10-21");
      expect(canonicalUrlFor(`/blog/${slug}`)).toBe(`https://highlandernc.com/blog/${slug}`);
      expect(post.image).toContain(`${slug}-hero.jpg`);
      expect(statSync(`src/assets/blog/${slug}-hero.jpg`).size).toBeLessThan(100_000);
      expect(post.metaTitle.length).toBeLessThanOrEqual(60);
      expect(post.metaDescription.length).toBeLessThanOrEqual(160);
      expect(post.faqs?.length).toBeGreaterThanOrEqual(4);
      expect(post.title + post.content + JSON.stringify(post.faqs)).not.toMatch(/babylovegrowth|data-blg-cta|supabase\.co|<script|<iframe|\barchitectural\b|\bGAF\b|free estimate|24\/7|in-house|[—–]/i);
      expect(readFileSync("public/sitemap.xml", "utf8")).toContain(`<loc>https://highlandernc.com/blog/${slug}</loc>`);
      expect(readFileSync("public/prerender-manifest.json", "utf8")).toContain(`/blog/${slug}`);
      for (const m of post.content.matchAll(/\]\((\/blog\/[^)]+)\)/g)) {
        const target = getBlogBySlug(m[1].replace("/blog/", ""));
        expect(target, m[1]).toBeDefined();
        if (target) expect(isLinkableBlogPost(target), m[1]).toBe(true);
      }
    });
  }

  it("redirects duplicate attachments to the existing canonical articles", () => {
    const r = readFileSync("public/_redirects", "utf8");
    for (const [from, to] of [
      ["shingle-blistering_1", "shingle-blistering"],
      ["skylight-replacement-cost", "skylight-replacement-cost_1"],
      ["skylight-replacement-cost_1-2", "skylight-replacement-cost_1"],
      ["storm-damage-roof-inspection", "storm-damage-roof-inspection_1"],
      ["storm-damage-roof-inspection_1-2", "storm-damage-roof-inspection_1"],
      ["wind-driven-rain-leak_1", "wind-driven-rain-leak_2"],
    ]) {
      expect(getBlogBySlug(from)).toBeUndefined();
      expect(r).toMatch(new RegExp(`/blog/${from}\\s+/blog/${to}\\s+301!`));
    }
  });
});
