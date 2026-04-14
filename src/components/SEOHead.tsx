import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
}

const SITE_NAME = "Highlander Roofing & Construction";
const BASE_URL = "https://western-wnc-dominate.lovable.app";
const DEFAULT_IMAGE = `${BASE_URL}/favicon.webp`;

const SEOHead = ({
  title,
  description,
  path,
  type = "website",
  image,
  jsonLd,
  noindex = false,
}: SEOHeadProps) => {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = `${BASE_URL}${path}`;
  const ogImage = image || DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;

/* ═══ Reusable JSON-LD Generators ═══ */

export const localBusinessSchema = (overrides?: Record<string, unknown>) => ({
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  name: SITE_NAME,
  url: BASE_URL,
  telephone: "+18283979211",
  email: "info@highlanderroofing.com",
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "Franklin",
      addressLocality: "Franklin",
      addressRegion: "NC",
      postalCode: "28734",
      addressCountry: "US",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "Sylva",
      addressLocality: "Sylva",
      addressRegion: "NC",
      postalCode: "28779",
      addressCountry: "US",
    },
  ],
  areaServed: [
    "Franklin, NC", "Sylva, NC", "Highlands, NC", "Cashiers, NC",
    "Brevard, NC", "Waynesville, NC", "Bryson City, NC", "Cherokee, NC",
    "Cullowhee, NC", "Dillsboro, NC", "Hendersonville, NC",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "500",
    bestRating: "5",
  },
  priceRange: "$$-$$$",
  openingHours: "Mo-Fr 07:00-18:00",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Roofing & Construction Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Residential Roofing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Roofing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Roof Repair" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Storm Damage Restoration" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Home Additions" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Renovations" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Outdoor Living" } },
    ],
  },
  ...overrides,
});

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: BASE_URL,
  logo: DEFAULT_IMAGE,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+18283979211",
    contactType: "customer service",
    areaServed: "US",
    availableLanguage: "English",
  },
  sameAs: [],
});

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: `${BASE_URL}${item.url}`,
  })),
});

export const serviceSchema = (service: {
  name: string;
  description: string;
  url: string;
  areaServed?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: service.name,
  name: service.name,
  description: service.description,
  url: `${BASE_URL}${service.url}`,
  provider: {
    "@type": "RoofingContractor",
    name: SITE_NAME,
    url: BASE_URL,
  },
  areaServed: service.areaServed || "Western North Carolina",
});

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

export const articleSchema = (article: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  author?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description: article.description,
  url: `${BASE_URL}${article.url}`,
  datePublished: article.datePublished,
  dateModified: article.dateModified || article.datePublished,
  image: article.image || DEFAULT_IMAGE,
  author: {
    "@type": "Person",
    name: article.author || "Highlander Team",
  },
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    logo: { "@type": "ImageObject", url: DEFAULT_IMAGE },
  },
});