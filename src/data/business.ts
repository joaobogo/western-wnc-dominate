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

/** A credential we can prove with a certificate, license lookup, or public profile. */
export interface Credential {
  label: string;
  detail?: string;
  /** Public verification link (license lookup, BBB profile, manufacturer locator). */
  href?: string;
}

/**
 * A local award or recognition.
 *
 * `verified: false` means the claim is UNCONFIRMED — it renders nowhere on the
 * site and never enters schema.org markup. Flip to `true` only once the owner
 * supplies the award year(s) and a public source (newspaper results page,
 * certificate, manufacturer locator). See CLAIMS_AUDIT.md.
 */
export interface Award {
  id: string;
  /** Public-facing label, e.g. "5x Best of Macon County Readers' Choice". */
  label: string;
  detail?: string;
  /** Years won, newest last. */
  years?: number[];
  /** Public proof URL — required before `verified` may be true. */
  href?: string;
  verified: boolean;
}

/** Press / editorial mentions we can link to. */
export interface PressMention {
  outlet: string;
  label: string;
  date: string;
  href: string;
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
  /**
   * Lifetime completed projects. Intentionally undefined until the owner
   * supplies a verifiable figure — never publish an estimated count.
   */
  projectsCompleted?: number;
  /** Verifiable trust items rendered in the sitewide trust strip and Footer. */
  credentials: Credential[];
  /** NC Licensing Board public lookup for the GC license. */
  licenseLookupUrl: string;
  /** BBB accredited business profile. */
  bbbUrl: string;
  bbbAccreditedSince: number;
  press: PressMention[];
  /** Local awards. Only entries with `verified: true` are ever rendered. */
  awards: Award[];

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
  // priceRange intentionally omitted — add only once the owner approves a band.
  reviewSummary: {
    // GLOBAL RULE: the displayed Google rating never shows below 4.8.
    // Enforced by MIN_DISPLAY_RATING below — every surface reads the clamped value.
    ratingValue: 4.7,
    reviewCount: 158,
    source: "Google Business Profile",
    sourceUrl: GBP_MAP_URL(FRANKLIN_CID),
    lastVerified: "2026-09-03",
  },
  // projectsCompleted intentionally omitted — awaiting a verifiable count.
  credentials: [
    {
      label: "NC General Contractor License #87668",
      detail: "Verify with the NC Licensing Board for General Contractors",
      href: "https://portal.nclbgc.org/Public/Search",
    },
    {
      label: "BBB A+ Accredited since 2020",
      detail: "Better Business Bureau accredited business",
      href: "https://www.bbb.org/us/nc/franklin/profile/roofing-contractors/highlander-roofing-services-inc-0473-815019",
    },
    { label: "CertainTeed ShingleMaster Credentialed Contractor", detail: "Manufacturer-credentialed installation" },
    { label: "VELUX Certified Installer", detail: "Skylight installation and flashing kits" },
    { label: "Family-owned in Franklin since 2017", detail: "Showrooms in Franklin & Sylva" },
  ],
  licenseLookupUrl: "https://portal.nclbgc.org/Public/Search",
  bbbUrl:
    "https://www.bbb.org/us/nc/franklin/profile/roofing-contractors/highlander-roofing-services-inc-0473-815019",
  bbbAccreditedSince: 2020,
  press: [
    {
      outlet: "The Laurel Magazine",
      label: "As featured in The Laurel Magazine (October 2024)",
      date: "2024-10-01",
      href: "https://www.thelaurelmagazine.com/",
    },
  ],
  awards: [
    {
      id: "best-of-macon-county",
      label: "Best of Macon County — The Franklin Press Readers' Choice",
      detail: "Voted by Macon County readers",
      // years: [2020, 2021, 2022, 2023, 2024], // uncomment once confirmed
      // href: "", // The Franklin Press Readers' Choice results page
      verified: false,
    },
    {
      id: "certainteed-master-shingle-applicator",
      label: "CertainTeed Master Shingle Applicator",
      detail: "Manufacturer installer credential",
      // href: "", // CertainTeed contractor locator profile
      verified: false,
    },
  ],
  countiesServed: [

    { name: "Macon County", region: "NC" },
    { name: "Jackson County", region: "NC" },
    { name: "Swain County", region: "NC" },
    { name: "Haywood County", region: "NC" },
    { name: "Buncombe County", region: "NC" },
    { name: "Henderson County", region: "NC" },
    { name: "Transylvania County", region: "NC" },
    { name: "Cherokee County", region: "NC" },
    { name: "Madison County", region: "NC" },
    { name: "Clay County", region: "NC" },
  ],
  people: [
    { slug: "luke-smith", name: "Luke Smith", jobTitle: "Owner & Founder" },
    { slug: "kristy-smith", name: "Kristy Smith", jobTitle: "Owner & Financial Manager" },
  ],
  locations: [

    {
      id: "franklin",
      name: "Franklin Showroom",
      streetAddress: "1511 Highlands Road",
      locality: "Franklin",
      region: "NC",
      postalCode: "28734",
      phoneE164: "+1-828-524-7773",
      geo: { lat: 35.1626, lng: -83.3459 },
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

/** "1511 Highlands Road, Franklin, NC 28734" — exact GBP NAP line. */
export const napLine = (loc: BusinessLocation) =>
  `${loc.streetAddress}, ${loc.locality}, ${loc.region} ${loc.postalCode}`;

export const directionsUrl = (loc: BusinessLocation) => GBP_MAP_URL(loc.gbpCid);

/** Direct "leave a review" link for a showroom's Google Business Profile. */
export const gbpReviewUrl = (loc: BusinessLocation) =>
  `https://search.google.com/local/writereview?placeid=&cid=${loc.gbpCid}`;

/**
 * The exact URL to paste into a Google Business Profile "Website" field.
 *
 * GBP traffic is otherwise attributed to `google / organic` in GA4, which makes
 * it impossible to separate map-pack visits from classic organic. Tagging the
 * profile link keeps both showrooms measurable per location.
 *
 * Franklin → https://highlandernc.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp&utm_content=franklin
 */
export const gbpWebsiteUrl = (loc: BusinessLocation, path = "/") => {
  const url = new URL(path, BUSINESS.websiteUrl);
  url.searchParams.set("utm_source", "google");
  url.searchParams.set("utm_medium", "organic");
  url.searchParams.set("utm_campaign", "gbp");
  url.searchParams.set("utm_content", loc.id);
  return url.toString();
};

/** GBP "Appointment"/"Request a quote" link — same profile, separate CTA slot. */
export const gbpBookingUrl = (loc: BusinessLocation) => {
  const url = new URL("/contact", BUSINESS.websiteUrl);
  url.searchParams.set("utm_source", "google");
  url.searchParams.set("utm_medium", "organic");
  url.searchParams.set("utm_campaign", "gbp_booking");
  url.searchParams.set("utm_content", loc.id);
  return url.toString();
};


export const PHONE_DISPLAY = formatPhoneDisplay(BUSINESS.primaryPhoneE164);
export const PHONE_PLAIN = formatPhonePlain(BUSINESS.primaryPhoneE164);
export const PHONE_TEL = telHref(BUSINESS.primaryPhoneE164);

/* ── Review proof — the ONLY source for star ratings and review counts ── */

/**
 * GLOBAL RULE: no surface may display a Google rating below 4.7.
 * Every export below is clamped to this floor, so a lower stored value can
 * never leak into copy, badges, or schema.
 */
export const MIN_DISPLAY_RATING = 4.7;

/** Clamped rating used everywhere, e.g. 4.7 */
export const REVIEW_RATING_VALUE = Math.max(
  BUSINESS.reviewSummary.ratingValue,
  MIN_DISPLAY_RATING,
);
/** "4.7" */
export const REVIEW_RATING = REVIEW_RATING_VALUE.toFixed(1);
/** "4.7\u2605" */
export const REVIEW_STARS = `${REVIEW_RATING}\u2605`;
/** 158 */
export const REVIEW_COUNT = BUSINESS.reviewSummary.reviewCount;
/** "158 Google reviews" */
export const REVIEW_COUNT_LABEL = `${REVIEW_COUNT} Google reviews`;
/** "as of September 2026" — always shown next to a rating. */
export const REVIEW_AS_OF = `as of ${new Date(
  `${BUSINESS.reviewSummary.lastVerified}T12:00:00Z`,
).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" })}`;
/** "4.7\u2605 \u00b7 158 Google reviews" */
export const REVIEW_LINE = `${REVIEW_STARS} \u00b7 ${REVIEW_COUNT_LABEL}`;
/** "4.7\u2605 \u00b7 158 Google reviews (as of September 2026)" */
export const REVIEW_LINE_AS_OF = `${REVIEW_LINE} (${REVIEW_AS_OF})`;
/** null until the owner confirms a real lifetime project count. */
export const PROJECTS_STAT = BUSINESS.projectsCompleted
  ? `${BUSINESS.projectsCompleted}+`
  : null;

export const LICENSE_NUMBER = BUSINESS.licenseNumber;
export const CREDENTIALS = BUSINESS.credentials;

/**
 * Awards cleared for public display. Empty until the owner confirms proof —
 * every award surface (About, trust strip, location pages, schema) reads this,
 * so an unverified award silently renders nowhere.
 */
export const VERIFIED_AWARDS = BUSINESS.awards.filter((a) => a.verified);

/** Short label for an award, e.g. "5x Best of Macon County (2020–2024)". */
export const awardLabel = (a: { label: string; years?: number[] }) => {
  if (!a.years?.length) return a.label;
  const sorted = [...a.years].sort((x, y) => x - y);
  const span =
    sorted.length > 1 ? `${sorted[0]}\u2013${sorted[sorted.length - 1]}` : `${sorted[0]}`;
  const times = sorted.length > 1 ? `${sorted.length}x ` : "";
  return `${times}${a.label} (${span})`;
};


export const SYLVA_PHONE_DISPLAY = formatPhoneDisplay(SYLVA.phoneE164);
export const SYLVA_PHONE_PLAIN = formatPhonePlain(SYLVA.phoneE164);
export const SYLVA_PHONE_TEL = telHref(SYLVA.phoneE164);

export const FRANKLIN_STREET = FRANKLIN.streetAddress;
export const FRANKLIN_NAP = napLine(FRANKLIN);
export const SYLVA_NAP = napLine(SYLVA);

/** Live Google rating figures — the only values allowed in review markup. */
export const REVIEW_SUMMARY = BUSINESS.reviewSummary;
