import { describe, expect, it, vi } from "vitest";

// When the daily import has Google's own figures, every rating badge, the
// JSON-LD and the "as of" date use them instead of the hand-entered ones.
vi.mock("@/data/generated/google-reviews.json", () => ({
  default: {
    generatedOn: "2026-12-01",
    summary: {
      franklin: { rating: 4.84, count: 191, fetchedAt: "2026-12-01T10:13:00Z" },
      sylva: { rating: 5, count: 33, fetchedAt: "2026-12-01T10:13:00Z" },
    },
    reviews: [],
  },
}));

describe("rating and review count follow the daily Google import", () => {
  it("uses Google's figures, rounded to one decimal, dated the day they were read", async () => {
    const b = await import("@/data/business");
    expect(b.REVIEW_RATING).toBe("4.8");
    expect(b.REVIEW_COUNT).toBe(191);
    expect(b.REVIEW_COUNT_LABEL).toBe("191 Google reviews");
    expect(b.REVIEW_SUMMARY.lastVerified).toBe("2026-12-01");
    expect(b.REVIEW_AS_OF).toBe("as of December 2026");
    expect(b.SYLVA.googleReviewCount).toBe(33);
    expect(b.FRANKLIN.googleReviewCount).toBe(191);
  });
});
