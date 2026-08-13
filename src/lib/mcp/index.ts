import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getBusinessInfo from "./tools/get-business-info";
import listServices from "./tools/list-services";
import listServiceAreas from "./tools/list-service-areas";
import searchSite from "./tools/search-site";
import fetchPage from "./tools/fetch-page";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "highlander-mcp",
  title: "Highlander Building Services",
  version: "0.1.0",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  instructions:
    "Tools for Highlander Building Services (Western North Carolina). Use `get_business_info` for contact details and credentials, `list_services` and `list_service_areas` for what is offered and where, `search_site` to find pages (blog posts, service pages, town pages) by keyword, and `fetch_page` to read the HTML of a specific page.",
  tools: [getBusinessInfo, listServices, listServiceAreas, searchSite, fetchPage],
});