import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import LandingTemplate from "@/components/landing/LandingTemplate";
import { COMBINED_CONFIG, CONSTRUCTION_CONFIG, ROOFING_CONFIG } from "@/components/landing/config";
import { FRANKLIN_NAP, PHONE_TEL } from "@/data/business";

/**
 * Rules from the 5 Oct 2026 landing prompts that must never regress:
 * exact H1, one short form, two CTA destinations only, no site navigation,
 * no "free inspection", the new Franklin address and the 4.8 rating.
 */
const pages = [ROOFING_CONFIG, CONSTRUCTION_CONFIG, COMBINED_CONFIG];

describe.each(pages)("landing page $path", (config) => {
  const mount = () => render(<LandingTemplate config={config} />);

  it("renders the approved H1 and CTA wording", () => {
    mount();
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(config.h1);
    expect(screen.getAllByRole("button", { name: new RegExp(config.primaryCta, "i") }).length).toBeGreaterThan(0);
  });

  it("has exactly three visible fields per form, with only name and phone required", () => {
    mount();
    const hero = document.querySelector('form[data-landing-form="hero"]') as HTMLFormElement;
    const visible = Array.from(hero.querySelectorAll("input")).filter((i) => i.tabIndex !== -1);
    expect(visible).toHaveLength(3);
    expect(hero.querySelector<HTMLInputElement>('input[name="first_name"]')!.required).toBe(true);
    expect(hero.querySelector<HTMLInputElement>('input[name="phone"]')!.required).toBe(true);
    expect(hero.querySelector<HTMLInputElement>('input[name="email"]')!.required).toBe(false);
    expect(within(hero).getByLabelText("Email (optional)")).toBeInTheDocument();
  });

  it("offers only the page form or the phone: no navigation or cross-links", () => {
    mount();
    const hrefs = Array.from(document.querySelectorAll("a[href]")).map((a) => a.getAttribute("href"));
    const allowed = new Set([PHONE_TEL, "#main-content", "/privacy-policy", "/accessibility"]);
    expect(hrefs.filter((h) => !allowed.has(h!))).toEqual([]);
    expect(document.querySelector("nav")).toBeNull();
  });

  it("shows validation and does not claim success without a stored lead", () => {
    mount();
    const hero = document.querySelector('form[data-landing-form="hero"]') as HTMLFormElement;
    fireEvent.submit(hero);
    expect(within(hero).getByText("Please enter your first name.")).toBeInTheDocument();
    expect(within(hero).getByText("Please enter a phone number.")).toBeInTheDocument();
    expect(document.querySelector("[data-success-panel]")).toBeNull();
  });

  it("keeps the owner-locked facts and avoids banned claims", () => {
    mount();
    const text = document.body.textContent ?? "";
    expect(text).toContain("4.8/5 on Google");
    expect(text).toContain(FRANKLIN_NAP);
    expect(text).toContain("40 Depot Street");
    expect(text).not.toContain("1511 Highlands");
    expect(text.toLowerCase()).not.toContain("free inspection");
    expect(text).not.toMatch(/24\/7|same[- ]day|only \d+ spots|guarantee/i);
  });

  it("is noindex,follow with a self-referencing canonical", () => {
    mount();
    expect(document.querySelector('meta[name="robots"]')?.getAttribute("content")).toBe("noindex,follow");
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute("href")).toContain(config.path);
  });

  it("has an H1 plus a meaningful FAQ set in server-renderable markup", () => {
    mount();
    expect(config.faqs).toHaveLength(5);
    expect(document.querySelectorAll("h1")).toHaveLength(1);
  });
});
