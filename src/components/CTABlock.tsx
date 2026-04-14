import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Shield, Clock, Award, Mountain } from "lucide-react";
import HeadingReveal from "@/components/motion/HeadingReveal";
import { ScrollReveal } from "@/components/motion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CRAFT_EASE = [0.25, 0.1, 0.25, 1] as any;

const CTABlock = () => {
  return (
    <section className="section-dark tartan-dark relative overflow-hidden">
      {/* Gold accent line — animated draw */}
      <motion.div
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: 'linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.6), hsl(var(--highland-gold) / 0))' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: CRAFT_EASE }}
      />

      <div className="section-padding">
        <div className="container-tight relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal variant="fade">
              <span className="eyebrow mb-5 block text-[hsl(var(--highland-gold))]">Built for These Mountains. Built for You.</span>
            </ScrollReveal>

            <HeadingReveal delay={0.1}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-[1.1]">
                One Team. One Standard.<br className="hidden md:block" /> Every Project, Every Time.
              </h2>
            </HeadingReveal>

            <ScrollReveal variant="rise-subtle" delay={0.3}>
              <p className="text-dark-section-foreground/45 text-base md:text-lg max-w-xl mx-auto mb-10 font-body leading-relaxed">
                From ridge caps to renovations, Highlander brings the same discipline, the same crews, 
                and the same accountability to every property we touch. This is how mountain 
                construction should be done.
              </p>
            </ScrollReveal>

            {/* CTA buttons */}
            <ScrollReveal variant="rise" delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link
                  to="/request-inspection"
                  className="group cta-gradient text-accent-foreground font-heading font-bold text-base px-10 py-4.5 rounded-sm inline-flex items-center justify-center gap-2.5 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden tracking-wide"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Begin Your Project</span>
                  <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="tel:8283979211"
                  className="group border border-dark-section-foreground/12 text-dark-section-foreground font-medium text-base px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2.5 hover:bg-dark-section-foreground/5 hover:border-dark-section-foreground/20 transition-all duration-200"
                >
                  <Phone className="w-4 h-4 text-[hsl(var(--highland-gold)/0.5)]" />
                  (828) 397-9211
                </a>
              </div>
            </ScrollReveal>

            {/* Closing trust strip */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5, ease: HIGHLAND_EASE }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 pt-8 border-t border-dark-section-foreground/6"
            >
              {[
                { icon: Shield, text: "Licensed & Insured" },
                { icon: Award, text: "CertainTeed Certified" },
                { icon: Clock, text: "24-Hour Response" },
                { icon: Mountain, text: "Serving All of WNC" },
              ].map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + i * 0.08 }}
                  className="flex items-center gap-2"
                >
                  <item.icon className="w-3.5 h-3.5 text-[hsl(var(--highland-gold)/0.35)]" />
                  <span className="text-dark-section-foreground/25 text-xs font-body font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABlock;
