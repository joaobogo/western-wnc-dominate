import { PHONE_DISPLAY, REVIEW_RATING } from "@/data/business";
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
        image: "/media/wnc-chimney-flashing.jpg",
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
        image: "/media/wnc-chimney-flashing.jpg",
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
      { label: "Home Base", value: "Franklin", detail: "Primary showroom and original operating base" },
      { label: "Project Mix", value: "Residential", detail: "Repairs, replacements, and storm recovery" },
    ],
    jobHighlights: [
      {
        title: "Rapid-response repair scheduling",
        summary: "Because Franklin is one of our core operating bases, we can move quickly on leak calls, storm damage inspections, and replacement planning.",
        proof: "Franklin showroom contact, written scope, and project-specific scheduling",
        image: "/media/wnc-storm-tree-damage.jpg",
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
        question: "Why do Franklin homeowners choose Highlander?",
        answer: "Highlander is based in Franklin and serves Macon County from its primary showroom. Project timing and applicable warranty terms are confirmed for the specific scope rather than promised generically.",
      },
      {
        question: "Do you handle small roof repairs in Franklin?",
        answer: "Yes. Highlander handles roof repairs in Franklin and provides a project-specific recommendation and written scope based on the condition found.",
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
      { label: "Showroom", value: "Sylva", detail: "Jackson County point of contact" },
      { label: "Coverage", value: "Mixed Use", detail: "Homes, rentals, and commercial roofs" },
    ],
    jobHighlights: [
      {
        title: "Sylva-area commercial maintenance",
        summary: "Sylva gives us a strategic base for Jackson County commercial service, especially for occupied buildings that need organized maintenance rather than reactive repairs.",
        proof: "Tenant-sensitive scheduling and recurring condition reporting",
        image: "/media/wnc-storm-tree-damage.jpg",
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
        image: "/media/wnc-storm-tree-damage.jpg",
      },
      {
        title: "Tree-impact and branch-damage response",
        summary: "Heavy canopy coverage near the Smokies creates a different damage profile than open ridge homes — more punctures and debris-related leaks.",
        proof: "Swift response with photo documentation and immediate tree-removal coordination",
        image: "/media/wnc-storm-tree-damage.jpg",
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
        answer: "Standing seam metal is our top recommendation for Bryson City cabins. It sheds debris and heavy rainfall effectively, resists the high humidity of the Smokies, and offers a long service life suited to mountain conditions.",
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
        image: "/media/wnc-hail-damage-detail.jpg",
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
        image: "/media/wnc-mountain-home-exterior.jpg",
      },
      {
        title: "Budget-focused repair plans",
        summary: "Rental properties in Cullowhee often need prioritized recommendations — what affects interior lease risk and what can be planned for next summer.",
        proof: "Repair prioritization with clear near-term vs. long-term Jackson County code guidance",
        image: "/media/wnc-roof-tearoff-crew.jpg",
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
        image: "/media/wnc-winter-ice-dam.jpg",
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
        image: "/media/wnc-storm-tree-damage.jpg",
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
        summary: "Asheville's historic districts require meticulous material matching and ARB coordination. We specialize in modernizing performance without losing historic soul.",
        proof: "Copper flashing details, synthetic slate systems, and historic trim matching",
        image: "/media/wnc-storm-tree-damage.jpg",
      },
      {
        title: "Town Mountain ridgetop roofing",
        summary: "High-wind exposure on Asheville's surrounding ridgetops requires high-velocity rated systems and reinforced perimeter fastening.",
        proof: "Category 4 impact ratings and 130mph wind warranties",
        image: "/media/wnc-storm-tree-damage.jpg",
      },
      {
        title: "Modern mountain suite addition",
        summary: "Structural footprint expansion for a luxury Asheville residence, integrating a new master suite with existing ridgetop home design.",
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
        answer: "For modern mountain homes in areas like Town Mountain, we recommend standing seam metal or synthetic slate (Brava). These systems offer clean lines, superior wind resistance, and a 50+ year service life.",
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
        image: "/media/wnc-storm-tree-damage.jpg",
      },
      {
        title: "Historic downtown residential reroof",
        summary: "Traditional Hendersonville home design requires careful attention to attic ventilation and chimney flashing to ensure another 30+ years of performance.",
        proof: "Oversized ridge vents and custom step-flashing detailing",
        image: "/media/wnc-construction-framing.jpg",
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
        image: "/media/wnc-rain-drainage.jpg",
      },
      {
        title: "Pisgah Forest area cabin reroof",
        summary: "Installation of a high-durability standing seam metal roof for a residence bordering the national forest, designed to shed debris and handle high humidity.",
        proof: "24-gauge steel, debris-resistant valley shields, and manufacturer warranty",
        image: "/media/wnc-rain-drainage.jpg",
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
  "murphy-nc": {
    stats: [
      { label: "Coverage", value: "Cherokee Co.", detail: "Murphy and surrounding communities" },
      { label: "Service", value: "By Request", detail: "Availability confirmed from current scheduling" },
      { label: "Rating", value: `${REVIEW_RATING} Stars`, detail: "Trusted by Murphy families and rental owners" },
    ],
    jobHighlights: [
      {
        title: "Hiwassee valley residential reroof",
        summary: "Reliable, team-led roof replacement for Murphy families who need a roofer who answers the phone and stands by the warranty.",
        proof: "CertainTeed dimensional systems and local Madison County crew support",
        image: "/media/wnc-construction-framing.jpg",
      },
      {
        title: "Far-west rental property maintenance",
        summary: "Responsive repair and inspection program for a portfolio of Murphy-area vacation rentals, ensuring roofs are guest-ready year-round.",
        proof: "Scheduled inspections, photo-backed reporting, and prioritized repairs",
        image: "/media/wnc-roof-inspection.jpg",
      },
      {
        title: "Structural porch and deck rebuild",
        summary: "Rebuilding a weathered deck for a Murphy residence with modern materials and improved structural integrity for long-term safety.",
        proof: "Reinforced post-to-beam connections, premium decking, and code-compliant railing",
      },
    ],
    faqs: [
      {
        question: "Is Highlander local to Murphy?",
        answer: "Murphy is within Highlander's Western North Carolina service area. Contact the team to confirm current availability and the appropriate scope for your property.",
      },
    ],
  },
  "hayesville-nc": {
    stats: [
      { label: "Market", value: "Lake Life", detail: "High-end vacation and retirement homes" },
      { label: "Climate", value: "Humidity", detail: "Lake-proximate moisture management" },
      { label: "Rating", value: `${REVIEW_RATING} Stars`, detail: "Trusted for lakefront asset protection" },
    ],
    jobHighlights: [
      {
        title: "Lake Chatuge deck and roof modernization",
        summary: "Phased project involving a full roof replacement and a custom composite deck expansion for a premier Hayesville lakefront residence.",
        proof: "Timberline UHDZ shingles and moisture-shield composite decking",
        image: "/media/wnc-roof-inspection.jpg",
      },
      {
        title: "Lakefront outdoor kitchen addition",
        summary: "Design and construction of an outdoor entertaining area for a Lake Chatuge home, including custom stone work and integrated grill station.",
        proof: "Natural stone masonry, weather-proof cabinetry, and timber-frame roofing",
        image: "/media/wnc-roof-inspection.jpg",
      },
      {
        title: "Clay County storm damage mitigation",
        summary: "Storm-related roof replacement scenario for a Hayesville-area residence following high-wind damage near Lake Chatuge.",
        proof: "Temporary protection when appropriate, contractor documentation, and project-specific roofing scope",
      },
    ],
    faqs: [
      {
        question: "How do you protect Hayesville lakefront homes from humidity?",
        answer: "We use algae-resistant materials and optimized attic ventilation to prevent moisture build-up and biological growth common to lake-proximate properties.",
      },
    ],
  },
  "scaly-mountain-nc": {
    stats: [
      { label: "Elevation", value: "3,700 ft", detail: "Real wind, ice loading, and freeze-thaw exposure" },
      { label: "Corridor", value: "NC-106", detail: "Between our Franklin base and Highlands" },
      { label: "Focus", value: "Metal roofing", detail: "Standing seam sized for ridge exposure" },
    ],
    jobHighlights: [
      {
        title: "Ridge cabin metal roof replacement",
        summary: "Standing-seam metal roof replacement on a Scaly Mountain ridge cabin, with upgraded ice-and-water shield at eaves and valleys.",
        proof: "24-gauge standing seam, high-temp underlayment, and reinforced fastening for wind exposure",
      },
      {
        title: "Storm-response tarping and repair",
        summary: "Rapid tarping and follow-on repair for a Scaly Mountain full-time residence after a wind event stripped ridge caps and lifted flashing.",
        proof: "Same-week tarp, documented scope, and precise repair rather than an oversell",
      },
    ],
    faqs: [
      {
        question: "Do you actually service Scaly Mountain, or just Highlands and Franklin?",
        answer: "Yes, we service Scaly Mountain directly. NC-106 runs from our Franklin base up through Scaly to Highlands, so it's on our regular route rather than a detour.",
      },
      {
        question: "What roofing systems hold up best at Scaly Mountain elevation?",
        answer: "Standing-seam metal and premium synthetic shake systems tend to perform best at Scaly Mountain elevation. We size flashing, fastening, and underlayment for high wind and freeze-thaw exposure.",
      },
      {
        question: "Do you handle emergency roof repair on the ridge?",
        answer: `Yes. For active leaks or storm damage on Scaly Mountain, call ${PHONE_DISPLAY} during business hours and we'll schedule the fastest inspection we can arrange, weather permitting.`,
      },
    ],
  },
  "otto-nc": {
    stats: [
      { label: "Base", value: "Franklin", detail: "Otto sits just south of our home office" },
      { label: "Corridor", value: "US-441", detail: "Little Tennessee valley homes and farms" },
      { label: "Focus", value: "Repair & replacement", detail: "Family-home roofing and additions" },
    ],
    jobHighlights: [
      {
        title: "Otto valley roof replacement",
        summary: "Dimensional shingle roof replacement on an Otto valley home, including ventilation correction and gutter capacity upgrade.",
        proof: "CertainTeed dimensional shingles, ridge-vent airflow, and oversized 6-inch gutters",
      },
      {
        title: "Garage and mudroom addition",
        summary: "Design-then-build addition for an Otto family home — attached garage with a mudroom entry sized to real WNC use.",
        proof: "In-house design, licensed GC oversight, and integrated exterior finish",
      },
    ],
    faqs: [
      {
        question: "Is Otto inside Highlander's normal service area?",
        answer: "Yes. Otto is in Highlander's Macon County service area and is served from the Franklin showroom. Project scheduling is confirmed for the specific scope and current workload.",
      },
      {
        question: "Do you handle both roof repair and full replacement in Otto?",
        answer: "Yes. We diagnose first — if a targeted repair will protect the home, that's what we recommend. If the underlayment or deck is compromised, we walk through replacement options with real scope.",
      },
      {
        question: "Can Highlander design and build an addition on my Otto home?",
        answer: "Yes. Highlander is a licensed North Carolina General Contractor and handles in-house design work — floor plans, elevations, and material planning that carry straight into the build.",
      },
    ],
  },
  "lake-glenville-nc": {
    stats: [
      { label: "Elevation", value: "3,494 ft", detail: "Highest major lake east of the Mississippi" },
      { label: "Rainfall", value: "70+ in", detail: "Plateau moisture drives every roof decision" },
      { label: "Focus", value: "Lakefront", detail: "Steep-lot access and premium finishes" },
    ],
    jobHighlights: [
      {
        title: "Lakefront standing-seam replacement",
        summary: "Full standing-seam metal roof replacement on a Lake Glenville home, with upgraded valley waterproofing and gutter capacity sized to Plateau rainfall.",
        proof: "24-gauge standing seam, oversized gutters and downspouts, and high-temp underlayment",
      },
      {
        title: "Deck rebuild and screened porch addition",
        summary: "Steep-lot deck rebuild plus a new screened porch for a Lake Glenville second home, coordinated around summer occupancy.",
        proof: "Composite decking, engineered structural framing, and sequenced scheduling around owner use",
      },
    ],
    faqs: [
      {
        question: "Do you serve both Lake Glenville and Glenville, NC?",
        answer: "Yes — Lake Glenville and Glenville refer to the same community. Our Jackson County work covers the entire Lake Glenville / Highway 107 corridor.",
      },
      {
        question: "What roofing systems do you recommend for Lake Glenville lakefront homes?",
        answer: "For most lakefront properties we recommend standing-seam metal or premium synthetic systems, with oversized gutters and high-temperature underlayment sized to Plateau rainfall and ice loading.",
      },
      {
        question: "Can Highlander handle design and construction for a Lake Glenville project?",
        answer: "Yes. We handle in-house design services, home additions, screened porches, and outdoor living work under our construction division — coordinated with our roofing crews when the project touches both.",
      },
    ],
  },
  "lake-toxaway-nc": {
    stats: [
      { label: "Lake", value: "Largest private", detail: "Largest private lake in North Carolina" },
      { label: "Market", value: "Estate", detail: "Established Transylvania County estates" },
      { label: "Focus", value: "Design + build", detail: "In-house design services on premium builds" },
    ],
    jobHighlights: [
      {
        title: "Estate roof replacement with premium synthetic",
        summary: "Full roof replacement using a premium synthetic system on a Lake Toxaway estate, with copper flashing details and oversized gutter capacity.",
        proof: "Premium synthetic panels, copper flashing details, and oversized gutter systems",
      },
      {
        title: "Screened porch and outdoor kitchen addition",
        summary: "Screened porch and outdoor kitchen addition for a Lake Toxaway lake home, designed and built in-house with landscape protection throughout.",
        proof: "In-house design, licensed GC oversight, and full jobsite protection of drives and landscaping",
      },
    ],
    faqs: [
      {
        question: "Does Highlander regularly work at Lake Toxaway?",
        answer: "Yes. Lake Toxaway is within our Transylvania County service area, and we specify projects to match the elevation, rainfall, and estate-grade standards owners expect.",
      },
      {
        question: "Do you handle in-house design for Lake Toxaway estates?",
        answer: "Yes. Highlander's construction division includes in-house design services — floor plans, elevations, and material planning that flow straight into the build under licensed GC oversight.",
      },
      {
        question: "How do you protect landscaping and driveways on Lake Toxaway jobsites?",
        answer: "We stage materials, protect driveways, and coordinate crew access around the property's landscape and pool areas. On-site protection is a standard line item on every Lake Toxaway estimate, not an afterthought.",
      },
    ],
  },
  "sapphire-nc": {
    stats: [
      { label: "Elevation", value: "3,376 ft", detail: "Plateau-edge exposure and rainfall" },
      { label: "Setting", value: "Resort", detail: "Sapphire Valley and Plateau ridges" },
      { label: "Focus", value: "Moisture management", detail: "Gutters, ventilation, and flashing detail" },
    ],
    jobHighlights: [
      {
        title: "Resort-community roof replacement",
        summary: "Standing-seam metal roof replacement on a Sapphire Valley home, with oversized gutter capacity and premium ice-and-water shield at valleys.",
        proof: "Standing-seam metal, oversized gutters, and high-temp underlayment",
      },
      {
        title: "Skylight replacement and flashing rebuild",
        summary: "Skylight replacement and full curb-flashing rebuild for a Plateau home experiencing recurring leaks around aging skylight units.",
        proof: "New skylight units, factory curb kits, and integrated flashing to the surrounding roof plane",
      },
    ],
    faqs: [
      {
        question: "How is Sapphire different from Highlands or Cashiers for roofing?",
        answer: "Sapphire sits at Plateau elevation with Plateau rainfall — very similar exposure to Highlands and Cashiers. We specify the same premium underlayment, flashing, and gutter capacity we use across the Plateau.",
      },
      {
        question: "Can Highlander replace and re-flash skylights in Sapphire?",
        answer: "Yes. We regularly replace skylights and rebuild their flashing on Plateau homes where aging units are the leak source rather than the surrounding roof.",
      },
      {
        question: "Do you handle outdoor living projects in Sapphire?",
        answer: "Yes. Our construction division designs and builds screened porches, decks, and outdoor kitchens across the Sapphire and Cashiers area under our licensed GC.",
      },
    ],
  },
  "cherokee-nc": {
    stats: [
      { label: "Setting", value: "River valley", detail: "Oconaluftee moisture and biological growth" },
      { label: "Corridor", value: "US-19", detail: "Qualla Boundary and Swain County" },
      { label: "Focus", value: "Roofing + gutters", detail: "River-valley water management" },
    ],
    jobHighlights: [
      {
        title: "Roof replacement with algae-resistant system",
        summary: "Full roof replacement using an algae-resistant asphalt system on a Cherokee-area home experiencing biological growth on the north-facing planes.",
        proof: "Algae-resistant dimensional shingles, ridge-vent airflow correction, and gutter cleaning",
      },
      {
        title: "Gutter replacement and downspout re-routing",
        summary: "Seamless gutter replacement and downspout re-routing on a Cherokee-area home to move water clear of foundation and hardscape.",
        proof: "6-inch seamless aluminum gutters, oversized downspouts, and re-routed discharge",
      },
    ],
    faqs: [
      {
        question: "Do you serve the Qualla Boundary and Cherokee, NC?",
        answer: "Yes. Our Swain County service area covers Cherokee, the Qualla Boundary, and the surrounding Oconaluftee corridor for both roofing and exterior construction.",
      },
      {
        question: "What causes moss and algae on Cherokee-area roofs?",
        answer: "River-valley humidity, tree cover, and north-facing exposure are the usual causes. We use algae-resistant materials and correct attic ventilation to slow future growth.",
      },
      {
        question: "Can Highlander help with rental property roofing in Cherokee?",
        answer: "Yes. We work with short-term-rental owners on repair and replacement projects that fit around booking calendars, with clear scoping and documentation for the property record.",
      },
    ],
  },
};


export const getTownProofContent = (slug: string): TownProofContent | undefined => townProofMap[slug];