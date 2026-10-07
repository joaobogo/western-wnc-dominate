import { describe, expect, it } from "vitest";
import { normalizeDescription, normalizeTitle } from "@/lib/seo-length";

describe("normalizeDescription", () => {
  it("replaces em and en dashes", () => {
    const out = normalizeDescription("Roof repair in Franklin, NC — leak sources, storm triage – and when to replace.");
    expect(out).not.toMatch(/[—–]/);
    expect(out).toBe("Roof repair in Franklin, NC: leak sources, storm triage, and when to replace.");
  });

  it("never returns more than 160 characters and always ends cleanly", () => {
    const long =
      "Highlander serves Lake Toxaway, NC with premium roofing, roof replacement, metal roofing, gutter systems, in-house design services, home additions, and outdoor living work for Transylvania County lakefront estates.";
    const out = normalizeDescription(long);
    expect(out.length).toBeLessThanOrEqual(160);
    expect(out).toMatch(/[.!?]$/);
    expect(out).not.toMatch(/\b(and|or|with|for|the)\.$/i);
  });

  it("keeps a thin first sentence from being the whole snippet", () => {
    const out = normalizeDescription(
      "Full roof replacement in Franklin, NC from Highlander's home market. Licensed NC General Contractor, free project estimate, written scope, permit handling, and a project lead from start to finish.",
    );
    expect(out.length).toBeGreaterThanOrEqual(110);
    expect(out.length).toBeLessThanOrEqual(160);
  });

  it("leaves a good description untouched", () => {
    const ok = "Metal roofing in Highlands, NC built for wind, snow, and elevation. Free estimate from a licensed local contractor.";
    expect(normalizeDescription(ok)).toBe(ok);
  });
});

describe("normalizeTitle suffix", () => {
  it("always uses the short brand suffix", () => {
    expect(normalizeTitle("Roof Replacement in Franklin, NC | Highlander Building Services")).toBe("Roof Replacement in Franklin, NC | Highlander");
    expect(normalizeTitle("Metal Roofing | Highlander Building Services, Inc.")).toBe("Metal Roofing | Highlander");
  });

  it("removes em dashes from titles", () => {
    expect(normalizeTitle("Roof Repair in Western NC — Leaks, Flashing, Storm Damage")).toBe("Roof Repair in Western NC: Leaks, Flashing, Storm Damage");
    expect(normalizeTitle("Standing Seam Metal Roof — Highlands, NC | Highlander")).toBe("Standing Seam Metal Roof: Highlands, NC | Highlander");
  });

  it("keeps the keyword and stays within 60 characters", () => {
    const out = normalizeTitle("Standing Seam Metal Roofing Installation in Highlands, North Carolina | Cost | Highlander Building Services");
    expect(out.length).toBeLessThanOrEqual(60);
    expect(out.startsWith("Standing Seam Metal Roofing")).toBe(true);
  });
});
