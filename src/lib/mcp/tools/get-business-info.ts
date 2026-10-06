import { BUSINESS, PHONE_DISPLAY } from "@/data/business";
import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_business_info",
  title: "Get business info",
  description: "Return contact info, service area, and core details for Highlander Building Services.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      name: BUSINESS.legalName,
      phone: `${PHONE_DISPLAY}`,
      website: BUSINESS.websiteUrl,
      city: "Franklin",
      region: "North Carolina",
      country: "US",
      service_area: `Western North Carolina — ${BUSINESS.countiesServed.map((county) => county.name).join(", ")}.`,
      divisions: ["Roofing", "Construction"],
      credentials: BUSINESS.credentials.map((credential) => credential.label),
      positioning:
        "Roofing and construction company serving Western North Carolina from Franklin and Sylva with written project scopes and licensed general-contractor oversight.",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});