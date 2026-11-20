import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

// Nov 20: the front desk reported JobTread's Job Notes field (1,024 characters)
// was cutting off what they typed. Long notes now keep every appointment,
// contact and property line in the field, shorten only the typed paragraphs,
// and the complete notes go into a pinned, team-only comment on the job.
// Mocked delivery only: nothing is sent to JobTread.

// Pave queries and the Deno module are untyped JSON in these mocks.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Loose = any;

beforeAll(() => {
  (globalThis as Loose).Deno = { env: { get: () => "test" }, serve: () => undefined };
});
afterEach(() => vi.unstubAllGlobals());
const mod = async () => (await import("@jobtread-sync")) as Loose;

const DETAILS = [
  "828-555-0142",
  "pat.sample@example.org",
  "Customer will be at the appt.",
  "Quote is for roof repairs.",
  "Vent boots re-flashed or replaced.",
  "Completely remove three satellite dishes.",
  "Repair or re-caulk area where metal roof",
  "meets shingled roof.",
  "Customer will discuss repair or",
  "replacing gutters.",
  "Will send us info from inspection report.",
  "Shingles/metal, not steep, near the lake road.",
  "Second phone for the spouse: 828-555-0199.",
  "Dog in the yard, please call before opening the gate.",
  "Wants both a repair price and a full replacement price.",
].join("\n");

// A made-up front desk call shaped like the long ones the team types.
const longCall = (over: Record<string, unknown> = {}) => ({
  first_name: "Pat",
  last_name: "Sample",
  phone: "828-555-0142",
  email: "pat.sample@example.org",
  preferred_contact: "call",
  address: "12 Example Ridge Rd, Highlands, NC 28741",
  town: "Highlands",
  job_type: "roof_repair",
  timing: "asap",
  details: DETAILS,
  source: "referral",
  taken_by: "Frank",
  score: 89,
  grade: "A",
  score_version: "V1.1",
  property_type: "primary",
  breakdown: { jobType: 30, urgency: 22, location: 15, authority: 12, reachability: 10 },
  call_by: "2026-11-20T20:50:17Z",
  created_at: "2026-11-20T20:35:00Z",
  appointment: {
    chimney: "yes",
    dateTime: "Friday, November 21 9:00 – 10:00am",
    gutters: "need_work",
    leakLocation: "Possibly from vent boots. Also where the metal porch roof meets the shingles.",
    notes: DETAILS.split("\n").slice(2).join("\n") + "\nBring the metal color samples.",
    roofType: "shingle",
    someoneHome: "yes",
    state: "booked",
    steepPitch: "no",
    stories: "1",
    accessNotes: "Gate code 4321",
  },
  ...over,
});

describe("Job Notes field never loses what the front desk typed", () => {
  it("keeps appointment, contact, property and access lines; shortens only typed text", async () => {
    const { buildPayload, normalizeIntakeLead, FULL_NOTES_POINTER } = await mod();
    const p = buildPayload(normalizeIntakeLead(longCall()), "lead");
    expect(p.note.length).toBeLessThanOrEqual(1000);
    for (const line of [
      FULL_NOTES_POINTER,
      "Name: Pat Sample",
      "Phone: +18285550142",
      "Appointment: Booked — Friday, November 21 9:00 – 10:00am",
      "Someone Home For Appointment: Yes",
      "Address: 12 Example Ridge Rd, Highlands, NC 28741",
      "Access Notes: Gate code 4321",
      "Where It's Leaking: Possibly from vent boots.",
      "Uploaded Files: None",
    ]) {
      expect(p.note).toContain(line);
    }
    expect(p.note).not.toContain("[truncated]");
    expect(p.note).toContain("(rest in pinned comment)");
  });

  it("puts every typed word in the full notes for the pinned comment", async () => {
    const { buildPayload, normalizeIntakeLead } = await mod();
    const p = buildPayload(normalizeIntakeLead(longCall()), "lead");
    expect(typeof p.note_full).toBe("string");
    for (const line of DETAILS.split("\n").slice(2)) expect(p.note_full).toContain(line);
    expect(p.note_full).toContain("Bring the metal color samples.");
    expect(p.note_full).toContain("Access Notes: Gate code 4321");
    expect(p.note_full).not.toContain("(rest in pinned comment)");
  });

  it("says repeated text once: no pasted phone/email copies, no office notes that repeat the details", async () => {
    const { buildPayload, normalizeIntakeLead } = await mod();
    const full: string = buildPayload(normalizeIntakeLead(longCall()), "lead").note_full;
    expect(full.split("pat.sample@example.org")).toHaveLength(2); // Contact Info only
    expect(full.match(/Vent boots re-flashed or replaced\./g)).toHaveLength(1);
    expect(full).toContain("Office Notes: Bring the metal color samples.");
    expect(full).toContain("Second phone for the spouse: 828-555-0199.");
    expect(full).toContain("Urgency: HIGH — asap");
    expect(full).not.toContain("Timeline: asap");
  });

  it("short notes go into the field whole, with no comment and no pointer", async () => {
    const { buildPayload, normalizeIntakeLead, FULL_NOTES_POINTER } = await mod();
    const p = buildPayload(normalizeIntakeLead(longCall({ details: "Leak over the porch.", appointment: { state: "booked" } })), "lead");
    expect(p.note_full).toBeNull();
    expect(p.note).not.toContain(FULL_NOTES_POINTER);
    expect(p.note).toContain("Customer Message: Leak over the porch.");
  });

  it("website leads keep the customer's message word for word", async () => {
    const { buildPayload } = await mod();
    const msg = "Call me at 828-555-0142\n828-555-0142\nLeak by the chimney.";
    const p = buildPayload({ name: "Jo Web", phone: "+18285550142", email: "jo@example.org", source: "roofing_intake_form", service_category: "roof_repair", project_description: msg, property_town: "Franklin" }, "lead");
    expect(p.note).toContain(`Customer Message: ${msg}`);
  });
});

