import { readFileSync } from "node:fs";
import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { hasVisitorInput, readDraft, useFormAutosave } from "@/hooks/use-form-autosave";
import { compactConstructionProcess } from "@/components/construction/ConstructionProcess";

const read = (p: string) => readFileSync(p, "utf8");

/** Conversion and UX audit, Nov 18 2026. */
describe("form drafts (false 'We saved your answers' message)", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    vi.useFakeTimers();
  });
  afterEach(() => vi.useRealTimers());

  it("counts only fields the visitor changed and filled", () => {
    const initial = { firstName: "", email: "", phone: "", projectType: "roofing" };
    expect(hasVisitorInput(initial, initial)).toBe(false);
    expect(hasVisitorInput({ ...initial, firstName: "   " }, initial)).toBe(false);
    expect(hasVisitorInput({ ...initial, phone: "828" }, initial)).toBe(true);
  });

  it("an untouched form saves nothing and the next visit shows no restore note", () => {
    const blank = { firstName: "", email: "", phone: "" };
    const first = renderHook(() => useFormAutosave("t-form", blank, { onRestore: () => {} }));
    act(() => vi.advanceTimersByTime(400));
    expect(readDraft("t-form")).toBeNull();
    first.unmount();
    const second = renderHook(() => useFormAutosave("t-form", blank, { onRestore: () => {} }));
    expect(second.result.current.restored).toBe(false);
  });

  it("a blank draft left by the old code is dropped, not announced", () => {
    window.sessionStorage.setItem("hl:draft:t-old", JSON.stringify({ v: 1, at: Date.now(), data: { firstName: "", email: "", phone: "" } }));
    const onRestore = vi.fn();
    const { result } = renderHook(() => useFormAutosave("t-old", { firstName: "", email: "", phone: "" }, { onRestore }));
    expect(onRestore).not.toHaveBeenCalled();
    expect(result.current.restored).toBe(false);
    expect(window.sessionStorage.getItem("hl:draft:t-old")).toBeNull();
  });

  it("real answers are still saved and restored with the note", () => {
    const blank = { firstName: "", email: "", phone: "" };
    const first = renderHook(({ data }) => useFormAutosave("t-real", data, { onRestore: () => {} }), { initialProps: { data: blank } });
    first.rerender({ data: { ...blank, firstName: "Ann" } }); // the visitor types
    act(() => vi.advanceTimersByTime(400));
    expect(readDraft<typeof blank>("t-real")?.data.firstName).toBe("Ann");
    first.unmount();
    const onRestore = vi.fn();
    const second = renderHook(() => useFormAutosave("t-real", { firstName: "", email: "", phone: "" }, { onRestore }));
    expect(onRestore).toHaveBeenCalledWith(expect.objectContaining({ firstName: "Ann" }), undefined);
    expect(second.result.current.restored).toBe(true);
  });
});

describe("page fixes", () => {
  it("the homepage reviews carousel contains its hidden labels (the page scrolled sideways)", () => {
    expect(read("src/components/reviews/ReviewsCarousel.tsx")).toMatch(/className="relative flex snap-x snap-mandatory/);
  });

  it("form copy matches the fields", () => {
    expect(read("src/components/InspectionForm.tsx")).toContain('"Name, email and phone are required"');
    expect(read("src/pages/RoofRepair.tsx")).not.toContain("four quick fields");
    expect(read("src/pages/StormDamage.tsx")).not.toContain("four quick fields");
  });

  it("step numbers follow the order shown, not the full process", () => {
    expect(compactConstructionProcess.map((s) => s.number)).not.toEqual(["01", "02", "03", "04", "05", "06"]);
    for (const f of ["src/components/construction/ConstructionProcess.tsx", "src/components/roofing/RoofingProcess.tsx"]) {
      expect(read(f)).toContain('{String(i + 1).padStart(2, "0")}');
    }
  });

  it("/construction has no objection-card block and no roofing line", () => {
    // John's construction plan, Phase 2 (22 Nov 2026): the 8 objection cards ("Construction Standard") are removed from the hub.
    const page = read("src/pages/ConstructionDivision.tsx");
    expect(page).not.toContain("<ConstructionObjectionBuster");
    expect(page).not.toMatch(/<ConstructionTrust\b|showObjections/);
    expect(read("src/components/conversion/TieredOffer.tsx")).toMatch(/CONSTRUCTION_CONTEXTS = new Set\(\[[^\]]*"construction-division"/);
  });

  it("/roofing has one situation picker", () => {
    const page = read("src/pages/RoofingDivision.tsx");
    expect(page).not.toContain("<RoofingIntentRouter");
    expect(page).toContain("<RoofingPathFinder");
  });

  it("roof replacement and additions have a short form near the top", () => {
    for (const f of ["src/pages/RoofReplacement.tsx", "src/pages/HomeAdditions.tsx"]) {
      const s = read(f);
      const quick = s.indexOf("<FastLeadForm");
      expect(quick).toBeGreaterThan(-1);
      expect(quick).toBeLessThan(s.indexOf("<InspectionForm"));
    }
  });

  it("landing-page phone bars use the short estimate label", () => {
    expect(read("src/components/PaidAdsLanding.tsx")).toContain("{LP_CTA.estimateShort}");
    expect(read("src/components/landing/LandingTemplate.tsx")).toContain("{LP_CTA.estimateShort}");
  });
});
