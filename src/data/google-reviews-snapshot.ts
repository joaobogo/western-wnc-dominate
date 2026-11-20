/**
 * Typed access to the daily Google reviews snapshot written at build time by
 * scripts/fetch-google-reviews.mjs (from the google-reviews-sync import).
 * Kept free of other app imports so business.ts and reviews.ts can both use it.
 */
import snapshot from "./generated/google-reviews.json";

export type SnapshotProfile = "franklin" | "sylva";

export interface SnapshotSummary {
  rating: number;
  count: number;
  fetchedAt: string;
}

export interface SnapshotReview {
  review_id: string;
  profile: SnapshotProfile;
  author_name: string;
  rating: number;
  comment: string | null;
  created_at_google: string;
}

interface Snapshot {
  generatedOn?: string;
  fetchedAt?: string | null;
  summary?: Partial<Record<SnapshotProfile, SnapshotSummary>>;
  reviews?: SnapshotReview[];
}

const data = snapshot as Snapshot;

/** Day the build ran (YYYY-MM-DD): the seed for the daily review rotation. */
export const SNAPSHOT_DAY: string = data.generatedOn ?? "";

/** Google's own rating and review count for a listing, when the import has them. */
export const liveSummary = (profile: SnapshotProfile): SnapshotSummary | null => {
  const s = data.summary?.[profile];
  return s && s.count > 0 && s.rating > 0 ? s : null;
};

/** Imported Google reviews, as stored (text verbatim). */
export const snapshotReviews = (): SnapshotReview[] => data.reviews ?? [];
