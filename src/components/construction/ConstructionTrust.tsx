import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield, Hammer, MessageSquare, Mountain,
  ClipboardCheck, Ruler, Users, Home, Clock,
  ArrowRight, Eye, Sparkles, Wrench, FileCheck,
  type LucideIcon,
} from "lucide-react";

/* ═══════════════════════════════════════════
   TRUST DATA — Premium Construction Framework
   Designed to overcome homeowner hesitation
   ═══════════════════════════════════════════ */

export interface TrustPillar {
  icon: LucideIcon;
  title: string;
  detail: string;
  /** The homeowner concern this pillar directly addresses */
  overcomes?: string;
}

export const constructionTrustPillars: TrustPillar[] = [
  {
    icon: ClipboardCheck,
    title: "Project Clarity",
    detail: "Before a single board is cut, you receive a written scope with defined deliverables, specified materials, a confirmed timeline, and transparent cost groupings. No vague allowances, no ambiguous language, no surprises buried in fine print. You know exactly what you're getting — and what you're paying — before you commit.",
    overcomes: "\"I'm afraid the final cost will be way more than the estimate.\"",
  },
  {
    icon: MessageSquare,
    title: "Communication You Can Count On",
    detail: "A single dedicated project manager who knows every detail of your scope. Daily updates during active work. Immediate notification if anything changes — with options, implications, and our recommendation. You never have to chase us for information or re-explain your project to a new person.",
    overcomes: "\"Every contractor I've used disappears after signing the contract.\"",
  },
  {
    icon: Eye,
    title: "Planning Discipline",
    detail: "We invest heavily in the front end — site assessment, engineering coordination, permitting, material sourcing, and detailed scheduling — so construction proceeds without the delays, change orders, and 'we didn't anticipate that' moments that derail most projects. The quality of the plan determines the quality of the build.",
    overcomes: "\"I've heard too many stories about projects that drag on forever.\"",
  },
  {
    icon: Hammer,
    title: "Craftsmanship Standard",
    detail: "Every joint, connection, and finish is held to a standard that goes beyond code compliance. Our crews are trained in-house, supervised daily, and committed to work they're proud to put their name on. We don't accept 'good enough' on any element — visible or hidden.",
    overcomes: "\"How do I know the quality will actually be there?\"",
  },
  {
    icon: Mountain,
    title: "Local Understanding",
    detail: "We've built across Western North Carolina's unique terrain — slopes, rock, microclimates, soil conditions, and mountain-specific building requirements that out-of-area contractors don't anticipate until they're already behind schedule and over budget.",
    overcomes: "\"Does this company actually understand mountain construction?\"",
  },
  {
    icon: Home,
    title: "Respect for Your Home",
    detail: "Your home is where you live — during and after construction. We install dust barriers, protect finished surfaces, maintain clean work zones, coordinate noisy work around your schedule, and restore your property to pre-construction condition. We treat your home the way we'd want ours treated.",
    overcomes: "\"I don't want my house torn apart for months.\"",
  },
  {
    icon: Clock,
    title: "Timeline Transparency",
    detail: "We provide a detailed construction schedule before work begins, update it proactively as the project progresses, and communicate immediately if any factor — weather, material delivery, discovery — affects the timeline. You always know where your project stands and when it will be complete.",
    overcomes: "\"Will this actually be done when they say it will?\"",
  },
  {
    icon: Sparkles,
    title: "Finish Quality",
    detail: "The last 5% of a project is where most contractors lose interest — and where homeowners notice most. Trim reveals, paint edges, caulk lines, hardware alignment, and material transitions. We treat finish details as the signature of our work, not an afterthought.",
    overcomes: "\"I'm worried about the little things being done right.\"",
  },
  {
    icon: Wrench,
    title: "Quality Control System",
    detail: "Every phase has a verification checkpoint before the next begins. Framing is inspected before sheathing. Rough-ins are verified before drywall. Finishes are reviewed before walk-through. This layered quality control catches problems when they're cheap to fix — not after they're buried behind finished surfaces.",
    overcomes: "\"How do I know what's behind the walls is done right?\"",
  },
  {
    icon: FileCheck,
    title: "Project Oversight",
    detail: "A dedicated project manager supervises every active day — verifying work against specifications, managing trade sequencing, resolving issues in real time, and maintaining the documentation trail that proves your project was built to standard. Not drive-by supervision. On-site accountability.",
    overcomes: "\"Will anyone actually be watching the work?\"",
  },
];

