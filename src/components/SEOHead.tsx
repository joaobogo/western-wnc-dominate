import { BUSINESS, FRANKLIN, SYLVA, BusinessLocation } from "@/data/business";
import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
  keywords?: string;
  locale?: string;
}

const SITE_NAME = BUSINESS.brandName;
const BRAND_SUFFIX = "Highlander"; // short suffix to keep titles ≤60 chars
const BASE_URL = "https://highlandernc.com";
const FAVICON_VERSION = "2";
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`;
const DEFAULT_IMAGE_WIDTH = "1200";
const DEFAULT_IMAGE_HEIGHT = "630";
const TWITTER_HANDLE = "@highlanderroof";
const DEFAULT_KEYWORDS =
  "Highlander Building Services, Highlander Building Services, roofing company Western NC, roofing contractor Western NC, roofing services Western North Carolina, roofing company Franklin NC, roofing contractor near Franklin NC, roofing contractor near Highlands NC, roofing contractor near Cashiers NC, roof repair Western NC, roof replacement Western NC, metal roofing Western NC, roofing and construction Western NC, construction and roofing company Western NC, roofing Sylva NC, storm damage roof WNC, mountain home construction, home additions WNC";

const setMeta = (attr: string, key: string, content: string) => {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

/**
 * Canonical path normalizer.
 *
 * Every route must emit a self-referencing canonical in exactly one shape, so
 * crawlers never see two URLs for the same page:
 *  - always absolute against https://highlandernc.com
 *  - query strings and hashes dropped (gclid, utm_*, fbclid, ?page=... etc.)
 *  - no trailing slash, except the homepage which is always "/"
 *  - lowercase path, duplicate slashes collapsed
 */
export const normalizeCanonicalPath = (rawPath: string): string => {
  let path = (rawPath || "/").trim();

  // Accept a full URL or a bare path.
  if (/^https?:\/\//i.test(path)) {
    try {
      path = new URL(path).pathname;
    } catch {
      path = "/";
    }
  }

  // Drop query string and fragment — they never belong in a canonical.
  path = path.split("#")[0].split("?")[0];

  if (!path.startsWith("/")) path = `/${path}`;
  path = path.replace(/\/{2,}/g, "/").toLowerCase();
  if (path.length > 1) path = path.replace(/\/+$/, "");

  return path || "/";
};

export const canonicalUrlFor = (rawPath: string): string => {
  const path = normalizeCanonicalPath(rawPath);
  return path === "/" ? `${BASE_URL}/` : `${BASE_URL}${path}`;
};

const SEOHead = ({
  title,
  description,
  path,
  type = "website",
  image,
  jsonLd,
  noindex = false,
  keywords,
  locale = "en_US",
}: SEOHeadProps) => {
  const fullTitle = title.includes("Highlander") ? title : `${title} | ${BRAND_SUFFIX}`;
  const canonicalPath = normalizeCanonicalPath(path);
  const canonicalUrl = canonicalUrlFor(path);
  const ogImage = image || DEFAULT_IMAGE;

  useEffect(() => {
    document.title = fullTitle;
    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex,nofollow" : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1");
    setMeta("name", "keywords", keywords || DEFAULT_KEYWORDS);
    setMeta("name", "author", SITE_NAME);
    setMeta("name", "publisher", SITE_NAME);
    setMeta("name", "theme-color", "#1a4d2e");
    // Geo tags for local SEO
    setMeta("name", "geo.region", "US-NC");
    setMeta("name", "geo.placename", "Franklin, North Carolina");
    setMeta("name", "geo.position", "35.1821;-83.3807");
    setMeta("name", "ICBM", "35.1821, -83.3807");

    // Exactly one canonical element may exist — drop any extras the static
    // head or a previous route left behind, then self-reference this route.
    const canonicalLinks = Array.from(
      document.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]'),
    );
    canonicalLinks.slice(1).forEach((extra) => extra.remove());
    let link = canonicalLinks[0] ?? null;
    if (!link) { link = document.createElement("link"); link.setAttribute("rel", "canonical"); document.head.appendChild(link); }
    link.setAttribute("href", canonicalUrl);

    setMeta("property", "og:type", type);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "og:image:alt", fullTitle);
    setMeta("property", "og:locale", locale);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:site", TWITTER_HANDLE);
    setMeta("name", "twitter:creator", TWITTER_HANDLE);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);
    setMeta("name", "twitter:image:alt", fullTitle);

    const existingLd = document.querySelector('script[data-seo-ld]');
    if (existingLd) existingLd.remove();
    // Sitewide schema floor: every indexable route carries the LocalBusiness
    // entity and a BreadcrumbList, on top of whatever the page supplies.
    const nodes: Record<string, unknown>[] = jsonLd
      ? (Array.isArray(jsonLd) ? [...jsonLd] : [jsonLd])
      : [];
    const serialized = JSON.stringify(nodes);
    // A node counts as the business entity only when it *is* one — a mere
    // `provider: { "@id": ...#business }` reference (as Service schema emits)
    // must still pull in the full LocalBusiness/RoofingContractor node.
    const hasBusinessNode = nodes.some((n) => {
      const t = (n as { "@type"?: string | string[] })["@type"];
      const types = Array.isArray(t) ? t : t ? [t] : [];
      return types.some((x) => x === "LocalBusiness" || x === "RoofingContractor");
    });
    if (!noindex && !hasBusinessNode) {
      nodes.push(localBusinessSchema());
    }
    if (!noindex && !serialized.includes("BreadcrumbList") && canonicalPath !== "/") {
      const segments = canonicalPath.split("/").filter(Boolean);
      const trail = [{ name: "Home", url: "/" }];
      segments.forEach((segment, i) => {
        trail.push({
          name: segment
            .replace(/-nc$/, " NC")
            .split("-")
            .map((w) => (w.length > 2 ? w[0].toUpperCase() + w.slice(1) : w.toUpperCase()))
            .join(" "),
          url: `/${segments.slice(0, i + 1).join("/")}`,
        });
      });
      nodes.push(breadcrumbSchema(trail) as Record<string, unknown>);
    }
    if (nodes.length) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-ld", "true");
      script.textContent = JSON.stringify(nodes.length === 1 ? nodes[0] : nodes);
      document.head.appendChild(script);
    }
    return () => { const ld = document.querySelector('script[data-seo-ld]'); if (ld) ld.remove(); };
  }, [fullTitle, description, canonicalUrl, canonicalPath, type, ogImage, noindex, jsonLd, keywords, locale]);

  return null;
};

