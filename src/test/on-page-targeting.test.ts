import { describe, it, expect } from "vitest";
import { normalizeTitle, normalizeDescription } from "@/lib/seo-length";
import { REVIEW_LINE, napLine, FRANKLIN, SYLVA } from "@/data/business";
import { towns } from "@/data/towns";
import { homeFaqs } from "@/data/home-faqs";

// P3.6 — on-page targeting for the homepage and the four core town pages.
const CORE = ["franklin-nc", "highlands-nc", "cashiers-nc", "sylva-nc"];
const town = (slug: string) => towns.find((t) => t.slug === slug)!;

describe("homepage head (P3.6)", () => {
  const title = "Roofing & Construction in Franklin, NC | Highlander";
  const description = `Roofing in Franklin, Highlands, Cashiers, Sylva and Western NC, with construction for additions, renovations and outdoor living. ${REVIEW_LINE}.`;

  it("description survives the 160-char guard with the rating line intact", () => {
    expect(description.length).toBeLessThanOrEqual(160);
    expect(normalizeDescription(description)).toBe(description);
    expect(normalizeDescription(description)).toContain(REVIEW_LINE);
    expect(description.startsWith("Roofing in Franklin")).toBe(true);
    expect(description).toContain("construction");
  });

  it("title fits the 60-char guard and keeps the primary keyword first", () => {
    const rendered = normalizeTitle(title);
    expect(rendered.length).toBeLessThanOrEqual(60);
    expect(rendered.startsWith("Roofing & Construction in Franklin, NC")).toBe(true);
  });

  it("both showroom NAP lines come from business.ts", () => {
    expect(napLine(FRANKLIN)).toBe("40 Depot Street, Franklin, NC 28734");
    expect(napLine(SYLVA)).toBe("28 Cross Stitch Mountain Rd, Sylva, NC 28779");
  });

  it("homepage FAQ questions exist for the FAQPage schema", () => {
    expect(homeFaqs.length).toBeGreaterThan(3);
  });
});

describe("core town pages (P3.6)", () => {
  it.each(CORE)("%s has a 'Roofers in <Town>, NC' title and a hand-written H1", (slug) => {
    const t = town(slug);
    expect(t.metaTitle.startsWith(`Roofers in ${t.name}, NC`)).toBe(true);
    const rendered = normalizeTitle(t.metaTitle);
    expect(rendered.length).toBeLessThanOrEqual(60);
    expect(rendered.startsWith(`Roofers in ${t.name}, NC`)).toBe(true);
    expect(t.h1).toBeTruthy();
    expect(t.h1!.startsWith(`Roofers in ${t.name}, NC`)).toBe(true);
  });

  it("rendered core titles are unique", () => {
    const rendered = CORE.map((s) => normalizeTitle(town(s).metaTitle));
    expect(new Set(rendered).size).toBe(rendered.length);
  });

  it("no other town borrowed a core H1", () => {
    const others = towns.filter((t) => !CORE.includes(t.slug) && t.h1);
    expect(others).toEqual([]);
  });
});
