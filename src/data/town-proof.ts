import { projectDetails } from "@/data/projects";

export interface TownStat {
  label: string;
  value: string;
  detail: string;
}

export interface TownJobHighlight {
  title: string;
  summary: string;
  proof: string;
  projectSlug?: string;
  image?: string;
}

export interface TownProofContent {
  stats: TownStat[];
  jobHighlights: TownJobHighlight[];
  faqs: { question: string; answer: string }[];
}

const buildProjectHighlight = (townName: string): TownJobHighlight[] => {
  return projectDetails
    .filter((project) => project.location.toLowerCase().startsWith(townName.toLowerCase()))
    .slice(0, 2)
    .map((project) => ({
      title: project.title,
      summary: project.summary,
      proof: `${project.scope} • ${project.duration} • ${project.highlight}`,
      projectSlug: project.slug,
      image: project.heroImage,
    }));
};

const townProofMap: Record<string, TownProofContent> = {
  "highlands-nc": {
    stats: [
      { label: "Elevation", value: "4,118 ft", detail: "UV, wind, and freeze-thaw exposure" },
      { label: "Rainfall", value: "80+ in", detail: "One of the wettest high-elevation markets we serve" },
      { label: "Project Fit", value: "Estate", detail: "Premium systems for complex roof geometry" },
    ],
    jobHighlights: [
      ...buildProjectHighlight("Highlands"),
      {
        title: "Plateau leak response planning",
        summary: "Highlands homes often need phased work scheduling because steep drives, estate layouts, and sudden weather shifts can slow standard crews.",
        proof: "Daily weather sequencing, custom staging, and high-temp waterproofing details",
        image: "https://images.unsplash.com/photo-1516706562725-aa47c4701923?auto=format&fit=crop&q=80&w=600",
      },
    ].slice(0, 3),
    faqs: [
      {
        question: "What roofing system holds up best at Highlands' 4,118 ft elevation?",
        answer: "For Highlands plateau estates, we recommend Brava synthetic shake or 24-gauge standing seam metal. These systems are engineered for the high UV intensity and extreme wind speeds common inWildcat Cliffs and surrounding clubs.",
      },
      {
        question: "Do Highlands roofs need specialized ice-dam protection?",
        answer: "Yes. Due to the high rain and frequent freeze-thaw cycles on the plateau, we install high-temp ice-and-water shield at eaves and valleys to prevent moisture intrusion from ice damming.",
      },
      {
        question: "Can you manage large additions for seasonal Highlands owners?",
        answer: "Absolutely. We routinely manage luxury master suite and 'mountain room' expansions for remote owners, providing daily photo updates and remote project coordination.",
      },
    ],
  },
  "cashiers-nc": {
    stats: [
      { label: "Elevation", value: "3,486 ft", detail: "Persistent moisture and fast-moving weather" },
      { label: "Rainfall", value: "80+ in", detail: "Heavy annual rainfall drives drainage priorities" },
      { label: "Focus", value: "Waterproofing", detail: "Underlayment and flashing details matter most here" },
    ],
    jobHighlights: [
      {
        title: "Steep-slope moisture management",
        summary: "Cashiers projects demand stronger valley waterproofing, better gutter capacity, and clean ventilation strategy because roofs stay wet longer here than in most WNC towns.",
        proof: "Oversized drainage design, premium underlayment, and ridge-to-eave airflow planning",
        image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&q=80&w=600",
      },
      {
        title: "Estate home reroof planning",
        summary: "Larger Cashiers homes often involve long material runs, gated access, and premium material selections that require tighter preconstruction coordination.",
        proof: "Pre-staged materials, protected landscaping, and site-specific crew sequencing",
      },
      {
        title: "Vacation-home storm readiness",
        summary: "For part-time residents, we prioritize documentation and fast mitigation so damage does not sit unresolved between visits.",
        proof: "Photo-first inspections and insurance-ready storm documentation",
      },
    ],
    faqs: [
      {
        question: "Why do Cashiers roofs face unique moisture failure risks?",
        answer: "With 80+ inches of rain, Cashiers roofs rarely dry out completely. This accelerates algae growth and exposes weak flashing details. We use algae-resistant materials and engineered drainage to combat these Plateau conditions.",
      },
      {
        question: "Is composite decking better for Cashiers' climate?",
        answer: "Yes. Due to the high moisture levels in Jackson County, natural wood decks require constant maintenance. We recommend premium composite systems that resist rot and moisture in rainforest conditions.",
      },
      {
        question: "Do you provide project management for seasonal Cashiers estates?",
        answer: "Yes. Many of our Cashiers clients live out of town. We provide full project coordination, from design/planning to construction, with frequent photo and video updates.",
      },
    ],
  },
  "franklin-nc": {
    stats: [
      { label: "Home Base", value: "Since 2017", detail: "Franklin is our original operating hub" },
      { label: "Dispatch", value: "Fast", detail: "Crews and materials staged locally" },
      { label: "Project Mix", value: "Residential", detail: "Repairs, replacements, and storm recovery" },
    ],
    jobHighlights: [
      {
        title: "Rapid-response repair scheduling",
        summary: "Because Franklin is one of our core operating bases, we can move quickly on leak calls, storm damage inspections, and replacement planning.",
        proof: "Local crews, local staging, and shorter lead times for Macon County homeowners",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600",
      },
      {
        title: "Family-home reroof coordination",
        summary: "Franklin projects often center on budget clarity, financing coordination, and clean execution for full-time residents who need predictability.",
        proof: "Detailed scopes, financing options, and clear daily communication",
      },
      {
        title: "Storm documentation support",
        summary: "When wind and hail roll through Macon County, we document damage in a format homeowners can actually use for claim conversations.",
        proof: "Photo documentation, repair-vs-replace guidance, and insurance support",
      },
    ],
    faqs: [
      {
        question: "Why is Highlander the top-rated roofer in Franklin?",
        answer: "As a Franklin-based family business, we provide the fastest dispatch times and most reliable warranties in Macon County. Our crews live here and build to the standard our neighbors deserve.",
      },
      {
        question: "Do you handle small roof repairs in Franklin?",
        answer: "Yes. From leak detection to minor shingle repairs, we prioritize our hometown clients with fast scheduling and honest, transparent pricing for any size job.",
      },
      {
        question: "Can you help with additions for older Franklin homes?",
        answer: "Absolutely. We specialize in home additions and interior renovations that modernize older Franklin residences while adding structural value for growing families.",
      },
    ],
  },
  "sylva-nc": {
    stats: [
      { label: "Regional Hub", value: "Jackson Co.", detail: "Commercial and residential coverage" },
      { label: "Response", value: "Rapid", detail: "Storm and leak calls prioritized" },
      { label: "Coverage", value: "Mixed Use", detail: "Homes, rentals, and commercial roofs" },
    ],
    jobHighlights: [
      {
        title: "Sylva-area commercial maintenance",
        summary: "Sylva gives us a strategic base for Jackson County commercial service, especially for occupied buildings that need organized maintenance rather than reactive repairs.",
        proof: "Tenant-sensitive scheduling and recurring condition reporting",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600",
      },
      {
        title: "Valley weather repair strategy",
        summary: "Sylva roofs see fast weather shifts from surrounding mountain walls, which makes leak tracing and flashing diagnosis especially important.",
        proof: "Slope-specific inspection routes and targeted waterproofing repairs",
      },
      {
        title: "Insurance-ready storm scopes",
        summary: "For wind and tree damage, we document the roof, related exterior damage, and staging needs clearly before repairs begin.",
        proof: "Photo-backed inspection reports with repair sequencing recommendations",
      },
    ],
    faqs: [
      {
        question: "Do you handle both historic and commercial roofing in Sylva?",
        answer: "Yes. Sylva is our strategic hub for both historic home preservation and Jackson County commercial roof maintenance. We coordinate complex schedules to protect both private residents and active business tenants.",
      },
      {
        question: "Why do Sylva roofs develop more black streaks (algae)?",
        answer: "The Sylva valley traps morning fog and high humidity. We use algae-resistant shingle systems and optimized ventilation to prevent biological growth and keep your home's historic look pristine.",
      },
      {
        question: "Can you help with whole-home renovations in Sylva?",
        answer: "Yes. We specialize in structural modernization, transforming older Jackson County properties into modern living spaces while maintaining their original historic charm and character.",
      },
    ],
  },
  "bryson-city-nc": {
    stats: [
      { label: "Market", value: "Vacation Rentals", detail: "Short-turnaround work matters here" },
      { label: "Weather", value: "Smokies", detail: "Storm exposure and tree cover are common issues" },
      { label: "Priority", value: "Protection", detail: "Fast documentation for remote owners" },
    ],
    jobHighlights: [
      {
        title: "Rental-turnover roof planning",
        summary: "Bryson City owners often need roofing work scheduled around guest occupancy, turnover windows, and limited maintenance access.",
        proof: "Condensed schedules and communication for remote property owners",
        image: "https://images.unsplash.com/photo-1510627489930-0c1b0ba0546c?auto=format&fit=crop&q=80&w=600",
      },
      {
        title: "Tree-impact and branch-damage response",
        summary: "Heavy canopy coverage near the Smokies creates a different damage profile than open ridge homes — more punctures and debris-related leaks.",
        proof: "Swift response with photo documentation and immediate tree-removal coordination",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=600",
      },
      {
        title: "Mountain cabin material matching",
        summary: "Cabins and rental homes in Bryson City often need durable systems that still fit the visual character owners market to guests.",
        proof: "Material recommendations balancing durability, appearance, and upkeep",
      },
    ],
    faqs: [
      {
        question: "How do you handle roof work for vacation rentals in Bryson City?",
        answer: "We coordinate timing around guest turnover windows, ensuring that large-scale work like roof replacement or deck repair doesn't interfere with your rental income. We can also handle site updates for remote owners.",
      },
      {
        question: "Which roofing material is best for Swain County cabins?",
        answer: "Standing seam metal is our top recommendation for Bryson City cabins. It sheds debris and heavy rainfall effectively, resists the high humidity of the Smokies, and provides a 50-year service life.",
      },
      {
        question: "Do you handle deck safety inspections in Bryson City?",
        answer: "Yes. With the high volume of vacation rentals in Swain County, we provide professional deck and porch safety inspections to ensure your structures meet code and are safe for guest usage.",
      },
    ],
  },
  "waynesville-nc": {
    stats: [
      { label: "Elevation", value: "2,800 ft", detail: "Frequent rain, snow, and freeze-thaw cycles" },
      { label: "Housing Mix", value: "Historic + New", detail: "Older homes and newer builds require different scopes" },
      { label: "Proof", value: "Documented", detail: "Full reroof case study from Waynesville" },
    ],
    jobHighlights: [
      ...buildProjectHighlight("Waynesville"),
      {
        title: "Historic-home detailing",
        summary: "Waynesville homes often require careful flashing transitions, decking repairs, and material choices that respect older design themes while improving performance.",
        proof: "Targeted decking repair, ventilation upgrades, and clean tie-ins",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600",
      },
    ].slice(0, 3),
    faqs: [
      {
        question: "How do you handle historic roofing requirements in Waynesville?",
        answer: "We help homeowners select materials and colors that respect the historic district's character while modernizing the ventilation and underlayment systems to meet current mountain weather standards.",
      },
      {
        question: "Why is attic ventilation critical for Waynesville homes?",
        answer: "Waynesville's winter freeze-thaw cycles can cause ice damming on poorly ventilated roofs. We optimize airflow during every project to protect your roof deck and reduce heating costs.",
      },
      {
        question: "Can you manage whole-home additions in Haywood County?",
        answer: "Yes. From design and layouts to final framing, we manage significant home additions and footprint expansions for established Waynesville residential properties.",
      },
    ],
  },
  "cullowhee-nc": {
    stats: [
      { label: "Property Type", value: "Rental Heavy", detail: "Student housing and income properties" },
      { label: "Scheduling", value: "Tight", detail: "Turnarounds matter before lease windows" },
      { label: "Scope", value: "Multi-Unit", detail: "Repairs often need tenant coordination" },
    ],
    jobHighlights: [
      {
        title: "Student-housing roof coordination",
        summary: "Cullowhee property owners often need roof work timed around tenant transitions, occupied units, and academic calendar pressure.",
        proof: "Fast estimating, tenant-aware scheduling, and property manager communication",
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=600",
      },
      {
        title: "Budget-focused repair plans",
        summary: "Rental properties in Cullowhee often need prioritized recommendations — what affects interior lease risk and what can be planned for next summer.",
        proof: "Repair prioritization with clear near-term vs. long-term Jackson County code guidance",
        image: "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=600",
      },
      {
        title: "Multi-building service support",
        summary: "Landlords with multi-building assets near WCU need consistent scope language and predictable inspection windows.",
        proof: "Portfolio-friendly documentation and repeatable, documented inspection standards",
      },
    ],
    faqs: [
      {
        question: "How do you coordinate roof repairs around Cullowhee tenants?",
        answer: "We routinely coordinate with property managers and tenants so repairs or replacements happen with minimal disruption. We provide clear notice windows and prioritize site cleanliness.",
      },
      {
        question: "Do you offer algae-resistant roofing for Cullowhee rentals?",
        answer: "Yes. Due to the high humidity and fog in the Tuckasegee basin, we recommend algae-resistant shingle systems that keep roofs looking clean and performing longer.",
      },
      {
        question: "Can you handle deck code compliance for student housing?",
        answer: "Absolutely. We provide professional deck safety inspections and structural repairs to ensure student housing properties meet Jackson County safety codes.",
      },
    ],
  },
  "dillsboro-nc": {
    stats: [
      { label: "Setting", value: "Historic Village", detail: "Visual fit matters alongside performance" },
      { label: "Approach", value: "Low Profile", detail: "Preservation-sensitive roofing decisions" },
      { label: "Priority", value: "Detail", detail: "Small homes still need precise flashing work" },
    ],
    jobHighlights: [
      {
        title: "Preservation-sensitive reroofing",
        summary: "Dillsboro homes often need roofing choices that protect the structure without making the property feel out of place in a historic mountain village.",
        proof: "Dimensional shingle and detail packages selected for visual compatibility",
        image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=600",
      },
      {
        title: "Small-footprint project execution",
        summary: "Tighter sites and older structures require cleaner staging, lighter touch cleanup, and more attention to trim and transition details.",
        proof: "Controlled staging, careful access planning, and finish-detail focus",
      },
      {
        title: "Storm repair with character retention",
        summary: "When older Dillsboro roofs are damaged, our goal is to restore performance without losing the home's original village aesthetic.",
        proof: "Repair scopes that balance modern protection with historic Jackson County layout character",
        image: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?auto=format&fit=crop&q=80&w=600",
      },
    ],
    faqs: [
      {
        question: "How do you maintain Dillsboro's historic look during a roof project?",
        answer: "We help you choose designer shingles and copper accents that complement Dillsboro's historic mountain cottage style while providing modern waterproofing and ventilation.",
      },
      {
        question: "Are Dillsboro cottages harder to reroof than newer homes?",
        answer: "They require more detail. Older framing and river-proximate moisture mean we often need to address decking integrity and use specialized flashing transitions that newer builds don't require.",
      },
      {
        question: "Can you work on tight village lots in Dillsboro?",
        answer: "Yes. We specialize in 'small-footprint' execution, keeping job sites organized and ensuring our presence doesn't interfere with village tourism or neighboring artisan shops.",
      },
    ],
  },
  "asheville-nc": {
    stats: [
      { label: "Market", value: "Premium", detail: "Historic and modern luxury focus" },
      { label: "Elevation", value: "2,100+ ft", detail: "Ridgetop and valley microclimates" },
      { label: "Project Mix", value: "High-End", detail: "Brava, Metal, and Custom Additions" },
    ],
    jobHighlights: [
      {
        title: "Biltmore Forest historic restoration",
        summary: "Asheville's historic districts require meticulous material matching and ARB coordination. we specialize in modernizing performance without losing historic soul.",
        proof: "Copper flashing details, synthetic slate systems, and historic trim matching",
        image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=600",
      },
      {
        title: "Town Mountain ridgetop roofing",
        summary: "High-wind exposure on Asheville's surrounding ridgetops requires high-velocity rated systems and reinforced perimeter fastening.",
        proof: "Category 4 impact ratings and 130mph wind warranties",
        image: "https://images.unsplash.com/photo-1513584684374-8bdb7489feef?auto=format&fit=crop&q=80&w=600",
      },
      {
        title: "Modern mountain suite addition",
        summary: "Structural footprint expansion for a luxury Asheville residence, integrating a new master suite with existing ridgetop architecture.",
        proof: "Engineered foundation, floor-to-ceiling glass, and seamless roof tie-in",
      },
    ],
    faqs: [
      {
        question: "How do you handle Asheville's historic district requirements?",
        answer: "We are experts in Asheville ARB submissions. We provide detailed material samples, historic color matching, and structural plans that meet Buncombe County's preservation standards.",
      },
      {
        question: "What is the best roof for Asheville's modern mountain homes?",
        answer: "For modern architecture in areas like Town Mountain, we recommend standing seam metal or synthetic slate (Brava). These systems offer clean lines, superior wind resistance, and a 50+ year service life.",
      },
    ],
  },
  "hendersonville-nc": {
    stats: [
      { label: "Focus", value: "Reliability", detail: "Long-term maintenance for established homes" },
      { label: "Elevation", value: "2,152 ft", detail: "Plateau thunderstorms and hail risk" },
      { label: "Credentials", value: "Licensed GC", detail: "Whole-home structural improvements" },
    ],
    jobHighlights: [
      {
        title: "Retirement community roof management",
        summary: "Hendersonville projects often center on longevity, budget predictability, and clean, non-disruptive job site management.",
        proof: "Transparent pricing, extended warranties, and daily site cleanup",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=600",
      },
      {
        title: "Historic downtown residential reroof",
        summary: "Traditional Hendersonville architecture requires careful attention to attic ventilation and chimney flashing to ensure another 30+ years of performance.",
        proof: "Oversized ridge vents and custom step-flashing detailing",
        image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=600",
      },
      {
        title: "Age-in-place exterior modernization",
        summary: "Phased exterior renovation including deck safety upgrades and low-maintenance siding for a long-term Hendersonville resident.",
        proof: "Composite decking, vinyl cedar-shake siding, and accessible ramp integration",
      },
    ],
    faqs: [
      {
        question: "Why should Hendersonville homeowners choose impact-resistant shingles?",
        answer: "The Hendersonville plateau experiences frequent afternoon hail. We recommend Class 4 impact-rated shingles to protect your investment and potentially lower your insurance premiums.",
      },
      {
        question: "Can you help with accessibility renovations in Hendersonville?",
        answer: "Yes. As a licensed GC, we specialize in home additions and renovations that improve accessibility while maintaining your home's aesthetic value.",
      },
    ],
  },
  "brevard-nc": {
    stats: [
      { label: "Rainfall", value: "90+ in", detail: "Extreme moisture management priorities" },
      { label: "Elevation", value: "2,231 ft", detail: "Gateway to high-elevation forest peaks" },
      { label: "Specialty", value: "Moisture-Ready", detail: "Advanced drainage and waterproofing" },
    ],
    jobHighlights: [
      {
        title: "Transylvania County moisture protection",
        summary: "In the Land of Waterfalls, we double-underlay every eave and valley to prevent moisture intrusion during the region's intense tropical deluges.",
        proof: "Double-layered ice-and-water shield and oversized 6-inch gutter systems",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=600",
      },
      {
        title: "Pisgah Forest area cabin reroof",
        summary: "Installation of a high-durability standing seam metal roof for a residence bordering the national forest, designed to shed debris and handle high humidity.",
        proof: "24-gauge steel, debris-resistant valley shields, and lifetime warranty",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600",
      },
      {
        title: "Custom mountain deck expansion",
        summary: "Engineering and construction of a multi-level outdoor living space for a Brevard home, maximizing forest views while ensuring structural moisture resistance.",
        proof: "Pressure-treated framing, composite decking, and integrated lighting",
      },
    ],
    faqs: [
      {
        question: "How do you handle Brevard's record-breaking rainfall?",
        answer: "We specify oversized drainage systems and double-underlayment strategies designed specifically for Transylvania County's moisture profile. We build systems that actually stay dry.",
      },
    ],
  },
  "lake-toxaway-nc": {
    stats: [
      { label: "Setting", value: "Private Lake", detail: "Ultra-high-end estate focus" },
      { label: "Service", value: "White-Glove", detail: "Premium project management for remote owners" },
      { label: "Specialty", value: "Brava", detail: "Certified luxury synthetic installers" },
    ],
    jobHighlights: [
      {
        title: "Lake Toxaway estate reroofing",
        summary: "Toxaway projects require precision, high-end material sourcing, and coordination with community security and architectural boards.",
        proof: "Brava synthetic shake blends, copper accents, and gated-community logistics",
        image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=600",
      },
      {
        title: "Lakefront master suite expansion",
        summary: "Design-build addition for a premier Toxaway estate, providing a new luxury suite with expansive views and high-end exterior finishes.",
        proof: "Structural lake-view engineering, matching stone masonry, and premium trim",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600",
      },
      {
        title: "Premium gutter & drainage system",
        summary: "Installation of oversized copper gutter systems and underground drainage for a large Lake Toxaway residence to manage lake-effect precipitation.",
        proof: "6-inch half-round copper gutters, decorative downspouts, and site-graded drainage",
      },
    ],
    faqs: [
      {
        question: "Do you manage Toxaway estate projects for out-of-town owners?",
        answer: "Yes. Most of our Lake Toxaway clients are remote. We provide a full-service experience including daily photo updates, material logistics, and ARB coordination.",
      },
    ],
  },
  "murphy-nc": {
    stats: [
      { label: "Hub", value: "Cherokee Co.", detail: "Fast response for the far west" },
      { label: "Response", value: "Local", detail: "Crews staged for Western NC service" },
      { label: "Rating", value: "5.0 Stars", detail: "Trusted by Murphy families and rental owners" },
    ],
    jobHighlights: [
      {
        title: "Hiwassee valley residential reroof",
        summary: "Reliable, owner-led roof replacement for Murphy families who need a roofer who answers the phone and stands by the warranty.",
        proof: "CertainTeed dimensional systems and local Madison County crew support",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600",
      },
    ],
    faqs: [
      {
        question: "Is Highlander local to Murphy?",
        answer: "Yes. We have a dedicated crew presence in Western NC, allowing us to offer the most reliable scheduling and warranties in Cherokee County.",
      },
    ],
  },
  "black-mountain-nc": {
    stats: [
      { label: "Elevation", value: "2,405 ft", detail: "High wind and ice loading exposure" },
      { label: "Market", value: "Artisan", detail: "Creative and craftsman-focused community" },
      { label: "Project Mix", value: "Custom", detail: "Timber porches and designer roofing" },
    ],
    jobHighlights: [
      {
        title: "Swannanoa valley deck expansion",
        summary: "Custom timber-frame porch addition designed to integrate with a Black Mountain historic cottage while expanding outdoor living space.",
        proof: "Heavy timber framing, custom railing, and integrated metal roofing",
        image: "https://images.unsplash.com/photo-1516706562725-aa47c4701923?auto=format&fit=crop&q=80&w=600",
      },
    ],
    faqs: [
      {
        question: "Do you handle historic cottage renovations in Black Mountain?",
        answer: "Yes. We specialize in preserving the artisan character of Black Mountain homes while upgrading their structural and thermal performance for modern standards.",
      },
    ],
  },
  "weaverville-nc": {
    stats: [
      { label: "Location", value: "North Buncombe", detail: "Strategically based for rapid service" },
      { label: "Specialty", value: "Ridgetop", detail: "High-wind and UV rated systems" },
      { label: "Rating", value: "4.9 Stars", detail: "Highest rated roofer in North Buncombe" },
    ],
    jobHighlights: [
      {
        title: "Reems Creek ridgetop reroof",
        summary: "Replacement of an aging shingle system with a high-velocity metal roof designed to handle the exposed winds of the Weaverville ridges.",
        proof: "Standing seam metal, reinforced fastening, and lifetime warranty",
        image: "https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&q=80&w=600",
      },
    ],
    faqs: [
      {
        question: "Are your crews local to Weaverville?",
        answer: "Yes. Our Buncombe County crews are based in the region, ensuring fast response times for estimates and projects in North Buncombe and Madison County.",
      },
    ],
  },
  "marshall-nc": {
    stats: [
      { label: "Service", value: "Madison Co.", detail: "The region's most reliable contractor" },
      { label: "Elevation", value: "1,647 ft", detail: "River-valley and ridgetop variables" },
      { label: "Mix", value: "Rugged", detail: "High-performance metal and structural fixes" },
    ],
    jobHighlights: [
      {
        title: "Madison County ridgetop farm roofing",
        summary: "Heavy-duty metal roofing system installed on an exposed Madison County ridgetop to replace a wind-damaged asphalt roof.",
        proof: "24-gauge steel, high-temp underlayment, and ridgetop fastening pattern",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600",
      },
    ],
    faqs: [
      {
        question: "Do you serve all of Madison County?",
        answer: "Yes. From the Marshall riverfront to the ridgetops of Mars Hill and Walnut, we provide the county's most reliable roofing and general contracting services.",
      },
    ],
  },
  "hayesville-nc": {
    stats: [
      { label: "Market", value: "Lake Life", detail: "High-end vacation and retirement homes" },
      { label: "Climate", value: "Humidity", detail: "Lake-proximate moisture management" },
      { label: "Rating", value: "5.0 Stars", detail: "Trusted for lakefront asset protection" },
    ],
    jobHighlights: [
      {
        title: "Lake Chatuge deck and roof modernization",
        summary: "Phased project involving a full roof replacement and a custom composite deck expansion for a premier Hayesville lakefront residence.",
        proof: "Timberline UHDZ shingles and moisture-shield composite decking",
        image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=600",
      },
    ],
    faqs: [
      {
        question: "How do you protect Hayesville lakefront homes from humidity?",
        answer: "We use algae-resistant materials and optimized attic ventilation to prevent moisture build-up and biological growth common to lake-proximate properties.",
      },
    ],
  },
};


export const getTownProofContent = (slug: string): TownProofContent | undefined => townProofMap[slug];