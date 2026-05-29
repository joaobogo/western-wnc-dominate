export interface CountyFact {
  label: string;
  value: string;
  icon?: string;
}

export interface CountyData {
  slug: string;
  name: string;
  description: string;
  towns: string[];
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  facts: CountyFact[];
  housingContext: string;
  climateRealities: string;
}

export const counties: CountyData[] = [
  {
    slug: "macon-county",
    name: "Macon County",
    description: "Macon County serves as our headquarters and original operating hub. From the high-elevation estates of Highlands to the family residences of Franklin, we provide the region's most reliable roofing and construction services.",
    towns: ["Highlands", "Franklin"],
    metaTitle: "Roofing & Construction Services in Macon County, NC | Highlander Roofing",
    metaDescription: "Professional roofing and home construction across Macon County, NC. Serving Franklin and Highlands with local crews and premium materials since 2017.",
    heroImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000",
    facts: [
      { label: "Dispatch", value: "Franklin Hub" },
      { label: "Credentials", value: "Licensed GC" },
      { label: "Rating", value: "4.9/5 Stars" },
      { label: "Coverage", value: "Full County" }
    ],
    housingContext: "Macon County features a unique blend of high-end mountain estates on the plateau and traditional single-family homes and farms in the valley.",
    climateRealities: "Homes here face extreme variables — from 4,000+ ft icing on the Highlands plateau to high-wind channeling in the Franklin valley."
  },
  {
    slug: "jackson-county",
    name: "Jackson County",
    description: "From the temperate rainforest of Cashiers to the historic district of Sylva, we provide Jackson County with specialized mountain-rated roofing and construction.",
    towns: ["Cashiers", "Sylva", "Cullowhee", "Dillsboro"],
    metaTitle: "Roofing & Construction Services in Jackson County, NC | Highlander Roofing",
    metaDescription: "Expert roofing and construction for Jackson County, NC. Serving Sylva, Cashiers, Cullowhee, and Dillsboro with specialized mountain-rated systems.",
    heroImage: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2000",
    facts: [
      { label: "Regional Base", value: "Sylva Hub" },
      { label: "Specialty", value: "Moisture Systems" },
      { label: "Portfolio", value: "Historic + New" },
      { label: "Status", value: "Active Local Crew" }
    ],
    housingContext: "Jackson County property spans from luxury resort communities in Cashiers to historic residential hubs in Sylva and university housing in Cullowhee.",
    climateRealities: "This county contains some of the wettest high-elevation terrain in the US, requiring advanced moisture management and superior drainage engineering."
  },
  {
    slug: "swain-county",
    name: "Swain County",
    description: "Serving the gateway to the Smokies. We specialize in vacation rental durability and low-maintenance roofing systems for Bryson City property owners.",
    towns: ["Bryson City"],
    metaTitle: "Roofing & Construction Services in Swain County, NC | Highlander Roofing",
    metaDescription: "Reliable roofing and construction in Swain County, NC. Specialized services for Bryson City homes and vacation rentals near the Smokies.",
    heroImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000",
    facts: [
      { label: "Market Focus", value: "Vacation Rentals" },
      { label: "Top Material", value: "Metal Roofing" },
      { label: "Response", value: "Priority Support" },
      { label: "Rating", value: "5.0/5 Stars" }
    ],
    housingContext: "Swain County is dominated by high-traffic vacation rentals, mountain cabins, and riverside residences that require high-durability, low-maintenance finishes.",
    climateRealities: "High humidity from the Smoky Mountains and sudden afternoon deluges demand superior flashing details and mold-resistant roofing systems."
  },
  {
    slug: "haywood-county",
    name: "Haywood County",
    description: "Providing precision roofing modernization and structural home additions across Waynesville and Haywood County. We balance historic character with modern performance.",
    towns: ["Waynesville"],
    metaTitle: "Roofing & Construction Services in Haywood County, NC | Highlander Roofing",
    metaDescription: "Professional roofing and construction across Haywood County, NC. Serving Waynesville with expert care for historic and modern properties.",
    heroImage: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=2000",
    facts: [
      { label: "Specialty", value: "Historic Districts" },
      { label: "Focus", value: "Structural Additions" },
      { label: "Response", value: "Rapid Dispatch" },
      { label: "Service", value: "Dual Division" }
    ],
    housingContext: "Haywood County features established historic districts in Waynesville and significant ridgetop development requiring complex structural engineering.",
    climateRealities: "Waynesville's elevation brings significant winter snow accumulation and regular freeze-thaw cycles that test attic ventilation and roof deck integrity."
  }
];

export const getCountyBySlug = (slug: string) => counties.find(c => c.slug === slug);