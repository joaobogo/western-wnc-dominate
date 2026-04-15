import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, HardHat, ShieldCheck, Ruler, Users, FileText, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import GoldLine from "@/components/motion/GoldLine";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const principles = [
  {
    icon: FileText,
    title: "Same Documented Process",
    desc: "Written scope, sequenced phases, photo documentation at every milestone. The process that earned our roofing reputation now applies to every addition, renovation, and exterior project.",
  },
  {
    icon: Users,
    title: "Same In-House Crews",
    desc: "No subcontractor roulette. The people on your property are full-time Highlander crew — vetted, trained, and accountable to one standard.",
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

        {/* Ambient architectural line */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 700" preserveAspectRatio="none">
            <motion.path
              d="M0,600 L200,600 L400,450 L600,450 L800,350 L1000,350 L1200,450 L1440,450"
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left — editorial narrative (7 cols) */}
            <div className="lg:col-span-7">
              <ScrollReveal variant="fade">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-none bg-[hsl(var(--highland-gold)/0.1)] flex items-center justify-center">
                    <HardHat className="w-5 h-5 text-[hsl(var(--highland-gold))]" />
                  </div>
                  <span className="text-[10px] font-body font-bold uppercase tracking-[0.25em] text-[hsl(var(--highland-gold)/0.6)]">
                    Why Construction
                  </span>
                </div>
              </ScrollReveal>

              <HeadingReveal delay={0.1}>
                <h2 className="text-2xl md:text-3xl lg:text-[2.5rem] font-heading font-bold text-dark-section-foreground leading-[1.1] mb-6 tracking-tight">
                  We Didn't Add Construction<br className="hidden md:block" />
                  to Sell More.{" "}
                  <span className="text-[hsl(var(--highland-gold))]">
                    We Added It Because<br className="hidden md:block" />
                    Clients Kept Asking.
                  </span>
                </h2>
              </HeadingReveal>

              <ScrollReveal variant="rise-subtle" delay={0.25}>
                <div className="space-y-4 mb-8">
                  <p className="text-dark-section-foreground/50 text-[15px] font-body leading-[1.8] max-w-2xl">
                    After 500+ roofing projects, the most common question we heard was: 
                    <em className="text-dark-section-foreground/70"> "Can you handle the rest of the house too?"</em>
                  </p>
                  <p className="text-dark-section-foreground/40 text-[15px] font-body leading-[1.8] max-w-2xl">
                    The answer is now yes. Highlander Construction operates under the same licensed 
                    GC oversight, the same project documentation system, and the same crews that 
                    built our roofing reputation. No learning curve. No compromise. Just the 
                    natural next step for a company that already proved it could deliver.
                  </p>
                </div>
              </ScrollReveal>

              <GoldLine width="3rem" delay={0.35} className="mb-8" />

              {/* Proof strip */}
              <ScrollReveal variant="rise-subtle" delay={0.4}>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8">
                  {[
                    "Licensed General Contractor",
                    "Full Liability & Workers' Comp",
                    "8 WNC Counties",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[hsl(var(--highland-gold)/0.5)]" />
                      <span className="text-dark-section-foreground/35 text-[12px] font-body font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {/* CTA */}
              <ScrollReveal variant="rise" delay={0.45}>
                <Link
                  to="/construction"
                  className="group cta-gradient text-accent-foreground font-heading font-bold text-[13px] px-9 py-4 rounded-none inline-flex items-center gap-2.5 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden tracking-wide"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Explore the Construction Division</span>
                  <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                </Link>
              </ScrollReveal>
            </div>

            {/* Right — principle cards (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {principles.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: HIGHLAND_EASE }}
                  className="group relative bg-dark-section-foreground/[0.03] border border-dark-section-foreground/[0.06] rounded-none p-5 hover:border-[hsl(var(--highland-gold)/0.15)] transition-all duration-500"
                >
                  {/* Gold left accent on hover */}
                  <div className="absolute left-0 top-0 w-[2px] h-0 bg-[hsl(var(--highland-gold))] group-hover:h-full transition-all duration-600" />

                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-none border border-dark-section-foreground/[0.08] flex items-center justify-center flex-shrink-0 group-hover:border-[hsl(var(--highland-gold)/0.2)] transition-colors duration-300">
                      <p.icon className="w-4 h-4 text-[hsl(var(--highland-gold)/0.5)] group-hover:text-[hsl(var(--highland-gold)/0.8)] transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="text-sm font-heading font-bold text-dark-section-foreground/85 mb-1.5 tracking-tight">
                        {p.title}
                      </h3>
                      <p className="text-dark-section-foreground/35 text-[12.5px] leading-[1.7] font-body">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConstructionAuthority;
