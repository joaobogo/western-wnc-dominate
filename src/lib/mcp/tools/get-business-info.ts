import { PHONE_DISPLAY } from "@/data/business";
import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_business_info",
  title: "Get business info",
  description: "Return contact info, service area, and core details for Highlander Building Services.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      name: "Highlander Building Services, Inc.",
      phone: `${PHONE_DISPLAY}`,
      website: "https://highlandernc.com",
      city: "Franklin",
      region: "North Carolina",
      country: "US",
      service_area:
        "Western North Carolina — Macon, Jackson, Swain, Haywood, Transylvania, Henderson, Buncombe, Cherokee, and Clay counties.",
      divisions: ["Roofing", "Construction"],
      credentials: [
        "CertainTeed ShingleMaster Credentialed Contractor",
        "Licensed General Contractor (NC)",
      ],
      positioning:
        "Premium local roofing and construction team serving Western NC mountain homes since founding. Team-led, mountain-specialized crews.",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});