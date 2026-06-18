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
    metaTitle: "Roofing & Construction in Macon County, NC | Highlander",
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
    metaTitle: "Roofing & Construction in Jackson County, NC | Highlander",
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
    metaTitle: "Roofing & Construction in Swain County, NC | Highlander",
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
    metaTitle: "Roofing & Construction in Haywood County, NC | Highlander",
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
  },
  {
    slug: "buncombe-county",
    name: "Buncombe County",
    description: "Serving the vibrant mountain hub of Asheville and its surrounding towns. We specialize in everything from historic district preservation to modern premium roofing systems.",
    towns: ["Asheville", "Black Mountain", "Weaverville"],
    metaTitle: "Roofing & Construction in Buncombe County, NC | Highlander",
    metaDescription: "Professional roofing and construction across Buncombe County, NC. Serving Asheville, Black Mountain, and Weaverville with premium local service.",
    heroImage: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=2000",
    facts: [
      { label: "Market Hub", value: "Asheville Region" },
      { label: "Specialty", value: "Historic + Modern" },
      { label: "Credentials", value: "Licensed GC" },
      { label: "Rating", value: "4.9/5 Stars" }
    ],
    housingContext: "Buncombe County features a high-density mix of historic urban estates, modern ridgetop home design, and rapidly growing residential suburbs.",
    climateRealities: "Buncombe's varied topography creates significant microclimates, from urban heat islands to high-wind exposure on the surrounding peaks."
  },
  {
    slug: "henderson-county",
    name: "Henderson County",
    description: "Providing Hendersonville and the surrounding plateau with high-reliability roofing and residential construction designed for longevity.",
    towns: ["Hendersonville", "Fletcher", "Mills River"],
    metaTitle: "Roofing & Construction in Henderson County, NC | Highlander",
    metaDescription: "Expert roofing and construction for Henderson County, NC. Serving Hendersonville, Fletcher, and Mills River with locally based crews.",
    heroImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2000",
    facts: [
      { label: "Regional Center", value: "Hendersonville" },
      { label: "Service", value: "Dual Division" },
      { label: "Status", value: "Active Local Crew" },
      { label: "Rating", value: "5.0/5 Stars" }
    ],
    housingContext: "Henderson County is characterized by established retirement communities, historic downtown residential districts, and new multi-generational developments.",
    climateRealities: "The Hendersonville plateau experiences significant afternoon thunderhead development and localized hail events that test roof integrity year-round."
  },
  {
    slug: "transylvania-county",
    name: "Transylvania County",
    description: "The 'Land of Waterfalls' demands superior moisture management. We serve Brevard and the high-end private communities of Lake Toxaway.",
    towns: ["Brevard", "Lake Toxaway", "Rosman"],
    metaTitle: "Transylvania County Roofing Roofing & Construction in Transylvania County, NC | Highlander Construction | Highlander",
    metaDescription: "Specialized roofing and construction for Transylvania County, NC. Moisture-resistant systems for Brevard and Lake Toxaway estates.",
    heroImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2000",
    facts: [
      { label: "Climate", value: "High Moisture" },
      { label: "Top Material", value: "Synthetic / Metal" },
      { label: "Focus", value: "Lake Toxaway Estates" },
      { label: "Credentials", value: "Licensed GC" }
    ],
    housingContext: "Transylvania County ranges from high-traffic tourism gateways in Brevard to some of the Southeast's most exclusive private lakefront estates.",
    climateRealities: "As part of the temperate rainforest belt, this county sees extreme annual rainfall that requires engineered drainage and high-performance waterproofing."
  },
  {
    slug: "cherokee-county",
    name: "Cherokee County",
    description: "Serving the westernmost corner of North Carolina with reliable, owner-led roofing and residential home improvements.",
    towns: ["Murphy", "Andrews"],
    metaTitle: "Roofing & Construction in Cherokee County, NC | Highlander",
    metaDescription: "Professional roofing and construction across Cherokee County, NC. Serving Murphy and Andrews with local accountability.",
    heroImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000",
    facts: [
      { label: "Market Hub", value: "Murphy" },
      { label: "Primary Need", value: "Replacement" },
      { label: "Response", value: "Priority Support" },
      { label: "Rating", value: "4.9/5 Stars" }
    ],
    housingContext: "Cherokee County features a blend of traditional residential homes, seasonal cabins, and a growing influx of retirees building custom mountain retreats.",
    climateRealities: "Western humidity and valley wind patterns demand durable materials and high-quality flashing at all structural transitions."
  }
  ,
  {
    slug: "madison-county",
    name: "Madison County",
    description: "Rugged and authentic. We serve Madison County's ridgetop farms and historic riverside towns with specialized roofing and structural construction.",
    towns: ["Marshall", "Mars Hill"],
    metaTitle: "Roofing & Construction in Madison County, NC | Highlander",
    metaDescription: "Professional roofing and construction across Madison County, NC. Serving Marshall and Mars Hill with rugged, reliable mountain service.",
    heroImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000",
    facts: [
      { label: "Dispatch", value: "Madison Hub" },
      { label: "Top Material", value: "Metal Roofing" },
      { label: "Focus", value: "Historic + Ridgetop" },
      { label: "Status", value: "Active Service" }
    ],
    housingContext: "Madison County is known for its historic riverfront home design in Marshall and expansive, high-elevation agricultural and residential ridgetops.",
    climateRealities: "Significant ridgetop wind exposure and winter icing events require commercial-grade flashing and heavy-duty metal roofing systems."
  },
  {
    slug: "clay-county",
    name: "Clay County",
    description: "Serving Hayesville and the Lake Chatuge area with premium roofing and lakefront residential improvements.",
    towns: ["Hayesville"],
    metaTitle: "Roofing & Construction in Clay County, NC | Highlander",
    metaDescription: "Expert roofing and construction for Clay County, NC. Serving Hayesville and Lake Chatuge with durable, high-end mountain systems.",
    heroImage: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=2000",
    facts: [
      { label: "Regional Hub", value: "Hayesville" },
      { label: "Specialty", value: "Lakefront Life" },
      { label: "Response", value: "Priority Support" },
      { label: "Rating", value: "5.0/5 Stars" }
    ],
    housingContext: "Clay County centers on high-end lakefront residences, vacation rentals, and stable rural communities around Hayesville.",
    climateRealities: "Lake-effect humidity and seasonal storms across the Chatuge basin demand moisture-resistant materials and superior ventilation."
  }
];

export const getCountyBySlug = (slug: string) => counties.find(c => c.slug === slug);

