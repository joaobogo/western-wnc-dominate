import { describe, it, expect, beforeEach } from "vitest";
import { readFileSync } from "node:fs";
import { render, screen, waitFor } from "@testing-library/react";
import { lazyPreload, LazyFallback, preloadRecorded, snapshotMatchesLocation } from "@/lib/lazy-preload";

// The prerender is a browser snapshot with no renderToString markers, so a
// <Suspense> boundary (or React.lazy, which needs one) on the hydration path
// makes React throw #418/#423 and re-render every page from scratch.
describe("hydration safety", () => {
  it.each(["src/App.tsx", "src/pages/Index.tsx"])("%s uses lazyPreload, not React.lazy / Suspense", (file) => {
    const src = readFileSync(file, "utf8");
    expect(src).not.toMatch(/\bSuspense\b/);
    expect(src).not.toMatch(/(^|[^\w])lazy\(/m);
  });

  it("prerender separates adjacent text nodes and drops client-only widgets", () => {
    const src = readFileSync("scripts/prerender.mjs", "utf8");
    expect(src).toContain('document.createComment(" ")');
    expect(src).toContain("[data-client-only]");
    expect(src).toContain('rel="modulepreload"');
  });
});

describe("lazyPreload", () => {
  beforeEach(() => {
    document.getElementById("hl-lazy-preload")?.remove();
  });

  it("shows the fallback, then the component, and records itself for the snapshot", async () => {
    const Hello = lazyPreload("TestHello", async () => ({ default: () => <p>hello</p> }));
    render(
      <LazyFallback fallback={<span>loading</span>}>
        <Hello />
      </LazyFallback>,
    );
    expect(screen.getByText("loading")).toBeTruthy();
    await waitFor(() => expect(screen.getByText("hello")).toBeTruthy());
    const tag = document.getElementById("hl-lazy-preload")!;
    expect(JSON.parse(tag.textContent || "[]")).toContain("TestHello");
    expect(tag.getAttribute("data-path")).toBe(window.location.pathname.replace(/\/+$/, "") || "/");
  });

  it("renders synchronously once the recorded chunks are preloaded", async () => {
    const Synced = lazyPreload("TestSynced", async () => ({ default: () => <p>ready</p> }));
    const tag = document.createElement("script");
    tag.id = "hl-lazy-preload";
    tag.type = "application/json";
    tag.textContent = JSON.stringify(["TestSynced"]);
    tag.setAttribute("data-path", window.location.pathname.replace(/\/+$/, "") || "/");
    document.head.appendChild(tag);
    await preloadRecorded();
    render(
      <LazyFallback fallback={<span>loading</span>}>
        <Synced />
      </LazyFallback>,
    );
    expect(screen.getByText("ready")).toBeTruthy();
    expect(screen.queryByText("loading")).toBeNull();
    expect(snapshotMatchesLocation()).toBe(true);
  });

  it("does not hydrate another page's snapshot", () => {
    const tag = document.createElement("script");
    tag.id = "hl-lazy-preload";
    tag.setAttribute("data-path", "/some-other-page");
    document.head.appendChild(tag);
    expect(snapshotMatchesLocation()).toBe(false);
    tag.setAttribute("data-path", "/__404");
    expect(snapshotMatchesLocation()).toBe(true);
  });
});
