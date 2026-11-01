import { beforeAll, describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { lookupKey } from "@/intake/ExistingCustomer";
import { ROOF_DETAIL_JOB_TYPES } from "@/intake/config";

beforeAll(() => {
  (globalThis as any).Deno = { env: { get: () => "test" }, serve: () => undefined };
});
const mod = async () => (await import("@jobtread-sync")) as any;

// Same counter as the 413 guard in jobtread-current-fields.test.ts.
const worstCaseNodes = (node: unknown): number => {
  if (!node || typeof node !== "object") return 1;
  const obj = node as Record<string, unknown>;
  const size = typeof (obj.$ as { size?: number } | undefined)?.size === "number" ? (obj.$ as { size: number }).size : 1;
  let inner = 0;
  for (const [key, value] of Object.entries(obj)) {
    if (key === "$") continue;
    inner += worstCaseNodes(value);
  }
  return size * Math.max(1, inner);
};

describe("call sheet: is this caller already a customer?", () => {
  it("waits for a full phone number or a complete email before asking JobTread", () => {
    expect(lookupKey("828-555", "")).toBeNull();
    expect(lookupKey("", "jane@")).toBeNull();
    expect(lookupKey("(828) 555-0100", "")).toEqual({ phone: "8285550100", email: "" });
    expect(lookupKey("1 828 555 0100", " Jane@Sample.org ")).toEqual({ phone: "8285550100", email: "jane@sample.org" });
  });

  it("keeps the job read small enough for JobTread", async () => {
    const { customerLookupQuery } = await mod();
    expect(worstCaseNodes(customerLookupQuery("22PAcct"))).toBeLessThan(2000);
    expect(worstCaseNodes(customerLookupQuery("22PAcct", false))).toBeLessThan(2000);
  });

  it("shows the newest five jobs first and marks closed ones", async () => {
    const { summarizeCustomerLookup } = await mod();
    const jobs = Array.from({ length: 7 }, (_, i) => ({
      id: `j${i}`,
      name: `Job ${i}`,
      number: 100 + i,
      createdAt: `2026-0${i + 1}-01T12:00:00Z`,
      closedOn: i === 6 ? null : "2026-09-01",
    }));
    const r = summarizeCustomerLookup(
      { accountId: "22PAcct", contact: { name: "Jane Doe" }, byEmail: false, locations: [{ name: "Home", address: "53 Mountain Road" }] },
      { name: "Jane Doe", jobs: { nodes: jobs } },
    );
    expect(r).toMatchObject({ found: true, accountName: "Jane Doe", matchedBy: "phone" });
    expect(r.jobs.map((j: any) => j.id)).toEqual(["j6", "j5", "j4", "j3", "j2"]);
    expect(r.jobs[0]).toMatchObject({ number: "106", open: true });
    expect(r.jobs[1].open).toBe(false);
    expect(r.locations).toEqual([{ name: "Home", address: "53 Mountain Road" }]);
  });

  it("is read-only and limited to signed-in front desk or admin users", () => {
    const src = readFileSync("supabase/functions/jobtread-sync/index.ts", "utf8");
    const handler = src.slice(src.indexOf('if (body.action === "customer_lookup")'), src.indexOf("// Dry run of the office alert email"));
    expect(handler).toMatch(/privileged \|\| \(await callerIsFrontDesk\(req\)\)/);
    expect(handler).toMatch(/401/);
    const lookup = src.slice(src.indexOf("async function lookupCustomer"), src.indexOf("/** Signed-in front desk or admin user"));
    expect(lookup).not.toMatch(/create|update|delete/i);
    expect(src).toMatch(/rpc\("is_front_desk"/);
  });
});

describe("call sheet: roof basics up top", () => {
  const sheet = readFileSync("src/intake/IntakeSheet.tsx", "utf8");

  it("asks roof type, stories and pitch in the job section, before the optional extras", () => {
    const roof = sheet.indexOf('data-testid="roof-details"');
    expect(roof).toBeGreaterThan(sheet.indexOf('title="What &amp; when"'));
    expect(roof).toBeLessThan(sheet.indexOf("More appointment details (optional)"));
    for (const label of ['label="Roof type"', 'label="Stories"', 'label="Steep pitch"']) {
      expect(sheet.indexOf(label)).toBeGreaterThan(roof);
      expect(sheet.indexOf(label)).toBeLessThan(sheet.indexOf('title="Office only"'));
    }
  });

  it("covers every roof job and skips remodels and new builds", () => {
    expect(ROOF_DETAIL_JOB_TYPES).toEqual(expect.arrayContaining(["roof_replacement", "roof_repair", "storm_insurance"]));
    expect(ROOF_DETAIL_JOB_TYPES).not.toContain("addition_remodel");
    expect(ROOF_DETAIL_JOB_TYPES).not.toContain("new_build");
  });

  it("still saves the answers where JobTread reads them (appointment.roofType / stories)", () => {
    expect(sheet).toMatch(/setAppointment\("roofType"/);
    expect(sheet).toMatch(/setAppointment\("stories"/);
  });
});
