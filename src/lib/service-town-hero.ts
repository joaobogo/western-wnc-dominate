import { projectDetails, type ProjectDetail } from "@/data/projects";
import type { TownData } from "@/data/towns";

/**
 * Hero image for a service × town page, built from REAL data only — never a
 * third-party stock host. Resolution order (P3.2):
 *   1. the most recent project in src/data/projects.ts in the same town whose
 *      category matches the service (array order = most recent first);
 *   2. any matching-category project in the same county;
 *   3. the town's own heroImage from src/data/towns.ts (served as the WebP twin
 *      generated next to it in public/media);
 *   4. one self-hosted regional fallback.
 * Alt text is honest: a project photo says what it is and where it was; the
 * town/regional images never claim a town.
 */
export type HeroSource = "project-town" | "project-county" | "town-image" | "regional-fallback";

export interface ResolvedHero {
  src: string;
  alt: string;
  /** Intrinsic-box hints for layout reservation; the image is object-cover in a fixed box. */
  width: number;
  height: number;
  source: HeroSource;
  projectSlug?: string;
}

/** Hero images are served as 1600×900 self-hosted WebP (see public/media/*.webp). */
export const HERO_WIDTH = 1600;
export const HERO_HEIGHT = 900;

/** Single regional fallback (self-hosted). */
export const REGIONAL_HERO_FALLBACK = "/media/wnc-mountain-home-exterior.webp";
export const REGIONAL_HERO_ALT = "Mountain home roofline in Western North Carolina";

const CONSTRUCTION_SERVICES = new Set(["construction", "additions", "outdoor-living", "renovations", "siding", "design"]);

/** Division a service slug belongs to, for matching project.category. */
export const categoryForService = (serviceSlug: string): ProjectDetail["category"] =>
  CONSTRUCTION_SERVICES.has(serviceSlug) ? "construction" : "roofing";

/** Keywords that make a project's `type` a better match for a service. */
const TYPE_HINTS: Record<string, RegExp> = {
  "metal-roofing": /metal/i,
  "synthetic-brava": /synthetic|brava|cedar|shake|slate/i,
  "roof-replacement": /shingle|metal|replacement|re-?roof/i,
  "roof-repair": /repair/i,
  "storm-damage": /storm|hail|wind/i,
  additions: /addition/i,
  "outdoor-living": /deck|porch|outdoor|patio/i,
};

const townOfProject = (p: ProjectDetail) => p.location.split(",")[0].trim().toLowerCase();

/** Town hero JPG → the WebP twin generated in public/media (same basename). */
export const toHeroWebp = (path: string) => path.replace(/\.(jpe?g|png)$/i, ".webp");

export function resolveServiceTownHero(town: TownData, serviceSlug: string, serviceLabel: string): ResolvedHero {
  const category = categoryForService(serviceSlug);
  const hint = TYPE_HINTS[serviceSlug];
  const rank = (p: ProjectDetail) => (hint && hint.test(p.type) ? 0 : 1); // type match first, then array order
  const byCategory = projectDetails.filter((p) => p.category === category);

  const inTown = byCategory
    .filter((p) => townOfProject(p) === town.name.toLowerCase())
    .sort((a, b) => rank(a) - rank(b));
  if (inTown[0]) {
    return {
      src: inTown[0].heroImage,
      alt: `${serviceLabel} by Highlander Building Services in ${town.name}, NC`,
      width: HERO_WIDTH,
      height: HERO_HEIGHT,
      source: "project-town",
      projectSlug: inTown[0].slug,
    };
  }

  const inCounty = byCategory
    .filter((p) => p.county.toLowerCase() === town.county.toLowerCase())
    .sort((a, b) => rank(a) - rank(b));
  if (inCounty[0]) {
    const projectTown = inCounty[0].location.split(",")[0].trim();
    return {
      // Honest: the photo is from a neighbouring town in the same county.
      src: inCounty[0].heroImage,
      alt: `${serviceLabel} by Highlander Building Services in ${projectTown}, NC`,
      width: HERO_WIDTH,
      height: HERO_HEIGHT,
      source: "project-county",
      projectSlug: inCounty[0].slug,
    };
  }

  if (town.heroImage) {
    return {
      src: toHeroWebp(town.heroImage),
      alt: REGIONAL_HERO_ALT,
      width: HERO_WIDTH,
      height: HERO_HEIGHT,
      source: "town-image",
    };
  }

  return {
    src: REGIONAL_HERO_FALLBACK,
    alt: REGIONAL_HERO_ALT,
    width: HERO_WIDTH,
    height: HERO_HEIGHT,
    source: "regional-fallback",
  };
}
