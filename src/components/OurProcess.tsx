import { motion } from "framer-motion";
import { Phone, Search, FileText, Palette, HardHat, CheckCircle, Shield } from "lucide-react";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import GoldLine from "@/components/motion/GoldLine";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const steps = [
  {
    number: "01",
    icon: Phone,
    title: "Initial Conversation",
    description: "Tell us about your property, your timeline, and what's keeping you up at night. We listen first, recommend second. Fifteen minutes tells us everything we need to schedule a site visit.",
    detail: "No obligation · No sales pressure · 15 minutes",
  },
  {
    number: "02",
    icon: Search,
    title: "Property Assessment",
    description: "We walk every surface, photograph existing conditions, take measurements, and identify issues invisible from the ground. Drone inspection included when necessary.",
    detail: "Full photo documentation · Drone inspection when warranted",
  },
  {
    number: "03",
    icon: FileText,
    title: "Written Scope & Pricing",
    description: "A detailed proposal with transparent cost groupings, material specifications, and a realistic timeline. You'll know exactly what you're paying for before a single nail is driven.",
    detail: "Line-item transparency · Material specs · No hidden costs",
  },
  {
    number: "04",
    icon: Palette,
    title: "Material & Design Selection",
    description: "Physical samples, design consultation, and performance data for your elevation. Every choice informed by your home's layout and WNC's specific weather conditions.",
    detail: "In-person samples · Climate-matched recommendations",
  },
  {
    number: "05",
    icon: HardHat,
    title: "Precision Execution",
    description: "Documented procedures, property protection, daily progress updates from your named contact. Your property stays clean, your neighbors stay happy, and you know what's happening every day.",
    detail: "Named project contact · Daily updates · Jobsite maintained",
  },
  {
    number: "06",
    icon: CheckCircle,
    title: "Final Walkthrough",
    description: "We inspect every detail together. If anything doesn't meet our standard, we fix it before we leave — not after you call to complain.",
    detail: "Joint inspection · Same-day punch list · Photo record",
  },
  {
    number: "07",
    icon: Shield,
    title: "Warranty Delivery & Ongoing Support",
    description: "Your warranty package is physically handed to you — manufacturer coverage, labor protection, and maintenance guidance. Plus direct access to our team for as long as you own the property.",
    detail: "Physical warranty package · Ongoing access · Maintenance guidance",
  },
];

const OurProcess = () => {
  return (
    <section className="section-padding section-dark relative overflow-hidden">
      {/* Tartan texture */}
      <div className="absolute inset-0 tartan-dark opacity-25" />

      <div className="container-tight relative z-10">
        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <ScrollReveal variant="fade">
            <span className="text-[10px] font-body font-semibold uppercase tracking-[0.3em] text-[hsl(var(--highland-gold)/0.6)] mb-4 block">
              Our Process — 7 Phases
            </span>
          </ScrollReveal>
          <HeadingReveal delay={0.1}>
            <h2 className="text-2xl md:text-3xl lg:text-[2.5rem] font-heading font-bold text-dark-section-foreground leading-snug mb-5 tracking-tight">
              Every Project Follows<br className="hidden md:block" />
              <span className="text-[hsl(var(--highland-gold))]"> the Same Documented Path.</span>
            </h2>
          </HeadingReveal>
          <ScrollReveal variant="rise-subtle" delay={0.25}>
            <p className="text-dark-section-foreground/60 max-w-xl mx-auto text-[15px] md:text-lg font-body leading-relaxed">
              Consistent quality requires a consistent process. Every phase is documented,
              every decision is yours, and every detail is accountable to one standard.
            </p>
          </ScrollReveal>
          <GoldLine width="3rem" centered delay={0.35} className="mt-7" />
        </div>

        {/* Timeline — vertical with connected line */}
        <div className="relative max-w-3xl mx-auto">
          {/* Animated vertical gold line */}
          <motion.div
            className="absolute left-5 md:left-7 top-0 w-px"
            style={{ background: "linear-gradient(to bottom, hsl(var(--highland-gold) / 0.05), hsl(var(--highland-gold) / 0.3), hsl(var(--highland-gold) / 0.05))" }}
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 3, ease: HIGHLAND_EASE }}
          />

          <div className="space-y-2 md:space-y-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: HIGHLAND_EASE }}
                className="relative flex gap-5 md:gap-8 group"
              >
                {/* Number node */}
                <div className="relative z-10 flex-shrink-0">
                  <motion.div
                    className="w-10 h-10 md:w-14 md:h-14 rounded-none border border-dark-section-foreground/[0.08] bg-[hsl(var(--dark-section))] flex items-center justify-center group-hover:border-[hsl(var(--highland-gold)/0.3)] transition-all duration-500"
                    whileInView={{ scale: [0.8, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.15, duration: 0.4, ease: HIGHLAND_EASE }}
                  >
                    <span className="text-[11px] md:text-sm font-heading font-bold text-[hsl(var(--highland-gold)/0.5)] group-hover:text-[hsl(var(--highland-gold)/0.9)] transition-colors duration-300">
                      {step.number}
                    </span>
                  </motion.div>
                  {/* Gold dot connector */}
                  <div className="absolute -bottom-2 md:-bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[hsl(var(--highland-gold)/0.2)] group-hover:bg-[hsl(var(--highland-gold)/0.5)] transition-colors duration-300" />
                </div>

                {/* Card content */}
                <div className="flex-1 pb-6 md:pb-8">
                  <div className="bg-dark-section-foreground/[0.06] border border-dark-section-foreground/[0.12] rounded-none p-6 md:p-8 group-hover:border-[hsl(var(--highland-gold)/0.35)] group-hover:bg-dark-section-foreground/[0.08] transition-all duration-500 border-shimmer overflow-hidden">
                    {/* Icon + title */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-none bg-dark-section-foreground/[0.06] flex items-center justify-center group-hover:bg-[hsl(var(--highland-gold)/0.08)] transition-colors duration-300">
                        <step.icon className="w-3.5 h-3.5 text-[hsl(var(--highland-gold)/0.45)] group-hover:text-[hsl(var(--highland-gold)/0.8)] transition-colors duration-300" />
                      </div>
                      <h3 className="text-sm md:text-base font-heading font-bold text-dark-section-foreground/85 tracking-tight">
                        {step.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-dark-section-foreground/65 text-[13px] md:text-sm leading-[1.75] font-body mb-4 font-bold">
                      {step.description}
                    </p>

                    {/* Detail strip */}
                    <div className="pt-3 border-t border-dark-section-foreground/[0.04]">
                      <span className="text-[10px] font-body text-dark-section-foreground/40 tracking-wide">
                        {step.detail}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom promise + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6, ease: HIGHLAND_EASE }}
          className="text-center mt-12 md:mt-16"
        >
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-[hsl(var(--highland-gold)/0.3)]" />
            <span className="text-[10px] font-body font-bold uppercase tracking-[0.25em] text-dark-section-foreground/25">
              Roofing · Construction · Design & Planning
            </span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-[hsl(var(--highland-gold)/0.3)]" />
          </div>

          <div>
            <Link
              to="/consultation"
              className="group cta-gradient text-accent-foreground font-body font-bold text-base px-10 py-4.5 rounded-none inline-flex items-center gap-3 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden tracking-[0.1em] uppercase shadow-xl"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">Start Your Project</span>
              <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-[11px] text-dark-section-foreground/20 font-body mt-4">
              It starts with a 15-minute call. No commitment required.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurProcess;
