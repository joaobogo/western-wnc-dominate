import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { blogOrphanRedirects } from "@/data/blog-orphans.generated";

/**
 * Handles redirects for orphaned blog URLs that still exist in search indexes
 * but no longer have corresponding data in blogs.ts.
 */
const OrphanRedirectHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = location.pathname.toLowerCase().replace(/\/$/, "");
    const match = blogOrphanRedirects.find(r => r.oldUrl.toLowerCase() === currentPath);
    
    if (match) {
      console.warn(`Orphan blog URL detected: ${currentPath}. Redirecting to ${match.newUrl}`);
      navigate(match.newUrl, { replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
};

export default OrphanRedirectHandler;
