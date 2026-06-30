import { readFileSync, existsSync, statSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const PUBLIC = resolve(ROOT, "public");
const HTML = resolve(ROOT, "index.html");

// Required assets — must exist in /public AND be referenced somewhere reachable from index.html
// (either directly in <head> OR transitively through site.webmanifest, which is itself linked from <head>)
// Patterns allow optional ?v=N cache-busting query strings.
const Q = `(?:\\?v=\\d+)?`;
const REQUIRED = [
  { file: "favicon.ico", inHtml: [new RegExp(`rel=["']icon["'][^>]*href=["']/favicon\\.ico${Q}["']`, "i")] },
  { file: "favicon-16.png", inHtml: [new RegExp(`href=["']/favicon-16\\.png${Q}["']`, "i")] },
  { file: "favicon-32.png", inHtml: [new RegExp(`href=["']/favicon-32\\.png${Q}["']`, "i")] },
  { file: "favicon.png", inHtml: [new RegExp(`href=["']/favicon\\.png${Q}["']`, "i")] },
  { file: "apple-touch-icon.png", inHtml: [new RegExp(`rel=["']apple-touch-icon["'][^>]*href=["']/apple-touch-icon\\.png${Q}["']`, "i")] },
  { file: "site.webmanifest", inHtml: [new RegExp(`rel=["']manifest["'][^>]*href=["']/site\\.webmanifest${Q}["']`, "i")] },
  { file: "icon-192.png", inHtml: [new RegExp(`["']/icon-192\\.png${Q}["']`)], allowManifest: true },
  { file: "icon-512.png", inHtml: [new RegExp(`["']/icon-512\\.png${Q}["']`)], allowManifest: true },
];

// Required <meta>/<link> tags in head (regex must match in index.html)
const REQUIRED_META = [
  { name: "theme-color", pattern: /<meta\s+name=["']theme-color["'][^>]*content=["'][^"']+["']/i },
  { name: "apple-mobile-web-app-capable", pattern: /<meta\s+name=["']apple-mobile-web-app-capable["']/i },
  { name: "apple-mobile-web-app-title", pattern: /<meta\s+name=["']apple-mobile-web-app-title["']/i },
  { name: "msapplication-TileColor", pattern: /<meta\s+name=["']msapplication-TileColor["']/i },
  { name: "manifest link", pattern: /<link\s+rel=["']manifest["']/i },
  { name: "mask-icon", pattern: /<link\s+rel=["']mask-icon["']/i },
];

// Manifest validation
const REQUIRED_MANIFEST_ICONS = ["/favicon-32.png", "/icon-192.png", "/icon-512.png", "/apple-touch-icon.png"];

function fail(errors) {
  console.error("\n✗ Favicon verification FAILED:");
  errors.forEach((e) => console.error("  • " + e));
  console.error("");
  process.exit(1);
}

function main() {
  const errors = [];

  if (!existsSync(HTML)) {
    fail(["index.html not found at " + HTML]);
  }
  const html = readFileSync(HTML, "utf8");
  const manifestPath = resolve(PUBLIC, "site.webmanifest");
  let manifestRaw = "";
  if (existsSync(manifestPath)) manifestRaw = readFileSync(manifestPath, "utf8");

  // 1. Each required asset must exist on disk AND be referenced in index.html
  for (const { file, inHtml, allowManifest } of REQUIRED) {
    const filePath = resolve(PUBLIC, file);
    if (!existsSync(filePath)) {
      errors.push(`Missing asset: public/${file}`);
      continue;
    }
    if (statSync(filePath).size < 100) {
      errors.push(`Asset is suspiciously small (<100 bytes): public/${file}`);
    }
    const inHead = inHtml.some((p) => p.test(html));
    const inManifest = allowManifest && manifestRaw.includes(`/${file}`);
    const referenced = inHead || inManifest;
    if (!referenced) {
      errors.push(
        `Asset public/${file} exists but is NOT referenced in index.html${allowManifest ? " or site.webmanifest" : ""}`
      );
    }
  }

  // 2. Required meta/link tags
  for (const { name, pattern } of REQUIRED_META) {
    if (!pattern.test(html)) {
      errors.push(`Missing required <meta>/<link>: ${name}`);
    }
  }

  // 3. Validate site.webmanifest contents
  if (existsSync(manifestPath)) {
    try {
      const manifest = JSON.parse(manifestRaw);
      if (!manifest.name) errors.push("site.webmanifest missing 'name'");
      if (!manifest.theme_color) errors.push("site.webmanifest missing 'theme_color'");
      if (!manifest.icons || manifest.icons.length === 0) {
        errors.push("site.webmanifest has no icons");
      } else {
        const srcs = manifest.icons.map((i) => i.src.split("?")[0]);
        for (const required of REQUIRED_MANIFEST_ICONS) {
          if (!srcs.includes(required)) {
            errors.push(`site.webmanifest missing icon reference: ${required}`);
          }
        }
        const hasMaskable = manifest.icons.some((i) => i.purpose && i.purpose.includes("maskable"));
        if (!hasMaskable) errors.push("site.webmanifest missing a 'maskable' icon (needed for Android adaptive icons)");
      }
    } catch (e) {
      errors.push(`site.webmanifest is invalid JSON: ${e.message}`);
    }
  }

  if (errors.length) fail(errors);

  console.log(`✓ Favicon verification passed (${REQUIRED.length} assets, ${REQUIRED_META.length} meta tags, manifest OK)`);
}

main();