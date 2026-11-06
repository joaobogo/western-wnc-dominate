import { describe, it, expect } from "vitest";
import { blogPosts } from "@/data/blogs";

// Partner backlinks promised through BabyLoveGrowth; each article must keep its link.
const REQUIRED: Record<string, string[]> = {
  "5-inch-vs-6-inch-gutters": ["ivanslandscaping.com"],
  "acv-vs-rcv-roof": ["rentriq.io"],
  "aluminum-vs-vinyl-soffit": ["workily.ie"],
  "architectural-vs-3-tab": ["dakcentralehollandbv.nl"],
  "chimney-flashing-repair": ["txcomfortcrew.com"],
  "copper-gutters-cost": ["a-z.house", "ivanslandscaping.com"],
  "copper-roof-cost": ["sw-metalroofing.com"],
  "deck-ledger-flashing": ["actionfenceanddeck.com"],
  "energy-efficient-roofing": ["smartroofingpros.com"],
  "half-round-vs-k-style-gutters": ["upstateroofingpros.com"],
  "helical-piers-vs-concrete-piers": ["txcomfortcrew.com"],
  "high-elevation-roofing": ["am-exteriors.com"],
  "hip-roof-vs-gable-roof": ["lahvaclc.com"],
  "low-slope-roofing-options": ["viewluxwindows.com"],
  "master-suite-addition": ["giantfloor.com", "joco.plumbing"],
  "metal-roof-colors": ["trucomfortaz.com"],
  "pergola-vs-covered-patio": ["sgclandscape.com"],
  "pine-needles-on-roof": ["uni-cm.com"],
  "rain-chains-vs-downspouts": ["midatlanticmetalpanels.com", "pave-n-turf.com", "aubenrealty.com"],
  "ridge-vent-vs-box-vent": ["am-exteriors.com"],
  "roof-flashing-leak": ["dmlidee.com"],
  "roof-flashing-types": ["dmlidee.com"],
  "roof-inspection-after-storm": ["coastalroofingfla.com"],
  "roof-replacement-tax-deductible_1": ["myfloridasolar.com"],
  "roof-replacement-timeline": ["tampakitchenandbath.com"],
  "roof-sheathing-thickness": ["sprayfoamremovalhelp.co.uk"],
  "roof-underlayment-types_1": ["energysion.com"],
  "roof-valley-leak": ["vectorclaimsolutions.com"],
  "roof-wind-mitigation": ["roofingandexteriorpros.com"],
  "screened-porch-vs-sunroom": ["viewluxwindows.com", "capitalprolighting.com"],
  "shingle-blistering": ["smartroofingpros.com"],
  "skylight-leak-repair": ["tampakitchenandbath.com"],
  "storm-damage-roof-inspection_1": ["sabatalocontracting.com"],
  "tree-on-roof_2": ["villageprecisionpros.com", "betterqualitybuilders.com"],
  "under-deck-drainage": ["modernfence.com"],
  "wind-damaged-shingles": ["exteriorgenie.com"],
  "wind-driven-rain-leak_2": ["star-ws.com", "ufiredoors.com"],
};

describe("partner backlinks", () => {
  for (const [slug, domains] of Object.entries(REQUIRED)) {
    it(`${slug} links to ${domains.join(", ")}`, () => {
      const post = blogPosts.find((p) => p.slug === slug);
      expect(post, slug).toBeDefined();
      for (const d of domains) expect(post!.content).toMatch(new RegExp(`\\]\\(https://[^)]*${d.replace(/\./g, "\\.")}`));
    });
  }
});
