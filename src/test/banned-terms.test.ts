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
 * Highlander Building Services, Inc. · 40 Depot Street, Franklin, NC 28734 · 828-524-7773.
 * Any stale Franklin street address is a local-SEO citation mismatch.
 */
describe("NAP consistency", () => {
  const files = walk("src").filter(
    (f) => /\.(ts|tsx)$/.test(f) && !ALLOW_FILES.some((a) => f.endsWith(a)),
  );
  const STALE = [
    /1511 Highlands (Road|Rd)/i,
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
    // 7 Sep 2026 work order, rule 1: the former name may appear ONLY in the one
    // deliberate "formerly" footer line — never in titles or meta copy.
    // 15 Sep 2026 SEO audit (Critical A): schema.org alternateName (allowed
    // place a) is the one structured exception, fed from BUSINESS.alternateNames.
    /formerly /i,
    /\balternateNames?\b/, // allowed place (a): BUSINESS.alternateNames + its JSON-LD copy
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

  it('uses "Highlander Roofing" only in the "formerly" footer line and external profile URLs', () => {
    const hits: string[] = [];
    for (const f of files) {
      // Published customer reviews are quoted VERBATIM. Several name the former
      // trading name because that is what the customer wrote; editing them would
      // falsify a real review. The exemption is deliberately narrow — only a
      // review body line (`text: "..."`), not metadata or headings in that file.
      const verbatimQuote = /src[\\/]data[\\/]reviews\.ts$/.test(f) ? /^\s*text:\s*"/ : null;
      readFileSync(f, "utf8")
        .split("\n")
        .forEach((line, i) => {
          if (verbatimQuote?.test(line)) return;
          if (!OLD_NAME.test(line)) return;
          if (ALLOWED_LINE.some((re) => re.test(line))) return;
          hits.push(`${f}:${i + 1}: ${line.trim().slice(0, 140)}`);
        });
    }
    expect(hits).toEqual([]);
  });

  it("former name is published ONLY as schema alternateName (15 Sep 2026 SEO audit, Critical A)", () => {
    // 7 Sep 2026 work order, rule 1 kept the former name out of metadata. The
    // 15 Sep 2026 SEO audit found the entity split across the two names
    // (every external profile and 119 of 122 brand clicks use the old one), so
    // alternateName is now the single structured place it is allowed. Brand
    // name, titles and meta copy still use the new name only.
    const src = readFileSync("src/data/business.ts", "utf8");
    expect(src).toMatch(/alternateNames:\s*\["Highlander Roofing Services"/);
    expect(src).toMatch(/brandName:\s*"Highlander Building Services"/);
    const html = readFileSync("index.html", "utf8");
    expect(html).toMatch(/"alternateName": \[ "Highlander Roofing Services"/);
    // Never in the <title> or the meta description.
    expect(html.match(/<title>[^<]*<\/title>/)?.[0] ?? "").not.toMatch(OLD_NAME);
    expect(html.match(/<meta name="description"[^>]*>/)?.[0] ?? "").not.toMatch(OLD_NAME);
  });
});
