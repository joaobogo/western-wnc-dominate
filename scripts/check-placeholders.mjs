#!/usr/bin/env node
/**
 * Build Brief A5: a {{NEEDS_HIGHLANDER: …}} placeholder marks a fact Highlander
 * still has to supply. It may live in source while work is in progress, but it
 * must never reach production. Fails the build if any file in dist/ contains it.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.argv[2] || "dist";
const NEEDLE = "{{NEEDS_HIGHLANDER";
const TEXT = /\.(html|js|css|json|txt|xml|md)$/i;
const hits = [];

const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (TEXT.test(name) && readFileSync(path, "utf8").includes(NEEDLE)) hits.push(path);
  }
};

try {
  walk(ROOT);
} catch (error) {
  console.error(`check-placeholders: cannot read ${ROOT}: ${error.message}`);
  process.exit(1);
}

if (hits.length) {
  console.error(`check-placeholders: FAILED. ${NEEDLE} found in ${hits.length} built file(s):`);
  hits.slice(0, 20).forEach((h) => console.error(`  ${h}`));
  console.error("Supply the fact (see docs/open-items.md) or remove the section before releasing.");
  process.exit(1);
}
console.log(`check-placeholders: no ${NEEDLE} in ${ROOT}/`);
