import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

beforeAll(() => {
  (globalThis as any).Deno = { env: { get: () => "test" }, serve: () => undefined };
});
afterEach(() => vi.unstubAllGlobals());
const mod = async () => (await import("@jobtread-sync")) as any;

describe("current JobTread field contract (read-only verified October 16)", () => {
  it.each([
    ["roofing", "roof_replacement", "Roofing"],
    ["roofing", "roof_repair", "Repair"],
    ["storm", "storm_damage", "Repair"],
    ["gutters", "gutter_guards", "Gutters"],
    ["construction", "addition", "Construction"],
    ["design_services", "design_planning", "Construction"],
  ])("maps %s / %s to the current Divisions picklist", async (category, type, division) => {
    const { buildJobCustomFieldValues } = await mod();
    const fields = buildJobCustomFieldValues({ project: { service_category: category, project_type: type }, contact: {} }, "Intake notes");
    expect(fields["22PNawhnSXmW"]).toBe(division);
    expect(Object.keys(fields).sort()).toEqual(["22P5uYmYTED2", "22PNawhnSXmW", "22PPQYmK3SXB", "22PYx7PBhE56"].sort());
    expect(fields["22PYx7PBhE56"]).toBe("Intake notes");
  });

  it.each([["text", "Text"], ["email", "Email"], ["call", "Phone Call"]])("maps %s to a valid communication option", async (input, output) => {
    const { buildJobCustomFieldValues } = await mod();
    expect(buildJobCustomFieldValues({ contact: { preferred_contact_method: input } }, "note")["22PPQYmK3SXB"]).toBe(output);
  });

  it("sends the actual website option and excludes removed Location fields", async () => {
    const { buildAccountCustomFieldValues, buildLocationCustomFieldValues } = await mod();
    expect(buildAccountCustomFieldValues("Franklin")["22P75KEjYCfa"]).toBe("Highlander Website");
    expect(buildLocationCustomFieldValues({ gateCodeBool: false, contactName: "Jane", phone: "8285551234", email: "jane@sample.org" }))
      .toEqual({ "22PPzwDNUYjN": "Jane", "22PPzw5sqRSX": "8285551234" });
  });

  it("completes the account/contact/location/job flow using mocked CRM only", async () => {
    const { buildPayload, sendToPaveApi } = await mod();
    const queries: any[] = [];
    vi.stubGlobal("fetch", vi.fn(async (_url, init) => {
      const { query } = JSON.parse(init.body);
      queries.push(query);
      let response = {};
      if (query.organization) response = { organization: { accounts: { nodes: [] } } };
      if (query.createAccount) response = { createAccount: { createdAccount: { id: "account-1" } } };
      if (query.createContact) response = { createContact: { createdContact: { id: "contact-1" } } };
      if (query.createLocation) response = { createLocation: { createdLocation: { id: "location-1" } } };
      if (query.createJob) response = { createJob: { createdJob: { id: "job-1" } } };
      return new Response(JSON.stringify(response), { status: 200 });
    }));
    const payload = buildPayload({ name: "Jane Doe", first_name: "Jane", last_name: "Doe", property_town: "Franklin", property_address: "53 Mountain Road", phone: "8285551234", email: "jane@sample.org", service_category: "roofing", project_type: "roof_repair", project_description: "Leak in kitchen", source: "roofing_intake_form" }, "lead");
    expect(await sendToPaveApi(payload)).toEqual({ ok: true, id: "job-1" });
    expect(queries.find(q => q.createAccount).createAccount.$.customFieldValues["22P75KEjYCfa"]).toBe("Highlander Website");
    const job = queries.find(q => q.createJob).createJob.$;
    expect(job.description).toBeUndefined();
    expect(job.jobNumber).toBeUndefined();
    expect(job.customFieldValues["22PNawhnSXmW"]).toBe("Repair");
    expect(job.customFieldValues["22PYx7PBhE56"]).toContain("Leak in kitchen");
  });
});