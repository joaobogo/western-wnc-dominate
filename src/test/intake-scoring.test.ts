import { describe, expect, it } from "vitest";
import { JOB_TYPES, SCORE_VERSION } from "@/intake/config";
import { EMPTY_LEAD, scoreLead } from "@/intake/scoring";

const points = Object.fromEntries(JOB_TYPES.map((option) => [option.id, option.points]));

describe("front-desk scoring V1.1", () => {
  it("uses the approved revised job-type weights", () => {
    expect(SCORE_VERSION).toBe("V1.1");
    expect(points).toEqual({
      roof_replacement: 30,
      addition_remodel: 30,
      roof_repair: 22,
      exterior: 21,
      gutters: 20,
      storm_insurance: 14,
      new_build: 12,
      inspection: 10,
    });
  });

  it("still reaches 100 for a fully qualified lead", () => {
    const result = scoreLead({
      ...EMPTY_LEAD,
      firstName: "Jane",
      phone: "8285551234",
      email: "jane@example.com",
      preferredContact: "call",
      preferredTime: "morning",
      jobType: "roof_replacement",
      timing: "emergency",
      relationship: "owner",
      town: "Franklin",
      spokeLive: true,
    }, new Date("2026-09-11T14:00:00-04:00"));

    expect(result.score).toBe(100);
    expect(result.grade).toBe("A");
    expect(result.scoreVersion).toBe("V1.1");
  });

  it("preserves the renter and outside-area gates", () => {
    const renter = scoreLead({
      ...EMPTY_LEAD,
      jobType: "roof_repair",
      timing: "asap",
      relationship: "renter",
      town: "Franklin",
    });
    const outside = scoreLead({
      ...EMPTY_LEAD,
      jobType: "roof_repair",
      timing: "asap",
      relationship: "owner",
      town: "__outside",
      townOther: "Atlanta",
    });

    expect(renter.gates.map((gate) => gate.id)).toContain("renter_no_owner");
    expect(outside.gates.map((gate) => gate.id)).toContain("outside_area");
  });
});