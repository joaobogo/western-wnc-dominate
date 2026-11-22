import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { ComponentType } from "react";
import type { ConstructionPageContent } from "@/content/construction/types";
import { workPhotos } from "@/data/work-photos";
import { hubContent } from "@/content/construction/hub";
import { additionsContent } from "@/content/construction/additions";
import { screenedPorchesContent } from "@/content/construction/screened-porches";
import { decksContent } from "@/content/construction/decks";
import { outdoorLivingContent } from "@/content/construction/outdoor-living";
import { kitchenContent } from "@/content/construction/kitchen";
import { bathContent } from "@/content/construction/bath";
import { designContent, DESIGN_CAPACITY_LIMITED } from "@/content/construction/design";
import { renovationsContent } from "@/content/construction/renovations";
import { basementsContent } from "@/content/construction/basements";
import { roofAndAdditionContent } from "@/content/construction/roof-and-addition";
import ConstructionDesign from "@/pages/ConstructionDesign";
import Renovations from "@/pages/Renovations";
import Basements from "@/pages/Basements";
import RoofAndAddition from "@/pages/RoofAndAddition";

// John's Construction & Design plan (21 Nov 2026), Phase 4: design rewrite, renovations, basements (new), roof + addition (new).

const PAGES: [ConstructionPageContent, ComponentType][] = [
  [designContent, ConstructionDesign],
  [renovationsContent, Renovations],
  [basementsContent, Basements],
  [roofAndAdditionContent, RoofAndAddition],
];
const EARLIER = [hubContent, additionsContent, screenedPorchesContent, decksContent, outdoorLivingContent, kitchenContent, bathContent];
const routes = readFileSync("src/App.tsx", "utf8");
const sitemap = readFileSync("scripts/generate-sitemap.ts", "utf8");

describe("Phase 4 content", () => {
  it("titles and metas are unique and within limits", () => {
    const all = [...EARLIER, ...PAGES.map(([c]) => c)];
    expect(new Set(all.map((c) => c.title)).size).toBe(all.length);
    expect(new Set(all.map((c) => c.description)).size).toBe(all.length);
    for (const c of all) {
      expect(c.title.length, c.title).toBeLessThanOrEqual(60);
      expect(c.description.length, c.path).toBeLessThanOrEqual(155);
    }
  });

  for (const [c] of PAGES) {
    it(`${c.path}: route, sitemap, FAQs, links and photos follow the plan`, () => {
      expect(routes).toContain(`path="${c.path}"`);
      expect(sitemap).toContain(`path: "${c.path}"`);
      expect(c.faqs.length).toBeGreaterThanOrEqual(4);
      expect(c.faqs.length).toBeLessThanOrEqual(6);
      expect(c.related).toHaveLength(3);
      for (const l of [...c.related, ...(c.serviceCards?.cards ?? []), ...(c.angle?.links ?? [])]) {
        const href = l.href.split("#")[0];
        if (href.startsWith("/blog/")) expect(readFileSync("src/data/blog-index.generated.ts", "utf8"), href).toContain(`"${href.slice(6)}"`);
        else expect(routes, href).toContain(`path="${href}"`);
      }
      for (const id of c.gallery?.ids ?? []) expect(workPhotos.some((p) => p.id === id), id).toBe(true);
      // Real photos only in the gallery; generated images are always flagged and labelled.
      for (const img of [c.hero.image, ...(c.examples?.images ?? []), ...(c.serviceCards?.cards.map((x) => x.image) ?? [])]) {
        if (/construction-examples|renovated-kitchen/.test(img.src)) {
          expect(img.example, img.src).toBe(true);
          expect(img.alt).toMatch(/not a Highlander project/);
        }
      }
      // A service with no documented jobs claims no towns.
      if (!c.gallery) expect(c.areaServed).toEqual([]);
    });
  }

  it("the hub has one card per construction service page (plan pages 2–11)", () => {
    const hrefs = hubContent.serviceCards!.cards.map((x) => x.href);
    expect(hrefs).toEqual(expect.arrayContaining([
      "/construction/additions", "/construction/screened-porches", "/construction/decks", "/construction/outdoor-living",
      "/construction/kitchen-remodeling", "/construction/bathroom-remodeling", "/construction/renovations",
      "/construction/basements", "/construction/roof-and-addition", "/construction/design",
    ]));
  });

  it("the old #basements anchor links now point at the basements page", () => {
    for (const f of ["src/components/header/nav-data.ts", "src/components/construction/ConstructionServices.tsx"]) {
      expect(readFileSync(f, "utf8"), f).not.toContain("renovations#basements");
    }
  });

  it("design: Plan Before You Build, three phases, paid-design terms once, no capacity claim until approved", () => {
    expect(designContent.hero.h1).toBe("Plan Before You Build");
    expect(designContent.included!.cards.map((x) => x.title)).toEqual(["Schematic Design", "Permit Set", "Construction Documents"]);
    const blob = JSON.stringify(designContent);
    expect(blob.match(/Design & Consultation Agreement/g)).toHaveLength(1);
    expect(designContent.faqs.some((f) => f.question === "How does paid design work?")).toBe(true);
    if (!DESIGN_CAPACITY_LIMITED) expect(blob).not.toMatch(/limited number/i);
    expect(blob).not.toMatch(/architect|free design|\$\d/i);
  });

  it("renovations and basements lead with the winter angle", () => {
    expect(renovationsContent.hero.subhead).toMatch(/winter/);
    expect(basementsContent.angle!.paragraphs.join(" ")).toMatch(/winter/);
  });
});

describe("Phase 4 pages render", () => {
  for (const [c, Page] of PAGES) {
    it(`${c.path}: one H1, two body call buttons, the form, the FAQ, no TODO, about 1,200 words or fewer`, () => {
      render(
        <MemoryRouter initialEntries={[c.path]}>
          <Page />
        </MemoryRouter>,
      );
      const main = document.querySelector("main")!;
      expect(main.querySelectorAll("h1")).toHaveLength(1);
      const calls = [...main.querySelectorAll('a[href^="tel:"]')].filter((a) => !a.closest("form") && /^Call \(/.test((a.textContent ?? "").trim()));
      expect(calls.map((a) => a.getAttribute("data-gtm-location"))).toEqual(["construction_hero", "final_cta"]);
      expect(main.querySelector('form[data-gtm-form-name="fast_lead_form"]')).not.toBeNull();
      for (const f of c.faqs) expect(main.textContent).toContain(f.answer);
      expect(main.textContent).not.toMatch(/TODO/);
      if (c.hero.image.example) expect(main.textContent).toContain("Design example");
      expect((main.textContent ?? "").split(/\s+/).filter(Boolean).length).toBeLessThanOrEqual(1300);
      cleanup();
    });
  }
});
