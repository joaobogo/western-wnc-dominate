import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const page = readFileSync("src/pages/ProjectDetail.tsx", "utf8");

describe("project page layout (John, Nov 18 2026: \"the hero and those pages are a little weird\")", () => {
  it("hero sits right under the breadcrumbs (no doubled header padding)", () => {
    // The global header-safety rules pad the first section unless it opts out;
    // `pt-0` also opts out of the rule that ignores .no-header-pad.
    expect(page).toMatch(/<section className="no-header-pad pt-0 [^"]*" aria-labelledby="project-title">/);
  });

  it("shows the whole project photo in a frame, not a darkened full-width strip", () => {
    expect(page).toContain('<figure className="lg:order-2 relative aspect-[4/3]');
    expect(page).not.toContain("motion.img");
    expect(page).not.toContain("via-[hsl(var(--heritage-charcoal)/0.78)]");
  });

  it("states each fact once and has one local next-step block", () => {
    expect(page).not.toContain("The Work at a Glance");
    expect(page).not.toContain("Inspired by this project?");
    expect(page).not.toContain("View Local Service Page");
    expect(page.match(/<ProjectLocationCTA/g)?.length).toBe(1);
  });

  it("photos come before the long write-up", () => {
    expect(page.indexOf("More From This Project")).toBeLessThan(page.indexOf("Inside the Project"));
  });
});

describe("Recent Projects hero", () => {
  const list = readFileSync("src/pages/RecentProjects.tsx", "utf8");
  it("uses the same framed-photo hero, with no washed-out overlay or doubled header space", () => {
    expect(list).toMatch(/<section className="no-header-pad pt-0 [^"]*" aria-labelledby="recent-projects-title">/);
    expect(list).not.toContain("from-secondary/95 via-secondary/75");
    expect(list).not.toContain("hero-clears-header");
  });
});
