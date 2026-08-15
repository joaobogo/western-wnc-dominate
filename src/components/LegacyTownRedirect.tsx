import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { towns } from "@/data/towns";

/**
 * Handles legacy Hibu URL pattern:
 *   /contact/[service]-service-area/[town-nc]
 * 
 * This is a route-level component that performs the redirect.
 */
export default function LegacyTownRedirect() {
  const { town } = useParams<{ town: string }>();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    // Only redirect if we are explicitly on a /contact/... pattern route handled by this component
    if (!pathname.startsWith("/contact/")) return;

    const slug = (town ?? "").toLowerCase();
    const match = towns.find((t) => t.slug === slug);
    const target = match ? `/service-areas/${match.slug}` : "/service-areas";
    
    console.log(`LegacyTownRedirect: Redirecting from ${pathname} to ${target}`);
    navigate(target, { replace: true });
  }, [town, navigate, pathname]);

  return null;
}
