/**
 * SINGLE SOURCE OF TRUTH for the business identity (NAP, profiles, hours).
 *
 * Every surface — JSON-LD schema, Footer, Contact page, AnswerBlocks, geo meta
 * tags, llms.txt, and the static Organization node in index.html — must read
 * from this file. `src/test/business-identity.test.ts` fails the build if a
 * street address or phone number is hard-coded anywhere else under `src/`.
 */

export interface BusinessHours {
  /** Schema.org day names, e.g. ["Monday", ...] */
  days: string[];
  /** 24h "HH:MM" */
  opens: string;
  /** 24h "HH:MM" */
  closes: string;
  /** Human-readable label used in UI. */
  label: string;
}

export interface BusinessLocation {
  id: "franklin" | "sylva";
  name: string;
  streetAddress: string;
  locality: string;
  region: string;
  postalCode: string;
  /** E.164-style, dashed for schema.org (`+1-828-524-7773`). */
  phoneE164: string;
  geo: { lat: number; lng: number };
  /** Google Business Profile CID (numeric). */
  gbpCid: string;
  hours: BusinessHours[];
  primary?: boolean;
}

/**
 * Live Google review figures. These are the ONLY numbers allowed in
 * `aggregateRating` markup, and they may only be emitted on /reviews, where
 * the same figures are visible on the page. Update `lastVerified` whenever
 * the owner refreshes the numbers from the Google Business Profile.
 */
export interface ReviewSummary {
  ratingValue: number;
  reviewCount: number;
  source: string;
  sourceUrl: string;
  /** ISO date the figures were last read off Google. */
  lastVerified: string;
}

export interface BusinessIdentity {
  brandName: string;
  legalName: string;
  alternateNames: string[];
  primaryPhoneE164: string;
  email: string;
  websiteUrl: string;
  foundingYear: number;
  licenseNumber: string;
  slogan: string;
  description: string;
  /**
   * Schema.org priceRange. Left undefined until the owner approves a value —
   * an unapproved price band is a claim we cannot support.
   */
  priceRange?: string;
  reviewSummary: ReviewSummary;
  locations: BusinessLocation[];
  profiles: string[];
  /** Counties named in `areaServed` alongside the served city list. */
  countiesServed: { name: string; region: string }[];
  /** Named people who can author content (schema.org Person). */
  people: { slug: string; name: string; jobTitle: string }[];
}


const STANDARD_HOURS: BusinessHours[] = [
  {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "17:00",
    label: "Monday – Friday, 8:00 AM – 5:00 PM",
  },
];

export const GBP_MAP_URL = (cid: string) => `https://www.google.com/maps?cid=${cid}`;

const FRANKLIN_CID = "1442261483869937048";
const SYLVA_CID = "1690022713833215904";

export const BUSINESS: BusinessIdentity = {
  brandName: "Highlander Building Services",
  legalName: "Highlander Building Services, Inc.",
  alternateNames: ["Highlander Roofing Services", "Highlander Roofing Services, Inc."],
  primaryPhoneE164: "+1-828-524-7773",
  email: "info@highlandernc.com",
  websiteUrl: "https://highlandernc.com",
  foundingYear: 2017,
  licenseNumber: "NC GC #87668",
  slogan: "Built for the Mountains. Built for Life.",
  description:
    "Premium roofing and construction company serving Western North Carolina mountain communities since 2017. Specializing in storm-resistant roofing, metal roofing, home additions, renovations, and outdoor living for elevation-rated homes.",
  locations: [
    {
      id: "franklin",
      name: "Franklin Showroom",
      streetAddress: "76 Creative Dr",
      locality: "Franklin",
      region: "NC",
      postalCode: "28734",
      phoneE164: "+1-828-524-7773",
      geo: { lat: 35.1821, lng: -83.3807 },
      gbpCid: FRANKLIN_CID,
      hours: STANDARD_HOURS,
      primary: true,
    },
    {
      id: "sylva",
      name: "Sylva Showroom",
      streetAddress: "28 Cross Stitch Mountain Rd",
      locality: "Sylva",
      region: "NC",
      postalCode: "28779",
      phoneE164: "+1-828-476-4000",
      geo: { lat: 35.3585, lng: -83.1812 },
      gbpCid: SYLVA_CID,
      hours: STANDARD_HOURS,
    },
  ],
  profiles: [
    GBP_MAP_URL(FRANKLIN_CID),
    GBP_MAP_URL(SYLVA_CID),
    "https://www.bbb.org/us/nc/franklin/profile/roofing-contractors/highlander-roofing-services-inc-0473-815019",
    "https://www.facebook.com/highlanderroof",
    "https://www.instagram.com/highlanderroofingservices/",
    "https://www.linkedin.com/company/highlander-roofing-services-inc/",
    "https://nextdoor.com/pages/highlander-roofing-services-inc-franklin-nc/",
    "https://www.yelp.com/biz/highlander-roofing-services-franklin",
    "https://www.angi.com/companylist/us/nc/franklin/highlander-roofing-services-inc-reviews.htm",
    "https://www.homeadvisor.com/rated.HighlanderRoofing.106236934.html",
    "https://business.cashiersareachamber.com/member-directory/Details/highlander-roofing-services-3458221",
    "https://business.mountainlovers.com/list/member/highlander-roofing-services-inc",
    "https://www.smokymountainhba.com/members",
  ],
};

/* ── Derived helpers — never re-type these values elsewhere ── */

export const FRANKLIN = BUSINESS.locations[0];
export const SYLVA = BUSINESS.locations[1];

/** "+1-828-524-7773" → "(828) 524-7773" */
export const formatPhoneDisplay = (e164: string) => {
  const d = e164.replace(/\D/g, "").replace(/^1/, "");
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
};

/** "+1-828-524-7773" → "828-524-7773" */
export const formatPhonePlain = (e164: string) => e164.replace(/^\+1-/, "");

/** "+1-828-524-7773" → "tel:+18285247773" */
export const telHref = (e164: string) => `tel:+${e164.replace(/\D/g, "")}`;

/** "76 Creative Dr, Franklin, NC 28734" — exact GBP NAP line. */
export const napLine = (loc: BusinessLocation) =>
  `${loc.streetAddress}, ${loc.locality}, ${loc.region} ${loc.postalCode}`;

export const directionsUrl = (loc: BusinessLocation) => GBP_MAP_URL(loc.gbpCid);

export const PHONE_DISPLAY = formatPhoneDisplay(BUSINESS.primaryPhoneE164);
export const PHONE_PLAIN = formatPhonePlain(BUSINESS.primaryPhoneE164);
export const PHONE_TEL = telHref(BUSINESS.primaryPhoneE164);

export const SYLVA_PHONE_DISPLAY = formatPhoneDisplay(SYLVA.phoneE164);
export const SYLVA_PHONE_PLAIN = formatPhonePlain(SYLVA.phoneE164);
export const SYLVA_PHONE_TEL = telHref(SYLVA.phoneE164);

export const FRANKLIN_STREET = FRANKLIN.streetAddress;
export const FRANKLIN_NAP = napLine(FRANKLIN);
export const SYLVA_NAP = napLine(SYLVA);
