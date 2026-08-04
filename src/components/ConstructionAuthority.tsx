import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, HardHat, ShieldCheck, Ruler, Users, FileText, CheckCircle2,
  Hammer, Cloud, Eye, Sparkles, type LucideIcon,
} from "lucide-react";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import GoldLine from "@/components/motion/GoldLine";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

/* ─── Discipline Bridge — 6 skills that transfer from roofing to construction ─── */

interface DisciplineBridge {
  icon: LucideIcon;
  roofingLabel: string;
  constructionLabel: string;
  title: string;
  desc: string;
}

const disciplines: DisciplineBridge[] = [
  {
    icon: Hammer,
    roofingLabel: "Precision installation",
    constructionLabel: "Craft-grade building",
    title: "Craftsmanship",
    desc: "The same hand-selected crews who install roofs to manufacturer-certified tolerances now frame additions, hang doors, and set trim with the same obsessive attention to fit and finish.",
  },
  {
    icon: FileText,
    roofingLabel: "Photo documentation",
    constructionLabel: "Milestone tracking",
    title: "Project Management",
    desc: "Written scope, sequenced phases, daily oversight, and photo documentation at every milestone. The system that earned our roofing reputation now manages every framing, finishing, and structural phase.",
  },
  {
    icon: Ruler,
    roofingLabel: "Load & drainage engineering",
    constructionLabel: "Structural design",
    title: "Technical Understanding",
    desc: "Roof engineering teaches you how structures bear loads, shed water, and handle thermal movement. That structural intelligence now informs every addition, opening, and connection we build.",
  },
  {
    icon: Cloud,
    roofingLabel: "Waterproofing mastery",
    constructionLabel: "Envelope protection",
    title: "Weather Protection",
    desc: "Nobody understands how water finds its way into buildings better than roofers. We bring that hard-won knowledge to every flashing detail, wall transition, and exterior junction — because leaks start at transitions.",
  },
  {
    icon: ShieldCheck,
    roofingLabel: "Mountain-rated specs",
    constructionLabel: "Elevation-calibrated building",
    title: "Structural Thinking",
    desc: "Load ratings, wind uplift, snow loads, and material specs calibrated for actual elevation and exposure. Coastal assumptions don't build mountain structures — and we've never used them.",
  },
  {
    icon: Sparkles,
    roofingLabel: "Clean walk-throughs",
    constructionLabel: "Detail-perfect handoffs",
    title: "Finish Quality",
    desc: "The last 5% of every project gets the most attention, not the least. Trim reveals, caulk lines, hardware alignment, and material transitions — finished to the standard a homeowner notices every day.",
  },
];

const principles = [
  {
    icon: FileText,
    title: "Same Documented Process",
    desc: "Written scope, sequenced phases, photo documentation at every milestone. The process that earned our roofing reputation now applies to every addition, renovation, and exterior project.",
  },
  {
    icon: Users,
    title: "Same In-House Crews",
    desc: "The people on your property are full-time Highlander crew — vetted, trained, and accountable to one standard.",
  },
  {
    icon: ShieldCheck,
    title: "Same Warranty Protection",
    desc: "Every construction project carries the same warranty documentation delivered at walkthrough. Materials, labor, and workmanship — all in writing, all backed by the owner's name.",
  },
  {
    icon: Ruler,
    title: "Same Mountain Engineering",
    desc: "Load ratings, drainage planning, and material specs calibrated for your actual elevation and exposure. Coastal assumptions don't build mountain structures.",
  },
];

