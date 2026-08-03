import { describe, it, expect } from "vitest";
import { parsePersonName, looksLikeCompany } from "@/lib/name-parser";
import { normalizeLeadPayload, splitFullName } from "@/lib/leads";

describe("parsePersonName", () => {
  it("handles a single word", () => {
    const r = parsePersonName("Madonna");
    expect(r.first_name).toBe("Madonna");
    expect(r.last_name).toBeNull();
    expect(r.middle_name).toBeNull();
    expect(r.is_company).toBe(false);
  });

  it("handles a three-part name", () => {
    const r = parsePersonName("Jane Quinn Public");
    expect(r).toMatchObject({ first_name: "Jane", middle_name: "Quinn", last_name: "Public" });
  });

  it("preserves apostrophes and hyphens", () => {
    const r = parsePersonName("Sean O'Neil-Smith");
    expect(r.first_name).toBe("Sean");
    expect(r.last_name).toBe("O'Neil-Smith");
    expect(r.is_company).toBe(false);
  });

  it("treats 'Blue Ridge HOA LLC' as a company", () => {
    const r = parsePersonName("Blue Ridge HOA LLC");
    expect(r.is_company).toBe(true);
    expect(r.company_name).toBe("Blue Ridge HOA LLC");
    expect(r.first_name).toBeNull();
    expect(r.last_name).toBeNull();
  });

  it("preserves accents", () => {
    const r = parsePersonName("Ana Sofía Núñez-Peña");
    expect(r.first_name).toBe("Ana");
    expect(r.middle_name).toBe("Sofía");
    expect(r.last_name).toBe("Núñez-Peña");
  });

  it("extracts generational and professional suffixes", () => {
    expect(parsePersonName("Robert Vance Jr.")).toMatchObject({
      first_name: "Robert", last_name: "Vance", suffix: "Jr.",
    });
    expect(parsePersonName("Robert Vance III")).toMatchObject({
      first_name: "Robert", last_name: "Vance", suffix: "III",
    });
    expect(parsePersonName("Dr. Amy Chen PhD")).toMatchObject({
      first_name: "Amy", last_name: "Chen", suffix: "PhD",
    });
  });

  it("keeps surname particles with the last name", () => {
    expect(parsePersonName("Ludwig van der Berg").last_name).toBe("van der Berg");
    expect(parsePersonName("Maria de la Cruz").last_name).toBe("de la Cruz");
  });

  it("accepts 'Last, First' ordering", () => {
    expect(parsePersonName("Public, Jane")).toMatchObject({
      first_name: "Jane", last_name: "Public",
    });
  });

  it("normalizes whitespace and empty input", () => {
    expect(parsePersonName("  Jane   Public  ").full_name).toBe("Jane Public");
    expect(parsePersonName("   ")).toMatchObject({ first_name: null, full_name: null });
    expect(parsePersonName(null).is_company).toBe(false);
  });

  it("detects other business shapes", () => {
    expect(looksLikeCompany("Highlands Falls Country Club Association")).toBe(true);
    expect(looksLikeCompany("Smith & Sons")).toBe(true);
    expect(looksLikeCompany("Cashiers Property Management, Inc.")).toBe(true);
    expect(looksLikeCompany("Jane Public")).toBe(false);
  });
});

describe("lead payload integration", () => {
  it("splits a person's name into the lead row", () => {
    const r = normalizeLeadPayload({ source: "x", full_name: "Sean O'Neil-Smith" });
    expect(r.first_name).toBe("Sean");
    expect(r.last_name).toBe("O'Neil-Smith");
    expect(r.is_company).toBe(false);
    expect(r.company_name).toBeNull();
  });

  it("flags company submissions and leaves last_name empty", () => {
    const r = normalizeLeadPayload({ source: "x", full_name: "Blue Ridge HOA LLC" });
    expect(r.is_company).toBe(true);
    expect(r.company_name).toBe("Blue Ridge HOA LLC");
    expect(r.last_name).toBeNull();
    // `name` still carries the account name the CRM mapper reads.
    expect(r.name).toBe("Blue Ridge HOA LLC");
  });

  it("respects explicitly provided first/last names", () => {
    const r = normalizeLeadPayload({ source: "x", first_name: "Ann", last_name: "Lee" });
    expect(r.name).toBe("Ann Lee");
  });

  it("splitFullName stays backward compatible", () => {
    expect(splitFullName("Solo")).toEqual({ first: "Solo", last: null });
  });
});
