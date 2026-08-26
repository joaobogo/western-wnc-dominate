import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ShowroomIdentity from "@/components/locations/ShowroomIdentity";
import { showrooms, showroomBySlug, nearestShowroom } from "@/data/showrooms";
import { FRANKLIN, SYLVA, formatPhoneDisplay, napLine, telHref } from "@/data/business";

describe("showroom (location) pages", () => {
  it("has exactly the two real showrooms", () => {
    expect(showrooms.map((s) => s.slug)).toEqual(["franklin-nc", "sylva-nc"]);
  });

  for (const showroom of showrooms) {
    it(`renders the exact NAP for ${showroom.slug} from business.ts`, () => {
      render(
        <MemoryRouter>
          <ShowroomIdentity showroom={showroom} />
        </MemoryRouter>,
      );
      const loc = showroom.location;
      expect(screen.getByText(napLine(loc))).toBeInTheDocument();
      const phoneLink = screen.getByRole("link", { name: formatPhoneDisplay(loc.phoneE164) });
      expect(phoneLink).toHaveAttribute("href", telHref(loc.phoneE164));
      expect(screen.getByText(loc.hours[0].label)).toBeInTheDocument();
    });

    it(`does not soften ${showroom.slug} hours with "by appointment"`, () => {
      const blob = JSON.stringify(showroom).toLowerCase();
      expect(blob).not.toContain("by appointment");
    });

    it(`${showroom.slug} meta title follows the showroom pattern`, () => {
      expect(showroom.metaTitle).toBe(
        `Roofing & Construction Showroom in ${showroom.location.locality}, ${showroom.location.region} | Highlander`,
      );
      expect(showroom.metaDescription.length).toBeLessThanOrEqual(160);
    });
  }

  it("maps Jackson / Swain / Haywood towns to the Sylva showroom", () => {
    for (const slug of ["sylva-nc", "dillsboro-nc", "cullowhee-nc", "bryson-city-nc", "cherokee-nc", "waynesville-nc"]) {
      expect(nearestShowroom(slug).location.streetAddress).toBe(SYLVA.streetAddress);
    }
  });

  it("maps Macon County and plateau towns to the Franklin showroom", () => {
    for (const slug of ["franklin-nc", "otto-nc", "highlands-nc", "cashiers-nc", "scaly-mountain-nc"]) {
      expect(nearestShowroom(slug).location.streetAddress).toBe(FRANKLIN.streetAddress);
    }
  });

  it("falls back to the Franklin main office for unmapped towns", () => {
    expect(nearestShowroom("nowhere-nc").id).toBe("franklin");
  });

  it("does not list a town under both showrooms", () => {
    const all = showrooms.flatMap((s) => s.towns.map((t) => t.slug));
    expect(new Set(all).size).toBe(all.length);
  });

  it("resolves slugs used by the router", () => {
    expect(showroomBySlug("franklin-nc")?.path).toBe("/locations/franklin-nc");
    expect(showroomBySlug("sylva-nc")?.path).toBe("/locations/sylva-nc");
    expect(showroomBySlug("asheville-nc")).toBeUndefined();
  });
});
