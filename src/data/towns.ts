export interface TownData {
  slug: string;
  name: string;
  county: string;
  state: string;
  elevation: string;
  population?: string;
  description: string;
  features: string[];
  metaTitle: string;
  metaDescription: string;
  
  // VARIABLE LOCALITY ELEMENTS
  housingProfile: string;
  climateExposure: string;
  localVibe: string;
  constructionContext: string;
  serviceDemandMix: string[];
  styleTendency: string;
  notableNeighborhoods: string[];
  marketAuthorityAngle: string;
  heroImage: string;
}

export const towns: TownData[] = [
  {
    slug: "highlands-nc",
    name: "Highlands",
    county: "Macon County",
    state: "NC",
    elevation: "4,118 ft",
    population: "~1,100 (Full-time)",
    description: "At over 4,118 feet elevation, Highlands estates face some of the Southeast's most aggressive weather patterns. We specialize in high-velocity wind protection and premium synthetic systems designed for the plateau's unique exposure.",
    features: ["Elevation-rated systems", "Design & Planning", "Storm damage recovery", "Premium Brava installers"],
    metaTitle: "Roofing & Construction in Highlands, NC | Macon County Authority",
    metaDescription: "High-elevation roofing and construction for Highlands Plateau estates. Specialized in Brava synthetic systems and master suite additions. Licensed & Insured.",
    housingProfile: "High-end estate homes, historic summer cottages, and gated club communities on the Highlands Plateau.",
    climateExposure: "Extreme high-altitude weather: 80+ inches of rain, heavy ice loading, and high UV levels that test standard roofing systems.",
    localVibe: "A world-class resort destination where architectural integrity and high-performance materials are the baseline expectation for every project.",
    constructionContext: "We specialize in 'mountain rooms' — high-end screened porches with fireplaces — that capture valley views while shielding from heavy plateau rain.",
    serviceDemandMix: ["Standing Seam Metal Roofing", "Brava Synthetic Shake", "Luxury Master Suite Additions", "Storm Damage Recovery"],
    styleTendency: "Traditional mountain rustic with heavy timber accents, natural stone, and premium shake/slate aesthetics.",
    notableNeighborhoods: ["Wildcat Cliffs", "Highlands Country Club", "Cullasaja Club", "Mounttop"],
    marketAuthorityAngle: "Highlands estates require commercial-grade flashing details and high-velocity wind ratings. We build to the standard the Plateau demands.",
    heroImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000"
  },
  {
    slug: "cashiers-nc",
    name: "Cashiers",
    county: "Jackson County",
    state: "NC",
    elevation: "3,484 ft",
    description: "Cashiers sits in a temperate rainforest zone, demanding superior moisture management. Our systems are engineered to handle 80+ inches of rain while maintaining the high-end rustic aesthetic of the plateau.",
    features: ["Design & Planning", "Engineered deck expansions", "Moisture-resistant materials", "Gutter optimization"],
    metaTitle: "Roofing & Construction in Cashiers, NC | Jackson County Authority",
    metaDescription: "Waterproofing-focused roofing and construction for Cashiers estates. Specialized in moisture-resistant materials and engineered deck expansions. Licensed & Insured.",
    housingProfile: "Rustic luxury residences and expansive seasonal mountain estates across the Cashiers Plateau.",
    climateExposure: "Temperate rainforest conditions: Persistent moisture, 80+ inches of rain, and low-visibility fog that requires advanced drainage.",
    localVibe: "Low-density mountain living centered around the plateau's natural waterfalls and lake communities like Lake Glenville.",
    constructionContext: "We specialize in deck expansions and view-optimization, replacing older outdoor spaces with engineered multi-level entertainment zones.",
    serviceDemandMix: ["Synthetic Slate Roofing", "Advanced Moisture Management", "Engineered Deck Expansions", "Gutter Optimization"],
    styleTendency: "Elevated rustic featuring bark siding, cedar shingles, and massive window walls for indoor-outdoor integration.",
    notableNeighborhoods: ["High Hampton", "Cedar Creek", "Lonesome Valley", "Chinquapin", "Lake Glenville"],
    marketAuthorityAngle: "In the Southeast's wettest high-elevation town, we treat every project as a complex water-management system rather than just a build.",
    heroImage: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&q=80&w=2000"
  },
  {
    slug: "franklin-nc",
    name: "Franklin",
    county: "Macon County",
    state: "NC",
    elevation: "2,119 ft",
    description: "Our hometown market. Based in Franklin, we provide the region's fastest response times for family homes, valley farms, and ridge-top residences across Macon County.",
    features: ["Locally based crews", "Design & Planning", "Residential specialists", "Family-owned authority"],
    metaTitle: "Roofing & Construction in Franklin, NC | Macon County Home Base",
    metaDescription: "Local roofing and construction for Franklin families and farms. Family-owned, locally based crews for residential roofing and home additions. Licensed & Insured.",
    housingProfile: "Traditional single-family homes, ridgetop residences, and historic valley farmhouses across Macon County.",
    climateExposure: "Challenging seasonal swings and high-wind events channeled through the Little Tennessee River valley.",
    localVibe: "A stable, year-round community where local accountability and family-business reliability are the primary priorities.",
    constructionContext: "We specialize in expanding primary residences — adding garage apartments, master suites, or full interior kitchen and bath transformations.",
    serviceDemandMix: ["Dimensional Asphalt Roofing", "Residential Repairs", "Master Suite Additions", "Interior Renovations"],
    styleTendency: "Classic Appalachian styles, including craftsman bungalows and modern farmhouses built for local conditions.",
    notableNeighborhoods: ["Cartoogechaye", "Iotla", "Holly Springs", "Burningtown", "Otto"],
    marketAuthorityAngle: "Franklin is our home. Our crews live here, meaning we offer the fastest response times and local accountability for Macon County neighbors.",
    heroImage: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=2000"
  },
  {
    slug: "sylva-nc",
    name: "Sylva",
    county: "Jackson County",
    state: "NC",
    elevation: "2,037 ft",
    description: "From historic downtown renovations to commercial maintenance programs, our Sylva operations serve as a critical hub for Jackson County's diverse roofing and construction needs.",
    features: ["Historic home expertise", "Commercial maintenance", "Jackson County hub", "Rental property service"],
    metaTitle: "Roofing & Construction Services in Sylva, NC | Highlander Roofing",
    metaDescription: "Expert roofing and construction in Sylva, NC. Serving downtown historic homes and Jackson County hillside residences since 2017.",
    housingProfile: "Historic downtown homes, university-proximate rentals, and hillside residential properties.",
    climateExposure: "Valley moisture traps creating heavy morning fog and persistent humidity that accelerates biological growth on roofs.",
    localVibe: "A mix of vibrant historic downtown character and modern residential growth driven by WCU and regional commerce.",
    constructionContext: "Frequent transformations of older downtown homes into modern open-concept floor plans while maintaining historic exterior aesthetics.",
    serviceDemandMix: ["Commercial roof maintenance", "Algae-resistant shingle systems", "Historic home renovations", "Student-housing roof coordination"],
    styleTendency: "Historic preservation mixed with functional modern mountain design.",
    notableNeighborhoods: ["Historic Downtown", "Tuckasegee River Corridor", "Cope Creek", "Fisher Creek"],
    marketAuthorityAngle: "From Jackson County commercial buildings to historic Main Street residences, we coordinate complex projects around busy downtown schedules and tenants.",
    heroImage: "https://images.unsplash.com/photo-1518173946687-a4c8a9b749f5?auto=format&fit=crop&q=80&w=2000"

  },
  {
    slug: "bryson-city-nc",
    name: "Bryson City",
    county: "Swain County",
    state: "NC",
    elevation: "1,752 ft",
    description: "The gateway to the Smokies. We specialize in fast-turnaround roofing and deck expansions for vacation rental owners who need reliability between guest stays.",
    features: ["Vacation rental focus", "Fast turnaround work", "Smoky Mountain experts", "Deck safety upgrades"],
    metaTitle: "Roofing & Construction in Bryson City, NC | Swain County Authority",
    metaDescription: "Durable roofing and construction for Bryson City homes and vacation rentals. Specialized services for the gateway to the Smokies. Licensed & Insured.",
    housingProfile: "Log cabins, high-traffic vacation rentals, and traditional mountain bungalows.",
    climateExposure: "Sudden Smoky Mountain deluges and high humidity that requires superior flashing at all wood-to-metal transitions.",
    localVibe: "Outdoor-centric tourism hub where property owners need low-maintenance materials that can withstand heavy seasonal usage.",
    constructionContext: "We specialize in porch repairs and deck expansions for short-term rental properties that must meet rigorous safety and durability standards.",
    serviceDemandMix: ["Standing Seam Metal Roofing", "Deck & Porch expansions", "Tree-Damage Repair", "Vacation Rental Maintenance"],
    styleTendency: "Classic Smoky Mountain log and timber styles emphasizing durability and natural finishes.",
    notableNeighborhoods: ["Alarka", "Deep Creek", "Lands Creek", "Fontana Lake area"],
    marketAuthorityAngle: "We understand that in Bryson City, your home is often your business. We complete major projects in the tight windows between guest stays.",
    heroImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000"
  },
  {
    slug: "waynesville-nc",
    name: "Waynesville",
    county: "Haywood County",
    state: "NC",
    elevation: "2,753 ft",
    description: "Serving Waynesville's historic districts and established residential neighborhoods with expert roofing modernization and large-scale home additions.",
    features: ["Historic district care", "Whole-home renovations", "Haywood County authority", "Structural modernization"],
    metaTitle: "Roofing & Construction in Waynesville, NC | Highlander Roofing",
    metaDescription: "Professional roofing and construction for Waynesville's historic districts and new residential builds. Haywood County expertise.",
    housingProfile: "Historic district estates, mid-century residential neighborhoods, and new hillside developments.",
    climateExposure: "Regular freeze-thaw cycles and winter snow accumulation that tests attic ventilation and older roof deck integrity.",
    localVibe: "One of WNC's most established residential markets, featuring deep historic roots and a growing modern residential base.",
    constructionContext: "Substantial focus on additions and whole-home renovations for older Haywood County properties that need structural modernization.",
    serviceDemandMix: ["Historic roof detailing", "Hillside home additions", "Attic ventilation correction", "Metal roofing"],
    styleTendency: "Elegant historic architecture (Queen Anne, Colonial) transitioning into contemporary mountain modern.",
    notableNeighborhoods: ["Main Street Historic District", "Frog Level", "Pigeon Street", "Hyatt Creek"],
    marketAuthorityAngle: "Our Haywood County projects balance the technical needs of structural modernization with the visual sensitivity required for Waynesville's historic character.",
    heroImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000"

  },
  {
    slug: "cullowhee-nc",
    name: "Cullowhee",
    county: "Jackson County",
    state: "NC",
    elevation: "2,100 ft",
    description: "Home to WCU, our Cullowhee services prioritize fast, budget-conscious solutions for student housing, local staff residences, and multi-unit rental assets.",
    features: ["Student housing timing", "Rental property repairs", "Budget-conscious plans", "Reliable maintenance"],
    metaTitle: "Roofing & Construction in Cullowhee, NC | Jackson County Rental Support",
    metaDescription: "Reliable roofing and construction for Cullowhee student housing and residential properties. Fast response for WCU area landlords. Licensed & Insured.",
    housingProfile: "Multi-unit rentals, student housing, and faculty residences near WCU.",
    climateExposure: "Heavy valley fog and humidity typical of the Tuckasegee basin that accelerates biological growth.",
    localVibe: "A university-centric community where property maintenance windows are often tied to the academic calendar transitions.",
    constructionContext: "We focus on maximizing rental occupancy by updating older housing stock near the university with modern decks and master-suite expansions.",
    serviceDemandMix: ["Rental Roof Repairs", "Deck Safety Inspections", "Exterior Siding Updates", "Algae-Resistant Shingles"],
    styleTendency: "Functional residential and multi-unit architecture prioritizing longevity, value, and tenant safety.",
    notableNeighborhoods: ["WCU Campus Area", "Old Cullowhee Road", "Caney Fork", "Speedwell"],
    marketAuthorityAngle: "We understand Cullowhee's academic rhythm. We coordinate with Jackson County property managers to ensure projects finish before the semester starts.",
    heroImage: "https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&q=80&w=2000"
  },
  {
    slug: "dillsboro-nc",
    name: "Dillsboro",
    county: "Jackson County",
    state: "NC",
    elevation: "2,041 ft",
    description: "A historic village where precision matters. We provide preservation-sensitive roofing and construction for Dillsboro's unique cottages and tourism properties.",
    features: ["Historic village care", "Precision flashing", "Tourism-ready cleanup", "Mountain cottage charm"],
    metaTitle: "Roofing & Construction in Dillsboro, NC | Jackson County Historic Experts",
    metaDescription: "Preservation-sensitive roofing and construction for Dillsboro. Expert care for historic mountain cottages and village properties. Licensed & Insured.",
    housingProfile: "Historic village cottages, artisan shops, and riverfront residences in Dillsboro.",
    climateExposure: "River-proximate moisture and valley fog that demands algae-resistant materials and precise flashing.",
    localVibe: "A walkable, historic artisan community where the aesthetic impact of every project is carefully considered by neighbors and visitors.",
    constructionContext: "We specialize in preservation-focused renovations and small-scale additions that integrate with 100-year-old mountain architecture.",
    serviceDemandMix: ["Designer Shingle Systems", "Artisan Porch Detailing", "Historic Exterior Repairs", "Gutter Copper Accents"],
    styleTendency: "Quaint Appalachian village style with a focus on charm, historic accuracy, and river-resistant structural details.",
    notableNeighborhoods: ["Historic Village Center", "Tuckasegee Riverfront", "Monteith Park area"],
    marketAuthorityAngle: "Dillsboro is a destination. We keep our job sites tourism-ready and our craftsmanship village-compliant to protect Dillsboro's unique mountain character.",
    heroImage: "https://images.unsplash.com/photo-1518173946687-a4c8a9b749f5?auto=format&fit=crop&q=80&w=2000"
  }
];

export const getTownBySlug = (slug: string) => towns.find(t => t.slug === slug);
