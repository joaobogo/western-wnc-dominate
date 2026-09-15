import { BUSINESS, FRANKLIN, SYLVA, GBP_MAP_URL, BusinessLocation, VERIFIED_AWARDS, awardLabel } from "@/data/business";
import { REVIEWS } from "@/data/reviews";
import { useEffect } from "react";
import { ogImageForPath, OG_FALLBACK } from "@/lib/og";
import { normalizeTitle, normalizeDescription } from "@/lib/seo-length";

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /**
   * true → "noindex,nofollow" (utility pages).
   * "follow" → "noindex,follow" (templated pages we still want crawled for links).
   */
  noindex?: boolean | "follow";
  /** @deprecated No longer emitted — the keywords meta tag was removed 15 Sep 2026. */
  keywords?: string;
  locale?: string;
  /**
   * The page's LCP image (hero). Emits <link rel="preload" as="image"
   * fetchpriority="high"> so the browser starts the download before the
   * route chunk renders the <img>. Same-origin paths only.
   */
  preloadImage?: string;
  /**
   * Responsive candidates for `preloadImage` (P5.1). Emitted as
   * imagesrcset/imagesizes so a phone preloads the 640px rendition instead of
   * the 1600px master — and never both.
   */
  preloadImageSrcSet?: string;
  preloadImageSizes?: string;
  /**
   * Point the canonical (and og:url) at ANOTHER page — for a post folded into
   * a surviving post (BlogPost.canonicalTo). Pair with noindex="follow".
   * Defaults to a self-referencing canonical built from `path`.
   */
  canonicalPath?: string;
}

const SITE_NAME = BUSINESS.brandName;
const BRAND_SUFFIX = "Highlander"; // short suffix to keep titles ≤60 chars
const BASE_URL = "https://highlandernc.com";
const FAVICON_VERSION = "2";
const DEFAULT_IMAGE = `${BASE_URL}${OG_FALLBACK}`;
/** Bing Webmaster Tools verification token — env-driven, optional. */
const BING_VERIFICATION = (import.meta.env.VITE_BING_SITE_VERIFICATION as string | undefined)?.trim();
const DEFAULT_IMAGE_WIDTH = "1200";
const DEFAULT_IMAGE_HEIGHT = "630";
const TWITTER_HANDLE = "@highlanderroof";
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

/**
 * Absolute canonical URL for a route: https://highlandernc.com/<path> with NO
 * trailing slash (the homepage is always "https://highlandernc.com/"). This is
 * the one URL shape sitewide — internal links, UrlNormalizer, the sitemap, the
 * prerendered file names (dist/<route>.html) and og:url (which mirrors the
 * canonical) all use it, so no crawler ever follows a redirect from a canonical.
 */
export const canonicalUrlFor = (rawPath: string): string => {
  const path = normalizeCanonicalPath(rawPath);
  return path === "/" ? `${BASE_URL}/` : `${BASE_URL}${path}`;
};

