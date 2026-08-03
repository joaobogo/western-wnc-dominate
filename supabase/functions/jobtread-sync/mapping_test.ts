import { assert, assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import {
  buildJobName,
  buildLocationDisplayName,
  buildPayload,
  scrubDescription,
} from "./index.ts";

const row = (o: Record<string, unknown> = {}) => ({ name: "John Smith", ...o }) as any;

Deno.test("job name format: [Service] - [Town] - [First Name]", () => {
  assertEquals(
    buildJobName(row({ service_category: "roof_repair", property_town: "Highlands" })),
    "Roof Repair Lead - Highlands - John",
  );
  assertEquals(
    buildJobName(row({ service_category: "gutters", property_town: "Cashiers", name: "Mary Ann Doe" })),
    "Gutter Inquiry - Cashiers - Mary",
  );
  // no name → falls back to [Service] - [Town]
  assertEquals(
    buildJobName(row({ name: "", service_category: "skylights", property_town: "Franklin" })),
    "Skylight Inquiry - Franklin",
  );
  // no town → Western NC
  assertEquals(
    buildJobName(row({ service_category: "roofing" })),
    "Roofing Inquiry - Western NC - John",
  );
});

Deno.test("job name never leaks PII beyond first name", () => {
  const n = buildJobName(row({
    name: "John Smith",
    property_town: "Sylva",
    service_category: "roofing",
    property_address: "482 Cullasaja Dr",
  }));
  assert(!/Smith/.test(n));
  assert(!/Cullasaja|482/.test(n));
  assertEquals(n.split(" - ").length, 3);
});

Deno.test("location = property address, else '[Town] Property'", () => {
  assertEquals(
    buildLocationDisplayName(row({ property_address: "482 Cullasaja Dr", property_town: "Highlands" })),
    "482 Cullasaja Dr",
  );
  assertEquals(buildLocationDisplayName(row({ property_town: "Cashiers" })), "Cashiers Property");
  assertEquals(buildLocationDisplayName(row({ property_address: "   " , property_town: "Sylva" })), "Sylva Property");
  assertEquals(buildLocationDisplayName(row()), "Website Lead");
});

Deno.test("scrubDescription empties every description variant", () => {
  const out = scrubDescription({
    name: "Roofing Inquiry - Highlands - John",
    description: "leaky roof",
    jobDescription: "leaky roof",
    job_description: "leaky roof",
    desc: "leaky roof",
    long_description: "x",
    longDescription: "x",
    customFieldValues: { description: "leaky roof", "22PYx7PBhE56": "Lead Notes" },
  } as any) as any;
  for (const k of ["description", "jobDescription", "job_description", "desc", "long_description", "longDescription"]) {
    assertEquals(k in out, false, `${k} should be stripped`);
  }
  assertEquals("description" in out.customFieldValues, false);
  assertEquals(out.customFieldValues["22PYx7PBhE56"], "Lead Notes");
  assertEquals(out.name, "Roofing Inquiry - Highlands - John");
});

Deno.test("jobNumber is never sent — JobTread auto-generates it", () => {
  const out = scrubDescription({ name: "Job", jobNumber: "1234", job_number: "1234", number: 5 } as any) as any;
  assertEquals("jobNumber" in out, false);
  assertEquals("job_number" in out, false);
  assertEquals("number" in out, false);
});

Deno.test("payload carries the mapped job name and location", () => {
  const p: any = buildPayload(
    row({ service_category: "roofing", property_town: "Highlands", property_address: "10 Main St" }),
    "lead",
  );
  assertEquals(p.job_name, "Roofing Inquiry - Highlands - John");
  assertEquals(p.location_display_name, "10 Main St");
  assertEquals("jobNumber" in p, false);
  assertEquals("job_number" in p, false);
});
