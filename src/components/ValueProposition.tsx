import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

const valuePoints = [
  "Certified materials specified for your property's elevation, wind exposure, and climate zone",
  "Written scope of work with transparent, line-item pricing — no hidden fees, no ambiguity",
  "Full labor and material warranties — documented, delivered, and backed by our name",
  "Named project contact with daily updates — you'll never chase us for information",
  "Final walkthrough inspection before any project is considered complete",
];

const ValueProposition = () => {
  return (
    <section className="section-padding section-dark tartan-dark relative overflow-hidden">
      <div className="container-tight relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Copy side */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[10px] font-body font-semibold uppercase tracking-[0.25em] text-[hsl(var(--highland-gold))] mb-5 block">
                The Highlander Difference
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-dark-section-foreground leading-snug mb-5">
                The Cheapest Bid<br />
                Is the Most Expensive Mistake.
              </h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mb-6" />
              <p className="text-dark-section-foreground/55 text-sm md:text-base leading-relaxed font-body mb-4">
                A lower number on paper almost always means lower-grade underlayment, less experienced 
                crews, and warranty language that won't hold up when you actually need it. The real cost 
                shows up two winters later — in ice dam leaks, flashing failures, and another round of repairs.
              </p>
              <p className="text-dark-section-foreground/55 text-sm md:text-base leading-relaxed font-body">
                Highlander builds for the next 30 years, not the next inspection. We specify materials 
                certified for your elevation and climate zone, document every phase of work, and stand behind 
                craftsmanship that doesn't need to be redone. That's not a higher price — it's a lower 
                total cost of ownership.
              </p>
            </motion.div>

            {/* Value list side */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="bg-dark-section-foreground/[0.04] border border-dark-section-foreground/8 rounded-none p-6 md:p-8">
                <h3 className="text-base font-heading font-semibold text-dark-section-foreground mb-5">
                  What Your Investment Includes
                </h3>
                <div className="space-y-4">
                  {valuePoints.map((point, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="w-4 h-4 text-[hsl(var(--highland-gold))] flex-shrink-0 mt-0.5" />
                      <span className="text-dark-section-foreground/70 text-sm font-body leading-relaxed">
                        {point}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-7 pt-6 border-t border-dark-section-foreground/8">
                  <Link
                    to="/request-inspection"
                    className="group cta-gradient text-accent-foreground font-semibold text-sm px-6 py-3.5 rounded-none inline-flex items-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden w-full justify-center"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <span className="relative">Discuss Your Project</span>
                    <ArrowRight className="w-3.5 h-3.5 relative group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
