export interface CountyData {
  slug: string;
  name: string;
  description: string;
  towns: string[];
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  facts: { label: string; value: string }[];
}

export const counties: CountyData[] = [
  {
    slug: "macon-county",
    name: "Macon County",
    description: "From the high-elevation estates of Highlands to the valley farmhouses of Franklin, we provide Macon County with the region's most reliable roofing and construction services. Our hometown market where we've built our reputation on local accountability.",
    towns: ["Highlands", "Franklin"],
    metaTitle: "Roofing & Construction Services in Macon County, NC | Highlander Roofing",
    metaDescription: "Professional roofing and home construction across Macon County, NC. Serving Franklin and Highlands with local crews and premium materials since 2017.",
    heroImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000",
    facts: [
      { label: "Service Area", value: "Full County" },
      { label: "Office Location", value: "Franklin, NC" },
      { label: "Response Time", value: "< 45 Minutes" },
      { label: "Trust Rating", value: "4.9/5 Stars" }
    ]
  },
  {
    slug: "jackson-county",
    name: "Jackson County",
    description: "Serving the diverse terrain of Jackson County — from the temperate rainforest of Cashiers to the historic streets of Sylva and the university hub of Cullowhee. We understand the specific structural demands of Jackson County's varied elevations.",
    towns: ["Cashiers", "Sylva", "Cullowhee", "Dillsboro"],
    metaTitle: "Roofing & Construction Services in Jackson County, NC | Highlander Roofing",
    metaDescription: "Expert roofing and construction for Jackson County, NC. Serving Sylva, Cashiers, Cullowhee, and Dillsboro with specialized mountain-rated systems.",
    heroImage: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2000",
    facts: [
      { label: "Service Area", value: "Full County" },
      { label: "Office Location", value: "Sylva, NC" },
      { label: "Response Time", value: "< 60 Minutes" },
      { label: "Trust Rating", value: "5.0/5 Stars" }
    ]
  },
  {
    slug: "swain-county",
    name: "Swain County",
    description: "As the gateway to the Smoky Mountains, Swain County requires durable, low-maintenance roofing and construction that can withstand high humidity and sudden mountain deluges. We specialize in vacation rental reliability in Bryson City and beyond.",
    towns: ["Bryson City"],
    metaTitle: "Roofing & Construction Services in Swain County, NC | Highlander Roofing",
    metaDescription: "Reliable roofing and construction in Swain County, NC. Specialized services for Bryson City homes and vacation rentals near the Smokies.",
    heroImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000",
    facts: [
      { label: "Service Area", value: "Full County" },
      { label: "Market Focus", value: "Vacation Rentals" },
      { label: "Material Specialty", value: "Metal Roofing" },
      { label: "Trust Rating", value: "4.8/5 Stars" }
    ]
  },
  {
    slug: "haywood-county",
    name: "Haywood County",
    description: "From the historic districts of Waynesville to the ridgetop developments of Haywood County, we provide precision roofing modernization and structural home additions. Balancing historic character with modern performance.",
    towns: ["Waynesville"],
    metaTitle: "Roofing & Construction Services in Haywood County, NC | Highlander Roofing",
    metaDescription: "Professional roofing and construction across Haywood County, NC. Serving Waynesville with expert care for historic and modern properties.",
    heroImage: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=2000",
    facts: [
      { label: "Service Area", value: "Full County" },
      { label: "Specialty", value: "Historic Modernization" },
      { label: "Division", value: "Dual Capability" },
      { label: "Trust Rating", value: "4.9/5 Stars" }
    ]
  }
];

export const getCountyBySlug = (slug: string) => counties.find(c => c.slug === slug);