import { describe, expect, it } from "vitest";
import {
  buildLeadAlertHtml,
  buildLeadAlertSubject,
  leadAlertFields,
  shouldSendLeadAlert,
  LEAD_ALERT_EMAIL_SINCE,
} from "../../supabase/functions/_shared/leadAlertEmail";

const after = new Date(Date.parse(LEAD_ALERT_EMAIL_SINCE) + 60_000).toISOString();
const before = new Date(Date.parse(LEAD_ALERT_EMAIL_SINCE) - 60_000).toISOString();

const webLead = {
  id: "x",
  created_at: after,
  name: "Mary <script>alert(1)</script> Smith",
  phone: "+18285550199",
  email: "mary@example.org",
  property_address: "12 Ridge Rd",
  property_town: "Highlands",
  project_type: "roof_repair",
  page_path: "/contact",
  project_description: 'Leak "here" & <img src=x onerror=1>',
  photos_uploaded: [{ path: "a" }, { path: "b" }],
};

describe("lead alert email builder", () => {
  it("escapes all customer text", () => {
    const html = buildLeadAlertHtml(leadAlertFields("leads", webLead), { kind: "success", jobId: "22PAbc123" });
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("<img src=x");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("&quot;here&quot; &amp;");
  });

  it("formats the website subject as name · town · job type · source", () => {
    expect(buildLeadAlertSubject(leadAlertFields("leads", webLead))).toBe(
      "New lead: Mary <script>alert(1)</script> Smith · Highlands · Roof Repair · /contact",
    );
  });

  it("formats front desk subject with grade and score", () => {
    const f = leadAlertFields("intake_leads", {
      created_at: after, first_name: "Tom", last_name: "Reed", town: "Sylva", job_type: "new_roof",
      source: "Referral", grade: "A", score: 87, taken_by: "Susan", outcome: "booked",
    });
    expect(buildLeadAlertSubject(f)).toBe("Front desk call: Tom Reed · Sylva · New Roof · Referral · A 87/100");
    const html = buildLeadAlertHtml(f, { kind: "success", jobId: "22PJob" });
    expect(html).toContain("Susan");
    expect(html).toContain("87/100");
    expect(html).toContain("Booked");
  });

  it("success header links the JobTread job; exhausted shows the red line", () => {
    const f = leadAlertFields("leads", webLead);
    const ok = buildLeadAlertHtml(f, { kind: "success", jobId: "22PAbc123" });
    expect(ok).toContain("Already in JobTread");
    expect(ok).toContain('href="https://app.jobtread.com/jobs/22PAbc123"');
    expect(ok).not.toContain("NOT in JobTread");
    const bad = buildLeadAlertHtml(f, { kind: "exhausted" });
    expect(bad).toContain("NOT in JobTread — please call this person and enter them by hand.");
    expect(bad).not.toContain("app.jobtread.com");
  });

  it("rejects a malformed job id instead of building a link from it", () => {
    const html = buildLeadAlertHtml(leadAlertFields("leads", webLead), { kind: "success", jobId: '"><script>' });
    expect(html).not.toContain("app.jobtread.com");
  });

  it("has tel and mailto links and the footer", () => {
    const html = buildLeadAlertHtml(leadAlertFields("leads", webLead), { kind: "success" });
    expect(html).toContain('href="tel:+18285550199"');
    expect(html).toContain('href="mailto:mary@example.org"');
    expect(html).toContain("Sent automatically by highlandernc.com");
  });
});

describe("who gets an alert", () => {
  it("skips test leads", () => {
    expect(shouldSendLeadAlert({ created_at: after }, "success", true)).toBe(false);
  });
  it("skips leads created before the feature went live", () => {
    expect(shouldSendLeadAlert({ created_at: before }, "success", false)).toBe(false);
  });
  it("sends at most one success and one exhausted email per lead", () => {
    expect(shouldSendLeadAlert({ created_at: after }, "success", false)).toBe(true);
    expect(shouldSendLeadAlert({ created_at: after, alert_email_sent_at: after }, "success", false)).toBe(false);
    expect(shouldSendLeadAlert({ created_at: after, alert_email_sent_at: after }, "exhausted", false)).toBe(true);
    expect(shouldSendLeadAlert({ created_at: after, alert_email_exhausted_at: after }, "exhausted", false)).toBe(false);
  });
});
