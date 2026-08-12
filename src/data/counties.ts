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
  /** Practical permitting and inspection notes for this county. */
  permitting?: string;
  faqs?: { q: string; a: string }[];
}

export const counties: CountyData[] = [
  {
    slug: "macon-county",
    name: "Macon County",
    description: "Macon County serves as our headquarters and original operating hub. From the high-elevation estates of Highlands to the family residences of Franklin, we provide the region's most reliable roofing and construction services.",
    towns: ["Highlands", "Franklin", "Scaly Mountain", "Otto"],
    metaTitle: "Roofing & Construction in Macon County, NC | Highlander",
    metaDescription: "Professional roofing and home construction across Macon County, NC. Serving Franklin and Highlands with local crews and premium materials since 2017.",
    heroImage: "/media/wnc-town-overlook.jpg",
    facts: [
      { label: "Dispatch", value: "Franklin Hub" },
      { label: "Credentials", value: "Licensed GC" },
      { label: "Rating", value: "4.9/5 Stars" },
      { label: "Coverage", value: "Full County" }
    ],
    housingContext: "Macon County features a unique blend of high-end mountain estates on the plateau and traditional single-family homes and farms in the valley.",
    climateRealities: "Homes here face extreme variables — from 4,000+ ft icing on the Highlands plateau to high-wind channeling in the Franklin valley.",
    permitting: "Macon County permits are issued through the county Building Inspections department in Franklin, with the Town of Highlands handling work inside town limits separately. Roof replacements generally require a permit, and plateau projects in club and gated communities usually add a community design review step. We pull the permit and schedule inspections on every project.",
    faqs: [
      { q: "Do I need a permit to replace a roof in Macon County?", a: "In most cases yes, and we handle it. Permitting differs between unincorporated Macon County and work inside the Town of Highlands limits, so we confirm jurisdiction before scheduling." },
      { q: "How different are Highlands and Franklin projects?", a: "Substantially. Highlands sits above 4,000 feet with ice loading and high UV, while Franklin sits near 2,100 feet in a valley with storm funneling and heavy canopy. Materials and detailing are specified differently for each." },
      { q: "Is Highlander actually based in Macon County?", a: "Yes. Franklin is our home base, which is why most Macon County inspections happen on a same-day or next-day basis." },
    ]
  },
  {
    slug: "jackson-county",
    name: "Jackson County",
    description: "From the temperate rainforest of Cashiers to the historic district of Sylva, we provide Jackson County with specialized mountain-rated roofing and construction.",
    towns: ["Cashiers", "Sylva", "Cullowhee", "Dillsboro", "Lake Glenville", "Sapphire"],
    metaTitle: "Roofing & Construction in Jackson County, NC | Highlander",
    metaDescription: "Expert roofing and construction for Jackson County, NC. Serving Sylva, Cashiers, Cullowhee, and Dillsboro with specialized mountain-rated systems.",
    heroImage: "/media/wnc-town-overlook.jpg",
    facts: [
      { label: "Regional Base", value: "Sylva Hub" },
      { label: "Specialty", value: "Moisture Systems" },
      { label: "Portfolio", value: "Historic + New" },
      { label: "Status", value: "Active Local Crew" }
    ],
    housingContext: "Jackson County property spans from luxury resort communities in Cashiers to historic residential hubs in Sylva and university housing in Cullowhee.",
    climateRealities: "This county contains some of the wettest high-elevation terrain in the US, requiring advanced moisture management and superior drainage engineering.",
    permitting: "Jackson County permits are handled through the county Permitting and Code Enforcement office in Sylva, with steep-slope and stormwater considerations common on plateau and lakefront parcels. Cashiers, Sapphire, and Lake Glenville projects frequently involve community design review in addition to the county permit.",
    faqs: [
      { q: "Who pulls permits for Jackson County work?", a: "We do. County permitting, inspection scheduling, and final sign-off are part of every project we run in Sylva, Cashiers, Cullowhee, Dillsboro, Lake Glenville, and Sapphire." },
      { q: "Why is moisture management such a focus here?", a: "Parts of the Jackson County plateau receive 80-plus inches of rain a year with persistent fog. Drainage capacity, underlayment coverage, and flashing detail matter more here than almost anywhere else in the state." },
      { q: "Do you work on both lakefront and downtown properties?", a: "Yes. The specification changes — lakefront and plateau homes get heavier moisture and wind detailing, downtown Sylva and Dillsboro homes often need preservation-sensitive work." },
    ]
  },
  {
    slug: "swain-county",
    name: "Swain County",
    description: "Serving the gateway to the Smokies. We specialize in vacation rental durability and low-maintenance roofing systems for Bryson City property owners.",
    towns: ["Bryson City", "Cherokee"],
    metaTitle: "Roofing & Construction in Swain County, NC | Highlander",
    metaDescription: "Reliable roofing and construction in Swain County, NC. Specialized services for Bryson City homes and vacation rentals near the Smokies.",
    heroImage: "/media/wnc-town-overlook.jpg",
    facts: [
      { label: "Market Focus", value: "Vacation Rentals" },
      { label: "Top Material", value: "Metal Roofing" },
      { label: "Response", value: "Priority Support" },
      { label: "Rating", value: "5.0/5 Stars" }
    ],
    housingContext: "Swain County is dominated by high-traffic vacation rentals, mountain cabins, and riverside residences that require high-durability, low-maintenance finishes.",
    climateRealities: "High humidity from the Smoky Mountains and sudden afternoon deluges demand superior flashing details and mold-resistant roofing systems.",
    permitting: "Swain County permitting runs through the county inspections office in Bryson City, and work on the Qualla Boundary follows tribal review processes rather than county permitting. We confirm which applies before scoping and handle the coordination either way.",
    faqs: [
      { q: "Do you work on the Qualla Boundary in Cherokee?", a: "Yes. Approvals there follow tribal processes rather than county permitting, and we confirm the correct path before starting." },
      { q: "Why is metal roofing so common in Swain County?", a: "Heavy rain, dense canopy, and high-turnover vacation rentals reward a roof that sheds debris and needs little between-guest maintenance." },
      { q: "Can you schedule around a rental calendar?", a: "Yes. We regularly sequence Bryson City rental work around bookings, including tight shoulder-season windows." },
    ]
  },
  {
    slug: "haywood-county",
    name: "Haywood County",
    description: "Providing precision roofing modernization and structural home additions across Waynesville and Haywood County. We balance historic character with modern performance.",
    towns: ["Waynesville"],
    metaTitle: "Roofing & Construction in Haywood County, NC | Highlander",
    metaDescription: "Professional roofing and construction across Haywood County, NC. Serving Waynesville with expert care for historic and modern properties.",
    heroImage: "/media/wnc-town-overlook.jpg",
    facts: [
      { label: "Specialty", value: "Historic Districts" },
      { label: "Focus", value: "Structural Additions" },
      { label: "Response", value: "Rapid Dispatch" },
      { label: "Service", value: "Dual Division" }
    ],
    housingContext: "Haywood County features established historic districts in Waynesville and significant ridgetop development requiring complex structural engineering.",
    climateRealities: "Waynesville's elevation brings significant winter snow accumulation and regular freeze-thaw cycles that test attic ventilation and roof deck integrity.",
    permitting: "Haywood County permits are issued through the county inspections department in Waynesville, with the town handling work inside its own limits and historic-district properties requiring additional review. Freeze-thaw detailing and ventilation corrections are the two items inspectors see most on re-roofs here.",
    faqs: [
      { q: "Do historic Waynesville homes need special approval?", a: "Properties inside designated historic areas can require additional review on visible exterior changes. We confirm the requirements before finalizing materials." },
      { q: "What is the most common Haywood County roofing problem?", a: "Ventilation. A large share of the homes we open up were never balanced for intake and exhaust, which quietly shortens the life of every covering above it." },
      { q: "Do you handle additions as well as roofing in Haywood County?", a: "Yes. We are a licensed North Carolina general contractor, so additions, remodels, and roofing run under one project lead." },
    ]
  },
  {
    slug: "buncombe-county",
    name: "Buncombe County",
    description: "Serving the vibrant mountain hub of Asheville and its surrounding towns. We specialize in everything from historic district preservation to modern premium roofing systems.",
    towns: ["Asheville"],
    metaTitle: "Roofing & Construction in Buncombe County, NC | Highlander",
    metaDescription: "Professional roofing and construction across Buncombe County, NC. Serving Asheville with premium local service.",
    heroImage: "/media/wnc-town-overlook.jpg",
    facts: [
      { label: "Market Hub", value: "Asheville Region" },
      { label: "Specialty", value: "Historic + Modern" },
      { label: "Credentials", value: "Licensed GC" },
      { label: "Rating", value: "4.9/5 Stars" }
    ],
    housingContext: "Buncombe County features a high-density mix of historic urban estates, modern ridgetop home design, and rapidly growing residential suburbs.",
    climateRealities: "Buncombe's varied topography creates significant microclimates, from urban heat islands to high-wind exposure on the surrounding peaks.",
    permitting: "Buncombe County permits are issued through county Permits and Inspections, with the City of Asheville handling work inside city limits and additional review for local historic districts such as Montford. Scheduling in the Asheville market moves faster when the permit path is confirmed before the contract is signed.",
    faqs: [
      { q: "Does Highlander take Asheville projects?", a: "Yes, within our scheduling capacity. Check our Service Areas page or call for current Asheville availability." },
      { q: "Are historic district projects different?", a: "Yes. Visible exterior changes in Asheville's local historic districts can require review, which adds lead time we plan for up front." },
      { q: "What roofing systems suit Asheville homes?", a: "The stock ranges from historic Montford homes to modern Town Mountain builds, so it varies — standing-seam metal, synthetic composite, and heavy dimensional asphalt all have their place here." },
    ]
  },
  {
    slug: "henderson-county",
    name: "Henderson County",
    description: "Providing Hendersonville and the surrounding plateau with high-reliability roofing and residential construction designed for longevity.",
    towns: ["Hendersonville", "Fletcher", "Mills River"],
    metaTitle: "Roofing & Construction in Henderson County, NC | Highlander",
    metaDescription: "Expert roofing and construction for Henderson County, NC. Serving Hendersonville, Fletcher, and Mills River with locally based crews.",
    heroImage: "/media/wnc-town-overlook.jpg",
    facts: [
      { label: "Regional Center", value: "Hendersonville" },
      { label: "Service", value: "Dual Division" },
      { label: "Status", value: "Active Local Crew" },
      { label: "Rating", value: "5.0/5 Stars" }
    ],
    housingContext: "Henderson County is characterized by established retirement communities, historic downtown residential districts, and new multi-generational developments.",
    climateRealities: "The Hendersonville plateau experiences significant afternoon thunderhead development and localized hail events that test roof integrity year-round.",
    permitting: "Henderson County permits are issued through the county Building Services office in Hendersonville, with municipal permitting inside town limits for Hendersonville, Fletcher, and Mills River. Wind and impact considerations show up regularly in this county's material selection.",
    faqs: [
      { q: "Why do you recommend impact-resistant shingles here?", a: "Henderson County sees enough hail and wind events that Class 4 impact-resistant lines are frequently worth the modest upcharge, and some insurers discount for them." },
      { q: "Do you serve Fletcher and Mills River too?", a: "Yes, both are inside our Henderson County coverage along with Hendersonville." },
      { q: "Can you handle age-in-place exterior work?", a: "Yes — deck safety upgrades, low-maintenance siding, and entry modifications are common requests in this county." },
    ]
  },
  {
    slug: "transylvania-county",
    name: "Transylvania County",
    description: "The 'Land of Waterfalls' demands superior moisture management. We serve Brevard and the surrounding Transylvania County communities.",
    towns: ["Brevard", "Rosman", "Lake Toxaway"],
    metaTitle: "Transylvania County Roofing & Construction | Highlander",
    metaDescription: "Specialized roofing and construction for Transylvania County, NC. Moisture-resistant systems for Brevard and surrounding communities.",
    heroImage: "/media/wnc-town-overlook.jpg",
    facts: [
      { label: "Climate", value: "High Moisture" },
      { label: "Top Material", value: "Synthetic / Metal" },
      { label: "Focus", value: "Premier Estates" },
      { label: "Credentials", value: "Licensed GC" }
    ],
    housingContext: "Transylvania County ranges from high-traffic tourism gateways in Brevard to some of the Southeast's most exclusive private lakefront estates.",
    climateRealities: "As part of the temperate rainforest belt, this county sees extreme annual rainfall that requires engineered drainage and high-performance waterproofing.",
    permitting: "Transylvania County permits are issued through county Building Permitting and Enforcement in Brevard. Given the rainfall totals in this county, stormwater and drainage details draw more scrutiny here than in most of the region — and they deserve it.",
    faqs: [
      { q: "Why is drainage such a big deal in Transylvania County?", a: "This is the Land of Waterfalls for a reason. Gutter sizing, underlayment coverage, and flashing detail are moisture-management decisions first and aesthetic decisions second." },
      { q: "Do you work at Lake Toxaway?", a: "Yes. Lake Toxaway estate properties are inside our regular Transylvania County coverage, including premium metal, synthetic systems, and outdoor living work." },
      { q: "What roofing lasts longest in Brevard?", a: "Standing-seam metal and synthetic composite both perform well against sustained rainfall when the drainage is sized correctly for the roof area." },
    ]
  },
  {
    slug: "cherokee-county",
    name: "Cherokee County",
    description: "Serving the westernmost corner of North Carolina with reliable, team-led roofing and residential home improvements.",
    towns: ["Murphy", "Andrews"],
    metaTitle: "Roofing & Construction in Cherokee County, NC | Highlander",
    metaDescription: "Professional roofing and construction across Cherokee County, NC. Serving Murphy and Andrews with local accountability.",
    heroImage: "/media/wnc-town-overlook.jpg",
    facts: [
      { label: "Market Hub", value: "Murphy" },
      { label: "Primary Need", value: "Replacement" },
      { label: "Response", value: "Priority Support" },
      { label: "Rating", value: "4.9/5 Stars" }
    ],
    housingContext: "Cherokee County features a blend of traditional residential homes, seasonal cabins, and a growing influx of retirees building custom mountain retreats.",
    climateRealities: "Western humidity and valley wind patterns demand durable materials and high-quality flashing at all structural transitions.",
    permitting: "Cherokee County permits are handled through the county building inspections office in Murphy, with municipal permitting for work inside Murphy and Andrews town limits. Lead times here are generally shorter than in the eastern counties, which helps on storm-response work.",
    faqs: [
      { q: "Do you actually service the far western counties?", a: "Yes. Murphy and Andrews are a scheduled part of our route, not an occasional trip." },
      { q: "What work is most common in Cherokee County?", a: "Dimensional shingle replacements, deck and porch repair, siding replacement, and storm-damage mitigation on family homes and vacation properties." },
      { q: "How fast can you respond to storm damage in Murphy?", a: "Active water intrusion gets priority scheduling. Documentation and temporary protection typically happen on the first visit." },
    ]
  }
  ,
  {
    slug: "madison-county",
    name: "Madison County",
    description: "Rugged and authentic. We serve Madison County's ridgetop farms and historic riverside towns with specialized roofing and structural construction.",
    towns: ["Mars Hill"],
    metaTitle: "Roofing & Construction in Madison County, NC | Highlander",
    metaDescription: "Professional roofing and construction across Madison County, NC. Serving Mars Hill with rugged, reliable mountain service.",
    heroImage: "/media/wnc-town-overlook.jpg",
    facts: [
      { label: "Dispatch", value: "Madison Hub" },
      { label: "Top Material", value: "Metal Roofing" },
      { label: "Focus", value: "Historic + Ridgetop" },
      { label: "Status", value: "Active Service" }
    ],
    housingContext: "Madison County is known for its historic riverfront home design and expansive, high-elevation agricultural and residential ridgetops.",
    climateRealities: "Significant ridgetop wind exposure and winter icing events require commercial-grade flashing and heavy-duty metal roofing systems.",
    permitting: "Madison County permits are issued through the county building inspections office in Marshall. Ridgetop parcels frequently raise access and wind-exposure questions that are worth resolving during scoping rather than during installation.",
    faqs: [
      { q: "What makes ridgetop roofing different?", a: "Sustained wind exposure. Fastening schedules, ridge and hip detailing, and edge metal all need to be specified for wind rather than assumed." },
      { q: "Do you serve Mars Hill and the surrounding area?", a: "Yes, Madison County is part of our regular Western North Carolina coverage." },
      { q: "Is metal the right choice for a Madison County farm building?", a: "Often yes — metal handles wind and shedding well, and on outbuildings the cost efficiency is strong." },
    ]
  },
  {
    slug: "clay-county",
    name: "Clay County",
    description: "Serving Hayesville and the Lake Chatuge area with premium roofing and lakefront residential improvements.",
    towns: ["Hayesville"],
    metaTitle: "Roofing & Construction in Clay County, NC | Highlander",
    metaDescription: "Expert roofing and construction for Clay County, NC. Serving Hayesville and Lake Chatuge with durable, high-end mountain systems.",
    heroImage: "/media/wnc-town-overlook.jpg",
    facts: [
      { label: "Regional Hub", value: "Hayesville" },
      { label: "Specialty", value: "Lakefront Life" },
      { label: "Response", value: "Priority Support" },
      { label: "Rating", value: "5.0/5 Stars" }
    ],
    housingContext: "Clay County centers on high-end lakefront residences, vacation rentals, and stable rural communities around Hayesville.",
    climateRealities: "Lake-effect humidity and seasonal storms across the Chatuge basin demand moisture-resistant materials and superior ventilation.",
    permitting: "Clay County permits are issued through the county building inspections office in Hayesville. Lakefront parcels around Chatuge can involve additional setback and shoreline considerations, which we confirm before finalizing scope.",
    faqs: [
      { q: "Do you work on Lake Chatuge properties?", a: "Yes. Lakefront homes around Hayesville are a regular part of our Clay County work, including metal roofing and decking." },
      { q: "What does lakefront exposure change?", a: "Sustained humidity and wind off the water raise the importance of ventilation, corrosion-appropriate fasteners, and decking materials that tolerate moisture." },
      { q: "Are you licensed to do full construction in Clay County?", a: "Yes. We are a licensed North Carolina general contractor and pull county permits for both roofing and construction work." },
    ]
  }
];

export const getCountyBySlug = (slug: string) => counties.find(c => c.slug === slug);

