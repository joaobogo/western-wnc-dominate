/**
 * SEO MIGRATION MAP — highlandernc.com → new site
 * Generated from full site crawl on 2026-02-23
 * 
 * RULES:
 * - All old URLs get 301 redirects to new equivalents
 * - No orphan URLs — every old page maps to a new page
 * - No redirect chains — single hop only
 * - Preserve keyword intent from title tags and H1s
 */

export interface RedirectEntry {
  oldUrl: string;
  newUrl: string;
  redirectType: 301;
  pageType: "home" | "service" | "commercial" | "town" | "blog" | "other";
  oldTitle: string;
  newTitle: string;
  notes: string;
}

export const urlRedirectMap: RedirectEntry[] = [
  // === HOME ===
  { oldUrl: "/", newUrl: "/", redirectType: 301, pageType: "home", oldTitle: "Expert Local Roofer | Franklin, NC", newTitle: "Highlander Building Services — Franklin & Sylva, NC", notes: "Homepage. Preserved core messaging, expanded CTAs." },

  // === SERVICE PAGES ===
  { oldUrl: "/residential-roofing-services", newUrl: "/services", redirectType: 301, pageType: "service", oldTitle: "Residential Roofing Companies | Highlands, NC", newTitle: "Roofing Services | Highlander Building Services", notes: "Hub page consolidates residential services overview." },
  { oldUrl: "/commercial-roofing-services", newUrl: "/commercial-roofing", redirectType: 301, pageType: "commercial", oldTitle: "Commercial Roofing Solutions | Franklin & Sylva, NC", newTitle: "Commercial Roofing for WNC Properties | Highlander Building Services", notes: "Preserved as dedicated commercial page." },
  { oldUrl: "/commercial-roofing", newUrl: "/commercial-roofing", redirectType: 301, pageType: "commercial", oldTitle: "Commercial Roofing Solutions", newTitle: "Commercial Roofing for WNC Properties", notes: "Direct match, no redirect needed if URL identical." },
  { oldUrl: "/specialized-roofing-services", newUrl: "/services", redirectType: 301, pageType: "service", oldTitle: "Specialized Roofing Contractors | Highlands, NC", newTitle: "Roofing Services | Highlander Building Services", notes: "Consolidated into services hub. Content preserved in individual service pages." },
  { oldUrl: "/specialty-roof-repairs", newUrl: "/services/roof-repair", redirectType: 301, pageType: "service", oldTitle: "Specialty Roof Repairs", newTitle: "Roof Repair in Western NC | Highlander Building Services", notes: "Merged into roof repair service page with expanded content." },
  { oldUrl: "/types-of-roofs-we-install", newUrl: "/services", redirectType: 301, pageType: "service", oldTitle: "Types of Roofs We Install", newTitle: "Roofing Services | Highlander Building Services", notes: "Content distributed across individual service pages (metal, shingle, etc.)." },
  { oldUrl: "/types-of-roofs-we-repair", newUrl: "/services/roof-repair", redirectType: 301, pageType: "service", oldTitle: "Types of Roofs We Repair", newTitle: "Roof Repair in Western NC | Highlander Building Services", notes: "Consolidated into roof repair page." },
  { oldUrl: "/construction-services", newUrl: "/services/construction", redirectType: 301, pageType: "service", oldTitle: "Construction Services", newTitle: "Construction Services | Highlander Building Services", notes: "New dedicated page." },
  { oldUrl: "/outdoor-living-services", newUrl: "/services/outdoor-living", redirectType: 301, pageType: "service", oldTitle: "Outdoor Living Services", newTitle: "Outdoor Living Services | Highlander Building Services", notes: "New dedicated page." },
  { oldUrl: "/gutter-installation", newUrl: "/services/gutters", redirectType: 301, pageType: "service", oldTitle: "Gutter Installation", newTitle: "Gutter Installation & Protection | Highlander Building Services", notes: "Gutters + gutter protection merged into one service page." },
  { oldUrl: "/gutter-protection-installation", newUrl: "/services/gutters", redirectType: 301, pageType: "service", oldTitle: "Gutter Protection Installation", newTitle: "Gutter Installation & Protection | Highlander Building Services", notes: "Merged with gutter installation page." },

  // === TOWN / SERVICE AREA PAGES ===
  // Old site uses /contact/[service]-service-area/[town] pattern (hundreds of pages)
  // New site uses /service-areas/[town] (clean, consolidated)
  { oldUrl: "/contact/roofing-service-area/highlands-nc", newUrl: "/service-areas/highlands-nc", redirectType: 301, pageType: "town", oldTitle: "Roofing in Highlands, NC", newTitle: "Roofing Services in Highlands, NC | Highlander Building Services", notes: "Consolidated all service-specific town pages into one authoritative town page." },
  { oldUrl: "/contact/roofing-service-area/cashiers-nc", newUrl: "/service-areas/cashiers-nc", redirectType: 301, pageType: "town", oldTitle: "Roofing in Cashiers, NC", newTitle: "Roofing Services in Cashiers, NC | Highlander Building Services", notes: "" },
  { oldUrl: "/contact/roofing-service-area/franklin-nc", newUrl: "/service-areas/franklin-nc", redirectType: 301, pageType: "town", oldTitle: "Roofing in Franklin, NC", newTitle: "Roofing Services in Franklin, NC | Highlander Building Services", notes: "" },
  { oldUrl: "/contact/roofing-service-area/sylva-nc", newUrl: "/service-areas/sylva-nc", redirectType: 301, pageType: "town", oldTitle: "Roofing in Sylva, NC", newTitle: "Roofing Services in Sylva, NC | Highlander Building Services", notes: "" },
  { oldUrl: "/contact/roofing-service-area/bryson-city-nc", newUrl: "/service-areas/bryson-city-nc", redirectType: 301, pageType: "town", oldTitle: "Roofing in Bryson City, NC", newTitle: "Roofing Services in Bryson City, NC | Highlander Building Services", notes: "" },
  { oldUrl: "/contact/roofing-service-area/waynesville-nc", newUrl: "/service-areas/waynesville-nc", redirectType: 301, pageType: "town", oldTitle: "Roofing in Waynesville, NC", newTitle: "Roofing Services in Waynesville, NC | Highlander Building Services", notes: "" },
  { oldUrl: "/contact/roofing-service-area/cullowhee-nc", newUrl: "/service-areas/cullowhee-nc", redirectType: 301, pageType: "town", oldTitle: "Roofing in Cullowhee, NC", newTitle: "Roofing Services in Cullowhee, NC | Highlander Building Services", notes: "" },
  { oldUrl: "/contact/roofing-service-area/dillsboro-nc", newUrl: "/service-areas/dillsboro-nc", redirectType: 301, pageType: "town", oldTitle: "Roofing in Dillsboro, NC", newTitle: "Roofing Services in Dillsboro, NC | Highlander Building Services", notes: "" },
  // Gutter service area pages → consolidated town pages
  { oldUrl: "/contact/gutter-installation-service-area/highlands-nc", newUrl: "/service-areas/highlands-nc", redirectType: 301, pageType: "town", oldTitle: "Gutter Installation Highlands, NC", newTitle: "Roofing Services in Highlands, NC", notes: "Gutter-specific town page merged into main town page." },
  { oldUrl: "/contact/gutter-installation-service-area/cashiers-nc", newUrl: "/service-areas/cashiers-nc", redirectType: 301, pageType: "town", oldTitle: "Gutter Installation Cashiers, NC", newTitle: "Roofing Services in Cashiers, NC", notes: "" },
  { oldUrl: "/contact/gutter-installation-service-area/franklin-nc", newUrl: "/service-areas/franklin-nc", redirectType: 301, pageType: "town", oldTitle: "Gutter Installation Franklin, NC", newTitle: "Roofing Services in Franklin, NC", notes: "" },

  // === BLOG POSTS ===
  { oldUrl: "/why-asphalt-shingle-remains-the-most-popular-roofing-material", newUrl: "/blog/why-asphalt-shingle-remains-the-most-popular-roofing-material", redirectType: 301, pageType: "blog", oldTitle: "Why Asphalt Shingle Remains the Most Popular Roofing Material", newTitle: "Why Asphalt Shingle Remains the Most Popular Roofing Material", notes: "Moved to /blog/ prefix. Content preserved." },
  { oldUrl: "/how-a-roof-maintenance-program-can-maximize-the-life-of-your-roof", newUrl: "/blog/how-roof-maintenance-maximizes-roof-life", redirectType: 301, pageType: "blog", oldTitle: "How a Roof Maintenance Program Can Maximize the Life of Your Roof", newTitle: "How Roof Maintenance Maximizes Your Roof's Life", notes: "Slug shortened for cleanliness." },
  { oldUrl: "/why-timely-roofing-repair-is-essential-for-your-home", newUrl: "/blog/why-timely-roofing-repair-is-essential", redirectType: 301, pageType: "blog", oldTitle: "Why Timely Roofing Repair Is Essential for Your Home", newTitle: "Why Timely Roofing Repair Is Essential", notes: "" },
  { oldUrl: "/how-a-roofing-company-can-increase-your-home-s-value", newUrl: "/blog/how-roofing-increases-home-value", redirectType: 301, pageType: "blog", oldTitle: "How a Roofing Company Can Increase Your Home's Value", newTitle: "How a New Roof Increases Your Home's Value", notes: "" },
  { oldUrl: "/the-benefits-of-metal-roof-installation-for-your-home", newUrl: "/blog/benefits-of-metal-roof-installation", redirectType: 301, pageType: "blog", oldTitle: "The Benefits of Metal Roof Installation for Your Home", newTitle: "Benefits of Metal Roof Installation for WNC Homes", notes: "" },

  // === OTHER PAGES ===
  { oldUrl: "/about-us", newUrl: "/about", redirectType: 301, pageType: "other", oldTitle: "About Highlander Building Services", newTitle: "About Highlander Building Services | Protecting Mountain Homes Since 2017", notes: "Shortened URL." },
  { oldUrl: "/contact", newUrl: "/request-inspection", redirectType: 301, pageType: "other", oldTitle: "Contact Us", newTitle: "Request Free Inspection | Highlander Building Services", notes: "Reframed as conversion-focused inspection request." },
  { oldUrl: "/contact-franklin-nc", newUrl: "/request-inspection", redirectType: 301, pageType: "other", oldTitle: "Contact Franklin, NC", newTitle: "Request Free Inspection", notes: "Merged contact pages." },
  { oldUrl: "/request-quote-form-page", newUrl: "/request-inspection", redirectType: 301, pageType: "other", oldTitle: "Request Quote", newTitle: "Request Free Inspection", notes: "Quote → inspection reframe." },
  { oldUrl: "/gallery", newUrl: "/gallery", redirectType: 301, pageType: "other", oldTitle: "Gallery", newTitle: "Project Gallery | Highlander Building Services", notes: "Direct match." },
  { oldUrl: "/reviews", newUrl: "/about", redirectType: 301, pageType: "other", oldTitle: "Reviews", newTitle: "About Highlander Building Services", notes: "Reviews integrated into About page." },
  { oldUrl: "/faqs", newUrl: "/services", redirectType: 301, pageType: "other", oldTitle: "FAQs", newTitle: "Roofing Services", notes: "FAQs distributed to individual service pages." },
  { oldUrl: "/hibu-video-splash", newUrl: "/about", redirectType: 301, pageType: "other", oldTitle: "Video", newTitle: "About Highlander Building Services", notes: "Video content moved to About page." },
  { oldUrl: "/area-projects-map", newUrl: "/service-areas", redirectType: 301, pageType: "other", oldTitle: "Area Projects Map", newTitle: "Service Areas | Highlander Building Services", notes: "Project map replaced with service area hub." },
];

