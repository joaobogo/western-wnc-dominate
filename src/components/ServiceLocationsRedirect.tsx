import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { towns } from "@/data/towns";

/**
 * Legacy URL pattern: /service-locations and /service-locations/*
 * Permanent (301 at edge) consolidation to /service-areas.
 * When the legacy slug matches a live town, send the user to that town page.
 */
export default function ServiceLocationsRedirect() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const rest = pathname.replace(/^\/service-locations\/?/, "").replace(/\/+$/, "");
    const slug = rest.split("/")[0]?.toLowerCase() ?? "";
    const match = slug ? towns.find((t) => t.slug === slug) : undefined;
    navigate(match ? `/service-areas/${match.slug}` : "/service-areas", { replace: true });
  }, [pathname, navigate]);

  return null;
}
