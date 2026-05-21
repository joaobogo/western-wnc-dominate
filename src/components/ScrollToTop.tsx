import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Global scroll-to-top on route change.
 * - Resets window scroll on pathname change
 * - Respects hash anchors (e.g. #contact)
 * - Disables browser's native scroll restoration to prevent stale positions
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Disable browser's native scroll restoration so it doesn't fight us
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    // If there's a hash, let the browser handle anchor scrolling
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        // Small delay to let layout settle after route transition
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: "smooth" });
        });
        return;
      }
    }

    // Standard navigation: scroll to top instantly.
    // Run multiple times to defeat lazy-loaded Suspense content that
    // mounts taller than the fallback and can leave the viewport offset.
    const reset = () => {
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    };
    reset();
    requestAnimationFrame(reset);
    const t = window.setTimeout(reset, 80);
    return () => window.clearTimeout(t);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
