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
        question: "Do you have faster availability in Franklin than other towns?",
        answer: "Usually yes. Franklin is one of our core service hubs, so inspections, smaller repairs, and project starts are often easier to schedule here than in farther satellite markets.",
      },
      {
        question: "What roofing option fits most Franklin homes best?",
        answer: "Dimensional shingles are the most common fit because they balance durability, appearance, and budget well. For homeowners wanting longer lifespan and stronger weather performance, metal is often the next step up.",
      },
      {
        question: "Can you help me decide between repair and replacement in Franklin?",
        answer: "Yes. We inspect the actual failure points, decking condition, roof age, and repair history first. Then we give you a straight answer on whether repair is still a smart spend.",
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
        question: "Do you handle both residential and commercial roofing in Sylva?",
        answer: "Yes. Sylva is one of the towns where we regularly serve both homeowners and commercial properties, which means we can handle everything from leak repairs to maintenance programs and full replacements.",
      },
      {
        question: "Why can roof leaks be harder to diagnose in Sylva?",
        answer: "The surrounding terrain creates variable wind and rain patterns, so water can move in ways that are not obvious from the stain inside. We inspect the full roof system instead of guessing at the nearest shingle.",
      },
      {
        question: "Can you coordinate work around tenants or business hours in Sylva?",
        answer: "Absolutely. We build schedules around occupancy needs and access constraints so residential rentals and commercial properties can stay operational during the work.",
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
        question: "Do older Waynesville homes need extra decking repair during reroofing?",
        answer: "Often, yes. Older homes in Waynesville can hide soft decking, outdated ventilation, or flashing details that need correction once the roof is opened up. We inspect and document those conditions as part of the replacement process.",
      },
      {
        question: "What roofing material fits Waynesville's weather best?",
        answer: "Dimensional shingles work very well for many homes, while metal is a strong fit for owners prioritizing lifespan and snow shedding. The right answer depends on roof pitch, exposure, and budget.",
      },
      {
        question: "Can you match the look of a historic Waynesville home?",
        answer: "Yes. We help homeowners choose profiles and colors that protect the home without making it look out of character with the neighborhood or original design.",
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
};

export const getTownProofContent = (slug: string): TownProofContent | undefined => townProofMap[slug];