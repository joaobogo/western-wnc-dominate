import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ContactMinimalForm from "@/components/contact/ContactMinimalForm";
import FastLeadForm from "@/components/FastLeadForm";
import { fieldAttrs } from "@/lib/field-ergonomics";

// Website fix instructions, Nov 23, 2026 (Search Console audit).

const formFiles = execSync("grep -rl '<form' src --include=*.tsx", { encoding: "utf8" })
  .split("\n")
  .filter((f) => f && !f.includes("/test/"));

describe("Task 3: every form sends the same field names, safely", () => {
  it("every <form> tag posts (never GET, so contact details can't land in a URL)", () => {
    for (const f of formFiles) {
      const tags = readFileSync(f, "utf8").match(/<form(?=[\s>])[^>]*>/g) ?? [];
      for (const tag of tags) {
        if (tag === "<form>" && f.endsWith("BuilderControls.tsx")) continue; // a code comment, not a form
        expect(tag, f).toMatch(/method="post"/);
      }
    }
  });

  it("phone and email inputs are named phone and email everywhere the shared field settings are used", () => {
    expect(fieldAttrs.phone.name).toBe("phone");
    expect(fieldAttrs.phoneLast.name).toBe("phone");
    expect(fieldAttrs.email.name).toBe("email");
    expect(fieldAttrs.emailLast.name).toBe("email");
  });

  it("every public form that sends a lead carries the website_url honeypot", () => {
    const leadForms = [
      "src/components/InspectionForm.tsx",
      "src/components/FastLeadForm.tsx",
      "src/components/landing/LeadForm.tsx",
      "src/components/contact/ContactMinimalForm.tsx",
      "src/components/recovery/RecoveryPrompt.tsx",
      "src/components/HomepageStickyLeadBar.tsx",
      "src/components/RoofAssessmentQuiz.tsx",
      "src/components/RoofCostEstimator.tsx",
      "src/components/intake/RoofingIntakeForm.tsx",
      "src/components/intake/DesignPlanningIntakeForm.tsx",
      "src/components/intake/ConstructionIntakeForm.tsx",
      "src/pages/RoofingBuilder.tsx",
      "src/pages/ConstructionBuilder.tsx",
      // Follow-up Nov 24: John asked for the trap on the careers application too.
      "src/pages/Careers.tsx",
    ];
    for (const f of leadForms) {
      const s = readFileSync(f, "utf8");
      expect(s, f).toMatch(/<Honeypot\b/);
      // The trap must also stop the submission (landing pages do this inside their form hook).
      expect(s, f).toMatch(/honeypot\.tripped\(\)|form\.honeypot/);
    }
  });

  it.each([
    ["/contact form", () => <ContactMinimalForm />],
    ["3-field form (/lp/gutters, /lp/handyman, /lp/roof-repair …)", () => <FastLeadForm ctaLabel="Send" serviceLabel="Gutters" serviceCategory="gutters" />],
  ])("%s renders first_name, email, phone and the honeypot inside a POST form", (_label, make) => {
    const { container } = render(<MemoryRouter>{make()}</MemoryRouter>);
    const form = container.querySelector("form")!;
    expect(form.getAttribute("method")).toBe("post");
    const names = [...form.querySelectorAll("input")].map((i) => i.getAttribute("name"));
    expect(names).toEqual(expect.arrayContaining(["first_name", "email", "phone", "website_url"]));
    expect(form.querySelector('input[name="phone"]')!.getAttribute("type")).toBe("tel");
  });
});

describe("Follow-up Nov 24: no dead newsletter form", () => {
  it("the blog page has no Subscribe box (it never sent the address anywhere)", () => {
    const blog = readFileSync("src/pages/Blog.tsx", "utf8");
    expect(blog).not.toMatch(/newsletter|Subscribe/i);
  });
});

describe("Task 4: one sitemap address", () => {
  it("robots.txt lists only the main sitemap, and the old addresses redirect to it", () => {
    const robots = readFileSync("public/robots.txt", "utf8");
    expect(robots.match(/^Sitemap:.*$/gm)).toEqual(["Sitemap: https://highlandernc.com/sitemap.xml"]);
    const redirects = readFileSync("public/_redirects", "utf8");
    expect(redirects).toMatch(/^\/sitemap_index\.xml\s+\/sitemap\.xml\s+301!$/m);
    expect(redirects).toMatch(/^\/sitemap-legacy\.xml\s+\/sitemap\.xml\s+301!$/m);
  });
});

describe("Task 2: help Google index the pages it skipped", () => {
  it("every link target and every linking blog post is a live post", async () => {
    const { BLOG_RELATED_GUIDES, SERVICE_RELATED_GUIDES } = await import("@/data/guide-links");
    const { blogPosts } = await import("@/data/blogs");
    const live = new Set(blogPosts.filter((p) => !p.canonicalTo).map((p) => p.slug));
    for (const [source, links] of Object.entries(BLOG_RELATED_GUIDES)) {
      expect(live.has(source), source).toBe(true);
      for (const l of links) expect(live.has(l.href.replace("/blog/", "")), l.href).toBe(true);
    }
    for (const links of Object.values(SERVICE_RELATED_GUIDES)) {
      for (const l of links) {
        expect(live.has(l.href.replace("/blog/", "")), l.href).toBe(true);
        expect(l.anchor).not.toMatch(/click here|learn more|read more/i);
      }
    }
  });

  it("the roofing pages render their related guides", () => {
    for (const [file, path] of [["MetalRoofing", "/roofing/metal"], ["StormDamage", "/roofing/storm-damage"], ["RoofRepair", "/roofing/roof-repair"], ["SpecialtyRoofing", "/roofing/specialty"], ["RoofReplacement", "/roofing/roof-replacement"]]) {
      expect(readFileSync(`src/pages/${file}.tsx`, "utf8"), file).toContain(`<RelatedGuides links={SERVICE_RELATED_GUIDES["${path}"]} />`);
    }
  });

  it("services hub, handyman and hardscape are linked from the homepage strip, footer, hub and /services", async () => {
    const { MOST_REQUESTED_LINKS } = await import("@/data/most-requested-links");
    expect(MOST_REQUESTED_LINKS.map((l) => l.to)).toContain("/services");
    const footer = readFileSync("src/components/Footer.tsx", "utf8");
    for (const href of ["/services", "/construction/handyman", "/construction/outdoor-living/hardscape"]) expect(footer, href).toContain(`href: "${href}"`);
    const { hubContent } = await import("@/content/construction/hub");
    expect(hubContent.related.map((l) => l.href)).toEqual(expect.arrayContaining(["/construction/handyman", "/construction/outdoor-living/hardscape"]));
    expect(readFileSync("src/data/services-hub.ts", "utf8")).toContain('href: "/construction/outdoor-living/hardscape"');
    const { additionsContent } = await import("@/content/construction/additions");
    expect(additionsContent.angle!.links!.map((l) => l.href)).toContain("/blog/home-addition-permits");
  });

  it("every sitemap URL has a lastmod, and the 11 pages carry the date they were linked", () => {
    const xml = readFileSync("public/sitemap.xml", "utf8");
    const urls = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
    expect(urls.length).toBeGreaterThan(200);
    for (const u of urls) expect(u, u).toMatch(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/);
    for (const p of ["/services", "/construction/handyman", "/blog/storm-chaser-roofing"]) {
      expect(xml).toContain(`<loc>https://highlandernc.com${p}</loc>\n    <lastmod>2026-11-24</lastmod>`);
    }
  });
});