/**
 * CONTENT INVENTORY — Key SEO data from old site
 */
export interface ContentInventoryEntry {
  pageType: string;
  currentUrl: string;
  titleTag: string;
  metaDescription: string;
  h1: string;
  primaryCta: string;
  schemaType: string;
  indexStatus: "indexed" | "noindex" | "unknown";
  wordCount: number;
  notes: string;
}

export const contentInventory: ContentInventoryEntry[] = [
  {
    pageType: "Home",
    currentUrl: "/",
    titleTag: "Expert Local Roofer | Franklin, NC | Highlander Building Services",
    metaDescription: "Highlander Building Services is your trusted partner for all your roofing needs in Franklin, Highlands, Cashiers, Sylva, and surrounding areas.",
    h1: "Expert Local Roofer",
    primaryCta: "Get My Written Estimate",
    schemaType: "LocalBusiness",
    indexStatus: "indexed",
    wordCount: 1200,
    notes: "Core landing page. Has hero form, service cards, FAQs, reviews section. VELUX + CertainTeed badges.",
  },
  {
    pageType: "Service",
    currentUrl: "/residential-roofing-services",
    titleTag: "Residential Roofing Companies | Highlands, NC | Highlander Building Services",
    metaDescription: "Your home deserves the best protection. From asphalt shingles to metal roofing, we offer a wide range of options.",
    h1: "Residential Roofing Companies",
    primaryCta: "Get My Written Estimate",
    schemaType: "Service",
    indexStatus: "indexed",
    wordCount: 800,
    notes: "Lists residential services. Links to sub-pages for each material type.",
  },
  {
    pageType: "Commercial",
    currentUrl: "/commercial-roofing-services",
    titleTag: "Commercial Roofing Solutions | Franklin & Sylva, NC",
    metaDescription: "Commercial roofing services designed to meet the unique needs of businesses in Franklin, Highlands, Cashiers, Sylva.",
    h1: "Commercial Roofing Solutions",
    primaryCta: "Get My Written Estimate",
    schemaType: "Service",
    indexStatus: "indexed",
    wordCount: 600,
    notes: "Thin page. Needs expansion to 800+ words with case studies and maintenance programs.",
  },
  {
    pageType: "Service",
    currentUrl: "/specialized-roofing-services",
    titleTag: "Specialized Roofing Contractors | Highlands, NC",
    metaDescription: "Equipped to handle specialized roofing projects that require unique expertise.",
    h1: "Specialized Roofing Contractors",
    primaryCta: "Get My Written Estimate",
    schemaType: "Service",
    indexStatus: "indexed",
    wordCount: 700,
    notes: "Covers skylight, chimney, ventilation, ice dams. Consolidated into service hub.",
  },
];

