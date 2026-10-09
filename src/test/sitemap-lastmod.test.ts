import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { blogPosts } from "../data/blogs";

describe("sitemap article modification dates", () => {
  const xml = readFileSync("public/sitemap.xml", "utf8");
  const entries = xml.match(/<url>[\s\S]*?<\/url>/g) ?? [];

  it("uses substantive revisions rather than original publication dates", () => {
    for (const post of blogPosts.filter((post) => !post.canonicalTo && post.indexable !== false)) {
      const entry = entries.find((entry) => entry.includes(`<loc>https://highlandernc.com/blog/${post.slug}</loc>`));
      expect(entry, post.slug).toBeDefined();
      const date = new Date(post.updated ?? post.date);
      if (Number.isNaN(date.getTime())) {
        expect(entry).not.toContain("<lastmod>");
      } else {
        expect(entry, post.slug).toContain(`<lastmod>${date.toISOString().slice(0, 10)}</lastmod>`);
      }
    }
  });

  it("does not invent modification dates for pages without recorded timestamps", () => {
    for (const entry of entries) {
      if (!entry.includes("/blog/")) expect(entry).not.toContain("<lastmod>");
    }
  });
});