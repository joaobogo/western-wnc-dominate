import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { normalizeCanonicalPath } from "@/components/SEOHead";

/**
 * Keeps the browser URL in the same shape as the canonical tag.
 *
 * React Router matches paths case-sensitively, so "/Service-Areas/Highlands-NC"
 * would fall through to the 404 route even though the page exists. Normalizing
 * the pathname (lowercase, no trailing slash, no duplicate slashes) and
 * replacing history keeps one crawlable URL per page and preserves any query
 * string for attribution.
 */
const UrlNormalizer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const normalized = normalizeCanonicalPath(location.pathname);
    if (normalized !== location.pathname) {
      navigate(`${normalized}${location.search}${location.hash}`, { replace: true });
    }
  }, [location.pathname, location.search, location.hash, navigate]);

  return null;
};

export default UrlNormalizer;
