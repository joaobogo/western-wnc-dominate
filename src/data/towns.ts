export interface TownData {
  slug: string;
  name: string;
  county: string;
  state: string;
  elevation: string;
  population?: string;
  // Metadata for SEO
  metaTitle: string;
  metaDescription: string;
  
  // VARIABLE LOCALITY ELEMENTS
  /** The specific property types common in this town (e.g., 'Club Communities', 'Historic Cottages') */
  housingProfile: string;
  /** The primary local climate/exposure concern (e.g., '80+ inch rain cycle', 'High UV elevation') */
  climateExposure: string;
  /** Narrative on the local vibe and architectural tendencies */
  localVibe: string;
  /** Specific context for construction projects in this area */
  constructionContext: string;
  /** What locals are actually asking for most frequently */
  serviceDemandMix: string[];
  /** Truthful project style tendencies (e.g., 'Heavy timber', 'Modern mountain rustic') */
  styleTendency: string;
  /** Mention of high-value communities or neighborhoods within/near the town */
  notableNeighborhoods: string[];
  /** Why Highlander specifically is a fit for this market's owners */
  marketAuthorityAngle: string;
}

export const towns: TownData[] = [
  {
    slug: "highlands-nc",
    name: "Highlands",
    county: "Macon County",
    state: "NC",
    elevation: "4,118 ft",
    population: "~1,100 (Full-time)",
    metaTitle: "Roofing & Construction Services in Highlands, NC | Highlander Roofing",
    metaDescription: "High-elevation roofing and construction in Highlands, NC. Protecting Highlands Plateau estates with elevation-rated systems since 2017.",
    housingProfile: "High-end estate homes, historic summer cottages, and gated club communities.",
    climateExposure: "Extreme high-altitude weather: 80+ inches of rain, heavy ice loading, and high UV levels.",
    localVibe: "A world-class resort destination where architectural integrity and high-performance materials are the baseline expectation.",
    constructionContext: "Expansion projects often involve adding 'mountain rooms' — high-end screened porches with fireplaces — to capture valley views while shielding from heavy plateau rain.",
    serviceDemandMix: ["Standing seam metal roofing", "Brava synthetic shake", "Luxury master suite additions", "Storm damage documentation"],
    styleTendency: "Traditional mountain rustic with heavy timber accents, natural stone, and premium shake/slate aesthetics.",
    notableNeighborhoods: ["Wildcat Cliffs", "Highlands Country Club", "Cullasaja Club", "Mounttop"],
    marketAuthorityAngle: "We understand that Highlands homes require commercial-grade flashing details and high-velocity wind ratings that standard lowland contractors often miss."
  },
  {
    slug: "cashiers-nc",
    name: "Cashiers",
    county: "Jackson County",
    state: "NC",
    elevation: "3,484 ft",
    metaTitle: "Roofing & Construction Services in Cashiers, NC | Highlander Roofing",
    metaDescription: "Waterproofing-focused roofing and construction in Cashiers, NC. Serving the wettest high-elevation town in the Southeast with engineered systems.",
    housingProfile: "Rustic luxury residences and expansive seasonal mountain estates.",
    climateExposure: "One of the wettest places in North America. Persistent moisture, low-visibility fog, and rapid runoff requirements.",
    localVibe: "Low-density mountain living centered around the plateau's natural waterfalls and high-elevation lakes.",
    constructionContext: "Construction often focuses on deck expansions and view-optimization where older, undersized outdoor spaces are replaced with engineered multi-level entertainment zones.",
    serviceDemandMix: ["Synthetic slate roofing", "Complex moisture management", "Engineered deck expansions", "Gutter system optimization"],
    styleTendency: "Elevated rustic featuring bark siding, cedar shingles, and massive window walls for indoor-outdoor integration.",
    notableNeighborhoods: ["High Hampton", "Cedar Creek", "Lonesome Valley", "Chinquapin"],
    marketAuthorityAngle: "In a town with 80+ inches of rain, we treat every roof as a complex water-management system rather than just a surface covering."
  },
  {
    slug: "franklin-nc",
    name: "Franklin",
    county: "Macon County",
    state: "NC",
    elevation: "2,119 ft",
    metaTitle: "Roofing & Construction Services in Franklin, NC | Highlander Roofing",
    metaDescription: "Local roofing and construction in Franklin, NC. Family-owned, locally based crews for residential roofing and home additions.",
    housingProfile: "Traditional single-family homes, ridgetop residences, and valley farmhouses.",
    climateExposure: "Significant seasonal temperature swings and high-wind events channeled through the Little Tennessee River valley.",
    localVibe: "A stable, year-round community where local accountability and long-term reliability are the primary homeowner priorities.",
    constructionContext: "Focus is on expanding primary residences — adding garage apartments, master suites, or full interior kitchen and bath transformations.",
    serviceDemandMix: ["Dimensional asphalt replacement", "Residential roof repairs", "Home additions & garage conversions", "Interior renovations"],
    styleTendency: "Classic Appalachian residential styles, including craftsman bungalows and modern farmhouses.",
    notableNeighborhoods: ["Cartoogechaye", "Iotla", "Holly Springs", "Burningtown"],
    marketAuthorityAngle: "Based in Franklin, our crews live here. We offer the fastest response times for Macon County homeowners because our staging yards are minutes away."
  },
  {
    slug: "sylva-nc",
    name: "Sylva",
    county: "Jackson County",
    state: "NC",
    elevation: "2,037 ft",
    metaTitle: "Roofing & Construction Services in Sylva, NC | Highlander Roofing",
    metaDescription: "Expert roofing and construction in Sylva, NC. Serving downtown historic homes and Jackson County hillside residences since 2017.",
    housingProfile: "Historic downtown homes, university-proximate rentals, and hillside residential properties.",
    climateExposure: "Valley moisture traps creating heavy morning fog and persistent humidity that accelerates biological growth on roofs.",
    localVibe: "A mix of vibrant historic downtown character and modern residential growth driven by WCU and regional commerce.",
    constructionContext: "Frequent transformations of older downtown homes into modern open-concept floor plans while maintaining historic exterior aesthetics.",
    serviceDemandMix: ["Commercial roof maintenance", "Algae-resistant shingle systems", "Historic home renovations", "Student-housing roof coordination"],
    styleTendency: "Historic preservation mixed with functional modern mountain design.",
    notableNeighborhoods: ["Historic Downtown", "Tuckasegee River Corridor", "Cope Creek", "Fisher Creek"],
    marketAuthorityAngle: "From Jackson County commercial buildings to historic Main Street residences, we coordinate complex projects around busy downtown schedules and tenants."
  },
  {
    slug: "bryson-city-nc",
    name: "Bryson City",
    county: "Swain County",
    state: "NC",
    elevation: "1,752 ft",
    metaTitle: "Roofing & Construction in Bryson City, NC | Highlander Roofing",
    metaDescription: "Durable roofing and construction for Bryson City homes and vacation rentals. Specialized services for the gateway to the Smokies.",
    housingProfile: "Log cabins, high-traffic vacation rentals, and traditional mountain bungalows.",
    climateExposure: "Sudden Smoky Mountain deluges and high humidity that requires superior flashing at all wood-to-metal transitions.",
    localVibe: "Outdoor-centric tourism hub where property owners need low-maintenance materials that can withstand heavy seasonal usage.",
    constructionContext: "High volume of porch repairs and deck expansions for short-term rental properties that must meet rigorous safety and durability standards.",
    serviceDemandMix: ["Metal roofing (Standing Seam)", "Deck & porch expansions", "Tree-damage emergency repairs", "Vacation rental maintenance"],
    styleTendency: "Classic Smoky Mountain log and timber styles emphasizing durability and natural finishes.",
    notableNeighborhoods: ["Alarka", "Deep Creek", "Lands Creek", "Fontana Lake area"],
    marketAuthorityAngle: "We specialize in the fast-turnaround schedules required by vacation rental owners, completing major work between guest stays whenever possible."
  },
  {
    slug: "waynesville-nc",
    name: "Waynesville",
    county: "Haywood County",
    state: "NC",
    elevation: "2,753 ft",
    metaTitle: "Roofing & Construction in Waynesville, NC | Highlander Roofing",
    metaDescription: "Professional roofing and construction for Waynesville's historic districts and new residential builds. Haywood County expertise.",
    housingProfile: "Historic district estates, mid-century residential neighborhoods, and new hillside developments.",
    climateExposure: "Regular freeze-thaw cycles and winter snow accumulation that tests attic ventilation and older roof deck integrity.",
    localVibe: "One of WNC's most established residential markets, featuring deep historic roots and a growing modern residential base.",
    constructionContext: "Substantial focus on additions and whole-home renovations for older Haywood County properties that need structural modernization.",
    serviceDemandMix: ["Historic roof detailing", "Hillside home additions", "Attic ventilation correction", "Metal roofing"],
    styleTendency: "Elegant historic architecture (Queen Anne, Colonial) transitioning into contemporary mountain modern.",
    notableNeighborhoods: ["Main Street Historic District", "Frog Level", "Pigeon Street", "Hyatt Creek"],
    marketAuthorityAngle: "Our Haywood County projects balance the technical needs of structural modernization with the visual sensitivity required for Waynesville's historic character."
  }
];

export const getTownBySlug = (slug: string) => towns.find(t => t.slug === slug);
