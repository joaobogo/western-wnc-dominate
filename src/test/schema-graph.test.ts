import { describe, it, expect } from "vitest";
import { buildPageSchema, localBusinessSchema, businessGraph } from "@/components/SEOHead";
import { BUSINESS } from "@/data/business";
import { REVIEWS } from "@/data/reviews";

const BUSINESS_ID = "https://highlandernc.com/#business";
const ALLOWED_STREETS = BUSINESS.locations.map((l) => l.streetAddress);

const typesOf = (n: Record<string, unknown>) => {
  const t = n["@type"];
  return Array.isArray(t) ? (t as string[]) : t ? [t as string] : [];
};

const town = {
  name: "Highlands",
  slug: "highlands-nc",
  county: "Macon County",
  state: "NC",
  description: "Roofing in Highlands.",
};

describe("structured data graph", () => {
  it("has exactly one #business node per page", () => {
    for (const nodes of [
      buildPageSchema({ type: "home" }),
      buildPageSchema({ type: "town", town }),
      buildPageSchema({ type: "county", county: { name: "Macon County", slug: "macon" } }),
    ]) {
      expect(nodes.filter((n) => n["@id"] === BUSINESS_ID)).toHaveLength(1);
    }
  });

  it("only the two showrooms carry a street address", () => {
    const nodes = [...buildPageSchema({ type: "home" }), ...businessGraph()];
    for (const node of nodes) {
      const addr = node.address as { streetAddress?: string } | undefined;
      if (addr?.streetAddress) expect(ALLOWED_STREETS).toContain(addr.streetAddress);
    }
  });

  it("town pages describe a Service, not a town-level business", () => {
    const nodes = buildPageSchema({ type: "town", town });
    const service = nodes.find((n) => typesOf(n).includes("Service"));
    expect(service).toBeTruthy();
    expect((service as Record<string, unknown>).provider).toEqual({ "@id": BUSINESS_ID });
    const webPage = nodes.find((n) => typesOf(n).includes("WebPage")) as Record<string, unknown>;
    expect(webPage.mainEntity).toEqual({ "@id": "https://highlandernc.com/service-areas/highlands-nc#service" });
  });

  it("never emits aggregateRating outside /reviews", () => {
    const nodes = [
      ...buildPageSchema({ type: "home" }),
      ...buildPageSchema({ type: "town", town }),
      ...buildPageSchema({ type: "generic", breadcrumbs: [{ name: "Home", url: "/" }] }),
    ];
    expect(nodes.some((n) => "aggregateRating" in n)).toBe(false);
  });

  it("emits NO review markup on /reviews (15 Sep 2026 SEO spec, T8)", () => {
    const nodes = buildPageSchema({ type: "reviews" });

    // Every review on this page was collected on Google. Google's
    // structured-data policy forbids marking up reviews gathered on a
    // third-party site, so the page emits the business graph and nothing else.
    expect(nodes.some((n) => (n as Record<string, unknown>)["@type"] === "Review")).toBe(false);
    expect(nodes.some((n) => "aggregateRating" in n)).toBe(false);
    expect(nodes.some((n) => String((n as Record<string, unknown>)["@id"]).endsWith("#business"))).toBe(true);
  });

  it("every published review carries a traceable source", () => {
    for (const r of REVIEWS) {
      expect(r.source?.trim(), `${r.id} has no source`).toBeTruthy();
      expect(r.sourceUrl, `${r.id} has no absolute sourceUrl`).toMatch(/^https:\/\//);
      expect(r.text.trim().length, `${r.id} has empty text`).toBeGreaterThan(20);
    }
  });

  it("business node points at both showrooms and omits department", () => {
    const b = localBusinessSchema() as Record<string, unknown>;
    expect(b.location).toEqual([
      { "@id": "https://highlandernc.com/#franklin-showroom" },
      { "@id": "https://highlandernc.com/#sylva-showroom" },
    ]);
    expect(b).not.toHaveProperty("department");
    expect(b.legalName).toBe(BUSINESS.legalName);
    expect(b.sameAs).toEqual(BUSINESS.profiles);
  });
});