const ConstructionAuthority = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Dark editorial section */}
      <div className="section-padding section-dark relative">
        <div className="absolute inset-0 tartan-dark opacity-30" />

        {/* Ambient design line */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
            <motion.path
              d="M0,750 L200,750 L400,550 L600,550 L800,400 L1000,400 L1200,550 L1440,550"
              fill="none"
              stroke="hsl(var(--highland-gold))"
              strokeOpacity={0.04}
              strokeWidth={1}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, ease: HIGHLAND_EASE }}
            />
          </svg>
        </div>

        <div className="container-tight relative z-10">
          {/* Header */}
          <ScrollReveal variant="fade">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-none bg-[hsl(var(--highland-gold)/0.1)] flex items-center justify-center">
                <HardHat className="w-5 h-5 text-[hsl(var(--gold-ink))]" />
              </div>
              <span className="text-[10px] font-body font-bold uppercase tracking-[0.25em] text-[hsl(var(--highland-gold)/0.6)]">
                Why Construction
              </span>
            </div>
          </ScrollReveal>

          <HeadingReveal delay={0.1}>
            <h2 className="text-2xl md:text-3xl lg:text-[2.5rem] font-heading font-bold text-dark-section-foreground leading-[1.1] mb-6 tracking-tight max-w-3xl">
              We Didn't Add Construction<br className="hidden md:block" />
              to Sell More.{" "}
              <span className="text-[hsl(var(--gold-ink))]">
                We Added It Because<br className="hidden md:block" />
                Clients Kept Asking.
              </span>
            </h2>
          </HeadingReveal>

          <ScrollReveal variant="rise-subtle" delay={0.25}>
            <div className="space-y-4 mb-10 max-w-2xl">
              <p className="text-dark-section-foreground/85 text-[15px] font-body leading-[1.8]">
                After years of roofing and general construction, the most common question we heard was:
                <em className="text-dark-section-foreground/90"> "Can you handle the rest of the house too?"</em>
              </p>
              <p className="text-dark-section-foreground/95 text-[15px] font-body leading-[1.8]">
                The answer is now yes. Every skill that makes us exceptional roofers — project management, structural understanding, weather protection, craftsmanship, and finish quality — transfers directly to construction. It's not a pivot. It's a natural extension.
              </p>
            </div>
          </ScrollReveal>

          <GoldLine width="3rem" delay={0.35} className="mb-10" />

          {/* ─── 6-Point Discipline Bridge Grid ─── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-10">
            {disciplines.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.06, duration: 0.5, ease: HIGHLAND_EASE }}
                className="group relative bg-dark-section-foreground/[0.03] border border-dark-section-foreground/[0.06] rounded-none p-5 hover:border-[hsl(var(--highland-gold)/0.15)] transition-all duration-500"
              >
                {/* Gold left accent on hover */}
                <div className="absolute left-0 top-0 w-[2px] h-0 bg-[hsl(var(--highland-gold))] group-hover:h-full transition-all duration-600" />

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-none border border-dark-section-foreground/[0.08] flex items-center justify-center flex-shrink-0 group-hover:border-[hsl(var(--highland-gold)/0.2)] transition-colors duration-300">
                    <d.icon className="w-4 h-4 text-[hsl(var(--highland-gold)/0.9)] group-hover:text-[hsl(var(--highland-gold)/0.8)] transition-colors duration-300" />
                  </div>
                  <h3 className="text-sm font-heading font-bold text-dark-section-foreground/85 tracking-tight">
                    {d.title}
                  </h3>
                </div>

                {/* Skill transfer labels */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-body font-semibold uppercase tracking-[0.1em] text-dark-section-foreground/90 bg-dark-section-foreground/[0.04] px-2 py-0.5">{d.roofingLabel}</span>
                  <ArrowRight className="w-3 h-3 text-[hsl(var(--highland-gold)/0.75)]" />
                  <span className="text-[10px] font-body font-semibold uppercase tracking-[0.1em] text-[hsl(var(--highland-gold)/0.9)] bg-[hsl(var(--highland-gold)/0.06)] px-2 py-0.5">{d.constructionLabel}</span>
                </div>

                <p className="text-dark-section-foreground/95 text-[12.5px] leading-[1.7] font-body">
                  {d.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Proof strip */}
          <ScrollReveal variant="rise-subtle" delay={0.4}>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8">
              {[
                "Licensed General Contractor",
                "Full Liability & Workers' Comp",
                "8 WNC Counties",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[hsl(var(--highland-gold)/0.9)]" />
                  <span className="text-dark-section-foreground/95 text-[12px] font-body font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* CTAs — dual path */}
          <ScrollReveal variant="rise" delay={0.45}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                to="/construction"
                className="group cta-gradient text-accent-foreground font-body font-bold text-base md:text-lg px-10 py-4.5 rounded-none inline-flex items-center gap-3 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative overflow-hidden tracking-[0.1em] uppercase shadow-xl"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">Explore the Construction Division</span>
                <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/construction/consultation"
                className="group border border-dark-section-foreground/10 text-dark-section-foreground font-heading font-medium text-[13px] px-7 py-4 rounded-none inline-flex items-center gap-2.5 hover:bg-dark-section-foreground/[0.04] hover:border-[hsl(var(--highland-gold)/0.25)] transition-all duration-300"
              >
                <HardHat className="w-4 h-4 text-[hsl(var(--highland-gold)/0.9)]" />
                Schedule a Construction Consultation
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ConstructionAuthority;
