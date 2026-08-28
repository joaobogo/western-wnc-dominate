/**
 * Lighthouse CI — mobile emulation, run against the prerendered `dist` output.
 *
 * Gates (Netlify build):
 *   • performance < 0.80 → warn  (this file's assertions)
 *   • performance < 0.60 → fail  (scripts/lhci-gate.mjs, exits non-zero)
 *   • > 150 KB of third-party JS before first interaction → fail (same gate)
 *
 * Chrome comes from the Playwright Chromium the Netlify build already installs
 * for prerendering; CHROME_PATH is resolved in scripts/lhci-gate.mjs.
 */
module.exports = {
  ci: {
    collect: {
      staticDistDir: "./dist",
      // Prerendered directory-index HTML — LHCI serves these as clean URLs.
      url: [
        "http://localhost/index.html",
        "http://localhost/roofing/metal/index.html",
        "http://localhost/service-areas/highlands-nc/index.html",
        "http://localhost/blog/wnc-mountain-roofing-guide/index.html",
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
        chromeFlags: "--no-sandbox --disable-dev-shm-usage --headless=new",
      },
    },
    assert: {
      assertions: {
        // Warn band — the build stays green, the log carries the signal.
        "categories:performance": ["warn", { minScore: 0.8 }],
        "largest-contentful-paint": ["warn", { maxNumericValue: 2500 }],
        "cumulative-layout-shift": ["warn", { maxNumericValue: 0.05 }],
        "total-blocking-time": ["warn", { maxNumericValue: 200 }],
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
