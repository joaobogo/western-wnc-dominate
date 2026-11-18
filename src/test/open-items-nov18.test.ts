import { describe, expect, it } from "vitest";
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
