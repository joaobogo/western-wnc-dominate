import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ClipboardCheck, PenTool, FileCheck, CheckCircle } from "lucide-react";

/**
 * DesignProgramPromo
 * Reusable promo for Highlander's paid three-phase Design & Consultation
 * Agreement. Position as a premium construction planning process — not a
 * barrier. Surfaces on Construction hub, Additions, Outdoor Living,
 * Renovations, Construction Intake, and any construction-context page.
 *
 * Approved vocabulary only. No "architect / architectural / free design".
 */

type Variant = "section" | "band" | "card";

const phases = [
  {
    icon: ClipboardCheck,
    label: "Phase 1",
    title: "Discovery & Scope",
    detail: "Site review, goals, constraints, and a written scope of work. We define what the project really is — before anyone draws or prices it.",
  },
  {
    icon: PenTool,
    label: "Phase 2",
    title: "Plans, 3D Views & Material Direction",
    detail: "Our in-house design team produces layouts, 3D views, and material direction so you can see, refine, and approve the build before it starts.",
  },
  {
    icon: FileCheck,
    label: "Phase 3",
    title: "Permit Set & Construction Documents",
    detail: "Drawings and construction documents prepared for the agreed scope and, when applicable, jurisdiction review. The reviewing authority decides permit approval and any required revisions.",
  },
];

interface Props {
  variant?: Variant;
  heading?: string;
  subheading?: string;
  className?: string;
}

const DesignProgramPromo = ({
  variant = "section",
  heading = "Plan Before You Build.",
  subheading = "When a project needs paid design, Highlander's Design & Consultation Agreement defines the phase, deliverables, price, schedule expectations, and other commercial terms before design work begins.",
  className = "",
}: Props) => {
  if (variant === "card") {
    return (
      <div className={`bg-card border border-[hsl(var(--highland-gold)/0.25)] rounded-none p-6 md:p-7 relative overflow-hidden ${className}`}>
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.6)] to-transparent" />
        <span className="text-caption font-body font-bold uppercase tracking-[0.25em] text-[hsl(var(--gold-ink))] mb-3 block">
          Design & Consultation Agreement
        </span>
        <h3 className="font-heading font-bold text-foreground text-lg md:text-xl mb-3 leading-tight">
          A paid planning program for serious builds.
        </h3>
        <p className="text-muted-foreground text-sm md:text-body-sm font-body leading-relaxed mb-5">
          Three structured phases can cover scope, plans and 3D views, then permit/construction documentation when needed. Any construction credit or other commercial term is agreement-specific, not automatic.
        </p>
        <Link
          to="/construction/design"
          className="inline-flex items-center gap-2 text-[hsl(var(--gold-ink))] font-heading font-bold text-body-xs uppercase tracking-[0.15em] hover:gap-3 transition-all"
        >
          View Design Services <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    );
  }

  if (variant === "band") {
    return (
      <section className={`relative bg-secondary/40 border-y border-[hsl(var(--highland-gold)/0.15)] py-12 md:py-16 ${className}`}>
        <div className="container-tight">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-center">
            <div>
              <span className="text-caption font-body font-bold uppercase tracking-[0.25em] text-[hsl(var(--gold-ink))] mb-3 block">
                Design & Consultation Agreement
              </span>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground leading-tight mb-4">
                {heading}
              </h2>
              <p className="text-muted-foreground text-base font-body leading-relaxed mb-6 max-w-xl">
                {subheading}
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-6">
                {["Three design phases", "Permit + construction documents when needed", "Commercial terms confirmed in the signed agreement"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
                    <span className="text-body-xs font-body text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/construction/design"
                className="btn btn-secondary btn-md"
              >
                View Design Services <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
            <ul className="space-y-3">
              {phases.map((p) => (
                <li key={p.title} className="flex gap-3 bg-card border border-border rounded-none p-4">
                  <div className="w-9 h-9 flex-shrink-0 bg-[hsl(var(--highland-gold)/0.08)] border border-[hsl(var(--highland-gold)/0.2)] flex items-center justify-center">
                    <p.icon className="w-4 h-4 text-[hsl(var(--gold-ink))]" />
                  </div>
                  <div>
                    <div className="text-caption font-body font-bold uppercase tracking-[0.18em] text-[hsl(var(--gold-ink))] mb-0.5">{p.label}</div>
                    <div className="font-heading font-bold text-foreground text-sm mb-0.5">{p.title}</div>
                    <p className="text-muted-foreground text-body-xs font-body leading-relaxed">{p.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`section-padding bg-background relative overflow-hidden ${className}`}>
      <div className="container-tight">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="eyebrow mb-3 block text-[hsl(var(--gold-ink))]">Design & Consultation Agreement</span>
          <h2 className="section-heading mb-5">{heading}</h2>
          <p className="text-muted-foreground text-base md:text-lg font-body leading-relaxed">
            {subheading}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-5 mb-10">
          {phases.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group bg-card border border-border rounded-none p-6 md:p-7 hover:border-[hsl(var(--highland-gold)/0.3)] card-lift relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.5)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-10 h-10 bg-[hsl(var(--highland-gold)/0.08)] border border-[hsl(var(--highland-gold)/0.2)] flex items-center justify-center mb-4">
                <p.icon className="w-5 h-5 text-[hsl(var(--gold-ink))]" />
              </div>
              <div className="text-caption font-body font-bold uppercase tracking-[0.22em] text-[hsl(var(--gold-ink))] mb-1.5">{p.label}</div>
              <h3 className="font-heading font-bold text-foreground text-lg mb-2 leading-tight">{p.title}</h3>
              <p className="text-muted-foreground text-sm font-body leading-relaxed">{p.detail}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center max-w-2xl mx-auto">
          <p className="text-muted-foreground text-body-xs font-body italic mb-5">
            Paid design and construction are separate commitments. Any construction credit, ownership/use right, or other commercial term applies only when it is stated in the signed project agreement.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/construction/design"
              className="btn btn-secondary btn-md"
            >
              View Design Services <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              to="/request-inspection?context=design_program&type=construction-design"
              className="btn btn-secondary btn-md"
            >
              Discuss My Project <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignProgramPromo;
export { phases as designProgramPhases };