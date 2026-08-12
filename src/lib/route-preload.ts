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

/** Warm the highest-intent next pages once the main thread is free. */
export function preloadLikelyRoutes() {
  const run = () => ["/roofing", "/construction", "/request-inspection"].forEach(preloadRoute);
  if (typeof window === "undefined") return;
  if ("requestIdleCallback" in window) {
    (window as Window & { requestIdleCallback: (cb: () => void, o?: { timeout: number }) => void }).requestIdleCallback(
      run,
      { timeout: 4000 },
    );
  } else {
    window.setTimeout(run, 2500);
  }
}

/** Spread onto a <Link> to warm its chunk on hover / focus / touch. */
export function preloadHandlers(href: string) {
  const warm = () => preloadRoute(href);
  return { onMouseEnter: warm, onFocus: warm, onTouchStart: warm };
}
