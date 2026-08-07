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
  { label: "Commercial Roofing", href: "/roofing/commercial", keywords: ["commercial", "tpo", "flat roof", "business"] },
  { label: "Roof Repair", href: "/roofing/roof-repair", keywords: ["repair", "leak", "flashing", "missing shingle"] },
  { label: "Roof Replacement", href: "/roofing/roof-replacement", keywords: ["replace", "replacement", "re-roof", "reroof", "new roof", "shingle", "roofing system", "underlayment"] },
  { label: "Home Additions", href: "/construction/additions", keywords: ["addition", "sunroom", "garage", "in-law", "guest suite", "second story"] },
  { label: "Outdoor Living", href: "/construction/outdoor-living", keywords: ["deck", "porch", "outdoor living", "pergola", "patio", "mountain room"] },
  { label: "Renovations", href: "/construction/renovations", keywords: ["renovation", "remodel", "kitchen", "bath", "whole-home"] },
  { label: "Siding & Exteriors", href: "/construction/siding", keywords: ["siding", "exterior cladding", "trim"] },
  { label: "Construction Division", href: "/construction", keywords: ["general contractor", "construction", "build", "permit", "inspection department"] },
  { label: "Residential Roofing", href: "/roofing/residential", keywords: ["residential", "home", "house", "attic", "ventilation", "roof"] },
];

const FALLBACK_SERVICE: FaqLink = { label: "Roofing Services", href: "/roofing" };

/** Most relevant service page for a single FAQ, based on its own wording. */
export const getFaqServiceLink = (question: string, answer: string): FaqLink => {
  const haystack = `${question} ${answer}`.toLowerCase();
  const match = SERVICE_TARGETS.find((t) => t.keywords.some((k) => haystack.includes(k)));
  return match ? { label: match.label, href: match.href } : FALLBACK_SERVICE;
};

/** County hub page for the town this FAQ belongs to. */
export const getTownCountyLink = (town: TownData): FaqLink | undefined => {
  const county = counties.find((c) => c.name === town.county);
  if (!county) return undefined;
  return { label: county.name, href: `/service-areas/county/${county.slug}` };
};
