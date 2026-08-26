#!/usr/bin/env node
/**
 * IndexNow submission on deploy.
 *
 * Compares the content hash of every prerendered page against the manifest
 * published by the previous deploy (https://highlandernc.com/indexnow-manifest.json)
 * and submits only the URLs whose rendered HTML actually changed. The new
 * manifest is written to dist/ so the next deploy can diff against it.
 *
 * Runs in postbuild, after prerender + OG generation. It is a no-op on
 * non-production builds unless INDEXNOW_FORCE=1 is set. Every response from
 * the endpoint is logged (status + body) so deploy logs show what happened.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { createHash } from "node:crypto";

const DIST = resolve("dist");
const BASE_URL = "https://highlandernc.com";
const MANIFEST_NAME = "indexnow-manifest.json";
const ENDPOINT =
  process.env.INDEXNOW_ENDPOINT ||
  "https://qflrlebkswerlbqbuslx.supabase.co/functions/v1/indexnow-submit";
const MAX_URLS = 5_000;
const IS_PRODUCTION =
  process.env.INDEXNOW_FORCE === "1" ||
  (process.env.CONTEXT === "production" && process.env.NETLIFY === "true");

/** route → sha256 of the prerendered <body> markup. */
function buildManifest() {
  const manifest = {};
  const walk = (dir, prefix) => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) {
        if (["assets", "og"].includes(entry)) continue;
        walk(full, `${prefix}/${entry}`);
      } else if (entry === "index.html") {
        const html = readFileSync(full, "utf8")
          // Volatile per-build markers must not count as content changes.
          .replace(/<meta name="prerendered-at"[^>]*>/g, "")
          .replace(/\/assets\/[^"']+/g, "");
        manifest[prefix || "/"] = createHash("sha256").update(html).digest("hex").slice(0, 32);
      }
    }
  };
  walk(DIST, "");
  return manifest;
}

async function previousManifest() {
  try {
    const res = await fetch(`${BASE_URL}/${MANIFEST_NAME}`, {
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) {
      console.log(`indexnow: no previous manifest (HTTP ${res.status}) — treating deploy as first run`);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.log(`indexnow: could not fetch previous manifest (${err.message}) — skipping diff`);
    return null;
  }
}

async function main() {
  if (!existsSync(join(DIST, "index.html"))) {
    console.log("indexnow: dist missing — skipped");
    return;
  }

  const manifest = buildManifest();
  writeFileSync(join(DIST, MANIFEST_NAME), JSON.stringify(manifest));

  if (!IS_PRODUCTION) {
    console.log(
      `indexnow: manifest written (${Object.keys(manifest).length} routes); submission skipped (not a production deploy)`,
    );
    return;
  }

  const previous = await previousManifest();
  const changed = Object.entries(manifest)
    .filter(([route, hash]) => !previous || previous[route] !== hash)
    .map(([route]) => `${BASE_URL}${route === "/" ? "/" : route}`);

  if (changed.length === 0) {
    console.log("indexnow: no changed URLs — nothing submitted");
    return;
  }

  const urls = changed.slice(0, MAX_URLS);
  console.log(`indexnow: submitting ${urls.length} changed URL(s) to ${ENDPOINT}`);
  console.log(`indexnow: sample — ${urls.slice(0, 5).join(", ")}`);

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ urls }),
      signal: AbortSignal.timeout(30_000),
    });
    const body = await res.text();
    console.log(`indexnow: response ${res.status} ${res.statusText} — ${body.slice(0, 500)}`);
    if (!res.ok) console.warn("indexnow: submission failed (build not blocked)");
  } catch (err) {
    console.warn(`indexnow: submission error (build not blocked) — ${err.message}`);
  }
}

main();
