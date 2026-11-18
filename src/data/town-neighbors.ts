import { towns, type TownData } from "@/data/towns";

// Kept apart from src/lib/local-link-graph.ts on purpose: that file reads the
// full blog library, and components that only need "which towns are nearby"
// (LocalProjectProof on service and intake pages) must not download it.
// vite.config.ts places this file in the small towns chunk.

/**
 * Shared geographic adjacency for Western NC towns. Single source of truth so
 * the nearby-town module and every cross-linking block agree.
 */
export const TOWN_ADJACENCY: Record<string, string[]> = {
  "highlands-nc": ["cashiers-nc", "franklin-nc", "scaly-mountain-nc", "lake-glenville-nc"],
  "cashiers-nc": ["highlands-nc", "sapphire-nc", "lake-glenville-nc", "sylva-nc"],
  "franklin-nc": ["highlands-nc", "otto-nc", "sylva-nc", "cashiers-nc"],
  "sylva-nc": ["dillsboro-nc", "cullowhee-nc", "cashiers-nc", "waynesville-nc"],
  "dillsboro-nc": ["sylva-nc", "cullowhee-nc", "bryson-city-nc", "waynesville-nc"],
  "cullowhee-nc": ["sylva-nc", "dillsboro-nc", "cashiers-nc", "waynesville-nc"],
  "bryson-city-nc": ["cherokee-nc", "dillsboro-nc", "sylva-nc", "waynesville-nc"],
  "cherokee-nc": ["bryson-city-nc", "sylva-nc", "waynesville-nc", "dillsboro-nc"],
  "waynesville-nc": ["sylva-nc", "asheville-nc", "hendersonville-nc", "bryson-city-nc"],
  "asheville-nc": ["hendersonville-nc", "waynesville-nc", "brevard-nc", "sylva-nc"],
  "hendersonville-nc": ["asheville-nc", "brevard-nc", "waynesville-nc", "sapphire-nc"],
  "brevard-nc": ["hendersonville-nc", "lake-toxaway-nc", "sapphire-nc", "asheville-nc"],
  "lake-toxaway-nc": ["sapphire-nc", "cashiers-nc", "brevard-nc", "lake-glenville-nc"],
  "sapphire-nc": ["cashiers-nc", "lake-toxaway-nc", "highlands-nc", "lake-glenville-nc"],
  "lake-glenville-nc": ["cashiers-nc", "highlands-nc", "sylva-nc", "sapphire-nc"],
  "scaly-mountain-nc": ["highlands-nc", "franklin-nc", "otto-nc", "cashiers-nc"],
  "otto-nc": ["franklin-nc", "highlands-nc", "scaly-mountain-nc", "hayesville-nc"],
  "hayesville-nc": ["murphy-nc", "franklin-nc", "otto-nc", "cherokee-nc"],
  "murphy-nc": ["hayesville-nc", "cherokee-nc", "franklin-nc", "bryson-city-nc"],
};

export const getNeighborTowns = (townSlug: string, limit = 4): TownData[] => {
  const current = towns.find((t) => t.slug === townSlug);
  if (!current) return [];
  const curated = (TOWN_ADJACENCY[townSlug] ?? [])
    .map((s) => towns.find((t) => t.slug === s))
    .filter((t): t is TownData => !!t);
  const seen = new Set([townSlug, ...curated.map((t) => t.slug)]);
  const sameCounty = towns.filter(
    (t) => t.county === current.county && !seen.has(t.slug),
  );
  sameCounty.forEach((t) => seen.add(t.slug));
  const rest = towns.filter((t) => !seen.has(t.slug));
  return [...curated, ...sameCounty, ...rest].slice(0, limit);
};