/** Compact 4-pillar version for sidebars and smaller sections */
export const compactConstructionTrust = constructionTrustPillars.slice(0, 4);

/** 6-pillar version for mid-page sections */
export const midConstructionTrust = constructionTrustPillars.slice(0, 6);

/** Full 8-pillar version (original set) */
export const fullConstructionTrust = constructionTrustPillars.slice(0, 8);

/** Extended 10-pillar version with QC + Oversight */
export const extendedConstructionTrust = constructionTrustPillars;

/* ═══════════════════════════════════════════
   TRUST SECTION COMPONENT (standard grid)
   ═══════════════════════════════════════════ */

interface ConstructionTrustProps {
  pillars?: TrustPillar[];
  heading?: string;
  subheading?: string;
  eyebrow?: string;
  className?: string;
  variant?: "light" | "dark";
  columns?: 2 | 3 | 4;
  showObjections?: boolean;
}

const ConstructionTrust = ({
  pillars = fullConstructionTrust,
  heading = "The Highlander\nConstruction Standard.",
  subheading = "Construction projects are significant investments — financially and emotionally. Here's how we earn and protect your trust at every stage.",
  eyebrow = "Why Highlander",
  className = "",
  variant = "light",
  columns = 3,
  showObjections = false,
}: ConstructionTrustProps) => {
  const isDark = variant === "dark";
  const colClass =
    columns === 2 ? "md:grid-cols-2" :
    columns === 4 ? "md:grid-cols-2 lg:grid-cols-4" :
    "md:grid-cols-2 lg:grid-cols-3";

  if (isDark) {
    return (
      <section className={`section-dark tartan-dark relative overflow-hidden ${className}`}>
        <motion.div
          className="absolute top-0 left-0 w-full h-px"
          style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.4), hsl(var(--highland-gold) / 0))" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        />
        <div className="section-padding">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12">
              <span className="eyebrow mb-3 block text-[hsl(var(--gold-ink))]">{eyebrow}</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-[1.15] text-dark-section-foreground whitespace-pre-line">{heading}</h2>
              {subheading && <p className="text-dark-section-foreground text-base font-body max-w-lg mx-auto">{subheading}</p>}
            </motion.div>

            <div className={`grid grid-cols-1 ${colClass} gap-4 md:gap-5`}>
              {pillars.map((pillar, i) => (
                <motion.div key={pillar.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="border border-dark-section-border rounded-sm p-6 hover:border-[hsl(var(--highland-gold)/0.15)] transition-colors">
                  {showObjections && pillar.overcomes && (
                    <p className="text-[hsl(var(--highland-gold)/0.85)] text-caption italic font-body mb-3 leading-snug">{pillar.overcomes}</p>
                  )}
                  <div className="w-10 h-10 rounded-sm bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center mb-4">
                    <pillar.icon className="w-5 h-5 text-[hsl(var(--gold-ink))]" />
                  </div>
                  <h3 className="font-heading font-bold text-dark-section-foreground text-sm mb-2">{pillar.title}</h3>
                  <p className="text-dark-section-foreground text-body-xs leading-relaxed font-body">{pillar.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`section-padding bg-background ${className}`}>
      <div className="container-tight">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
          <span className="eyebrow mb-3 block">{eyebrow}</span>
          <h2 className="section-heading mb-4 whitespace-pre-line">{heading}</h2>
          {subheading && <p className="text-muted-foreground text-base font-body max-w-lg mx-auto leading-relaxed">{subheading}</p>}
        </motion.div>

        <div className={`grid grid-cols-1 ${colClass} gap-4 md:gap-5`}>
          {pillars.map((pillar, i) => (
            <motion.div key={pillar.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group bg-card border border-border rounded-sm p-6 hover:border-[hsl(var(--highland-gold)/0.2)] card-lift">
              {showObjections && pillar.overcomes && (
                <p className="text-[hsl(var(--highland-gold)/0.85)] text-caption italic font-body mb-3 leading-snug">{pillar.overcomes}</p>
              )}
              <div className="w-10 h-10 rounded-sm bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center mb-4 group-hover:bg-[hsl(var(--highland-gold)/0.12)] transition-colors">
                <pillar.icon className="w-5 h-5 text-[hsl(var(--gold-ink))]" />
              </div>
              <h3 className="font-heading font-bold text-foreground text-sm mb-2 group-hover:text-[hsl(var(--gold-ink))] transition-colors">{pillar.title}</h3>
              <p className="text-muted-foreground text-body-xs leading-relaxed font-body">{pillar.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConstructionTrust;

/* ═══════════════════════════════════════════
   OBJECTION-BUSTER SECTION
   Shows each concern → response pair
   ═══════════════════════════════════════════ */

export const ConstructionObjectionBuster = ({
  pillars = fullConstructionTrust,
  heading = "We Know What\nHolds You Back.",
  subheading = "Every homeowner has concerns before a major construction project. Here's how we address each one — with systems, not promises.",
  eyebrow = "Your Concerns, Addressed",
  className = "",
}: {
  pillars?: TrustPillar[];
  heading?: string;
  subheading?: string;
  eyebrow?: string;
  className?: string;
}) => (
  <section className={`section-padding bg-background/50 ${className}`}>
    <div className="container-tight max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
        <span className="eyebrow mb-3 block">{eyebrow}</span>
        <h2 className="section-heading mb-4 whitespace-pre-line">{heading}</h2>
        {subheading && <p className="text-muted-foreground text-base font-body max-w-lg mx-auto leading-relaxed">{subheading}</p>}
      </motion.div>

      <div className="space-y-4">
        {pillars.filter(p => p.overcomes).map((pillar, i) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group bg-card border border-border rounded-sm p-6 md:p-7 hover:border-[hsl(var(--highland-gold)/0.2)] card-lift"
          >
            <div className="grid md:grid-cols-5 gap-5 md:gap-8 items-start">
              <div className="md:col-span-2">
                <p className="text-[hsl(var(--highland-gold)/0.9)] text-body-xs italic font-body mb-3 leading-snug">{pillar.overcomes}</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-sm bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center group-hover:bg-[hsl(var(--highland-gold)/0.12)] transition-colors flex-shrink-0">
                    <pillar.icon className="w-4 h-4 text-[hsl(var(--gold-ink))]" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-sm group-hover:text-[hsl(var(--gold-ink))] transition-colors">{pillar.title}</h3>
                </div>
              </div>
              <div className="md:col-span-3">
                <p className="text-muted-foreground text-body-xs leading-relaxed font-body">{pillar.detail}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════
   COMPACT TRUST STRIP (inline, no cards)
   ═══════════════════════════════════════════ */

export const ConstructionTrustStrip = ({
  pillars = compactConstructionTrust,
  className = "",
}: {
  pillars?: TrustPillar[];
  className?: string;
}) => (
  <div className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-6 ${className}`}>
    {pillars.map((p) => (
      <div key={p.title} className="flex items-center gap-2">
        <p.icon className="w-3.5 h-3.5 text-[hsl(var(--highland-gold)/0.85)]" />
        <span className="text-muted-foreground text-xs font-body font-medium">{p.title}</span>
      </div>
    ))}
  </div>
);

/* ═══════════════════════════════════════════
   TRUST SIDEBAR WITH OBJECTIONS
   ═══════════════════════════════════════════ */

export const ConstructionTrustSidebarDetailed = ({
  pillars = compactConstructionTrust,
}: {
  pillars?: TrustPillar[];
}) => (
  <div className="bg-card border border-border rounded-sm p-5 md:p-6 space-y-5">
    <h4 className="text-caption font-body font-bold uppercase tracking-[0.15em] text-[hsl(var(--highland-gold)/0.6)] mb-1">Why Homeowners Trust Highlander</h4>
    {pillars.map((p) => (
      <div key={p.title} className="space-y-1.5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-sm bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center flex-shrink-0">
            <p.icon className="w-3.5 h-3.5 text-[hsl(var(--gold-ink))]" />
          </div>
          <span className="text-foreground text-xs font-heading font-bold">{p.title}</span>
        </div>
        {p.overcomes && (
          <p className="text-muted-foreground text-caption italic font-body pl-[calc(1.75rem+0.625rem)] leading-snug">{p.overcomes}</p>
        )}
      </div>
    ))}
    <div className="pt-3 border-t border-border">
      <Link to="/consultation" className="group text-sm font-semibold text-[hsl(var(--gold-ink))] inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity font-body">
        Get My Project Scoped <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
      </Link>
    </div>
  </div>
);
