import { REVIEW_SUMMARY, REVIEW_RATING_VALUE } from "@/data/business";
export interface CustomerReview {
  authorName: string;
  reviewBody: string;
  ratingValue: number;
  datePublished: string;
  location: string;
  project: string;
  category: "roofing" | "construction" | "storm" | "commercial";
  outcome: string;
  featured?: boolean;
}

/**
 * Live Google figures live in `src/data/business.ts` (BUSINESS.reviewSummary).
 * Never re-type them here — the schema and the visible rating must agree.
 */
export const GOOGLE_REVIEW_AGGREGATE = {
  ratingValue: REVIEW_RATING_VALUE,
  reviewCount: REVIEW_SUMMARY.reviewCount,
};

/** Towns served out of the Sylva showroom; everything else is Franklin. */
const SYLVA_TOWNS = [
  "sylva", "cullowhee", "dillsboro", "webster", "cherokee", "bryson city",
  "whittier", "waynesville", "maggie valley", "clyde", "canton",
];

/**
 * Attribute a review to the showroom that served it, so /reviews can show a
 * per-location breakdown instead of one undifferentiated pile.
 */
export const reviewShowroom = (location: string): "franklin" | "sylva" => {
  const town = location.split(",")[0].trim().toLowerCase();
  return SYLVA_TOWNS.includes(town) ? "sylva" : "franklin";
};

export const customerReviews: CustomerReview[] = [
  {
    authorName: "Sarah M.",
    location: "Highlands, NC",
    ratingValue: 5,
    datePublished: "2025-02-14",
    reviewBody:
      "Highlander replaced our entire roof after storm damage. They handled the insurance paperwork, kept us informed daily, and finished in four days. The roof looks better than the original — and the warranty documentation was delivered at our walkthrough.",
    project: "Full Roof Replacement — Storm Damage",
    category: "storm",
    outcome: "Insurance claim processed. New CertainTeed system installed in 4 days.",
    featured: true,
  },
  {
    authorName: "James T.",
    location: "Franklin, NC",
    ratingValue: 5,
    datePublished: "2024-11-08",
    reviewBody:
      "We had a leak during heavy rain. Highlander was on-site the next morning, found the problem, and had it permanently repaired by afternoon. No upsell, no drama — just honest, competent work at a fair price.",
    project: "Emergency Leak Repair",
    category: "roofing",
    outcome: "Root cause identified and permanently resolved in one visit.",
  },
  {
    authorName: "Linda K.",
    location: "Cashiers, NC",
    ratingValue: 5,
    datePublished: "2025-01-22",
    reviewBody:
      "We've used Highlander for two properties now. Their standing seam metalwork is exceptional — these are the only crews I'd trust at 3,800 feet. They genuinely understand what mountain weather demands.",
    project: "Standing Seam Metal — Two Properties",
    category: "roofing",
    outcome: "Both properties re-roofed with premium standing seam metal systems.",
    featured: true,
  },
  {
    authorName: "Robert & Anne P.",
    location: "Sylva, NC",
    ratingValue: 5,
    datePublished: "2024-10-03",
    reviewBody:
      "From inspection to final walkthrough, everything was documented and communicated clearly. The crew was respectful of our landscaping and finished ahead of schedule. We have the warranty binder to prove the quality.",
    project: "Roof Replacement & Gutter System",
    category: "roofing",
    outcome: "Completed 2 days ahead of schedule. Full warranty package delivered.",
  },
  {
    authorName: "David R.",
    location: "Bryson City, NC",
    ratingValue: 5,
    datePublished: "2024-09-17",
    reviewBody:
      "Highlander built our covered porch and replaced the deck — the craftsmanship is outstanding. Having one team handle roofing and construction meant a single point of contact, one timeline, and zero coordination headaches.",
    project: "Deck & Covered Porch Build",
    category: "construction",
    outcome: "New outdoor living space completed in 3 weeks.",
  },
  {
    authorName: "Mountain Properties LLC",
    location: "Franklin, NC",
    ratingValue: 5,
    datePublished: "2024-08-09",
    reviewBody:
      "We manage 14 rental properties across Macon County. Highlander handles all roofing maintenance, emergency repairs, and documentation. Their consistency and communication make our property management significantly easier.",
    project: "Multi-Property Maintenance Program",
    category: "commercial",
    outcome: "14 properties under a single maintenance agreement.",
  },
  {
    authorName: "Karen W.",
    location: "Waynesville, NC",
    ratingValue: 5,
    datePublished: "2025-03-05",
    reviewBody:
      "After three bad experiences with other contractors, we were skeptical. Highlander changed that completely. James came out personally, gave an honest assessment — no pressure, no upselling. The install crew was clean, fast, and meticulous.",
    project: "Dimensional Shingle Replacement",
    category: "roofing",
    outcome: "CertainTeed Landmark installed with enhanced warranty.",
    featured: true,
  },
  {
    authorName: "Tom & Jill H.",
    location: "Franklin, NC",
    ratingValue: 5,
    datePublished: "2024-07-11",
    reviewBody:
      "Our home addition was a big project and a big decision. Highlander made it manageable — clear timeline, daily updates, clean job site every evening. The finished space feels like it was always part of the house.",
    project: "Home Addition — Master Suite",
    category: "construction",
    outcome: "600 sq ft addition completed on schedule and within budget.",
  },
  {
    authorName: "Chris D.",
    location: "Cullowhee, NC",
    ratingValue: 5,
    datePublished: "2024-06-18",
    reviewBody:
      "Hired them after a hailstorm and they walked me through the entire insurance process. Professional adjustor coordination, quality materials, fast turnaround. Could not have been easier.",
    project: "Storm Damage Roof Replacement",
    category: "storm",
    outcome: "Full roof replacement covered by insurance. Completed in 5 days.",
  },
];