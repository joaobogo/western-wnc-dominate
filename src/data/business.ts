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
  /**
   * Direct "write a review" link copied from the Business Profile →
   * "Ask for reviews" screen (a https://g.page/r/…/review or
   * https://search.google.com/local/writereview?placeid=… URL). Until the
   * owner pastes it, the value is a REPLACE_WITH_… placeholder: gbpReviewUrl()
   * then falls back to the profile's Maps URL and the build prints a warning.
   */
  reviewUrl: string;
  /** This location's own Google Business Profile figures (Task 3, 7 Sep 2026 work order). */
  googleRating?: number;
  googleReviewCount?: number;
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
  /** ISO incorporation date (BBB profile: incorporated 21 Jun 2017). */
  foundingDate: string;
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
  // 15 Sep 2026 SEO audit (Critical A): every external profile, the Google
  // reviews and 119 of 122 brand clicks still use the former trading name, so
  // Google and the AI engines were treating the two names as two businesses.
  // alternateName in the Organization schema is the machine-readable form of
  // the footer's "formerly" line and ties the entity back together. It is
  // metadata only — copy, titles and meta descriptions still use the new name.
  alternateNames: ["Highlander Roofing Services", "Highlander Roofing Services, Inc."],
  primaryPhoneE164: "+1-828-524-7773",
  email: "info@highlandernc.com",
  websiteUrl: "https://highlandernc.com",
  foundingYear: 2017,
  foundingDate: "2017-06-21",
  licenseNumber: "NC GC #87668",
  slogan: "Built for the Mountains. Built for Life.",
  // T7 (15 Sep 2026 SEO spec): ONE canonical entity description, used verbatim
  // in the Organization schema, llms.txt, the About page and both Google
  // Business Profile descriptions. Every fact is verifiable: the licence number
  // and credentials are in the footer, the incorporation date is on the BBB
  // profile, both addresses are in `locations` below. Do not add a claim here
  // that cannot be checked from a public record — answer engines cross-check.
  description:
    "Highlander Building Services, Inc. is a licensed roofing contractor and North Carolina General Contractor (license #87668), founded in 2017 by Luke and Kristy Smith and based at 40 Depot Street in Franklin, North Carolina, with a second showroom in Sylva. The company installs standing seam and exposed-fastener metal roofing, CertainTeed shingle systems, cedar shake and Brava synthetic roofing, seamless gutters, skylights, additions and outdoor living spaces for mountain homes across Western North Carolina.",
  priceRange: "$$", // set per the 7 Sep 2026 work order (Task 6)
  reviewSummary: {
    // Single source of truth for every rating badge and JSON-LD node.
    // Owner-confirmed 2026-09-04 (João): Google shows 4.8.
    ratingValue: 4.8,
    reviewCount: 158,
    source: "Google Business Profile",
    sourceUrl: GBP_MAP_URL(FRANKLIN_CID),
    lastVerified: "2026-09-04",
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
    {
      label: "CertainTeed Credentialed Contractor",
      detail: "CertainTeed roofing-system training; specific warranty eligibility and terms are confirmed per project",
    },
    { label: "VELUX Certified Installer", detail: "Skylight installation and flashing kits" },
    { label: "Family-owned in Franklin since 2017", detail: "Showrooms in Franklin & Sylva" },
  ],
  licenseLookupUrl: "https://portal.nclbgc.org/Public/Search",
  bbbUrl:
    "https://www.bbb.org/us/nc/franklin/profile/roofing-contractors/highlander-roofing-services-inc-0473-815019",
  bbbAccreditedSince: 2020,
  // No press mention is rendered until we have the actual article URL.
  // A publication homepage is not sufficient proof for a specific feature.
  press: [],
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
      streetAddress: "40 Depot Street",
      locality: "Franklin",
      region: "NC",
      postalCode: "28734",
      phoneE164: "+1-828-524-7773",
      // Google Maps Geocoding API, ROOFTOP result for the full confirmed
      // postal address, verified 2026-10-05.
      geo: { lat: 35.1759293, lng: -83.3738888 },
      gbpCid: FRANKLIN_CID,
      reviewUrl: "https://search.google.com/local/writereview?placeid=ChIJcZElgY0kWYgRhfHuUQ2IrBw",
      googleRating: 4.8,
      googleReviewCount: 158,
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
      reviewUrl: "https://search.google.com/local/writereview?placeid=ChIJzRXuBmttWYgR8QpnoWftXl8",
      googleRating: 5.0,
      googleReviewCount: 26,
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
    "https://www.buildzoom.com/contractor/highlander-roofing-services-inc",
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

