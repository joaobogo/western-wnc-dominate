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
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Lets tests import pure helpers out of Deno edge functions.
      "npm:@supabase/supabase-js@2": "@supabase/supabase-js",
      "@jobtread-sync": path.resolve(__dirname, "./supabase/functions/jobtread-sync/index.ts"),
      "@chatbot-handler": path.resolve(__dirname, "./supabase/functions/chatbot/handler.ts"),
    },
  },
});
