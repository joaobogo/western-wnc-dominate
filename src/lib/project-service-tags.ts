import { towns } from "@/data/towns";

export interface ServiceTag {
  label: string;
  path: string;
}

/** Map a project's material/type label to the service pages that match it. */
export function getProjectServiceTags(type: string, category: "roofing" | "construction" | string): ServiceTag[] {
  const t = type.toLowerCase();
  const tags: ServiceTag[] = [];

  if (category === "construction") {
    if (t.includes("addition")) tags.push({ label: "Home Additions", path: "/construction/additions" });
    if (t.includes("outdoor") || t.includes("deck") || t.includes("porch"))
      tags.push({ label: "Outdoor Living", path: "/construction/outdoor-living" });
    if (t.includes("renov") || t.includes("remodel")) tags.push({ label: "Renovations", path: "/construction/renovations" });
    if (t.includes("siding")) tags.push({ label: "Siding", path: "/construction/siding" });
    if (tags.length === 0) tags.push({ label: "Construction Division", path: "/construction" });
    return tags;
  }

  if (t.includes("metal")) tags.push({ label: "Metal Roofing", path: "/roofing/metal" });
  if (t.includes("asphalt") || t.includes("shingle")) tags.push({ label: "Shingle Roofing", path: "/roofing/residential" });
  if (t.includes("cedar")) tags.push({ label: "Cedar & Specialty Roofing", path: "/roofing/residential" });
  if (t.includes("commercial")) tags.push({ label: "Commercial Roofing", path: "/roofing/commercial" });
  if (t.includes("gutter")) tags.push({ label: "Gutters", path: "/roofing/gutters" });
  if (t.includes("repair") || t.includes("storm")) tags.push({ label: "Roof Repair", path: "/roofing/roof-repair" });

  tags.push({ label: "Roof Replacement", path: "/roofing/roof-replacement" });

  // De-dupe by path, keep first three.
  const seen = new Set<string>();
  return tags.filter((tag) => !seen.has(tag.path) && seen.add(tag.path)).slice(0, 3);
}

/** "Highlands, NC" -> "/service-areas/highlands-nc" when we actually have that page. */
export function getTownPath(location: string): { town: string; path: string | null } {
  const town = location.replace(/,\s*NC$/i, "").trim();
  const slug = `${town.toLowerCase().replace(/\s+/g, "-")}-nc`;
  const match = towns.find((t) => t.slug === slug);
  return { town, path: match ? `/service-areas/${slug}` : null };
}
