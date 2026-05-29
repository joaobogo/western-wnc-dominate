import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, HardHat, Mountain } from "lucide-react";


/**
 * Three Pillars. One Standard.
 *
 * Resolves the roofing-vs-construction question for visitors in a single block.
 * Roofing is framed as the proven authority. Construction is framed as the
 * disciplined extension of the same team, owner, and standard.
 *
 * Placement: between TrustStrip and ThreeDivisionPathway on the homepage.
 */
const ThreePillars = () => {
  return (
    <section className="bg-background py-20 md:py-32 relative overflow-hidden">
      {/* Subtle Heritage Tartan Watermark */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none" style={{ 
        backgroundImage: "url('/tartan.png')",
        backgroundSize: "400px auto"
      }} />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 opacity-[0.03] pointer-events-none hidden lg:block">
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200" alt="Mountain architecture" className="w-full h-full object-cover grayscale opacity-50" />
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
            <span className="text-[10px] md:text-[11px] font-body font-bold uppercase tracking-[0.3em] text-[hsl(var(--highland-gold))]">
              Roofing · Construction · Design
            </span>
            <div className="w-8 h-px bg-[hsl(var(--highland-gold))]" />
          </div>

          {/* Pillar icons */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 mb-10">
            <div className="flex flex-col items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center mb-1">
                <Home className="w-5 h-5 text-primary" />
              </div>
              <span className="text-[11px] md:text-xs font-body font-bold uppercase tracking-[0.2em] text-foreground/90">
                Roofing
              </span>
            </div>
            <div className="w-6 md:w-12 h-px bg-foreground/10" />
            <div className="flex flex-col items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[hsl(var(--highland-gold)/0.05)] flex items-center justify-center mb-1">
                <HardHat className="w-5 h-5 text-[hsl(var(--highland-gold))]" />
              </div>
              <span className="text-[11px] md:text-xs font-body font-bold uppercase tracking-[0.2em] text-foreground/90">
                Construction
              </span>
            </div>
            <div className="w-6 md:w-12 h-px bg-foreground/10" />
            <div className="flex flex-col items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-accent/5 flex items-center justify-center mb-1 text-accent">
                <Mountain className="w-5 h-5" />
              </div>
              <span className="text-[11px] md:text-xs font-body font-bold uppercase tracking-[0.2em] text-foreground/90">
                Design & Planning
              </span>
            </div>
          </div>

          {/* Statement */}
          <p className="font-heading text-[1.75rem] md:text-[2.25rem] lg:text-[2.75rem] leading-[1.2] tracking-[-0.015em] text-foreground max-w-4xl mx-auto font-bold">
            Highlander is built on mountain-grade <Link to="/roofing" className="hover:text-primary transition-colors underline decoration-primary/30 underline-offset-[6px]">roofing authority</Link>. We carry that same owner-led discipline into <Link to="/construction" className="hover:text-[hsl(var(--highland-gold))] transition-colors underline decoration-[hsl(var(--highland-gold)/0.3)] underline-offset-[6px]">additions and outdoor living</Link> and <Link to="/layouts-planning" className="hover:text-accent transition-colors underline decoration-accent/30 underline-offset-[6px]">Design & Planning</Link> — ensuring every project is intelligently mapped before the first board is cut.
          </p>


        </motion.div>
      </div>
    </section>
  );
};

export default ThreePillars;