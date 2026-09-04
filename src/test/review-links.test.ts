import { describe, it, expect } from "vitest";
import { BUSINESS, FRANKLIN, SYLVA, GBP_MAP_URL, gbpReviewUrl, isReviewUrlPlaceholder } from "@/data/business";

// "Leave a Google review" links must never ship broken: while the owner has
// not pasted the Business Profile "Ask for reviews" URL yet, the helper falls
// back to the profile's Maps page; once pasted, it returns that URL verbatim.
describe("Google review links", () => {
  it("both showrooms declare a reviewUrl", () => {
    expect(BUSINESS.locations).toHaveLength(2);
    for (const loc of BUSINESS.locations) expect(typeof loc.reviewUrl).toBe("string");
  });

  it("a placeholder falls back to the showroom's Google Maps profile (never an empty placeid)", () => {
    for (const loc of [FRANKLIN, SYLVA]) {
      if (!isReviewUrlPlaceholder(loc)) continue;
      const href = gbpReviewUrl(loc);
      expect(href).toBe(GBP_MAP_URL(loc.gbpCid));
      expect(href).not.toContain("placeid=&");
      expect(href.startsWith("https://")).toBe(true);
    }
  });

  it("a real https review URL is returned verbatim", () => {
    const real = { ...FRANKLIN, reviewUrl: "https://g.page/r/EXAMPLE/review" };
    expect(isReviewUrlPlaceholder(real)).toBe(false);
    expect(gbpReviewUrl(real)).toBe("https://g.page/r/EXAMPLE/review");
  });

  it("anything that is not an https URL counts as a placeholder", () => {
    expect(isReviewUrlPlaceholder({ ...SYLVA, reviewUrl: "REPLACE_WITH_SYLVA_REVIEW_LINK" })).toBe(true);
    expect(isReviewUrlPlaceholder({ ...SYLVA, reviewUrl: "" })).toBe(true);
    expect(isReviewUrlPlaceholder({ ...SYLVA, reviewUrl: "http://insecure.example" })).toBe(true);
  });
});
