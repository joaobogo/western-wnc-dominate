import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
    <section className="bg-background py-14 md:py-24 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 opacity-[0.03] pointer-events-none hidden lg:block">
        <img src="https://images.unsplash.com/photo-1518005020251-58296d87ba60?auto=format&fit=crop&q=80&w=800" alt="Mountain architecture" className="w-full h-full object-cover grayscale" />
      </div>
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
            <div className="w-8 md:w-16 h-px bg-foreground/15" />
            <div className="flex flex-col items-center gap-2">
              <HardHat className="w-5 h-5 md:w-6 md:h-6 text-foreground/60" />
              <span className="text-[10px] md:text-xs font-body font-semibold uppercase tracking-[0.18em] text-foreground/60">
                Construction
              </span>
            </div>
            <div className="w-8 md:w-16 h-px bg-foreground/15 hidden sm:block" />
            <div className="hidden sm:flex flex-col items-center gap-2 opacity-60">
              <div className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center border border-foreground/30 rounded-full">
                <span className="text-[8px] font-bold">DP</span>
              </div>
              <span className="text-[10px] md:text-xs font-body font-semibold uppercase tracking-[0.18em]">
                Design Support
              </span>
            </div>
          </div>

          {/* Statement */}
          <p className="font-heading text-[1.35rem] md:text-[1.75rem] lg:text-[2rem] leading-[1.35] tracking-[-0.01em] text-foreground max-w-3xl mx-auto">
            Highlander is built on mountain-grade <Link to="/roofing" className="hover:text-primary transition-colors underline decoration-primary/20 underline-offset-4">roofing authority</Link>. We carry that same owner-led discipline into <Link to="/construction" className="hover:text-[hsl(var(--highland-gold))] transition-colors underline decoration-[hsl(var(--highland-gold)/0.2)] underline-offset-4">additions, outdoor living</Link>, and our{" "}
            <Link to="/layouts-planning" className="text-[hsl(var(--highland-gold))] hover:underline underline-offset-4 decoration-[hsl(var(--highland-gold)/0.4)] transition-all">Design & Planning branch</Link> — ensuring every project is intelligently mapped before the first board is cut.
          </p>


        </motion.div>
      </div>
    </section>
  );
};

export default TwoPillars;