const SEOHead = ({
  title,
  description: rawDescription,
  path,
  type = "website",
  image,
  jsonLd,
  noindex = false,
  locale = "en_US",
  preloadImage,
  preloadImageSrcSet,
  preloadImageSizes = "100vw",
  canonicalPath: canonicalOverride,
}: SEOHeadProps) => {
  // SERP length guardrails: ≤60 char titles, ≤155 char descriptions.
  const fullTitle = normalizeTitle(
    title.includes("Highlander") ? title : `${title} | ${BRAND_SUFFIX}`,
  );
  const description = normalizeDescription(rawDescription);
  const canonicalPath = normalizeCanonicalPath(canonicalOverride ?? path);
  const canonicalUrl = canonicalUrlFor(canonicalOverride ?? path);
  // Per-route card generated at build (dist/og/<slug>.png); the /og/* rewrite
  // serves /og-image.jpg for any route without one.
  const ogImage = image || ogImageForPath(canonicalPath, BASE_URL);

  useEffect(() => {
    document.title = fullTitle;
    setMeta("name", "description", description);
    setMeta("name", "robots", noindex === "follow" ? "noindex,follow" : noindex ? "noindex,nofollow" : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1");
    setMeta("name", "author", SITE_NAME);
    setMeta("name", "publisher", SITE_NAME);
    setMeta("name", "theme-color", "#1a4d2e");
    if (BING_VERIFICATION) setMeta("name", "msvalidate.01", BING_VERIFICATION);
    // Geo tags for local SEO
    setMeta("name", "geo.region", `US-${FRANKLIN.region}`);
    setMeta("name", "geo.placename", `${FRANKLIN.locality}, North Carolina`);
    setMeta("name", "geo.position", `${FRANKLIN.geo.lat};${FRANKLIN.geo.lng}`);
    setMeta("name", "ICBM", `${FRANKLIN.geo.lat}, ${FRANKLIN.geo.lng}`);

    // Exactly one canonical element may exist — drop any extras the static
    // head or a previous route left behind, then self-reference this route.
    const canonicalLinks = Array.from(
      document.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]'),
    );
    canonicalLinks.slice(1).forEach((extra) => extra.remove());
    let link = canonicalLinks[0] ?? null;
    if (!link) { link = document.createElement("link"); link.setAttribute("rel", "canonical"); document.head.appendChild(link); }
    link.setAttribute("href", canonicalUrl);

    // LCP image preload — exactly one, owned by this route (data-seo-preload),
    // replaced on navigation and removed when the route has no hero.
    document.querySelectorAll('link[data-seo-preload]').forEach((el) => el.remove());
    if (preloadImage) {
      const pre = document.createElement("link");
      pre.setAttribute("rel", "preload");
      pre.setAttribute("as", "image");
      pre.setAttribute("href", preloadImage);
      if (preloadImageSrcSet) {
        pre.setAttribute("imagesrcset", preloadImageSrcSet);
        pre.setAttribute("imagesizes", preloadImageSizes);
      }
      pre.setAttribute("fetchpriority", "high");
      pre.setAttribute("data-seo-preload", "true");
      document.head.appendChild(pre);
    }

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
    // The business node references the two showrooms by @id; whenever that
    // reference is in the graph the Place nodes must be defined too, or the
    // graph ships dangling @id pointers.
    const graphText = JSON.stringify(nodes);
    const showroomRefsUsed = graphText.includes("-showroom");
    const showroomNodesDefined = nodes.some(
      (n) => typeof n["@id"] === "string" && (n["@id"] as string).endsWith("-showroom"),
    );
    if (showroomRefsUsed && !showroomNodesDefined) {
      nodes.push(...(locationNodes() as Record<string, unknown>[]));
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
  }, [fullTitle, description, canonicalUrl, canonicalPath, type, ogImage, noindex, jsonLd, locale, preloadImage, preloadImageSrcSet, preloadImageSizes]);

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

/** Opening hours, derived from BUSINESS. */
const hoursSpec = (loc: BusinessLocation) =>
  loc.hours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  }));

const BUSINESS_HOURS = hoursSpec(FRANKLIN);

/** Verified public profiles used for sameAs on the business + organization nodes. */
const PROFILE_URLS = BUSINESS.profiles;

/**
 * Credentials the business can prove (src/data/business.ts `credentials`):
 * the NC GC license and the manufacturer accreditations. BBB accreditation and
 * "family-owned since" are trust items, not credentials, so they stay out.
 */
const CREDENTIAL_NODES = BUSINESS.credentials
  .filter((c) => /license|certainteed|velux/i.test(c.label))
  .map((c) => {
    const isLicense = /license/i.test(c.label);
    const recognizedBy = isLicense
      ? "North Carolina Licensing Board for General Contractors"
      : /certainteed/i.test(c.label)
        ? "CertainTeed"
        : "VELUX";
    return {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: isLicense ? "license" : "certification",
      name: c.label,
      recognizedBy: { "@type": "Organization", name: recognizedBy },
      ...(c.href ? { url: c.href } : {}),
    };
  });

