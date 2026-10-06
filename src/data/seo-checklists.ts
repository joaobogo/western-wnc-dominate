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
      { title: "Immediate trust strip", detail: "Surface only verified proof such as the approved Google rating, license, credentialed-contractor status, showroom presence, or documented project links.", priority: "Required" },
      { title: "Dual service pathways", detail: "Split roofing and construction so users can self-select without friction.", priority: "Required" },
      { title: "Featured projects", detail: "Show mountain-specific proof with before/after visuals and named locations.", priority: "Required" },
      { title: "Town authority section", detail: "Link into service areas and reinforce county-by-county relevance.", priority: "Required" },
      { title: "Final lead capture", detail: "End with the canonical three-field estimate request plus a direct-call alternative and accurate follow-up expectations.", priority: "Required" },
    ],
    schema: [
      { title: "Organization + LocalBusiness identity", detail: "Use the canonical business identity, NAP, service area, locations, and verified credentials. Do not add self-serving aggregateRating markup.", priority: "Required" },
      { title: "Organization", detail: "Support brand entity signals with logo and social profiles.", priority: "Required" },
      { title: "WebSite", detail: "Declare site-level entity and search action when applicable.", priority: "Required" },
      { title: "Visible review proof only", detail: "Show the approved rating and attributable review content in the page UI when useful; do not expect or pursue self-serving Review/AggregateRating rich results.", priority: "Recommended" },
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
      { title: "Proof block", detail: "Use attributable reviews, documented project records, verified credentials, and project-specific warranty language.", priority: "Required" },
      { title: "FAQs", detail: "Address pricing, timing, materials, insurance, and service-area concerns.", priority: "Required" },
      { title: "Service CTA section", detail: "Use a direct call or the canonical three-field estimate request. Urgent language must match actual staffing and availability.", priority: "Required" },
    ],
    schema: [
      { title: "Service", detail: "Define the service entity with provider and area served.", priority: "Required" },
      { title: "BreadcrumbList", detail: "Connect Home → Services → specific service.", priority: "Required" },
      { title: "FAQPage", detail: "Use only when the same FAQ content is visible on-page. Treat it as semantic markup, not as a promise of Google FAQ rich results.", priority: "Recommended" },
      { title: "Review display", detail: "Visible, attributable review proof may be shown in the UI; do not add self-serving Review or AggregateRating markup to service pages.", priority: "Recommended" },
    ],
    internalLinks: [
      { title: "Parent hub", detail: "Link back to Roofing Division, Construction Division, or Services overview." },
      { title: "Adjacent services", detail: "Cross-link to related pages like repair ↔ replacement, gutters, storm damage, materials." },
      { title: "Town pages", detail: "Link to relevant service-area pages where that service is prominent." },
      { title: "Supporting proof", detail: "Link to matching projects, reviews, certifications, and tools when relevant." },
    ],
    keywords: {
      primary: ["[service] western nc", "[service] near me", "[service] contractor western north carolina"],
      secondary: ["[service] highlands nc", "[service] cashiers nc", "mountain [service] contractor", "urgent [service] repair"],
    },
  },
  town: {
    label: "Town",
    intro: "Localized authority page that proves the brand understands the town, climate, housing stock, and nearby projects.",
    objective: "Capture town + service searches while reinforcing real regional expertise and cross-linking into service pages.",
    requiredSections: [
      { title: "Town-specific hero", detail: "Name the town, county context, and mountain-specific roofing or construction conditions.", priority: "Required" },
      { title: "Local proof block", detail: "Use supported local conditions, documented projects with real slugs, and town FAQs that do not invent crews, response times, or completed jobs.", priority: "Required" },
      { title: "Service relevance", detail: "Explain which services are most common there and why.", priority: "Required" },
      { title: "Neighborhood or terrain cues", detail: "Reference elevation, rainfall, storm exposure, second homes, or steep-slope logistics.", priority: "Required" },
      { title: "Town CTA", detail: "Offer inspection or consultation framed around that area.", priority: "Required" },
    ],
    schema: [
      { title: "Town WebPage + Service area", detail: "Keep the real Highlander entity unchanged and describe the town through WebPage/Service areaServed data. Do not create a fake local business entity or address for each town.", priority: "Required" },
      { title: "BreadcrumbList", detail: "Connect Home → Service Areas → Town.", priority: "Required" },
      { title: "FAQPage", detail: "Use only for visible local FAQs and keep answers supported by real service coverage; no rich-result expectation.", priority: "Recommended" },
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
      { title: "FAQPage", detail: "Use only when the same Q&A is visible in the article; treat it as semantic markup rather than a rich-result tactic.", priority: "Recommended" },
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
      { title: "Operational trust signals", detail: "Show only supported reporting, maintenance, safety, scheduling, and contractor-documentation capabilities without promising claim outcomes or response times.", priority: "Required" },
      { title: "Service scope", detail: "Break down assessment, repairs, replacement, coatings, maintenance, and leak/storm support using operationally accurate language.", priority: "Required" },
      { title: "Portfolio or case studies", detail: "Feature property counts, facility types, and outcomes instead of generic testimonials.", priority: "Required" },
      { title: "Commercial FAQs", detail: "Answer warranty, disruption, tenant coordination, budgeting, and phased work questions.", priority: "Required" },
      { title: "Low-friction B2B first contact", detail: "Keep the first conversion step to the shared three-field contact contract; collect company, portfolio, role, and scope during follow-up or a deliberate second step.", priority: "Required" },
    ],
    schema: [
      { title: "Service", detail: "Model the commercial offering and provider clearly.", priority: "Required" },
      { title: "BreadcrumbList", detail: "Connect Home → Roofing / Services → Commercial page.", priority: "Required" },
      { title: "FAQPage", detail: "Use only when the FAQ module is present and visible; no expectation of a commercial FAQ rich result.", priority: "Recommended" },
      { title: "Review display", detail: "Visible commercial review proof can be shown when attributable; do not add self-serving Review/AggregateRating markup.", priority: "Recommended" },
    ],
    internalLinks: [
      { title: "Commercial subservices", detail: "Link to maintenance, inspections, emergency repair, and replacement pages." },
      { title: "Proof content", detail: "Link to case studies, reviews, certifications, and team or process pages relevant to decision-makers." },
      { title: "Regional pages", detail: "Link to towns and counties with supported service coverage or documented project relevance." },
    ],
    keywords: {
      primary: ["commercial roofing western nc", "commercial roofer western north carolina", "roof maintenance company western nc"],
      secondary: ["hoa roofing contractor nc", "multifamily roofing western nc", "facility roof repair western nc", "commercial roof inspection wnc"],
    },
  },
};

export const seoPageTypeOrder: SeoPageType[] = ["home", "service", "town", "blog", "commercial"];