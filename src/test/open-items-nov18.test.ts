import { beforeAll, describe, expect, it } from "vitest";
import { JOB_TYPES } from "@/intake/config";
import { EMPTY_LEAD, otherJobLabels, scoreLead } from "@/intake/scoring";
import { toRow } from "@/intake/save";
import { projectTypeFromPage } from "@/lib/form-service-context";

describe("front desk job types", () => {
  it("offers design as a job type", () => {
    expect(JOB_TYPES.find((o) => o.id === "design")?.label).toBe("Design or planning help");
  });

  it("keeps one main job type and puts extra work in the notes", () => {
    const lead = { ...EMPTY_LEAD, jobType: "roof_repair", otherJobTypes: ["gutters", "handyman", "roof_repair"], details: "Leak by chimney" };
    expect(otherJobLabels(lead)).toEqual(["Gutters only", "Handyman services"]);
    const row = toRow(lead, scoreLead(lead));
    expect(row.job_type).toBe("roof_repair");
    expect(row.details).toBe("Leak by chimney\nAlso needs: Gutters only, Handyman services");
  });

  it("does not change the score when extra work is added", () => {
    const base = { ...EMPTY_LEAD, jobType: "roof_repair" };
    expect(scoreLead({ ...base, otherJobTypes: ["handyman"] }).breakdown.jobType).toBe(scoreLead(base).breakdown.jobType);
  });
});

describe("new landing page routing", () => {
  it.each([["/lp/handyman", "handyman"], ["/lp/gutters", "gutters"], ["/roofing/property-managers", "commercial"], ["/construction/kitchen-remodeling", "addition"]])("%s preselects %s", (path, type) => {
    expect(projectTypeFromPage(path, "")).toBe(type);
  });
});

describe("what JobTread receives (mocked, nothing is sent)", () => {
  beforeAll(() => {
    (globalThis as unknown as { Deno: unknown }).Deno = { env: { get: () => "test" }, serve: () => undefined };
  });
  type Mapper = {
    normalizeIntakeLead: (row: object) => object;
    buildPayload: (row: object, kind: "lead") => { project: { service_category: string; project_description: string } };
    buildLeadLabel: (row: object) => string;
  };
  const mod = async () => (await import("@jobtread-sync")) as unknown as Mapper;
  const person = { name: "Margaret Hill", first_name: "Margaret", last_name: "Hill", phone: "+18285550100" };

  it("keeps the main job and puts extra work in the job notes", async () => {
    const m = await mod();
    const lead = { ...EMPTY_LEAD, jobType: "roof_repair", otherJobTypes: ["gutters", "roof_replacement"] };
    const row = m.normalizeIntakeLead({ ...person, ...toRow(lead, scoreLead(lead)) });
    const payload = m.buildPayload(row, "lead");
    expect(payload.project.service_category).toBe("roof_repair");
    expect(payload.project.project_description).toContain("Also needs: Gutters only, Roof replacement or new roof");
  });

  it.each([
    ["handyman", "Handyman & Small Repairs", "Handyman Inquiry"],
    ["gutters", "Seamless Gutters", "Gutter Inquiry"],
  ])("labels %s landing page leads correctly", async (category, type, label) => {
    const m = await mod();
    expect(m.buildLeadLabel({ ...person, source: "fast_lead_form", lead_type: category, service_category: category, project_type: type })).toContain(label);
  });
});
