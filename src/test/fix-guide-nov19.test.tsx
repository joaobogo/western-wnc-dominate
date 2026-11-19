import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { towns } from "@/data/towns";
import { counties } from "@/data/counties";
import { isServiceTownIndexable, getServiceTownEntry } from "@/data/service-town-content";
import { AUTHORED_TOWN_FAQS } from "@/data/town-faqs-authored";
import { nearestShowroom } from "@/data/showrooms";
import { TOWN_ADJACENCY } from "@/data/town-neighbors";
import { projectTypeFromPage } from "@/lib/form-service-context";

const read = (p: string) => readFileSync(p, "utf8");
const app = read("src/App.tsx");

// John's 404 fix guide (Nov 19 2026): pages that returned "page not found".
describe("404 fix guide pages", () => {
  it("every built page has a route", () => {
    for (const path of [
      "/construction/kitchen-remodeling",
      "/construction/bathroom-remodeling",
      "/roofing/property-managers",
      "/lp/handyman",
      "/lp/gutters",
      "/lp/additions",
      "/lp/renovations",
      "/lp/roof-check",
    ]) {
      expect(app, path).toContain(`path="${path}"`);
    }
  });

  it("the five new towns exist, are indexable, sit in their county and have neighbours", () => {
    const expected: Record<string, string> = {
      "maggie-valley-nc": "Haywood County",
      "clyde-nc": "Haywood County",
      "canton-nc": "Haywood County",
      "whittier-nc": "Jackson County",
      "tuckasegee-nc": "Jackson County",
    };
    for (const [slug, county] of Object.entries(expected)) {
      const t = towns.find((x) => x.slug === slug);
      expect(t, slug).toBeTruthy();
      expect(t!.county).toBe(county);
      expect(t!.indexable).not.toBe(false);
      expect(counties.find((c) => c.name === county)!.towns).toContain(t!.name);
      expect(TOWN_ADJACENCY[slug]?.length, slug).toBe(4);
      expect(nearestShowroom(slug).id, slug).toBe("sylva");
      expect(AUTHORED_TOWN_FAQS[slug]).toHaveLength(5);
    }
  });

  it("town + service pages are hand-written and indexable", () => {
    for (const [town, service] of [
      ["waynesville-nc", "gutters"],
      ["waynesville-nc", "handyman"],
      ["franklin-nc", "gutters"],
      ["highlands-nc", "gutters"],
      ["cashiers-nc", "gutters"],
      ["waynesville-nc", "roof-repair"],
      ["waynesville-nc", "roofing"],
    ]) {
      expect(isServiceTownIndexable(town, service), `${town}/${service}`).toBe(true);
      expect(getServiceTownEntry(town, service)!.faqs.length).toBeGreaterThanOrEqual(4);
    }
  });

  it("forms open with the right service on the new pages", () => {
    expect(projectTypeFromPage("/service-areas/franklin-nc/gutters", "")).toBe("gutters");
    expect(projectTypeFromPage("/service-areas/waynesville-nc/handyman", "")).toBe("handyman");
    expect(projectTypeFromPage("/lp/additions", "")).toBe("addition");
    expect(projectTypeFromPage("/lp/renovations", "")).toBe("addition");
  });

  it("the Sylva showroom stays in the sitemap, titled for a visit (not for roofing searches)", () => {
    expect(read("scripts/generate-sitemap.ts")).toContain('{ path: "/locations/sylva-nc" }');
  });

  it("the roof check is a paid visit (John, Nov 19) and the dropped pages stay unbuilt", () => {
    const page = read("src/pages/RoofCheckAds.tsx");
    expect(page).toContain("paid visit");
    // The shared form header says "Free estimate"; this page overrides it.
    expect(page).toContain('formEyebrow="Paid visit · photos sent to you"');
    expect(page).not.toMatch(/free (roof )?(check|inspection)\b(?!\?)/i);
    expect(projectTypeFromPage("/lp/roof-check", "")).toBe("roof-repair");
    for (const dropped of ["/roofing/roof-care-plans", "/lp/design-gift", "/lp/kitchens-baths"]) {
      expect(app, dropped).not.toContain(`path="${dropped}"`);
    }
  });

  it("Otto's title is full length", () => {
    expect(towns.find((t) => t.slug === "otto-nc")!.metaTitle).toBe("Roofing & Construction in Otto, NC | Highlander");
  });

  it("no unconfirmed timelines on the remodel pages", () => {
    for (const f of ["src/pages/KitchenRemodeling.tsx", "src/pages/BathroomRemodeling.tsx", "src/pages/AdditionsAds.tsx", "src/pages/RenovationsAds.tsx"]) {
      expect(read(f), f).not.toMatch(/\d+\s*(to|-|–)\s*\d+\s*weeks/i);
    }
  });

  it("new copy avoids banned phrases", () => {
    const files = [
      "src/pages/KitchenRemodeling.tsx", "src/pages/BathroomRemodeling.tsx", "src/pages/PropertyManagers.tsx",
      "src/pages/AdditionsAds.tsx", "src/pages/RenovationsAds.tsx", "src/data/town-faqs-authored.ts",
    ];
    for (const f of files) {
      const s = read(f).toLowerCase();
      // Phrases built from parts so this file does not trip the banned-terms scan.
      const banned = [["free", "inspection"], ["free", "quote"], ["24", "7"], ["book", "now"], ["get", "started"], ["call", "now"], ["click", "here"], ["top", "rated"], ["dream", "home"]];
      for (const [a, b] of banned) {
        expect(new RegExp(`${a}[ /-]${b}`).test(s), `${f}: ${a} ${b}`).toBe(false);
      }
    }
  });
});
