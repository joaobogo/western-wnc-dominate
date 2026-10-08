import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Gem, MessageSquare, TrendingUp, Mountain, ClipboardCheck, Ruler } from "lucide-react";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import GoldLine from "@/components/motion/GoldLine";
import { useRef } from "react";
import { COUNTY_COUNT } from "@/data/business";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const pillars = [
  {
    icon: Gem,
    number: "01",
    title: "No Shortcuts at Any Elevation",
    copy: "Roofing details are scoped for the actual system, access, and mountain exposure on your property, with a named Highlander project contact responsible for communication and follow-through.",
    detail: "Material-specific planning · CertainTeed ShingleMaster PREMIER Credentialed Contractor · Final walkthrough",
  },
  {
    icon: MessageSquare,
    number: "02",
    title: "You'll Never Chase Us for an Update",
    copy: "A named project contact and written scope create a clear place for questions, updates, and documented project decisions before and during the work.",
    detail: "Named contact · Written scope · Daily progress · Pre-start documentation",
  },
  {
    icon: TrendingUp,
    number: "03",
    title: "The Cheapest Bid Costs You Twice",
    copy: "Material choices and project details are matched to the property, roof or construction scope, and the applicable manufacturer and contract terms rather than a one-size-fits-all package.",
    detail: "Property-specific material choices · Project-specific warranty terms · Written scope",
  },
  {
    icon: Mountain,
    number: "04",
    title: "Planned for Mountain Conditions",
    copy: "Elevation, wind exposure, drainage, shade, access, and freeze-thaw conditions can change how a mountain project should be detailed. Highlander reviews those conditions as part of project planning.",
    detail: `Mountain-property planning · ${COUNTY_COUNT} WNC counties · Written project scope`,
  },
  {
    icon: ClipboardCheck,
    number: "05",
    title: "We Find Problems Before You Do",
    copy: "Project documentation and walkthroughs give homeowners a clearer record of the work completed and a defined process for addressing punch-list items before closeout.",
    detail: "Phase photography · Material lot tracking · Pre-invoice walkthrough",
  },
  {
    icon: Ruler,
    number: "06",
    title: "Structured Timeline. No Open-Ended Chaos.",
    copy: "Permits when required, sequencing, milestones, and punch-list work are organized around a project-specific plan. Weather, inspections, material availability, and scope changes can affect timing.",
    detail: "Structured timeline · Sequenced phases · Documented milestones · Clean jobsite",
  },
];

const PillarCard = ({ pillar, index }: { pillar: typeof pillars[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mouse-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    cardRef.current.style.setProperty('--mouse-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.07, duration: 0.4, ease: HIGHLAND_EASE }}
      className="group relative bg-dark-section-foreground/[0.03] border border-dark-section-foreground/[0.06] rounded-none overflow-hidden spotlight-hover border-shimmer hover:border-[hsl(var(--highland-gold)/0.15)] transition-all duration-500"
    >
      {/* Left gold accent on hover */}
      <div className="absolute left-0 top-0 w-[2px] h-0 bg-[hsl(var(--highland-gold))] group-hover:h-full transition-all duration-600 z-10" />

      {/* Structural corner mark */}
      <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-dark-section-foreground/[0.04] pointer-events-none" />

      <div className="relative z-10 p-6 md:p-8">
        {/* Icon */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-none border border-dark-section-foreground/[0.08] flex items-center justify-center group-hover:border-[hsl(var(--highland-gold)/0.2)] transition-colors duration-300">
            <pillar.icon className="w-4.5 h-4.5 text-[hsl(var(--highland-gold)/0.9)] group-hover:text-[hsl(var(--highland-gold)/0.8)] transition-colors duration-300" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base md:text-body-sm font-heading font-bold text-dark-section-foreground mb-3 leading-snug tracking-tight">
          {pillar.title}
        </h3>

        {/* Copy */}
        <p className="text-dark-section-foreground text-body-xs leading-[1.75] font-body mb-5">
          {pillar.copy}
        </p>

        {/* Detail strip */}
        <div className="pt-4 border-t border-dark-section-foreground/[0.06]">
          <span className="text-caption font-body text-dark-section-foreground tracking-wide leading-relaxed">
            {pillar.detail}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const ValueProposition = () => {
  return (
    <section className="section-padding section-dark relative overflow-hidden">
      {/* Tartan texture */}
      <div className="absolute inset-0 tartan-dark opacity-50" />

      <div className="container-tight relative z-10">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-14 md:mb-18">
          <ScrollReveal variant="fade" delay={0.05}>
            <span className="text-caption font-body font-semibold uppercase tracking-[0.3em] text-[hsl(var(--highland-gold)/0.6)] mb-4 block">
              How We Protect Your Investment
            </span>
          </ScrollReveal>
          <HeadingReveal delay={0.1}>
            <h2 className="text-2xl md:text-3xl lg:text-heading font-heading font-bold text-dark-section-foreground leading-snug mb-5 tracking-tight">
              Six Things We Do That<br className="hidden md:block" />
              <span className="text-[hsl(var(--gold-ink))]"> Most Contractors Won't.</span>
            </h2>
          </HeadingReveal>
          <ScrollReveal variant="rise-subtle" delay={0.25}>
            <p className="text-dark-section-foreground text-body-sm font-body max-w-xl mx-auto leading-relaxed">
              We built our reputation on being the contractor you don't have to call back.
              Here's exactly how we earn that.
            </p>
          </ScrollReveal>
          <GoldLine width="4rem" centered delay={0.4} className="mt-7" />
        </div>

        {/* Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.number} pillar={pillar} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4, ease: HIGHLAND_EASE }}
          className="text-center mt-14 md:mt-16"
        >
          <Link
            to="/request-inspection"
            className="btn btn-primary btn-lg group relative"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative">Discuss Your Project With Us</span>
            <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
          <p className="text-caption text-dark-section-foreground font-body mt-4 tracking-wide">
            No pressure. No sales pitch. Just a conversation about what your property needs.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProposition;
