import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { JOB_TYPES, LEAK_JOB_TYPES, ROOF_DETAIL_JOB_TYPES } from "@/intake/config";
import { EMPTY_LEAD, leadSummary, scoreLead } from "@/intake/scoring";
import { buildLeadAlertHtml, leadAlertFields } from "../../supabase/functions/_shared/leadAlertEmail";

beforeAll(() => {
  (globalThis as any).Deno = { env: { get: () => "test" }, serve: () => undefined };
});
afterEach(() => vi.unstubAllGlobals());
const mod = async () => (await import("@jobtread-sync")) as any;

// Mocked CRM only: never send a synthetic lead to the live JobTread org.
const CONTACT = { email: "22P5uYmYEAkx", phone: "22P5uYmnWzne", phone2: "22P6KUNyV3jy" };
const DIVISIONS = "22PNawhnSXmW";

const call = (over: Record<string, unknown> = {}) => ({
  name: "Margaret Hill",
  first_name: "Margaret",
  last_name: "Hill",
  phone: "+18285550100",
  property_address: "53 Mountain Road",
  property_town: "Franklin",
  service_category: "roof_repair",
  project_type: "roof_repair",
  source: "front_desk",
  metadata: { phone2: "828-555-0111", receptionist: "Susan" },
  ...over,
});

describe("front desk requests (Nov 9)", () => {
  it("offers skylight, chimney and handyman under What & When", () => {
    const ids = JOB_TYPES.map((o) => o.id);
    expect(ids).toEqual(expect.arrayContaining(["skylight", "chimney", "handyman"]));
    expect(JOB_TYPES.find((o) => o.id === "skylight")?.label).toBe("Skylight repair or replacement");
    expect(JOB_TYPES.find((o) => o.id === "handyman")?.label).toBe("Handyman services");
    expect(ROOF_DETAIL_JOB_TYPES).toEqual(expect.arrayContaining(["skylight", "chimney"]));
    expect(LEAK_JOB_TYPES).toEqual(expect.arrayContaining(["skylight", "chimney"]));
    expect(ROOF_DETAIL_JOB_TYPES).not.toContain("handyman");
  });

  it.each([
    ["skylight", "Roofing"],
    ["chimney", "Repair"],
    ["handyman", "Small Projects"],
  ])("sends %s to JobTread's %s division", async (jobType, division) => {
    const { buildPayload, buildJobCustomFieldValues } = await mod();
    const payload = buildPayload(call({ service_category: jobType, project_type: jobType }), "lead");
    expect(buildJobCustomFieldValues(payload, "n")[DIVISIONS]).toEqual([division]);
  });

  it("names every new job LEAD, whatever the work", async () => {
    const { buildJobName } = await mod();
    for (const t of ["roof_replacement", "addition_remodel", "skylight", "chimney", "handyman", "gutters"]) {
      expect(buildJobName(call({ service_category: t, project_type: t }))).toBe("LEAD - Hill - 53");
    }
  });

  it("puts the caller's second number in JobTread's Secondary Phone (+1 format)", async () => {
    const { buildPayload, buildContactCustomFieldValues } = await mod();
    const payload = buildPayload(call(), "lead");
    expect(buildContactCustomFieldValues(payload.contact)).toMatchObject({
      [CONTACT.phone]: "+18285550100",
      [CONTACT.phone2]: "+18285550111",
    });
  });

  it("gives the point of contact a second number too", async () => {
    const { buildPayload, sendToPaveApi } = await mod();
    const created: any[] = [];
    vi.stubGlobal(
      "fetch",
      vi.fn(async (_u: string, init: any) => {
        const { query } = JSON.parse(init.body);
        let body: any = {};
        if (query.createAccount) body = { createAccount: { createdAccount: { id: "a1" } } };
        else if (query.createContact) {
          created.push(query.createContact.$);
          body = { createContact: { createdContact: { id: `c${created.length}` } } };
        } else if (query.createLocation) body = { createLocation: { createdLocation: { id: "l1" } } };
        else if (query.createJob) body = { createJob: { createdJob: { id: "j1" } } };
        else if (query.account) body = { account: { contacts: { nodes: [] }, locations: { nodes: [] } } };
        return new Response(JSON.stringify(body), { status: 200 });
      }),
    );
    const row = call({ metadata: { pocName: "Laura Hill", pocPhone: "828-555-0199", pocPhone2: "828-555-0198" } });
    expect((await sendToPaveApi(buildPayload(row, "lead"))).ok).toBe(true);
    const poc = created.find((c) => c.title === "Point of contact");
    expect(poc.customFieldValues).toEqual({ [CONTACT.phone]: "+18285550199", [CONTACT.phone2]: "+18285550198" });
  });

  it("shows second numbers on the sheet, in the summary and in the alert email", () => {
    const sheet = readFileSync("src/intake/IntakeSheet.tsx", "utf8");
    expect(sheet).toContain("+ Add another number");
    expect(sheet).toContain('set("phone2"');
    expect(sheet).toContain('set("pocPhone2"');

    const lead = { ...EMPTY_LEAD, firstName: "Margaret", phone: "828-555-0100", phone2: "828-555-0111" };
    expect(leadSummary(lead, scoreLead(lead), "")).toContain("Second phone: 828-555-0111");

    const f = leadAlertFields("intake_leads", { ...call(), created_at: new Date().toISOString() });
    expect(f.phone2).toBe("828-555-0111");
    expect(buildLeadAlertHtml(f, { kind: "success" })).toContain('href="tel:8285550111"');
  });
});
