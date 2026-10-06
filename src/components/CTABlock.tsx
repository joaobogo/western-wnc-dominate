import { COUNTY_COUNT, PHONE_DISPLAY, PHONE_TEL, REVIEW_STARS } from "@/data/business";
import { Link, useLocation } from "react-router-dom";
import { getPagePrimaryAction } from "@/lib/page-cta-hierarchy";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Shield, Award, Clock, Mountain, CheckCircle2 } from "lucide-react";
import CTAProofPoints from "@/components/trust/CTAProofPoints";
import { trackEvent } from "@/lib/analytics";
import HeadingReveal from "@/components/motion/HeadingReveal";
import { ScrollReveal } from "@/components/motion";
import GoldLine from "@/components/motion/GoldLine";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CRAFT_EASE = [0.25, 0.1, 0.25, 1] as any;

const promises = [
  "A written scope before work begins",
  "Pricing and material direction documented for the project",
  "A defined Highlander contact for project questions",
  "Project-specific warranty terms reviewed in writing",
];

const CTABlock = () => {
  // Money pages lead with the phone (João, 2026-09-08). The estimate path is
  // never removed — it just becomes the secondary button.
  const { pathname } = useLocation();
  const callIsPrimary = getPagePrimaryAction(pathname).intent === "call";

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
          transition={{ duration: 0.4, ease: CRAFT_EASE }}
        />

        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[hsl(var(--highland-gold)/0.025)] rounded-full blur-[150px] pointer-events-none" />

        <div className="section-padding">
          <div className="container-tight relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              {/* Eyebrow */}
              <ScrollReveal variant="fade">
                <span className="text-caption font-body font-semibold uppercase tracking-[0.3em] text-[hsl(var(--highland-gold)/0.6)] mb-6 block">
                  The Next Step
                </span>
              </ScrollReveal>

              {/* Headline — emotional weight */}
              <HeadingReveal delay={0.1}>
                <h2 className="text-heading-sm md:text-heading-lg lg:text-heading-lg font-heading font-bold mb-6 md:mb-8 leading-[1.06] tracking-[-0.02em] text-dark-section-foreground">
                  One conversation.<br />
                  <span className="text-[hsl(var(--gold-ink))]">One local team.</span>
                </h2>
              </HeadingReveal>

              {/* Subtext — calm authority */}
              <ScrollReveal variant="rise-subtle" delay={0.3}>
                <p className="text-dark-section-muted text-body-sm md:text-body-sm max-w-xl mx-auto mb-10 md:mb-14 font-body leading-[1.75]">
                  Tell us about your property. A Highlander project advisor reviews the request during staffed business hours and follows up with a clear next step.
                </p>
              </ScrollReveal>

              {/* CTA Buttons */}
              <ScrollReveal variant="rise" delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 md:mb-16">
                  {callIsPrimary ? (
                    <>
                      <a
                        href={PHONE_TEL}
                        className="group cta-gradient cta-glow text-accent-foreground font-body font-bold text-base md:text-lg px-10 md:px-16 py-4 md:py-5 rounded-none inline-flex items-center justify-center gap-3 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden tracking-[0.1em] uppercase shadow-floating min-h-[60px]"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        <Phone className="w-4 h-4 relative" aria-hidden="true" />
                        <span className="relative">Call {PHONE_DISPLAY}</span>
                      </a>
                      <Link
                        to="/request-inspection"
                        onClick={() => trackEvent("cta_click", { label: "Start Your Project", elementId: "cta-block-start" })}
                        className="btn btn-secondary btn-lg btn-on-dark group md:text-lg md:px-12 md:py-5"
                      >
                        Start Your Project
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" aria-hidden="true" />
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/request-inspection"
                        onClick={() => trackEvent("cta_click", { label: "Start Your Project", elementId: "cta-block-start" })}
                        className="group cta-gradient cta-glow text-accent-foreground font-body font-bold text-base md:text-lg px-10 md:px-16 py-4 md:py-5 rounded-none inline-flex items-center justify-center gap-3 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden tracking-[0.1em] uppercase shadow-floating min-h-[60px]"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        <span className="relative">Start Your Project</span>
                        <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1.5 transition-transform" aria-hidden="true" />
                      </Link>
                      <a
                        href={PHONE_TEL}
                        className="btn btn-secondary btn-lg btn-on-dark group md:text-lg md:px-12 md:py-5"
                      >
                        <Phone className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
                        Speak With a Project Advisor
                      </a>
                    </>
                  )}
                </div>
                <CTAProofPoints tone="dark" className="-mt-6 mb-12 md:mb-14" />
              </ScrollReveal>

              {/* ── Promise list ── */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.4, ease: HIGHLAND_EASE }}
                className="max-w-md mx-auto mb-12 md:mb-14"
              >
                <p className="text-caption font-body font-bold uppercase tracking-[0.25em] text-dark-section-foreground/20 mb-5 text-center">
                  Our Promise to You
                </p>
                <div className="space-y-3">
                  {promises.map((promise, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.06, duration: 0.35, ease: HIGHLAND_EASE }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[hsl(var(--highland-gold)/0.45)] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-dark-section-foreground text-body-xs font-body leading-relaxed">
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
                transition={{ delay: 0.3, duration: 0.4 }}
                className="pt-8 border-t border-dark-section-foreground/[0.05]"
              >
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                  {[
                    { icon: Shield, text: "Licensed NC General Contractor" },
                    { icon: Award, text: "CertainTeed Credentialed Contractor" },
                    { icon: Shield, text: "VELUX Certified Installer" },
                    { icon: Clock, text: "Storm Damage Assessment" },
                    { icon: Mountain, text: `${COUNTY_COUNT} WNC Counties` },
                  ].map((item, i) => (
                    <motion.div
                      key={item.text}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                      className="flex items-center gap-2"
                    >
                      <item.icon className="w-3.5 h-3.5 text-[hsl(var(--highland-gold)/0.35)]" />
                      <span className="text-dark-section-foreground/22 text-caption font-body font-medium">
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
            <p className="text-primary-foreground text-body-xs font-body text-center md:text-left">
              <span className="text-primary-foreground font-heading font-bold">{`${REVIEW_STARS} rated.`}</span>{" "}
              Roofing & Construction across Western NC since 2017.
            </p>
            <div className="flex items-center gap-4">
              <Link
                to="/request-inspection"
                className="group inline-flex items-center gap-2 text-primary-foreground font-heading font-bold text-body-xs uppercase tracking-[0.15em] hover:text-primary-foreground transition-colors"
              >
                Roofing
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <div className="w-px h-3 bg-primary-foreground/10" />
              <Link
                to="/request-inspection?context=construction_cta&type=construction"
                className="group inline-flex items-center gap-2 text-[hsl(var(--gold-ink))] font-heading font-bold text-body-xs uppercase tracking-[0.15em] hover:text-[hsl(var(--highland-gold-light))] transition-colors"
              >
                Construction
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
        {/* Gold bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.4)] to-transparent" />
      </div>
    </section>
  );
};

export default CTABlock;