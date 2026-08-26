import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { blogOrphanRedirects } from "@/data/blog-orphans.generated";
import { getBlogBySlug } from "@/data/blogs";

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

    // The orphan list is a snapshot; a slug on it may have been (re)published
    // since. Never redirect away from a post that exists — that would strip
    // the real page's title/canonical and duplicate /blog.
    const slug = currentPath.startsWith("/blog/") ? currentPath.slice("/blog/".length) : "";
    const postExists = slug ? Boolean(getBlogBySlug(slug)) : false;

    if (match && !postExists) {
      console.warn(`Orphan blog URL detected: ${currentPath}. Redirecting to ${match.newUrl}`);
      navigate(match.newUrl, { replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
};

export default OrphanRedirectHandler;
