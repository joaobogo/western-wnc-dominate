/**
 * Lighthouse CI — mobile emulation against the prerendered `dist` output.
 *
 * P5.1 performance budget on the five money pages:
 *   • homepage, Franklin + Highlands town pages, roof-replacement division
 *     page, one blog post
 *   • LCP ≤ 2.5 s · CLS ≤ 0.1 · TBT ≤ 300 ms · performance ≥ 0.85 → FAIL
 *
 * The pages are served by scripts/serve-dist.mjs, which resolves clean URLs
 * exactly like Netlify does (/service-areas/franklin-nc → …/franklin-nc.html),
 * so the audited URL is the one Google sees.
 *
 * Chrome comes from the Playwright Chromium the build already installs for
 * prerendering; CHROME_PATH is resolved in scripts/lhci-gate.mjs. A fixed
 * --user-data-dir avoids chrome-launcher's temp-profile cleanup, which fails
 * with EPERM on Windows and aborts the run (Lighthouse still clears the
 * profile's cache and storage at the start of every run).
 */
const os = require("os");
const path = require("path");

const PORT = 4173;
const ORIGIN = `http://localhost:${PORT}`;
const PROFILE_DIR = path.join(os.tmpdir(), "hl-lhci-chrome-profile");

module.exports = {
  ci: {
    collect: {
      startServerCommand: `node scripts/serve-dist.mjs --port ${PORT}`,
      startServerReadyPattern: "serve-dist:",
      url: [
        `${ORIGIN}/`,
        `${ORIGIN}/service-areas/franklin-nc`,
        `${ORIGIN}/service-areas/highlands-nc`,
        `${ORIGIN}/roofing/roof-replacement`,
        `${ORIGIN}/blog/western-north-carolina-mountain-roofing-guide`,
      ],
      numberOfRuns: 3,
      settings: {
        preset: "perf",
        formFactor: "mobile",
        throttlingMethod: "simulate",
        screenEmulation: {
          mobile: true,
          width: 412,
          height: 823,
          deviceScaleFactor: 1.75,
          disabled: false,
        },
        emulatedUserAgent:
          "Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36",
        chromeFlags: `--no-sandbox --disable-dev-shm-usage --headless=new --user-data-dir=${PROFILE_DIR}`,
      },
    },
    assert: {
      // Median of the three runs is asserted; any breach fails the run.
      assertions: {
        "categories:performance": ["error", { minScore: 0.85, aggregationMethod: "median" }],
        "largest-contentful-paint": ["error", { maxNumericValue: 2500, aggregationMethod: "median" }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1, aggregationMethod: "median" }],
        "total-blocking-time": ["error", { maxNumericValue: 300, aggregationMethod: "median" }],
        "unused-javascript": ["warn", { maxNumericValue: 150000 }],
        "third-party-summary": "off",
      },
    },
    upload: {
      target: "filesystem",
      outputDir: ".lighthouseci",
    },
  },
};
