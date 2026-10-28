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
