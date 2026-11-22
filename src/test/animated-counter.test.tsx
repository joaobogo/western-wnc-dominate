import { act, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

// John's construction plan (21 Nov 2026): the home page roofing card showed
// "-16.3★ Google Rating". A requestAnimationFrame timestamp earlier than the
// start time gave a negative progress, so the eased value went below zero.
vi.mock("@/hooks/useScrollReveal", () => ({ useScrollReveal: () => ({ ref: { current: null }, isInView: true }) }));

afterEach(() => vi.unstubAllGlobals());

describe("AnimatedCounter", () => {
  it("never shows a negative number when a frame timestamp precedes the start", async () => {
    const { default: AnimatedCounter } = await import("@/components/motion/AnimatedCounter");
    const frames: FrameRequestCallback[] = [];
    vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => { frames.push(cb); return frames.length; });
    vi.spyOn(performance, "now").mockReturnValue(10_000);
    const { container } = render(<AnimatedCounter value="4.8★" duration={1600} />);
    const seen: string[] = [];
    // First frame stamped a second before the animation started, then normal frames.
    for (const t of [9_000, 9_500, 10_000, 10_800, 11_700]) {
      const cb = frames.shift();
      if (!cb) break;
      act(() => cb(t));
      seen.push(container.textContent ?? "");
    }
    for (const v of seen) expect(v.startsWith("-")).toBe(false);
    expect(seen[seen.length - 1]).toBe("4.8★");
  });
});
