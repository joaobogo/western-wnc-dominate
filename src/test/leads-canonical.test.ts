import { describe, it, expect } from "vitest";
import { normalizeLeadPayload, splitFullName, urgencyFromTimeline } from "@/lib/leads";
describe("canonical lead payload", () => {
  it("derives names, urgency, attachments, score, page_path", () => {
    const r = normalizeLeadPayload({
      source: "roofing_intake_form",
      full_name: "  Jane   Q  Public ",
      email: " JQ@x.com ", phone: "8285247773",
      property_town: "Highlands", timeline: "emergency",
      attachments: ["a/b/roof.jpg"],
    });
    expect(r.first_name).toBe("Jane");
    expect(r.last_name).toBe("Public");
    expect(r.name).toBe("Jane Q Public");
    expect(r.urgency).toBe("high");
    expect(r.attachments[0].name).toBe("roof.jpg");
    expect(r.files_uploaded).toEqual(["a/b/roof.jpg"]);
    expect(r.lead_score).toBeGreaterThan(0);
    expect(r.property_state).toBeNull();
    expect(r.page_path).toBe("/");
  });
  it("joins first+last and honors explicit score", () => {
    const r = normalizeLeadPayload({ source: "x", first_name: "Ann", last_name: "Lee", lead_score: 0 });
    expect(r.name).toBe("Ann Lee");
    expect(r.lead_score).toBe(0);
  });
  it("maps legacy fields", () => {
    const r = normalizeLeadPayload({ source: "x", name: "Bo", files_uploaded: ["p.pdf"] } as any);
    expect(r.name).toBe("Bo");
    expect(r.attachments).toHaveLength(1);
  });
  it("helpers", () => {
    expect(splitFullName("Solo").last).toBeNull();
    expect(urgencyFromTimeline("6months")).toBe("low");
    expect(urgencyFromTimeline(null)).toBeNull();
  });
});
