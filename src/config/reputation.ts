/**
 * Reputation figures — the ONE place a rating may be read from (Task 3, 7 Sep
 * 2026 work order). Every value is derived from src/data/business.ts so the
 * verified Google Business Profile numbers live in exactly one record; this
 * module only exposes them under the names the work order asked for.
 *
 * Never type a rating or review count into a component. Render with
 * `REVIEW_LINE` ("4.8★ · 158 Google reviews") or the helpers below.
 */
import {
  BUSINESS,
  FRANKLIN,
  SYLVA,
  REVIEW_AS_OF,
  REVIEW_COUNT,
  REVIEW_LINE,
  REVIEW_RATING,
  REVIEW_RATING_VALUE,
} from "@/data/business";

/** Sitewide Google rating (the Franklin profile carries the business-wide figure). */
export const GOOGLE_RATING = REVIEW_RATING_VALUE;
export const GOOGLE_REVIEW_COUNT = REVIEW_COUNT;
/** "September 2026" — month and year the figures were last verified. */
export const RATING_AS_OF = new Date(BUSINESS.reviewSummary.lastVerified).toLocaleDateString("en-US", {
  month: "long",
  year: "numeric",
});
/** Same value with the "as of" prefix, for inline copy. */
export const RATING_AS_OF_LINE = REVIEW_AS_OF;

export const FRANKLIN_RATING = FRANKLIN.googleRating ?? GOOGLE_RATING;
export const FRANKLIN_REVIEWS = FRANKLIN.googleReviewCount ?? GOOGLE_REVIEW_COUNT;
export const SYLVA_RATING = SYLVA.googleRating ?? GOOGLE_RATING;
export const SYLVA_REVIEWS = SYLVA.googleReviewCount ?? GOOGLE_REVIEW_COUNT;

/** "4.8 · 158 Google reviews" — never a bare number. */
export const ratingLine = (rating: number = GOOGLE_RATING, count: number = GOOGLE_REVIEW_COUNT) =>
  `${rating.toFixed(1)} · ${count} Google reviews`;

export { REVIEW_LINE, REVIEW_RATING };
