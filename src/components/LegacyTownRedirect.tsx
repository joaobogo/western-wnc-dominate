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
  const slug = (town ?? "").toLowerCase();
  const match = towns.find((t) => t.slug === slug);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const target = match ? `/service-areas/${match.slug}` : "/service-areas";
    navigate(target, { replace: true });
  }, [match, navigate]);

  return null;
}
