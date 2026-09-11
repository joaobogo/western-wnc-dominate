import { beforeAll, describe, expect, it } from "vitest";

beforeAll(() => {
  (globalThis as any).Deno = { env: { get: () => "test" }, serve: () => undefined };
});

const mod = async () => (await import("@jobtread-sync")) as any;

describe("front-desk JobTread mapping", () => {
  it("normalizes an intake lead through the shared mapper", async () => {
    const { normalizeIntakeLead, buildPayload, buildJobCustomFieldValues } = await mod();
    const normalized = normalizeIntakeLead({
      first_name: "Jane",
      last_name: "Doe",
      phone: "8285551234",
      town: "Highlands",
      address: "53 Mountain Road",
      job_type: "roof_repair",
      details: "Leak over the kitchen.",
      timing: "asap",
      preferred_contact: "call",
      score: 82,
      grade: "A",
      score_version: "V1.1",
      breakdown: { jobType: 22, urgency: 22, authority: 20, location: 15, reachability: 3 },
      gates: [],
      flags: [],
      call_by: "2026-09-11T17:00:00.000Z",
      taken_by: "Front Desk",
      payload: {},
    });
    const payload = buildPayload(normalized, "lead");
    const fields = buildJobCustomFieldValues(payload, payload.note);

    expect(payload.account_name).toBe("Jane Doe");
    expect(payload.location.town).toBe("Highlands");
    expect(payload.project.project_description).toBe("Leak over the kitchen.");
    expect(payload.note).toContain("Lead Score: 82/100");
    expect(payload.note).toContain("Score Version: V1.1");
    expect(fields["22PYx7PBhE56"]).toContain("Lead Grade: A");
    expect("description" in fields).toBe(false);
  });
});