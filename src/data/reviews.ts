import { REVIEW_SUMMARY, REVIEW_RATING_VALUE, FRANKLIN, SYLVA, GBP_MAP_URL } from "@/data/business";

/**
 * Published customer reviews — every entry is REAL and VERBATIM.
 *
 * RULES FOR THIS FILE (do not relax them):
 *   • `text`, `name` and `date` are copied exactly from the published source.
 *     Never edit, shorten, tidy or "improve" a review. If a card needs to be
 *     shorter, collapse it visually in CSS — the stored string stays whole.
 *   • Every entry MUST carry `source` and `sourceUrl` so provenance is provable.
 *     scripts/check-reviews.mjs fails the build if either is missing.
 *   • Never add an entry that is not published somewhere we can link to.
 *
 * Several reviews name the company "Highlander Roofing" — that is the former
 * trading name, quoted by the customer at the time. It stays as written because
 * altering a real review would falsify it. scripts/seo-check.mjs rule 6 exempts
 * this file's review bodies for exactly that reason, and nothing else.
 */

/** Controlled vocabulary so pages and reviews match on a stable key. */
export type ServiceTag =
  | "roof-replacement"
  | "roof-repair"
  | "storm-damage"
  | "metal-roofing"
  | "gutters"
  | "commercial"
  | "general";

export const SERVICE_LABELS: Record<ServiceTag, string> = {
  "roof-replacement": "Roof replacement",
  "roof-repair": "Roof repair",
  "storm-damage": "Storm damage",
  "metal-roofing": "Metal roofing",
  gutters: "Gutters",
  commercial: "Commercial",
  general: "General",
};

export interface Review {
  id: string;
  name: string;
  rating: number;
  /** ISO date. For `dateApprox` entries this is derived from a relative label. */
  date: string;
  /** Exactly as the source presented it. */
  dateLabel: string;
  /** True when the source published a relative date ("2 weeks ago") and the
   *  ISO date above is therefore derived and approximate. The UI must not
   *  present these as precise. */
  dateApprox?: boolean;
  /** VERBATIM review body. Never edited. */
  text: string;
  service: ServiceTag[];
  town?: string;
  profile: "franklin" | "sylva";
  source: string;
  sourceUrl: string;
}

const GOOGLE_FRANKLIN = GBP_MAP_URL(FRANKLIN.gbpCid);
const GOOGLE_SYLVA = GBP_MAP_URL(SYLVA.gbpCid);
const HOMEADVISOR = "https://www.homeadvisor.com/rated.HighlanderRoofing.68818115.html";

