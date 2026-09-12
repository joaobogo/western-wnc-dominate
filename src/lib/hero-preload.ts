/**
 * Route-aware LCP hero preload (Prompt 41).
 *
 * The hero <img> only enters the DOM after the route chunk parses, which on a
 * throttled phone pushed the image request out past 3.5s. Running this from the
 * entry module starts the download roughly as soon as the app bundle executes,
 * while still letting the browser pick the width-appropriate AVIF.
 */
import homeAvif from "@/assets/hero-roofing.webp?w=640;960;1280;1600&format=avif&as=srcset";
import repairAvif from "@/assets/gallery/asphalt-003.webp?w=640;960;1280;1600&format=avif&as=srcset";
import replacementAvif from "@/assets/gallery/asphalt-008.webp?w=640;960;1280;1600&format=avif&as=srcset";
import stormAvif from "@/assets/gallery/asphalt-005.webp?w=640;960;1280;1600&format=avif&as=srcset";

const HERO_BY_PATH: Record<string, string> = {
  "/": homeAvif,
  "/roofing/roof-repair": repairAvif,
  "/roofing/roof-replacement": replacementAvif,
  "/roofing/storm-damage": stormAvif,
};

export function preloadRouteHero(pathname = window.location.pathname) {
  const key = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
  const srcSet = HERO_BY_PATH[key];
  if (!srcSet) return;

  // The prerendered HTML already carries the <link> this inserted at snapshot
  // time — which is ideal (the preload scanner sees it before any JS). Adding
  // a second one fetched the hero twice at different sizes (mobile re-audit
  // L-4). Skip if one is already in the document.
  if (document.querySelector('link[rel="preload"][as="image"][data-hero-preload]')) return;

  const link = document.createElement("link");
  link.setAttribute("data-hero-preload", "true");
  link.rel = "preload";
  link.as = "image";
  link.type = "image/avif";
  link.setAttribute("imagesrcset", srcSet);
  link.setAttribute("imagesizes", "100vw");
  link.setAttribute("fetchpriority", "high");
  document.head.appendChild(link);
}
