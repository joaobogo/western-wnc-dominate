import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { execSync } from "node:child_process";
import { imagetools } from "vite-imagetools";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/supabase/vite";

function sitemapPlugin() {
  return {
    name: "highlander-sitemap",
    buildStart() {
      try {
        execSync("bun scripts/generate-sitemap.ts", { stdio: "inherit" });
      } catch (e) {
        console.warn("[sitemap] generation skipped:", (e as Error).message);
      }
    },
  };
}

function blogSummariesPlugin() {
  return {
    name: "highlander-blog-summaries",
    buildStart() {
      try {
        execSync("node scripts/generate-blog-summaries.mjs", { stdio: "inherit" });
      } catch (e) {
        console.warn("[blog-summaries] generation skipped:", (e as Error).message);
      }
    },
  };
}

function faviconVerifyPlugin() {
  return {
    name: "highlander-favicon-verify",
    buildStart() {
      try {
        execSync("node scripts/verify-favicons.mjs", { stdio: "inherit" });
      } catch (e) {
        // Fail the build — favicon drift is a real bug we want to surface
        throw new Error("Favicon verification failed. See logs above.");
      }
    },
  };
}

// Stamps public/build-info.json with the commit being built, so the deployed
// site can be compared against GitHub by the deploy-drift-check function.
function buildInfoPlugin() {
  return {
    name: "highlander-build-info",
    buildStart() {
      try {
        execSync("node scripts/generate-build-info.mjs", { stdio: "inherit" });
      } catch (e) {
        console.warn("[build-info] generation skipped:", (e as Error).message);
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), imagetools(), sitemapPlugin(), blogSummariesPlugin(), faviconVerifyPlugin(), buildInfoPlugin(), mcpPlugin(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // P5.1 — the HTML entry (src/main.tsx, ~8 KB) must be the only script the
    // browser fetches before first paint. Vite otherwise emits a
    // <link rel="modulepreload"> for every chunk in the entry's static graph,
    // which after chunk merging meant ~1 MB of vendors, page chunks and data
    // downloading alongside the render-blocking CSS and the LCP image.
    // Dynamic imports still preload their own dependencies when they run.
    modulePreload: {
      resolveDependencies: (_filename, deps, { hostType }) => (hostType === "html" ? [] : deps),
    },
    // Split heavy vendors so the main app chunk stays small and cacheable
    // across deploys. Route chunks (already lazy) then only carry app code.
    rollupOptions: {
      output: {
        // Merge sub-12 KB chunks. Service pages were pulling 60+ JS files;
        // request overhead on throttled mobile cost more than the bytes.
        experimentalMinChunkSize: 12000,
        manualChunks(id) {
          const p = id.split("\\").join("/");
          if (p.includes("/node_modules/")) {
            if (/\/node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//.test(p)) return "react-vendor";
            if (p.includes("/node_modules/framer-motion/")) return "motion-vendor";
            if (p.includes("/node_modules/@tanstack/react-query")) return "query-vendor";
            if (/\/node_modules\/(react-hook-form|@hookform\/resolvers|zod)\//.test(p)) return "form-vendor";
            // One icon chunk instead of ~300 single-icon files. Hundreds of
            // tiny requests starve the connection on throttled mobile and push
            // first paint out by seconds (CRO Prompt 40).
            if (p.includes("/node_modules/lucide-react/")) return "icons-vendor";
            if (p.includes("/node_modules/@supabase/")) return "supabase-vendor";
            return undefined;
          }
          // P5.1 — keep the big content tables out of chunks the eager App
          // graph needs. App → RecoveryPrompt → lead-validation imports towns.ts;
          // Rollup was merging towns with the 300 KB service×town content into
          // one shared chunk, so every page downloaded it up front.
          if (/\/src\/data\/(service-town-content|service-town-generated|service-town-slugs|town-faqs-generated)\.ts$/.test(p)) return "service-town-data";
          if (/\/src\/data\/blogs(-[a-z-]+)?\.ts$/.test(p)) return "blogs-data";
          if (/\/src\/data\/(towns|counties|business)\.ts$/.test(p)) return "towns-data";
          return undefined;
        },
      },
    },
    chunkSizeWarningLimit: 900,
  },
}));
