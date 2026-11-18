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
      Object.fromEntries(
        Object.keys(m)
          .sort()
          .map((k) => [k, [...m[k]].sort()]),
      );
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
      "src/pages/RoofReplacement.tsx": "certainteed-landmark-weathered-wood-waynesville",
      "src/pages/RoofingDivision.tsx": "standing-seam-metal-dark-bronze-highlands",
      "src/pages/OutdoorLiving.tsx": "deck-railing-rebuild-sylva",
      "src/pages/ConstructionDivision.tsx": "living-room-addition-franklin",
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

describe("top-20 pages (Nov 18 plan)", () => {
  it("service and hub pages link to their town pages", () => {
    const plan: Record<string, string> = {
      "src/pages/RoofRepair.tsx": "roof-repair",
      "src/pages/StormDamage.tsx": "roof-repair",
      "src/pages/RoofReplacement.tsx": "roof-replacement",
      "src/pages/RoofingDivision.tsx": "roof-replacement",
      "src/pages/OutdoorLiving.tsx": "outdoor-living",
      "src/pages/Renovations.tsx": "construction",
      "src/pages/Siding.tsx": "construction",
      "src/pages/ConstructionDivision.tsx": "construction",
      "src/pages/Gutters.tsx": "gutters",
    };
    for (const [file, service] of Object.entries(plan)) {
      expect(read(file), file).toMatch(new RegExp(`<TownServiceLinks[\\s\\S]*?service="${service}"`));
    }
  });

  it("gutters links to town pages (there are no gutter town pages)", () => {
    render(
      <MemoryRouter>
        <TownServiceLinks service="gutters" label="roofing & gutters" heading="By town" townPages={["franklin-nc", "waynesville-nc"]} />
      </MemoryRouter>,
    );
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(["/service-areas/franklin-nc", "/service-areas/waynesville-nc"]);
  });

  it("homepage links to Franklin, roofing, repair, replacement, gutters and construction", async () => {
    const { MOST_REQUESTED_LINKS } = await import("@/data/most-requested-links");
    expect(MOST_REQUESTED_LINKS.map((l) => l.to)).toEqual([
      "/service-areas/franklin-nc",
      "/roofing",
      "/roofing/roof-repair",
      "/roofing/roof-replacement",
      "/roofing/gutters",
      "/construction",
    ]);
    expect(read("src/pages/Index.tsx")).toContain("<MostRequestedLinks />");
  });

  it("homepage hero keeps its H1 wording", () => {
    const hero = read("src/components/Hero.tsx");
    expect(hero).toContain("Roofing & Construction Contractor in Franklin, NC");
  });
});

describe("town × service project picks (Nov 18 plan)", () => {
  it("lead with the matching real job, then same-division work", async () => {
    const { pickLocalProjects } = await import("@/components/trust/LocalProjectProof");
    const slugs = (town: { name: string; slug: string; county: string }, cat: "roofing" | "construction", prefer?: RegExp) =>
      pickLocalProjects(town, cat, 3, prefer ? (p) => prefer.test(`${p.type} ${p.title}`) : undefined).map((p) => p.project.slug);
    const waynesville = { name: "Waynesville", slug: "waynesville-nc", county: "Haywood County" };
    const highlands = { name: "Highlands", slug: "highlands-nc", county: "Macon County" };
    const franklin = { name: "Franklin", slug: "franklin-nc", county: "Macon County" };
    expect(slugs(waynesville, "roofing")[0]).toBe("certainteed-landmark-weathered-wood-waynesville");
    expect(slugs(waynesville, "roofing")).not.toContain("deck-railing-rebuild-sylva");
    expect(slugs(highlands, "roofing", /metal|standing seam/i)[0]).toBe("standing-seam-metal-dark-bronze-highlands");
    expect(slugs(highlands, "roofing", /metal|standing seam/i)).not.toContain("living-room-addition-franklin");
    expect(slugs(franklin, "construction").slice(0, 2).sort()).toEqual(["deck-railing-rebuild-sylva", "living-room-addition-franklin"]);
  });

  it("service × town pages no longer hide the job whose photo is the hero", () => {
    expect(read("src/pages/ServiceTownPage.tsx")).toContain("excludeImages={hero.projectSlug ? [] : [hero.src]}");
  });
});
