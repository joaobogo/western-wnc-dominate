import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { blogPosts } from "@/data/blogs";

const redirects = readFileSync("public/_redirects", "utf8");

describe("November 16 duplicate uploads", () => {
  for (const slug of ["metal-shingles-vs-standing-seam", "home-addition-permits"]) {
    it(`${slug} retains one canonical article and redirects its duplicate filename directly`, () => {
      expect(blogPosts.filter((post) => post.slug === slug)).toHaveLength(1);
      expect(blogPosts.some((post) => post.slug === `${slug}_1`)).toBe(false);
      expect(redirects).toMatch(new RegExp(`/blog/${slug}_1\\s+/blog/${slug}\\s+301!`));
    });
  }

  it("keeps the exact uploaded partner destination on the metal comparison", () => {
    const post = blogPosts.find((post) => post.slug === "metal-shingles-vs-standing-seam");
    expect(post?.content).toContain("https://bidwolf.io/projects/yneIjBSVJXTyeJ4BH3kM");
  });

  it("keeps the uploaded sunroom destination as an actual internal article link", () => {
    const post = blogPosts.find((post) => post.slug === "home-addition-permits");
    expect(post?.content).toMatch(/\]\(\/blog\/screened-porch-vs-sunroom\)/);
    expect(blogPosts.some((post) => post.slug === "screened-porch-vs-sunroom")).toBe(true);
  });
});