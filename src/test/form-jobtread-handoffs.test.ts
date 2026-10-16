import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("consultation delivery fallback", () => {
  it.each([
    "src/components/intake/RoofingIntakeForm.tsx",
    "src/components/intake/ConstructionIntakeForm.tsx",
    "src/components/intake/DesignPlanningIntakeForm.tsx",
    "src/pages/RoofingBuilder.tsx",
    "src/pages/ConstructionBuilder.tsx",
  ])("links %s to the canonical lead and forwards only on a failed mirror", path => {
    const source = readFileSync(path, "utf8");
    expect(source).toContain("consultation_request_id: consultId");
    expect(source).toMatch(/catch \(e\) \{[\s\S]*?syncConsultationRequestToJobTread\(consultId\)/);
    expect(source).toContain("requireStoredLead(await submitLead(");
  });
  it("does not advance quiz results after rejected storage", () => {
    const source = readFileSync("src/components/RoofAssessmentQuiz.tsx", "utf8");
    expect(source).toMatch(/requireStoredLead\(await submit\([\s\S]*?goTo\("result"\)/);
    expect(source).toContain('role="alert"');
  });
});