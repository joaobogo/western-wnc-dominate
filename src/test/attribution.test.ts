import { describe, it, expect, beforeEach } from "vitest";
import { ATTRIBUTION_STORAGE_KEY, captureAttribution, getAttribution } from "@/lib/attribution";

function go(url: string) {
  window.history.replaceState({}, "", url);
}

describe("attribution", () => {
  beforeEach(() => {
    sessionStorage.clear();
    go("/");
  });

  it("captures UTM params and persists them for the session", () => {
    go("/roofing?utm_source=google&utm_medium=cpc&utm_campaign=wnc&utm_content=ad1&utm_term=metal+roof");
    const a = captureAttribution();
    expect(a.utm_source).toBe("google");
    expect(a.utm_medium).toBe("cpc");
    expect(a.utm_campaign).toBe("wnc");
    expect(a.utm_content).toBe("ad1");
    expect(a.utm_term).toBe("metal roof");
    expect(a.landing_page).toContain("/roofing");
    expect(sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY)).toBeTruthy();
  });

  it("survives SPA route changes that drop the query string", () => {
    go("/?utm_source=facebook&utm_campaign=storm");
    captureAttribution();
    go("/service-areas/highlands-nc");
    const a = captureAttribution();
    expect(a.utm_source).toBe("facebook");
    expect(a.utm_campaign).toBe("storm");
    expect(a.landing_page).toBe("/?utm_source=facebook&utm_campaign=storm");
    expect(getAttribution().utm_source).toBe("facebook");
  });

  it("keeps first-touch attribution instead of overwriting it", () => {
    go("/?utm_source=google");
    captureAttribution();
    go("/contact?utm_source=bing");
    expect(captureAttribution().utm_source).toBe("google");
  });

  it("records click ids", () => {
    go("/?gclid=abc123");
    expect(captureAttribution().gclid).toBe("abc123");
  });
});