/** Owners named as founders (src/data/business.ts `people`, jobTitle carries "Founder"). */
const FOUNDER_NODES = BUSINESS.people
  .filter((p) => /founder/i.test(p.jobTitle))
  .map((p) => ({ "@type": "Person", name: p.name, jobTitle: p.jobTitle }));

const postalAddress = (loc: BusinessLocation) => ({
  "@type": "PostalAddress",
  streetAddress: loc.streetAddress,
  addressLocality: loc.locality,
  addressRegion: loc.region,
  postalCode: loc.postalCode,
  addressCountry: "US",
});

const geoPoint = (loc: BusinessLocation) => ({
  "@type": "GeoCoordinates",
  latitude: loc.geo.lat,
  longitude: loc.geo.lng,
});

/**
 * Physical showroom node — the ONLY Place-type entities in the graph.
 * Everything else (towns, counties, service pages) is modelled as
 * `areaServed`, never as another LocalBusiness with an address.
 */
const locationSchema = (loc: BusinessLocation) => ({
  "@type": ["RoofingContractor", "GeneralContractor", "LocalBusiness"],
  "@id": `${BASE_URL}/#${loc.id}-showroom`,
  name: `${BUSINESS.legalName} — ${loc.name}`,
  url: BASE_URL,
  image: DEFAULT_IMAGE,
  telephone: loc.phoneE164,
  parentOrganization: { "@id": `${BASE_URL}/#organization` },
  address: postalAddress(loc),
  geo: geoPoint(loc),
  openingHoursSpecification: hoursSpec(loc),
  hasMap: GBP_MAP_URL(loc.gbpCid),
  sameAs: [GBP_MAP_URL(loc.gbpCid)],
});

/** Franklin showroom — physical location node. */
export const franklinLocationSchema = () => ({ "@context": "https://schema.org", ...locationSchema(FRANKLIN) });

/** Sylva showroom — physical location node. */
export const sylvaLocationSchema = () => ({ "@context": "https://schema.org", ...locationSchema(SYLVA) });

/** Both showroom nodes — emit alongside the business node. */
export const locationNodes = () => [franklinLocationSchema(), sylvaLocationSchema()];

const AREA_SERVED = [
  ...SERVED_CITIES.map((c) => ({
    "@type": "City",
    name: c.name,
    address: { "@type": "PostalAddress", addressLocality: c.name, addressRegion: c.region, addressCountry: "US" },
  })),
  ...BUSINESS.countiesServed.map((c) => ({ "@type": "AdministrativeArea", name: `${c.name}, ${c.region}` })),
];

export const localBusinessSchema = (overrides?: Record<string, unknown>) => ({
  "@context": "https://schema.org",
  "@type": ["RoofingContractor", "GeneralContractor", "HomeAndConstructionBusiness", "LocalBusiness"],
  "@id": `${BASE_URL}/#business`,
  // Name must match the footer and the showroom child entities exactly.
  name: BUSINESS.legalName,
  legalName: BUSINESS.legalName,
  ...(BUSINESS.alternateNames.length ? { alternateName: BUSINESS.alternateNames } : {}),
  url: BASE_URL,
  logo: DEFAULT_IMAGE,
  image: DEFAULT_IMAGE,
  telephone: BUSINESS.primaryPhoneE164,
  email: BUSINESS.email,
  description: BUSINESS.description,
  address: postalAddress(FRANKLIN),
  geo: geoPoint(FRANKLIN),
  areaServed: AREA_SERVED,
  openingHoursSpecification: BUSINESS_HOURS,
  // Only the two real showrooms are Places; referenced by @id, defined by
  // the location nodes that ship next to this one.
  location: BUSINESS.locations.map((loc) => ({ "@id": `${BASE_URL}/#${loc.id}-showroom` })),
  ...(BUSINESS.priceRange ? { priceRange: BUSINESS.priceRange } : {}),
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: geoPoint(FRANKLIN),
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
  hasCredential: CREDENTIAL_NODES,
  founder: FOUNDER_NODES,
  currenciesAccepted: "USD",
  foundingDate: BUSINESS.foundingDate,
  slogan: BUSINESS.slogan,
  // Awards enter markup only when owner-verified (see CLAIMS_AUDIT.md).
  ...(VERIFIED_AWARDS.length ? { award: VERIFIED_AWARDS.map(awardLabel) } : {}),
  sameAs: PROFILE_URLS,

  ...overrides,
});

