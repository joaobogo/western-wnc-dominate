import { Link } from "react-router-dom";
import { CheckCircle, Phone, ArrowRight, Clock, Shield } from "lucide-react";
import { pickGuideLink, pickProjectLink, type LeadCategory } from "@/lib/confirmation-links";
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
  category = "roofing",
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
  const project = pickProjectLink({ town, category });
  const guide = pickGuideLink({ town });
  const items = summary.filter((s) => s.value && String(s.value).trim().length > 0);

  const dark = tone === "dark";
  const text = dark ? "text-dark-section-foreground" : "text-foreground";
  const muted = dark ? "text-dark-section-foreground/80" : "text-muted-foreground";
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
          <p className={`mb-3 font-body text-[12px] font-bold uppercase tracking-[0.18em] ${gold}`}>
            What you sent us
          </p>
          <dl className="space-y-2">
            {items.map((item) => (
              <div key={item.label} className="flex flex-wrap gap-x-2 text-[15px] font-body">
                <dt className={`${muted}`}>{item.label}:</dt>
                <dd className={`font-semibold ${text}`}>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <div className={`mb-5 border ${card} p-5`}>
        <p className={`mb-3 font-body text-[12px] font-bold uppercase tracking-[0.18em] ${gold}`}>
          Next step
        </p>
        <p className={`font-body text-[15px] leading-relaxed ${text}`}>
          A Highlander project advisor from our Franklin office reviews your details and calls you
          personally, typically within one business day. We'll talk through the property, the scope,
          and what an inspection would look like.
        </p>
        <div className={`mt-4 flex flex-col gap-2 font-body text-[14px] ${muted}`}>
          <span className="flex items-center gap-2">
            <Clock className={`h-4 w-4 shrink-0 ${gold}`} aria-hidden="true" />
            Typically within one business day
          </span>
          <span className="flex items-center gap-2">
            <Shield className={`h-4 w-4 shrink-0 ${gold}`} aria-hidden="true" />
            No obligation, no sales pressure
          </span>
        </div>
        <a
          href="tel:+18285247773"
          onClick={() =>
            trackPhoneClick({
              phone_number: "+18285247773",
              link_url: "tel:+18285247773",
              click_location: "confirmation_panel",
            })
          }
          className="mt-5 inline-flex items-center gap-2 border border-[hsl(var(--highland-gold)/0.5)] px-5 py-3 font-body text-[15px] font-bold text-[hsl(var(--gold-ink))] transition-colors hover:bg-[hsl(var(--highland-gold)/0.1)]"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Rather talk now? (828) 524-7773
        </a>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          to={project.path}
          className={`group border ${card} p-5 transition-colors hover:border-[hsl(var(--highland-gold)/0.5)]`}
        >
          <span className={`mb-2 block font-body text-[11px] font-bold uppercase tracking-[0.18em] ${gold}`}>
            See the work
          </span>
          <span className={`block font-heading text-[17px] font-bold leading-snug ${text}`}>
            {project.label}
          </span>
          <span className={`mt-1 block font-body text-[13px] ${muted}`}>{project.description}</span>
          <span className={`mt-3 inline-flex items-center gap-1 font-body text-[13px] font-bold ${gold}`}>
            View project <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>

        <Link
          to={guide.path}
          className={`group border ${card} p-5 transition-colors hover:border-[hsl(var(--highland-gold)/0.5)]`}
        >
          <span className={`mb-2 block font-body text-[11px] font-bold uppercase tracking-[0.18em] ${gold}`}>
            While you wait
          </span>
          <span className={`block font-heading text-[17px] font-bold leading-snug ${text}`}>
            {guide.label}
          </span>
          <span className={`mt-1 block font-body text-[13px] ${muted}`}>{guide.description}</span>
          <span className={`mt-3 inline-flex items-center gap-1 font-body text-[13px] font-bold ${gold}`}>
            Read the guide <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default LeadConfirmationPanel;
