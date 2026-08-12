import { describe, it, expect, beforeAll } from "vitest";

// The edge function reads secrets at module load. Stub Deno before importing.
beforeAll(() => {
  (globalThis as any).Deno = { env: { get: () => "test" } };
});

const mod = async () => await import("../../supabase/functions/jobtread-sync/index.ts");

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
