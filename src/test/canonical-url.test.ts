import { describe, it, expect } from "vitest";
import { canonicalUrlFor, normalizeCanonicalPath } from "@/components/SEOHead";

// One URL shape sitewide: https://highlandernc.com/<path> with NO trailing
// slash; the homepage is the only URL that ends with "/". The sitemap, og:url,
// the prerendered file names and UrlNormalizer all follow this rule.
describe("canonical URL shape", () => {
  it("homepage is exactly https://highlandernc.com/", () => {
    expect(canonicalUrlFor("/")).toBe("https://highlandernc.com/");
    expect(canonicalUrlFor("")).toBe("https://highlandernc.com/");
    expect(canonicalUrlFor("https://highlandernc.com/")).toBe("https://highlandernc.com/");
  });

  it("never ends with a trailing slash for any other route", () => {
    expect(canonicalUrlFor("/service-areas/franklin-nc")).toBe("https://highlandernc.com/service-areas/franklin-nc");
    expect(canonicalUrlFor("/service-areas/franklin-nc/")).toBe("https://highlandernc.com/service-areas/franklin-nc");
    expect(canonicalUrlFor("/roofing//metal///")).toBe("https://highlandernc.com/roofing/metal");
  });

  it("drops query strings and fragments and lowercases the path", () => {
    expect(canonicalUrlFor("/Service-Areas/Highlands-NC?utm_source=google#faq")).toBe(
      "https://highlandernc.com/service-areas/highlands-nc",
    );
    expect(normalizeCanonicalPath("/About/?x=1")).toBe("/about");
  });

  it("accepts a full URL and keeps only its path", () => {
    expect(canonicalUrlFor("https://www.highlandernc.com/reviews/")).toBe("https://highlandernc.com/reviews");
  });
});
