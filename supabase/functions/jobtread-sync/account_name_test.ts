import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { validateCustomerAccountName } from "./index.ts";

const ok = (name: string, ctx = {}) =>
  assertEquals(validateCustomerAccountName(name, ctx), null, `expected "${name}" to be valid`);
const bad = (name: string, ctx = {}) => {
  const err = validateCustomerAccountName(name, ctx);
  assertEquals(typeof err, "string", `expected "${name}" to be rejected`);
  return err as string;
};

Deno.test("valid names pass", () => {
  ok("John Smith");
  ok("Mary-Ann O'Brien");
  ok("Highlander Construction LLC");
  ok("Dr. Alan Reed Jr.");
  ok("Lane Patterson"); // ambiguous street word used as a first name
});

Deno.test("rule 0: empty name is rejected", () => {
  bad("");
  bad("   ");
});

Deno.test("rule 1: never equals the Job name", () => {
  const jobName = "Roof Repair - Highlands - John";
  bad("Roof Repair - Highlands - John", { jobName });
  bad("roof repair – highlands – john", { jobName }); // punctuation/case insensitive
  ok("John Smith", { jobName });
});

Deno.test("rule 2: never equals the Location display name", () => {
  bad("Highlands Property", { locationName: "Highlands Property" });
  bad("highlands  property", { locationName: "Highlands Property" });
  ok("John Smith", { locationName: "Highlands Property" });
});

Deno.test("rule 3: never contains the street address", () => {
  bad("123 Main Street");
  bad("John Smith 482 Cullasaja Dr");
  bad("PO Box 118");
  bad("John Smith Apt 4");
  bad("John Smith - 88 Chestnut Road", { propertyAddress: "88 Chestnut Road" });
  ok("John Smith", { propertyAddress: "88 Chestnut Road" });
});

Deno.test("rule 4: never contains a 5-digit ZIP", () => {
  bad("John Smith 28741");
  bad("John Smith 28741-1234");
  ok("John Smith"); // no digits at all
});

Deno.test("rule 5: never starts with a service category", () => {
  bad("Roofing John Smith");
  bad("Storm Damage Smith");
  bad("Construction Client");
  bad("Skylights Jones");
  bad("Metal Roofing Miller");
  bad("Gutter Guard Systems", { serviceCategory: "gutter" });
  ok("Smith Roofing Supply Co"); // category not at the start
});

Deno.test("rule 6: never contains 'Inquiry' or 'Website Lead'", () => {
  bad("Roofing Inquiry");
  bad("John Smith Inquiry");
  bad("Website Lead");
  bad("Website Lead - Franklin");
  ok("John Smith");
});
