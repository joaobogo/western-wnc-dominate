import { describe, expect, it, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LandingTemplate from "@/components/landing/LandingTemplate";
import { CONSTRUCTION_CONFIG, ROOFING_CONFIG } from "@/components/landing/config";
import { installGtmGlobalListeners } from "@/lib/gtm";
import { PHONE_DISPLAY, PHONE_TEL } from "@/data/business";

type DataLayerEvent = { event?: string; click_location?: string };
const dl = window as unknown as { dataLayer: DataLayerEvent[] };
const phoneClicks = () => dl.dataLayer.filter((e) => e.event === "phone_click");

describe("one call tap = one phone_click (no double conversions in GA4 / Meta / TikTok)", () => {
  it.each([CONSTRUCTION_CONFIG, ROOFING_CONFIG])("$path hero call button", (config) => {
    vi.useFakeTimers();
    installGtmGlobalListeners();
    dl.dataLayer = [];
    render(
      <MemoryRouter initialEntries={[config.path]}>
        <LandingTemplate config={config} />
      </MemoryRouter>,
    );
    const a = document.querySelector('a[data-cta="hero"]')!;
    a.addEventListener("click", (e) => e.preventDefault());
    fireEvent.click(a);
    vi.advanceTimersByTime(5);
    expect(phoneClicks()).toHaveLength(1);
    // The specific placement wins, so Andrew's reports keep their labels.
    expect(phoneClicks()[0].click_location).toBe(`lp_${config.key}_hero`);
    // A real second tap a moment later still counts.
    vi.advanceTimersByTime(1500);
    fireEvent.click(a);
    vi.advanceTimersByTime(5);
    expect(phoneClicks()).toHaveLength(2);
    vi.useRealTimers();
  });

  it("a plain tel: link with no manual tracking is still counted once by the global listener", () => {
    vi.useFakeTimers();
    vi.advanceTimersByTime(5000);
    installGtmGlobalListeners();
    dl.dataLayer = [];
    const a = document.createElement("a");
    a.href = PHONE_TEL;
    a.textContent = PHONE_DISPLAY;
    a.addEventListener("click", (e) => e.preventDefault());
    document.body.appendChild(a);
    fireEvent.click(a);
    vi.advanceTimersByTime(5);
    expect(phoneClicks()).toHaveLength(1);
    vi.useRealTimers();
  });
});
