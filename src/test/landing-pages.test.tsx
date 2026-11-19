import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LandingTemplate from "@/components/landing/LandingTemplate";
import { COMBINED_CONFIG, CONSTRUCTION_CONFIG, ROOFING_CONFIG } from "@/components/landing/config";
import { FRANKLIN, FRANKLIN_NAP, PHONE_DISPLAY, PHONE_TEL, directionsUrl } from "@/data/business";

/**
 * Rules from the 5 Oct 2026 landing prompts that must never regress:
 * exact H1, one short form, two CTA destinations only, no site navigation,
 * no "free inspection", the new Franklin address and the 4.8 rating.
 */
const pages = [ROOFING_CONFIG, CONSTRUCTION_CONFIG, COMBINED_CONFIG];

describe.each(pages)("landing page $path", (config) => {
  const mount = () =>
    render(
      <MemoryRouter initialEntries={[config.path]}>
        <LandingTemplate config={config} />
      </MemoryRouter>,
    );

  it("renders the approved H1 and CTA wording", () => {
    mount();
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(config.h1);
    expect(screen.getAllByRole("button", { name: new RegExp(config.primaryCta, "i") }).length).toBeGreaterThan(0);
  });

  it("has exactly three visible fields per form, with name, email and phone required", () => {
    mount();
    const hero = document.querySelector('form[data-landing-form="hero"]') as HTMLFormElement;
    const visible = Array.from(hero.querySelectorAll("input")).filter((i) => i.tabIndex !== -1);
    expect(visible).toHaveLength(3);
    expect(hero.querySelector<HTMLInputElement>('input[name="first_name"]')!.required).toBe(true);
    expect(hero.querySelector<HTMLInputElement>('input[name="phone"]')!.required).toBe(true);
    expect(hero.querySelector<HTMLInputElement>('input[name="email"]')!.required).toBe(true);
    expect(within(hero).getByLabelText("Email")).toBeInTheDocument();
  });

  it("is part of the website: full site menu, but ad leads stay on this page's form", () => {
    // John, 17 Nov 2026: every landing page shows the full site header and menu.
    // (Replaces the Oct rule "no navigation"; chatbot/exit-intent stay suppressed
    // by PaidLandingGate, and the page stays noindex,follow.)
    mount();
    const header = document.querySelector("header")!;
    expect(header.querySelector("nav")).not.toBeNull();
    expect(header.querySelector('a[href="/"]')).not.toBeNull();
    // Estimate buttons scroll to this page's form: nothing on a landing page may
    // send the ad visitor to another estimate form (it would change form_name).
    expect(document.querySelector('a[href^="/request-inspection"]')).toBeNull();
    expect(header.querySelectorAll('button[data-gtm-cta="lp_estimate"]').length).toBeGreaterThan(0);
    // The hero still holds only the call, the form and the privacy link.
    const allowed = new Set([PHONE_TEL, "#main-content", "/privacy-policy", "/accessibility", directionsUrl(FRANKLIN)]);
    const hero = document.querySelector("main section")!;
    expect(Array.from(hero.querySelectorAll("a[href]")).filter((a) => !allowed.has(a.getAttribute("href")!))).toEqual([]);
    if (config.layoutVersion === 2) {
      // v2 in-page links into the site open in a new tab and are tracked as lp_explore.
      const main = document.querySelector("main")!;
      const siteLinks = Array.from(main.querySelectorAll<HTMLAnchorElement>("a[href]")).filter((a) => !allowed.has(a.getAttribute("href")!));
      expect(siteLinks.length).toBeGreaterThan(0);
      for (const a of siteLinks) {
        expect(a.target).toBe("_blank");
        expect(a.dataset.gtmCta).toBe("lp_explore");
      }
    }
  });

  it("shows validation and does not claim success without a stored lead", () => {
    mount();
    const hero = document.querySelector('form[data-landing-form="hero"]') as HTMLFormElement;
    fireEvent.submit(hero);
    expect(within(hero).getByText("Please enter your first and last name.")).toBeInTheDocument();
    expect(within(hero).getByText("Please enter a phone number.")).toBeInTheDocument();
    expect(document.querySelector("[data-success-panel]")).toBeNull();
  });

  it("leads with the phone: call first in the hero, forms promise a call back (call plan, 28 Oct 2026)", () => {
    mount();
    const heroActions = screen.getByRole("heading", { level: 1 }).parentElement!.querySelectorAll("a[href], button");
    expect(heroActions[0].getAttribute("href")).toBe(PHONE_TEL);
    // The number stays readable in the hero call button (the forwarding-number swap
    // needs it). v2 shows it as "Call Direct: 828-524-7773" from cta-config.
    expect(heroActions[0].textContent!.replace(/\D/g, "")).toContain(PHONE_DISPLAY.replace(/\D/g, ""));
    // v1: forms promise a call back. v2 (Build Brief B6): the form button is the second
    // of exactly two actions, "Get My Written Estimate", and no off-system labels remain.
    const submitName = config.layoutVersion === 2 ? /Get My Written Estimate/ : /Call Me Back/;
    expect(screen.getAllByRole("button", { name: submitName }).filter((b) => b.getAttribute("type") === "submit").length).toBe(2);
    if (config.layoutVersion === 2) {
      expect(document.body.textContent).not.toMatch(/Call now|Call Me Back|Send My Details|Send details|Request My Estimate/);
      expect(heroActions[0].textContent).toContain("Call Direct:");
    }
    // Every call button is tagged by placement for GTM, and the number stays in the tel: link.
    const calls = Array.from(document.querySelectorAll<HTMLAnchorElement>(`a[href="${PHONE_TEL}"]`));
    expect(calls.length).toBeGreaterThan(5);
    calls.forEach((a) => expect(a.dataset.cta).toBeTruthy());
    // Every option card has its own call link.
    expect(document.querySelectorAll('a[data-cta^="card-"]').length).toBe(config.intents.length);
  });

  it("drops the cautious small print and the office-hours deflection", () => {
    mount();
    const text = document.body.textContent ?? "";
    expect(text).not.toMatch(/authorize work|instant quote|during office hours|Outside office hours|Discuss this/i);
    expect(text).toContain("Free estimate. No obligation.");
    expect(text).toContain("178 Google reviews");
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

  it("uses photography, not illustration: decorative backdrops are hidden from assistive tech", () => {
    mount();
    const hero = document.querySelector("main section");
    if (config.layoutVersion === 2) {
      // v2 (B6): the hero is a real, documented Highlander photo with descriptive alt text.
      const heroImg = hero!.querySelector("img")!;
      expect(heroImg.closest('[aria-hidden="true"]')).toBeNull();
      expect((heroImg.getAttribute("alt") ?? "").length).toBeGreaterThan(40);
      expect(heroImg.getAttribute("fetchpriority")).toBe("high");
    } else {
      const backdrops = Array.from(hero!.querySelectorAll("img")).filter((img) => img.closest('[aria-hidden="true"]'));
      expect(backdrops.length).toBeGreaterThan(0);
      backdrops.forEach((img) => expect(img.getAttribute("alt")).toBe(""));
    }
    expect(document.querySelector("svg[viewBox='0 0 1440 560']")).toBeNull();
  });

  it("is noindex,follow with a self-referencing canonical", () => {
    mount();
    expect(document.querySelector('meta[name="robots"]')?.getAttribute("content")).toBe("noindex,follow");
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute("href")).toContain(config.path);
  });

  it("has an H1 plus a meaningful FAQ set in server-renderable markup", () => {
    mount();
    if (config.layoutVersion === 2) {
      // v2 (B10): 4–6 FAQs, and the first answers "what happens after I call or send?".
      expect(config.faqs.length).toBeGreaterThanOrEqual(4);
      expect(config.faqs.length).toBeLessThanOrEqual(6);
      expect(config.faqs[0].question).toMatch(/^What happens after I call/);
    } else {
      expect(config.faqs).toHaveLength(5);
    }
    expect(document.querySelectorAll("h1")).toHaveLength(1);
  });
});

describe("landing form matches the database contact rules", () => {
  it("rejects what the database would reject, with a message on the right field", async () => {
    const { validateLanding, fieldErrorFromDatabase } = await import("@/components/landing/LandingFormContext");
    // 7 digits, a placeholder number and a reserved email domain all fail on the form.
    expect(validateLanding({ firstName: "Jane", email: "jane@gmail.com", phone: "555-1234" }).phone).toMatch(/10-digit/);
    expect(validateLanding({ firstName: "Jane", email: "jane@gmail.com", phone: "5555555555" }).phone).toBeTruthy();
    expect(validateLanding({ firstName: "Jane", email: "jane@example.com", phone: "828-524-7773" }).email).toMatch(/real email/);
    expect(validateLanding({ firstName: "Jane", email: "jane@gmail.com", phone: "(828) 524-7773" })).toEqual({});
    expect(validateLanding({ firstName: "Jane", email: "jane@gmail.com", phone: "1-828-524-7773" })).toEqual({});
    // If something still slips through, a database rejection lands on the field, not a generic banner.
    expect(fieldErrorFromDatabase({ message: "Invalid US phone number" })).toHaveProperty("phone");
    expect(fieldErrorFromDatabase({ message: "Fake or disposable email address" })).toHaveProperty("email");
    expect(fieldErrorFromDatabase({ message: "network down" })).toBeNull();
  });
});

describe("landing form validation (owner decision 7 Oct 2026: email required)", () => {
  it("requires first name, email and phone", async () => {
    const { validateLanding } = await import("@/components/landing/LandingFormContext");
    expect(Object.keys(validateLanding({ firstName: "", email: "", phone: "" })).sort()).toEqual(["email", "firstName", "phone"]);
    expect(validateLanding({ firstName: "Jane", email: "not-an-email", phone: "828-555-0100" }).email).toMatch(/valid email/);
    expect(validateLanding({ firstName: "Jane", email: "jane@gmail.com", phone: "828-555-0100" })).toEqual({});
  });
});
