import { defineTool } from "@lovable.dev/mcp-js";

const services = [
  { slug: "roof-replacement", title: "Roof Replacement", division: "roofing", url: "https://highlandernc.com/roofing/roof-replacement" },
  { slug: "roof-repair", title: "Roof Repair", division: "roofing", url: "https://highlandernc.com/roofing/roof-repair" },
  { slug: "residential", title: "Residential Roofing", division: "roofing", url: "https://highlandernc.com/roofing/residential" },
  { slug: "metal", title: "Metal Roofing", division: "roofing", url: "https://highlandernc.com/roofing/metal" },
  { slug: "brava-synthetic", title: "Brava Synthetic Roofing", division: "roofing", url: "https://highlandernc.com/roofing/brava-synthetic" },
  { slug: "storm-damage", title: "Storm Damage Roofing", division: "roofing", url: "https://highlandernc.com/roofing/storm-damage" },
  { slug: "commercial", title: "Commercial Roofing", division: "roofing", url: "https://highlandernc.com/roofing/commercial" },
  { slug: "specialty", title: "Specialty Roofing", division: "roofing", url: "https://highlandernc.com/roofing/specialty" },
  { slug: "skylights", title: "Skylights", division: "roofing", url: "https://highlandernc.com/roofing/skylights" },
  { slug: "gutters", title: "Gutters", division: "roofing", url: "https://highlandernc.com/roofing/gutters" },
  { slug: "additions", title: "Home Additions", division: "construction", url: "https://highlandernc.com/construction/additions" },
  { slug: "renovations", title: "Renovations", division: "construction", url: "https://highlandernc.com/construction/renovations" },
  { slug: "exterior", title: "Exterior Improvements", division: "construction", url: "https://highlandernc.com/construction/exterior" },
  { slug: "outdoor-living", title: "Outdoor Living", division: "construction", url: "https://highlandernc.com/construction/outdoor-living" },
  { slug: "custom", title: "Custom Construction", division: "construction", url: "https://highlandernc.com/construction/custom" },
];

export default defineTool({
  name: "list_services",
  title: "List services",
  description: "List all roofing and construction services Highlander offers, with URLs to each service page.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(services, null, 2) }],
    structuredContent: { services },
  }),
});