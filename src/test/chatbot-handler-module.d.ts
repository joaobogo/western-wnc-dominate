// The chatbot edge function runs on Deno; tests import its pure, dependency-injected
// handler through the "@chatbot-handler" vitest alias.
declare module "@chatbot-handler" {
  const mod: Record<string, any>;
  export = mod;
}
