import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
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

// Prerendered routes ship real markup inside #root — hydrate on top of it so
// crawlers get static HTML and users still get the full SPA. Non-prerendered
// (app-only) routes fall back to a fresh client render.
const container = document.getElementById("root")!;
if (container.firstElementChild) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
