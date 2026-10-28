import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { BUSINESS } from "@/data/business";

beforeAll(() => {
  (globalThis as any).Deno = { env: { get: () => "test" }, serve: () => undefined };
});
afterEach(() => vi.unstubAllGlobals());
const mod = async () => (await import("@jobtread-sync")) as any;
const PHONE = "22P5uYmnWzne", SECONDARY = "22P6KUNyV3jy", EMAIL = "22P5uYmYEAkx";
const lead = { name: "Jane Doe", first_name: "Jane", last_name: "Doe", phone: "+18285550102", email: "jane@example.org", source: "contact", service_category: "general" };
const values = (primary = "+18285550101", secondary = "") => ({ nodes: [
  { customField: { id: PHONE }, value: primary }, { customField: { id: SECONDARY }, value: secondary },
  { customField: { id: EMAIL }, value: lead.email },
] });

function fake({ name = "Jane Doe", by = EMAIL, locations = [{ id: "property", address: "1 Elm St, Franklin, NC" }], secondary = "", failedUpdate = false } = {}) {
  const queries: any[] = [];
  let fields = values("+18285550101", secondary);
  let people: any[] = [{ id: "contact", name, customFieldValues: fields }];
  vi.stubGlobal("fetch", vi.fn(async (_url, init) => {
    const q = JSON.parse(init.body).query; queries.push(q);
    let r: any = {};
    if (q.customField) {
      const hits = q.customField.$.id === by ? people.map((c) => ({ contact: { ...c, account: { id: "customer", type: "customer", locations: { nodes: locations } } } })) : [];
      r = { customField: { customFieldValues: { nodes: hits } } };
    } else if (q.account) r = { account: { contacts: { nodes: people }, locations: { nodes: locations } } };
    else if (q.createContact) {
      people = [...people, { id: "second-person", name: q.createContact.$.name, customFieldValues: { nodes: Object.entries(q.createContact.$.customFieldValues).map(([id, value]) => ({ customField: { id }, value })) } }];
      r = { createContact: { createdContact: { id: "second-person" } } };
    } else if (q.updateContact) {
      fields = values("+18285550101", q.updateContact.$.customFieldValues[SECONDARY]);
      people[0].customFieldValues = fields;
      r = failedUpdate ? { error: { message: "update rejected" } } : { updateContact: { contact: { id: "contact", name, customFieldValues: fields } } };
    } else if (q.createAccount) r = { createAccount: { createdAccount: { id: "new-customer" } } };
    else if (q.createLocation) {
      locations.push({ id: "office-property", address: q.createLocation.$.address });
      r = { createLocation: { createdLocation: { id: "office-property" } } };
    } else if (q.createJob) r = { createJob: { createdJob: { id: "job" } } };
    return new Response(JSON.stringify(r));
  }));
  return queries;
}

