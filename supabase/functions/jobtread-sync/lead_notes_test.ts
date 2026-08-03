import { assert, assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import {
  buildJobCustomFieldValues,
  buildLocationCustomFieldValues,
  buildPayload,
  countNoteWrites,
  scrubDescription,
} from "./index.ts";

const LEAD_NOTES_CF = "22PYx7PBhE56";
const SALES_NOTES_CF = "22P6KUiJD3EJ";

const stormRow = {
  name: "John Smith",
  phone: "+18285247773",
  email: "john@example.com",
  preferred_contact_method: "text",
  property_town: "Highlands",
  property_address: "482 Cullasaja Dr",
  property_type: "residential",
  service_category: "storm_damage",
  project_type: "storm_repair",
  urgency: "urgent",
  project_description: "Half my ridge cap blew off during the July storm — verbatim words.",
  source: "storm_form",
  page_url: "https://highlandernc.com/storm-damage",
  utm_source: "google",
  utm_medium: "cpc",
  utm_campaign: "storm-2026",
  created_at: "2026-08-01T12:00:00Z",
  metadata: {
    budget: "$25,000 - $50,000",
    timeline: "ASAP",
    insurance_status: "Claim filed",
    insurance_carrier: "State Farm",
  },
} as any;

Deno.test("note sections appear in the required order", () => {
  const note = (buildPayload(stormRow, "lead") as any).note as string;
  const order = [
    "Source Page",
    "Service Requested",
    "Timeline & Urgency",
    "Property",
    "Budget",
    "Insurance",
    "Customer Message",
    "Contact",
    "Tracking",
  ];
  let cursor = -1;
  for (const s of order) {
    const i = note.indexOf(`\n${s}\n`);
    assert(i > -1, `missing section: ${s}`);
    assert(i > cursor, `section out of order: ${s}`);
    cursor = i;
  }
});

Deno.test("note contains required content, description verbatim", () => {
  const note = (buildPayload(stormRow, "lead") as any).note as string;
  assert(note.includes("https://highlandernc.com/storm-damage"));
  assert(/Service Category: Storm Damage/i.test(note));
  assert(note.includes("Timeline: ASAP"));
  assert(note.includes("482 Cullasaja Dr"));
  assert(note.includes("$25,000 - $50,000"));
  assert(note.includes("Claim filed"));
  assert(note.includes("Half my ridge cap blew off during the July storm — verbatim words."));
  assert(/Preferred Contact Method: Text/i.test(note));
  assert(note.includes("UTM Campaign: storm-2026"));
});

Deno.test("budget and insurance sections are omitted when not provided", () => {
  const note = (buildPayload({ ...stormRow, metadata: {} }, "lead") as any).note as string;
  assertEquals(note.includes("\nBudget\n"), false);
  assertEquals(note.includes("\nInsurance\n"), false);
});

Deno.test("lead notes are written exactly once, on the Job custom field", () => {
  const payload: any = buildPayload(stormRow, "lead");
  const note: string = payload.note;

  const locationArgs = buildLocationCustomFieldValues({
    gateCodeBool: false,
    contactName: payload.contact?.name,
    phone: payload.contact?.phone,
    email: payload.contact?.email,
  });
  const jobArgs = scrubDescription({
    locationId: "loc_1",
    name: payload.job_name,
    customFieldValues: buildJobCustomFieldValues(payload, note),
  } as any) as any;

  // Location must carry no note at all, and never the Sales Notes field.
  assertEquals(SALES_NOTES_CF in locationArgs, false);
  assertEquals(countNoteWrites(locationArgs, note), 0);

  // Job carries it once, on the Lead Notes custom field only.
  assertEquals(jobArgs.customFieldValues[LEAD_NOTES_CF], note);
  assertEquals(countNoteWrites(jobArgs, note), 1);

  // Description is never populated.
  assertEquals("description" in jobArgs, false);
  assertEquals("description" in jobArgs.customFieldValues, false);

  // Total across every outbound JobTread write = exactly one.
  assertEquals(countNoteWrites([locationArgs, jobArgs], note), 1);
});