describe("Pinned full-notes comment on the JobTread job (mocked)", () => {
  function fakePave({ commentFails = false } = {}) {
    const queries: Loose[] = [];
    vi.stubGlobal("fetch", vi.fn(async (_url, init) => {
      const q = JSON.parse(init.body).query; queries.push(q);
      let r: Loose = {};
      if (q.customField) r = { customField: { customFieldValues: { nodes: [] } } };
      else if (q.createAccount) r = { createAccount: { createdAccount: { id: "acct" } } };
      else if (q.createContact) r = { createContact: { createdContact: { id: "contact" } } };
      else if (q.createLocation) r = { createLocation: { createdLocation: { id: "loc" } } };
      else if (q.createJob) r = { createJob: { createdJob: { id: "job1", name: "x" } } };
      else if (q.createComment) r = commentFails ? { error: { message: "comment rejected" } } : { createComment: { createdComment: { id: "comment1" } } };
      else if (q.organization || q.account) r = { organization: { accounts: { nodes: [] } }, account: { contacts: { nodes: [] }, locations: { nodes: [] } } };
      return new Response(JSON.stringify(r));
    }));
    return queries;
  }

  it("posts the complete notes once, pinned and team-only, after the job is made", async () => {
    const { buildPayload, normalizeIntakeLead, sendToPaveApi, FULL_NOTES_COMMENT_NAME } = await mod();
    const q = fakePave();
    const payload = buildPayload(normalizeIntakeLead(longCall()), "lead");
    const res = await sendToPaveApi(payload);
    expect(res.ok).toBe(true);
    expect(res.warning).toBeUndefined();
    const comments = q.filter((x) => x.createComment);
    expect(comments).toHaveLength(1);
    expect(q.findIndex((x) => x.createComment)).toBeGreaterThan(q.findIndex((x) => x.createJob));
    expect(comments[0].createComment.$).toEqual({
      targetType: "job",
      targetId: "job1",
      name: FULL_NOTES_COMMENT_NAME,
      message: payload.note_full,
      isPinned: true,
      isVisibleToAll: false,
      isVisibleToInternalRoles: true,
      isVisibleToCustomerRoles: false,
      isVisibleToVendorRoles: false,
    });
    expect(res.progress.fullNotesCommentId).toBe("comment1");
    // The Job Notes field still gets the fitted copy, once.
    expect(Object.values(q.find((x) => x.createJob).createJob.$.customFieldValues)).toContain(payload.note);

    // A retry of the same lead never posts it twice.
    await sendToPaveApi(payload, { progress: res.progress });
    expect(q.filter((x) => x.createComment)).toHaveLength(1);
  });

  it("a failed comment never fails the lead: the job stands and a sync note says so", async () => {
    const { buildPayload, normalizeIntakeLead, sendToPaveApi } = await mod();
    fakePave({ commentFails: true });
    const res = await sendToPaveApi(buildPayload(normalizeIntakeLead(longCall()), "lead"));
    expect(res.ok).toBe(true);
    expect(res.id).toBe("job1");
    expect(res.warning).toMatch(/full notes comment was not posted/);
  });

  it("an earlier job whose comment failed gets it on the next try, without a second job", async () => {
    const { buildPayload, normalizeIntakeLead, sendToPaveApi } = await mod();
    const q = fakePave();
    const res = await sendToPaveApi(buildPayload(normalizeIntakeLead(longCall()), "lead"), {
      progress: { accountId: "acct", contactId: "contact", locationId: "loc", jobId: "job0" },
    });
    expect(res.ok).toBe(true);
    expect(q.filter((x) => x.createJob)).toHaveLength(0);
    expect(q.find((x) => x.createComment).createComment.$.targetId).toBe("job0");
  });

  it("no comment when the notes fit", async () => {
    const { buildPayload, normalizeIntakeLead, sendToPaveApi } = await mod();
    const q = fakePave();
    await sendToPaveApi(buildPayload(normalizeIntakeLead(longCall({ details: "Short note.", appointment: {} })), "lead"));
    expect(q.filter((x) => x.createComment)).toHaveLength(0);
  });
});
