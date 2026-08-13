import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

/**
 * Brand voice guardrail: banned terms must not appear in user-facing content.
 * Code comments are excluded — only rendered strings matter.
 */
const BANNED = [
  /architectural shingle/i,
  /\barchitecture\b/i,
  /\barchitectural\b/i,
  /24\/7/,
  /\bGAF\b/,
  /free estimate/i,
  /book now/i,
  /dream home/i,
  /top[- ]rated/i,
];

// Guard tests that assert the ABSENCE of these terms necessarily contain them.
const ALLOW_FILES = ["banned-terms.test.ts", "chatbot-handler.test.ts"];

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : p;
  });

const stripComments = (src: string) =>
  src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .split("\n")
    .filter((l) => !l.trim().startsWith("//") && !l.trim().startsWith("*"))
    .join("\n");

describe("banned terms", () => {
  const files = walk("src").filter(
    (f) => /\.(ts|tsx)$/.test(f) && !ALLOW_FILES.some((a) => f.endsWith(a)),
  );

  it("scans a meaningful number of source files", () => {
    expect(files.length).toBeGreaterThan(50);
  });

  for (const pattern of BANNED) {
    it(`has no user-facing use of ${pattern}`, () => {
      const hits: string[] = [];
      for (const f of files) {
        const src = stripComments(readFileSync(f, "utf8"));
        src.split("\n").forEach((line, i) => {
          if (pattern.test(line)) hits.push(`${f}:${i + 1}: ${line.trim().slice(0, 120)}`);
        });
      }
      expect(hits).toEqual([]);
    });
  }
});

/**
 * NAP guardrail: the canonical address is
 * Highlander Building Services, Inc. · 76 Creative Dr, Franklin, NC 28734 · 828-524-7773.
 * Any stale Franklin street address is a local-SEO citation mismatch.
 */
describe("NAP consistency", () => {
  const files = walk("src").filter(
    (f) => /\.(ts|tsx)$/.test(f) && !ALLOW_FILES.some((a) => f.endsWith(a)),
  );
  const STALE = [
    /1511 Highlands (Road|Rd)/i,
    /828-397-9211/,
    /\(828\)\s*397-9211/,
    // Legacy company names — the brand is "Highlander Building Services".
    /Highlander Roofing/i,
    /Highlander Construction/i,
  ];

  for (const pattern of STALE) {
    it(`has no stale NAP value matching ${pattern}`, () => {
      const hits: string[] = [];
      for (const f of files) {
        readFileSync(f, "utf8")
          .split("\n")
          .forEach((line, i) => {
            if (pattern.test(line)) hits.push(`${f}:${i + 1}: ${line.trim().slice(0, 120)}`);
          });
      }
      expect(hits).toEqual([]);
    });
  }
});
