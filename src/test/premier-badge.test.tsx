import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BUSINESS } from "@/data/business";
import CertainTeedPremierBadge from "@/components/trust/CertainTeedPremierBadge";

describe("CertainTeed Premier credential", () => {
  it("uses the owner-supplied official artwork with accessible text and square proportions", () => {
    render(<CertainTeedPremierBadge />);
    const image = screen.getByRole("img", { name: "CertainTeed ShingleMaster PREMIER Credentialed Contractor" });
    expect(image.getAttribute("src")).toContain("certainteed-shinglemaster-premier-transparent.png");
    expect(image.getAttribute("width")).toBe("768");
    expect(image.getAttribute("height")).toBe("768");
    expect(image.className).not.toMatch(/brightness|contrast|mix-blend|object-cover/);
  });

  it("keeps the confirmed Premier credential and WNC distinction in the shared identity", () => {
    const credential = BUSINESS.credentials.find((item) => item.label.includes("CertainTeed"));
    expect(credential?.label).toBe("CertainTeed ShingleMaster PREMIER Credentialed Contractor");
    expect(credential?.detail).toContain("Western North Carolina's only Premier");
    expect(credential?.detail).toContain("terms are confirmed per project");
  });
});