import { motion } from "framer-motion";
import { ArrowRight, Home, HardHat, Layers, PaintBucket, PlusSquare, TreePine } from "lucide-react";
import { Link } from "react-router-dom";

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-sm bg-primary/8 flex items-center justify-center">
                <Home className="w-4 h-4 text-primary" />
              </div>
              <div className="w-6 h-px bg-border" />
              <div className="w-8 h-8 rounded-sm bg-[hsl(var(--highland-gold)/0.1)] flex items-center justify-center">
                <HardHat className="w-4 h-4 text-[hsl(var(--highland-gold))]" />
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-5 leading-snug">
              You May Know Us for Roofing.<br className="hidden md:block" />
              There's More to the Story.
            </h2>

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
              className="group inline-flex items-center gap-2 mt-7 text-sm font-semibold text-[hsl(var(--highland-gold))] hover:text-[hsl(var(--highland-gold)/0.8)] transition-colors font-body"
            >
              Explore All Services
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right — capabilities with visual treatment */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-card border border-border rounded-sm overflow-hidden">
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
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.35 }}
                    className="group flex items-center gap-4 px-6 py-4 hover:bg-secondary/20 transition-colors duration-200"
                  >
                    <div className="w-9 h-9 rounded-sm bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center flex-shrink-0 group-hover:bg-[hsl(var(--highland-gold)/0.12)] transition-colors duration-200">
                      <cap.icon className="w-4 h-4 text-[hsl(var(--highland-gold)/0.6)]" />
                    </div>
                    <span className="text-sm font-body font-medium text-foreground/80">{cap.label}</span>
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NotJustRoofing;