export default SEOHead;

/**
 * Head handling for internal, non-indexable routes (admin, diagnostics, OAuth).
 * Gives each one a unique title/description and a noindex directive without
 * requiring the component to have a single JSX return.
 */
export const useInternalPageHead = (title: string, description: string, path: string) => {
  useEffect(() => {
    const fullTitle = title.includes("Highlander") ? title : `${title} | ${BRAND_SUFFIX}`;
    document.title = fullTitle;
    setMeta("name", "description", description);
    setMeta("name", "robots", "noindex,nofollow");

    const canonicalLinks = Array.from(
      document.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]'),
    );
    canonicalLinks.slice(1).forEach((extra) => extra.remove());
    const link = canonicalLinks[0];
    if (link) link.setAttribute("href", canonicalUrlFor(path));
  }, [title, description, path]);
};

/** Cities in the service footprint — emitted as schema.org City nodes. */
const SERVED_CITIES: { name: string; region: string }[] = [
  { name: "Franklin", region: "NC" },
  { name: "Sylva", region: "NC" },
  { name: "Highlands", region: "NC" },
  { name: "Cashiers", region: "NC" },
  { name: "Sapphire", region: "NC" },
  { name: "Glenville", region: "NC" },
  { name: "Lake Toxaway", region: "NC" },
  { name: "Cullowhee", region: "NC" },
  { name: "Dillsboro", region: "NC" },
  { name: "Bryson City", region: "NC" },
  { name: "Cherokee", region: "NC" },
  { name: "Whittier", region: "NC" },
  { name: "Scaly Mountain", region: "NC" },
  { name: "Otto", region: "NC" },
  { name: "Waynesville", region: "NC" },
  { name: "Sky Valley", region: "GA" },
  { name: "Clayton", region: "GA" },
];

/** Monday–Friday, 8:00–17:00 for every location. */
const BUSINESS_HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "17:00",
  },
];