/** Business node + the two showroom Places — the sitewide identity bundle. */
/**
 * Review nodes for the published reviews rendered on /reviews.
 *
 * Every field comes straight from src/data/reviews.ts, so the markup can never
 * describe a review the page does not show. `itemReviewed` points at the
 * existing #business node rather than creating a second business entity.
 */
export const reviewNodes = () =>
  REVIEWS.map((r) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "@id": `${BASE_URL}/reviews#${r.id}`,
    itemReviewed: { "@id": `${BASE_URL}/#business` },
    author: { "@type": "Person", name: r.name },
    reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5, worstRating: 1 },
    datePublished: r.date,
    reviewBody: r.text,
    publisher: { "@type": "Organization", name: r.source },
  }));

export const businessGraph = (overrides?: Record<string, unknown>) => [
  localBusinessSchema(overrides),
  ...locationNodes(),
];


export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: SITE_NAME,
  url: BASE_URL,
  logo: { "@type": "ImageObject", url: DEFAULT_IMAGE, width: 512, height: 512 },
  legalName: BUSINESS.legalName,
  ...(BUSINESS.alternateNames.length ? { alternateName: BUSINESS.alternateNames } : {}),
  telephone: BUSINESS.primaryPhoneE164,
  email: BUSINESS.email,
  foundingDate: BUSINESS.foundingDate,
  founder: FOUNDER_NODES,
  hasCredential: CREDENTIAL_NODES,
  address: postalAddress(FRANKLIN),
  contactPoint: {
    "@type": "ContactPoint",
    telephone: BUSINESS.primaryPhoneE164,
    contactType: "customer service",
    areaServed: `US-${FRANKLIN.region}`,
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

const KNOWN_PEOPLE = BUSINESS.people;

/**
 * Author node. Prefers a real Person (owner or the team member who wrote the
 * post); falls back to the Organization only when no person is credited.
 */
const authorNode = (author?: string) => {
  const person = KNOWN_PEOPLE.find((p) => p.name === author || p.slug === author);
  if (person) {
    return {
      "@type": "Person",
      name: person.name,
      jobTitle: person.jobTitle,
      url: `${BASE_URL}/about#${person.slug}`,
      worksFor: { "@id": `${BASE_URL}/#organization` },
    };
  }
  if (author && author !== SITE_NAME) {
    return { "@type": "Person", name: author, worksFor: { "@id": `${BASE_URL}/#organization` } };
  }
  return { "@type": "Organization", name: SITE_NAME, "@id": `${BASE_URL}/#organization` };
};

/**
 * Person node for a named owner/team member. Only emit for real, named people
 * whose role and community involvement we can verify.
 */
export const personSchema = (slug: string, extra?: { image?: string; description?: string; memberOf?: string[] }) => {
  const person = KNOWN_PEOPLE.find((p) => p.slug === slug);
  if (!person) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE_URL}/about#${person.slug}`,
    name: person.name,
    jobTitle: person.jobTitle,
    url: `${BASE_URL}/about#${person.slug}`,
    worksFor: { "@id": `${BASE_URL}/#organization` },
    ...(extra?.image ? { image: extra.image } : {}),
    ...(extra?.description ? { description: extra.description } : {}),
    ...(extra?.memberOf?.length
      ? { memberOf: extra.memberOf.map((name) => ({ "@type": "Organization", name })) }
      : {}),
  };
};

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
  author: authorNode(article.author),
  publisher: { "@id": `${BASE_URL}/#organization` },
});