/**
 * SEO PRESERVATION CHECKLIST
 */
export const seoChecklist = [
  { item: "All 301 redirects configured", status: "pending", priority: "critical" },
  { item: "No 404 errors from old URLs", status: "pending", priority: "critical" },
  { item: "LocalBusiness schema on homepage", status: "done", priority: "critical" },
  { item: "FAQ schema on service pages", status: "done", priority: "high" },
  { item: "Title tags preserved or improved", status: "done", priority: "critical" },
  { item: "H1 intent preserved on all pages", status: "done", priority: "critical" },
  { item: "Internal linking structure rebuilt", status: "done", priority: "high" },
  { item: "Sitemap.xml generated", status: "pending", priority: "high" },
  { item: "Robots.txt configured", status: "done", priority: "high" },
  { item: "Canonical tags on all pages", status: "pending", priority: "medium" },
  { item: "GA4 tracking installed", status: "pending", priority: "high" },
  { item: "Call tracking configured", status: "pending", priority: "medium" },
  { item: "Mobile responsiveness verified", status: "done", priority: "critical" },
  { item: "Core Web Vitals optimized", status: "done", priority: "high" },
  { item: "All forms tested", status: "pending", priority: "critical" },
  { item: "Phone buttons functional", status: "done", priority: "critical" },
  { item: "Image ALT text with Service + Town + Brand", status: "done", priority: "high" },
  { item: "Blog posts migrated with original publish dates", status: "done", priority: "high" },
  { item: "Old sitemap submitted to Search Console", status: "pending", priority: "high" },
  { item: "New sitemap submitted to Search Console", status: "pending", priority: "high" },
];

