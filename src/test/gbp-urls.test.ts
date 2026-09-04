import { describe, it, expect } from "vitest";
import { FRANKLIN, SYLVA, gbpWebsiteUrl, gbpBookingUrl, GBP_PROFILE_CAMPAIGN } from "@/data/business";
import { normalizeCanonicalPath, canonicalUrlFor } from "@/components/SEOHead";

// The Google Business Profile "Website" link must match what is configured on
// the live profile byte for byte (Search Console reports it as configured), and
// the tagged arrival must never leak into the canonical.
describe("GBP website link helper", () => {
  it("uses utm_campaign=gbp_profile and utm_content=<location id>", () => {
    expect(GBP_PROFILE_CAMPAIGN).toBe("gbp_profile");
    expect(gbpWebsiteUrl(FRANKLIN)).toBe(
      "https://highlandernc.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp_profile&utm_content=franklin",
    );
    expect(gbpWebsiteUrl(SYLVA)).toBe(
      "https://highlandernc.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp_profile&utm_content=sylva",
    );
  });

  it("booking link keeps its own campaign so the two CTA slots stay separable", () => {
    expect(gbpBookingUrl(FRANKLIN)).toContain("utm_campaign=gbp_booking");
    expect(gbpBookingUrl(FRANKLIN)).toContain("utm_content=franklin");
  });

  it("the canonical strips the GBP query string", () => {
    const tagged = gbpWebsiteUrl(FRANKLIN);
    expect(normalizeCanonicalPath(tagged)).toBe("/");
    expect(canonicalUrlFor(tagged)).toBe("https://highlandernc.com/");
    expect(canonicalUrlFor(gbpWebsiteUrl(SYLVA, "/locations/sylva-nc"))).toBe("https://highlandernc.com/locations/sylva-nc");
  });
});
