import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  installGtmGlobalListeners,
  startPageEngagement,
  trackGbpMapPackClick,
} from "@/lib/gtm";
import { captureAttribution } from "@/lib/attribution";


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

  // Install global click/focus listeners exactly once.
  useEffect(() => {
    installGtmGlobalListeners();
  }, []);

  // Re-capture on every route change. First-touch values already in
  // sessionStorage always win, so campaign data survives SPA navigation —
  // this only fills gaps or picks up a campaign link opened mid-session.
  useEffect(() => {
    captureAttribution();
    // Map-pack arrival — self-guarded, so it fires at most once per session.
    trackGbpMapPackClick();
  }, [pathname, search]);


  // Scroll-depth + engaged-time measurement, restarted on every route.
  useEffect(() => startPageEngagement(pathname + search), [pathname, search]);

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
    // Meta and TikTok load outside GTM, so hand them the SPA page change directly.
    try {
      w.fbq?.("track", "PageView");
    } catch {
      /* pixel blocked or opted out */
    }
    try {
      w.ttq?.page?.();
    } catch {
      /* pixel blocked or opted out */
    }
  }, [pathname, search]);

  return null;
};

export default GTMRouteTracker;