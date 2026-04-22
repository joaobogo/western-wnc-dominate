import { readFileSync, existsSync, statSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const PUBLIC = resolve(ROOT, "public");
const HTML = resolve(ROOT, "index.html");

// Required favicon assets: { file in /public, must also be referenced in index.html via one of these patterns }
const REQUIRED = [
  { file: "favicon.ico", patterns: [/rel=["']icon["'][^>]*href=["']\/favicon\.ico["']/i] },
  { file: "favicon-16.png", patterns: [/href=["']\/favicon-16\.png["']/i] },
  { file: "favicon-32.png", patterns: [/href=["']\/favicon-32\.png["']/i] },
  { file: "favicon.png", patterns: [/href=["']\/favicon\.png["']/i] },
  { file: "apple-touch-icon.png", patterns: [/rel=["']apple-touch-icon["'][^>]*href=["']\/apple-touch-icon\.png["']/i] },
  { file: "icon-192.png", patterns: [/["']\/icon-192\.png["']/] },
  { file: "icon-512.png", patterns: [/["']\/icon-512\.png["']/] },
  { file: "site.webmanifest", patterns: [/rel=["']manifest["'][^>]*href=["']\/site\.webmanifest["']/i] },
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

  // 1. Each required asset must exist on disk AND be referenced in index.html
  for (const { file, patterns } of REQUIRED) {
    const filePath = resolve(PUBLIC, file);
    if (!existsSync(filePath)) {
      errors.push(`Missing asset: public/${file}`);
      continue;
    }
    if (statSync(filePath).size < 100) {
      errors.push(`Asset is suspiciously small (<100 bytes): public/${file}`);
    }
    const referenced = patterns.some((p) => p.test(html));
    if (!referenced) {
      errors.push(`Asset public/${file} exists but is NOT referenced in index.html`);
    }
  }

  // 2. Required meta/link tags
  for (const { name, pattern } of REQUIRED_META) {
    if (!pattern.test(html)) {
      errors.push(`Missing required <meta>/<link>: ${name}`);
    }
  }

  // 3. Validate site.webmanifest contents
  const manifestPath = resolve(PUBLIC, "site.webmanifest");
  if (existsSync(manifestPath)) {
    try {
      const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
      if (!manifest.name) errors.push("site.webmanifest missing 'name'");
      if (!manifest.theme_color) errors.push("site.webmanifest missing 'theme_color'");
      if (!manifest.icons || manifest.icons.length === 0) {
        errors.push("site.webmanifest has no icons");
      } else {
        const srcs = manifest.icons.map((i) => i.src);
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