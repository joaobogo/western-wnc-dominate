import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// Nov 21 (John, phone screenshot): the breadcrumb trail wrapped and looked
// broken above the hero on phones. Phones now hide the visible trail (the
// BreadcrumbList JSON-LD stays for search); tablets and desktops keep it on
// one line. A tablet-only section rule also padded the empty notifications
// region and opened a 112px gap under the header on every page at 641–820px.
const crumbs = readFileSync("src/components/PageBreadcrumbs.tsx", "utf8");
const css = readFileSync("src/index.css", "utf8");

describe("breadcrumbs on phones and tablets", () => {
  it("hides the visible trail below 768px but keeps the header offset wrapper", () => {
    expect(crumbs).toMatch(/<Breadcrumb aria-label="Breadcrumb" className="pt-2 max-md:hidden">/);
    expect(crumbs).toContain('<HeaderOffset');
    expect(crumbs).toContain("max-md:pb-0 max-md:border-b-0");
  });

  it("centres each crumb inside its touch target so the trail stays on one line", () => {
    expect(crumbs).toMatch(/<Link to=\{c\.url\} className="inline-flex items-center /);
  });

  it("never pads the empty notifications region on tablets", () => {
    const tablet = css.slice(css.indexOf("@media (min-width: 641px) and (max-width: 820px)"));
    const rule = tablet.slice(0, tablet.indexOf("}\n}") + 3);
    expect(rule).toContain("section:not(:empty):not([aria-live])");
    expect(rule).not.toMatch(/\n\s*section \{ padding-top/);
  });
});
