import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { PHONE_TEL } from "@/data/business";

// John, 17 Nov 2026: "this chat thing doesn't really work". The floating
// desktop button only reacted to mouse hover: a click did nothing and touch
// screens could not open it.
describe("floating contact button (desktop)", () => {
  const mount = () =>
    render(
      <MemoryRouter initialEntries={["/roofing"]}>
        <StickyMobileCTA />
      </MemoryRouter>,
    );

  it("opens on click, offers call + estimate, closes on Escape", async () => {
    mount();
    const button = await screen.findByRole("button", { name: /Call or Get an Estimate/ });
    expect(button.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(button);
    await waitFor(() => expect(document.getElementById("desktop-contact-panel")).not.toBeNull());
    const panel = document.getElementById("desktop-contact-panel")!;
    expect(panel.querySelector(`a[href="${PHONE_TEL}"]`)).not.toBeNull();
    expect(panel.querySelector('a[href="/request-inspection"]')).not.toBeNull();
    expect(button.getAttribute("aria-expanded")).toBe("true");
    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => expect(button.getAttribute("aria-expanded")).toBe("false"));
  });

  it("does not pretend to be a chat", () => {
    mount();
    expect(document.body.textContent).not.toMatch(/Start a Conversation/);
  });
});
