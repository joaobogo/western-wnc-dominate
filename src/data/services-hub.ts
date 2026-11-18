/**
 * The /services hub and the header "Services" dropdown read from here, so the
 * two can never disagree. Top 10: Build Brief C2 (Kitchen & Bath waits on
 * Luke; Skylights added from the Nov 2026 Search Console export, where it is
 * the fourth most-seen service page). Swap in Robert's list here when it lands.
 *
 * Every photo is a documented Highlander job or Highlander's own work photo;
 * no generated imagery. Alt text describes what is actually in the photo.
 */
import replacementImg from "@/assets/gallery/asphalt-hero.webp";
import replacementSet from "@/assets/gallery/asphalt-hero.webp?w=480;800;1200&format=webp&as=srcset";
import repairImg from "@/assets/work/roof-chimney-flashing-detail.webp";
import repairSet from "@/assets/work/roof-chimney-flashing-detail.webp?w=480;800&format=webp&as=srcset";
import metalImg from "@/assets/gallery/metal-005.webp";
import metalSet from "@/assets/gallery/metal-005.webp?w=480;800;1200&format=webp&as=srcset";
import additionImg from "@/assets/work/addition-franklin-exterior-windows.webp";
import additionSet from "@/assets/work/addition-franklin-exterior-windows.webp?w=480;800&format=webp&as=srcset";
import interiorImg from "@/assets/gallery/addition-franklin-vaulted-room.webp";
import interiorSet from "@/assets/gallery/addition-franklin-vaulted-room.webp?w=480;800;1200&format=webp&as=srcset";
import outdoorImg from "@/assets/work/patio-cashiers-screened-porch.webp";
import outdoorSet from "@/assets/work/patio-cashiers-screened-porch.webp?w=480;800;1200&format=webp&as=srcset";
import guttersImg from "@/assets/work/roof-gutter-guard-eave.webp";
import guttersSet from "@/assets/work/roof-gutter-guard-eave.webp?w=480;800;1200&format=webp&as=srcset";
import stormImg from "@/assets/gallery/asphalt-005.webp";
import stormSet from "@/assets/gallery/asphalt-005.webp?w=480;800;1200&format=webp&as=srcset";
import sidingImg from "@/assets/work/addition-cullowhee-roofline.webp";
import sidingSet from "@/assets/work/addition-cullowhee-roofline.webp?w=480;800&format=webp&as=srcset";
import skylightImg from "@/assets/work/roof-chimney-flashing-skylights.webp";
import skylightSet from "@/assets/work/roof-chimney-flashing-skylights.webp?w=480;800;1200&format=webp&as=srcset";

export type ServiceDivision = "roofing" | "construction";

export interface HubService {
  name: string;
  href: string;
  division: ServiceDivision;
  /** Indoor work that carries on through the winter. */
  indoor?: boolean;
  /** One line: the outcome, not the process. */
  outcome: string;
  image: { src: string; srcSet: string; alt: string; width: number; height: number };
}

export const TOP_SERVICES: HubService[] = [
  {
    name: "Roof Replacement",
    href: "/roofing/roof-replacement",
    division: "roofing",
    outcome: "A new roof system for an aging or failing roof, scoped and priced in writing.",
    image: { src: replacementImg, srcSet: replacementSet, alt: "Weathered Wood dimensional shingle roof installed by Highlander on a mountain home in Waynesville, North Carolina", width: 1400, height: 788 },
  },
  {
    name: "Roof Repair",
    href: "/roofing/roof-repair",
    division: "roofing",
    outcome: "Leaks, flashing and damaged areas found and fixed before they spread.",
    image: { src: repairImg, srcSet: repairSet, alt: "Stone chimney with new black metal counter-flashing on a shingle roof", width: 1600, height: 1200 },
  },
  {
    name: "Metal Roofing",
    href: "/roofing/metal",
    division: "roofing",
    outcome: "Standing seam metal built for mountain snow, wind and rain.",
    image: { src: metalImg, srcSet: metalSet, alt: "Dark bronze standing seam metal roof installed by Highlander on a mountain home in Highlands, North Carolina", width: 1400, height: 1047 },
  },
  {
    name: "Home Additions",
    href: "/construction/additions",
    division: "construction",
    indoor: true,
    outcome: "More room without moving: living space, suites and expansions matched to the house.",
    image: { src: additionImg, srcSet: additionSet, alt: "Cedar shake gable with tall windows on a living room addition built by Highlander in Franklin, North Carolina", width: 1600, height: 1200 },
  },
  {
    name: "Interior & Whole-Home Renovations",
    href: "/construction/renovations",
    division: "construction",
    indoor: true,
    outcome: "Layouts, finishes and rooms reworked so the home fits how you live now.",
    image: { src: interiorImg, srcSet: interiorSet, alt: "Interior finished by Highlander in Franklin, North Carolina: a stained wood vaulted ceiling over a wall of mountain-view windows", width: 1500, height: 844 },
  },
  {
    name: "Decks, Porches & Outdoor Living",
    href: "/construction/outdoor-living",
    division: "construction",
    outcome: "Covered porches, decks and patios that add usable months to the year.",
    image: { src: outdoorImg, srcSet: outdoorSet, alt: "Screened porch with a stained wood ceiling and stone fireplace built by Highlander in Cashiers, North Carolina", width: 1600, height: 1200 },
  },
  {
    name: "Seamless Gutters",
    href: "/roofing/gutters",
    division: "roofing",
    outcome: "Custom-fit seamless gutters that move mountain rain away from the house.",
    image: { src: guttersImg, srcSet: guttersSet, alt: "Highlander gutter work: a seamless gutter and downspout along the eave of a shingle roof with dormers", width: 1600, height: 900 },
  },
  {
    name: "Storm Damage",
    href: "/roofing/storm-damage",
    division: "roofing",
    outcome: "Damage assessed and documented, with the repair or replacement scoped in writing.",
    image: { src: stormImg, srcSet: stormSet, alt: "Aerial view of a dimensional shingle roof on a wooded Western North Carolina lot in autumn", width: 1600, height: 1344 },
  },
  {
    name: "Siding & Exterior",
    href: "/construction/siding",
    division: "construction",
    outcome: "New siding and trim that protect the shell and refresh the look.",
    image: { src: sidingImg, srcSet: sidingSet, alt: "Brown lap siding on a Highlander addition in Cullowhee, North Carolina, with its shingle roof tied into the original roofline", width: 1125, height: 1500 },
  },
  {
    name: "Skylights",
    href: "/roofing/skylights",
    division: "roofing",
    indoor: true,
    outcome: "VELUX skylights installed and flashed to keep daylight in and water out.",
    image: { src: skylightImg, srcSet: skylightSet, alt: "Row of skylights beside a stone chimney with new metal flashing on a shingle roof", width: 1600, height: 1200 },
  },
];

