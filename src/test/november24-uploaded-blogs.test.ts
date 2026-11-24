import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { blogPosts } from "@/data/blogs";
import { loadRedirectRules, loadSiteInventory, resolveUrl } from "../../scripts/lib/redirect-rules.mjs";
const suppliedLinks = {
  "skylights-on-metal-roofs": [
    "https://blog.usaplumbingseptic.com/blog/ceiling-leak-plumber-or-roofer",
    "https://bsesc.energy.gov/energy-basics/flashing-around-skylight-roof-removal",
    "https://codes.iccsafe.org/content/NCRC2018/chapter-3-building-planning",
    "https://highlandernc.com",
    "https://highlandernc.com/",
    "https://highlandernc.com/blog/skylight-installation-western-nc",
    "https://highlandernc.com/blog/skylight-leaks-roof-or-skylight-wnc",
    "https://highlandernc.com/blog/skylight-placement",
    "https://highlandernc.com/blog/standing-seam-vs-exposed-fastener",
    "https://highlandernc.com/roofing/metal",
    "https://highlandernc.com/roofing/roof-repair",
    "https://highlandernc.com/roofing/skylights",
    "https://roofingmagazine.com/a-roofers-guide-to-installation-best-practices/",
    "https://www.floridabuilding.org/upload/PR_Instl_Docs/FL13303_R11_II_FCM%20Installation%20Instructions.pdf",
    "https://www.lowes.com/n/how-to/how-to-install-a-skylight",
    "https://www.veluxusa.com/inspiration/blog/can-you-install-a-skylight-on-a-metal-roof"
  ]
};
const rules = loadRedirectRules();
const inventory = loadSiteInventory();
const sitemap = readFileSync("public/sitemap.xml", "utf8");
describe("November 24 uploaded blogs", () => {
  for (const [slug, links] of Object.entries(suppliedLinks)) {
    it(`${slug} uses its exact uploaded filename once`, () => {
      const posts = blogPosts.filter(post => post.slug === slug);
      expect(posts).toHaveLength(1);
      expect(posts[0]?.date).toBe("2026-11-24");
      expect(posts[0]?.canonicalTo).toBeUndefined();
      expect(sitemap.match(new RegExp(`<loc>https://highlandernc.com/blog/${slug}</loc>`, "g"))).toHaveLength(1);
      expect(resolveUrl(rules, `/blog/${slug}`, {isLive: inventory.isLive}).hops).toHaveLength(0);
    });
    it(`${slug} retains every uploaded source and internal destination`, () => {
      const post = blogPosts.find(post => post.slug === slug);
      for (const link of links) {
        expect(post?.content, link).toContain(`](${link})`);
        if (new URL(link).hostname === "highlandernc.com") {
          expect(resolveUrl(rules, link, {isLive: inventory.isLive}).terminal, link).toBe("live");
        }
      }
    });
  }
});
