import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { blogPosts } from "../data/blogs";
import pageLastmod from "../data/generated/page-lastmod.json";
import { TASK2_LINKED_ON, TASK2_PAGES } from "../data/sitemap-lastmod-overrides";

describe("sitemap article modification dates", () => {
  const xml = readFileSync("public/sitemap.xml", "utf8");
  const entries = xml.match(/<url>[\s\S]*?<\/url>/g) ?? [];
  const pathOf = (entry: string) => entry.match(/<loc>https:\/\/highlandernc\.com([^<]*)<\/loc>/)![1] || "/";

  it("uses substantive revisions rather than original publication dates", () => {
    for (const post of blogPosts.filter((post) => !post.canonicalTo && post.indexable !== false)) {
      const entry = entries.find((entry) => entry.includes(`<loc>https://highlandernc.com/blog/${post.slug}</loc>`));
      expect(entry, post.slug).toBeDefined();
      if (TASK2_PAGES.has(`/blog/${post.slug}`)) {
        // Fix list Nov 23, 2026 (Task 2): newly linked on this date.
        expect(entry, post.slug).toContain(`<lastmod>${TASK2_LINKED_ON}</lastmod>`);
        continue;
      }
      const date = new Date(post.updated ?? post.date);
      if (Number.isNaN(date.getTime())) {
        expect(entry).not.toContain("<lastmod>");
      } else {
        expect(entry, post.slug).toContain(`<lastmod>${date.toISOString().slice(0, 10)}</lastmod>`);
      }
    }
  });

  it("does not invent modification dates: other pages use the git date of their source files", () => {
    // Fix list Nov 23, 2026 (Task 2) asks for a real lastmod on every URL. The dates come from
    // scripts/compute-page-lastmod.mjs (last commit touching the page's source), never build time.
    const dates = pageLastmod as Record<string, string>;
    for (const entry of entries) {
      const path = pathOf(entry);
      if (path.startsWith("/blog/")) continue;
      const expected = TASK2_PAGES.has(path) ? TASK2_LINKED_ON : dates[path];
      if (expected) expect(entry, path).toContain(`<lastmod>${expected}</lastmod>`);
      else expect(entry, path).not.toContain("<lastmod>");
    }
  });
});
