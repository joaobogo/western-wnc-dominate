import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { Phone, ArrowLeft, ChevronDown } from "lucide-react";

type Props = {
  eyebrow: string;
  title: string;
  subhead: string;
  step: number;
  totalSteps: number;
  summary: ReactNode;
  children: ReactNode;
  switchHref: string;
  switchLabel: string;
  stepNames?: string[];
  shortFormHref?: string;
};

/**
 * Premium two-column builder shell.
 * Left = step content. Right = sticky live "Scope Brief" summary (desktop).
 * Mobile: segmented stepper + collapsible scope brief above content.
 */
const BuilderShell = ({
  eyebrow,
  title,
  subhead,
  step,
  totalSteps,
  summary,
  children,
  switchHref,
  switchLabel,
  stepNames,
  shortFormHref,
}: Props) => {
  const pct = Math.round(((step + 1) / totalSteps) * 100);
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);
  const currentName = stepNames?.[step];
  return (
    <section className="pt-20 md:pt-28 pb-14 md:pb-24 bg-background">
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 z-40 h-[3px] bg-border/40">
        <div
          className="h-full bg-[hsl(var(--highland-gold))] transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-10">
        {/* Header strip */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6 md:mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <div className="h-px w-8 bg-[hsl(var(--highland-gold))]" />
              <span className="text-[10px] font-body font-semibold uppercase tracking-[0.28em] text-[hsl(var(--gold-ink))]">
                {eyebrow}
              </span>
            </div>
            <h1 className="text-[26px] md:text-5xl font-heading font-bold text-foreground tracking-[-0.02em] leading-[1.1] mb-2 max-w-2xl">
              {title}
            </h1>
            <p className="text-foreground/60 text-[13.5px] md:text-[15px] font-body max-w-xl leading-relaxed">
              {subhead}
            </p>
          </div>
          <Link
            to={switchHref}
            className="hidden md:inline-flex items-center gap-1.5 text-[12px] font-body text-foreground/55 hover:text-[hsl(var(--gold-ink))] transition-colors"
          >
            <ArrowLeft className="w-3 h-3" /> {switchLabel}
          </Link>
        </div>

        {/* Segmented stepper (desktop) */}
        {stepNames && stepNames.length > 0 && (
          <div className="hidden md:flex items-center gap-2 mb-8" aria-label="Builder progress">
            {stepNames.map((name, i) => {
              const done = i < step;
              const current = i === step;
              return (
                <div key={name} className="flex items-center gap-2 flex-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`flex items-center justify-center w-6 h-6 rounded-full text-[10.5px] font-body font-bold transition-colors ${
                        current
                          ? "bg-[hsl(var(--highland-gold))] text-[hsl(var(--heritage-charcoal))]"
                          : done
                          ? "bg-[hsl(var(--heritage-green))] text-white"
                          : "bg-border/60 text-foreground/50"
                      }`}
                    >
                      {done ? "✓" : i + 1}
                    </span>
                    <span
                      className={`text-[11.5px] font-body tracking-tight truncate ${
                        current ? "text-foreground font-semibold" : "text-foreground/80"
                      }`}
                    >
                      {name}
                    </span>
                  </div>
                  {i < stepNames.length - 1 && (
                    <div className={`flex-1 h-px ${i < step ? "bg-[hsl(var(--heritage-green))]" : "bg-border/60"}`} />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Mobile stepper + scope brief drawer */}
        <div className="md:hidden mb-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-body font-bold uppercase tracking-[0.22em] text-foreground/55">
              Step {step + 1} of {totalSteps}
              {currentName ? <span className="text-foreground/80 font-medium normal-case tracking-normal"> · {currentName}</span> : null}
            </span>
            <span className="text-[10.5px] font-body text-foreground/80">{pct}%</span>
          </div>
          <div className="flex gap-1.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-1 rounded-full transition-colors ${
                  i < step
                    ? "bg-[hsl(var(--heritage-green))]"
                    : i === step
                    ? "bg-[hsl(var(--highland-gold))]"
                    : "bg-border/60"
                }`}
              />
            ))}
          </div>
          {step > 0 && (
            <button
              type="button"
              onClick={() => setMobileSummaryOpen((o) => !o)}
              className="w-full flex items-center justify-between bg-[hsl(var(--heritage-green)/0.04)] border border-[hsl(var(--heritage-green)/0.18)] rounded-md px-4 py-2.5"
            >
              <span className="text-[11px] font-body font-bold uppercase tracking-[0.18em] text-[hsl(var(--heritage-green))]">
                Your scope brief
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[hsl(var(--heritage-green))] transition-transform ${mobileSummaryOpen ? "rotate-180" : ""}`}
              />
            </button>
          )}
          {mobileSummaryOpen && (
            <div className="bg-[hsl(var(--heritage-green)/0.04)] border border-[hsl(var(--heritage-green)/0.18)] rounded-md p-4">
              {summary}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          {/* === Step content === */}
          <div className="lg:col-span-8">
            <div className="bg-card border border-border rounded-lg shadow-sm p-5 md:p-9">
              {children}
            </div>

            {/* Reassurance footer */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 max-w-xl">
              <p className="text-[11.5px] font-body text-foreground/80 leading-relaxed">
                Builds a project brief — <span className="text-foreground/65">not an instant quote</span>. Final scope comes from an on-site walkthrough.
              </p>
              {shortFormHref && (
                <Link
                  to={shortFormHref}
                  className="text-[11.5px] font-body text-foreground/55 hover:text-[hsl(var(--gold-ink))] transition-colors whitespace-nowrap underline-offset-4 hover:underline"
                >
                  Prefer the short form →
                </Link>
              )}
            </div>
            {/* Mobile switch link */}
            <Link
              to={switchHref}
              className="md:hidden mt-3 inline-flex items-center gap-1.5 text-[11.5px] font-body text-foreground/80 hover:text-[hsl(var(--gold-ink))] transition-colors"
            >
              <ArrowLeft className="w-3 h-3" /> {switchLabel}
            </Link>
          </div>

          {/* === Sticky scope summary === */}
          <aside className="hidden lg:block lg:col-span-4 lg:sticky lg:top-24">
            <div className="bg-[hsl(var(--heritage-green)/0.04)] border border-[hsl(var(--heritage-green)/0.18)] rounded-lg p-5 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10.5px] font-body font-bold uppercase tracking-[0.22em] text-[hsl(var(--heritage-green))]">
                  Your scope brief
                </span>
                <span className="text-[10.5px] font-body text-foreground/80">{pct}%</span>
              </div>
              {summary}
            </div>
            <a
              href="tel:+18285247773"
              className="mt-4 inline-flex items-center gap-2 text-foreground/70 hover:text-[hsl(var(--gold-ink))] transition-colors font-body text-[13px]"
            >
              <Phone className="w-3.5 h-3.5 text-[hsl(var(--gold-ink))]" />
              Prefer to talk? (828) 524-7773
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default BuilderShell;