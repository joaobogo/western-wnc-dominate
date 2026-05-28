import { motion } from "framer-motion";
import { Home, HardHat } from "lucide-react";

/**
 * Two Pillars. One Standard.
 *
 * Resolves the roofing-vs-construction question for visitors in a single block.
 * Roofing is framed as the proven authority. Construction is framed as the
 * disciplined extension of the same team, owner, and standard.
 *
 * Placement: between TrustStrip and DualPathway on the homepage.
 */
const TwoPillars = () => {
  return (
    <section className="bg-background py-14 md:py-20">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-[hsl(var(--highland-gold))]" />
            <span className="text-[10px] md:text-[11px] font-body font-semibold uppercase tracking-[0.3em] text-[hsl(var(--highland-gold))]">
              Two Pillars · One Standard
            </span>
            <div className="w-8 h-px bg-[hsl(var(--highland-gold))]" />
          </div>

          {/* Pillar icons */}
          <div className="flex items-center justify-center gap-6 md:gap-10 mb-8">
            <div className="flex flex-col items-center gap-2">
              <Home className="w-5 h-5 md:w-6 md:h-6 text-foreground/60" />
              <span className="text-[10px] md:text-xs font-body font-semibold uppercase tracking-[0.18em] text-foreground/60">
                Roofing
              </span>
            </div>
            <div className="w-12 md:w-20 h-px bg-foreground/15" />
            <div className="flex flex-col items-center gap-2">
              <HardHat className="w-5 h-5 md:w-6 md:h-6 text-foreground/60" />
              <span className="text-[10px] md:text-xs font-body font-semibold uppercase tracking-[0.18em] text-foreground/60">
                Construction
              </span>
            </div>
          </div>

          {/* Statement */}
          <p className="font-heading text-[1.35rem] md:text-[1.75rem] lg:text-[2rem] leading-[1.35] tracking-[-0.01em] text-foreground max-w-3xl mx-auto">
            Highlander began as a roofing company and remains Western North Carolina&apos;s
            most disciplined roofing team. The same crew, same owner, and same standard
            now lead our construction work —{" "}
            <span className="text-[hsl(var(--highland-gold))]">additions, outdoor living, and our Design & Planning branch</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TwoPillars;