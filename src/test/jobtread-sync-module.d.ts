// The jobtread-sync edge function runs on Deno; tests import its pure helpers
// through the "@jobtread-sync" vitest alias so the Deno globals never enter the
// browser TypeScript program.
declare module "@jobtread-sync" {
  const mod: Record<string, any>;
  export = mod;
}
