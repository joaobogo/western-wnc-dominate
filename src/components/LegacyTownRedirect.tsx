import { Navigate, useParams } from "react-router-dom";
import { towns } from "@/data/towns";

/**
 * Handles legacy Hibu URL pattern:
 *   /contact/[service]-service-area/[town-nc]
 * Redirects to canonical /service-areas/[town-nc] when the town is valid,
 * otherwise to the /service-areas hub. 301-equivalent (replace).
 */
export default function LegacyTownRedirect() {
  const { town } = useParams<{ town: string }>();
  const slug = (town ?? "").toLowerCase();
  const match = towns.find((t) => t.slug === slug);
  return <Navigate to={match ? `/service-areas/${match.slug}` : "/service-areas"} replace />;
}