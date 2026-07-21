import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { execSync } from "node:child_process";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/supabase/vite";

function sitemapPlugin() {
  return {
    name: "highlander-sitemap",
    buildStart() {
      try {
        execSync("node scripts/generate-sitemap.mjs", { stdio: "inherit" });
      } catch (e) {
        console.warn("[sitemap] generation skipped:", (e as Error).message);
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

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), sitemapPlugin(), faviconVerifyPlugin(), mcpPlugin(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
