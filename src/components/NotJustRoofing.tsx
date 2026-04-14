import { motion } from "framer-motion";
import { ArrowRight, Home, HardHat, Layers, PaintBucket, PlusSquare, TreePine } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import GoldLine from "@/components/motion/GoldLine";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const constructionCapabilities = [
  { icon: PaintBucket, label: "Siding & Exteriors" },
  { icon: PlusSquare, label: "Additions & Expansions" },
  { icon: TreePine, label: "Decks & Outdoor Living" },
  { icon: Layers, label: "Structural Improvements" },
  { icon: HardHat, label: "Full Renovations" },
];

const NotJustRoofing = () => {
  return (
    <section className="section-padding bg-secondary/40 relative overflow-hidden">
      <div className="container-tight">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — narrative */}
          <div>
            <ScrollReveal variant="fade">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-none bg-primary/8 flex items-center justify-center">
                  <Home className="w-4 h-4 text-primary" />
                </div>
                <div className="w-6 h-px bg-border" />
                <div className="w-8 h-8 rounded-none bg-[hsl(var(--highland-gold)/0.1)] flex items-center justify-center">
                  <HardHat className="w-4 h-4 text-[hsl(var(--highland-gold))]" />
                </div>
              </div>
            </ScrollReveal>

            <HeadingReveal delay={0.1}>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-5 leading-snug">
                You May Know Us for Roofing.<br className="hidden md:block" />
                There's More to the Story.
              </h2>
            </HeadingReveal>
            <GoldLine width="3rem" delay={0.3} className="mb-5" />

            <ScrollReveal variant="rise-subtle" delay={0.3}>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed font-body">
                <p>
                  Highlander was built on roofing — and that foundation isn't going anywhere. It's still
                  the core of who we are, and the standard every project is measured against.
                </p>
                <p>
                  But over the years, our clients started asking for more. A deck to match the new roof.
                  Siding that could handle the same mountain weather. An addition that needed the same
                  precision and project management we brought to their roof.
                </p>
                <p>
                  So we grew — carefully, deliberately — into a full-scope construction company. Same
                  crews. Same process. Same accountability. Just a wider range of work, delivered with
                  the craftsmanship you already trust.
                </p>
              </div>

              <Link
                to="/services"
                className="group inline-flex items-center gap-2 mt-7 text-sm font-semibold text-[hsl(var(--highland-gold))] hover:text-[hsl(var(--highland-gold)/0.8)] transition-colors font-body link-draw"
              >
                Explore All Services
                <ArrowRight className="w-3.5 h-3.5 btn-arrow-icon" />
              </Link>
            </ScrollReveal>
          </div>

          {/* Right — capabilities with visual treatment */}
          <ScrollReveal variant="slide-right" delay={0.15}>
            <div className="bg-card border border-border rounded-none overflow-hidden testimonial-hover">
              {/* Header bar */}
              <div className="px-6 py-4 border-b border-border bg-secondary/30">
                <p className="text-[10px] font-body font-semibold uppercase tracking-[0.14em] text-[hsl(var(--highland-gold))]">
                  Now Available — Construction Division
                </p>
              </div>

              {/* Capability rows */}
              <div className="divide-y divide-border">
                {constructionCapabilities.map((cap, i) => (
                  <motion.div
                    key={cap.label}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.35, ease: HIGHLAND_EASE }}
                    className="group/row flex items-center gap-4 px-6 py-4 hover:bg-secondary/20 transition-colors duration-200 dropdown-item-premium"
                  >
                    <div className="w-9 h-9 rounded-none bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center flex-shrink-0 group-hover/row:bg-[hsl(var(--highland-gold)/0.12)] transition-colors duration-200">
                      <cap.icon className="w-4 h-4 text-[hsl(var(--highland-gold)/0.6)] group-hover/row:text-[hsl(var(--highland-gold))] transition-colors duration-200" />
                    </div>
                    <span className="text-sm font-body font-medium text-foreground/80 group-hover/row:text-foreground transition-colors duration-200">
                      {cap.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Footer note */}
              <div className="px-6 py-4 border-t border-border bg-secondary/20">
                <p className="text-[11px] text-muted-foreground/50 font-body leading-relaxed">
                  All construction work is performed by Highlander's own crews under a licensed general contractor. 
                  Same team, same standards, same warranty.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default NotJustRoofing;
