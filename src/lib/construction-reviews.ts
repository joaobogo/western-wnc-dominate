import { REVIEWS, type Review } from "@/data/reviews";

/**
 * Reviews whose own wording names building work beyond a roof (plan §3.2.8:
 * "3 reviews filtered to construction tags … if fewer than 3 exist, show what
 * exists plus the overall rating line. Don't fill in with roofing reviews").
 *
 * Chosen by reading the text, not by guessed tags. As of 22 Nov 2026 only
 * two of Highlander's public Google reviews mention building work:
 *   - google-public-60: sheathing and metal on a barndominium being built;
 *   - google-public-14: roof and siding repair after tree damage.
 * Add an id here when a new review mentions an addition, porch, deck or
 * remodel. Review text is never edited.
 */
export const CONSTRUCTION_REVIEW_IDS = ["google-public-60", "google-public-14"] as const;

/** Words a review must contain to be listed as construction proof. */
export const CONSTRUCTION_WORK_RE = /addition|porch|deck|remodel|renovat|kitchen|bath|barndominium|bardominium|siding|sunroom|patio|building/i;

export const constructionReviews = (limit = 3): Review[] =>
  CONSTRUCTION_REVIEW_IDS.map((id) => REVIEWS.find((r) => r.id === id))
    .filter((r): r is Review => !!r && r.rating >= 4 && CONSTRUCTION_WORK_RE.test(r.text))
    .slice(0, limit);
