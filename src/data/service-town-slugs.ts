// Tiny, dependency-free slug directory. Kept separate from the (large)
// service-town-content module so route tables can be built without pulling
// the full page copy into the initial JS bundle.

export interface FlatSlugEntry {
  flatSlug: string;
  townSlug: string;
  serviceSlug: string;
}

export const TIER1_CITIES = ["highlands-nc", "franklin-nc", "cashiers-nc"] as const;
export const TIER1_SERVICES = [
  "roofing",
  "roof-repair",
  "roof-replacement",
  "construction",
  "home-repairs",
] as const;

export const tier1FlatEntries: FlatSlugEntry[] = TIER1_CITIES.flatMap((town) =>
  TIER1_SERVICES.map((service) => ({
    flatSlug: `${service}-${town}`,
    townSlug: town,
    serviceSlug: service,
  })),
);

export const tier2FlatEntries: FlatSlugEntry[] = [
  { flatSlug: "roofing-construction-sylva-nc", townSlug: "sylva-nc", serviceSlug: "roofing-construction" },
  { flatSlug: "roof-repair-sylva-nc", townSlug: "sylva-nc", serviceSlug: "roof-repair" },
  { flatSlug: "roofing-construction-cullowhee-nc", townSlug: "cullowhee-nc", serviceSlug: "roofing-construction" },
  { flatSlug: "roof-repair-cullowhee-nc", townSlug: "cullowhee-nc", serviceSlug: "roof-repair" },
];
