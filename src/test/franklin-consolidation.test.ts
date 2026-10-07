import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { serviceTownContent } from "@/data/service-town-content";
import { towns } from "@/data/towns";
import { showrooms } from "@/data/showrooms";

/**
 * Franklin has one page per intent: the town page owns "roofers in Franklin",
 * the showroom page owns "visit / hours / directions", and service pages own
 * their own service. A separate Franklin "roofing" page competed with the town
 * page for the same queries, so it is folded in with a 301.
 */
describe("Franklin consolidation", () => {
  it("no longer has a Franklin roofing service page", () => {
    expect(serviceTownContent.some((e) => e.townSlug === "franklin-nc" && e.serviceSlug === "roofing")).toBe(false);
  });

  it("redirects the merged URL and its legacy alias straight to the town page", () => {
    const rules = readFileSync("public/_redirects", "utf8");
    expect(rules).toMatch(/^\/service-areas\/franklin-nc\/roofing\s+\/service-areas\/franklin-nc\s+301!/m);
    expect(rules).toMatch(/^\/roofing-franklin-nc\s+\/service-areas\/franklin-nc\s+301!/m);
  });

  it("keeps the town page and the showroom page on different intents", () => {
    const town = towns.find((t) => t.slug === "franklin-nc")!;
    const showroom = showrooms.find((s) => s.slug === "franklin-nc")!;
    expect(town.h1).not.toMatch(/showroom/i);
    expect(showroom.h1).toMatch(/showroom/i);
  });
});