/** Verified public profiles used for sameAs on the business + organization nodes. */
const FRANKLIN_GBP = "https://www.google.com/maps?cid=1442261483869937048";
const SYLVA_GBP = "https://www.google.com/maps?cid=1690022713833215904";
const PROFILE_URLS = [
  FRANKLIN_GBP,
  SYLVA_GBP,
  "https://www.facebook.com/highlanderroof",
  "https://www.bbb.org/us/nc/franklin/profile/roofing-contractors/highlander-roofing-services-inc-0473-815019",
  "https://business.cashiersareachamber.com/member-directory/Details/highlander-roofing-services-3458221",
  "https://www.linkedin.com/company/highlander-roofing-services-inc/",
  "https://www.instagram.com/highlanderroofingservices/",
];

/** Franklin showroom — physical location node. */
export const franklinLocationSchema = () => ({
  "@type": "LocalBusiness",
  "@id": `${BASE_URL}/#franklin-showroom`,
  name: `${SITE_NAME} — Franklin Showroom`,
  url: BASE_URL,
  image: DEFAULT_IMAGE,
  telephone: `${BUSINESS.primaryPhoneE164}`,
  parentOrganization: { "@id": `${BASE_URL}/#organization` },
  address: {
    "@type": "PostalAddress",
    streetAddress: `${FRANKLIN_STREET}`,
    addressLocality: "Franklin",
    addressRegion: "NC",
    postalCode: "28734",
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: 35.1821, longitude: -83.3807 },
  openingHoursSpecification: BUSINESS_HOURS,
  sameAs: [FRANKLIN_GBP],
});

/** Sylva showroom — physical location node. */
export const sylvaLocationSchema = () => ({
  "@type": "LocalBusiness",
  "@id": `${BASE_URL}/#sylva-showroom`,
  name: `${SITE_NAME} — Sylva Showroom`,
  url: BASE_URL,
  image: DEFAULT_IMAGE,
  telephone: `${SYLVA.phoneE164}`,
  parentOrganization: { "@id": `${BASE_URL}/#organization` },
  address: {
    "@type": "PostalAddress",
    streetAddress: `${SYLVA.streetAddress}`,
    addressLocality: "Sylva",
    addressRegion: "NC",
    postalCode: "28779",
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: 35.3585, longitude: -83.1812 },
  openingHoursSpecification: BUSINESS_HOURS,
  sameAs: [SYLVA_GBP],
});

export const localBusinessSchema = (overrides?: Record<string, unknown>) => ({
  "@context": "https://schema.org",
  "@type": ["RoofingContractor", "GeneralContractor", "HomeAndConstructionBusiness", "LocalBusiness"],
  "@id": `${BASE_URL}/#business`,
  name: SITE_NAME,
  legalName: "Highlander Building Services, Inc.",
  alternateName: "Highlander Roofing Services",
  url: BASE_URL,
  logo: DEFAULT_IMAGE,
  image: DEFAULT_IMAGE,
  telephone: `${BUSINESS.primaryPhoneE164}`,
  email: "info@highlandernc.com",
  description:
    "Premium roofing and construction company serving Western North Carolina mountain communities since 2017. Specializing in storm-resistant roofing, metal roofing, home additions, renovations, and outdoor living for elevation-rated homes.",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${FRANKLIN_STREET}`,
    addressLocality: "Franklin",
    addressRegion: "NC",
    postalCode: "28734",
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: 35.1821, longitude: -83.3807 },
  areaServed: SERVED_CITIES.map((c) => ({
    "@type": "City",
    name: c.name,
    address: { "@type": "PostalAddress", addressLocality: c.name, addressRegion: c.region, addressCountry: "US" },
  })),
  openingHoursSpecification: BUSINESS_HOURS,
  department: [franklinLocationSchema(), sylvaLocationSchema()],
  location: [{ "@id": `${BASE_URL}/#franklin-showroom` }, { "@id": `${BASE_URL}/#sylva-showroom` }],
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: { "@type": "GeoCoordinates", latitude: 35.1821, longitude: -83.3807 },
    geoRadius: "80000",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Roofing & Construction Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Roof Replacement" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Roof Repair" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Storm Damage Restoration" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Metal Roofing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Roofing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Home Additions" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Renovations" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Outdoor Living Spaces" } },
    ],
  },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "certification",
    name: "CertainTeed ShingleMaster Credentialed Contractor",
    recognizedBy: { "@type": "Organization", name: "CertainTeed" },
  },
  currenciesAccepted: "USD",
  foundingDate: "2017",
  slogan: "Built for the Mountains. Built for Life.",
  sameAs: PROFILE_URLS,
  ...overrides,
});

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: SITE_NAME,
  url: BASE_URL,
  logo: { "@type": "ImageObject", url: DEFAULT_IMAGE, width: 512, height: 512 },
  legalName: "Highlander Building Services, Inc.",
  telephone: `${BUSINESS.primaryPhoneE164}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${FRANKLIN_STREET}`,
    addressLocality: "Franklin",
    addressRegion: "NC",
    postalCode: "28734",
    addressCountry: "US",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: `${BUSINESS.primaryPhoneE164}`,
    contactType: "customer service",
    areaServed: "US-NC",
    availableLanguage: "English",
  },
  sameAs: PROFILE_URLS,
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  url: BASE_URL,
  name: SITE_NAME,
  publisher: { "@id": `${BASE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: `${BASE_URL}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
  inLanguage: "en-US",
});

