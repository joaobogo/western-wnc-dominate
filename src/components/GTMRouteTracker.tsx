import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * SPA route tracker for Google Tag Manager (GTM-W26D39LJ).
 *
 * Pushes a `virtual_page_view` event to window.dataLayer whenever
 * the pathname or search string actually changes. The initial page
 * load is intentionally skipped — GTM's own container load handles
 * the first pageview, so we avoid duplicates.
 *
 * Does NOT load GTM (installed once in index.html). Does NOT fire on
 * re-renders, hash-only changes, or non-URL state changes.
 */
const GTMRouteTracker = () => {
  const { pathname, search } = useLocation();
  const lastUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const url = pathname + search;

    // Skip the initial mount: GTM's container load fires the first pageview.
    if (lastUrlRef.current === null) {
      lastUrlRef.current = url;
      return;
    }

    // Guard against duplicate pushes for the same URL.
    if (lastUrlRef.current === url) return;
    lastUrlRef.current = url;

    if (typeof window === "undefined") return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: "virtual_page_view",
      page_path: window.location.pathname + window.location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, search]);

  return null;
};

export default GTMRouteTracker;