describe("October 20 JobTread corrections (mocked delivery only)", () => {
  it("reuses the customer's existing property when no street address was supplied", async () => {
    const { buildPayload, sendToPaveApi } = await mod();
    const q = fake({ by: PHONE });
    expect((await sendToPaveApi(buildPayload(lead, "lead"))).ok).toBe(true);
    expect(q.filter((x) => x.createLocation)).toHaveLength(0);
    expect(q.find((x) => x.createJob).createJob.$.locationId).toBe("property");
  });

  it("uses 40 Depot Street only when the account has no property, and reuses it next time", async () => {
    const { buildPayload, sendToPaveApi, OFFICE_PLACEHOLDER_ADDRESS } = await mod();
    const q = fake({ by: PHONE, locations: [] });
    expect((await sendToPaveApi(buildPayload(lead, "lead"))).ok).toBe(true);
    expect((await sendToPaveApi(buildPayload(lead, "lead"))).ok).toBe(true);
    expect(q.filter((x) => x.createLocation)).toHaveLength(1);
    expect(q.find((x) => x.createLocation).createLocation.$.address).toBe("40 Depot Street, Franklin, NC 28734");
    const office = BUSINESS.locations.find((x) => x.id === "franklin");
    expect(OFFICE_PLACEHOLDER_ADDRESS).toBe(`${office?.streetAddress}, ${office?.locality}, ${office?.region} ${office?.postalCode}`);
  });

  it.each([PHONE, EMAIL])("creates a second person's contact on a shared identifier %s", async (by) => {
    const { buildPayload, sendToPaveApi } = await mod();
    const q = fake({ name: "Bruno Costa", by });
    expect((await sendToPaveApi(buildPayload(lead, "lead"))).ok).toBe(true);
    expect(q.filter((x) => x.createAccount)).toHaveLength(0);
    expect(q.find((x) => x.createContact).createContact.$).toMatchObject({ accountId: "customer", name: "Jane Doe" });
    expect(q.filter((x) => x.updateContact)).toHaveLength(0);
  });

  it("saves an email-matched person's new phone as Secondary Phone, preserving their primary", async () => {
    const { buildPayload, sendToPaveApi } = await mod();
    const q = fake();
    expect((await sendToPaveApi(buildPayload(lead, "lead"))).ok).toBe(true);
    expect(q.find((x) => x.updateContact).updateContact.$).toEqual({ id: "contact", customFieldValues: { [SECONDARY]: "+18285550102" } });
    expect(q.filter((x) => x.createContact)).toHaveLength(0);
  });

  it("does not overwrite an already occupied Secondary Phone", async () => {
    const { buildPayload, sendToPaveApi } = await mod();
    const q = fake({ secondary: "+18285550103" });
    const result = await sendToPaveApi(buildPayload(lead, "lead"));
    expect(result.ok).toBe(false);
    expect(result.error).toContain("office review required");
    expect(q.filter((x) => x.updateContact || x.createJob)).toHaveLength(0);
  });

  it("keeps failed secondary-phone saves queued instead of reporting successful delivery", async () => {
    const { buildPayload, sendToPaveApi } = await mod();
    const q = fake({ failedUpdate: true });
    expect((await sendToPaveApi(buildPayload(lead, "lead"))).ok).toBe(false);
    expect(q.filter((x) => x.createJob)).toHaveLength(0);
  });

  it("a failed attempt resumes the same person's contact and existing property", async () => {
    const { buildPayload, sendToPaveApi } = await mod();
    const q = fake({ by: PHONE });
    expect((await sendToPaveApi(buildPayload(lead, "lead"), { progress: { accountId: "customer" } })).ok).toBe(true);
    expect(q.filter((x) => x.createContact || x.createLocation)).toHaveLength(0);
  });

  it("Design enquiries go to Design, general enquiries to Roofing, missing town to Franklin", async () => {
    const { buildPayload, buildJobCustomFieldValues, buildAccountCustomFieldValues } = await mod();
    expect(buildJobCustomFieldValues(buildPayload({ ...lead, service_category: "design_services" }, "lead"), "notes")["22PNawhnSXmW"]).toEqual(["Design"]);
    expect(buildJobCustomFieldValues(buildPayload(lead, "lead"), "notes")["22PNawhnSXmW"]).toEqual(["Roofing"]);
    expect(buildAccountCustomFieldValues(null)["22P72GvSrBgk"]).toBe("Franklin");
  });

  it("allows only Secondary Phone contact edits, including nested mutations", async () => {
    const { assertNoCustomerRewrite } = await mod();
    expect(() => assertNoCustomerRewrite({ updateContact: { $: { id: "contact", customFieldValues: { [SECONDARY]: "+18285550102" } } } })).not.toThrow();
    expect(() => assertNoCustomerRewrite({ updateContact: { $: { id: "contact", customFieldValues: { [PHONE]: "+18285550102" } } } })).toThrow();
    expect(() => assertNoCustomerRewrite({ nested: { updateContact: { $: { id: "contact", name: "changed" } } } })).toThrow();
  });
});