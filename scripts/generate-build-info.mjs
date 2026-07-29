// Writes public/build-info.json so the deployed site can be fingerprinted.
// Netlify exposes COMMIT_REF / BRANCH; GitHub Actions exposes GITHUB_SHA / GITHUB_REF_NAME.
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "..", "public", "build-info.json");

function git(cmd, fallback = "") {
  try {
    return execSync(cmd, { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {
    return fallback;
  }
}

const commit =
  process.env.COMMIT_REF ||
  process.env.GITHUB_SHA ||
  git("git rev-parse HEAD", "unknown");

const branch =
  process.env.BRANCH ||
  process.env.HEAD ||
  process.env.GITHUB_REF_NAME ||
  git("git rev-parse --abbrev-ref HEAD", "unknown");

const info = {
  commit,
  shortCommit: commit.slice(0, 7),
  branch,
  builtAt: new Date().toISOString(),
  deployId: process.env.DEPLOY_ID || null,
  context: process.env.CONTEXT || "local",
};

writeFileSync(OUT, `${JSON.stringify(info, null, 2)}\n`);
console.log(`[build-info] ${info.shortCommit} on ${info.branch} @ ${info.builtAt}`);
