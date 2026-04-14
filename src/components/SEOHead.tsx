import { useEffect } from "react";

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

const setMeta = (attr: string, key: string, content: string) => {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const SEOHead = ({ title, description, path, type = "website", image, jsonLd, noindex = false }: SEOHeadProps) => {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = `${BASE_URL}${path}`;
  const ogImage = image || DEFAULT_IMAGE;

  useEffect(() => {
    document.title = fullTitle;
    setMeta("name", "description", description);
    if (noindex) setMeta("name", "robots", "noindex,nofollow");

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) { link = document.createElement("link"); link.setAttribute("rel", "canonical"); document.head.appendChild(link); }
    link.setAttribute("href", canonicalUrl);

    setMeta("property", "og:type", type);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);

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
  }, [fullTitle, description, canonicalUrl, type, ogImage, noindex, jsonLd]);

  return null;
};

export default SEOHead;

export const localBusinessSchema = (overrides?: Record<string, unknown>) => ({
  "@context": "https://schema.org", "@type": "RoofingContractor", name: SITE_NAME, url: BASE_URL,
  telephone: "+18283979211", email: "info@highlanderroofing.com",
  address: [
    { "@type": "PostalAddress", addressLocality: "Franklin", addressRegion: "NC", postalCode: "28734", addressCountry: "US" },
    { "@type": "PostalAddress", addressLocality: "Sylva", addressRegion: "NC", postalCode: "28779", addressCountry: "US" },
  ],
  areaServed: ["Franklin, NC", "Sylva, NC", "Highlands, NC", "Cashiers, NC", "Brevard, NC", "Waynesville, NC", "Bryson City, NC"],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "500", bestRating: "5" },
  priceRange: "$$-$$$", openingHours: "Mo-Fr 07:00-18:00", ...overrides,
});

export const organizationSchema = () => ({
  "@context": "https://schema.org", "@type": "Organization", name: SITE_NAME, url: BASE_URL, logo: DEFAULT_IMAGE,
  contactPoint: { "@type": "ContactPoint", telephone: "+18283979211", contactType: "customer service", areaServed: "US", availableLanguage: "English" },
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