export const breadcrumbSchema = (
  items: { name: string; url: string }[],
  id?: string,
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  ...(id ? { "@id": id } : {}),
  itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: `${BASE_URL}${item.url}` })),
});

/**
 * WebPage schema — ties per-page title/description/URL to the
 * sitewide WebSite + Organization graph, and (optionally) to a
 * primary entity like a town-scoped LocalBusiness.
 */
export const webPageSchema = (page: {
  name: string;
  description: string;
  url: string;
  breadcrumbId?: string;
  primaryEntityId?: string;
  type?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": page.type || "WebPage",
  "@id": `${BASE_URL}${page.url}#webpage`,
  url: `${BASE_URL}${page.url}`,
  name: page.name,
  description: page.description,
  isPartOf: { "@id": `${BASE_URL}/#website` },
  about: { "@id": `${BASE_URL}/#organization` },
  inLanguage: "en-US",
  ...(page.breadcrumbId ? { breadcrumb: { "@id": page.breadcrumbId } } : {}),
  ...(page.primaryEntityId ? { mainEntity: { "@id": page.primaryEntityId } } : {}),
});

export const cityNode = (name: string, region = "NC") => ({
  "@type": "City",
  name,
  address: { "@type": "PostalAddress", addressLocality: name, addressRegion: region, addressCountry: "US" },
});

export const serviceSchema = (service: {
  name: string;
  description: string;
  url: string;
  areaServed?: string;
  areaServedCity?: { name: string; region?: string };
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${BASE_URL}${service.url}#service`,
  serviceType: service.name,
  name: service.name,
  description: service.description,
  url: `${BASE_URL}${service.url}`,
  provider: { "@id": `${BASE_URL}/#business` },
  areaServed: service.areaServedCity
    ? cityNode(service.areaServedCity.name, service.areaServedCity.region || "NC")
    : service.areaServed
      ? (/north carolina|wnc|region|county/i.test(service.areaServed)
          ? { "@type": "AdministrativeArea", name: service.areaServed }
          : cityNode(service.areaServed))
      : SERVED_CITIES.map((c) => cityNode(c.name, c.region)),
});

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
});

export const articleSchema = (article: { title: string; description: string; url: string; datePublished: string; dateModified?: string; image?: string; author?: string }) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": `${BASE_URL}${article.url}#article`,
  headline: article.title,
  description: article.description,
  url: `${BASE_URL}${article.url}`,
  mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}${article.url}` },
  datePublished: article.datePublished,
  dateModified: article.dateModified || article.datePublished,
  image: article.image || DEFAULT_IMAGE,
  author: { "@type": "Organization", name: article.author || SITE_NAME, "@id": `${BASE_URL}/#organization` },
  publisher: { "@id": `${BASE_URL}/#organization` },
});

// ============================================================
// Reusable Schema Templates — town, review, product, how-to,
// plus a buildPageSchema() orchestrator that auto-bundles the
// correct structured data for each page type.
// ============================================================

export interface TownSchemaInput {
  name: string;
  slug: string;
  county: string;
  state: string;
  description: string;
  latitude?: number;
  longitude?: number;
}

/**
 * Town-scoped LocalBusiness schema. Reuses base localBusinessSchema
 * and overrides name, address, areaServed, geo, and url for the town.
 */
