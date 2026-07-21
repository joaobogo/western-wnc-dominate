import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const ALLOWED_HOST = "western-wnc-dominate.lovable.app";

export default defineTool({
  name: "fetch_page",
  title: "Fetch page",
  description:
    "Fetch the raw HTML of a page on the Highlander site. Only URLs on western-wnc-dominate.lovable.app are allowed. Use search_site first to find URLs.",
  inputSchema: {
    url: z.string().url().describe("Full https URL on the Highlander site."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true },
  handler: async ({ url }) => {
    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      return { content: [{ type: "text", text: "Invalid URL." }], isError: true };
    }
    if (parsed.protocol !== "https:" || parsed.hostname !== ALLOWED_HOST) {
      return {
        content: [{ type: "text", text: `Only https URLs on ${ALLOWED_HOST} are allowed.` }],
        isError: true,
      };
    }
    const res = await fetch(parsed.toString());
    if (!res.ok) {
      return { content: [{ type: "text", text: `Fetch failed: ${res.status}` }], isError: true };
    }
    const html = await res.text();
    const capped = html.length > 200_000 ? html.slice(0, 200_000) + "\n\n[truncated]" : html;
    return { content: [{ type: "text", text: capped }] };
  },
});