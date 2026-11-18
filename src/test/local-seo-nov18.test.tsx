import { readFileSync } from "node:fs";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { indexableServiceTownPairs } from "@/data/service-town-content";
import { INDEXABLE_TOWN_SERVICES } from "@/data/indexable-town-services";
import { getProjectBySlug } from "@/data/projects";
import ProjectSpotlight from "@/components/conversion/ProjectSpotlight";
import TownServiceLinks from "@/components/seo/TownServiceLinks";

const read = (p: string) => readFileSync(p, "utf8");

/** Local SEO analysis, Nov 18 2026: pages 21–50 (John handles the top 20). */
describe("town × service link list", () => {
  it("matches the indexable pages exactly (no link to a hidden page, none missing)", () => {
    const expected: Record<string, string[]> = {};
    for (const p of indexableServiceTownPairs() as Array<{ townSlug: string; serviceSlug: string }>) {
      (expected[p.serviceSlug] ??= []).push(p.townSlug);
    }
    const norm = (m: Record<string, string[]>) =>
      Object.fromEntries(Object.entries(m).map(([k, v]) => [k, [...v].sort()]).sort(([a], [b]) => a.localeCompare(b)));
    expect(norm(INDEXABLE_TOWN_SERVICES)).toEqual(norm(expected));
  });

  it("renders one link per indexable town", () => {
    render(
      <MemoryRouter>
        <TownServiceLinks service="metal-roofing" label="metal roofing" heading="Metal Roofing by Town." />
      </MemoryRouter>,
    );
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(INDEXABLE_TOWN_SERVICES["metal-roofing"].map((t) => `/service-areas/${t}/metal-roofing`));
  });
});

describe("project spotlight", () => {
  it("shows only facts from the project record and links to it", () => {
    const p = getProjectBySlug("cedar-shake-estate-highlands")!;
    render(
      <MemoryRouter>
        <ProjectSpotlight slugs={[p.slug, "no-such-project"]} heading="Spotlight" />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { name: p.title })).toBeTruthy();
    expect(screen.getByText(`${p.scope} · ${p.duration}`)).toBeTruthy();
    expect(screen.getByRole("link").getAttribute("href")).toBe(`/projects/${p.slug}`);
  });

  it("renders nothing when no slug matches", () => {
    const { container } = render(
      <MemoryRouter>
        <ProjectSpotlight slugs={["no-such-project"]} heading="Spotlight" />
      </MemoryRouter>,
    );
    expect(container.innerHTML).toBe("");
  });

  it("each page in the plan carries its matching real project", () => {
    const plan: Record<string, string> = {
      "src/pages/SpecialtyRoofing.tsx": "cedar-shake-estate-highlands",
      "src/pages/SyntheticRoofing.tsx": "brava-synthetic-shake-glenville",
      "src/pages/MetalRoofing.tsx": "standing-seam-metal-dark-bronze-highlands",
      "src/pages/MetalRoofingCost.tsx": "standing-seam-metal-dark-bronze-highlands",
      "src/pages/HomeAdditions.tsx": "living-room-addition-franklin",
      "src/pages/ResidentialRoofing.tsx": "certainteed-landmark-weathered-wood-waynesville",
    };
    for (const [file, slug] of Object.entries(plan)) {
      expect(getProjectBySlug(slug), slug).toBeTruthy();
      expect(read(file), file).toMatch(new RegExp(`<ProjectSpotlight[\\s\\S]*?"${slug}"`));
    }
  });
});

describe("internal links from the analysis", () => {
  it("cost pages link to the town pages; design links to additions and renovations", () => {
    expect(read("src/pages/MetalRoofingCost.tsx")).toContain('service="metal-roofing"');
    expect(read("src/pages/RoofingCostWNC.tsx")).toContain('service="roof-replacement"');
    const design = read("src/pages/ConstructionDesign.tsx");
    expect(design).toContain('href: "/construction/additions"');
    expect(design).toContain('href: "/construction/renovations"');
  });
});
