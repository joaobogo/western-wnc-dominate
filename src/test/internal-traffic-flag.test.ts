import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

/**
 * Mobile audit F14 — the internal-traffic flag.
 *
 * localStorage.hl_internal = "1" keeps the team's own browsing out of the
 * conversion_events table. It must NOT suppress GA4 / Meta / TikTok: the
 * standing rule is that no change may ever weaken the pixels, and an
 * early-return here would silently do exactly that.
 */
const insert = vi.fn(() => ({ then: (cb: (r: { error: null }) => void) => cb({ error: null }) }));
const from = vi.fn(() => ({ insert }));

vi.mock("@/integrations/supabase/client", () => ({ supabase: { from } }));

describe("internal traffic flag", () => {
  beforeEach(() => {
    vi.resetModules();
    insert.mockClear();
    from.mockClear();
    localStorage.clear();
    Object.defineProperty(document, "readyState", { value: "complete", configurable: true });
    // The insert waits for load + idle; run the idle callback immediately.
    (window as any).requestIdleCallback = (cb: () => void) => setTimeout(cb, 0);
    (window as any).gtag = vi.fn();
    (window as any).fbq = vi.fn();
    (window as any).ttq = { track: vi.fn() };
  });

  afterEach(() => {
    delete (window as any).gtag;
    delete (window as any).fbq;
    delete (window as any).ttq;
  });

  const flush = () => new Promise((r) => setTimeout(r, 250));

  it("writes to conversion_events for a normal visitor", async () => {
    const { trackEvent } = await import("@/lib/analytics");
    await trackEvent("cta_click", { label: "test" });
    await flush();
    expect(from).toHaveBeenCalledWith("conversion_events");
  });

  it("skips the conversion_events insert when hl_internal is set", async () => {
    localStorage.setItem("hl_internal", "1");
    const { trackEvent } = await import("@/lib/analytics");
    await trackEvent("cta_click", { label: "test" });
    await flush();
    expect(from).not.toHaveBeenCalled();
  });

  it("STILL fires GA4, Meta and TikTok for internal traffic", async () => {
    localStorage.setItem("hl_internal", "1");
    const { trackEvent } = await import("@/lib/analytics");
    await trackEvent("form_submit", { label: "test" });
    await flush();
    // The pixels are never gated by the internal flag.
    expect((window as any).gtag).toHaveBeenCalled();
    expect((window as any).fbq).toHaveBeenCalled();
    expect((window as any).ttq.track).toHaveBeenCalled();
  });
});