// ============================================================
// Reusable Schema Templates — area, review, product, how-to,
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
 * A town is an area we serve, NOT a separate business. Towns are modelled as
 * a `City` (contained in the county `AdministrativeArea`) used as `areaServed`
 * on a Service node whose provider is the single `#business`.
 */
export const townAreaNode = (town: TownSchemaInput) => ({
  "@type": "City",
  name: town.name,
  address: { "@type": "PostalAddress", addressLocality: town.name, addressRegion: town.state, addressCountry: "US" },
  containedInPlace: { "@type": "AdministrativeArea", name: `${town.county}, ${town.state}` },
  ...(town.latitude && town.longitude
    ? { geo: { "@type": "GeoCoordinates", latitude: town.latitude, longitude: town.longitude } }
    : {}),
});

/** Service node scoped to a single town. */
export const townServiceSchema = (
  town: TownSchemaInput,
  opts: { url: string; name: string; description: string },
) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${BASE_URL}${opts.url}#service`,
  serviceType: opts.name,
  name: opts.name,
  description: opts.description,
  url: `${BASE_URL}${opts.url}`,
  provider: { "@id": `${BASE_URL}/#business` },
  areaServed: townAreaNode(town),
});

/** Service node scoped to a county. */
export const countyServiceSchema = (
  county: { name: string; state?: string },
  opts: { url: string; name: string; description: string },
) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${BASE_URL}${opts.url}#service`,
  serviceType: opts.name,
  name: opts.name,
  description: opts.description,
  url: `${BASE_URL}${opts.url}`,
  provider: { "@id": `${BASE_URL}/#business` },
  areaServed: { "@type": "AdministrativeArea", name: `${county.name}, ${county.state || "NC"}` },
});


