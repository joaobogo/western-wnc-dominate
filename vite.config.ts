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
    // Split heavy vendors so the main app chunk stays small and cacheable
    // across deploys. Route chunks (already lazy) then only carry app code.
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "motion-vendor": ["framer-motion"],
          "query-vendor": ["@tanstack/react-query"],
          "form-vendor": ["react-hook-form", "@hookform/resolvers", "zod"],
          // One icon chunk instead of ~300 single-icon files. Hundreds of
          // tiny requests starve the connection on throttled mobile and push
          // first paint out by seconds (CRO Prompt 40).
          "icons-vendor": ["lucide-react"],
          "supabase-vendor": ["@supabase/supabase-js"],
        },
      },
    },
    chunkSizeWarningLimit: 900,
  },
}));
