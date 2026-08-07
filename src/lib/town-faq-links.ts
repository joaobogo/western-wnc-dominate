import { counties } from "@/data/counties";
import type { TownData } from "@/data/towns";

export interface FaqLink {
  label: string;
  href: string;
}

interface ServiceTarget {
  label: string;
  href: string;
  /** Lowercase keywords matched against the FAQ question + answer. */
  keywords: string[];
}

/**
 * Service pages a town FAQ can point to, ordered by specificity.
 * The first target whose keywords appear in the Q&A wins, so narrow
 * services must come before the broad division hubs.
 */
const SERVICE_TARGETS: ServiceTarget[] = [
  { label: "Storm Damage Roofing", href: "/roofing/storm-damage", keywords: ["storm", "hail", "wind damage", "emergency", "hurricane", "fallen tree"] },
  { label: "Metal Roofing", href: "/roofing/metal", keywords: ["metal", "standing seam", "standing-seam"] },
  { label: "Brava Synthetic Roofing", href: "/roofing/brava-synthetic", keywords: ["synthetic", "brava", "composite shake", "cedar shake"] },
  { label: "Skylights", href: "/roofing/skylights", keywords: ["skylight", "velux", "sun tunnel"] },
  { label: "Gutters", href: "/roofing/gutters", keywords: ["gutter", "downspout", "leaf guard"] },
  { label: "Commercial Roofing", href: "/roofing/commercial", keywords: ["commercial", "tpo", "flat roof"] },
  { label: "Roof Repair", href: "/roofing/roof-repair", keywords: ["repair", "leak", "flashing", "missing shingle"] },
  { label: "Roof Replacement", href: "/roofing/roof-replacement", keywords: ["replace", "replacement", "re-roof", "reroof", "new roof", "shingle", "roofing system", "underlayment"] },
  { label: "Home Additions", href: "/construction/additions", keywords: ["addition", "sunroom", "garage", "in-law", "guest suite", "second story"] },
  { label: "Outdoor Living", href: "/construction/outdoor-living", keywords: ["deck", "porch", "outdoor living", "pergola", "patio", "mountain room"] },
  { label: "Renovations", href: "/construction/renovations", keywords: ["renovation", "remodel", "kitchen", "bath", "whole-home"] },
  { label: "Siding & Exteriors", href: "/construction/siding", keywords: ["siding", "exterior cladding", "trim"] },
  { label: "Construction Division", href: "/construction", keywords: ["general contractor", "construction", "build", "permit", "inspection department"] },
  { label: "Residential Roofing", href: "/roofing/residential", keywords: ["residential", "attic", "ventilation", "asphalt", "dimensional shingle"] },
];

const FALLBACK_SERVICE: FaqLink = { label: "Roofing Services", href: "/roofing" };

/**
 * Most relevant service page for a single FAQ. Keywords found in the question
 * weigh far more than keywords buried in the answer body, so a permitting or
 * repair-vs-replace question doesn't get pulled toward an unrelated product
 * page just because the answer mentions it in passing. Ties fall back to the
 * declaration order above (most specific service first).
 */
export const getFaqServiceLink = (question: string, answer: string): FaqLink => {
  const q = question.toLowerCase();
  const a = answer.toLowerCase();

  // Coverage / "what do you do here" questions span both divisions — send
  // those to the roofing hub rather than letting a single stray keyword
  // decide between a narrow product page and the construction hub.
  const spansBothDivisions = q.includes("roofing and construction") || q.includes("just pass through");
  if (spansBothDivisions) return FALLBACK_SERVICE;

  let best: ServiceTarget | undefined;
  let bestScore = 0;

  SERVICE_TARGETS.forEach((target) => {
    const score = target.keywords.reduce(
      (sum, k) => sum + (q.includes(k) ? 20 : 0) + (a.includes(k) ? 1 : 0),
      0,
    );
    if (score > bestScore) {
      best = target;
      bestScore = score;
    }
  });

  return best ? { label: best.label, href: best.href } : FALLBACK_SERVICE;
};

/** County hub page for the town this FAQ belongs to. */
export const getTownCountyLink = (town: TownData): FaqLink | undefined => {
  const county = counties.find((c) => c.name === town.county);
  if (!county) return undefined;
  return { label: county.name, href: `/service-areas/county/${county.slug}` };
};