export const REVIEWS: Review[] = [
  {
    id: "jerry-brooks-2023",
    name: "Jerry Brooks",
    rating: 5,
    date: "2023-08-12",
    dateLabel: "August 2023",
    text: "When we realized the 20+ year old roofs of our house and separate workshop needed to be replaced, we interviewed two roofing companies. Following Braden's presentation, we were convinced that we were totally comfortable ONLY with Highlander. Braden did a wonderful job presenting the options for our roofs, and his professional style and thorough description of how the project would be handled, made selecting Highland for this project an easy choice! And we were not disappointed. This large project was completed in 3 days, and there is not one aspect of this project that was not done to perfection. Javier, owner of the company performing the work, was an excellent supervisor of his work crew. All members of the work crew did a great job. In the course of the work none of our plants were damaged, and they did a very thorough job cleaning the property of debris and nails before they left. And the final result was examined carefully by Joel, Highlander's supervisor. Grade A++. We would highly recommend Highlander Roofing to anyone needing a roof replacement. We have encountered few companies and contractors who perform at their level.",
    service: ["roof-replacement"],
    profile: "franklin",
    source: "Google",
    sourceUrl: GOOGLE_FRANKLIN,
  },
  {
    id: "willard-armes-2024",
    name: "Willard Armes",
    rating: 5,
    date: "2024-01-03",
    dateLabel: "January 2024",
    text: "Having discovered a leak over a stormy week end, I left a request for assistance by message at Highlander Roofing. Within the next couple of hours, I received a response letting me know that an emergency crew would be responding to \"tarp\" the leak while awaiting roof repair. As promised, a professional crew responded and immediately stopped the leak. Within the next three weeks, I had a new, professionally looking roof installed at a reasonable price. Outstanding service and my sincere thanks to the entire Highlander Roofing Team!",
    service: ["storm-damage", "roof-replacement"],
    profile: "franklin",
    source: "Google",
    sourceUrl: GOOGLE_FRANKLIN,
  },
  {
    id: "jh-dillsboro-2019",
    name: "J H.",
    rating: 5,
    date: "2019-04-01",
    dateLabel: "April 2019",
    text: "Josh and his crew are fantastic and I highly recommend this company for their conscientious approach and speed in service delivery. I sustained a 5-in hole in my garage roof in Dillsboro(long story) and called Highlander in some desperation given rain that evening in the forecast. Josh came by that morning, scoped the job, and then swung by with a crew that same afternoon and replaced the plywood between the rafters and matched the shingles in a seamless job, then cleaned up so well you couldn't tell they had been there. I can't thank the team at Highlander Roofing enough - they are my roofer from here on!",
    service: ["storm-damage", "roof-repair"],
    town: "Dillsboro",
    profile: "sylva",
    source: "HomeAdvisor",
    sourceUrl: HOMEADVISOR,
  },
  {
    id: "claire-proctor-2026",
    name: "Claire Proctor",
    rating: 5,
    date: "2026-09-07",
    dateLabel: "2 days ago",
    dateApprox: true,
    text: "I had a great experience with Highlander Roofing. They were very responsive, showed up when they said they would and did great work fixing the gutters on my house. Very professional and appreciate how easy they were to work with!",
    service: ["gutters"],
    profile: "franklin",
    source: "Google",
    sourceUrl: GOOGLE_FRANKLIN,
  },
  {
    id: "david-christopher-2026",
    name: "David Christopher",
    rating: 5,
    date: "2026-08-26",
    dateLabel: "2 weeks ago",
    dateApprox: true,
    text: "We are very pleased with the new roof and new gutters that Highlander installed on our cabin. Everyone was very nice and even with all the recent rain, completed our work in timely fashion.",
    service: ["roof-replacement", "gutters"],
    profile: "franklin",
    source: "Google",
    sourceUrl: GOOGLE_FRANKLIN,
  },
  {
    id: "zary-m-2024",
    name: "Zary M",
    rating: 5,
    date: "2024-01-05",
    dateLabel: "January 2024",
    text: "When you call, ask for Juan & Javo crew. Their crew installed a metal roof on our home and their craftsmanship was excellent. Highly recommended.",
    service: ["metal-roofing"],
    profile: "franklin",
    source: "Google",
    sourceUrl: GOOGLE_FRANKLIN,
  },
  {
    id: "nate-yoder-2023",
    name: "Nate Yoder",
    rating: 5,
    date: "2023-10-14",
    dateLabel: "October 2023",
    text: "We contracted Highlander Roofing to replace our existing shingle roof with new metal roofing. They did a great job and kept us updated throughout the process. We would highly recommend them.",
    service: ["metal-roofing", "roof-replacement"],
    profile: "franklin",
    source: "Google",
    sourceUrl: GOOGLE_FRANKLIN,
  },
  {
    id: "candy-wood-2025",
    name: "Candy Wood",
    rating: 5,
    date: "2025-09-01",
    dateLabel: "a year ago",
    dateApprox: true,
    text: "Highlander Roofing is an exceptional company that truly stands out for their kindness and generosity. They go above and beyond, especially in helping the elderly in our community. Their team is always punctual and professional, showing genuine care for each project. They offer fair pricing and deliver high-quality work, making them a reliable choice for any roofing needs. I highly recommend Highlander Roofing for their commitment to both their craft and their community!",
    service: ["general"],
    profile: "sylva",
    source: "Google",
    sourceUrl: GOOGLE_SYLVA,
  },
  {
    id: "erik-m-2019",
    name: "Erik M.",
    rating: 5,
    date: "2019-12-01",
    dateLabel: "December 2019",
    text: "We opted for the shingle roof. Josh came out and gave an estimate. It included metal and shingle roofs and other additional upgrades and options. The estimate was very thorough and was exactly what the project ended up costing us. And the quality of work is out of this world! I would recommend them over and over again. All of the staff at their sales office are super friendly and knowledgeable with samples of all their products and upgrades in the show room. I don t have any other offers to compare their prices too but the cost seemed very fair for the high quality of work done. I would highly recommend them.",
    service: ["roof-replacement", "metal-roofing"],
    profile: "franklin",
    source: "HomeAdvisor",
    sourceUrl: HOMEADVISOR,
  },
  {
    id: "lorrie-contino-2024",
    name: "Lorrie Contino",
    rating: 5,
    date: "2024-02-10",
    dateLabel: "February 2024",
    text: "We had a gutter leak and needed a downspout on the second story of our home. Highlander roofing came out quickly, quoted us a fair price and then installed the gutter soon after. Everyone we've dealt with has been kind, professional and knowledgeable. We will absolutely use them again and recommend to anyone needing work done!!",
    service: ["gutters"],
    profile: "franklin",
    source: "Google",
    sourceUrl: GOOGLE_FRANKLIN,
  },
];

/**
 * Live Google figures live in `src/data/business.ts` (BUSINESS.reviewSummary).
 * Never re-type them here — the schema and the visible rating must agree.
 * This aggregate covers ALL Google reviews, not just the ten quoted above.
 */
export const GOOGLE_REVIEW_AGGREGATE = {
  ratingValue: REVIEW_RATING_VALUE,
  reviewCount: REVIEW_SUMMARY.reviewCount,
};

const newestFirst = (a: Review, b: Review) => b.date.localeCompare(a.date);

/** Reviews for a service page. Returns [] when nothing matches — callers hide. */
export const reviewsForService = (tags: ServiceTag[], limit?: number): Review[] => {
  const matched = REVIEWS.filter((r) => r.service.some((s) => tags.includes(s))).sort(newestFirst);
  return limit ? matched.slice(0, limit) : matched;
};

/** Reviews for a town page. Only Dillsboro matches today — that is expected. */
export const reviewsForTown = (town: string, limit?: number): Review[] => {
  const key = town.trim().toLowerCase();
  const matched = REVIEWS.filter((r) => r.town?.toLowerCase() === key).sort(newestFirst);
  return limit ? matched.slice(0, limit) : matched;
};

/** Every service tag that at least one review actually carries. */
export const availableServiceTags = (): ServiceTag[] =>
  (Object.keys(SERVICE_LABELS) as ServiceTag[]).filter((t) =>
    REVIEWS.some((r) => r.service.includes(t)),
  );

/** Every town that at least one review actually names. */
export const availableTowns = (): string[] =>
  [...new Set(REVIEWS.map((r) => r.town).filter((t): t is string => !!t))].sort();

/**
 * Human-facing date. When the source only supplied a relative date, omit the
 * date entirely rather than presenting a derived month as if it were exact.
 */
export const reviewDateLabel = (r: Review): string => {
  if (r.dateApprox) return "";
  const d = new Date(`${r.date}T00:00:00Z`);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
};
