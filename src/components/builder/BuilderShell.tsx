import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Phone, ArrowLeft } from "lucide-react";

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
};

/**
 * Premium two-column builder shell.
 * Left = step content (the form). Right = sticky live "Scope Brief" summary.
 * Mobile: summary collapses below content.
 */
const BuilderShell = ({ eyebrow, title, subhead, step, totalSteps, summary, children, switchHref, switchLabel }: Props) => {
  const pct = Math.round(((step + 1) / totalSteps) * 100);
  return (
    <section className="pt-24 md:pt-28 pb-16 md:pb-24 bg-background">
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 z-40 h-[3px] bg-border/40">
        <div
          className="h-full bg-[hsl(var(--highland-gold))] transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-10">
        {/* Header strip */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8 md:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px w-8 bg-[hsl(var(--highland-gold))]" />
              <span className="text-[10px] font-body font-semibold uppercase tracking-[0.28em] text-[hsl(var(--highland-gold))]">
                {eyebrow}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground tracking-[-0.02em] leading-[1.1] mb-2 max-w-2xl">
              {title}
            </h1>
            <p className="text-foreground/60 text-[14px] md:text-[15px] font-body max-w-xl">
              {subhead}
            </p>
          </div>
          <Link
            to={switchHref}
            className="hidden md:inline-flex items-center gap-1.5 text-[12px] font-body text-foreground/55 hover:text-[hsl(var(--highland-gold))] transition-colors"
          >
            <ArrowLeft className="w-3 h-3" /> {switchLabel}
          </Link>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* === Step content === */}
          <div className="lg:col-span-8">
            <div className="bg-card border border-border rounded-lg shadow-sm p-6 md:p-9">
              <p className="text-[10.5px] font-body font-bold uppercase tracking-[0.22em] text-foreground/45 mb-5">
                Step {step + 1} of {totalSteps}
              </p>
              {children}
            </div>

            {/* Reassurance footer */}
            <p className="text-[11.5px] font-body text-foreground/45 mt-4 leading-relaxed max-w-xl">
              This builder organizes your project details so an advisor can have a more useful conversation with you.
              <span className="text-foreground/60"> It is not an instant quote.</span> Final scope and pricing always come from an on-site assessment.
            </p>
          </div>

          {/* === Sticky scope summary === */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="bg-[hsl(var(--heritage-green)/0.04)] border border-[hsl(var(--heritage-green)/0.18)] rounded-lg p-5 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10.5px] font-body font-bold uppercase tracking-[0.22em] text-[hsl(var(--heritage-green))]">
                  Your scope brief
                </span>
                <span className="text-[10.5px] font-body text-foreground/45">{pct}%</span>
              </div>
              {summary}
            </div>
            <a
              href="tel:8283979211"
              className="mt-4 inline-flex items-center gap-2 text-foreground/70 hover:text-[hsl(var(--highland-gold))] transition-colors font-body text-[13px]"
            >
              <Phone className="w-3.5 h-3.5 text-[hsl(var(--highland-gold))]" />
              Prefer to talk? (828) 397-9211
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default BuilderShell;