export const townSchema = (town: TownSchemaInput) =>
  localBusinessSchema({
    "@id": `${BASE_URL}/service-areas/${town.slug}#business`,
    name: `Highlander Building Services — ${town.name}, ${town.state}`,
    url: `${BASE_URL}/service-areas/${town.slug}`,
    description: town.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: town.name,
      addressRegion: town.state,
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: town.name,
      containedInPlace: { "@type": "AdministrativeArea", name: `${town.county}, ${town.state}` },
    },
    parentOrganization: { "@id": `${BASE_URL}/#business` },
    ...(town.latitude && town.longitude
      ? { geo: { "@type": "GeoCoordinates", latitude: town.latitude, longitude: town.longitude } }
      : {}),
  });

export interface ReviewInput {
  author: string;
  rating: number;       // 1-5
  body: string;
  datePublished: string; // ISO YYYY-MM-DD
  location?: string;
}

/** Single Review schema (use inside an itemReviewed wrapper if standalone). */
export const reviewSchema = (review: ReviewInput) => ({
  "@context": "https://schema.org",
  "@type": "Review",
  reviewRating: { "@type": "Rating", ratingValue: review.rating, bestRating: 5, worstRating: 1 },
  author: { "@type": "Person", name: review.author },
  reviewBody: review.body,
  datePublished: review.datePublished,
  itemReviewed: { "@type": "RoofingContractor", name: SITE_NAME, "@id": `${BASE_URL}/#business` },
  ...(review.location ? { locationCreated: { "@type": "Place", name: review.location } } : {}),
});

/** AggregateRating + embedded Reviews for a reviews/testimonials page. */
export const aggregateReviewSchema = (
  reviews: ReviewInput[],
  aggregate?: { ratingValue: number; reviewCount: number },
) => {
  const avg = aggregate?.ratingValue ?? (reviews.reduce((s, r) => s + r.rating, 0) / Math.max(reviews.length, 1));
  const count = aggregate?.reviewCount ?? reviews.length;
  return {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "@id": `${BASE_URL}/#business`,
    name: SITE_NAME,
    url: BASE_URL,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: Number(avg.toFixed(1)),
      reviewCount: count,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5, worstRating: 1 },
      author: { "@type": "Person", name: r.author },
      reviewBody: r.body,
      datePublished: r.datePublished,
    })),
  };
};

export interface ProductSchemaInput {
  name: string;
  description: string;
  url: string;
  image?: string;
  category?: string;
  brand?: string;
}

/** Product schema for materials (shingles, metal panels, etc.). */
export const productSchema = (p: ProductSchemaInput) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: p.name,
  description: p.description,
  url: `${BASE_URL}${p.url}`,
  image: p.image || DEFAULT_IMAGE,
  category: p.category || "Roofing Material",
  brand: { "@type": "Brand", name: p.brand || SITE_NAME },
});

export interface HowToStep {
  name: string;
  text: string;
  url?: string;
  image?: string;
}

/** HowTo schema for tools, calculators, and process pages. */
export const howToSchema = (howTo: { name: string; description: string; url: string; steps: HowToStep[]; totalTime?: string }) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: howTo.name,
  description: howTo.description,
  url: `${BASE_URL}${howTo.url}`,
  ...(howTo.totalTime ? { totalTime: howTo.totalTime } : {}),
  step: howTo.steps.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.name,
    text: s.text,
    ...(s.url ? { url: `${BASE_URL}${s.url}` } : {}),
    ...(s.image ? { image: s.image } : {}),
  })),
});

/** ContactPage schema for /contact and similar. */
export const contactPageSchema = (path: string) => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: `${BASE_URL}${path}`,
  about: { "@id": `${BASE_URL}/#business` },
});

// ============================================================
// buildPageSchema — central orchestrator
// Pass the page type + minimal inputs; returns the correct
// JSON-LD bundle. Use in pages so structured data is consistent
// and automatic across the site.
// ============================================================

