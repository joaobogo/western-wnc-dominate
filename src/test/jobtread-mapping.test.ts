import { describe, it, expect, beforeAll } from "vitest";

// The edge function reads secrets at module load. Stub Deno before importing.
beforeAll(() => {
  (globalThis as any).Deno = { env: { get: () => "test" }, serve: () => undefined };
});

const mod = async () => (await import("@jobtread-sync")) as any;

const base = {
  name: "Jane Marie Van Dyke",
  first_name: "Jane",
  last_name: "Van Dyke",
  property_town: "Highlands",
  property_county: "Macon",
  service_category: "roofing",
};

describe("Customer / Account name rule", () => {
  it("uses the parsed first + last name", async () => {
    const { buildCustomerAccountName } = await mod();
    expect(buildCustomerAccountName(base)).toBe("Jane Van Dyke");
  });

  it("falls back to the legacy full name only when parsed parts are missing", async () => {
    const { buildCustomerAccountName } = await mod();
    expect(buildCustomerAccountName({ name: "Legacy Row" })).toBe("Legacy Row");
    expect(buildCustomerAccountName({})).toBe("");
  });

  it("uses the company name for commercial leads", async () => {
    const { buildCustomerAccountName } = await mod();
    expect(
      buildCustomerAccountName({ ...base, service_category: "commercial", company_name: "Blue Ridge Inn" }),
    ).toBe("Blue Ridge Inn");
  });

  it("never derives the customer name from job, location, address, or category", async () => {
    const { buildCustomerAccountName, buildJobName, buildLocationDisplayName } = await mod();
    const row = { ...base, property_address: "53 Mountain Rd" };
    const account = buildCustomerAccountName(row);
    expect(account).not.toBe(buildJobName(row));
    expect(account).not.toBe(buildLocationDisplayName(row));
    expect(account).not.toContain("Mountain Rd");
    expect(account).not.toMatch(/roofing/i);
  });

  it("creates a town-scoped account instead of merging a same-name customer", async () => {
    const { accountMatchesTown, buildTownScopedAccountName } = await mod();
    const franklinLocs = [{ name: "12 Elm St", address: "12 Elm St, Franklin, NC" }];
    expect(accountMatchesTown(franklinLocs, "Highlands")).toBe(false);
    expect(accountMatchesTown(franklinLocs, "Franklin")).toBe(true);
    // No town on the lead: never split the customer.
    expect(accountMatchesTown(franklinLocs, null)).toBe(true);
    expect(buildTownScopedAccountName("Jane Van Dyke", "Highlands")).toBe("Jane Van Dyke (Highlands)");
    expect(buildTownScopedAccountName("Jane Van Dyke (Highlands)", "Highlands")).toBe("Jane Van Dyke (Highlands)");
  });
});

describe("Job name, Location, and Description", () => {
  it("formats the job name as [Service] - [Town] - [First Name]", async () => {
    const { buildJobName } = await mod();
    expect(buildJobName(base)).toBe("Roofing Inquiry - Highlands - Jane");
    expect(buildJobName({ ...base, first_name: "", name: "" })).toBe("Roofing Inquiry - Highlands");
  });

  it("maps the location to address, then town", async () => {
    const { buildLocationDisplayName } = await mod();
    expect(buildLocationDisplayName({ ...base, property_address: "53 Mountain Rd" })).toBe("53 Mountain Rd");
    expect(buildLocationDisplayName(base)).toBe("Highlands Property");
    expect(buildLocationDisplayName({})).toBe("Website Lead");
  });

  it("routes the service area by town, falling back to county", async () => {
    const { mapServiceArea } = await mod();
    expect(mapServiceArea("Highlands", "Macon")).toBe("Franklin");
    expect(mapServiceArea("Unknown Cove", "Jackson")).toBe("Sylva");
    expect(mapServiceArea("Unknown Cove", "Buncombe")).toBe("Asheville");
  });

  it("keeps the job description blank and puts details in Lead Notes only", async () => {
    const { buildPayload, buildJobCustomFieldValues, scrubDescription } = await mod();
    const payload = buildPayload(
      { ...base, project_description: "Leak over the kitchen." },
      "lead",
    );
    expect(payload.location.town).toBe("Highlands");
    expect(payload.location.county).toBe("Macon");

    const fields = buildJobCustomFieldValues(payload, "Lead Notes body");
    // 22PYx7PBhE56 = Job → Lead Notes custom field.
    expect(fields["22PYx7PBhE56"]).toContain("Lead Notes body");

    const jobArgs = scrubDescription({
      locationId: "loc_1",
      name: payload.job_name,
      description: "should be removed",
      customFieldValues: fields,
    });
    expect("description" in jobArgs).toBe(false);
  });
});

