import { createContext, createElement, useContext, useEffect, useState, type ComponentType, type ReactNode } from "react";

/**
 * Code-split components that hydrate cleanly over the prerendered snapshot.
 *
 * React.lazy needs a <Suspense> boundary, and React only hydrates a Suspense
 * boundary when the HTML carries the `<!--$-->` markers that renderToString
 * writes. Our prerender is a browser snapshot (scripts/prerender.mjs), so it
 * never has those markers: every Suspense on the page made hydration fail
 * (React #418/#423) and React threw the snapshot away and re-rendered the
 * whole page on every visit.
 *
 * `lazyPreload` needs no Suspense. Until its chunk arrives it renders the
 * nearest <LazyFallback> (or nothing); once loaded it renders synchronously.
 * Each component records its id in a small JSON tag in <head>, which the
 * prerender snapshot captures, and `preloadRecorded()` loads exactly those
 * chunks before hydration, so the first client render matches the snapshot.
 */

type Loader = () => Promise<void>;

const registry = new Map<string, Loader>();
const RECORD_ID = "hl-lazy-preload";

const normalizePath = (path: string) => (path.length > 1 ? path.replace(/\/+$/, "") : path) || "/";

const FallbackContext = createContext<ReactNode>(null);

/** Drop-in for <Suspense fallback>: the fallback shown by lazyPreload components below it. */
export const LazyFallback = ({ fallback, children }: { fallback: ReactNode; children: ReactNode }) =>
  createElement(FallbackContext.Provider, { value: fallback }, children);

const record = (id: string) => {
  if (typeof document === "undefined") return;
  let tag = document.getElementById(RECORD_ID);
  if (!tag) {
    tag = document.createElement("script");
    tag.id = RECORD_ID;
    tag.setAttribute("type", "application/json");
    document.head.appendChild(tag);
  }
  // The route this snapshot was rendered for (see snapshotMatchesLocation).
  tag.setAttribute("data-path", normalizePath(window.location.pathname));
  let ids: string[] = [];
  try {
    ids = JSON.parse(tag.textContent || "[]");
  } catch {
    ids = [];
  }
  if (!ids.includes(id)) {
    ids.push(id);
    tag.textContent = JSON.stringify(ids);
  }
};

export function lazyPreload<P extends object>(
  id: string,
  factory: () => Promise<{ default: ComponentType<P> }>,
): ComponentType<P> & { preload: Loader } {
  let Loaded: ComponentType<P> | null = null;
  let pending: Promise<void> | null = null;

  const load: Loader = () =>
    (pending ??= factory().then(
      (mod) => {
        Loaded = mod.default;
      },
      (error) => {
        pending = null; // allow a retry on the next render
        throw error;
      },
    ));
  registry.set(id, load);

  const LazyComponent = (props: P) => {
    const fallback = useContext(FallbackContext);
    const [, setReady] = useState(0);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
      record(id);
      if (Loaded) return;
      let alive = true;
      load().then(
        () => alive && setReady((n) => n + 1),
        (err) => alive && setError(err),
      );
      return () => {
        alive = false;
      };
    }, []);

    // Surface chunk failures to the ErrorBoundary / stale-chunk reload handler.
    if (error) throw error;
    return Loaded ? createElement(Loaded, props) : (fallback as JSX.Element | null);
  };
  LazyComponent.displayName = `Lazy(${id})`;
  return Object.assign(LazyComponent, { preload: load });
}

/** Load every chunk the prerendered snapshot recorded, so hydration renders the same tree. */
export async function preloadRecorded(): Promise<void> {
  const tag = typeof document !== "undefined" ? document.getElementById(RECORD_ID) : null;
  if (!tag) return;
  let ids: string[] = [];
  try {
    ids = JSON.parse(tag.textContent || "[]");
  } catch {
    return;
  }
  await Promise.all(ids.map((id) => registry.get(id)?.().catch(() => undefined)));
}

/**
 * True when the prerendered HTML in #root was captured for the current URL
 * (or is the 404 shell, which hosts serve for any unknown URL). A host that
 * falls back to another page's HTML (e.g. index.html for a client route) must
 * not be hydrated: the markup belongs to a different page.
 */
export function snapshotMatchesLocation(): boolean {
  const tag = typeof document !== "undefined" ? document.getElementById(RECORD_ID) : null;
  const recorded = tag?.getAttribute("data-path");
  if (!recorded) return false;
  return recorded === "/__404" || recorded === normalizePath(window.location.pathname);
}
