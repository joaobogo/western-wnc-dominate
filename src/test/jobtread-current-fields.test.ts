import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

beforeAll(() => {
  (globalThis as any).Deno = { env: { get: () => "test" }, serve: () => undefined };
});
afterEach(() => vi.unstubAllGlobals());
const mod = async () => (await import("@jobtread-sync")) as any;

// Highlander's JobTread field update (16 Oct 2026). Mocked CRM only: never send
// a synthetic lead to the live JobTread org.
const STATUS = "22P5uYmYTED2";
const DIVISIONS = "22PNawhnSXmW";
const JOB_NOTES = "22PYx7PBhE56";
const ACCOUNT_COMM_PREF = "22PPQYmK3SXB";
const CONTACT = { email: "22P5uYmYEAkx", phone: "22P5uYmnWzne", phone2: "22P6KUNyV3jy", pref: "22PgE4a3Qn6X" };
const RETIRED = ["22P6NLAkTWjs", "22PPQYu3uBCx", "22PNm2NKGREB", "22P9zdkEzDpv", "22PNwBiMbUzf", "22PTWFAtwzqx", "22P6KUiJD3EJ", ACCOUNT_COMM_PREF];

const LEAD = {
  name: "Jane Doe",
  first_name: "Jane",
  last_name: "Doe",
  property_town: "Franklin",
  property_address: "53 Mountain Road",
  phone: "8285551234",
  email: "jane@sample.org",
  preferred_contact_method: "text",
  service_category: "roofing",
  project_type: "roof_repair",
  project_description: "Leak in kitchen",
  source: "roofing_intake_form",
};

type Handler = (query: any) => any;
const mockCrm = (overrides: Partial<Record<string, Handler>> = {}) => {
  const queries: any[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (_url: string, init: any) => {
      const { query } = JSON.parse(init.body);
      queries.push(query);
      const op = ["organization", "createAccount", "createContact", "createLocation", "createJob"].find((k) => query[k]);
      const defaults: Record<string, Handler> = {
        organization: () => ({ organization: { accounts: { nodes: [] } } }),
        createAccount: () => ({ createAccount: { createdAccount: { id: "account-1" } } }),
        createContact: () => ({ createContact: { createdContact: { id: "contact-1" } } }),
        createLocation: () => ({ createLocation: { createdLocation: { id: "location-1" } } }),
        createJob: () => ({ createJob: { createdJob: { id: "job-1" } } }),
      };
      const handler = (op && (overrides[op] ?? defaults[op])) || (() => ({}));
      return new Response(JSON.stringify(handler(query)), { status: 200 });
    }),
  );
  return { queries, count: (op: string) => queries.filter((q) => q[op]).length, find: (op: string) => queries.find((q) => q[op])?.[op].$ };
};

describe("JobTread field contract (16 Oct 2026 update)", () => {
  it.each([
    ["roofing", "roof_replacement", "Roofing"],
    ["roofing", "roof_repair", "Repair"],
    ["storm", "storm_damage", "Repair"],
    ["gutters", "gutter_guards", "Gutters"],
    ["construction", "addition", "Construction"],
    ["design_services", "design_planning", "Construction"],
  ])("Fix 1: sends %s / %s as a Divisions list, with no account field on the job", async (category, type, division) => {
    const { buildJobCustomFieldValues } = await mod();
    const fields = buildJobCustomFieldValues({ project: { service_category: category, project_type: type }, contact: {} }, "Intake notes");
    expect(fields[DIVISIONS]).toEqual([division]);
    expect(Object.keys(fields).sort()).toEqual([STATUS, DIVISIONS, JOB_NOTES].sort());
    expect(fields[ACCOUNT_COMM_PREF]).toBeUndefined();
    expect(fields[JOB_NOTES]).toBe("Intake notes");
  });

  it.each([
    ["text", "Text"],
    ["SMS", "Text"],
    ["email", "Email"],
    ["call", "Phone"],
    ["phone", "Phone"],
    ["mail", "Mail"],
    ["any", "Any"],
    ["", ""],
    [null, ""],
  ])("Fix 2: maps communication preference %s to the contact option %s", async (input, output) => {
    const { mapCommPref } = await mod();
    expect(mapCommPref(input)).toBe(output);
  });

  it("Fix 2: email and phones are contact custom fields; blanks are left out", async () => {
    const { buildContactCustomFieldValues } = await mod();
    expect(buildContactCustomFieldValues({ email: "jane@sample.org", phone: "8285551234", secondary_phone: "8285559999", preferred_contact_method: "email" })).toEqual({
      [CONTACT.email]: "jane@sample.org",
      [CONTACT.phone]: "8285551234",
      [CONTACT.phone2]: "8285559999",
      [CONTACT.pref]: "Email",
    });
    expect(buildContactCustomFieldValues({ email: "", phone: "8285551234" })).toEqual({ [CONTACT.phone]: "8285551234" });
  });

  it("Fix 4: builds the full street address for the property", async () => {
    const { buildFullAddress } = await mod();
    expect(buildFullAddress({ property_address: "53 Mountain Road", property_town: "Franklin" })).toBe("53 Mountain Road, Franklin, NC");
    expect(buildFullAddress({ property_address: "53 Mountain Road", property_town: "Franklin", property_zip: "28734" })).toBe("53 Mountain Road, Franklin, NC 28734");
    expect(buildFullAddress({ property_address: "53 Mountain Rd, Franklin, NC 28734", property_town: "Franklin" })).toBe("53 Mountain Rd, Franklin, NC 28734");
    expect(buildFullAddress({ property_town: "Franklin" })).toBeNull();
  });

  it("keeps the account fields and excludes retired Location fields", async () => {
    const { buildAccountCustomFieldValues, buildLocationCustomFieldValues } = await mod();
    expect(buildAccountCustomFieldValues("Franklin")["22P75KEjYCfa"]).toBe("Highlander Website");
    expect(buildLocationCustomFieldValues({ gateCodeBool: false, contactName: "Jane", phone: "8285551234", email: "jane@sample.org" }))
      .toEqual({ "22PPzwDNUYjN": "Jane", "22PPzw5sqRSX": "8285551234" });
  });
});

