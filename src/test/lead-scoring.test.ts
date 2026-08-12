import { describe, it, expect } from "vitest";
import {
  scoreLead,
  scoreBreakdown,
  leadTierLabel,
  isUrgentLead,
  HOT_LEAD_SCORE,
} from "@/lib/lead-scoring";

describe("scoreLead", () => {
  it("returns 0 for an empty submission", () => {
    expect(scoreLead({})).toBe(0);
  });

  it("never leaves the 0-100 range, even with a large bonus", () => {
    const max = scoreLead({
      serviceCategory: "roofing",
      projectType: "storm",
      timeline: "emergency",
      urgency: "active leak",
      budgetRange: "$100,000+",
      insuranceStatus: "active_claim",
      propertyType: "commercial",
      hasPlans: true,
      hasPhotos: true,
      decisionMakerOnSite: true,
      town: "Highlands",
      description: "x".repeat(200),
      bonus: 50,
    });
    expect(max).toBe(100);
    expect(scoreLead({ bonus: -500 })).toBe(0);
  });

  it("scores an emergency storm lead as urgent (70+)", () => {
    const score = scoreLead({
      serviceCategory: "roofing",
      projectType: "storm",
      timeline: "emergency",
      insuranceStatus: "active_claim",
      propertyType: "primary",
      hasPhotos: true,
      town: "Cashiers",
    });
    expect(score).toBeGreaterThanOrEqual(HOT_LEAD_SCORE);
    expect(leadTierLabel(score)).toBe("Hot");
    expect(isUrgentLead(score)).toBe(true);
  });

  it("scores a browsing lead low", () => {
    const score = scoreLead({
      serviceCategory: "roofing",
      projectType: "inspection",
      timeline: "exploring",
    });
    expect(score).toBeLessThan(30);
    expect(leadTierLabel(score)).toBe("Cool");
    expect(isUrgentLead(score)).toBe(false);
  });

  it("weights larger budget ranges higher", () => {
    const base = { serviceCategory: "construction", timeline: "90days" };
    const small = scoreLead({ ...base, budgetRange: "under_10k" });
    const mid = scoreLead({ ...base, budgetRange: "$25,000 - $50,000" });
    const large = scoreLead({ ...base, budgetRange: "200k-plus" });
    expect(small).toBeLessThan(mid);
    expect(mid).toBeLessThan(large);
  });

  it("treats urgent wording as urgent even without a timeline value", () => {
    const plain = scoreLead({ description: "Looking at options for next year." });
    const urgent = scoreLead({ urgency: "Emergency - active leak in the kitchen" });
    expect(urgent).toBeGreaterThan(plain);
    expect(scoreBreakdown({ urgency: "asap" }).timeline).toBe(26);
  });

  it("rewards having plans and an active insurance claim", () => {
    const without = scoreLead({ timeline: "30days", projectType: "replacement" });
    const withExtras = scoreLead({
      timeline: "30days",
      projectType: "replacement",
      hasPlans: true,
      insuranceStatus: "active_claim",
    });
    expect(withExtras - without).toBe(20);
  });

  it("caps every factor at its documented maximum", () => {
    const b = scoreBreakdown({
      timeline: "emergency",
      urgency: "emergency",
      projectType: "storm",
      serviceCategory: "roofing",
      budgetRange: "500k",
      insuranceStatus: "active_claim",
      propertyType: "commercial",
      hasPlans: true,
      hasPhotos: true,
      decisionMakerOnSite: true,
      description: "y".repeat(150),
      town: "Franklin",
    });
    expect(b.timeline).toBe(30);
    expect(b.project).toBe(18);
    expect(b.budget).toBe(14);
    expect(b.insurance).toBe(10);
    expect(b.property).toBe(10);
    expect(b.plans).toBe(10);
    expect(b.engagement).toBe(8);
    expect(b.market).toBe(5);
    expect(b.total).toBe(100);
  });

  it("orders tier labels by score", () => {
    expect(leadTierLabel(85)).toBe("Hot");
    expect(leadTierLabel(55)).toBe("Warm");
    expect(leadTierLabel(35)).toBe("Engaged");
    expect(leadTierLabel(null)).toBe("Cool");
  });
});
