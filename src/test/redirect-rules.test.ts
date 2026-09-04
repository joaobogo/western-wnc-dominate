import { describe, it, expect } from "vitest";
import {
  parseRedirectRules,
  applyRule,
  resolveUrl,
  classify,
  suggestDestination,
  loadIndexablePairs,
  loadTownSlugs,
  runLegacyUrlCheck,
} from "@redirect-rules";
import { indexableServiceTownPairs } from "@/data/service-town-content";
import { towns } from "@/data/towns";

const RULES = parseRedirectRules(`
http://highlandernc.com/*        https://highlandernc.com/:splat      301!
https://www.highlandernc.com/*   https://highlandernc.com/:splat      301!
# comment
/exact                    /roofing                        301!
/old-cedar                /roofing/specialty              301!
/chain-start              /chain-middle                   301!
/chain-middle             /roofing                        301!
/loop-a                   /loop-b                         301!
/loop-b                   /loop-a                         301!
/gone                     /404.html                       410
/shadowed                 /roofing                        301
/contact/service-area/franklin-nc   /service-areas/franklin-nc   301!
/contact/:segment         /service-areas                  301!
/contact/:segment/*       /service-areas                  301!
/news/*                   /blog/:splat                    301!
/to-hub                   /service-areas                  301!
/to-dead                  /does-not-exist                 301!
/front-desk/*             /index.html                     200
`);

const LIVE = new Set(["/", "/roofing", "/roofing/specialty", "/roofing/gutters", "/service-areas", "/service-areas/franklin-nc", "/service-areas/cashiers-nc", "/service-areas/franklin-nc/metal-roofing", "/blog/2024/story", "/shadowed", "/roofing/metal", "/blog/metal-roofing-western-nc-mountain-home"]);
const isLive = (p: string) => LIVE.has(p);

describe("parseRedirectRules", () => {
  it("parses status, force flag, host rules and skips comments", () => {
    expect(RULES.filter((r) => !r.malformed)).toHaveLength(17);
    const host = RULES[0];
    expect(host.scheme).toBe("http");
    expect(host.host).toBe("highlandernc.com");
    expect(host.status).toBe(301);
    expect(host.force).toBe(true);
    const gone = RULES.find((r) => r.from === "/gone")!;
    expect(gone.status).toBe(410);
    expect(gone.force).toBe(false);
    const rewrite = RULES.find((r) => r.from === "/front-desk/*")!;
    expect(rewrite.status).toBe(200);
  });

  it("flags malformed lines instead of throwing", () => {
    const rules = parseRedirectRules("/only-one-token\n/a /b 301!");
    expect(rules[0].malformed).toBe(true);
    expect(rules[1].malformed).toBeUndefined();
  });
});

describe("applyRule — Netlify matching semantics", () => {
  it("first matching rule wins (exact before placeholder)", () => {
    expect(applyRule(RULES, "/contact/service-area/franklin-nc")!.to).toBe("/service-areas/franklin-nc");
    expect(applyRule(RULES, "/contact/anything")!.to).toBe("/service-areas");
  });

  it("supports a placeholder followed by a splat", () => {
    const hit = applyRule(RULES, "/contact/seamless-gutters-service-area/cashiers-nc")!;
    expect(hit.rule.from).toBe("/contact/:segment/*");
    expect(hit.to).toBe("/service-areas");
  });

  it("expands :splat and matches the splat base path", () => {
    expect(applyRule(RULES, "/news/2024/story")!.to).toBe("/blog/2024/story");
    expect(applyRule(RULES, "/news")!.to).toBe("/blog/");
  });

  it("ignores trailing slashes and query strings, but is case-sensitive", () => {
    expect(applyRule(RULES, "/exact/")!.to).toBe("/roofing");
    expect(applyRule(RULES, "/exact?utm=1")!.to).toBe("/roofing");
    expect(applyRule(RULES, "/Exact")).toBeNull();
  });

  it("only applies host rules to a request on that exact scheme + host", () => {
    expect(applyRule(RULES, "/exact")!.rule.from).toBe("/exact"); // bare path skips host rules
    expect(applyRule(RULES, "https://www.highlandernc.com/exact")!.to).toBe("https://highlandernc.com/exact");
    expect(applyRule(RULES, "https://highlandernc.com/exact")!.to).toBe("/roofing");
  });
});

describe("resolveUrl — hops, chains, loops, shadowing", () => {
  it("counts the canonical-host hop separately from the path hop", () => {
    const res = resolveUrl(RULES, "https://www.highlandernc.com/exact", { isLive });
    expect(res.terminal).toBe("live");
    expect(res.final.path).toBe("/roofing");
    expect(res.hops.map((h: any) => h.hostOnly)).toEqual([true, false]);
    expect(res.matchedRule.from).toBe("/exact");
  });

  it("detects a redirect to a redirect", () => {
    const res = resolveUrl(RULES, "https://highlandernc.com/chain-start", { isLive });
    expect(res.hops).toHaveLength(2);
    expect(res.terminal).toBe("live");
  });

  it("detects loops without hanging", () => {
    expect(resolveUrl(RULES, "https://highlandernc.com/loop-a", { isLive }).terminal).toBe("loop");
  });

  it("lets an existing file shadow a non-forced rule", () => {
    const res = resolveUrl(RULES, "https://highlandernc.com/shadowed", { isLive });
    expect(res.terminal).toBe("live");
    expect(res.hops).toHaveLength(0);
  });

  it("reports 410 rules as gone and 200 rules as rewrites", () => {
    expect(resolveUrl(RULES, "https://highlandernc.com/gone", { isLive }).terminal).toBe("gone");
    expect(resolveUrl(RULES, "https://highlandernc.com/front-desk/x", { isLive }).terminal).toBe("rewrite");
  });

  it("answers 404 when nothing matches and nothing is served", () => {
    expect(resolveUrl(RULES, "https://highlandernc.com/nope", { isLive }).terminal).toBe("404");
  });
});

