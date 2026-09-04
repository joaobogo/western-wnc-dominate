import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "./src") },
      // Lets tests import pure helpers out of Deno edge functions, whatever
      // version the function pins in its `npm:` specifier.
      { find: /^npm:@supabase\/supabase-js(@.*)?$/, replacement: "@supabase/supabase-js" },
      { find: /^npm:(.*?)(@\d[^/]*)?$/, replacement: "$1" },
      {
        find: "@jobtread-sync",
        replacement: path.resolve(__dirname, "./supabase/functions/jobtread-sync/index.ts"),
      },
      {
        find: "@chatbot-handler",
        replacement: path.resolve(__dirname, "./supabase/functions/chatbot/handler.ts"),
      },
      // Shared Netlify _redirects engine used by scripts/redirect-check.mjs and
      // the legacy-URL resolution check in scripts/seo-regression-check.mjs.
      {
        find: "@redirect-rules",
        replacement: path.resolve(__dirname, "./scripts/lib/redirect-rules.mjs"),
      },
    ],
  },

});
