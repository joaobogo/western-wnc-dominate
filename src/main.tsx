import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Recover from stale lazy-loaded chunks after a new deploy.
// If a dynamic import fails (old hashed chunk no longer exists), reload once.
const RELOAD_KEY = "hl_chunk_reload";
window.addEventListener("error", (event) => {
  const msg = event?.message || "";
  if (
    (msg.includes("Importing a module script failed") ||
      msg.includes("Failed to fetch dynamically imported module") ||
      msg.includes("error loading dynamically imported module")) &&
    !sessionStorage.getItem(RELOAD_KEY)
  ) {
    sessionStorage.setItem(RELOAD_KEY, "1");
    window.location.reload();
  }
});
window.addEventListener("unhandledrejection", (event) => {
  const msg = String(event?.reason?.message || event?.reason || "");
  if (
    (msg.includes("Importing a module script failed") ||
      msg.includes("Failed to fetch dynamically imported module") ||
      msg.includes("error loading dynamically imported module")) &&
    !sessionStorage.getItem(RELOAD_KEY)
  ) {
    sessionStorage.setItem(RELOAD_KEY, "1");
    window.location.reload();
  }
});

createRoot(document.getElementById("root")!).render(<App />);
