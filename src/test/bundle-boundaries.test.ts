import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { getNeighborTowns as fromGraph, TOWN_ADJACENCY as adjacencyFromGraph } from "@/lib/local-link-graph";
import { getNeighborTowns, TOWN_ADJACENCY } from "@/data/town-neighbors";

const read = (path: string) => readFileSync(path, "utf8");

/**
 * Page-speed guard rails (Nov 2026). The full blog library is about 1.2 MB of
 * article text. It belongs on /blog pages and on the town pages that list
 * articles; /construction and 20 service pages were downloading it unused.
 */
describe("blog library stays off service pages", () => {
  it("LocalProjectProof reads town adjacency without the blog-library module", () => {
    const source = read("src/components/trust/LocalProjectProof.tsx");
    expect(source).toContain('from "@/data/town-neighbors"');
    expect(source).not.toMatch(/from "@\/lib\/local-link-graph"/);
    expect(source).not.toMatch(/from "@\/data\/blogs"/);
  });

  it("town adjacency has one source, re-exported by the link graph", () => {
    expect(fromGraph).toBe(getNeighborTowns);
    expect(adjacencyFromGraph).toBe(TOWN_ADJACENCY);
    expect(getNeighborTowns("franklin-nc").map((t) => t.slug)).toEqual(TOWN_ADJACENCY["franklin-nc"]);
  });

  it("town-neighbors imports nothing but the towns table", () => {
    const imports = read("src/data/town-neighbors.ts").match(/^import .*$/gm) ?? [];
    expect(imports).toEqual(['import { towns, type TownData } from "@/data/towns";']);
  });

  it("the build keeps the link helpers with the blog library and their shared data apart", () => {
    const config = read("vite.config.ts");
    expect(config).toMatch(/local-link-graph\|data\\\/content-support[^\n]*return "blogs-data"/);
    expect(config).toMatch(/data\\\/projects\|data\\\/blog-index\\\.generated\|lib\\\/internal-links[^\n]*return "site-data"/);
    expect(config).toMatch(/town-neighbors[^\n]*return "towns-data"/);
  });
});

describe("static file caching", () => {
  const headers = read("public/_headers");
  const rule = (path: string) => headers.split(/\n(?=\/)/).find((block) => block.startsWith(`${path}\n`)) ?? "";

  it("fonts are cached for a year", () => {
    expect(rule("/fonts/*")).toContain("Cache-Control: public, max-age=31536000, immutable");
  });

  it("site photos are cached for 30 days, not forever (file names are not hashed)", () => {
    expect(rule("/media/*")).toContain("Cache-Control: public, max-age=2592000");
    expect(rule("/media/*")).not.toContain("immutable");
  });

  it("the deployment fingerprint is still never cached", () => {
    expect(rule("/build-info.json")).toContain("no-store");
  });
});
