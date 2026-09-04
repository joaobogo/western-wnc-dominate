import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";

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
if (container.firstElementChild) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
