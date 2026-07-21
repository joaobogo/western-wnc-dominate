import { defineTool } from "@lovable.dev/mcp-js";

const towns = [
  { slug: "franklin-nc", name: "Franklin", county: "Macon" },
  { slug: "highlands-nc", name: "Highlands", county: "Macon" },
  { slug: "cashiers-nc", name: "Cashiers", county: "Jackson" },
  { slug: "sylva-nc", name: "Sylva", county: "Jackson" },
  { slug: "cullowhee-nc", name: "Cullowhee", county: "Jackson" },
  { slug: "dillsboro-nc", name: "Dillsboro", county: "Jackson" },
  { slug: "bryson-city-nc", name: "Bryson City", county: "Swain" },
  { slug: "waynesville-nc", name: "Waynesville", county: "Haywood" },
  { slug: "brevard-nc", name: "Brevard", county: "Transylvania" },
  { slug: "hendersonville-nc", name: "Hendersonville", county: "Henderson" },
  { slug: "asheville-nc", name: "Asheville", county: "Buncombe" },
  { slug: "murphy-nc", name: "Murphy", county: "Cherokee" },
  { slug: "hayesville-nc", name: "Hayesville", county: "Clay" },
  { slug: "scaly-mountain-nc", name: "Scaly Mountain", county: "Macon" },
  { slug: "otto-nc", name: "Otto", county: "Macon" },
  { slug: "lake-glenville-nc", name: "Lake Glenville", county: "Jackson" },
  { slug: "lake-toxaway-nc", name: "Lake Toxaway", county: "Transylvania" },
  { slug: "sapphire-nc", name: "Sapphire", county: "Jackson" },
  { slug: "cherokee-nc", name: "Cherokee", county: "Swain" },
];

export default defineTool({
  name: "list_service_areas",
  title: "List service areas",
  description: "List Western North Carolina towns Highlander serves, with URLs to each town's local page.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const withUrls = towns.map((t) => ({
      ...t,
      url: `https://western-wnc-dominate.lovable.app/service-areas/${t.slug}`,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(withUrls, null, 2) }],
      structuredContent: { towns: withUrls },
    };
  },
});