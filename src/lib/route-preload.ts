/**
 * Route-based preloading.
 *
 * Heavy routes are lazy-loaded in App.tsx. This module warms the same dynamic
 * imports ahead of navigation — on nav hover/focus and, for the most likely
 * next pages, once the browser is idle after first paint.
 * Vite dedupes these imports, so warming never downloads a chunk twice.
 */

type Loader = () => Promise<unknown>;

const routeLoaders: Record<string, Loader> = {
  "/roofing": () => import("@/pages/RoofingDivision"),
  "/construction": () => import("@/pages/ConstructionDivision"),
  "/gallery": () => import("@/pages/Gallery"),
  "/blog": () => import("@/pages/Blog"),
  "/projects": () => import("@/pages/RecentProjects"),
  "/service-areas": () => import("@/pages/ServiceAreas"),
  "/about": () => import("@/pages/About"),
  "/contact": () => import("@/pages/Contact"),
  "/request-inspection": () => import("@/pages/RequestInspection"),
};

const warmed = new Set<string>();

/** Match a href (possibly a deep sub-route) to its closest known chunk. */
function resolveKey(href: string): string | undefined {
  const path = href.split("#")[0].split("?")[0];
  if (routeLoaders[path]) return path;
  const segment = "/" + path.split("/").filter(Boolean)[0];
  return routeLoaders[segment] ? segment : undefined;
}

export function preloadRoute(href: string) {
  const key = resolveKey(href);
  if (!key || warmed.has(key)) return;
  warmed.add(key);
  routeLoaders[key]().catch(() => warmed.delete(key));
}

/**
 * Warm the highest-intent next pages — but only after the current page has
 * fully loaded, and one route at a time. Speculative chunks fired during load
 * compete with the LCP image and the route's own chunk on a throttled mobile
 * connection, which measurably delays first paint (CRO Prompt 40).
 */
export function preloadLikelyRoutes() {
  if (typeof window === "undefined") return;

  // Respect data saver and slow networks — never speculate on their bandwidth.
  const conn = (navigator as unknown as {
    connection?: { saveData?: boolean; effectiveType?: string };
  }).connection;
  if (conn?.saveData) return;
  if (conn?.effectiveType && /2g/.test(conn.effectiveType)) return;

  // /request-inspection is intentionally excluded: its chunk pulls the backend
  // client (~215 KB), which marketing visitors should never download.
  const queue = ["/roofing", "/construction"];
  const idle = (window as unknown as {
    requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void;
  }).requestIdleCallback;

  const next = () => {
    const href = queue.shift();
    if (!href) return;
    preloadRoute(href);
    // Stagger so the warm-up never saturates the connection in one burst.
    window.setTimeout(() => (idle ? idle(next, { timeout: 3000 }) : next()), 1200);
  };

  const start = () => (idle ? idle(next, { timeout: 5000 }) : window.setTimeout(next, 2000));
  if (document.readyState === "complete") window.setTimeout(start, 1500);
  else window.addEventListener("load", () => window.setTimeout(start, 1500), { once: true });
}

/** Spread onto a <Link> to warm its chunk on hover / focus / touch. */
export function preloadHandlers(href: string) {
  const warm = () => preloadRoute(href);
  return { onMouseEnter: warm, onFocus: warm, onTouchStart: warm };
}
