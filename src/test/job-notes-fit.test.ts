import { beforeAll, describe, expect, it } from "vitest";

beforeAll(() => {
  (globalThis as any).Deno = { env: { get: () => "test" }, serve: () => undefined };
});
const mod = async () => (await import("@jobtread-sync")) as any;

// Javier's report (Nov 3): Frank's first call, Nick Daerr / RFG - Daerr - 1883.
const daerr = (over: Record<string, unknown> = {}) => ({
  first_name: "Nick",
  last_name: "Daerr",
  phone: "813-404-0927",
  email: "ndaerr@msn.com",
  preferred_contact: "call",
  address: "1883 Falling Leaf Trail, Sylva, NC 28779",
  town: "Sylva",
  job_type: "roof_replacement",
  timing: "asap",
  details: "Quote to re-roof...shingles vs. metal\nDiscuss gutters with customer.\nCustomer asked for an early appt.",
  source: "google",
  taken_by: "Frank",
  score: 97,
  grade: "A",
  score_version: "V1.1",
  property_type: "primary",
  breakdown: { jobType: 30, urgency: 22, location: 15, authority: 20, reachability: 10 },
  call_by: "2026-11-03T21:27:55Z",
  created_at: "2026-11-03T21:12:55Z",
  appointment: {
    chimney: "no",
    dateTime: "Thursday, November 5 9:00 – 10:00am",
    gutters: "need_work",
    notes: "Bring metal samples. Gate is on the left.",
    roofType: "shingle",
    someoneHome: "yes",
    state: "booked",
    steepPitch: "yes",
    stories: "2",
    leakLocation: "Over the kitchen",
    accessNotes: "Gate code 1234",
    mailingAddress: "PO Box 9, Sylva",
  },
  ...over,
});

describe("JobTread Job Notes", () => {
  it("carries every front desk appointment detail, including General notes", async () => {
    const { normalizeIntakeLead, buildLeadNotes } = await mod();
    const note: string = buildLeadNotes(normalizeIntakeLead(daerr()));
    for (const line of [
      "Roof Type: Shingle",
      "Stories: 2",
      "Steep Pitch: Yes",
      "Where It's Leaking: Over the kitchen",
      "Gutters: Need work",
      "Chimney: No",
      "Office Notes: Bring metal samples. Gate is on the left.",
      "Appointment: Booked — Thursday, November 5 9:00 – 10:00am",
      "Someone Home For Appointment: Yes",
      "Access Notes: Gate code 1234",
      "Mailing Address: PO Box 9, Sylva",
    ]) {
      expect(note).toContain(line);
    }
  });

  it("does not repeat General notes that match the job description", async () => {
    const { normalizeIntakeLead, buildLeadNotes } = await mod();
    const same = daerr();
    (same.appointment as Record<string, string>).notes = same.details as string;
    expect(buildLeadNotes(normalizeIntakeLead(same))).not.toContain("Office Notes:");
  });

  it("leaves empty answers out; only an empty customer message is called out", async () => {
    const { normalizeIntakeLead, buildLeadNotes } = await mod();
    const note: string = buildLeadNotes(normalizeIntakeLead(daerr({ details: "" })));
    expect(note.match(/Not provided/g)).toEqual(["Not provided"]);
    expect(note).toContain("Customer Message: Not provided");
    expect(note).not.toMatch(/UTM Source|GCLID|Secondary Phone|County:/);
  });

  it("fits JobTread's 1,000 characters without cutting the details that matter", async () => {
    const { normalizeIntakeLead, buildLeadNotes, truncateNotePreservingFiles } = await mod();
    const note: string = buildLeadNotes(normalizeIntakeLead(daerr()));
    expect(note.length).toBeLessThanOrEqual(1000);
    expect(truncateNotePreservingFiles(note, 1000)).toBe(note);
    expect(note).toContain("Address: 1883 Falling Leaf Trail");
  });

  it("drops tracking detail first when a website lead runs long", async () => {
    const { buildLeadNotes } = await mod();
    const note: string = buildLeadNotes({
      name: "Jane Doe",
      phone: "+18285550100",
      email: "jane@sample.org",
      service_category: "roofing",
      project_type: "roof_repair",
      project_description: "Leak over the kitchen. ".repeat(18),
      property_town: "Franklin",
      property_address: "53 Mountain Rd",
      source: "roofing_intake_form",
      page_url: "https://highlandernc.com/roofing/roof-repair?utm_source=google&utm_medium=cpc&utm_campaign=fall-roof-repair",
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "fall-roof-repair",
      utm_term: "roof leak repair franklin nc",
      utm_content: "ad-variant-b",
      gclid: "Cj0KCQjw-long-click-id-0123456789abcdefghijklmnopqrstuvwxyz",
      referrer: "https://www.google.com/",
      landing_page: "https://highlandernc.com/roofing/roof-repair",
      first_seen_at: "2026-11-01T10:00:00Z",
      created_at: "2026-11-03T10:00:00Z",
    });
    expect(note.length).toBeLessThanOrEqual(1000);
    expect(note).not.toContain("First Visit:");
    expect(note).toContain("Address: 53 Mountain Rd");
    expect(note).toContain("Leak over the kitchen");
    expect(note).toContain("Phone: +18285550100");
  });
});
