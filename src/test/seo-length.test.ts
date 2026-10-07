import { describe, expect, it } from "vitest";
import { normalizeDescription } from "@/lib/seo-length";

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
