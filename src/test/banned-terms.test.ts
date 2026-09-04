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
const ALLOW_FILES = ["banned-terms.test.ts", "chatbot-handler.test.ts", "data/business.ts"];

// Paths are compared with forward slashes so the allow-list works on Windows too.
const posix = (p: string) => p.replace(/\\/g, "/");

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : posix(p);
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
 * Highlander Building Services, Inc. · 1511 Highlands Road, Franklin, NC 28734 · 828-524-7773.
 * Any stale Franklin street address is a local-SEO citation mismatch.
 */
describe("NAP consistency", () => {
  const files = walk("src").filter(
    (f) => /\.(ts|tsx)$/.test(f) && !ALLOW_FILES.some((a) => f.endsWith(a)),
  );
  const STALE = [
    /76 Creative (Dr|Drive)/i,
    /828-397-9211/,
    /\(828\)\s*397-9211/,
    /Highlander Construction/,
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

/**
 * Rebrand guard: the company is "Highlander Building Services, Inc.". The old
 * name "Highlander Roofing Services" may appear in exactly three places:
 *   (a) BUSINESS.alternateNames in src/data/business.ts (tells Google old and
 *       new names are one entity) — and its generated copies: the
 *       `alternateName` array of the Organization JSON-LD in index.html and the
 *       "also known as" / "former name" lines of public/llms.txt;
 *   (b) the single deliberate "formerly Highlander Roofing Services" line
 *       (Footer renders it from BUSINESS.alternateNames[0]);
 *   (c) external profile URLs that still carry the old slug (BUSINESS.profiles,
 *       SocialLinks, the static Organization sameAs) — kept until the platforms
 *       rename them.
 * Anything else — copy, titles, blog authors, scripts, edge functions — fails.
 */
describe("rebrand guard", () => {
  const OLD_NAME = /Highlander Roofing/;
  const ALLOWED_LINE = [
    /alternateNames?\s*[:=]/, // the declaration in business.ts / generated JSON key
    /^\s*"Highlander Roofing Services(?:, Inc\.)?",?\s*$/, // alternateName array items (index.html)
    /also known as|former name|formerly /i, // llms.txt + the one deliberate footer line
    /https?:\/\/[^\s"']*highlander[-_]?roofing/i, // external profile URLs (allowed place c)
    /\/\/|^\s*\*|\/\*/, // code comments
  ];
  const scanRoots = ["src", "scripts", "supabase/functions"];
  const extraFiles = ["index.html", "public/llms.txt"];
  const files = [
    ...scanRoots.flatMap((d) => walk(d)),
    ...extraFiles,
  ].filter(
    (f) =>
      /\.(ts|tsx|mjs|js|html|txt|md)$/.test(f) &&
      !/banned-terms\.test\.ts$/.test(f) &&
      !/\.generated\.ts$/.test(f) &&
      !/supabase\/functions\/mcp\/index\.ts$/.test(f), // bundled copy of business.ts
  );

  it("scans the app, the static head, llms.txt, scripts and edge functions", () => {
    expect(files.length).toBeGreaterThan(60);
    expect(files).toContain("index.html");
    expect(files).toContain("public/llms.txt");
  });

  it('uses "Highlander Roofing" only in alternateNames, the "formerly" line and profile URLs', () => {
    const hits: string[] = [];
    for (const f of files) {
      readFileSync(f, "utf8")
        .split("\n")
        .forEach((line, i) => {
          if (!OLD_NAME.test(line)) return;
          if (ALLOWED_LINE.some((re) => re.test(line))) return;
          hits.push(`${f}:${i + 1}: ${line.trim().slice(0, 140)}`);
        });
    }
    expect(hits).toEqual([]);
  });

  it("business.ts keeps the old name as an alternateName (same-entity signal for Google)", () => {
    const src = readFileSync("src/data/business.ts", "utf8");
    expect(src).toMatch(/alternateNames:\s*\[\s*"Highlander Roofing Services"/);
    expect(src).toMatch(/brandName:\s*"Highlander Building Services"/);
  });
});
