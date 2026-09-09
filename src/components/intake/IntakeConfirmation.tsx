import { PHONE_DISPLAY, PHONE_TEL } from "@/data/business";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Phone, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { pickGuideLink, pickProjectLinks, type LeadCategory } from "@/lib/confirmation-links";
import type { SubmittedSummaryItem } from "@/components/forms/LeadConfirmationPanel";

type Props = {
  title: string;
  body: string;
  nextStepsTitle?: string;
  nextSteps?: string[];
  /** Recap of what the visitor actually submitted. */
  summary?: SubmittedSummaryItem[];
  town?: string | null;
  category?: LeadCategory;
};

const IntakeConfirmation = ({
  title,
  body,
  nextStepsTitle = "What happens next",
  nextSteps,
  summary = [],
  town,
  category = "roofing",
}: Props) => {
  const steps = nextSteps ?? [
    "A project advisor reviews your details — usually as soon as possible.",
    "We confirm scope and schedule an on-site assessment at your property.",
    "You receive a written, itemized proposal with materials, scope, and pricing.",
  ];
  const projects = pickProjectLinks({ town, category, count: 2 });
  const guide = pickGuideLink({ town });
  const recap = summary.filter((s) => s.value && String(s.value).trim().length > 0);

  useEffect(() => {
    document.body.dataset.leadConfirmed = "true";
    try { sessionStorage.setItem("hl_lead_submitted", "1"); } catch { /* ignore */ }
    return () => { delete document.body.dataset.leadConfirmed; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="text-center py-6 relative overflow-hidden"
    >
      {/* Subtle Heritage Watermark */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-[0.03] pointer-events-none rotate-12" 
        style={{ 
          backgroundImage: "url('/tartan.png')",
          backgroundSize: "160px auto",
          backgroundRepeat: "repeat"
        }} 
      />
      <img loading="lazy" decoding="async"
        src={logo}
        alt="Highlander Building Services logo"
        width={220}
        height={80}
        className="h-16 md:h-20 w-auto mx-auto mb-4"
      />
      <div className="w-12 h-12 rounded-full bg-[hsl(var(--highland-gold)/0.12)] flex items-center justify-center mx-auto mb-5">
        <CheckCircle className="w-6 h-6 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
      </div>
      <h2 className="text-2xl md:text-heading-sm font-heading font-bold text-foreground mb-3 tracking-tight">
        {title}
      </h2>
      <p className="text-muted-foreground text-body-xs font-body leading-relaxed max-w-md mx-auto mb-8">
        {body}
      </p>

      {recap.length > 0 && (
        <div className="text-left bg-background border border-border rounded-md p-5 mb-6">
          <h3 className="text-body-xs font-body font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">
            What you sent us
          </h3>
          <dl className="space-y-2">
            {recap.map((item) => (
              <div key={item.label} className="flex flex-wrap gap-x-2 text-body-xs font-body">
                <dt className="text-muted-foreground">{item.label}:</dt>
                <dd className="font-semibold text-foreground">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <div className="text-left bg-background border border-border rounded-md p-5 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
          <h3 className="text-body-xs font-body font-bold uppercase tracking-[0.2em] text-muted-foreground">
            {nextStepsTitle}
          </h3>
        </div>
        <ol className="space-y-3">
          {steps.map((s, i) => (
            <li key={i} className="flex gap-3 text-body-xs font-body text-muted-foreground leading-relaxed">
              <span className="text-[hsl(var(--gold-ink))] font-heading font-bold flex-shrink-0">{i + 1}.</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </div>

      <p className="text-left text-caption font-body font-bold uppercase tracking-[0.2em] text-[hsl(var(--gold-ink))] mb-2">
        Work we've done nearby
      </p>
      <div className="grid gap-3 sm:grid-cols-2 text-left mb-4">
        {projects.map((project) => (
          <Link
            key={project.path}
            to={project.path}
            className="group border border-border rounded-md p-4 hover:border-[hsl(var(--highland-gold))] transition-colors"
          >
            <span className="block font-heading font-bold text-body-sm text-foreground leading-snug">
              {project.label}
            </span>
            <span className="block text-body-xs font-body text-muted-foreground mt-1">
              {project.description}
            </span>
            <span className="mt-2 inline-flex items-center gap-1 text-body-xs font-body font-bold text-[hsl(var(--gold-ink))]">
              View project <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
      <Link
        to={guide.path}
        className="mb-8 inline-flex items-center gap-1 text-body-xs font-body font-bold text-[hsl(var(--gold-ink))] hover:opacity-85"
      >
        While you wait: {guide.label} <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </Link>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={PHONE_TEL}
          className="btn btn-secondary btn-sm"
        >
          <Phone className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
          {PHONE_DISPLAY}
        </a>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-body text-body-xs transition-colors"
        >
          Return home <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </motion.div>
  );
};

export default IntakeConfirmation;