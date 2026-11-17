import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ServicesHub from "@/pages/ServicesHub";
import { FAST_ESTIMATE_PAGES, TOP_SERVICES } from "@/data/services-hub";
import { divisions } from "@/components/header/nav-data";

// The site footer observes visibility; jsdom has no IntersectionObserver.
class NoopObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
(globalThis as unknown as { IntersectionObserver: typeof NoopObserver }).IntersectionObserver ??= NoopObserver;

const mount = () =>
  render(
    <MemoryRouter initialEntries={["/services"]}>
      <ServicesHub />
    </MemoryRouter>,
  );

describe("/services hub", () => {
  it("is a real, indexable page: one H1, self-canonical, in the sitemap", () => {
    mount();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(document.querySelector('meta[name="robots"]')?.getAttribute("content") ?? "index").not.toMatch(/noindex/);
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute("href")).toMatch(/\/services$/);
    expect(readFileSync("scripts/generate-sitemap.ts", "utf8")).toMatch(/\{ path: "\/services" \}/);
    expect(readFileSync("src/App.tsx", "utf8")).toMatch(/path="\/services" element=\{<ServicesHub \/>\}/);
  });

  it("shows the top 10 with real photos, alt text and a call link each, and filters work", () => {
    mount();
    expect(TOP_SERVICES).toHaveLength(10);
    const grid = screen.getByRole("heading", { name: /10 services/ }).closest("section")!;
    expect(within(grid).getAllByRole("listitem")).toHaveLength(10);
    grid.querySelectorAll("img").forEach((img) => {
      expect((img.getAttribute("alt") ?? "").length).toBeGreaterThan(20);
      expect(img.getAttribute("src")).not.toMatch(/generated/);
    });
    expect(grid.querySelectorAll('a[href^="tel:"]').length).toBe(10);
    fireEvent.click(within(grid).getByRole("button", { name: "Construction" }));
    expect(within(grid).getAllByRole("listitem")).toHaveLength(TOP_SERVICES.filter((s) => s.division === "construction").length);
    fireEvent.click(within(grid).getByRole("button", { name: /Indoor/ }));
    expect(within(grid).getAllByRole("listitem")).toHaveLength(TOP_SERVICES.filter((s) => s.indoor).length);
  });

  it("links every fast-estimate (paid landing) page, keeping their URLs", () => {
    mount();
    for (const page of FAST_ESTIMATE_PAGES) expect(document.querySelector(`a[href="${page.href}"]`)).not.toBeNull();
    expect(FAST_ESTIMATE_PAGES.map((p) => p.href).sort()).toEqual(
      ["/lp/construction", "/lp/roof-repair", "/lp/roof-replacement", "/lp/roofing", "/lp/roofing-construction", "/lp/storm-damage"].sort(),
    );
  });

  it("sits in the header between Construction and Service Areas", () => {
    expect(divisions.map((d) => d.label)).toEqual(["Roofing", "Construction", "Services"]);
    expect(divisions[2].href).toBe("/services");
  });
});

describe("/services redirects", () => {
  it("/services is served (no rule), /services/<anything> 301s to /services in one hop, no loop", async () => {
    const m = await import("../../scripts/lib/redirect-rules.mjs");
    const rules = m.loadRedirectRules();
    expect(m.applyRule(rules, "/services")).toBeNull();
    for (const old of ["/services/roof-repair", "/services/gutters/aluminum"]) {
      const hit = m.applyRule(rules, old);
      expect(hit?.to).toBe("/services");
      expect(hit?.rule.status).toBe(301);
      expect(m.applyRule(rules, hit!.to)).toBeNull();
    }
  });
});