/** Every service page, by division, for the full lists under the grid. */
export const ALL_SERVICE_LINKS: Record<ServiceDivision, Array<{ label: string; href: string }>> = {
  roofing: [
    { label: "Roofing overview", href: "/roofing" },
    { label: "Residential Roofing", href: "/roofing/residential" },
    { label: "Roof Replacement", href: "/roofing/roof-replacement" },
    { label: "Roof Repair", href: "/roofing/roof-repair" },
    { label: "Metal Roofing", href: "/roofing/metal" },
    { label: "Metal Roof Cost", href: "/roofing/metal/cost" },
    { label: "Brava Synthetic Slate & Shake", href: "/roofing/brava-synthetic" },
    { label: "Specialty Roofing", href: "/roofing/specialty" },
    { label: "Storm Damage", href: "/roofing/storm-damage" },
    { label: "Seamless Gutters", href: "/roofing/gutters" },
    { label: "Skylights", href: "/roofing/skylights" },
    { label: "Commercial Roofing", href: "/roofing/commercial" },
    { label: "Property Managers & HOAs", href: "/roofing/property-managers" },
    { label: "Roofing Cost in Western NC", href: "/roofing-cost-western-nc" },
  ],
  construction: [
    { label: "Construction overview", href: "/construction" },
    { label: "Home Additions", href: "/construction/additions" },
    { label: "Renovations", href: "/construction/renovations" },
    { label: "Kitchen Remodeling", href: "/construction/kitchen-remodeling" },
    { label: "Bathroom Remodeling", href: "/construction/bathroom-remodeling" },
    { label: "Outdoor Living", href: "/construction/outdoor-living" },
    { label: "Siding & Exterior", href: "/construction/siding" },
    { label: "Handyman & Small Repairs", href: "/construction/handyman" },
    { label: "Design & Planning", href: "/construction/design" },
  ],
};

/**
 * The paid landing pages, linked from the site (John, Nov 17: "part of the
 * website"). They stay noindex,follow: each has a service-page twin that
 * carries the organic search, so the two never compete.
 */
export const FAST_ESTIMATE_PAGES: Array<{ label: string; href: string; desc: string; twin: string }> = [
  { label: "Roofing estimate", href: "/lp/roofing", desc: "Repair, replacement or metal", twin: "/roofing" },
  { label: "Roof replacement estimate", href: "/lp/roof-replacement", desc: "Written scope for a new roof", twin: "/roofing/roof-replacement" },
  { label: "Gutter estimate", href: "/lp/gutters", desc: "Seamless gutters and repairs", twin: "/roofing/gutters" },
  { label: "Handyman list", href: "/lp/handyman", desc: "Small repairs, one call", twin: "/construction/handyman" },
  { label: "Roof repair estimate", href: "/lp/roof-repair", desc: "Leak and damage assessment", twin: "/roofing/roof-repair" },
  { label: "Storm damage estimate", href: "/lp/storm-damage", desc: "Damage assessed and documented", twin: "/roofing/storm-damage" },
  { label: "Construction project", href: "/lp/construction", desc: "Additions, renovations, outdoor living", twin: "/construction" },
  { label: "Roofing + construction", href: "/lp/roofing-construction", desc: "One call for both", twin: "/services" },
];
