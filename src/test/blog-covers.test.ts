import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import { blogPosts, linkableBlogPosts } from "@/data/blogs";
import { BLOG_COVERS } from "@/data/blog-covers";

// The blog index lists every indexable post with its cover, so a shared cover
// shows the same picture several times on one page.
describe("blog covers", () => {
  it("gives every indexable post its own cover", () => {
    const bySrc = new Map<string, string[]>();
    for (const p of linkableBlogPosts()) {
      bySrc.set(p.image, [...(bySrc.get(p.image) ?? []), p.slug]);
    }
    const shared = [...bySrc].filter(([, slugs]) => slugs.length > 1);
    expect(shared).toEqual([]);
  });

  it("only lists real posts, each with alt text", () => {
    const slugs = new Set(blogPosts.map((p) => p.slug));
    for (const [slug, c] of Object.entries(BLOG_COVERS)) {
      expect(slugs.has(slug), slug).toBe(true);
      expect(c.imageAlt.length, slug).toBeGreaterThan(20);
    }
  });

  it("ships each cover with its WebP twin and phone renditions", () => {
    for (const { image } of Object.values(BLOG_COVERS)) {
      const base = path.join(process.cwd(), "public", image.replace(/\.jpg$/, ""));
      for (const file of [`${base}.jpg`, `${base}.webp`, `${base}-640.webp`, `${base}-960.webp`]) {
        expect(existsSync(file), file).toBe(true);
      }
    }
  });
});
