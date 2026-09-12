/**
 * Responsive candidates for every gallery master, generated at build time by
 * vite-imagetools from one glob — so a page never has to hand-import six
 * srcsets to stop shipping 1800px originals to phones (mobile re-audit F5 / L-4).
 *
 * Lookup is by the master's basename, which survives Vite's content hash:
 *   dev:   /src/assets/gallery/cedar-001.webp
 *   build: /assets/cedar-001-BHXMgQ4y.webp
 */
const AVIF = import.meta.glob("/src/assets/gallery/*.{webp,jpg}", {
  query: "?w=480;800;1200&format=avif&as=srcset",
  eager: true,
  import: "default",
}) as Record<string, string>;

const WEBP = import.meta.glob("/src/assets/gallery/*.{webp,jpg}", {
  query: "?w=480;800;1200&format=webp&as=srcset",
  eager: true,
  import: "default",
}) as Record<string, string>;

/** The 480px WebP — what the <img> fallback should point at, never the master. */
const SMALL = import.meta.glob("/src/assets/gallery/*.{webp,jpg}", {
  query: "?w=480&format=webp",
  eager: true,
  import: "default",
}) as Record<string, string>;

export interface GallerySrcSets {
  avif: string;
  webp: string;
  small: string;
}

const byBasename = new Map<string, GallerySrcSets>();
for (const key of Object.keys(AVIF)) {
  const base = key.split("/").pop()!;
  byBasename.set(base, { avif: AVIF[key], webp: WEBP[key], small: SMALL[key] });
}

/** Vite appends `-XXXXXXXX` (8 url-safe chars) before the extension in builds. */
const HASH = /-[A-Za-z0-9_-]{8}(?=\.[a-z0-9]+$)/i;

export function gallerySrcSets(masterUrl: string): GallerySrcSets | null {
  if (!masterUrl || masterUrl.startsWith("data:")) return null;
  const file = masterUrl.split("?")[0].split("#")[0].split("/").pop() ?? "";
  return byBasename.get(file) ?? byBasename.get(file.replace(HASH, "")) ?? null;
}
