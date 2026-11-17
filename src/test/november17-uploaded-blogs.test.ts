import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { blogPosts } from "@/data/blogs";
import { loadRedirectRules, loadSiteInventory, resolveUrl } from "../../scripts/lib/redirect-rules.mjs";

const suppliedLinks: Record<string, string[]> = {
  "dark-vs-light-roof": [
    "/",
    "/blog/architectural-shingle-lifespan",
    "/blog/energy-efficient-roofing",
    "/blog/metal-roof-colors",
    "/blog/metal-vs-dimensional-shingle-wnc-mountain-homes",
    "/blog/metal-vs-shingle-roof-western-nc",
    "/blog/roof-ventilation-requirements",
    "/exterior-improvements",
    "/projects/standing-seam-metal-dark-bronze-highlands",
    "/roofing/metal",
    "/roofing/metal/cost",
    "/roofing/roof-repair",
    "/roofing/roof-replacement",
    "/roofing/skylights",
    "https://basc.pnnl.gov/information/air-sealing-insulating-and-venting-attics-and-roofs-reduce-heat-gain",
    "https://basc.pnnl.gov/resource-guides/asphalt-shingle-roofs",
    "https://basc.pnnl.gov/resource-guides/cool-roofs-and-walls-reduce-heat-gain",
    "https://eta-publications.lbl.gov/sites/default/files/coolcolorroofingmaterials.pdf",
    "https://heatisland.lbl.gov/sites/default/files/2023-08/Cool-roof-Q+A.pdf",
    "https://www.asphaltroofing.org/wp-content/uploads/2020/02/ARMA-Steep-Slope-Cool-Roof-White-Paper-29Jan2020-FINAL.pdf",
    "https://www.energy.gov/sites/default/files/guide_to_cool_roofs.pdf",
    "https://www.energy.gov/sites/prod/files/2013/10/f3/coolroofguide.pdf",
    "https://www.frontiersin.org/journals/built-environment/articles/10.3389/fbuil.2020.571429/full",
    "https://www.mcelroymetal.com/hubfs/assets/MM613-Fluropon-Kynar-500-PVDF-Coating-without-Substrate.pdf",
    "https://www.osti.gov/biblio/981442"
  ],
  "brown-ceiling-stains": [
    "/",
    "/blog/roof-flashing-leak",
    "/blog/roof-inspection-signs-sylva-nc",
    "/blog/roof-leak-repair-western-nc",
    "/blog/skylight-leaks-roof-or-skylight-wnc",
    "/roofing/gutters",
    "/roofing/roof-repair",
    "/roofing/roof-replacement",
    "/service-areas/cashiers-nc/roof-repair",
    "/service-areas/highlands-nc/roof-repair",
    "/service-areas/highlands-nc/roof-replacement",
    "https://alliedinspector.com/how-to-identify-roof-leaks/",
    "https://kenosha.extension.wisc.edu/files/2010/06/Leaky_roofs.pdf",
    "https://www.bobvila.com/articles/water-stains-on-ceiling/",
    "https://www.homeinspector.org/reporter-articles/inspecting-the-roof/",
    "https://www.nj.gov/health/ceohs/documents/mold/mold_guidelines.pdf",
    "https://www.nrcia.org/blog/signs-of-a-roof-leak",
    "https://www1.eere.energy.gov/buildings/publications/pdfs/corporate/repairing_roofs_ceilings.pdf"
  ],
  "storm-chaser-roofing": [
    "/",
    "/blog/storm-damage-checklist-western-nc",
    "/blog/storm-damage-roof-inspection_1",
    "/roofing",
    "/roofing/roof-repair",
    "/roofing/roof-replacement",
    "https://ncdoj.gov/consumer-alert-watch-out-for-storm-repair-scams/",
    "https://www.bbb.org/all/natural-disasters/protect-yourself-from-storm-chasers/",
    "https://www.ncdoi.gov/blog/2025/08/27/scammers-will-try-rip-you-dont-let-them",
    "https://www.ncdoi.gov/blog/2026/03/20/make-sure-you-dont-fall-scammers-schemes",
    "https://www.ncdoi.gov/consumers/disaster/after-storm/claims-and-adjuster-information",
    "https://www.ncdoi.gov/contractor-fraud-checklist/open",
    "https://www.ncdoi.gov/news/press-releases/2024/08/09/commissioner-causey-advises-consumers-protect-themselves-post-debby"
  ],
  "copper-roof-lifespan": [
    "/",
    "/blog/copper-roof-cost",
    "/blog/metal-roof-colors",
    "/blog/metal-vs-shingle-roof-western-nc",
    "/blog/roof-lifespan-mountain-home-wnc",
    "/blog/roof-lifespan-western-nc-by-material",
    "/blog/storm-damage-roof-inspection_1",
    "/roofing",
    "/roofing/metal",
    "/roofing/roof-repair",
    "https://ibhs.org/guidance/ricowi-roof-guide-copper/",
    "https://ibhs.org/guidance/ricowi-roof-guide/",
    "https://iibec.org/publication-post/2009-02-hogan/"
  ]
};
const sitemap = readFileSync("public/sitemap.xml", "utf8");
const rules = loadRedirectRules();
const inventory = loadSiteInventory();

describe("November 17 uploaded articles", () => {
  for (const [slug, links] of Object.entries(suppliedLinks)) {
    it(`${slug} is published once with its exact filename slug`, () => {
      expect(blogPosts.filter((post) => post.slug === slug)).toHaveLength(1);
      expect(sitemap).toContain(`<loc>https://highlandernc.com/blog/${slug}</loc>`);
      const post = blogPosts.find((post) => post.slug === slug);
      expect(post?.date).toBe("2026-11-17");
      expect(post?.faqs).toHaveLength(5);
    });
    it(`${slug} preserves every supplied link destination`, () => {
      const post = blogPosts.find((post) => post.slug === slug);
      for (const link of links) {
        expect(post?.content, link).toContain(`](${link})`);
        if (link.startsWith("/")) {
          expect(resolveUrl(rules, link, { isLive: inventory.isLive }).terminal, link).toBe("live");
        }
      }
    });
  }
  for (const slug of ["metal-shingles-vs-standing-seam", "home-addition-permits"]) {
    it(`${slug}-2 redirects directly without a duplicate article`, () => {
      expect(blogPosts.filter((post) => post.slug === slug)).toHaveLength(1);
      expect(blogPosts.some((post) => post.slug === `${slug}-2`)).toBe(false);
      const result = resolveUrl(rules, `/blog/${slug}-2`, { isLive: inventory.isLive });
      expect(result.final.path).toBe(`/blog/${slug}`);
      expect(result.hops).toHaveLength(1);
      expect(result.hops[0]?.rule.status).toBe(301);
      expect(sitemap).not.toContain(`/blog/${slug}-2</loc>`);
    });
  }
});
