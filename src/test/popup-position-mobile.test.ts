import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// Nov 21 (John, phone screenshot): the "Want us to call you instead?" popup sat
// at the bottom of the phone screen, and the cookie notice ran behind the call
// bar and over the popup.
const prompt = readFileSync("src/components/recovery/RecoveryPrompt.tsx", "utf8");
const consent = readFileSync("src/components/ConsentBanner.tsx", "utf8");
const css = readFileSync("src/index.css", "utf8");

describe("callback popup and cookie notice on phones", () => {
  it("the callback popup is centred on every screen size and scrolls inside if tall", () => {
    expect(prompt).toContain('className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/50 p-4"');
    expect(prompt).not.toMatch(/items-end/);
    expect(prompt).toContain("max-h-[calc(100dvh-2rem)] overflow-y-auto");
  });

  it("the cookie notice stacks text over buttons on phones and sits under popups", () => {
    expect(consent).toContain('<div className="flex flex-col gap-2.5 md:block">');
    expect(consent).toMatch(/consent-strip fixed inset-x-2 z-\[60\]/);
  });

  it("the cookie notice is no longer capped at 96px on phones", () => {
    const rule = css.slice(css.indexOf("  @media (max-width: 767px) {\n    .consent-strip {"));
    expect(rule.slice(0, 400)).not.toContain("max-height: 96px");
  });
});
