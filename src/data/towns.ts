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
}

export const towns: TownData[] = [
  {
    slug: "highlands-nc",
    name: "Highlands",
    county: "Macon County",
    state: "NC",
    description: "At over 4,100 feet elevation, Highlands homes face some of the most extreme roofing conditions in the Southeast — heavy rainfall, ice, high winds, and UV exposure. Highlander Roofing has been protecting Highlands homes since 2017 with roofing systems built for this altitude.",
    localProof: "Trusted by dozens of Highlands homeowners for storm repairs, full replacements, and ongoing maintenance across the Highlands Plateau.",
    features: ["Elevation-rated roofing materials", "Ice dam prevention systems", "Storm damage emergency response", "Local crews familiar with Highlands terrain", "Insurance claim documentation support"],
    metaTitle: "Roofing Services in Highlands, NC | Highlander Roofing",
    metaDescription: "Expert roofing in Highlands, NC. Roof repair, replacement, storm damage & metal roofing for mountain homes. Licensed, insured. Free inspections — (828) 397-9211.",
  },
  {
    slug: "cashiers-nc",
    name: "Cashiers",
    county: "Jackson County",
    state: "NC",
    description: "Cashiers sits at 3,486 feet and receives over 80 inches of rain annually — one of the wettest places in the U.S. Roofs here need superior waterproofing, proper drainage, and materials that resist persistent moisture. Highlander Roofing delivers exactly that.",
    localProof: "Serving Cashiers-area homeowners with premium roofing solutions designed for the region's extreme rainfall and mountain weather patterns.",
    features: ["Moisture-resistant roofing systems", "Superior underlayment and waterproofing", "Drainage and gutter optimization", "Mold and rot prevention", "Free roofing inspections"],
    metaTitle: "Roofing Services in Cashiers, NC | Highlander Roofing",
    metaDescription: "Professional roofing in Cashiers, NC. Waterproof systems, storm repair, and replacement for one of NC's wettest climates. Free inspections — (828) 397-9211.",
  },
  {
    slug: "franklin-nc",
    name: "Franklin",
    county: "Macon County",
    state: "NC",
    description: "As the county seat of Macon County, Franklin is home to a growing community of families and retirees who need reliable, affordable roofing. Our Franklin office ensures fast response times and local accountability for every project.",
    localProof: "Based in Franklin with crews and materials ready for rapid deployment. We've completed hundreds of projects across the greater Franklin area.",
    features: ["Local Franklin-based crews", "Fast response times", "Affordable pricing for residential roofing", "Senior and veteran discounts available", "Financing options"],
    metaTitle: "Roofing Services in Franklin, NC | Highlander Roofing",
    metaDescription: "Local roofing company in Franklin, NC. Roof repair, replacement, storm damage restoration. Family-owned since 2017. Free inspections — (828) 397-9211.",
  },
  {
    slug: "sylva-nc",
    name: "Sylva",
    county: "Jackson County",
    state: "NC",
    description: "Sylva serves as the Jackson County seat and sits in a valley surrounded by mountains — creating unique weather patterns that test roofing systems. Our Sylva office provides fast, local service for residential and commercial roofing across the area.",
    localProof: "Our Sylva-area team handles everything from emergency storm repairs to full commercial maintenance programs for properties throughout Jackson County.",
    features: ["Sylva-based operations", "Residential and commercial roofing", "Emergency storm response", "Commercial maintenance programs", "Insurance claim assistance"],
    metaTitle: "Roofing Services in Sylva, NC | Highlander Roofing",
    metaDescription: "Expert roofing in Sylva, NC. Residential & commercial roofing, storm damage repair, metal roofing. Free inspections — (828) 397-9211.",
  },
  {
    slug: "bryson-city-nc",
    name: "Bryson City",
    county: "Swain County",
    state: "NC",
    description: "Bryson City sits at the gateway to the Great Smoky Mountains, where roofs face heavy seasonal tourism wear, mountain storms, and elevation challenges. Highlander Roofing serves Bryson City homeowners and vacation rental property owners with reliable roofing solutions.",
    localProof: "Protecting Bryson City homes and vacation properties with roofing built for Smoky Mountain conditions.",
    features: ["Vacation rental roofing specialists", "Smoky Mountain weather-rated systems", "Fast turnaround for rental properties", "Storm damage documentation", "Metal and shingle options"],
    metaTitle: "Roofing Services in Bryson City, NC | Highlander Roofing",
    metaDescription: "Roofing services in Bryson City, NC. Protecting mountain homes and rental properties near the Smokies. Free inspections — (828) 397-9211.",
  },
  {
    slug: "waynesville-nc",
    name: "Waynesville",
    county: "Haywood County",
    state: "NC",
    description: "Waynesville is the largest town in Haywood County and home to a mix of historic homes and new construction — all needing roofing that handles WNC's demanding climate. Highlander Roofing provides comprehensive roofing services to the greater Waynesville area.",
    localProof: "Serving Waynesville and greater Haywood County with responsive, professional roofing for both historic homes and new construction.",
    features: ["Historic home roofing expertise", "New construction roofing", "Haywood County service coverage", "Energy-efficient options", "Flexible financing"],
    metaTitle: "Roofing Services in Waynesville, NC | Highlander Roofing",
    metaDescription: "Professional roofing in Waynesville, NC. Repairs, replacements, metal roofing for Haywood County homes. Free inspections — (828) 397-9211.",
  },
  {
    slug: "cullowhee-nc",
    name: "Cullowhee",
    county: "Jackson County",
    state: "NC",
    description: "Home to Western Carolina University, Cullowhee is a growing community with a mix of student housing, family homes, and rental properties. Highlander Roofing serves Cullowhee landlords, homeowners, and property managers with fast, professional roofing services.",
    localProof: "Trusted by Cullowhee property owners and landlords for fast, reliable roofing that keeps tenants safe and properties protected.",
    features: ["Rental property roofing", "Fast turnaround scheduling", "Multi-unit property service", "Affordable repair options", "Landlord communication support"],
    metaTitle: "Roofing Services in Cullowhee, NC | Highlander Roofing",
    metaDescription: "Roofing in Cullowhee, NC for homeowners, landlords & rental properties near WCU. Fast, affordable service. Free inspections — (828) 397-9211.",
  },
  {
    slug: "dillsboro-nc",
    name: "Dillsboro",
    county: "Jackson County",
    state: "NC",
    description: "Dillsboro is a charming mountain village with historic buildings and homes that need careful roofing attention. Highlander Roofing provides preservation-sensitive roofing services that maintain the character of this beloved WNC community.",
    localProof: "Serving Dillsboro's historic and residential properties with roofing that respects the village's mountain heritage.",
    features: ["Historic preservation roofing", "Small-town personalized service", "Premium dimensional shingle options", "Storm damage repair", "Free consultations"],
    metaTitle: "Roofing Services in Dillsboro, NC | Highlander Roofing",
    metaDescription: "Roofing services in Dillsboro, NC. Preservation-sensitive repairs, replacements, and storm damage restoration. Free inspections — (828) 397-9211.",
  },
];

export const getTownBySlug = (slug: string) => towns.find(t => t.slug === slug);