const ctx = {
  isLive,
  noindexPages: new Set<string>(),
  townSlugs: ["franklin-nc", "cashiers-nc", "otto-nc", "lake-glenville-nc", "bryson-city-nc"],
  indexablePairs: new Set(["franklin-nc|metal-roofing"]),
  blogSlugs: ["metal-roofing-western-nc-mountain-home", "gutter-guards-worth-it"],
};

describe("classify", () => {
  const cat = (url: string) => classify(resolveUrl(RULES, url, { isLive }), ctx).category;
  it("OK — single 301 to a live page", () => expect(cat("https://highlandernc.com/old-cedar")).toBe("OK"));
  it("OK — www URL: host hop + one path hop", () => expect(cat("https://www.highlandernc.com/old-cedar")).toBe("OK"));
  it("CHAIN — destination is itself redirected", () => expect(cat("https://highlandernc.com/chain-start")).toBe("CHAIN"));
  it("CHAIN — loop", () => expect(cat("https://highlandernc.com/loop-a")).toBe("CHAIN"));
  it("DEAD — no rule and not live", () => expect(cat("https://highlandernc.com/nothing-here")).toBe("DEAD"));
  it("DEAD — redirect target 404s", () => expect(cat("https://highlandernc.com/to-dead")).toBe("DEAD"));
  it("HUB-FALLBACK — /service-areas while the town page exists", () =>
    expect(cat("https://highlandernc.com/contact/seamless-gutters-service-area/cashiers-nc")).toBe("HUB-FALLBACK"));
  it("OK — intentional 410 and app rewrites are not failures", () => {
    expect(cat("https://highlandernc.com/gone")).toBe("OK");
    expect(cat("https://highlandernc.com/front-desk/call-sheet")).toBe("OK");
  });
});

describe("suggestDestination — closest live page by intent", () => {
  const s = (p: string) => suggestDestination(p, ctx);
  it("town + service with an indexable hand-written page → nested page", () =>
    expect(s("/franklin-nc-metal-roofing")!.to).toBe("/service-areas/franklin-nc/metal-roofing"));
  it("town + service without an indexable page → town page", () =>
    expect(s("/contact/seamless-gutters-service-area/cashiers-nc")!.to).toBe("/service-areas/cashiers-nc"));
  it("a 301 that lands on a noindex page is DEAD (equity must go to an indexable page)", () => {
    const rules = parseRedirectRules("/old-otto-repair /service-areas/otto-nc/roof-repair 301!");
    const live = (p: string) => p === "/service-areas/otto-nc/roof-repair";
    const res = resolveUrl(rules, "https://highlandernc.com/old-otto-repair", { isLive: live });
    const cls = classify(res, { ...ctx, isLive: live, noindexPages: new Set(["/service-areas/otto-nc/roof-repair"]) });
    expect(cls.category).toBe("DEAD");
    expect(cls.note).toBe("redirect target is noindex");
  });
  it("service only → division sub-page", () => expect(s("/gutter-guard-installation")!.to).toBe("/roofing/gutters"));
  it("two roofing services → the roofing division page", () => expect(s("/reroofing-repairs-clayton-ga")!.to).toBe("/roofing"));
  it("service-areas hub wording → the hub itself", () => expect(s("/service-locations")!.to).toBe("/service-areas"));
  it("multi-word town slugs are recognised by their distinctive word", () =>
    expect(s("/gallery-metal-roof-glenville-nc")!.to).toBe("/recent-projects"));
  it("WordPress plumbing → 410", () => expect(s("/wp-json/wp/v2/pages/1")).toMatchObject({ status: 410 }));
  it("article-style slug → closest blog post", () =>
    expect(s("/the-benefits-of-metal-roof-installation-for-your-mountain-home")!.to).toBe("/blog/metal-roofing-western-nc-mountain-home"));
});

describe("repo integration", () => {
  it("regex-extracted indexable pairs match the runtime isServiceTownIndexable() rule", () => {
    const runtime = new Set(indexableServiceTownPairs().map((e) => `${e.townSlug}|${e.serviceSlug}`));
    expect([...loadIndexablePairs()].sort()).toEqual([...runtime].sort());
  });

  it("town slugs read from towns.ts match the data module", () => {
    expect(loadTownSlugs().sort()).toEqual(towns.map((t) => t.slug).sort());
  });

  it("every legacy URL in the fixture resolves to one 301 that lands on a live page", () => {
    const report = runLegacyUrlCheck({});
    expect(report.counts.total).toBeGreaterThan(0);
    expect(report.nonOk.map((r) => `${r.category} ${r.path}`)).toEqual([]);
  });
});
