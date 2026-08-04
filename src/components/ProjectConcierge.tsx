import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Calendar, FileText, Shield } from "lucide-react";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import GoldLine from "@/components/motion/GoldLine";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const pathways = [
  {
    icon: Phone,
    title: "Speak with a Specialist Just for You",
    desc: "A direct conversation with a dedicated specialist. Not a call center, not a sales rep. Someone who listens to your project and gives you straight answers.",
    action: "Call (828) 524-7773",
    href: "tel:+18285247773",
    external: true,
  },
  {
    icon: Calendar,
    title: "Schedule a Site Visit",
    desc: "We walk your property, photograph existing conditions, and deliver a written scope with transparent cost groupings. No obligation.",
    action: "Request a Consultation",
    href: "/consultation",
    external: false,
  },
  {
    icon: FileText,
    title: "Share Your Project Vision",
    desc: "Have plans, sketches, or a rough idea? Send it to us. We'll review it and call you with honest feedback rapidly.",
    action: "Start the Conversation",
    href: "/consultation",
    external: false,
  },
];

const ProjectConcierge = ({ id }: { id?: string }) => {
  return (
    <section className="relative overflow-hidden" id={id}>
      {/* Dark premium background */}
      <div className="section-padding section-dark relative">
        <div className="absolute inset-0 tartan-dark opacity-30" />

        {/* Ambient roofline SVG */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 600" preserveAspectRatio="none">
            <motion.path
              d="M0,500 L360,500 L540,380 L720,500 L1440,500"
              fill="none"
              stroke="hsl(var(--highland-gold))"
              strokeOpacity={0.04}
              strokeWidth={1}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: HIGHLAND_EASE }}
            />
          </svg>
        </div>

        <div className="container-tight relative z-10">
          {/* Header */}
          <div className="max-w-2xl mx-auto text-center mb-14 md:mb-20">
            <ScrollReveal variant="fade">
              <span className="text-[10px] font-body font-semibold uppercase tracking-[0.3em] text-[hsl(var(--highland-gold)/0.9)] mb-4 block">
                Project Concierge
              </span>
            </ScrollReveal>
            <HeadingReveal delay={0.1}>
              <h2 className="text-2xl md:text-3xl lg:text-[2.5rem] font-heading font-bold text-dark-section-foreground leading-snug mb-5 tracking-tight">
                Your Project Deserves a<br className="hidden md:block" />
                <span className="text-[hsl(var(--gold-ink))]"> Real Conversation.</span>
              </h2>
            </HeadingReveal>
            <ScrollReveal variant="rise-subtle" delay={0.2}>
              <p className="text-dark-section-foreground/95 text-[18px] md:text-[22px] leading-relaxed max-w-lg mx-auto font-bold">
                We don't do online quotes. Every project starts with a genuine
                conversation about your property, your goals, and what "done right" means to you.
              </p>
            </ScrollReveal>
            <GoldLine width="3rem" centered delay={0.3} className="mt-7" />
          </div>

          {/* Pathway cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
            {pathways.map((path, i) => (
              <motion.div
                key={path.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: HIGHLAND_EASE }}
                className="group relative bg-dark-section-foreground/[0.03] border border-dark-section-foreground/[0.06] p-7 md:p-8 hover:border-[hsl(var(--highland-gold)/0.2)] hover:bg-dark-section-foreground/[0.06] transition-all duration-500"
              >
                {/* Gold top accent on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.4)] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-600 origin-center" />

                <div className="w-11 h-11 rounded-none bg-dark-section-foreground/[0.05] flex items-center justify-center mb-5 group-hover:bg-[hsl(var(--highland-gold)/0.08)] transition-colors duration-300">
                  <path.icon className="w-5 h-5 text-[hsl(var(--highland-gold)/0.45)] group-hover:text-[hsl(var(--highland-gold)/0.8)] transition-colors duration-300" />
                </div>

                <h3 className="text-base font-heading font-bold text-dark-section-foreground/85 mb-3 tracking-tight">
                  {path.title}
                </h3>
                <p className="text-dark-section-foreground/95 text-[16px] md:text-[18px] leading-[1.7] font-body mb-6 font-medium">
                  {path.desc}
                </p>

                {path.external ? (
                  <a
                    href={path.href}
                    className="inline-flex items-center gap-2 text-[hsl(var(--gold-ink))] text-[13px] font-heading font-bold tracking-wide group-hover:text-[hsl(var(--highland-gold-light))] transition-colors duration-300"
                  >
                    {path.action}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <Link
                    to={path.href}
                    className="inline-flex items-center gap-2 text-[hsl(var(--gold-ink))] text-[13px] font-heading font-bold tracking-wide group-hover:text-[hsl(var(--highland-gold-light))] transition-colors duration-300"
                  >
                    {path.action}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          {/* Trust baseline */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex items-center justify-center gap-6 mt-12 md:mt-16"
          >
            {[
              "No sales pressure",
              "Team-led consultations",
              "Response within 24 hours",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <Shield className="w-3 h-3 text-[hsl(var(--highland-gold)/0.75)]" />
                <span className="text-[12px] font-body font-semibold text-white/95 uppercase tracking-[0.15em]">
                  {item}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectConcierge;
