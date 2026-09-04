import "./index.css";
import { installGlobalErrorHandlers } from "./lib/error-reporting";
import { preloadRouteHero } from "./lib/hero-preload";

// Global uncaught error + unhandled rejection listeners (report to analytics,
// dedup fingerprints, ignore benign browser noise).
installGlobalErrorHandlers();

// Start the LCP hero download before React renders the route (Prompt 41).
preloadRouteHero();

// Recover from stale lazy-loaded chunks after a new deploy.
// If a dynamic import fails (old hashed chunk no longer exists), reload once.
const RELOAD_KEY = "hl_chunk_reload";
const isStaleChunkMessage = (msg: string) =>
  msg.includes("Importing a module script failed") ||
  msg.includes("Failed to fetch dynamically imported module") ||
  msg.includes("error loading dynamically imported module");

const maybeReloadForStaleChunk = (msg: string) => {
  if (isStaleChunkMessage(msg) && !sessionStorage.getItem(RELOAD_KEY)) {
    sessionStorage.setItem(RELOAD_KEY, "1");
    window.location.reload();
  }
};

window.addEventListener("error", (event) => {
  maybeReloadForStaleChunk(event?.message || "");
});
window.addEventListener("unhandledrejection", (event) => {
  maybeReloadForStaleChunk(String(event?.reason?.message || event?.reason || ""));
});

// P5.1 — paint first, boot second. This entry chunk stays tiny (stylesheet,
// error handlers, hero preload). React, framer-motion and the route chunk live
// in ./bootstrap, imported one animation frame + one macrotask later, so the
// browser commits the prerendered markup before any of that work runs.
// Lighthouse measured the opposite order before: first paint waited behind
// the whole JS boot (observed FCP ≈ 1.8–3 s unthrottled, 12–25 s simulated).
// Nothing visual or behavioural changes; hydration starts roughly one frame
// later than it used to.
const boot = () => {
  void import("./bootstrap");
};
if (typeof requestAnimationFrame === "function") {
  requestAnimationFrame(() => window.setTimeout(boot, 0));
} else {
  boot();
}