/**
 * KEY BRAND ASSETS EXTRACTED FROM OLD SITE
 */
export const brandAssets = {
  companyName: "Highlander Building Services, Inc.",
  tagline: "Expert Local Roofer",
  phone: "(828) 524-7773",
  locations: [
    { name: "Franklin, NC", address: "76 Creative Dr, Franklin, NC 28734" },
    { name: "Sylva, NC", address: "28 Cross Stitch Mountain Road, Sylva, NC 28779" },
  ],
  certifications: [
    "CertainTeed ShingleMaster Credentialed Contractor",
    "VELUX Certified Installer",
    "Licensed NC General Contractor",
    "Fully Insured",
    "5x Best of Macon County Reader's Choice Award",
    "BBB Accredited",
  ],
  keyDifferentiators: [
    "Financing Available",
    "Labor & Material Warranties",
    "Estimates Within a Week",
    "Licensed and Insured",
    "Quick Response Time",
    "40+ Years Combined Experience",
    "Family-Owned Since 2017",
  ],
  serviceCategories: [
    "Commercial Roofing Services",
    "Residential Roofing Services",
    "Specialized Roofing Services",
    "Specialty Roof Repairs",
    "Types of Roofs We Install",
    "Types of Roofs We Repair",
    "Construction Services",
    "Outdoor Living Services",
    "Gutter Installation",
    "Gutter Protection Installation",
  ],
};
