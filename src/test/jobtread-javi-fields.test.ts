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

describe("address typed into the town slot", () => {
  it("moves a street address out of the town and keeps the real town", async () => {
    const { fixTownAddress } = await mod();
    expect(fixTownAddress({ property_town: "120 Chestnut St, Highlands, NC" })).toMatchObject({ property_address: "120 Chestnut St, Highlands, NC", property_town: "Highlands" });
    expect(fixTownAddress({ property_town: "40 Depot Street" })).toMatchObject({ property_address: "40 Depot Street", property_town: null });
    expect(fixTownAddress({ property_town: "Franklin" })).toMatchObject({ property_town: "Franklin" });
  });
});

describe("Javi review fixes", () => {
  it("uses the exact town as Service Area when JobTread lists it", async () => {
    const { mapServiceArea } = await mod();
    expect(mapServiceArea("Cashiers")).toBe("Cashiers");
    expect(mapServiceArea("Highlands")).toBe("Highlands");
    expect(mapServiceArea("Sylva")).toBe("Sylva");
    expect(mapServiceArea("Webster")).toBe("Sylva");
  });
  it("stores front desk phones the same way as website forms", async () => {
    const { toUsE164 } = await mod();
    expect(toUsE164("828-524-7773")).toBe("+18285247773");
    expect(toUsE164("+1 (828) 524-7773")).toBe("+18285247773");
  });
});

describe("job names fit JobTread's 30 characters without cutting words", () => {
  it.each([
    ["TEST Urgent Roof Replacement Inquiry - Highlands - Diego", "TEST Reroof - Highlands - D"],
    ["TEST Urgent Roof Repair Lead - Cashiers - Rita", "TEST Roof Repair - Cashiers"],
    ["TEST Construction Addition Inquiry - Franklin - Elena", "TEST Addition - Franklin - E"],
  ])("%s", async (full, short) => {
    const { shortJobName } = await mod();
    expect(shortJobName(full)).toBe(short);
  });
});

describe("returning customers are matched by phone, then email, never by name", () => {
  const crm = (hit: { by: "phone" | "email" } | null, nameTaken = false) => {
    const queries: any[] = [];
    vi.stubGlobal("fetch", vi.fn(async (_u: string, init: any) => {
      const { query } = JSON.parse(init.body); queries.push(query);
      let r: any = {};
      if (query.customField) {
        const isPhone = query.customField.$.id === "22P5uYmnWzne";
        const found = hit && ((hit.by === "phone") === isPhone);
        r = { customField: { customFieldValues: { nodes: found ? [{ contact: { id: "old-contact", account: { id: "old-acct", type: "customer", locations: { nodes: [{ id: "old-loc", name: "1 Elm St", address: "1 Elm St, Franklin, NC" }] } } } }] : [] } } };
      } else if (query.organization) r = { organization: { accounts: { nodes: nameTaken ? [{ id: "other", contacts: { nodes: [{ id: "x" }] } }] : [] } } };
      else if (query.createAccount) r = nameTaken && query.createAccount.$.name === "John Mitchell"
        ? { error: { message: 'A customer with the name "John Mitchell" already exists' } }
        : { createAccount: { createdAccount: { id: "new-acct" } } };
      else if (query.createContact) r = { createContact: { createdContact: { id: "new-contact" } } };
      else if (query.createLocation) r = { createLocation: { createdLocation: { id: "new-loc" } } };
      else if (query.createJob) r = { createJob: { createdJob: { id: "job" } } };
      return new Response(JSON.stringify(r), { status: 200 });
    }));
    return queries;
  };
  const lead = { first_name: "John", last_name: "Mitchell", property_town: "Franklin", property_address: "9 New Rd", phone: "828-678-9340", email: "john@sample.org" };
  const count = (q: any[], op: string) => q.filter((x) => x[op]).length;

  it("a phone hit joins the existing customer and adds the new address as a property", async () => {
    const { buildPayload, sendToPaveApi } = await mod();
    const q = crm({ by: "phone" });
    const res = await sendToPaveApi(buildPayload(lead, "lead"));
    expect(res.ok).toBe(true);
    expect(count(q, "createAccount")).toBe(0);
    expect(count(q, "createContact")).toBe(0);
    expect(q.find((x) => x.createLocation).createLocation.$.accountId).toBe("old-acct");
    expect(q.find((x) => x.customField).customField.customFieldValues.$.where[2]).toBe("+18286789340");
  });

  it("an email hit is used when the phone is new", async () => {
    const { buildPayload, sendToPaveApi } = await mod();
    const q = crm({ by: "email" });
    await sendToPaveApi(buildPayload(lead, "lead"));
    expect(count(q, "createAccount")).toBe(0);
    expect(q.find((x) => x.createJob)).toBeTruthy();
  });

  it("a new person gets a plain name", async () => {
    const { buildPayload, sendToPaveApi } = await mod();
    const q = crm(null, false);
    await sendToPaveApi(buildPayload(lead, "lead"));
    expect(q.find((x) => x.createAccount).createAccount.$.name).toBe("John Mitchell");
  });

  it("the same name with a different phone and email is a separate customer, never merged", async () => {
    const { buildPayload, sendToPaveApi } = await mod();
    const q = crm(null, true);
    const res = await sendToPaveApi(buildPayload({ ...lead, property_address: "", property_town: "" }, "lead"));
    expect(res.ok).toBe(true);
    expect(q.filter((x) => x.createAccount).map((x) => x.createAccount.$.name)).toEqual(["John Mitchell", "John Mitchell (2)"]);
    expect(count(q, "createContact")).toBe(1);
  });

  it("a phone shared by several customers is ignored and email decides", async () => {
    const { buildPayload, sendToPaveApi } = await mod();
    const queries: any[] = [];
    const acct = (id: string) => ({ contact: { id: `c-${id}`, account: { id, type: "customer", locations: { nodes: [] } } } });
    vi.stubGlobal("fetch", vi.fn(async (_u: string, init: any) => {
      const { query } = JSON.parse(init.body); queries.push(query);
      let r: any = {};
      if (query.customField) r = { customField: { customFieldValues: { nodes: query.customField.$.id === "22P5uYmnWzne" ? [acct("a1"), acct("a2")] : [acct("email-acct")] } } };
      else if (query.createLocation) r = { createLocation: { createdLocation: { id: "l" } } };
      else if (query.createJob) r = { createJob: { createdJob: { id: "j" } } };
      return new Response(JSON.stringify(r), { status: 200 });
    }));
    await sendToPaveApi(buildPayload(lead, "lead"));
    expect(queries.find((x) => x.createLocation).createLocation.$.accountId).toBe("email-acct");
    expect(queries.filter((x) => x.createAccount)).toHaveLength(0);
  });
});
