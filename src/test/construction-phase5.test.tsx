import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { workPhotos } from "@/data/work-photos";
import { nearestShowroom } from "@/data/showrooms";
import { TOWN_CONSTRUCTION } from "@/content/construction/towns";
import { hubContent } from "@/content/construction/hub";
import { BLOG_SERVICE_LINKS } from "@/data/blog-service-links";
import { blogPosts } from "@/data/blogs";
import { indexableServiceTownPairs } from "@/data/service-town-content";
import { INDEXABLE_TOWN_SERVICES } from "@/data/indexable-town-services";
import TownConstruction from "@/pages/TownConstruction";

// John's Construction & Design plan (21 Nov 2026), Phase 5: town pages and internal links.

const routes = readFileSync("src/App.tsx", "utf8");
const TOWN_NAME: Record<string, string> = { "franklin-nc": "Franklin", "highlands-nc": "Highlands", "cashiers-nc": "Cashiers", "sylva-nc": "Sylva" };

describe("town construction pages", () => {
  it("cover Franklin, Highlands, Cashiers and the new Sylva page, each with its own route", () => {
    expect(TOWN_CONSTRUCTION.map((t) => t.townSlug)).toEqual(["franklin-nc", "highlands-nc", "cashiers-nc", "sylva-nc"]);
    for (const t of TOWN_CONSTRUCTION) expect(routes).toContain(`path="${t.path}" element={<TownConstruction slug="${t.townSlug}" />}`);
  });

  it("Sylva construction is indexable and listed for the town links", () => {
    expect(indexableServiceTownPairs()).toContainEqual({ townSlug: "sylva-nc", serviceSlug: "construction" });
    expect(INDEXABLE_TOWN_SERVICES.construction).toContain("sylva-nc");
  });

  it("titles and metas are unique, within limits, and don't collide with the hub", () => {
    const titles = [hubContent.title, ...TOWN_CONSTRUCTION.map((t) => t.title)];
    expect(new Set(titles).size).toBe(titles.length);
    for (const t of TOWN_CONSTRUCTION) {
      expect(t.title.length, t.title).toBeLessThanOrEqual(60);
      expect(t.description.length, t.path).toBeLessThanOrEqual(155);
    }
  });

  for (const t of TOWN_CONSTRUCTION) {
    it(`${t.path}: only this town's jobs, local conditions, 3 service links, never new custom homes`, () => {
      for (const id of t.gallery?.ids ?? []) {
        expect(workPhotos.find((p) => p.id === id)?.town, id).toBe(TOWN_NAME[t.townSlug]);
      }
      expect(t.angle!.heading).toBe("Local building conditions");
      expect(t.angle!.paragraphs.join(" ")).toMatch(/feet/);
      expect(t.angle!.paragraphs.join(" ")).toMatch(/[Pp]ermit/);
      expect(t.related).toHaveLength(3);
      for (const l of t.related) expect(routes).toContain(`path="${l.href}"`);
      expect(JSON.stringify(t)).not.toMatch(/custom home|luxury/i);
    });

    it(`${t.path}: renders one H1, two body call buttons, the form, the FAQ and the nearest showroom`, () => {
      render(
        <MemoryRouter initialEntries={[t.path]}>
          <TownConstruction slug={t.townSlug} />
        </MemoryRouter>,
      );
      const main = document.querySelector("main")!;
      expect(main.querySelectorAll("h1")).toHaveLength(1);
      const calls = [...main.querySelectorAll('a[href^="tel:"]')].filter((a) => !a.closest("form") && /^Call \(/.test((a.textContent ?? "").trim()));
      expect(calls.map((a) => a.getAttribute("data-gtm-location"))).toEqual(["construction_hero", "final_cta"]);
      expect(main.querySelector('form[data-gtm-form-name="fast_lead_form"]')).not.toBeNull();
      for (const f of t.faqs) expect(main.textContent).toContain(f.answer);
      expect(main.textContent).toContain(nearestShowroom(t.townSlug).location.streetAddress);
      expect(main.textContent).not.toMatch(/TODO/);
      cleanup();
    });
  }

  it("Highlands and Cashiers copy speaks to seasonal owners", () => {
    for (const slug of ["highlands-nc", "cashiers-nc"]) {
      const t = TOWN_CONSTRUCTION.find((x) => x.townSlug === slug)!;
      expect(JSON.stringify(t)).toMatch(/away/);
    }
  });

  it("the Sylva page features the Sylva deck and the Sylva showroom", () => {
    const sylva = TOWN_CONSTRUCTION.find((x) => x.townSlug === "sylva-nc")!;
    expect(sylva.projectSlug).toBe("deck-railing-rebuild-sylva");
    expect(nearestShowroom("sylva-nc").id).toBe("sylva");
  });
});

describe("internal links (plan §6)", () => {
  it("roofing pages link to roof + addition and the construction hub", () => {
    for (const f of ["RoofingDivision", "RoofReplacement", "ResidentialRoofing", "Skylights"]) {
      expect(readFileSync(`src/pages/${f}.tsx`, "utf8"), f).toContain("<RoofAdditionLine");
    }
    const line = readFileSync("src/components/construction-page/RoofAdditionLine.tsx", "utf8");
    expect(line).toContain('to="/construction/roof-and-addition"');
    expect(line).toContain('to="/construction"');
  });

  it("construction blog posts link to their service page with a keyword anchor", () => {
    const slugs = new Set(blogPosts.map((p) => p.slug));
    for (const [slug, link] of Object.entries(BLOG_SERVICE_LINKS)) {
      expect(slugs.has(slug), slug).toBe(true);
      expect(routes).toContain(`path="${link.href}"`);
      expect(link.anchor).toMatch(/(NC)$/);
    }
    expect(readFileSync("src/pages/BlogPost.tsx", "utf8")).toContain("BLOG_SERVICE_LINKS[post.slug]");
  });

  it("the footer and /services list every new construction page", () => {
    const footer = readFileSync("src/components/Footer.tsx", "utf8");
    const services = readFileSync("src/data/services-hub.ts", "utf8");
    for (const href of ["/construction/screened-porches", "/construction/decks", "/construction/basements", "/construction/roof-and-addition"]) {
      expect(footer, href).toContain(`href: "${href}"`);
      expect(services, href).toContain(`href: "${href}"`);
    }
  });
});
