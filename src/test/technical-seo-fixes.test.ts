import { readFileSync, statSync } from "node:fs";
import { describe, expect, it } from "vitest";

const pageMetadata = [
  ["src/pages/Certifications.tsx", "Roofing Certifications in Franklin, NC | Highlander"],
  ["src/pages/RoofingDivision.tsx", "Roofing Contractor in Western NC | Highlander"],
  ["src/pages/ConstructionDivision.tsx", "General Contractor in Western NC | Additions & Building"],
  ["src/pages/Legal.tsx", "Accessibility Statement | Western North Carolina Support"],
] as const;

const optimizedImages = [
  "src/assets/design-planning-hero.webp",
  "src/assets/division-construction-v2.webp",
  "src/assets/hero-roofing.webp",
  "src/assets/gallery/asphalt-004.webp",
  "src/assets/gallery/asphalt-006.webp",
  "src/assets/gallery/asphalt-008.webp",
  "src/assets/gallery/asphalt-hero.webp",
  "src/assets/gallery/cedar-002.webp",
  "src/assets/gallery/metal-005.webp",
  "src/assets/gallery/metal-006.webp",
  "src/assets/gallery/metal-008.webp",
  "src/assets/gallery/metal-010.webp",
  "public/media/9e06b4fe-service-areas-hero-smokies.webp",
  "public/media/wnc-mountain-home-exterior.webp",
  "public/media/wnc-town-overlook.webp",
] as const;

describe("reported technical SEO fixes", () => {
  it.each(pageMetadata)("keeps the title in %s between 45 and 60 characters", (file, title) => {
    expect(title.length).toBeGreaterThanOrEqual(45);
    expect(title.length).toBeLessThanOrEqual(60);
    expect(readFileSync(file, "utf8")).toContain(`"${title}"`);
  });

  it.each(optimizedImages)("keeps %s below 100KB", (file) => {
    expect(statSync(file).size).toBeLessThan(100_000);
  });

  it("keeps the financing description relevant and concise", () => {
    const description = "Explore roofing and construction financing options, request a written estimate, and ask our team about available plans for your project.";
    expect(description.length).toBeLessThanOrEqual(155);
    expect(readFileSync("src/pages/Financing.tsx", "utf8")).toContain(`description=\"${description}\"`);
  });

  it("keeps descriptive alt text on the design planning hero", () => {
    const source = readFileSync("src/pages/LayoutsPlanning.tsx", "utf8");
    expect(source).toContain('alt="Mountain home design plans and layout drawings for preconstruction planning"');
  });
});
