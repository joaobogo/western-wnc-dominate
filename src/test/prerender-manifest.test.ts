import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { serviceTownContent, indexableServiceTownPairs, isServiceTownIndexable } from "@/data/service-town-content";
import { counties } from "@/data/counties";

// "What we prerender" (public/prerender-manifest.json) must be a superset of
// "what we ask Google to index" (public/sitemap.xml), and the sitemap must
// never carry a noindex coverage page. Both files are regenerated in prebuild.

const norm = (p: string) => (p === "/" ? "/" : p.replace(/\/+$/, ""));
const sitemapPath = resolve("public/sitemap.xml");
const manifestPath = resolve("public/prerender-manifest.json");
const generated = existsSync(sitemapPath) && existsSync(manifestPath);

const sitemap = generated
  ? new Set([...readFileSync(sitemapPath, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => norm(new URL(m[1]).pathname)))
  : new Set<string>();
const manifest = generated
  ? new Set((JSON.parse(readFileSync(manifestPath, "utf8")).routes as string[]).map(norm))
  : new Set<string>();

describe.skipIf(!generated)("sitemap vs prerender manifest", () => {
  it("every sitemap URL is in the prerender manifest", () => {
    expect([...sitemap].filter((p) => !manifest.has(p))).toEqual([]);
  });

  it("every hand-written (indexable) service×town page is in the sitemap", () => {
    const missing = indexableServiceTownPairs()
      .map((e) => `/service-areas/${e.townSlug}/${e.serviceSlug}`)
      .filter((p) => !sitemap.has(p));
    expect(missing).toEqual([]);
  });

  it("no noindex service×town page (generated, or hand-written with indexable:false) is in the sitemap, but all are prerendered", () => {
    const coverage = serviceTownContent
      .filter((e) => !isServiceTownIndexable(e.townSlug, e.serviceSlug))
      .map((e) => `/service-areas/${e.townSlug}/${e.serviceSlug}`);
    expect(coverage.length).toBeGreaterThan(0);
    expect(coverage.filter((p) => sitemap.has(p))).toEqual([]);
    expect(coverage.filter((p) => !manifest.has(p))).toEqual([]);
  });

  it("only the four core towns keep indexable service×town pages", () => {
    const core = new Set(["franklin-nc", "highlands-nc", "cashiers-nc", "sylva-nc"]);
    const offenders = indexableServiceTownPairs().filter((p) => !core.has(p.townSlug));
    expect(offenders).toEqual([]);
  });

  it("every county hub is prerendered but none is in the sitemap (noindex link hubs)", () => {
    const countyPaths = counties.map((c) => `/service-areas/county/${c.slug}`);
    expect(countyPaths.filter((p) => !manifest.has(p))).toEqual([]);
    expect(countyPaths.filter((p) => sitemap.has(p))).toEqual([]);
  });

  it("the noindex funnel steps are prerendered but never in the sitemap", () => {
    for (const p of ["/roofing-intake", "/construction-intake", "/design-intake", "/roofing-builder", "/construction-builder", "/construction/consultation"]) {
      expect(manifest.has(p), `${p} missing from manifest`).toBe(true);
      expect(sitemap.has(p), `${p} must not be in the sitemap`).toBe(false);
    }
  });

  it("manifest routes carry no trailing slash and no duplicates", () => {
    const raw = JSON.parse(readFileSync(manifestPath, "utf8")).routes as string[];
    expect(raw.filter((p) => p !== "/" && p.endsWith("/"))).toEqual([]);
    expect(new Set(raw).size).toBe(raw.length);
  });
});
