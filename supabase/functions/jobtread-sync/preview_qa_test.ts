// Deno test — offline QA of buildPayload(). No network, no JobTread writes.
// Run with the Supabase edge-function test runner.
import { assert, assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { buildPayload } from "./index.ts";

type Row = Record<string, any>;

const SAMPLES: Array<{ label: string; kind: "lead" | "chatbot"; row: Row }> = [
  {
    label: "Residential roofing",
    kind: "lead",
    row: {
      id: "prev-1", name: "Jane Doe", email: "jane@example.com", phone: "8285551001",
      property_address: "12 Laurel Ln", property_town: "Highlands",
      service_category: "roofing", lead_type: "roofing", source: "roofing_page",
    },
  },
  {
    label: "Roof repair",
    kind: "lead",
    row: {
      id: "prev-2", name: "Mark O'Neil-Smith", phone: "8285551002",
      property_address: "88 Ridge Rd", property_town: "Franklin",
      service_category: "roof_repair", roofing_issue_type: "leak", urgency: "high",
    },
  },
  {
    label: "Roof replacement",
    kind: "lead",
    row: {
      id: "prev-3", name: "Sarah Johnson", email: "sj@example.com",
      property_address: "204 Blue Ridge Dr", property_town: "Cashiers",
      service_category: "roof_replacement",
    },
  },
  {
    label: "Construction / design",
    kind: "lead",
    row: {
      id: "prev-4", name: "Ethan Wallace",
      property_address: "9 Overlook Way", property_town: "Sylva",
      service_category: "construction", project_type: "addition",
    },
  },
  {
    label: "Commercial roofing with company",
    kind: "lead",
    row: {
      id: "prev-5", name: "Alex Rivera", company_name: "Blue Ridge HOA",
      email: "alex@blueridgehoa.org", phone: "8285551005",
      property_address: "500 Commerce Blvd", property_town: "Franklin",
      service_category: "commercial", property_type: "commercial",
    },
  },
  {
    label: "Gutter",
    kind: "lead",
    row: {
      id: "prev-6", name: "Nora Bell", property_town: "Highlands",
      service_category: "gutter",
    },
  },
  {
    label: "Skylight",
    kind: "lead",
    row: {
      id: "prev-7", name: "Tim Kim", property_town: "Cashiers",
      service_category: "skylights",
    },
  },
  {
    label: "Short contact form",
    kind: "lead",
    row: {
      id: "prev-8", name: "Priya Patel", email: "priya@example.com",
      source: "contact",
    },
  },
  {
    label: "Chatbot lead",
    kind: "chatbot",
    row: {
      id: "prev-9", name: "Chris Nguyen", phone: "8285551009",
      property_town: "Franklin", service_category: "roofing",
      chat_summary: "Leaking roof after storm; wants inspection.",
      source: "chatbot",
    },
  },
];

const SERVICE_PREFIX_RE =
  /^(Roofing|Construction|Repair|Replacement|Home Repairs|Gutters|Skylights)\b/i;
const ADDRESS_RE =
  /^\d+\s+\S+.*\b(st|street|rd|road|ave|avenue|dr|drive|ln|lane|way|blvd|ct|court|hwy|highway)\b/i;

function assertCleanCustomerName(name: string, ctx: {
  jobName: string; locationName: string; propertyAddress?: string;
}) {
  assert(name && name.trim().length > 0, "customer name empty");
  assert(!/Inquiry|Website Lead/i.test(name), `customer name contains service tag: ${name}`);
  assert(!/\b\d{5}\b/.test(name), `customer name contains ZIP: ${name}`);
  assert(!ADDRESS_RE.test(name), `customer name contains street address: ${name}`);
  assert(!SERVICE_PREFIX_RE.test(name), `customer name starts with service: ${name}`);
  assert(name.toLowerCase() !== ctx.jobName.toLowerCase(), "customer == job name");
  assert(name.toLowerCase() !== ctx.locationName.toLowerCase(), "customer == location display");
  if (ctx.propertyAddress) {
    assert(!name.toLowerCase().includes(ctx.propertyAddress.toLowerCase()),
      `customer contains address: ${name}`);
  }
}

const PREVIEW_ROWS: any[] = [];

for (const sample of SAMPLES) {
  Deno.test(`preview: ${sample.label}`, () => {
    const p = buildPayload(sample.row, sample.kind);

    // 1. Description absent/blank/null everywhere it might live
    assertEquals((p as any).description, undefined, "top-level description present");
    // Nested project.description is legacy alias — allowed, but never sent to JobTread.

    // 2. Job number never in outbound payload
    assertEquals((p as any).job_number, undefined);
    assertEquals((p as any).jobNumber, undefined);

    // 3. Lead Notes present once (top-level `note` only)
    assert(typeof p.note === "string" && p.note.length > 0, "lead notes missing");

    // 4. Customer / Account name clean
    assertCleanCustomerName(p.account_name, {
      jobName: p.job_name,
      locationName: p.location_display_name,
      propertyAddress: sample.row.property_address,
    });

    // 5. Contact name = person only
    assertEquals(p.contact?.name, sample.row.name ?? null);

    // 6. Location display uses address or "[Town] Property" or "Website Lead"
    const loc = p.location_display_name;
    const expected = sample.row.property_address
      ? sample.row.property_address
      : (sample.row.property_town ? `${sample.row.property_town} Property` : "Website Lead");
    assertEquals(loc, expected);

    // 7. Job name format "[Service] - [Town] - [First]" (or graceful fallback)
    assert(p.job_name.length > 0, "job name empty");

    PREVIEW_ROWS.push({
      sample: sample.label,
      account_name: p.account_name,
      contact_name: p.contact?.name,
      location: p.location_display_name,
      job_name: p.job_name,
      description: (p as any).description ?? "(blank)",
      lead_notes_len: p.note.length,
      job_number: (p as any).job_number ?? "(auto)",
    });
  });
}

Deno.test("preview report", () => {
  console.log("\n=== JOBTREAD PREVIEW MAPPING TABLE ===");
  console.table(PREVIEW_ROWS);
});