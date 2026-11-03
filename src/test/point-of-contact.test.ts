import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { buildLeadAlertHtml, leadAlertFields } from "../../supabase/functions/_shared/leadAlertEmail";
import { EMPTY_LEAD, leadSummary, scoreLead } from "@/intake/scoring";

beforeAll(() => {
  (globalThis as any).Deno = { env: { get: () => "test" }, serve: () => undefined };
});
afterEach(() => vi.unstubAllGlobals());
const mod = async () => (await import("@jobtread-sync")) as any;

// Mocked CRM only: never send a synthetic lead to the live JobTread org.
const CONTACT = { email: "22P5uYmYEAkx", phone: "22P5uYmnWzne" };
const LOCATION = { contact_name: "22PPzwDNUYjN", phone: "22PPzw5sqRSX" };
const JOB_NOTES = "22PYx7PBhE56";

// A front desk call as normalizeIntakeLead hands it to the mapper: the sheet's
// fields (pocName/pocPhone/pocEmail) arrive inside metadata.
const CALL = {
  name: "Margaret Hill",
  first_name: "Margaret",
  last_name: "Hill",
  phone: "+18285550100",
  property_address: "53 Mountain Road",
  property_town: "Franklin",
  service_category: "roof_repair",
  project_type: "roof_repair",
  source: "front_desk",
  metadata: { pocName: "Laura Hill", pocPhone: "828-555-0199", pocEmail: "laura@sample.org", receptionist: "Frank" },
};

const mockCrm = (accountContacts: any[] = []) => {
  const queries: any[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (_url: string, init: any) => {
      const { query } = JSON.parse(init.body);
      queries.push(query);
      let body: any = {};
      if (query.createAccount) body = { createAccount: { createdAccount: { id: "account-1" } } };
      else if (query.createContact) {
        const n = queries.filter((q) => q.createContact).length;
        body = { createContact: { createdContact: { id: `contact-${n}` } } };
      } else if (query.createLocation) body = { createLocation: { createdLocation: { id: "location-1" } } };
      else if (query.createJob) body = { createJob: { createdJob: { id: "job-1" } } };
      else if (query.account) body = { account: { contacts: { nodes: accountContacts }, locations: { nodes: [] } } };
      return new Response(JSON.stringify(body), { status: 200 });
    }),
  );
  return { queries, contacts: () => queries.filter((q) => q.createContact).map((q) => q.createContact.$) };
};

describe("point of contact", () => {
  it("is read from the front desk sheet and phone is stored as +1XXXXXXXXXX", async () => {
    const { pointOfContact } = await mod();
    expect(pointOfContact(CALL)).toEqual({ name: "Laura Hill", phone: "+18285550199", email: "laura@sample.org" });
    expect(pointOfContact({ ...CALL, metadata: {} })).toBeNull();
    expect(pointOfContact({ metadata: { pocPhone: "8285550199" } })).toEqual({ name: "Point of contact", phone: "+18285550199", email: null });
  });

  it("leads the JobTread job notes", async () => {
    const { buildPayload, buildLeadNotes } = await mod();
    const notes = buildLeadNotes(CALL);
    const at = notes.indexOf("*** POINT OF CONTACT — send all communication here ***");
    expect(at).toBeGreaterThan(-1);
    expect(at).toBeLessThan(notes.indexOf("Margaret Hill"));
    expect(notes).toContain("Laura Hill");
    expect(notes).toContain("laura@sample.org");
    expect(buildPayload(CALL, "lead").point_of_contact?.name).toBe("Laura Hill");
  });

  it("becomes its own 'Point of contact' contact on the customer and the property contact", async () => {
    const { buildPayload, sendToPaveApi } = await mod();
    const crm = mockCrm();
    const result = await sendToPaveApi(buildPayload(CALL, "lead"));
    expect(result.ok).toBe(true);
    const [primary, poc] = crm.contacts();
    expect(primary.name).toBe("Margaret Hill");
    expect(poc).toMatchObject({ accountId: "account-1", name: "Laura Hill", title: "Point of contact" });
    expect(poc.customFieldValues).toEqual({ [CONTACT.phone]: "+18285550199", [CONTACT.email]: "laura@sample.org" });
    const loc = crm.queries.find((q) => q.createLocation).createLocation.$.customFieldValues;
    expect(loc[LOCATION.contact_name]).toBe("Laura Hill");
    expect(loc[LOCATION.phone]).toBe("+18285550199");
    expect(crm.queries.find((q) => q.createJob).createJob.$.customFieldValues[JOB_NOTES]).toContain("POINT OF CONTACT");
    expect(result.progress.pocContactId).toBe("contact-2");
  });

  it("reuses a matching contact and never adds it twice on a retry", async () => {
    const { buildPayload, sendToPaveApi } = await mod();
    const crm = mockCrm([{ id: "laura-old", name: "Laura Hill" }]);
    const result = await sendToPaveApi(buildPayload(CALL, "lead"));
    expect(crm.contacts().map((c) => c.name)).toEqual(["Margaret Hill"]);
    expect(result.progress.pocContactId).toBe("laura-old");

    const again = mockCrm();
    await sendToPaveApi(buildPayload(CALL, "lead"), { progress: { accountId: "account-1", contactId: "c-1", pocContactId: "laura-old" } });
    expect(again.contacts()).toEqual([]);
  });

  it("leaves leads without one exactly as before", async () => {
    const { buildPayload, sendToPaveApi } = await mod();
    const crm = mockCrm();
    await sendToPaveApi(buildPayload({ ...CALL, metadata: {} }, "lead"));
    expect(crm.contacts()).toHaveLength(1);
    const loc = crm.queries.find((q) => q.createLocation).createLocation.$.customFieldValues;
    expect(loc[LOCATION.contact_name]).toBe("Margaret Hill");
  });

  it("shows in the lead alert email and the copied call summary", () => {
    const f = leadAlertFields("intake_leads", { ...CALL, created_at: new Date().toISOString() });
    expect(f.pointOfContact).toBe("Laura Hill · 828-555-0199 · laura@sample.org");
    expect(buildLeadAlertHtml(f, { kind: "success" })).toContain("Point of contact (send all communication here)");

    const lead = { ...EMPTY_LEAD, firstName: "Margaret", lastName: "Hill", pocName: "Laura Hill", pocPhone: "828-555-0199" };
    expect(leadSummary(lead, scoreLead(lead), "")).toContain("Point of contact: Laura Hill · 828-555-0199");
  });

  it("is on the call sheet as name, phone and email", () => {
    const sheet = readFileSync("src/intake/IntakeSheet.tsx", "utf8");
    expect(sheet).toMatch(/Someone else is the point of contact/);
    for (const field of ['set("pocName"', 'set("pocPhone"', 'set("pocEmail"']) expect(sheet).toContain(field);
  });
});
