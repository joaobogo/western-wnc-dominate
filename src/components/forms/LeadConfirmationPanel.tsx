import { PHONE_DISPLAY, PHONE_TEL } from "@/data/business";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Phone, ArrowRight, Clock, Shield } from "lucide-react";
import { pickGuideLink, pickProjectLinks, type LeadCategory } from "@/lib/confirmation-links";
import { trackPhoneClick } from "@/lib/gtm";

export interface SubmittedSummaryItem {
  label: string;
  value?: string | null;
}

/**
 * Post-submit confirmation that keeps selling:
 * recap of what was submitted, the concrete next step, the phone number,
 * one relevant project story and one relevant local guide.
 *
 * Conversion tracking (generate_lead) is fired by the form on success —
 * this panel is presentational only.
 */
const LeadConfirmationPanel = ({
  heading = "Your request is in.",
  summary = [],
  town,
  category = "general",
  tone = "light",
  className = "",
}: {
  heading?: string;
  summary?: SubmittedSummaryItem[];
  town?: string | null;
  category?: LeadCategory;
  tone?: "light" | "dark";
  className?: string;
}) => {
  const projects = pickProjectLinks({ town, category, count: 2 });
  const guide = pickGuideLink({ town });
  const items = summary.filter((s) => s.value && String(s.value).trim().length > 0);

  // Signal the confirmation state so recovery prompts stay away.
  useEffect(() => {
    document.body.dataset.leadConfirmed = "true";
    try { sessionStorage.setItem("hl_lead_submitted", "1"); } catch { /* ignore */ }
    return () => { delete document.body.dataset.leadConfirmed; };
  }, []);

  const dark = tone === "dark";
  const text = dark ? "text-dark-section-foreground" : "text-foreground";
  const muted = dark ? "text-dark-section-foreground" : "text-muted-foreground";
  const card = dark
    ? "border-white/12 bg-white/[0.04]"
    : "border-border bg-muted/30";
  const gold = "text-[hsl(var(--gold-ink))]";

  return (
    <div className={`mx-auto w-full max-w-xl text-left ${className}`}>
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--highland-gold)/0.12)]">
          <CheckCircle className={`h-6 w-6 ${gold}`} aria-hidden="true" />
        </span>
        <h2 className={`font-heading text-2xl font-bold md:text-3xl ${text}`}>{heading}</h2>
      </div>

      {items.length > 0 && (
        <div className={`mb-5 border ${card} p-5`}>
          <p className={`mb-3 font-body text-body-xs font-bold uppercase tracking-[0.18em] ${gold}`}>
            What you sent us
          </p>
          <dl className="space-y-2">
            {items.map((item) => (
              <div key={item.label} className="flex flex-wrap gap-x-2 text-body-sm font-body">
                <dt className={`${muted}`}>{item.label}:</dt>
                <dd className={`font-semibold ${text}`}>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <div className={`mb-5 border ${card} p-5`}>
        <p className={`mb-3 font-body text-body-xs font-bold uppercase tracking-[0.18em] ${gold}`}>
          Next step
        </p>
        <p className={`font-body text-body-sm leading-relaxed ${text}`}>
          A Highlander team member reviews your request and contacts you during staffed business
          hours to discuss the property, the scope, and the appropriate next step. Your request does
          not reserve an appointment or authorize work.
        </p>
        <div className={`mt-4 flex flex-col gap-2 font-body text-body-xs ${muted}`}>
          <span className="flex items-center gap-2">
            <Clock className={`h-4 w-4 shrink-0 ${gold}`} aria-hidden="true" />
            Follow-up during staffed business hours
          </span>
          <span className="flex items-center gap-2">
            <Shield className={`h-4 w-4 shrink-0 ${gold}`} aria-hidden="true" />
            Appointment timing is confirmed separately
          </span>
        </div>
        <a
          href={PHONE_TEL}
          onClick={() =>
            trackPhoneClick({
              phone_number: "+18285247773",
              link_url: PHONE_TEL,
              click_location: "confirmation_panel",
            })
          }
          className="mt-5 inline-flex items-center gap-2 border border-[hsl(var(--highland-gold)/0.5)] px-5 py-3 font-body text-body-sm font-bold text-[hsl(var(--gold-ink))] transition-colors hover:bg-[hsl(var(--highland-gold)/0.1)]"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Rather talk now? {PHONE_DISPLAY}
        </a>
      </div>

      <p className={`mb-3 font-body text-body-xs font-bold uppercase tracking-[0.18em] ${gold}`}>
        Work we've done nearby
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {projects.map((project) => (
          <Link
            key={project.path}
            to={project.path}
            className={`group border ${card} p-5 transition-colors hover:border-[hsl(var(--highland-gold)/0.5)]`}
          >
            <span className={`block font-heading text-body-sm font-bold leading-snug ${text}`}>
              {project.label}
            </span>
            <span className={`mt-1 block font-body text-body-xs ${muted}`}>{project.description}</span>
            <span className={`mt-3 inline-flex items-center gap-1 font-body text-body-xs font-bold ${gold}`}>
              View project <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>

      <Link
        to={guide.path}
        className={`mt-4 inline-flex items-center gap-1 font-body text-body-xs font-bold ${gold} hover:opacity-85`}
      >
        While you wait: {guide.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
};

export default LeadConfirmationPanel;