describe("JobTread sync flow (mocked CRM only)", () => {
  it("creates exactly one account, contact, property and job with the new fields", async () => {
    const { buildPayload, sendToPaveApi } = await mod();
    const crm = mockCrm();
    const result = await sendToPaveApi(buildPayload(LEAD, "lead"));
    expect(result.ok).toBe(true);
    expect(result.id).toBe("job-1");
    expect(["createAccount", "createContact", "createLocation", "createJob"].map(crm.count)).toEqual([1, 1, 1, 1]);

    expect(crm.find("createAccount").customFieldValues["22P75KEjYCfa"]).toBe("Highlander Website");

    const contact = crm.find("createContact");
    expect(Object.keys(contact).sort()).toEqual(["accountId", "customFieldValues", "name"]);
    expect(contact.customFieldValues).toEqual({ [CONTACT.email]: "jane@sample.org", [CONTACT.phone]: "8285551234", [CONTACT.pref]: "Text" });

    expect(crm.find("createLocation").address).toBe("53 Mountain Road, Franklin, NC");

    const job = crm.find("createJob");
    expect(job.description).toBeUndefined();
    expect(job.jobNumber).toBeUndefined();
    expect(job.customFieldValues[DIVISIONS]).toEqual(["Repair"]);
    expect(job.customFieldValues[JOB_NOTES]).toContain("Leak in kitchen");

    const sent = JSON.stringify(crm.queries);
    for (const id of RETIRED) expect(sent).not.toContain(id);
  });

  it("Fix 2: a contact failure fails the attempt instead of being swallowed", async () => {
    const { buildPayload, sendToPaveApi } = await mod();
    const crm = mockCrm({ createContact: () => ({ error: { message: "bad field" } }) });
    const saved: any[] = [];
    const result = await sendToPaveApi(buildPayload(LEAD, "lead"), { onProgress: (p: any) => saved.push(p) });
    expect(result.ok).toBe(false);
    expect(result.error).toContain("createContact");
    expect(crm.count("createLocation")).toBe(0);
    expect(crm.count("createJob")).toBe(0);
    expect(saved.at(-1)).toEqual({ accountId: "account-1" });
  });

  it("Fix 3: a retry reuses saved IDs and redoes only the failed step", async () => {
    const { buildPayload, sendToPaveApi } = await mod();
    const crm = mockCrm();
    const result = await sendToPaveApi(buildPayload(LEAD, "lead"), {
      progress: { accountId: "account-1", contactId: "contact-1", locationId: "location-1" },
      priorAttempts: 1,
    });
    expect(result).toMatchObject({ ok: true, id: "job-1" });
    expect(["organization", "createAccount", "createContact", "createLocation"].map(crm.count)).toEqual([0, 0, 0, 0]);
    expect(crm.find("createJob").locationId).toBe("location-1");
  });

  it("Fix 3: never creates a second job when the job already exists", async () => {
    const { buildPayload, sendToPaveApi } = await mod();
    const crm = mockCrm();
    const result = await sendToPaveApi(buildPayload(LEAD, "lead"), { progress: { accountId: "a", contactId: "c", locationId: "l", jobId: "job-9" } });
    expect(result).toMatchObject({ ok: true, id: "job-9" });
    expect(crm.queries).toHaveLength(0);
  });

  it("Fix 3: a lead that failed before reuses its first account and property, and adds its missing contact", async () => {
    const { buildPayload, sendToPaveApi } = await mod();
    const crm = mockCrm({
      organization: () => ({
        organization: { accounts: { nodes: [{ id: "account-old", name: "Jane Doe", locations: { nodes: [{ id: "location-old", name: "53 Mountain Road", address: null }] } }] } },
      }),
    });
    const result = await sendToPaveApi(buildPayload(LEAD, "lead"), { priorAttempts: 3 });
    expect(result.ok).toBe(true);
    expect(crm.count("createAccount")).toBe(0);
    expect(crm.count("createLocation")).toBe(0);
    expect(crm.find("createContact").accountId).toBe("account-old");
    expect(crm.find("createJob").locationId).toBe("location-old");
  });

  it("leaves an existing customer's contacts alone on a first-time lead", async () => {
    const { buildPayload, sendToPaveApi } = await mod();
    const crm = mockCrm({
      organization: () => ({
        organization: { accounts: { nodes: [{ id: "account-cust", name: "Jane Doe", locations: { nodes: [{ id: "loc-cust", name: "Franklin home", address: "1 Elm St, Franklin, NC" }] } }] } },
      }),
    });
    const result = await sendToPaveApi(buildPayload(LEAD, "lead"));
    expect(result.ok).toBe(true);
    expect(crm.count("createAccount")).toBe(0);
    expect(crm.count("createContact")).toBe(0);
    expect(crm.find("createLocation").accountId).toBe("account-cust");
  });
});
