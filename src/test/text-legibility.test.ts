import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(path, "utf8");
const walk = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : entry.name.endsWith(".tsx") ? [join(dir, entry.name)] : [],
  );

const css = read("src/index.css");
const pages = walk("src/pages");

/**
 * "Make sure we can always read the letters easily" (John, Nov 2026).
 * Measured cause: every photo hero set its own darkening (0.2 to 0.88) and the
 * gold text on it was the dark ink gold meant for white pages. These tests
 * keep the one shared treatment in place. `npm run contrast:check` measures
 * the real pixels behind every line of text on the built site.
 */
describe("text on photo heroes", () => {
  it("every hero that darkens a photo with the hero overlay uses the shared treatment", () => {
    const missing = pages.filter((file) => {
      const source = read(file);
      const overlay = source.indexOf('bg-gradient-to-r from-[hsl(var(--hero-overlay)');
      if (overlay === -1) return false;
      const section = source.lastIndexOf("<section", overlay);
      const opening = source.slice(section, source.indexOf(">", section));
      return !opening.includes("hero-legible");
    });
    expect(missing).toEqual([]);
  });

  it("the shared treatment replaces the per-page gradients and adds one dark layer", () => {
    expect(css).toMatch(/\.hero-legible > \.absolute:first-child > div:is\([^)]*--hero-overlay[^)]*\)\s*\{\s*display: none;/);
    expect(css).toMatch(/\.hero-legible > \.absolute:first-child::after\s*\{[^}]*linear-gradient/);
  });

  it("centred heroes (town and county pages) keep the even layer on wide screens", () => {
    for (const file of ["src/pages/TownPage.tsx", "src/pages/CountyPage.tsx", "src/pages/ServiceTownPage.tsx"]) {
      expect(read(file)).toContain("hero-legible hero-legible-even");
    }
  });
});

describe("gold text and quiet buttons follow the surface", () => {
  const darkRule = css.slice(css.indexOf("  .dark,\n  .dark-surface,"), css.indexOf("--border-accent", css.indexOf("  .dark,\n  .dark-surface,")));

  it("photo heroes and the charcoal sections count as dark surfaces", () => {
    for (const selector of [".hero-legible", ".bg-heritage-charcoal", ".section-dark", ".bg-primary"]) {
      expect(darkRule).toContain(selector);
    }
    expect(darkRule).toContain("--gold-ink: 38 96% 64%");
    expect(darkRule).toContain("--quiet-btn-fg");
  });

  it("a light card inside a dark surface goes back to dark ink", () => {
    expect(css).toMatch(/:root:not\(\.dark\) :is\([^)]*\.bg-card[^)]*\)\s*\{\s*--gold-ink: 38 100% 24%;\s*--quiet-btn-fg: initial;/);
  });

  it("outline and text buttons read their colour from the surface", () => {
    expect(css).toMatch(/\.btn-secondary:not\(\.btn-on-dark\),\s*\.btn-ghost:not\(\.btn-on-dark\)\s*\{\s*color: hsl\(var\(--quiet-btn-fg, var\(--primary\)\)\);/);
  });

  it("the consent link does not name a dark-surface class (it marked itself as dark and showed gold on white)", () => {
    const consent = read("src/components/FormConsent.tsx");
    expect(consent).not.toMatch(/section-dark|dark-surface|--dark-section/);
    expect(consent).toContain("text-[hsl(var(--gold-ink))]");
  });
});

describe("phone layout", () => {
  it("the sticky phone bar has a solid background (bg-card/98 is not a real class, so the bar was see-through)", () => {
    const bar = read("src/components/StickyMobileCTA.tsx");
    expect(bar).not.toContain("bg-card/98");
    expect(bar).toContain('className="bg-card border-t border-border shadow-raised"');
  });

  it("a hero with section padding still clears the fixed header", () => {
    expect(css).toMatch(/\.section-padding\.hero-clears-header,\s*\.section-default\.hero-clears-header\s*\{\s*padding-top: calc\(var\(--header-h\) \+ 1\.5rem\) !important;/);
  });
});

describe("heroes with a panel pinned to the bottom", () => {
  it("leave room for it on phones (it covered the call buttons on county pages)", () => {
    for (const file of ["src/pages/CountyPage.tsx", "src/pages/ServiceTownPage.tsx"]) {
      expect(read(file)).toContain("hero-panel-room");
    }
    expect(css).toMatch(/main > section\.hero-panel-room\s*\{\s*padding-bottom: 15rem !important;/);
  });
});

describe("small print, menus and step numbers", () => {
  it("breadcrumbs keep their header offset on phones (py-2 cancelled it and the row sat under the header)", () => {
    const crumbs = read("src/components/PageBreadcrumbs.tsx");
    expect(crumbs).not.toMatch(/cn\("py-2 /);
    expect(crumbs).toContain('cn("pb-2 border-b');
  });

  it("no faint step numerals or faint phone-menu text remain", () => {
    const offenders = [...pages, ...walk("src/components")].filter((file) => {
      const source = read(file);
      return /text-border\/60/.test(source) || (file.includes("/header/") && /text-heritage-charcoal\/(3[5-9]|4\d|5\d|6\d)\b/.test(source));
    });
    expect(offenders).toEqual([]);
  });
});

describe("count-up numbers", () => {
  it("carry their real value so the prerender never ships a number caught mid-count", () => {
    expect(read("src/components/motion/AnimatedCounter.tsx")).toContain("data-final={value}");
    expect(readFileSync("scripts/prerender.mjs", "utf8")).toMatch(/querySelectorAll\("\[data-final\]"\)/);
  });
});
