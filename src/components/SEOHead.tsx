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

const SITE_NAME = "Highlander Roofing & Construction";
const BRAND_SUFFIX = "Highlander"; // short suffix to keep titles ≤60 chars
const BASE_URL = "https://western-wnc-dominate.lovable.app";
const FAVICON_VERSION = "2";
const DEFAULT_IMAGE = `${BASE_URL}/favicon.png?v=${FAVICON_VERSION}`;
const TWITTER_HANDLE = "@highlanderroof";
const DEFAULT_KEYWORDS =
  "Highlander Roofing, Highlander Roofing Services, roofing company Western NC, roofing contractor Western NC, roofing services Western North Carolina, roofing company Franklin NC, roofing contractor near Franklin NC, roofing contractor near Highlands NC, roofing contractor near Cashiers NC, roof repair Western NC, roof replacement Western NC, metal roofing Western NC, roofing and construction Western NC, construction and roofing company Western NC, roofing Sylva NC, storm damage roof WNC, mountain home construction, home additions WNC";

const setMeta = (attr: string, key: string, content: string) => {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
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
  const canonicalUrl = `${BASE_URL}${path}`;
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

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
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
    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-ld", "true");
      script.textContent = JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd);
      document.head.appendChild(script);
    }
    return () => { const ld = document.querySelector('script[data-seo-ld]'); if (ld) ld.remove(); };
  }, [fullTitle, description, canonicalUrl, type, ogImage, noindex, jsonLd, keywords, locale]);

  return null;
};

export default SEOHead;

export const localBusinessSchema = (overrides?: Record<string, unknown>) => ({
  "@context": "https://schema.org",
  "@type": ["RoofingContractor", "GeneralContractor", "HomeAndConstructionBusiness", "LocalBusiness"],
  "@id": `${BASE_URL}/#business`,
  name: SITE_NAME,
  legalName: "Highlander Roofing Services, Inc.",
  alternateName: "Highlander Roofing",
  url: BASE_URL,
  logo: DEFAULT_IMAGE,
  image: DEFAULT_IMAGE,
  telephone: "+1-828-524-7773",
  email: "info@highlandernc.com",
  description:
    "Premium roofing and construction company serving Western North Carolina mountain communities since 2017. Specializing in storm-resistant roofing, metal roofing, home additions, renovations, and outdoor living for elevation-rated homes.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Franklin Office",
    addressLocality: "Franklin",
    addressRegion: "NC",
    postalCode: "28734",
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: 35.1821, longitude: -83.3807 },
  areaServed: [
    { "@type": "City", name: "Franklin", "@id": "https://en.wikipedia.org/wiki/Franklin,_North_Carolina" },
    { "@type": "City", name: "Sylva" },
    { "@type": "City", name: "Highlands" },
    { "@type": "City", name: "Cashiers" },
    { "@type": "City", name: "Brevard" },
    { "@type": "City", name: "Waynesville" },
    { "@type": "City", name: "Bryson City" },
    { "@type": "City", name: "Cullowhee" },
    { "@type": "City", name: "Dillsboro" },
    { "@type": "AdministrativeArea", name: "Western North Carolina" },
  ],
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
  priceRange: "$$-$$$",
  currenciesAccepted: "USD",
  paymentAccepted: "Cash, Credit Card, Check, Financing",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  foundingDate: "2017",
  slogan: "Built for the Mountains. Built for Life.",
  sameAs: [
    "https://www.linkedin.com/company/highlander-roofing-services-inc/",
    "https://www.facebook.com/highlanderroof/reels/",
    "https://www.instagram.com/highlanderroofingservices/",
  ],
  ...overrides,
});

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: SITE_NAME,
  url: BASE_URL,
  logo: { "@type": "ImageObject", url: DEFAULT_IMAGE, width: 512, height: 512 },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-828-524-7773",
    contactType: "customer service",
    areaServed: "US-NC",
    availableLanguage: "English",
  },
  sameAs: [
    "https://www.linkedin.com/company/highlander-roofing-services-inc/",
    "https://www.facebook.com/highlanderroof/reels/",
    "https://www.instagram.com/highlanderroofingservices/",
  ],
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

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: `${BASE_URL}${item.url}` })),
});

export const serviceSchema = (service: { name: string; description: string; url: string; areaServed?: string }) => ({
  "@context": "https://schema.org", "@type": "Service", serviceType: service.name, name: service.name,
  description: service.description, url: `${BASE_URL}${service.url}`,
  provider: { "@type": "RoofingContractor", name: SITE_NAME, url: BASE_URL },
  areaServed: service.areaServed || "Western North Carolina",
});

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
});

export const articleSchema = (article: { title: string; description: string; url: string; datePublished: string; dateModified?: string; image?: string; author?: string }) => ({
  "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.description,
  url: `${BASE_URL}${article.url}`, datePublished: article.datePublished, dateModified: article.dateModified || article.datePublished,
  image: article.image || DEFAULT_IMAGE,
  author: { "@type": "Person", name: article.author || "Highlander Team" },
  publisher: { "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: DEFAULT_IMAGE } },
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
    name: `Highlander Roofing & Construction — ${town.name}, ${town.state}`,
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
  | { type: "town"; town: TownSchemaInput; faqs?: { question: string; answer: string }[] }
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
      const out: Record<string, unknown>[] = [
        organizationSchema(),
        websiteSchema(),
        localBusinessSchema(),
        breadcrumbSchema([{ name: "Home", url: "/" }]),
      ];
      if (input.reviews?.length) out.push(aggregateReviewSchema(input.reviews, input.aggregate));
      return out;
    }

    case "town": {
      const out: Record<string, unknown>[] = [
        townSchema(input.town),
        breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Service Areas", url: "/service-areas" },
          { name: `${input.town.name}, ${input.town.state}`, url: `/service-areas/${input.town.slug}` },
        ]),
      ];
      if (input.faqs?.length) out.push(faqSchema(input.faqs));
      return out;
    }

    case "service": {
      const out: Record<string, unknown>[] = [
        serviceSchema(input.service),
        breadcrumbSchema(input.breadcrumbs),
      ];
      if (input.faqs?.length) out.push(faqSchema(input.faqs));
      return out;
    }

    case "blog":
      return [articleSchema(input.article), breadcrumbSchema(input.breadcrumbs)];

    case "commercial": {
      const out: Record<string, unknown>[] = [
        serviceSchema(input.service),
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
