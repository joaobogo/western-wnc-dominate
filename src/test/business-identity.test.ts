import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative, resolve } from "path";
import { BUSINESS, FRANKLIN, SYLVA, directionsUrl, formatPhoneDisplay, napLine, telHref } from "@/data/business";

/**
 * `src/data/business.ts` is the single source of truth for NAP data.
 * Any street address or phone number typed anywhere else under `src/` will
 * eventually drift out of sync with Google Business Profile and the schema,
 * so this test fails the build when one appears.
 *
 * Allowed exceptions: the source of truth itself, and this test file
 * (both must name the literals in order to guard them).
 */
const ROOT = resolve(__dirname, "../..");
const SRC = join(ROOT, "src");

const FORBIDDEN = ["Depot Street", "Depot St", "Highlands Road", "Highlands Rd", "524-7773", "397-9211", "476-4000"];

const ALLOWED = new Set(["src/data/business.ts", "src/test/business-identity.test.ts"]);

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });

const sourceFiles = walk(SRC)
  .filter((f) => /\.(ts|tsx)$/.test(f))
  .map((f) => relative(ROOT, f).split("\\").join("/"))
  // Other test files legitimately assert on formatting/banned-number regexes.
  .filter((f) => !f.startsWith("src/test/") || f === "src/test/business-identity.test.ts");

describe("business identity is centralized", () => {
  it("finds source files to scan", () => {
    expect(sourceFiles.length).toBeGreaterThan(100);
  });

  for (const needle of FORBIDDEN) {
    it(`does not hard-code "${needle}" outside src/data/business.ts`, () => {
      const offenders = sourceFiles.filter(
        (f) => !ALLOWED.has(f) && readFileSync(join(ROOT, f), "utf8").includes(needle),
      );
      expect(offenders).toEqual([]);
    });
  }
});

describe("BUSINESS derived values", () => {
  it("formats the primary phone consistently", () => {
    expect(formatPhoneDisplay(BUSINESS.primaryPhoneE164)).toBe("(828) 524-7773");
    expect(telHref(BUSINESS.primaryPhoneE164)).toBe("tel:+18285247773");
  });

  it("keeps both showrooms with GBP-exact NAP lines", () => {
    expect(BUSINESS.locations).toHaveLength(2);
    expect(napLine(FRANKLIN)).toBe("40 Depot Street, Franklin, NC 28734");
    expect(napLine(SYLVA)).toBe("28 Cross Stitch Mountain Rd, Sylva, NC 28779");
    expect(FRANKLIN.geo).toEqual({ lat: 35.1759293, lng: -83.3738888 });
    expect(FRANKLIN.gbpCid).toMatch(/^\d+$/);
    expect(SYLVA.gbpCid).toMatch(/^\d+$/);
  });

  it("routes Franklin by its confirmed address while retaining profile identity", () => {
    const url = new URL(directionsUrl(FRANKLIN));
    expect(url.pathname).toBe("/maps/dir/");
    expect(url.searchParams.get("destination")).toBe("40 Depot Street, Franklin, NC 28734");
    expect(directionsUrl(SYLVA)).toBe(`https://www.google.com/maps?cid=${SYLVA.gbpCid}`);
    expect(FRANKLIN.reviewUrl).toContain("search.google.com/local/writereview");
  });
});
