import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { blogPosts } from "@/data/blogs";
import { loadRedirectRules, loadSiteInventory, resolveUrl } from "../../scripts/lib/redirect-rules.mjs";
const suppliedLinks = {
  "synthetic-slate-roofing": [
    "https://highlandernc.com/",
    "https://highlandernc.com/blog/brava-synthetic-vs-cedar-shake-vs-slate-wnc",
    "https://highlandernc.com/blog/high-elevation-roofing",
    "https://highlandernc.com/blog/metal-vs-shingle-roof-western-nc",
    "https://highlandernc.com/blog/roof-lifespan-mountain-home-wnc",
    "https://highlandernc.com/construction",
    "https://highlandernc.com/roofing",
    "https://highlandernc.com/roofing-cost-western-nc",
    "https://highlandernc.com/roofing/metal",
    "https://highlandernc.com/service-areas/highlands-nc/roof-replacement",
    "https://highlandernc.com/service-areas/highlands-nc/roofing",
    "https://highlandernc.com/service-areas/highlands-nc/synthetic-brava",
    "https://hinarratives.com/composite-slate/",
    "https://todayshomeowner.com/roofing/cost/slate-roof-cost/",
    "https://up.codes/viewer/north_carolina/irc-2021/chapter/9/roof-assemblies",
    "https://www.nachi.org/slate-roofs-part13-132.htm",
    "https://www.roofingcalc.com/average-cost-to-tear-off-replace-a-roof-of-any-size-in-the-us/"
  ],
  "hillside-deck-foundation": [
    "https://codelibrary.amlegal.com/codes/los_angeles/latest/lamc/0-0-0-178311",
    "https://highlandernc.com/",
    "https://highlandernc.com/blog/designing-for-drainage-foundation-safety",
    "https://highlandernc.com/blog/helical-piers-vs-concrete-piers",
    "https://highlandernc.com/blog/under-deck-drainage",
    "https://highlandernc.com/construction",
    "https://highlandernc.com/construction/additions",
    "https://highlandernc.com/construction/outdoor-living",
    "https://highlandernc.com/construction/outdoor-living/hardscape",
    "https://highlandernc.com/projects/deck-railing-rebuild-sylva",
    "https://portal.ct.gov/das/-/media/das/office-of-state-building-inspector/interpretations/interpretations-2016-2024/irc/i-24-03-irc-helical-piles-for-decks.pdf?hash=B2C74A3144EEE7862F0077BE9742E672&rev=f157107284704bc3a40594da8cc95ed8",
    "https://tazewell-il.gov/wp-content/uploads/2024/05/Handout-Decks.pdf",
    "https://www.bchousing.org/publications/IG-Building-Safe-Durable-Decks-Balconies.pdf",
    "https://www.jlconline.com/how-to/exteriors/decks/decks-field-guide/",
    "https://www.phila.gov/media/20250606082044/PB_031_FAQ_2021-IRC-Significant-Changes-FAQ.pdf"
  ],
  "roof-leaks-in-rain": [
    "https://apps.floridadisaster.org/hrg/downloads/after_a_storm.pdf",
    "https://highlandernc.com",
    "https://highlandernc.com/",
    "https://highlandernc.com/blog/chimney-flashing-repair",
    "https://highlandernc.com/blog/emergency-roof-repair-wnc",
    "https://highlandernc.com/blog/roof-flashing-leak",
    "https://highlandernc.com/blog/storm-damage-checklist-western-nc",
    "https://highlandernc.com/blog/storm-damage-roof-inspection_1",
    "https://highlandernc.com/blog/wind-damaged-shingles",
    "https://highlandernc.com/blog/wind-driven-rain-leak_2",
    "https://highlandernc.com/roofing/roof-repair",
    "https://highlandernc.com/roofing/roof-replacement",
    "https://highlandernc.com/service-areas/highlands-nc/roof-repair",
    "https://kenosha.extension.wisc.edu/files/2010/06/Leaky_roofs.pdf",
    "https://nrcawebstorage.blob.core.windows.net/files/nrca_website/documents/technical/Roof-Repair-After-Strong-Winds.pdf",
    "https://www.coloradoroofing.org/news/my-roof-is-leakingnow-what-a-colorado-homeowners-guide-for-rainy-months",
    "https://www.gaf.com/en-us/plan-design/homeowner-education/roof-damage",
    "https://www.gaf.com/en-us/plan-design/homeowner-education/storm-damage",
    "https://www.homedepot.com/p/FLEX-SEAL-FAMILY-OF-PRODUCTS-Flex-Seal-Liquid-White-32-Oz-Liquid-Rubber-Sealant-Coating-LFSWHTR32/301711550",
    "https://www.weather.gov/media/hgx/tropicalwp/WhattoDo.pdf",
    "https://www1.eere.energy.gov/buildings/publications/pdfs/corporate/repairing_roofs_ceilings.pdf"
  ]
};
const rules = loadRedirectRules();
const inventory = loadSiteInventory();
const sitemap = readFileSync("public/sitemap.xml", "utf8");
describe("November 23 uploaded blogs", () => {
  for (const [slug, links] of Object.entries(suppliedLinks)) {
    it(`${slug} uses its exact uploaded filename once`, () => {
      const posts = blogPosts.filter(post => post.slug === slug);
      expect(posts).toHaveLength(1);
      expect(posts[0]?.date).toBe("2026-11-23");
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
