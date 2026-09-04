#!/usr/bin/env node
/**
 * Minimal static server for the prerendered dist/ folder that mirrors how
 * Netlify resolves clean URLs (P1.3 / P5.1):
 *
 *   /                          → dist/index.html
 *   /service-areas/franklin-nc → dist/service-areas/franklin-nc.html
 *   /assets/app.js             → dist/assets/app.js (exact file)
 *   anything else              → dist/404.html with a 404 status
 *
 * Used by Lighthouse CI (lighthouserc.cjs startServerCommand) so audits hit the
 * same URLs Google does, not `/index.html` lookalikes. No dependencies.
 *
 *   node scripts/serve-dist.mjs [--port 4173] [--dir dist]
 */
import { createServer } from "node:http";
import { existsSync, statSync, createReadStream } from "node:fs";
import path from "node:path";

const argv = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : fallback;
};
const PORT = Number(opt("port", process.env.PORT || 4173));
const DIST = path.resolve(process.cwd(), opt("dir", "dist"));

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".webmanifest": "application/manifest+json",
  ".map": "application/json",
};

const isFile = (p) => existsSync(p) && statSync(p).isFile();

/** Resolve a request path to a file the way the CDN would; null → 404. */
const resolveFile = (urlPath) => {
  let p = decodeURIComponent(urlPath.split("?")[0].split("#")[0]);
  if (p.includes("..")) return null;
  if (p.length > 1) p = p.replace(/\/+$/, "");
  if (p === "/") return path.join(DIST, "index.html");
  const exact = path.join(DIST, p);
  if (isFile(exact)) return exact;
  if (isFile(`${exact}.html`)) return `${exact}.html`;
  if (isFile(path.join(exact, "index.html"))) return path.join(exact, "index.html");
  return null;
};

const send = (res, file, status) => {
  const ext = path.extname(file).toLowerCase();
  res.writeHead(status, {
    "Content-Type": TYPES[ext] || "application/octet-stream",
    "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=31536000, immutable",
  });
  createReadStream(file).pipe(res);
};

const server = createServer((req, res) => {
  const file = resolveFile(req.url || "/");
  if (file) return send(res, file, 200);
  const notFound = path.join(DIST, "404.html");
  if (isFile(notFound)) return send(res, notFound, 404);
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not found");
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`serve-dist: ${DIST} → http://localhost:${PORT}/`);
});
