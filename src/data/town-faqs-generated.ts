import { towns, type TownData } from "./towns";
import { counties } from "./counties";

export interface TownFAQItem {
  question: string;
  answer: string;
}

/**
 * Localized FAQ generator.
 *
 * Produces service-mapped, town-specific Q&A that supplements the hand-written
 * FAQs in `town-proof.ts`. Every answer is derived from real town metadata
 * (elevation, climate exposure, housing profile, service demand mix) and the
 * county's permitting notes — no invented stats, warranties, or 24/7 claims.
 */

const listToProse = (items: string[]): string => {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
};

const countyPermitting = (countyName: string): string | undefined =>
  counties.find((c) => c.name === countyName)?.permitting;

const elevationNumber = (elevation: string): number =>
  parseInt(elevation.replace(/[^0-9]/g, ""), 10) || 0;

export const buildTownFAQs = (town: TownData): TownFAQItem[] => {
  const mix = town.serviceDemandMix ?? [];
  // Roofing sentences must only ever name a roofing service. The demand mix also lists
  // decks, porches and commercial work, which read wrongly inside a roofing answer.
  const roofMix = mix.filter((m) => /roof|shingle|metal|storm|gutter|slate|shake|skylight/i.test(m) && !/commercial/i.test(m));
  const primary = roofMix[0] ?? "roof replacement";
  const elev = elevationNumber(town.elevation);
  const permitting = countyPermitting(town.county);
  const faqs: TownFAQItem[] = [];

  // 1. Service mapping — what we're actually asked for here
  faqs.push({
    question: `What roofing and construction work does Highlander do most in ${town.name}?`,
    answer: `In ${town.name}, the work we're asked for most is ${listToProse(mix).toLowerCase() || "roofing and exterior construction"}. ${town.housingProfile} That mix shapes how we scope and sequence every ${town.name} project, from first inspection to final walkthrough.`,
  });

  // 2. Material specification tied to real exposure
  faqs.push({
    question: `Which roofing system holds up best at ${town.elevation} in ${town.name}?`,
    answer: `At ${town.elevation}, ${town.name}'s wind, rain and UV exposure pushes us toward ${primary.toLowerCase()}${elev >= 3000 ? ", with wind-rated fastening schedules and reinforced edge metal" : ", with attention to drainage capacity and flashing at every transition"}. We specify against your specific address and exposure rather than a single default product.`,
  });

  // 3. Permitting / process (county-accurate)
  if (permitting) {
    faqs.push({
      question: `Do I need a permit for roofing or construction work in ${town.name}?`,
      answer: `${town.name} falls under ${town.county}. ${permitting}`,
    });
  }

  // 4. Repair vs. replacement decision — high-intent
  faqs.push({
    question: `Should I repair or replace my roof in ${town.name}?`,
    answer: `If the damage is localized and the deck is sound, a targeted repair is usually the right call. Once you're seeing widespread granule loss, repeat leaks in multiple areas, or failed flashing across the roof, replacement costs less over the life of the home at ${town.name}'s elevation. We tell you which one you're looking at during the inspection.`,
  });

  // 5. Construction division mapping
  faqs.push({
    question: `Does Highlander handle additions and remodels in ${town.name}, not just roofing?`,
    answer: `Yes. We're a licensed North Carolina general contractor, so ${town.name} homeowners run roofing and construction through one project team. ${town.constructionContext}`,
  });

  // 6. Local scheduling and coverage
  faqs.push({
    question: `Do you actually serve ${town.name}, or just pass through it?`,
    answer: `${town.name} is a scheduled part of our ${town.county} coverage${town.notableNeighborhoods?.length ? `, including ${listToProse(town.notableNeighborhoods.slice(0, 3))}` : ""}. ${town.marketAuthorityAngle}`,
  });

  return faqs;
};

/** Slug-keyed map of generated FAQs for every town. */
export const generatedTownFAQs: Record<string, TownFAQItem[]> = Object.fromEntries(
  towns.map((t) => [t.slug, buildTownFAQs(t)]),
);

/**
 * Merges hand-written proof FAQs with generated localized ones,
 * de-duplicating by question text. Hand-written entries win.
 */
/** Loose fingerprint used to suppress near-duplicate questions. */
const fingerprint = (q: string) =>
  q
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(
      (w) =>
        w.length > 3 &&
        !["what", "which", "does", "your", "with", "that", "this", "from", "have", "highlander"].includes(w),
    )
    .sort()
    .join(" ");

const overlaps = (a: string, b: string) => {
  const A = new Set(fingerprint(a).split(" ").filter(Boolean));
  const B = new Set(fingerprint(b).split(" ").filter(Boolean));
  if (!A.size || !B.size) return false;
  let hit = 0;
  A.forEach((w) => {
    if (B.has(w)) hit++;
  });
  return hit / Math.min(A.size, B.size) >= 0.6;
};

export const getTownFAQs = (
  slug: string,
  authored?: TownFAQItem[],
): TownFAQItem[] => {
  const generated = generatedTownFAQs[slug] ?? [];
  const existing = authored ?? [];
  const extra = generated.filter((g) => !existing.some((a) => overlaps(a.question, g.question)));
  return [...(authored ?? []), ...extra];
};
