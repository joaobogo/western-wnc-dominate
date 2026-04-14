import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Shield, Award, Clock, Mountain, CheckCircle2 } from "lucide-react";
import HeadingReveal from "@/components/motion/HeadingReveal";
import { ScrollReveal } from "@/components/motion";
import GoldLine from "@/components/motion/GoldLine";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CRAFT_EASE = [0.25, 0.1, 0.25, 1] as any;

const promises = [
  "No high-pressure sales tactics — ever",
  "Transparent pricing with written scope before work begins",
  "A named project contact who answers your calls",
  "Full warranty documentation delivered at walkthrough",
];

const CTABlock = () => {
  return (
    <section className="relative overflow-hidden">
      {/* ═══ PART 1: Emotional Close (Dark) ═══ */}
      <div className="section-dark tartan-dark relative">
        {/* Top gold line */}
        <motion.div
          className="absolute top-0 left-0 w-full h-px"
          style={{ background: 'linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.5), hsl(var(--highland-gold) / 0))' }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: CRAFT_EASE }}
        />

        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[hsl(var(--highland-gold)/0.025)] rounded-full blur-[150px] pointer-events-none" />

        <div className="section-padding">
          <div className="container-tight relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              {/* Eyebrow */}
              <ScrollReveal variant="fade">
                <span className="text-[10px] font-body font-semibold uppercase tracking-[0.3em] text-[hsl(var(--highland-gold)/0.6)] mb-6 block">
                  Your Property Deserves This
                </span>
              </ScrollReveal>

              {/* Headline — emotional weight */}
              <HeadingReveal delay={0.1}>
                <h2 className="text-[1.75rem] md:text-[2.75rem] lg:text-[3.25rem] font-heading font-bold mb-6 md:mb-8 leading-[1.06] tracking-[-0.02em] text-dark-section-foreground">
                  Stop Comparing Quotes.<br />
                  <span className="text-[hsl(var(--highland-gold))]">Start Choosing a Partner.</span>
                </h2>
              </HeadingReveal>

              {/* Subtext — calm authority */}
              <ScrollReveal variant="rise-subtle" delay={0.3}>
                <p className="text-dark-section-foreground/38 text-[15px] md:text-[17px] max-w-xl mx-auto mb-10 md:mb-14 font-body leading-[1.75]">
                  The right contractor doesn't just give you a number — they protect your investment,
                  manage every detail, and deliver work that holds up for decades.
                  That conversation starts with one call.
                </p>
              </ScrollReveal>

              {/* CTA Buttons */}
              <ScrollReveal variant="rise" delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 md:mb-16">
                  <Link
                    to="/request-inspection"
                    className="group cta-gradient text-accent-foreground font-heading font-bold text-[14px] md:text-[15px] px-10 md:px-14 py-[15px] md:py-5 rounded-none inline-flex items-center justify-center gap-2.5 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden tracking-wide min-h-[54px]"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <span className="relative">Request Your Consultation</span>
                    <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a
                    href="tel:8283979211"
                    className="group border border-dark-section-foreground/8 text-dark-section-foreground font-heading font-medium text-[14px] px-8 py-[15px] md:py-4 rounded-none inline-flex items-center justify-center gap-2.5 hover:bg-dark-section-foreground/[0.04] hover:border-[hsl(var(--highland-gold)/0.2)] transition-all duration-300 min-h-[54px]"
                  >
                    <Phone className="w-4 h-4 text-[hsl(var(--highland-gold)/0.5)]" />
                    (828) 397-9211
                  </a>
                </div>
              </ScrollReveal>

              {/* ── Promise list ── */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6, ease: HIGHLAND_EASE }}
                className="max-w-md mx-auto mb-12 md:mb-14"
              >
                <p className="text-[10px] font-body font-bold uppercase tracking-[0.25em] text-dark-section-foreground/20 mb-5 text-center">
                  Our Promise to You
                </p>
                <div className="space-y-3">
                  {promises.map((promise, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + i * 0.06, duration: 0.35, ease: HIGHLAND_EASE }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[hsl(var(--highland-gold)/0.45)] flex-shrink-0 mt-0.5" />
                      <span className="text-dark-section-foreground/40 text-[13px] font-body leading-relaxed">
                        {promise}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* ── Closing trust strip ── */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="pt-8 border-t border-dark-section-foreground/[0.05]"
              >
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                  {[
                    { icon: Shield, text: "Licensed & Fully Insured" },
                    { icon: Award, text: "CertainTeed Master Applicator" },
                    { icon: Clock, text: "24-Hour Storm Response" },
                    { icon: Mountain, text: "8 WNC Counties" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.text}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.9 + i * 0.08 }}
                      className="flex items-center gap-2"
                    >
                      <item.icon className="w-3.5 h-3.5 text-[hsl(var(--highland-gold)/0.35)]" />
                      <span className="text-dark-section-foreground/22 text-[11px] font-body font-medium">
                        {item.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ PART 2: Final confidence strip ═══ */}
      <div className="bg-primary relative">
        <div className="container-tight px-6 md:px-10 py-5 md:py-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/50 text-[13px] font-body text-center md:text-left">
              <span className="text-primary-foreground/80 font-heading font-bold">500+ projects.</span>{" "}
              <span className="text-primary-foreground/80 font-heading font-bold">4.7★ rated.</span>{" "}
              Serving Western NC since 2017.
            </p>
            <Link
              to="/request-inspection"
              className="group inline-flex items-center gap-2 text-[hsl(var(--highland-gold))] font-heading font-bold text-[12px] uppercase tracking-[0.15em] hover:text-[hsl(var(--highland-gold-light))] transition-colors"
            >
              Get Started
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
        {/* Gold bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.4)] to-transparent" />
      </div>
    </section>
  );
};

export default CTABlock;
