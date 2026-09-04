import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { blogOrphanRedirects } from "@/data/blog-orphans.generated";

/**
 * Handles redirects for orphaned blog URLs that still exist in search indexes
 * but no longer have corresponding data in blogs.ts.
 *
 * P5.1: the blog corpus (src/data/blogs.ts and everything it pulls in — the
 * whole service×town content) is imported on demand, only when the current
 * URL is actually on the orphan list. A static import here put ~700 KB of blog
 * text into the initial JS chunk of every page.
 */
const OrphanRedirectHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = location.pathname.toLowerCase().replace(/\/$/, "");
    const match = blogOrphanRedirects.find(r => r.oldUrl.toLowerCase() === currentPath);
    if (!match) return;

    // The orphan list is a snapshot; a slug on it may have been (re)published
    // since. Never redirect away from a post that exists — that would strip
    // the real page's title/canonical and duplicate /blog.
    const slug = currentPath.startsWith("/blog/") ? currentPath.slice("/blog/".length) : "";
    let cancelled = false;
    const decide = (postExists: boolean) => {
      if (cancelled || postExists) return;
      console.warn(`Orphan blog URL detected: ${currentPath}. Redirecting to ${match.newUrl}`);
      navigate(match.newUrl, { replace: true });
    };
    if (!slug) decide(false);
    else {
      void import("@/data/blogs")
        .then(({ getBlogBySlug }) => decide(Boolean(getBlogBySlug(slug))))
        .catch(() => decide(false));
    }
    return () => {
      cancelled = true;
    };
  }, [location.pathname, navigate]);

  return null;
};

export default OrphanRedirectHandler;
