import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { callPosition, leadTypeFor, serviceFromPath, trackFormSuccess, trackPhoneClick } from "@/lib/gtm";
import { getPagePrimaryAction, isConstructionPath } from "@/lib/page-cta-hierarchy";
import { CTA } from "@/lib/cta-config";

// John's Construction & Design plan (21 Nov 2026), Phase 1: foundations and fixes.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Loose = any;
const layer = () => (window as Loose).dataLayer as Loose[];

describe("one wording and one intake path on construction pages", () => {
  const CONSTRUCTION_FILES = [
    "src/pages/ConstructionDivision.tsx",
    "src/pages/HomeAdditions.tsx",
    "src/pages/OutdoorLiving.tsx",
    "src/pages/OutdoorLivingSubPage.tsx",
    "src/pages/ConstructionDesign.tsx",
    "src/pages/Renovations.tsx",
    "src/pages/ExteriorImprovements.tsx",
    "src/components/ConstructionAuthority.tsx",
    ...readdirSync("src/components/construction").map((f) => join("src/components/construction", f)),
  ];
  const OLD = /Get My Project Scoped|Discuss My Project|Get My Build Planned|Start Planning Your Project/;

  it("construction pages and blocks use 'Get My Written Scope', not the four old labels", () => {
    for (const f of CONSTRUCTION_FILES) expect(readFileSync(f, "utf8"), f).not.toMatch(OLD);
    for (const k of ["constructionConsult", "constructionHero", "constructionMid", "constructionPlan"] as const) {
      expect(CTA[k]).toBe("Get My Written Scope");
    }
  });

  it("no construction page body links to /construction-intake (the route still exists)", () => {
    for (const f of CONSTRUCTION_FILES) expect(readFileSync(f, "utf8"), f).not.toContain('"/construction-intake"');
    expect(readFileSync("src/components/builder/BuilderPromoBlock.tsx", "utf8")).not.toContain('secondaryHref: "/construction-intake"');
    expect(readFileSync("src/App.tsx", "utf8")).toContain('path="/construction-intake"');
  });

  it("construction form links tell the short form it is a construction lead", () => {
    for (const f of CONSTRUCTION_FILES) {
      const plain = readFileSync(f, "utf8").match(/"\/request-inspection"/g);
      expect(plain, `${f} has an untagged /request-inspection link`).toBeNull();
    }
  });

  it("the dead #structural link now points at the renovations page", () => {
    for (const f of ["src/components/header/nav-data.ts", "src/components/construction/ConstructionServices.tsx"]) {
      expect(readFileSync(f, "utf8")).not.toContain("/construction#structural");
    }
  });
});

describe("sticky call bar on construction pages", () => {
  it("covers /construction/* and town construction pages", () => {
    for (const p of ["/construction", "/construction/additions", "/construction/design", "/service-areas/franklin-nc/construction"]) {
      expect(isConstructionPath(p), p).toBe(true);
    }
    for (const p of ["/roofing", "/service-areas/franklin-nc", "/constructions", "/lp/construction"]) {
      expect(isConstructionPath(p), p).toBe(false);
    }
  });

  it("leads with 'Call Highlander' and offers the written scope as the second button", () => {
    const a = getPagePrimaryAction("/construction/additions");
    expect(a.intent).toBe("call");
    expect(a.primaryHref).toBe("tel:+18285247773");
    expect(a.stickyCall).toBe("Call Highlander");
    expect(a.secondaryLabel).toBe("Get My Written Scope");
    expect(a.secondaryHref).toContain("type=construction");
    expect(a.secondaryHref).toContain("service=addition");
    expect(getPagePrimaryAction("/service-areas/cashiers-nc/construction").stickyCall).toBe("Call Highlander");
    // Never promises a free visit until Highlander confirms it.
    expect(JSON.stringify(a)).not.toMatch(/free/i);
  });

  it("roofing and town pages keep their bar", () => {
    expect(getPagePrimaryAction("/roofing").stickyCall).toBeUndefined();
    expect(getPagePrimaryAction("/service-areas/franklin-nc").pageKey).toBe("town");
  });
});

describe("call_click and form_submit tracking", () => {
  beforeEach(() => {
    (window as Loose).dataLayer = [];
    window.history.pushState({}, "", "/construction/additions");
  });
  afterEach(() => window.history.pushState({}, "", "/"));

  it("names the service and button position", () => {
    expect(serviceFromPath("/construction/additions")).toBe("additions");
    expect(serviceFromPath("/construction")).toBe("construction");
    expect(serviceFromPath("/service-areas/franklin-nc/construction")).toBe("construction");
    expect(serviceFromPath("/roofing/roof-repair")).toBe("roof-repair");
    expect(serviceFromPath("/")).toBe("home");
    expect(callPosition("sticky_bar")).toBe("sticky");
    expect(callPosition("construction_hero")).toBe("hero");
    expect(callPosition("final_cta")).toBe("band");
    expect(callPosition("footer")).toBe("footer");
    expect(callPosition("content")).toBe("body");
    expect(leadTypeFor("addition", "/construction/additions")).toBe("construction");
    expect(leadTypeFor("roof-repair", "/roofing/roof-repair")).toBe("roofing");
  });

  it("a phone tap sends phone_click (unchanged) and call_click with page, service, position", () => {
    trackPhoneClick({ phone_number: "+18285247773", link_url: "tel:+18285247773", click_location: "construction_hero" });
    const events = layer().map((e) => e.event);
    expect(events).toContain("phone_click");
    const call = layer().find((e) => e.event === "call_click");
    expect(call).toMatchObject({ page_path: "/construction/additions", service: "additions", position: "hero" });
  });

  it("a lead sends form_submit with service and type, once", () => {
    const lead = { form_name: "inspection", form_id: "inspection-form-main", service_category: "construction", service_intent: "addition", lead_id: "lead-phase1-1" };
    trackFormSuccess(lead);
    trackFormSuccess(lead);
    const subs = layer().filter((e) => e.event === "form_submit");
    expect(subs).toHaveLength(1);
    expect(subs[0]).toMatchObject({ service: "addition", type: "construction" });
    expect(layer().some((e) => e.event === "form_submit_success")).toBe(true);
  });
});

describe("callback wording (John, 21 Nov 2026)", () => {
  const FILES = [
    "src/components/forms/WhatHappensNext.tsx",
    "src/components/forms/LeadConfirmationPanel.tsx",
    "src/pages/ThankYou.tsx",
    "src/components/recovery/RecoveryPrompt.tsx",
  ];
  it("promises a call back as soon as possible during business hours, never a fixed time", () => {
    for (const f of FILES) {
      const src = readFileSync(f, "utf8");
      expect(src, f).toMatch(/as soon as possible[\s\S]{0,40}during business hours/);
      expect(src, f).not.toMatch(/within (1|one|an) (business )?hour|within \d+ minutes|same[- ]day/i);
    }
  });
});
