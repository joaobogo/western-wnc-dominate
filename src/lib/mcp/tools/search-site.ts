import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const SITEMAP_URL = "https://western-wnc-dominate.lovable.app/sitemap.xml";

export default defineTool({
  name: "search_site",
  title: "Search site",
  description:
    "Case-insensitive keyword search across Highlander's site URLs (pulled from sitemap.xml). Returns matching page URLs. Useful for finding blog posts, service pages, and town pages by topic.",
  inputSchema: {
    query: z.string().min(1).describe("Keyword or phrase to match against page URLs, e.g. 'metal roofing highlands'."),
    limit: z.number().int().min(1).max(50).optional().describe("Max results to return (default 15)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true },
  handler: async ({ query, limit }) => {
    const res = await fetch(SITEMAP_URL, { headers: { Accept: "application/xml" } });
    if (!res.ok) {
      return { content: [{ type: "text", text: `Failed to fetch sitemap: ${res.status}` }], isError: true };
    }
    const xml = await res.text();
    const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1]);
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const matches = urls.filter((u) => {
      const l = u.toLowerCase();
      return terms.every((t) => l.includes(t));
    }).slice(0, limit ?? 15);
    return {
      content: [{ type: "text", text: matches.length ? matches.join("\n") : "No matching pages." }],
      structuredContent: { query, matches },
    };
  },
});