/** "40 Depot Street, Franklin, NC 28734" — exact confirmed NAP line. */
export const napLine = (loc: BusinessLocation) =>
  `${loc.streetAddress}, ${loc.locality}, ${loc.region} ${loc.postalCode}`;

/**
 * Franklin moved while its Business Profile is being updated, so navigation
 * must target the confirmed postal address rather than the retained profile
 * CID. Sylva continues to use its established profile destination.
 */
export const directionsUrl = (loc: BusinessLocation) =>
  loc.id === "franklin"
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(napLine(loc))}`
    : GBP_MAP_URL(loc.gbpCid);

/** A reviewUrl that has not been pasted from the Business Profile yet. */
export const isReviewUrlPlaceholder = (loc: BusinessLocation) =>
  /^REPLACE_WITH_/.test(loc.reviewUrl) || !/^https:\/\//.test(loc.reviewUrl);

/**
 * Direct "leave a review" link for a showroom's Google Business Profile —
 * the exact URL from the profile's "Ask for reviews" screen (loc.reviewUrl).
 * The old `writereview?placeid=&cid=` form had an empty placeid and did not
 * open the review dialog reliably. While the value is still a placeholder the
 * link falls back to the profile's Maps page (which carries its own "Write a
 * review" button) so nothing broken ever ships; scripts/seo-regression-check.mjs
 * warns until the real link is in place.
 */
export const gbpReviewUrl = (loc: BusinessLocation) =>
  isReviewUrlPlaceholder(loc) ? GBP_MAP_URL(loc.gbpCid) : loc.reviewUrl;

/**
 * The exact URL to paste into a Google Business Profile "Website" field.
 *
 * GBP traffic is otherwise attributed to `google / organic` in GA4, which makes
 * it impossible to separate map-pack visits from classic organic. Tagging the
 * profile link keeps both showrooms measurable per location.
 *
 * The value MUST match what is configured on the live profile — Search Console
 * reports the profile URL exactly as configured, so a mismatch loses the
 * ability to measure the map pack. The live Franklin profile uses
 * `utm_campaign=gbp_profile`; `utm_content` carries the location id.
 *
 * Franklin → https://highlandernc.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp_profile&utm_content=franklin
 * Sylva    → https://highlandernc.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp_profile&utm_content=sylva
 *
 * The canonical never carries these params (normalizeCanonicalPath strips the
 * query) and GTM's container load records the tagged first pageview; later SPA
 * navigations drop the query naturally.
 */
export const GBP_PROFILE_CAMPAIGN = "gbp_profile";

export const gbpWebsiteUrl = (loc: BusinessLocation, path = "/") => {
  const url = new URL(path, BUSINESS.websiteUrl);
  url.searchParams.set("utm_source", "google");
  url.searchParams.set("utm_medium", "organic");
  url.searchParams.set("utm_campaign", GBP_PROFILE_CAMPAIGN);
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

/** Number of counties in the canonical service-area list. */
export const COUNTY_COUNT = BUSINESS.countiesServed.length;
/** Public staffed-hours label, sourced from the primary showroom. */
export const PRIMARY_HOURS_LABEL = FRANKLIN.hours[0]?.label ?? "";

/* ── Review proof — the ONLY source for star ratings and review counts ── */

/**
 * GLOBAL RULE: the rating is stored once, in BUSINESS.reviewSummary, and is
 * never re-typed or adjusted. Rendered badges and JSON-LD read this value so
 * server HTML and the hydrated app always agree.
 */

/** Single source of truth for the displayed rating, currently 4.8. */
export const REVIEW_RATING_VALUE = BUSINESS.reviewSummary.ratingValue;
/** "4.8" */
export const REVIEW_RATING = REVIEW_RATING_VALUE.toFixed(1);
/** "4.8\u2605" */
export const REVIEW_STARS = `${REVIEW_RATING}\u2605`;
/** 158 */
export const REVIEW_COUNT = BUSINESS.reviewSummary.reviewCount;
/** "158 Google reviews" */
export const REVIEW_COUNT_LABEL = `${REVIEW_COUNT} Google reviews`;
/** "as of September 2026" — always shown next to a rating. */
export const REVIEW_AS_OF = `as of ${new Date(
  `${BUSINESS.reviewSummary.lastVerified}T12:00:00Z`,
).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" })}`;
/** "4.8\u2605 \u00b7 158 Google reviews" */
export const REVIEW_LINE = `${REVIEW_STARS} \u00b7 ${REVIEW_COUNT_LABEL}`;
/** "4.8\u2605 \u00b7 158 Google reviews (as of September 2026)" */
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
