export type SeoPageType = "home" | "service" | "town" | "blog" | "commercial";

export interface ChecklistGroupItem {
  title: string;
  detail: string;
  priority?: "Required" | "Recommended";
}

export interface KeywordTheme {
  primary: string[];
  secondary: string[];
}

export interface SeoChecklist {
  label: string;
  intro: string;
  objective: string;
  requiredSections: ChecklistGroupItem[];
  schema: ChecklistGroupItem[];
  internalLinks: ChecklistGroupItem[];
  keywords: KeywordTheme;
}

export const seoChecklists: Record<SeoPageType, SeoChecklist> = {
  home: {
    label: "Home",
    intro: "Authority-first overview page that establishes geography, credibility, and primary conversion paths.",
    objective: "Own the broadest regional roofing and construction intent while routing visitors into the right service or town page.",
    requiredSections: [
      { title: "Hero with regional promise", detail: "Lead with Western North Carolina coverage, primary service mix, and a single dominant CTA.", priority: "Required" },
      { title: "Immediate trust strip", detail: "Surface review rating, project count, certifications, response time, or years of combined experience.", priority: "Required" },
      { title: "Dual service pathways", detail: "Split roofing and construction so users can self-select without friction.", priority: "Required" },
      { title: "Featured projects", detail: "Show mountain-specific proof with before/after visuals and named locations.", priority: "Required" },
      { title: "Town authority section", detail: "Link into service areas and reinforce county-by-county relevance.", priority: "Required" },
      { title: "Final lead capture", detail: "End with request inspection or consultation form plus reassurance copy.", priority: "Required" },
    ],
    schema: [
      { title: "LocalBusiness / RoofingContractor", detail: "Include service area, contact info, aggregate rating, and business identity.", priority: "Required" },
      { title: "Organization", detail: "Support brand entity signals with logo and social profiles.", priority: "Required" },
      { title: "WebSite", detail: "Declare site-level entity and search action when applicable.", priority: "Required" },
      { title: "AggregateRating + Review", detail: "Use real review fields and representative reviews only.", priority: "Recommended" },
      { title: "BreadcrumbList", detail: "Home breadcrumb can still be included for consistency across the site.", priority: "Recommended" },
    ],
    internalLinks: [
      { title: "Primary service hubs", detail: "Link to Roofing Division, Construction Division, Roof Repair, Roof Replacement, Storm Damage." },
      { title: "Town cluster", detail: "Link to core towns such as Highlands, Cashiers, Franklin, Sylva, Waynesville, Bryson City." },
      { title: "Proof assets", detail: "Link to Reviews, Gallery, Certifications, Team, and flagship project pages." },
      { title: "Tool paths", detail: "Support early-stage visitors with estimator, roof designer, and planning tools." },
    ],
    keywords: {
      primary: ["roofing western nc", "roofing and construction western north carolina", "roofer western nc"],
      secondary: ["mountain roofing contractor", "storm damage roofing wnc", "home improvement western nc", "roof replacement western north carolina"],
    },
  },
  service: {
    label: "Service",
    intro: "High-intent page focused on one service with local proof, objections, and direct conversion support.",
    objective: "Rank for service + geography intent and convert bottom-funnel users into inspection or estimate requests.",
    requiredSections: [
      { title: "Service-specific hero", detail: "Match the search intent exactly with the service name, geography, and clear outcome.", priority: "Required" },
      { title: "Problem / solution framing", detail: "Show when the service is needed, common warning signs, and why timing matters.", priority: "Required" },
      { title: "Process or scope breakdown", detail: "Explain how the job is evaluated, installed, or repaired in clear steps.", priority: "Required" },
      { title: "Proof block", detail: "Include reviews, project highlights, warranties, and mountain-climate differentiators.", priority: "Required" },
      { title: "FAQs", detail: "Address pricing, timing, materials, insurance, and service-area concerns.", priority: "Required" },
      { title: "Service CTA section", detail: "Use inspection, call, or estimate CTA with urgency support.", priority: "Required" },
    ],
    schema: [
      { title: "Service", detail: "Define the service entity with provider and area served.", priority: "Required" },
      { title: "BreadcrumbList", detail: "Connect Home → Services → specific service.", priority: "Required" },
      { title: "FAQPage", detail: "Apply when visible FAQ content is present on the page.", priority: "Required" },
      { title: "Review / AggregateRating", detail: "Add when the page contains visible review content tied to the business.", priority: "Recommended" },
    ],
    internalLinks: [
      { title: "Parent hub", detail: "Link back to Roofing Division, Construction Division, or Services overview." },
      { title: "Adjacent services", detail: "Cross-link to related pages like repair ↔ replacement, gutters, storm damage, materials." },
      { title: "Town pages", detail: "Link to relevant service-area pages where that service is prominent." },
      { title: "Supporting proof", detail: "Link to matching projects, reviews, certifications, and tools when relevant." },
    ],
    keywords: {
      primary: ["[service] western nc", "[service] near me", "[service] contractor western north carolina"],
      secondary: ["[service] highlands nc", "[service] cashiers nc", "mountain [service] contractor", "emergency [service]"],
    },
  },
  town: {
    label: "Town",
    intro: "Localized authority page that proves the brand understands the town, climate, housing stock, and nearby projects.",
    objective: "Capture town + service searches while reinforcing real regional expertise and cross-linking into service pages.",
    requiredSections: [
      { title: "Town-specific hero", detail: "Name the town, county context, and mountain-specific roofing or construction conditions.", priority: "Required" },
      { title: "Local proof block", detail: "Include stats, job highlights, and unique FAQs for that town.", priority: "Required" },
      { title: "Service relevance", detail: "Explain which services are most common there and why.", priority: "Required" },
      { title: "Neighborhood or terrain cues", detail: "Reference elevation, rainfall, storm exposure, second homes, or steep-slope logistics.", priority: "Required" },
      { title: "Town CTA", detail: "Offer inspection or consultation framed around that area.", priority: "Required" },
    ],
    schema: [
      { title: "Town-scoped LocalBusiness", detail: "Use localized business schema with town name, areaServed, and geo when available.", priority: "Required" },
      { title: "BreadcrumbList", detail: "Connect Home → Service Areas → Town.", priority: "Required" },
      { title: "FAQPage", detail: "Apply when the town page contains visible local FAQs.", priority: "Required" },
    ],
    internalLinks: [
      { title: "Relevant service pages", detail: "Link to roof repair, replacement, storm damage, commercial, or construction pages tied to local demand." },
      { title: "Neighboring towns", detail: "Support geographic clustering and crawl depth with nearby service-area links." },
      { title: "Local proof assets", detail: "Link to projects completed in or near that town whenever possible." },
      { title: "Town-to-county relevance", detail: "Reference county hubs or region-level pages when useful." },
    ],
    keywords: {
      primary: ["roofer in [town] nc", "roof repair [town] nc", "roof replacement [town] nc"],
      secondary: ["storm damage [town] nc", "metal roofing [town] nc", "construction contractor [town] nc", "[town] roofing company"],
    },
  },
  blog: {
    label: "Blog",
    intro: "Informational content designed to win topical authority, answer long-tail queries, and feed internal links into money pages.",
    objective: "Capture research intent and move readers into service or town pages through contextual proof and next-step CTAs.",
    requiredSections: [
      { title: "Clear problem-led opening", detail: "Answer the core question early and mention Western NC context when relevant.", priority: "Required" },
      { title: "Scannable content blocks", detail: "Use tight subheads, lists, examples, and practical takeaways.", priority: "Required" },
      { title: "Expert framing", detail: "Include contractor perspective, field observations, or local climate implications.", priority: "Required" },
      { title: "Inline CTA or next step", detail: "Offer inspection, guide, or related service page without turning the article into a sales page.", priority: "Required" },
      { title: "Related reading", detail: "Support session depth with linked articles, tools, or service pages.", priority: "Recommended" },
    ],
    schema: [
      { title: "Article", detail: "Set headline, description, dates, publisher, and author.", priority: "Required" },
      { title: "BreadcrumbList", detail: "Connect Home → Blog → Article.", priority: "Required" },
      { title: "FAQPage", detail: "Use only when visible Q&A appears near the end of the article.", priority: "Recommended" },
      { title: "HowTo", detail: "Use only for genuine step-by-step procedural content.", priority: "Recommended" },
    ],
    internalLinks: [
      { title: "Money pages", detail: "Link naturally to the relevant service and town pages from high-intent paragraphs." },
      { title: "Related educational content", detail: "Link to adjacent blog posts and free tools to build topical clusters." },
      { title: "Conversion path", detail: "Include one direct path to Request Inspection or consultation where intent supports it." },
    ],
    keywords: {
      primary: ["[topic] western nc", "[topic] roofing guide", "[topic] contractor advice"],
      secondary: ["how to [topic]", "[topic] highlands nc", "[topic] cashiers nc", "storm prep western nc"],
    },
  },
  commercial: {
    label: "Commercial",
    intro: "B2B page built for property managers, HOAs, facility teams, and owners evaluating operational risk and vendor reliability.",
    objective: "Convert commercial and multi-property searches by emphasizing documentation, response systems, and lifecycle value.",
    requiredSections: [
      { title: "Commercial-specific hero", detail: "Name the audience and building types served, not just the roofing system.", priority: "Required" },
      { title: "Operational trust signals", detail: "Show reporting, maintenance plans, insurance coordination, safety, and scheduling discipline.", priority: "Required" },
      { title: "Service scope", detail: "Break down inspections, repairs, replacement, coatings, maintenance, and emergency response.", priority: "Required" },
      { title: "Portfolio or case studies", detail: "Feature property counts, facility types, and outcomes instead of generic testimonials.", priority: "Required" },
      { title: "Commercial FAQs", detail: "Answer warranty, disruption, tenant coordination, budgeting, and phased work questions.", priority: "Required" },
      { title: "Lead form tuned for B2B", detail: "Capture company, portfolio size, timeline, and contact role where possible.", priority: "Required" },
    ],
    schema: [
      { title: "Service", detail: "Model the commercial offering and provider clearly.", priority: "Required" },
      { title: "BreadcrumbList", detail: "Connect Home → Roofing / Services → Commercial page.", priority: "Required" },
      { title: "FAQPage", detail: "Use when the FAQ module is present and visible.", priority: "Required" },
      { title: "Review / AggregateRating", detail: "Add only if commercial review content is actually shown.", priority: "Recommended" },
    ],
    internalLinks: [
      { title: "Commercial subservices", detail: "Link to maintenance, inspections, emergency repair, and replacement pages." },
      { title: "Proof content", detail: "Link to case studies, reviews, certifications, and team or process pages relevant to decision-makers." },
      { title: "Regional pages", detail: "Link to towns and counties where commercial response is strongest." },
    ],
    keywords: {
      primary: ["commercial roofing western nc", "commercial roofer western north carolina", "roof maintenance company western nc"],
      secondary: ["hoa roofing contractor nc", "multifamily roofing western nc", "facility roof repair western nc", "commercial roof inspection wnc"],
    },
  },
};

export const seoPageTypeOrder: SeoPageType[] = ["home", "service", "town", "blog", "commercial"];