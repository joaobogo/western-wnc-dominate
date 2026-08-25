#!/usr/bin/env node
/**
 * Production smoke test for the 301 map.
 *
 * Usage: node scripts/redirect-smoke.mjs https://highlandernc.com [--only=/contact]
 *
 * Requests every `from` path in public/_redirects with redirect: "manual"
 * and prints `from → status → location` so the whole map can be eyeballed.
 * Exits 1 if any non-wildcard 301!/410 rule returns an unexpected status.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const base = (process.argv[2] || "https://highlandernc.com").replace(/\/$/, "");
const only = (process.argv.find(a => a.startsWith("--only=")) || "").split("=")[1];

const rules = readFileSync(resolve("public/_redirects"), "utf8")
  .split(/\r?\n/)
  .map(l => l.trim())
  .filter(l => l && !l.startsWith("#"))
  .map(l => l.split(/\s+/))
  .filter(p => p.length >= 2 && p[0].startsWith("/"))
  .map(([from, to, status = "301"]) => ({ from, to, status: Number(status.replace("!", "")) }));

// Turn placeholders/splats into a concrete probe path.
const probePath = (from) =>
  from
    .replace(/\/\*$/, "/roofing-company-service-area")
    .replace(/:[^/]+/g, (m) => (m === ":town" ? "franklin-nc" : "probe"));

const targets = rules.filter(r => (only ? r.from.startsWith(only) : true));

let bad = 0;
const pad = (s, n) => String(s).padEnd(n);

for (const rule of targets) {
  const path = probePath(rule.from);
  let status = "ERR";
  let location = "";
  try {
    const res = await fetch(base + path, { redirect: "manual", headers: { "user-agent": "highlander-redirect-smoke" } });
    status = res.status;
    location = res.headers.get("location") || "";
  } catch (err) {
    location = err.message;
  }
  const expected = rule.status;
  const ok = status === expected || (expected === 200 && status === 200);
  if (!ok) bad++;
  console.log(`${ok ? "✓" : "✖"} ${pad(path, 55)} → ${pad(status, 5)} → ${location || "(none)"}   [expected ${expected} → ${rule.to}]`);
}

console.log(`\n${targets.length} rules probed against ${base}; ${bad} unexpected.`);
process.exit(bad ? 1 : 0);
