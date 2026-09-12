/**
 * Tracking guard. Runs in prebuild — nothing ships if measurement is broken.
 *
 * STANDING RULE (João, 2026-09-09): no change to this site may ever break the
 * pixels. Marketing spend is judged on this data, and a silent regression can
 * go unnoticed for weeks. This file turns that rule into a build failure.
 *
 * If you are here because the build failed: you almost certainly edited
 * index.html, src/lib/pixels.ts, src/lib/gtm.ts or GTMRouteTracker.tsx. Restore
 * the behaviour rather than relaxing a check. If a tracking ID genuinely
 * changed, update the constant below in the same commit and say so in the
 * message.
 *
 * Not covered here, by design: GA4 (G-TYYM63MNYR) and Google Ads
 * (AW-18087272930) are loaded BY the GTM container at runtime, not from our
 * source, so they cannot be asserted statically. Verify those in GTM.
 *
 * Meta note (confirmed live, 12 Sep 2026): pixel 1300176212241296 is configured
 * for the Conversions API Gateway (OpenBridge). PageView and later events leave
 * the browser as POST …ecs.us-east-2.on.aws/events, NOT as the classic
 * facebook.com/tr beacon. "No facebook.com/tr request" is therefore NOT a
 * regression. Verify delivery in Events Manager → Test Events.
 */
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(path.join(ROOT, p), "utf8");

const failures = [];
const check = (label, condition, detail) => {
  if (!condition) failures.push(`${label}${detail ? ` — ${detail}` : ""}`);
};

// ---------------------------------------------------------------- index.html
const html = read("index.html");

check("GTM container GTM-W26D39LJ missing from index.html", html.includes("GTM-W26D39LJ"));
check("GTM must load from googletagmanager.com/gtm.js", html.includes("googletagmanager.com/gtm.js"));

check("Meta Pixel id 1300176212241296 missing", html.includes("1300176212241296"));
check("Meta Pixel must init and queue a PageView", /fbq\('init'[\s\S]{0,80}fbq\('track','PageView'\)/.test(html.replace(/\s+/g, " ")) || (html.includes("fbq('init'") && html.includes("fbq('track','PageView')")));
check("Meta loader __loadFB missing", html.includes("__loadFB"));
check("fbevents.js fetch missing", html.includes("connect.facebook.net/en_US/fbevents.js"));

check("TikTok Pixel id D8GTVURC77UDLID67QSG missing", html.includes("D8GTVURC77UDLID67QSG"));
check("TikTok loader __loadTT missing", html.includes("__loadTT"));
check("TikTok events.js fetch missing", html.includes("analytics.tiktok.com/i18n/pixel/events.js"));

// Opt-out consent model: granted unless the visitor explicitly opted out.
check(
  "Consent Mode default must be GRANTED unless a stored opt-out exists",
  html.includes("=== false ? 'denied' : 'granted'"),
  "an opt-in default would silently stop measurement for most visitors",
);
check("gtag consent default block missing", /gtag\('consent','default'/.test(html));
check("url_passthrough missing", html.includes("url_passthrough"));

// Pixels must fire on load, not behind the interaction gate.
check(
  "loadMarketing() must run on page load",
  /\n\s*loadMarketing\(\);\s*\n\s*arm\(\);/.test(html),
  "pixels would only fire after a scroll or click, losing every bounce",
);
check("__hlApplyConsent hook missing", html.includes("__hlApplyConsent"));

// ------------------------------------------------------------------ app code
check("src/lib/pixels.ts is missing", existsSync(path.join(ROOT, "src/lib/pixels.ts")));

if (existsSync(path.join(ROOT, "src/lib/pixels.ts"))) {
  const pixels = read("src/lib/pixels.ts");
  check("pixels.ts must export pixelPhoneClick", pixels.includes("export function pixelPhoneClick"));
  check("pixels.ts must send a Meta/TikTok event", pixels.includes("fbq") && pixels.includes("ttq"));
}

const gtm = read("src/lib/gtm.ts");
check("trackPhoneClick must still push phone_click to the dataLayer", gtm.includes('event: "phone_click"'));
// Anchored to line start so a commented-out call does not satisfy the check.
check(
  "trackPhoneClick must still fire the Meta/TikTok Contact event",
  /^\s*pixelPhoneClick\(/m.test(gtm),
  "call conversions are the primary KPI",
);
check("global tel:/mailto listener installer missing", gtm.includes("installGtmGlobalListeners"));

const tracker = read("src/components/GTMRouteTracker.tsx");
check("SPA route change must push virtual_page_view", tracker.includes('event: "virtual_page_view"'));
check("SPA route change must send a Meta PageView", /fbq\?\.\("track", "PageView"\)/.test(tracker));
check("SPA route change must send a TikTok page view", tracker.includes("ttq?.page?.()"));

const headerActions = read("src/components/header/HeaderActions.tsx");
check(
  "desktop header estimate CTA tracking is missing",
  headerActions.includes('data-gtm-cta="request_inspection"') && headerActions.includes('data-gtm-location="header"'),
);

const mobileMenu = read("src/components/header/MobileMenu.tsx");
check(
  "mobile menu estimate CTA tracking is missing",
  mobileMenu.includes('data-gtm-cta="request_inspection"') && mobileMenu.includes('data-gtm-location="mobile_menu"'),
);

const analytics = read("src/lib/analytics.ts");
check("form_submit must still reach the Meta pixel", /^\s*\(window as any\)\.fbq\(/m.test(analytics) || /fbq\("track"/.test(analytics) || /fbq\(\"track\"/.test(analytics));

// --------------------------------------------------------------------- report
if (failures.length) {
  console.error(`FAIL  check-tracking: ${failures.length} regression(s) — measurement would be broken.`);
  failures.forEach((f) => console.error(`      ${f}`));
  console.error("      Standing rule: no change may ever break the pixels. Restore the behaviour.");
  process.exit(1);
}

console.log("PASS  check-tracking: GTM, Meta, TikTok, consent defaults and call/lead events all intact");
