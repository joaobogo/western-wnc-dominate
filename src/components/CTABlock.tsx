import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Shield, Clock, Award, Mountain } from "lucide-react";
import HeadingReveal from "@/components/motion/HeadingReveal";
import { ScrollReveal } from "@/components/motion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CRAFT_EASE = [0.25, 0.1, 0.25, 1] as any;

/* Mountain silhouette path for background */
const mountainBg = "M0,200 Q100,140 200,165 Q300,190 400,120 Q500,50 600,90 Q700,130 800,60 Q900,10 1000,50 Q1100,90 1200,30 L1200,200 Z";

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

      {/* Mountain silhouette background — subtle depth */}
      <svg className="absolute bottom-0 left-0 w-full h-[40%] opacity-[0.03] pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1200 200">
        <motion.path
          d={mountainBg}
          fill="hsl(var(--highland-gold))"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.5 }}
        />
      </svg>

      {/* Floating golden accent orb */}
      <div className="absolute top-1/4 right-[15%] w-64 h-64 bg-[hsl(var(--highland-gold)/0.03)] rounded-full blur-[100px] pointer-events-none" style={{ animation: 'slowFloat 12s ease-in-out infinite' }} />

      <div className="section-padding">
        <div className="container-tight relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal variant="fade">
              <span className="eyebrow mb-6 block text-[hsl(var(--highland-gold))]">Built for These Mountains. Built for You.</span>
            </ScrollReveal>

            <HeadingReveal delay={0.1}>
              <h2 className="text-[1.75rem] md:text-[2.75rem] lg:text-5xl font-heading font-bold mb-6 md:mb-7 leading-[1.08] tracking-[-0.02em]">
                Stop Comparing Quotes.<br className="hidden md:block" /> Start Choosing a Partner.
              </h2>
            </HeadingReveal>

            <ScrollReveal variant="rise-subtle" delay={0.3}>
              <p className="text-dark-section-foreground/40 text-[15px] md:text-lg max-w-xl mx-auto mb-10 md:mb-14 font-body leading-[1.7]">
                The right contractor doesn't just give you a price — they protect your investment, 
                manage every detail, and deliver work that holds up for decades. That conversation 
                starts with one phone call.
              </p>
            </ScrollReveal>

            {/* CTA buttons */}
            <ScrollReveal variant="rise" delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-10 md:mb-14">
                <Link
                  to="/request-inspection"
                  className="group cta-gradient text-accent-foreground font-heading font-bold text-[14px] md:text-[15px] px-10 md:px-12 py-[14px] md:py-5 rounded-none inline-flex items-center justify-center gap-2.5 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden tracking-wide min-h-[52px]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Start Your Project</span>
                  <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="tel:8283979211"
                  className="group border border-dark-section-foreground/10 text-dark-section-foreground font-medium text-[14px] md:text-base px-8 py-[14px] md:py-4 rounded-none inline-flex items-center justify-center gap-2.5 hover:bg-dark-section-foreground/5 hover:border-[hsl(var(--highland-gold)/0.2)] transition-all duration-300 min-h-[52px]"
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
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-8 border-t border-dark-section-foreground/6">
            >
              {[
                { icon: Shield, text: "Licensed & Insured" },
                { icon: Award, text: "CertainTeed Certified" },
                { icon: Clock, text: "24-Hour Response" },
                { icon: Mountain, text: "All of Western NC" },
              ].map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + i * 0.08 }}
                  className="flex items-center gap-2"
                >
                  <item.icon className="w-3.5 h-3.5 text-[hsl(var(--highland-gold)/0.4)]" />
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