export type PageSchemaInput =
  | { type: "home"; reviews?: ReviewInput[]; aggregate?: { ratingValue: number; reviewCount: number } }
  | {
      type: "town";
      town: TownSchemaInput;
      faqs?: { question: string; answer: string }[];
      page?: { title: string; description: string };
    }
  | {
      type: "service";
      service: { name: string; description: string; url: string; areaServed?: string };
      breadcrumbs: { name: string; url: string }[];
      faqs?: { question: string; answer: string }[];
    }
  | {
      type: "blog";
      article: Parameters<typeof articleSchema>[0];
      breadcrumbs: { name: string; url: string }[];
      faqs?: { question: string; answer: string }[];
    }
  | {
      type: "commercial";
      service: { name: string; description: string; url: string; areaServed?: string };
      breadcrumbs: { name: string; url: string }[];
      faqs?: { question: string; answer: string }[];
    }
  | {
      type: "article";
      article: Parameters<typeof articleSchema>[0];
      breadcrumbs: { name: string; url: string }[];
    }
  | { type: "reviews"; reviews: ReviewInput[]; aggregate?: { ratingValue: number; reviewCount: number } }
  | { type: "contact"; path: string; breadcrumbs?: { name: string; url: string }[] }
  | {
      type: "tool";
      howTo: Parameters<typeof howToSchema>[0];
      breadcrumbs: { name: string; url: string }[];
    }
  | {
      type: "generic";
      breadcrumbs: { name: string; url: string }[];
      faqs?: { question: string; answer: string }[];
    };

export const buildPageSchema = (input: PageSchemaInput): Record<string, unknown>[] => {
  switch (input.type) {
    case "home": {
      // WebSite + Organization ship statically in index.html — don't duplicate them here.
      // Ratings merge into the single #business node so the graph has one
      // business entity rather than two nodes sharing an @id.
      const ratings = input.reviews?.length
        ? (() => {
            const { "@context": _c, "@type": _t, "@id": _i, name: _n, url: _u, ...rest } =
              aggregateReviewSchema(input.reviews, input.aggregate) as Record<string, unknown>;
            return rest;
          })()
        : {};
      return [
        localBusinessSchema(ratings),
        breadcrumbSchema([{ name: "Home", url: "/" }]),
      ];
    }

    case "town": {
      const path = `/service-areas/${input.town.slug}`;
      const breadcrumbId = `${BASE_URL}${path}#breadcrumb`;
      const businessId = `${BASE_URL}${path}#business`;
      const out: Record<string, unknown>[] = [
        townSchema(input.town),
        localBusinessSchema(),
        breadcrumbSchema(
          [
            { name: "Home", url: "/" },
            { name: "Service Areas", url: "/service-areas" },
            { name: `${input.town.name}, ${input.town.state}`, url: path },
          ],
          breadcrumbId,
        ),
        webPageSchema({
          name: input.page?.title || `Roofing & Construction in ${input.town.name}, ${input.town.state}`,
          description: input.page?.description || input.town.description,
          url: path,
          breadcrumbId,
          primaryEntityId: businessId,
        }),
      ];
      out.push(
        serviceSchema({
          name: `Roofing & Construction Services in ${input.town.name}, ${input.town.state}`,
          description: input.page?.description || input.town.description,
          url: path,
          areaServedCity: { name: input.town.name, region: input.town.state },
        }),
      );
      if (input.faqs?.length) out.push(faqSchema(input.faqs));
      return out;
    }

    case "service": {
      const out: Record<string, unknown>[] = [
        serviceSchema(input.service),
        localBusinessSchema(),
        breadcrumbSchema(input.breadcrumbs),
      ];
      if (input.faqs?.length) out.push(faqSchema(input.faqs));
      return out;
    }

    case "blog": {
      const out: Record<string, unknown>[] = [
        articleSchema(input.article),
        breadcrumbSchema(input.breadcrumbs),
      ];
      if (input.faqs?.length) out.push(faqSchema(input.faqs));
      return out;
    }

    case "commercial": {
      const out: Record<string, unknown>[] = [
        serviceSchema(input.service),
        localBusinessSchema(),
        breadcrumbSchema(input.breadcrumbs),
      ];
      if (input.faqs?.length) out.push(faqSchema(input.faqs));
      return out;
    }

    case "article":
      return [articleSchema(input.article), breadcrumbSchema(input.breadcrumbs)];

    case "reviews":
      return [aggregateReviewSchema(input.reviews, input.aggregate)];

    case "contact": {
      const out: Record<string, unknown>[] = [contactPageSchema(input.path), localBusinessSchema()];
      if (input.breadcrumbs?.length) out.push(breadcrumbSchema(input.breadcrumbs));
      return out;
    }

    case "tool": {
      return [howToSchema(input.howTo), breadcrumbSchema(input.breadcrumbs)];
    }

    case "generic": {
      const out: Record<string, unknown>[] = [breadcrumbSchema(input.breadcrumbs)];
      if (input.faqs?.length) out.push(faqSchema(input.faqs));
      return out;
    }
  }
};
