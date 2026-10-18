import { useEffect } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { MotionGlobalConfig } from "framer-motion";
import App from "./App.tsx";
import { preloadRecorded, snapshotMatchesLocation } from "./lib/lazy-preload";

/** Re-enables animations shortly after the hydrated tree has committed. */
const HydrationSettled = ({ children }: { children: JSX.Element }) => {
  useEffect(() => {
    const t = window.setTimeout(() => {
      MotionGlobalConfig.skipAnimations = false;
    }, 800);
    return () => window.clearTimeout(t);
  }, []);
  return children;
};

/**
 * Second stage of the entry (P5.1). main.tsx imports this chunk one animation
 * frame after the stylesheet has applied, so the browser commits the
 * prerendered markup BEFORE React, framer-motion and the route chunk are
 * evaluated. Everything that used to live at the bottom of main.tsx is here,
 * unchanged.
 *
 * Prerendered routes ship real markup inside #root — hydrate on top of it so
 * crawlers get static HTML and users still get the full SPA. Non-prerendered
 * (app-only) routes fall back to a fresh client render.
 */
const container = document.getElementById("root")!;
if (container.firstElementChild && snapshotMatchesLocation()) {
  // Load the code-split chunks the snapshot was rendered with first, so the
  // first client render matches it and React hydrates instead of re-rendering.
  //
  // Entrance animations (framer-motion `initial={{ opacity: 0 }}`) would hide
  // content the visitor is already looking at and fade it back in, which held
  // the mobile LCP (the hero text) until after JavaScript. While the snapshot
  // is adopted, animations jump straight to their end state; once the page
  // has settled they run normally for navigation and scroll reveals.
  MotionGlobalConfig.skipAnimations = true;
  void preloadRecorded().then(() =>
    hydrateRoot(
      container,
      <HydrationSettled>
        <App />
      </HydrationSettled>,
    ),
  );
} else {
  createRoot(container).render(<App />);
}
