import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { resolveServiceTownHero, REGIONAL_HERO_ALT, REGIONAL_HERO_FALLBACK, toHeroWebp } from "@/lib/service-town-hero";
import { towns } from "@/data/towns";
import { serviceTownContent } from "@/data/service-town-content";
import { projectDetails } from "@/data/projects";

const town = (slug: string) => towns.find((t) => t.slug === slug)!;

describe("service × town hero resolution", () => {
  it("uses a real project photo from the same town when one exists (honest, town-specific alt)", () => {
    const hero = resolveServiceTownHero(town("highlands-nc"), "metal-roofing", "Metal Roofing");
    expect(hero.source).toBe("project-town");
    expect(hero.projectSlug).toBe("standing-seam-metal-dark-bronze-highlands");
    expect(hero.alt).toBe("Metal Roofing by Highlander Building Services in Highlands, NC");
  });

  it("falls back to a same-county project and names the project's town, not the page's", () => {
    // Franklin (Macon County) has no project of its own; Highlands does.
    const hero = resolveServiceTownHero(town("franklin-nc"), "roof-replacement", "Roof Replacement");
    expect(hero.source).toBe("project-county");
    expect(hero.alt).toMatch(/in Highlands, NC$/);
    expect(hero.alt).not.toContain("Franklin");
  });

  it("uses the town image (WebP twin) with a no-town-claim alt when no project matches", () => {
    const hero = resolveServiceTownHero(town("hayesville-nc"), "construction", "Construction");
    expect(["town-image", "regional-fallback"]).toContain(hero.source);
    expect(hero.alt).toBe(REGIONAL_HERO_ALT);
    expect(hero.src).toMatch(/\.webp$/);
  });

  it("never points at a third-party host and every self-hosted hero exists in public/", () => {
    for (const e of serviceTownContent) {
      const t = town(e.townSlug);
      const hero = resolveServiceTownHero(t, e.serviceSlug, e.serviceLabel);
      expect(hero.src).not.toMatch(/^https?:\/\//);
      expect(hero.width).toBeGreaterThan(0);
      expect(hero.height).toBeGreaterThan(0);
      if (hero.src.startsWith("/media/")) {
        expect(existsSync(resolve("public", hero.src.slice(1))), `${hero.src} missing`).toBe(true);
      }
    }
    expect(existsSync(resolve("public", REGIONAL_HERO_FALLBACK.slice(1)))).toBe(true);
  });

  it("every town hero image has a WebP twin", () => {
    for (const t of towns) {
      if (!t.heroImage) continue;
      expect(existsSync(resolve("public", toHeroWebp(t.heroImage).slice(1))), `${t.heroImage} has no .webp twin`).toBe(true);
    }
  });

  it("project heroes are bundled webp assets, not remote URLs", () => {
    for (const p of projectDetails) expect(p.heroImage).not.toMatch(/^https?:\/\/(?!highlandernc\.com)/);
  });
});
