export interface TownData {
  slug: string;
  name: string;
  county: string;
  state: string;
  description: string;
  localProof: string;
  features: string[];
  metaTitle: string;
  metaDescription: string;
  // Enhanced fields for legitimacy
  localVibe: string;
  climateChallenge: string;
  constructionContext: string;
  population?: string;
  elevation?: string;
}

export const towns: TownData[] = [
  {
    slug: "highlands-nc",
    name: "Highlands",
    county: "Macon County",
    state: "NC",
    elevation: "4,118 ft",
    population: "~1,100 (Full-time)",
    description: "At over 4,100 feet elevation, Highlands homes face some of the most extreme weather conditions in the Southeast — heavy rainfall, ice, high winds, and UV exposure. Highlander Roofing has been protecting and building Highlands homes since 2017 with roofing and construction systems built for this altitude.",
    localVibe: "A mix of historic Appalachian cottages and sprawling modern estate homes, often featuring natural materials like cedar shake, stone, and heavy timber accents.",
    climateChallenge: "Receives nearly 90 inches of annual rainfall. The 'Highlands Plateau' microclimate creates persistent moisture issues and high-velocity wind patterns that test every flashing detail.",
    constructionContext: "Most projects here focus on expanding vacation homes into year-round master suites or adding massive screened 'outdoor rooms' that capture mountain views while protecting from the heavy rain.",
    localProof: "Trusted by dozens of Highlands homeowners for roofing, home additions, and exterior construction projects across the Highlands Plateau.",
    features: ["Elevation-rated roofing materials", "Custom home additions & porches", "Storm damage emergency response", "Outdoor living & deck construction", "Insurance claim documentation support"],
    metaTitle: "Roofing & Construction Services in Highlands, NC | Highlander Roofing",
    metaDescription: "Expert roofing and construction in Highlands, NC. Roof repair, custom additions, storm damage & outdoor living. Licensed, insured. Free inspections — (828) 397-9211.",
  },
  {
    slug: "cashiers-nc",
    name: "Cashiers",
    county: "Jackson County",
    state: "NC",
    elevation: "3,484 ft",
    description: "Cashiers sits at 3,486 feet and receives over 80 inches of rain annually — one of the wettest places in the U.S. Homes here need superior waterproofing, proper drainage, and moisture-resistant construction materials. Highlander Roofing provides comprehensive roofing and construction services for the Cashiers plateau.",
    localVibe: "High-end rustic architecture prevalent in gated club communities. Homes often emphasize integration with the natural landscape through decks and large window walls.",
    climateChallenge: "One of the few temperate rainforests in North America. Persistent humidity and heavy runoff mean drainage systems (gutters/foundation) are as critical as the roof itself.",
    constructionContext: "We frequently handle deck expansions and 'view-optimization' renovations where older, smaller porches are replaced with engineered multi-level outdoor living spaces.",
    localProof: "Serving Cashiers-area homeowners with premium roofing and exterior improvements designed for the region's extreme rainfall and mountain weather patterns.",
    features: ["Moisture-resistant roofing systems", "Custom decks & outdoor living", "Drainage and gutter optimization", "Renovations & structural repairs", "Free project inspections"],
    metaTitle: "Roofing & Construction Services in Cashiers, NC | Highlander Roofing",
    metaDescription: "Professional roofing and construction in Cashiers, NC. Waterproof systems, home additions, and storm repair for one of NC's wettest climates. Free inspections — (828) 397-9211.",
  },
  {
    slug: "franklin-nc",
    name: "Franklin",
    county: "Macon County",
    state: "NC",
    elevation: "2,100 ft",
    description: "As the county seat of Macon County, Franklin is home to our primary office and a community that needs reliable roofing and construction. We provide fast response times and local accountability for everything from roof repairs to home additions.",
    localVibe: "A diverse mix of traditional residential neighborhoods, rural valley farmhouses, and ridge-top residences.",
    climateChallenge: "Sitting in the 'Little Tennessee River Valley', Franklin experiences significant seasonal temperature swings and high-wind events during spring and autumn storms.",
    constructionContext: "A high volume of master suite additions and garage-to-living-space conversions as families expand their primary residences.",
    localProof: "Based in Franklin with crews ready for rapid deployment. We've completed hundreds of roofing and construction projects across the greater Franklin area.",
    features: ["Local Franklin-based crews", "Roofing & home additions", "Exterior renovations & repairs", "Decks, porches & outdoor living", "Financing options"],
    metaTitle: "Roofing & Construction Services in Franklin, NC | Highlander Roofing",
    metaDescription: "Local roofing and construction company in Franklin, NC. Roof repair, home additions, and exterior renovations. Family-owned since 2017. Free inspections — (828) 397-9211.",
  },
  {
    slug: "sylva-nc",
    name: "Sylva",
    county: "Jackson County",
    state: "NC",
    elevation: "2,041 ft",
    description: "Sylva serves as the Jackson County seat, where mountain weather patterns test both roofs and exterior structures. Our Sylva office provides fast, local service for residential roofing, commercial roofing, and custom construction across the area.",
    localVibe: "Charming historic downtown architecture surrounded by neighborhoods with a mix of mid-century and modern mountain designs.",
    climateChallenge: "Sylva's valley location traps moisture and experiences heavy fog, requiring roofing and siding materials with superior mold and algae resistance.",
    constructionContext: "Frequent kitchen and bath transformations in historic downtown homes, paired with modern additions in the surrounding hills.",
    localProof: "Our Sylva-area team handles everything from emergency storm repairs to custom home additions and commercial exterior maintenance.",
    features: ["Sylva-based operations", "Residential & commercial roofing", "Home additions & renovations", "Decks & outdoor construction", "Insurance claim assistance"],
    metaTitle: "Roofing & Construction Services in Sylva, NC | Highlander Roofing",
    metaDescription: "Expert roofing and construction in Sylva, NC. Residential & commercial roofing, home additions, and exterior improvements. Free inspections — (828) 397-9211.",
  },
  {
    slug: "bryson-city-nc",
    name: "Bryson City",
    county: "Swain County",
    state: "NC",
    elevation: "1,752 ft",
    description: "Bryson City sits at the gateway to the Smokies, where vacation rentals and homes face heavy seasonal wear. Highlander Roofing serves Bryson City with reliable roofing, custom decks, and porch construction built for mountain conditions.",
    localVibe: "Heavy focus on log cabins, vacation rentals, and tourism-oriented properties that need high-durability finishes and low-maintenance roofing.",
    climateChallenge: "Smoky Mountain proximity brings sudden afternoon deluges and high humidity that accelerates rot in improperly flashed exterior wood.",
    constructionContext: "We specialize in deck repairs and expansions for high-traffic rental properties, ensuring safety and durability for heavy seasonal use.",
    localProof: "Protecting Bryson City homes and vacation properties with roofing and exterior construction built for Smoky Mountain weather.",
    features: ["Vacation rental specialists", "Decks & porch construction", "Roofing & storm repair", "Custom exterior additions", "Insurance-ready documentation"],
    metaTitle: "Roofing & Construction in Bryson City, NC | Highlander Roofing",
    metaDescription: "Roofing and construction services in Bryson City, NC. Protecting mountain homes, rentals, and cabins with expert roofing and custom builds. Free inspections — (828) 397-9211.",
  },
];

export const getTownBySlug = (slug: string) => towns.find(t => t.slug === slug);
