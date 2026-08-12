import { describe, it, expect } from "vitest";
import {
  normalizePhoneE164, formatPhoneInput, matchTown,
  emailSchema, zipSchema, optionalZipSchema, validateContact,
} from "@/lib/lead-validation";

describe("phone normalization", () => {
  it("normalizes common US formats to E.164", () => {
    for (const raw of ["8285247773", "(828) 524-7773", "828-524-7773", "1 828 524 7773", "+1 (828) 524.7773"]) {
      const r = normalizePhoneE164(raw);
      expect(r.ok, raw).toBe(true);
      expect(r.ok && r.e164).toBe("+18285247773");
    }
  });
  it("rejects bad numbers with friendly messages", () => {
    expect(normalizePhoneE164("").ok).toBe(false);
    expect(normalizePhoneE164("12345").ok).toBe(false);
    expect(normalizePhoneE164("028-524-7773").ok).toBe(false);  // area code starts 0
    expect(normalizePhoneE164("828-124-7773").ok).toBe(false);  // exchange starts 1
    expect(normalizePhoneE164("5555555555").ok).toBe(false);
    expect(normalizePhoneE164("call me").ok).toBe(false);
    const r = normalizePhoneE164("12345");
    expect(r.ok === false && r.error).toMatch(/10-digit/);
  });
  it("formats progressively while typing", () => {
    expect(formatPhoneInput("828")).toBe("828");
    expect(formatPhoneInput("828524")).toBe("(828) 524");
    expect(formatPhoneInput("18285247773")).toBe("(828) 524-7773");
  });
});

describe("email", () => {
  it("accepts valid and lowercases", () => {
    expect(emailSchema.parse(" Owner@Highlandernc.COM ")).toBe("owner@highlandernc.com");
  });
  it("rejects malformed and over-long", () => {
    expect(emailSchema.safeParse("nope").success).toBe(false);
    expect(emailSchema.safeParse(`${"a".repeat(250)}@gmail.com`).success).toBe(false);
  });
  it("rejects obvious fake and disposable addresses", () => {
    for (const bad of [
      "jane@example.com",
      "test@gmail.com",
      "someone@mailinator.com",
      "user@site.test",
      "aaaa@gmail.com",
    ]) {
      expect(emailSchema.safeParse(bad).success).toBe(false);
    }
    expect(emailSchema.safeParse("jane.doe@gmail.com").success).toBe(true);
  });
});

describe("town matching", () => {
  it("matches service-area towns by name, slug, and with state", () => {
    expect(matchTown("highlands")).toMatchObject({ value: "Highlands", isServiceArea: true, slug: "highlands-nc" });
    expect(matchTown("Cashiers, NC").isServiceArea).toBe(true);
    expect(matchTown("franklin-nc").isServiceArea).toBe(true);
  });
  it("allows free-text fallback outside the mapped markets", () => {
    const r = matchTown("Some Hollow");
    expect(r.ok).toBe(true);
    expect(r.isServiceArea).toBe(false);
    expect(r.value).toBe("Some Hollow");
  });
  it("rejects empty", () => expect(matchTown("").ok).toBe(false));
});

describe("zip", () => {
  it("requires 5 digits", () => {
    expect(zipSchema.safeParse("28741").success).toBe(true);
    expect(zipSchema.safeParse("2874").success).toBe(false);
    expect(zipSchema.safeParse("28741-1234").success).toBe(false);
    expect(optionalZipSchema.parse("")).toBeNull();
  });
});

describe("validateContact reachability rule", () => {
  const base = { name: "Jane Public", town: "Highlands" };

  it("passes with valid phone and email", () => {
    const r = validateContact({ ...base, phone: "828-524-7773", email: "jane@gmail.com" });
    expect(r.valid).toBe(true);
    expect(r.values.phone).toBe("+18285247773");
    expect(r.values.town).toBe("Highlands");
    expect(r.values.isServiceArea).toBe(true);
  });

  it("allows a valid phone with no email", () => {
    const r = validateContact({ ...base, phone: "828-524-7773" });
    expect(r.valid).toBe(true);
    expect(r.errors.email).toBeUndefined();
  });

  it("allows a valid email with no phone", () => {
    const r = validateContact({ ...base, email: "jane@gmail.com" });
    expect(r.valid).toBe(true);
  });

  it("blocks when both are missing, with inline errors on both", () => {
    const r = validateContact(base);
    expect(r.valid).toBe(false);
    expect(r.errors.phone).toBeTruthy();
    expect(r.errors.email).toBeTruthy();
  });

  it("blocks when both are present but malformed", () => {
    const r = validateContact({ ...base, phone: "123", email: "nope" });
    expect(r.valid).toBe(false);
    expect(r.errors.phone).toBeTruthy();
    expect(r.errors.email).toBeTruthy();
  });

  it("blocks a typo'd email even when the phone is valid", () => {
    const r = validateContact({ ...base, phone: "828-524-7773", email: "jane@@example" });
    expect(r.valid).toBe(false);
    expect(r.errors.email).toBeTruthy();
  });

  it("honors per-form required fields", () => {
    const r = validateContact({ phone: "828-524-7773", require: { name: true, town: true, zip: true } });
    expect(r.valid).toBe(false);
    expect(r.errors.name).toBeTruthy();
    expect(r.errors.town).toBeTruthy();
    expect(r.errors.zip).toBeTruthy();
  });

  it("validates zip inline", () => {
    const r = validateContact({ ...base, phone: "828-524-7773", zip: "287" });
    expect(r.valid).toBe(false);
    expect(r.errors.zip).toMatch(/5-digit/);
  });
});