describe("Lead Notes single-write rule", () => {
  const row = {
    ...base,
    email: "jane@example.com",
    phone: "+18285247773",
    property_address: "53 Mountain Rd",
    project_description: "Leak over the kitchen after the last storm.",
    urgency: "asap",
    utm_source: "google",
    source: "inspection_form",
    created_at: "2026-08-12T16:00:00Z",
  };

  it("writes the six sections in the contractual order", async () => {
    const { buildLeadNotes } = await mod();
    const note: string = buildLeadNotes(row);
    const order = [
      "Contact Info",
      "Project Summary",
      "Source/Attribution",
      "Timeline/Urgency",
      "Property Details",
      "Attachments",
    ];
    const positions = order.map((s) => note.indexOf(`\n${s}\n`));
    positions.forEach((p, i) => expect(p, `${order[i]} missing`).toBeGreaterThan(-1));
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
  });

  it("writes each section exactly once — no duplicated blocks", async () => {
    const { buildLeadNotes } = await mod();
    const note: string = buildLeadNotes({ ...row, chat_summary: "Wants a roof inspection." });
    for (const s of ["Contact Info", "Project Summary", "Source/Attribution", "Timeline/Urgency", "Property Details", "Attachments"]) {
      expect(note.split(`\n${s}\n`).length - 1, s).toBe(1);
    }
    // Data is not repeated across sections.
    expect(note.split("jane@example.com").length - 1).toBe(1);
    expect(note.split("53 Mountain Rd").length - 1).toBe(1);
    expect(note.split("Leak over the kitchen").length - 1).toBe(1);
  });

  it("goes into one custom field only, never a second note or the description", async () => {
    const { buildPayload, buildJobCustomFieldValues, buildLeadNotes, scrubDescription } = await mod();
    const payload = buildPayload(row, "lead");
    const note = buildLeadNotes(row);
    const fields = buildJobCustomFieldValues(payload, note);
    const withNote = Object.entries(fields).filter(([, v]) => String(v).includes("Contact Info"));
    expect(withNote).toHaveLength(1);
    expect(withNote[0][0]).toBe("22PYx7PBhE56");
    expect("description" in scrubDescription({ name: "x", description: note })).toBe(false);
  });

  it("keeps the Attachments block intact when the note is truncated", async () => {
    const { buildLeadNotes, truncateNotePreservingFiles } = await mod();
    const note: string = buildLeadNotes({
      ...row,
      project_description: "x".repeat(3000),
      attachments: [{ name: "roof.jpg", url: "https://example.com/roof.jpg" }],
    });
    const short = truncateNotePreservingFiles(note, 1000);
    expect(short.length).toBeLessThanOrEqual(1000);
    expect(short).toContain("Attachments");
    expect(short).toContain("roof.jpg");
  });
});

describe("Never rename or merge existing customers", () => {
  it("blocks any rename/merge mutation before it leaves the function", async () => {
    const { assertNoCustomerRewrite } = await mod();
    expect(() => assertNoCustomerRewrite({ createAccount: { $: { name: "Jane Van Dyke" } } })).not.toThrow();
    for (const m of ["updateAccount", "renameAccount", "mergeAccount", "updateContact", "deleteAccount"]) {
      expect(() => assertNoCustomerRewrite({ [m]: { $: { id: "a1", name: "x" } } }), m).toThrow(/never renamed or merged/);
    }
    // Nested inside a larger query too.
    expect(() =>
      assertNoCustomerRewrite({ organization: { accounts: { updateAccount: { $: {} } } } }),
    ).toThrow(/never renamed or merged/);
  });

  it("matches an existing customer only on full name + town", async () => {
    const { accountMatchesTown } = await mod();
    const locs = [{ name: "12 Elm St", address: "12 Elm St, Franklin, NC" }];
    expect(accountMatchesTown(locs, "Franklin")).toBe(true);
    expect(accountMatchesTown(locs, "Cashiers")).toBe(false);
    expect(accountMatchesTown([], "Franklin")).toBe(false);
  });
});

describe("Attachment pipeline", () => {
  it("signs links for 30 days", async () => {
    const { ATTACHMENT_URL_TTL_SECONDS } = await mod();
    expect(ATTACHMENT_URL_TTL_SECONDS).toBe(60 * 60 * 24 * 30);
  });

  it("retries signing before reporting a failure", async () => {
    const { resolveAttachments } = await mod();
    let calls = 0;
    const res = await resolveAttachments(
      { attachments: [{ path: "submissions/a/plan.pdf", name: "plan.pdf" }] },
      async () => {
        calls += 1;
        if (calls < 2) throw new Error("network");
        return { url: "https://signed.example.com/plan.pdf" };
      },
    );
    expect(calls).toBe(2);
    expect(res.files).toHaveLength(1);
    expect(res.failures).toHaveLength(0);
  });

  it("reports files it could never sign so the crew can ask for a resend", async () => {
    const { resolveAttachments, buildLeadNotes } = await mod();
    const res = await resolveAttachments(
      { attachments: [{ path: "submissions/a/plan.pdf", name: "plan.pdf" }] },
      async () => ({ error: "object not found" }),
    );
    expect(res.failures).toHaveLength(1);
    const note = buildLeadNotes({ name: "Jane Doe" }, res);
    expect(note).toContain("Files That Failed To Upload");
  });

  it("puts signed URLs in the Lead Notes Attachments block", async () => {
    const { buildLeadNotes } = await mod();
    const note = buildLeadNotes(
      { name: "Jane Doe" },
      { files: [{ name: "roof.jpg", url: "https://signed.example.com/roof.jpg" }], failures: [] },
    );
    expect(note).toContain("Attachments");
    expect(note).toContain("https://signed.example.com/roof.jpg");
  });
});

