import { Hammer, Shield } from "lucide-react";
import { towns } from "@/data/towns";

export interface DropdownItem {
  label: string;
  href: string;
  desc: string;
}

export interface DivisionDropdown {
  label: string;
  href: string;
  items: DropdownItem[];
  icon: typeof Shield;
  tagline: string;
  accent: "green" | "gold";
}

export interface TownEntry {
  name: string;
  slug: string;
  county: string;
  href: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

export const roofingItems: DropdownItem[] = [
  { label: "Residential Roofing", href: "/roofing/residential", desc: "Premium mountain home systems" },
  { label: "Roof Replacement", href: "/roofing/roof-replacement", desc: "Full tear-off and reinstall" },
  { label: "Roof Repair", href: "/roofing/roof-repair", desc: "Targeted damage restoration" },
  { label: "Metal Roofing", href: "/roofing/metal", desc: "Standing seam built for the mountains" },
  { label: "Brava / Synthetic", href: "/roofing/brava-synthetic", desc: "Premium composite slate & shake" },
  { label: "Specialty Roofing", href: "/roofing/specialty", desc: "Cedar, copper & custom work" },
  { label: "Storm Damage", href: "/roofing/storm-damage", desc: "Insurance claims & emergency work" },
  { label: "Commercial Roofing", href: "/roofing/commercial", desc: "B2B systems for WNC properties" },
  { label: "Seamless Gutters", href: "/roofing/gutters", desc: "Custom-fit aluminum & copper systems" },
  { label: "Skylights", href: "/roofing/skylights", desc: "VELUX Certified installation" },
];

export const constructionItems: DropdownItem[] = [
  { label: "Additions & Suites", href: "/construction/additions", desc: "Expand your home's footprint" },
  { label: "Kitchen & Bath", href: "/construction/renovations", desc: "Interior transformations" },
  { label: "Outdoor Living", href: "/construction/outdoor-living", desc: "Decks, porches & pergolas" },
  { label: "Siding & Exterior", href: "/construction/siding", desc: "Mountain-grade protection" },
  { label: "Basements & Bonus", href: "/construction/renovations#basements", desc: "Finish your lower level" },
  { label: "Structural & Repair", href: "/construction#structural", desc: "Framing & load-bearing work" },
  { label: "Design & Planning", href: "/construction/design", desc: "In-house design for additions & remodels" },
  { label: "Construction Consultation", href: "/construction/consultation", desc: "Scope, schedule & budget review" },
];

export const divisions: DivisionDropdown[] = [
  {
    label: "Roofing",
    href: "/roofing",
    items: roofingItems,
    icon: Shield,
    tagline: "CertainTeed ShingleMaster · Credentialed Contractor",
    accent: "green",
  },
  {
    label: "Construction",
    href: "/construction",
    items: constructionItems,
    icon: Hammer,
    tagline: "Licensed General Contractor",
    accent: "gold",
  },
];

export const secondaryLinks = [
  { label: "Recent Projects", href: "/recent-projects" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const townLinks = towns.map((t) => ({
  label: t.name,
  href: `/service-areas/${t.slug}`,
}));

export const townsByCounty: { county: string; towns: TownEntry[] }[] = (() => {
  const map = new Map<string, TownEntry[]>();
  towns.forEach((t) => {
    const entry: TownEntry = { name: t.name, slug: t.slug, county: t.county, href: `/service-areas/${t.slug}` };
    const arr = map.get(t.county) ?? [];
    arr.push(entry);
    map.set(t.county, arr);
  });
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([county, list]) => ({ county, towns: list.sort((a, b) => a.name.localeCompare(b.name)) }));
})();

export const dropdownItemVariants = {
  hidden: { opacity: 0, x: -6 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.025, duration: 0.2, ease: HIGHLAND_EASE },
  }),
};