/*
 * REVIEW MARKUP POLICY: no aggregateRating and no Review nodes are emitted on
 * any page. The rating is shown as visible text (BUSINESS.reviewSummary) and
 * reviews are read on Google. Self-serving review markup is ineligible for rich
 * results and a policy risk; scripts/validate-schema.mjs fails the build if it
 * ever appears on a route other than /reviews, and /reviews currently emits
 * only businessGraph(). The former reviewSchema()/aggregateReviewSchema()
 * helpers were removed so nothing in the codebase can produce that markup.
 */


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
  | { type: "home" }
  | {
      type: "town";
      town: TownSchemaInput;
      faqs?: { question: string; answer: string }[];
      page?: { title: string; description: string };
      /** Optional service×town scoping, e.g. "Metal Roofing". */
      service?: { name: string; description?: string; url?: string };
      breadcrumbs?: { name: string; url: string }[];
    }
  | {
      type: "county";
      county: { name: string; state?: string; slug: string; description?: string };
      page?: { title: string; description: string };
      faqs?: { question: string; answer: string }[];
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
  | { type: "reviews" }
  | { type: "contact"; path: string; breadcrumbs?: { name: string; url: string }[] }
  | {
      /**
       * Physical showroom page. mainEntity is the existing showroom Place node
       * (`#<id>-showroom`) — never a second business entity.
       */
      type: "location";
      locationId: BusinessLocation["id"];
      path: string;
      page: { title: string; description: string };
      breadcrumbs: { name: string; url: string }[];
      faqs?: { question: string; answer: string }[];
    }
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
      // No aggregateRating here: ratings are only legal on /reviews, where the
      // same figures are visible on the page.
      return [...businessGraph(), breadcrumbSchema([{ name: "Home", url: "/" }])];
    }

    case "town": {
      const path = input.service?.url || `/service-areas/${input.town.slug}`;
      const breadcrumbId = `${BASE_URL}${path}#breadcrumb`;
      const serviceName =
        input.service?.name
          ? `${input.service.name} in ${input.town.name}, ${input.town.state}`
          : `Roofing & Construction Services in ${input.town.name}, ${input.town.state}`;
      const description =
        input.service?.description || input.page?.description || input.town.description;
      const service = townServiceSchema(input.town, { url: path, name: serviceName, description });
      const out: Record<string, unknown>[] = [
        ...businessGraph(),
        service,
        breadcrumbSchema(
          input.breadcrumbs || [
            { name: "Home", url: "/" },
            { name: "Service Areas", url: "/service-areas" },
            { name: `${input.town.name}, ${input.town.state}`, url: path },
          ],
          breadcrumbId,
        ),
        webPageSchema({
          name: input.page?.title || serviceName,
          description,
          url: path,
          breadcrumbId,
          // mainEntity is the Service we actually describe — never a fake
          // town-level business.
          primaryEntityId: `${BASE_URL}${path}#service`,
        }),
      ];
      if (input.faqs?.length) out.push(faqSchema(input.faqs));
      return out;
    }

    case "county": {
      const state = input.county.state || "NC";
      const path = `/service-areas/county/${input.county.slug}`;
      const breadcrumbId = `${BASE_URL}${path}#breadcrumb`;
      const name = `Roofing & Construction Services in ${input.county.name}, ${state}`;
      const description = input.page?.description || input.county.description || BUSINESS.description;
      const out: Record<string, unknown>[] = [
        ...businessGraph(),
        countyServiceSchema({ name: input.county.name, state }, { url: path, name, description }),
        breadcrumbSchema(
          [
            { name: "Home", url: "/" },
            { name: "Service Areas", url: "/service-areas" },
            { name: `${input.county.name}, ${state}`, url: path },
          ],
          breadcrumbId,
        ),
        webPageSchema({
          name: input.page?.title || name,
          description,
          url: path,
          breadcrumbId,
          primaryEntityId: `${BASE_URL}${path}#service`,
        }),
      ];
      if (input.faqs?.length) out.push(faqSchema(input.faqs));
      return out;
    }

    case "service": {
      const out: Record<string, unknown>[] = [
        serviceSchema(input.service),
        ...businessGraph(),
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
        ...businessGraph(),
        breadcrumbSchema(input.breadcrumbs),
      ];
      if (input.faqs?.length) out.push(faqSchema(input.faqs));
      return out;
    }

    case "article":
      return [articleSchema(input.article), breadcrumbSchema(input.breadcrumbs)];

    case "reviews":
      // Review nodes for the reviews actually rendered on this page, attached to
      // the existing #business entity. No aggregateRating here: the visible
      // 4.8 / 158 covers ALL Google reviews, not just these ten, so emitting it
      // alongside them would markup a rating the page does not itself show.
      return [...businessGraph(), ...reviewNodes()];

    case "contact": {
      const out: Record<string, unknown>[] = [contactPageSchema(input.path), ...businessGraph()];
      if (input.breadcrumbs?.length) out.push(breadcrumbSchema(input.breadcrumbs));
      return out;
    }

    case "tool": {
      return [howToSchema(input.howTo), breadcrumbSchema(input.breadcrumbs)];
    }

    case "location": {
      const breadcrumbId = `${BASE_URL}${input.path}#breadcrumb`;
      const out: Record<string, unknown>[] = [
        ...businessGraph(),
        breadcrumbSchema(input.breadcrumbs, breadcrumbId),
        webPageSchema({
          name: input.page.title,
          description: input.page.description,
          url: input.path,
          breadcrumbId,
          primaryEntityId: `${BASE_URL}/#${input.locationId}-showroom`,
        }),
      ];
      if (input.faqs?.length) out.push(faqSchema(input.faqs));
      return out;
    }


    case "generic": {
      const out: Record<string, unknown>[] = [breadcrumbSchema(input.breadcrumbs)];
      if (input.faqs?.length) out.push(faqSchema(input.faqs));
      return out;
    }
  }

};
