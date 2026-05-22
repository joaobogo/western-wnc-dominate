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
      },
    ].slice(0, 3),
    faqs: [
      {
        question: "What roofing system holds up best at Highlands elevation?",
        answer: "For most Highlands homes, we recommend dimensional shingles with full ice-and-water protection or standing seam metal. The right choice depends on roof pitch, tree cover, wind exposure, and whether the home is occupied year-round.",
      },
      {
        question: "Do Highlands roofs need extra ice-dam protection?",
        answer: "Yes. Highlands sees enough freeze-thaw cycling that eaves, valleys, and penetrations need stronger waterproofing than a standard low-elevation install. We build those details into the scope from day one.",
      },
      {
        question: "Can you coordinate around second-home schedules in Highlands?",
        answer: "Absolutely. Many Highlands clients are seasonal homeowners, so we handle photo updates, remote approvals, and tight scheduling windows to keep projects moving even when the owner is out of town.",
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
        question: "Why do Cashiers roofs fail faster from moisture?",
        answer: "Cashiers gets extreme rainfall and long damp periods, so weak valleys, worn flashing, and poor ventilation show up faster here. Materials alone are not enough — installation detail is what protects the house.",
      },
      {
        question: "Should Cashiers homeowners prioritize gutters with a roof project?",
        answer: "Often, yes. In Cashiers, roof and gutter performance are closely linked. When runoff is not controlled, it can back up at eaves, oversaturate grade lines, and create repeat leak issues.",
      },
      {
        question: "Can you manage premium roofing projects for second homes in Cashiers?",
        answer: "Yes. We regularly work with seasonal homeowners and can manage remote communication, progress photos, and schedule coordination while protecting high-end finishes and landscaping.",
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
      { label: "Response", value: "24hr", detail: "Storm and leak calls prioritized" },
      { label: "Coverage", value: "Mixed Use", detail: "Homes, rentals, and commercial roofs" },
    ],
    jobHighlights: [
      {
        title: "Sylva-area commercial maintenance",
        summary: "Sylva gives us a strategic base for Jackson County commercial service, especially for occupied buildings that need organized maintenance rather than reactive repairs.",
        proof: "Tenant-sensitive scheduling and recurring condition reporting",
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
      },
      {
        title: "Tree-impact and branch-damage response",
        summary: "Heavy canopy coverage near the Smokies creates a different damage profile than open ridge homes — more punctures, gutter failures, and debris-related leaks.",
        proof: "Storm response with photo documentation and mitigation planning",
      },
      {
        title: "Mountain cabin material matching",
        summary: "Cabins and rental homes in Bryson City often need durable systems that still fit the visual character owners market to guests.",
        proof: "Material recommendations balancing durability, appearance, and upkeep",
      },
    ],
    faqs: [
      {
        question: "Can you work on Bryson City vacation rentals between guest stays?",
        answer: "Yes. We frequently coordinate inspections and project timing around turnover windows so owners can protect revenue while still taking care of the roof properly.",
      },
      {
        question: "What roof issues are most common near Bryson City?",
        answer: "We see a lot of storm damage, tree-related impact, wet-debris buildup, and gutter overflow from wooded lots. That combination can shorten roof life if it is not addressed early.",
      },
      {
        question: "Do you provide documentation for out-of-town Bryson City owners?",
        answer: "Absolutely. We can handle photo updates, written findings, and scope summaries so remote owners have what they need to make decisions quickly.",
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
      },
      {
        title: "Budget-focused repair plans",
        summary: "Rental properties in Cullowhee often need phased recommendations — what must be fixed now, what can be planned, and what affects leasing risk.",
        proof: "Repair prioritization with clear near-term vs. long-term scope guidance",
      },
      {
        title: "Multi-building service support",
        summary: "Landlords and managers with more than one property need consistent communication and predictable scope language, not one-off contractor guesswork.",
        proof: "Portfolio-friendly documentation and repeatable inspection standards",
      },
    ],
    faqs: [
      {
        question: "Can you work around tenants in Cullowhee rentals?",
        answer: "Yes. We routinely coordinate with property managers and tenants so repairs or replacements can happen with minimal disruption and clear notice.",
      },
      {
        question: "What roof issues matter most for Cullowhee landlords?",
        answer: "The biggest issues are active leaks, ventilation problems, and deferred maintenance that can quickly turn into interior damage during the school year. We help owners prioritize by urgency and budget.",
      },
      {
        question: "Do you offer fast turnaround estimates for Cullowhee properties?",
        answer: "Yes. Because rental timing matters in Cullowhee, we aim to move quickly on inspections and scopes so owners can make decisions before vacancies close.",
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
        proof: "Architectural shingle and detail packages selected for visual compatibility",
      },
      {
        title: "Small-footprint project execution",
        summary: "Tighter sites and older structures require cleaner staging, lighter touch cleanup, and more attention to trim and transition details.",
        proof: "Controlled staging, careful access planning, and finish-detail focus",
      },
      {
        title: "Storm repair with character retention",
        summary: "When older Dillsboro roofs are damaged, the goal is usually to restore performance without losing the home's original feel.",
        proof: "Repair scopes that balance protection, cost, and architectural character",
      },
    ],
    faqs: [
      {
        question: "Can you keep a Dillsboro home's roof looking appropriate for the village?",
        answer: "Yes. We help homeowners choose materials and details that fit the home's style while still improving waterproofing, ventilation, and durability.",
      },
      {
        question: "Are older Dillsboro homes harder to reroof?",
        answer: "They can be. Older homes often have hidden decking issues, irregular framing, or outdated flashing details that need careful correction during the project.",
      },
      {
        question: "Do you handle small-town projects with the same level of detail as larger towns?",
        answer: "Absolutely. Dillsboro projects may be smaller in scale, but they often require more precision because every visual detail is more noticeable.",
      },
    ],
  },
};

export const getTownProofContent = (slug: string): TownProofContent | undefined => townProofMap[slug];