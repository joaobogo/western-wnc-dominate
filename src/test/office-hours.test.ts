import { describe, expect, it } from "vitest";
import { isOfficeOpen } from "@/lib/office-hours";

// The landing-page header shows "Office open now" only inside the Franklin
// showroom's published hours, Monday to Friday, 8 AM to 5 PM Eastern.
describe("isOfficeOpen", () => {
  it.each([
    ["2026-10-27T14:00:00Z", true], // Tue 10:00 EDT
    ["2026-10-27T12:00:00Z", true], // Tue 08:00 EDT, opening minute
    ["2026-10-27T11:59:00Z", false], // Tue 07:59 EDT
    ["2026-10-27T21:00:00Z", false], // Tue 17:00 EDT, closed
    ["2026-10-31T15:00:00Z", false], // Saturday
    ["2026-11-02T00:30:00Z", false], // Sun 19:30 EST
    ["2026-12-01T15:00:00Z", true], // Tue 10:00 EST (after the clock change)
  ])("%s → %s", (iso, open) => {
    expect(isOfficeOpen(new Date(iso))).toBe(open);
  });
});

describe("officeStatus (landing-page chip)", () => {
  it.each([
    ["2026-10-27T14:00:00Z", true, "Office open now · until 5 PM"], // Tue 10:00 EDT
    ["2026-10-27T11:00:00Z", false, "Office opens today at 8 AM"], // Tue 07:00 EDT
    ["2026-10-27T21:00:00Z", false, "Office opens tomorrow at 8 AM"], // Tue 17:00 EDT
    ["2026-10-30T22:00:00Z", false, "Office opens Monday at 8 AM"], // Fri 18:00 EDT
    ["2026-10-31T15:00:00Z", false, "Office opens Monday at 8 AM"], // Saturday
    ["2026-11-01T23:00:00Z", false, "Office opens tomorrow at 8 AM"], // Sun 18:00 EST
  ])("%s → %s %s", async (iso, open, label) => {
    const { officeStatus } = await import("@/lib/office-hours");
    expect(officeStatus(new Date(iso))).toEqual({ open, label });
  });

  it("never promises round-the-clock service", async () => {
    const { officeStatus } = await import("@/lib/office-hours");
    for (let h = 0; h < 168; h += 5) {
      expect(officeStatus(new Date(Date.UTC(2026, 10, 16, h))).label).not.toMatch(/24\/7|always|any time/i);
    }
  });
});