describe("Paid landing page leads (/lp/*)", () => {
  const landing = (over: Record<string, unknown> = {}) => ({
    name: "Mike",
    first_name: "Mike",
    phone: "(828) 555-0142",
    source: "highlander_landing_page",
    page_url: "https://highlandernc.com/lp/roofing-construction",
    landing_page: "combined",
    consent_given: true,
    metadata: { service_intent: "both", form_location: "hero", landing_page_id: "landing-combined" },
    ...over,
  });

  it("labels each landing route readably, never as a generic Website Lead", async () => {
    const { buildJobName } = await mod();
    expect(buildJobName(landing({ service_category: "roofing", project_type: "roof_repair" }))).toBe("Roof Repair Lead - Western NC - Mike");
    expect(buildJobName(landing({ service_category: "roofing", project_type: "roof_replacement" }))).toBe("Roof Replacement Inquiry - Western NC - Mike");
    expect(buildJobName(landing({ service_category: "roofing", project_type: "metal_roofing" }))).toBe("Metal Roofing Inquiry - Western NC - Mike");
    expect(buildJobName(landing({ service_category: "roofing", project_type: "roofing" }))).toBe("Roofing Inquiry - Western NC - Mike");
    expect(buildJobName(landing({ service_category: "roofing_and_construction", project_type: "roofing_and_construction" }))).toBe("Roofing & Construction Inquiry - Western NC - Mike");
    expect(buildJobName(landing({ service_category: "general", project_type: "general" }))).toBe("Home Project Inquiry - Western NC - Mike");
  });

  it("does not downgrade construction landing leads to Design Services just because plans were not asked", async () => {
    const { buildJobName } = await mod();
    expect(buildJobName(landing({ service_category: "construction", project_type: "addition", page_url: "https://x/lp/construction" }))).toBe("Construction Addition Inquiry - Western NC - Mike");
    expect(buildJobName(landing({ service_category: "construction", project_type: "outdoor_living", page_url: "https://x/lp/construction" }))).toBe("Outdoor Living Inquiry - Western NC - Mike");
    expect(buildJobName(landing({ service_category: "construction", project_type: "construction", page_url: "https://x/lp/construction" }))).toBe("Construction Inquiry - Western NC - Mike");
  });

  it("still routes a non-landing construction lead with no plans to Design Services", async () => {
    const { buildJobName } = await mod();
    expect(buildJobName({ name: "Ann", first_name: "Ann", service_category: "construction", project_type: "addition", has_plans: false, source: "construction_intake" })).toBe("Design Services Inquiry - Western NC - Ann");
  });

  it("never merges two different first-name-only customers", async () => {
    const { buildFirstNameOnlyAccountName } = await mod();
    const a = buildFirstNameOnlyAccountName("Mike", { phone: "(828) 555-0142" }, null);
    const b = buildFirstNameOnlyAccountName("Mike", { phone: "828-555-0199" }, null);
    expect(a).toBe("Mike (828-555-0142)");
    expect(b).toBe("Mike (828-555-0199)");
    expect(a).not.toBe(b);
    // Same person re-submitting resolves to the same customer.
    expect(buildFirstNameOnlyAccountName("Mike", { phone: "+1 828 555 0142" }, null)).toBe(a);
    expect(buildFirstNameOnlyAccountName(a, { phone: "828-555-0142" }, null)).toBe(a);
  });

  it("leaves full-name or town-scoped customers alone", async () => {
    const { buildFirstNameOnlyAccountName } = await mod();
    expect(buildFirstNameOnlyAccountName("Jane Van Dyke", { last_name: "Van Dyke", phone: "828-555-0142" }, null)).toBe("Jane Van Dyke");
    expect(buildFirstNameOnlyAccountName("Mike", { phone: "828-555-0142" }, "Franklin")).toBe("Mike");
    expect(buildFirstNameOnlyAccountName("Mike", { phone: "" }, null)).toBe("Mike");
  });

  it("writes the service intent and form location into Source/Attribution only", async () => {
    const { buildLeadNotes } = await mod();
    const note: string = buildLeadNotes(landing({ service_category: "roofing_and_construction", created_at: "2026-10-06T16:00:00Z" }));
    expect(note).toMatch(/Service Intent: both/);
    expect(note).toMatch(/Form Location: hero/);
    const sections = [...note.matchAll(/^(Contact Info|Project Summary|Source\/Attribution|Timeline\/Urgency|Property Details|Attachments)/gm)].map((m) => m[1]);
    expect(sections).toEqual(["Contact Info", "Project Summary", "Source/Attribution", "Timeline/Urgency", "Property Details", "Attachments"]);
  });
});
