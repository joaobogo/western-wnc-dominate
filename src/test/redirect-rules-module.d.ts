// scripts/lib/redirect-rules.mjs is plain ESM used by the build scripts; tests
// import it through the "@redirect-rules" vitest alias so the browser TypeScript
// program never has to type-check the scripts folder.
declare module "@redirect-rules" {
  export const CANONICAL_HOST: string;
  export function normalizePath(p: string): string;
  export function parseRequest(input: string): { scheme: string; host: string; path: string };
  export function compilePattern(pattern: string): (path: string) => { params: Record<string, string>; splat: string } | null;
  export function parseRedirectRules(text: string): any[];
  export function loadRedirectRules(file?: string): any[];
  export function expandDestination(to: string, params?: Record<string, string>, splat?: string): string;
  export function applyRule(rules: any[], input: string | { scheme?: string; host?: string; path: string }): { rule: any; to: string } | null;
  export function resolveUrl(rules: any[], input: string, opts?: { isLive?: (p: string) => boolean; maxHops?: number }): any;
  export function isAppOnly(p: string): boolean;
  export function loadSiteInventory(root?: string): { sitemap: Set<string>; routes: Set<string>; isLive: (p: string) => boolean };
  export function loadTownSlugs(root?: string): string[];
  export function loadIndexablePairs(root?: string): Set<string>;
  export function findTown(tokens: string[], townSlugs: string[]): string | null;
  export function closestBlogPost(tokens: string[], blogSlugs: string[], townSlugs: string[]): string | null;
  export function suggestDestination(path: string, ctx: any): { to: string; status: number; reason: string } | null;
  export function classify(res: any, ctx: any): any;
  export function loadFixture(file: string): string[];
  export function runLegacyUrlCheck(opts?: { root?: string; fixturePath?: string; redirectsPath?: string }): {
    rows: any[];
    counts: Record<string, number>;
    nonOk: any[];
    text: string;
  };
}
