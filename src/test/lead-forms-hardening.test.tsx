import { describe, expect, it, vi, beforeEach } from "vitest";
import { readFileSync } from "node:fs";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { projectTypeFromPage } from "@/lib/form-service-context";

// Mock the lead pipeline: nothing may be stored when the honeypot is filled.
const submitLead = vi.fn(async () => ({ id: "lead-1" }));
vi.mock("@/lib/leads", async (orig) => ({ ...(await orig<Record<string, unknown>>()), submitLead: (...a: unknown[]) => submitLead(...(a as [])) }));

import FastLeadForm from "@/components/FastLeadForm";

describe("gutter leads reach the JobTread Gutters division", () => {
  it("/roofing/gutters sends project_type gutters (mapper: /gutter/ → Gutters)", () => {
    expect(projectTypeFromPage("/roofing/gutters", "")).toBe("gutters");
    expect(projectTypeFromPage("/roofing/gutters/franklin-nc", "")).toBe("gutters");
    expect(projectTypeFromPage("/roofing/skylights", "")).toBe("roof-replacement");
    expect(projectTypeFromPage("/roofing/roof-repair", "")).toBe("roof-repair");
    expect(projectTypeFromPage("/construction/design", "")).toBe("design");
    expect(projectTypeFromPage("/construction/renovations", "")).toBe("addition");
  });

  it("the JobTread mapper still routes gutters to the Gutters division", () => {
    const src = readFileSync("supabase/functions/jobtread-sync/index.ts", "utf8");
    expect(src).toMatch(/if \(\/gutter\/\.test\(key\)\) return "Gutters";/);
  });
});

describe("honeypot on every lead form", () => {
  beforeEach(() => {
    submitLead.mockClear();
    Element.prototype.scrollIntoView = vi.fn();
  });

  for (const file of ["src/components/FastLeadForm.tsx", "src/components/InspectionForm.tsx", "src/components/landing/LeadForm.tsx"]) {
    it(`${file} renders the shared honeypot`, () => {
      expect(readFileSync(file, "utf8")).toMatch(/<Honeypot\b/);
    });
  }

  it("is invisible to people: off-screen, aria-hidden, untabbable, no label text", () => {
    const { container } = render(
      <MemoryRouter>
        <FastLeadForm ctaLabel="Get My Written Estimate" serviceLabel="Roof Repair" />
      </MemoryRouter>,
    );
    const trap = container.querySelector('[data-honeypot] input[name="website_url"]') as HTMLInputElement;
    expect(trap).toBeTruthy();
    expect(trap.tabIndex).toBe(-1);
    expect(trap.getAttribute("autocomplete")).toBe("off");
    expect(trap.closest("[data-honeypot]")?.getAttribute("aria-hidden")).toBe("true");
    expect(trap.closest("[data-honeypot]")?.textContent?.trim()).toBe("");
    expect(container.textContent).not.toMatch(/\bWebsite\b/);
  });

  it("a filled honeypot shows success but stores nothing", async () => {
    const { container } = render(
      <MemoryRouter>
        <FastLeadForm ctaLabel="Get My Written Estimate" serviceLabel="Roof Repair" />
      </MemoryRouter>,
    );
    fireEvent.change(screen.getByLabelText("Full name"), { target: { value: "Bot Person" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "jane.carter@gmail.com" } });
    fireEvent.change(screen.getByLabelText("Phone number"), { target: { value: "8285550100" } });
    fireEvent.change(container.querySelector('input[name="website_url"]')!, { target: { value: "http://spam.example" } });
    fireEvent.submit(container.querySelector("form")!);
    expect(await screen.findByText("Request received.")).toBeTruthy();
    expect(submitLead).not.toHaveBeenCalled();
  });
});

describe("every service page has a lead form (Nov 2026)", () => {
  const pages = [
    "HomeAdditions", "Renovations", "OutdoorLiving", "OutdoorLivingSubPage", "Siding", "ConstructionDesign",
    "Skylights", "SpecialtyRoofing", "RoofReplacement", "RoofRepair", "StormDamage", "MetalRoofing",
    "Gutters", "SyntheticRoofing", "ResidentialRoofing", "CommercialRoofing", "RoofingDivision", "ConstructionDivision",
  ];
  it.each(pages)("%s renders InspectionForm or FastLeadForm", (name) => {
    expect(readFileSync(`src/pages/${name}.tsx`, "utf8")).toMatch(/<(InspectionForm|FastLeadForm)\b/);
  });
});
