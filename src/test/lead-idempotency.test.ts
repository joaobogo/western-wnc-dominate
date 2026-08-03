import { describe, it, expect, beforeEach } from "vitest";
import {
  fingerprintSubmission,
  resolveIdempotency,
  rememberSubmission,
  forgetSubmission,
} from "@/lib/lead-idempotency";

describe("lead idempotency", () => {
  beforeEach(() => window.localStorage.clear());

  it("produces a stable fingerprint for the same submission", () => {
    const a = fingerprintSubmission(["contact_form", "Jane Doe", "jane@x.com", "8285551234"]);
    const b = fingerprintSubmission(["contact_form", " Jane Doe ", "JANE@X.com", "8285551234"]);
    expect(a).toBe(b);
  });

  it("produces a different fingerprint for a different submission", () => {
    const a = fingerprintSubmission(["contact_form", "Jane Doe", "jane@x.com"]);
    const b = fingerprintSubmission(["contact_form", "John Doe", "john@x.com"]);
    expect(a).not.toBe(b);
  });

  it("flags a repeat submission and returns the original lead id", () => {
    const fp = fingerprintSubmission(["roofing_intake_form", "Jane Doe"]);
    const first = resolveIdempotency(fp);
    expect(first.duplicate).toBe(false);
    rememberSubmission(fp, first.key, "lead-1");

    const second = resolveIdempotency(fp);
    expect(second.duplicate).toBe(true);
    expect(second.key).toBe(first.key);
    expect(second.lead_id).toBe("lead-1");
  });

  it("allows a fresh attempt after a failed submission is forgotten", () => {
    const fp = fingerprintSubmission(["contact_form", "Jane Doe"]);
    const first = resolveIdempotency(fp);
    forgetSubmission(fp);
    const second = resolveIdempotency(fp);
    expect(second.duplicate).toBe(false);
    expect(second.key).not.toBe(first.key);
  });

  it("expires entries older than the 10 minute window", () => {
    const fp = fingerprintSubmission(["contact_form", "Old Lead"]);
    const stale = { [fp]: { key: "k", lead_id: "lead-old", ts: Date.now() - 11 * 60_000 } };
    window.localStorage.setItem("hr_lead_idem_v1", JSON.stringify(stale));
    expect(resolveIdempotency(fp).duplicate).toBe(false);
  });
});
