import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

beforeAll(() => {
  (globalThis as any).Deno = { env: { get: () => "test" }, serve: () => undefined };
});
afterEach(() => vi.unstubAllGlobals());
const mod = async () => (await import("@jobtread-sync")) as any;

// Javi's JobTread field sheet (Oct 2026). Mocked CRM only.
describe("Javi's JobTread fields", () => {
  it("fills Property Type, Stories, Roof Type and Insurance Claim when the form collected them", async () => {
    const { buildStructuredFields } = await mod();
    const f = buildStructuredFields({
      property_type: "second_home",
      insurance_status: "filed",
      metadata: { appointment: { roofType: "metal", stories: "3_plus" } },
    });
    expect(f.location["22PgCue6AFVm"]).toBe("Second Home / Cabin");
    expect(f.location["22PgCuQ9Qdjx"]).toBe("3+");
    expect(f.job["22PgCu9jhtAA"]).toBe("Metal");
    expect(f.job["22PNawMp3BLV"]).toBe(true);
  });

  it("leaves fields blank for 'Not provided' or 'none' answers", async () => {
    const { buildStructuredFields } = await mod();
    const f = buildStructuredFields({ property_type: "Not provided", insurance_status: "none", metadata: { roof_type: "unknown" } });
    expect(f).toEqual({ job: {}, location: {}, account: {} });
  });

  it("maps a front-desk caller's source and referral name onto the customer", async () => {
    const { buildStructuredFields } = await mod();
    const f = buildStructuredFields({ source: "referral", metadata: { receptionist: "Front Desk", source_detail: "Bob Jones" } });
    expect(f.account["22P75KEjYCfa"]).toBe("Referral");
    expect(f.account["22P75KDSW7iP"]).toBe("Bob Jones");
  });

  it("a roofing inspection is Divisions = Roofing, a roofing repair is Repair", async () => {
    const { buildPayload, buildJobCustomFieldValues } = await mod();
    const base = { first_name: "Jane", last_name: "Doe", property_town: "Franklin", service_category: "roofing" };
    const insp = buildPayload({ ...base, project_type: "inspection" }, "lead");
    const rep = buildPayload({ ...base, project_type: "roof_repair" }, "lead");
    expect(buildJobCustomFieldValues(insp, "n")["22PNawhnSXmW"]).toEqual(["Roofing"]);
    expect(buildJobCustomFieldValues(rep, "n")["22PNawhnSXmW"]).toEqual(["Repair"]);
    expect(rep.job_name).toBe("Roof Repair Lead - Franklin - Jane");
  });

  it("test leads say TEST at the start of the job name", async () => {
    const { buildJobName } = await mod();
    expect(buildJobName({ first_name: "JOAO", last_name: "OMNIFLOW KASPRZAK TEST", property_town: "Sylva", service_category: "gutters" }))
      .toBe("TEST Gutter Inquiry - Sylva - JOAO");
  });

  it("an existing account with no contact gets this lead's contact", async () => {
    const { buildPayload, sendToPaveApi } = await mod();
    const queries: any[] = [];
    vi.stubGlobal("fetch", vi.fn(async (_u: string, init: any) => {
      const { query } = JSON.parse(init.body);
      queries.push(query);
      const r = query.organization
        ? { organization: { accounts: { nodes: [{ id: "acct", name: "Jane Doe", contacts: { nodes: [] }, locations: { nodes: [{ id: "loc", name: "Franklin Property", address: null }] } }] } } }
        : query.createContact ? { createContact: { createdContact: { id: "c1" } } }
        : query.createLocation ? { createLocation: { createdLocation: { id: "l1" } } }
        : { createJob: { createdJob: { id: "j1" } } };
      return new Response(JSON.stringify(r), { status: 200 });
    }));
    const res = await sendToPaveApi(buildPayload({ first_name: "Jane", last_name: "Doe", property_town: "Franklin", phone: "8285551234" }, "lead"));
    expect(res.ok).toBe(true);
    expect(queries.filter((q) => q.createContact)).toHaveLength(1);
    expect(queries.filter((q) => q.createAccount)).toHaveLength(0);
  });

  it("a property with no street address still gets the town as its address", async () => {
    const { buildPayload, sendToPaveApi } = await mod();
    const queries: any[] = [];
    vi.stubGlobal("fetch", vi.fn(async (_u: string, init: any) => {
      const { query } = JSON.parse(init.body);
      queries.push(query);
      const r = query.organization ? { organization: { accounts: { nodes: [] } } }
        : query.createAccount ? { createAccount: { createdAccount: { id: "a" } } }
        : query.createContact ? { createContact: { createdContact: { id: "c" } } }
        : query.createLocation ? { createLocation: { createdLocation: { id: "l" } } }
        : { createJob: { createdJob: { id: "j" } } };
      return new Response(JSON.stringify(r), { status: 200 });
    }));
    await sendToPaveApi(buildPayload({ first_name: "Jane", last_name: "Doe", property_town: "Sylva", phone: "8285551234" }, "lead"));
    expect(queries.find((q) => q.createLocation).createLocation.$.address).toBe("Sylva, NC");
  });
});
