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
const BASE_URL = "https://western-wnc-dominate.lovable.app";
const FAVICON_VERSION = "2";
const DEFAULT_IMAGE = `${BASE_URL}/favicon.png?v=${FAVICON_VERSION}`;
const TWITTER_HANDLE = "@highlanderroof";
const DEFAULT_KEYWORDS =
  "roofing Western NC, roofing Highlands NC, roofing Cashiers NC, roofing Franklin NC, roofing Sylva NC, metal roofing WNC, roof repair, roof replacement, storm damage, mountain home construction, home additions WNC, Highlander Roofing";

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
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
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
  "@type": ["RoofingContractor", "GeneralContractor", "LocalBusiness"],
  "@id": `${BASE_URL}/#business`,
  name: SITE_NAME,
  alternateName: "Highlander Roofing",
  url: BASE_URL,
  logo: DEFAULT_IMAGE,
  image: DEFAULT_IMAGE,
  telephone: "+1-828-397-9211",
  email: "info@highlanderroofing.com",
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
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "500",
    bestRating: "5",
    worstRating: "1",
  },
  priceRange: "$$-$$$",
  currenciesAccepted: "USD",
  paymentAccepted: "Cash, Credit Card, Check, Financing",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "18:00",
    },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "14:00" },
  ],
  foundingDate: "2017",
  slogan: "Built for the Mountains. Built for Life.",
  sameAs: [
    "https://www.facebook.com/highlanderroofing",
    "https://www.instagram.com/highlanderroofing",
    "https://www.google.com/maps?cid=highlanderroofing",
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
    telephone: "+1-828-397-9211",
    contactType: "customer service",
    areaServed: "US-NC",
    availableLanguage: "English",
  },
  sameAs: [
    "https://www.facebook.com/highlanderroofing",
    "https://www.instagram.com/highlanderroofing",
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
