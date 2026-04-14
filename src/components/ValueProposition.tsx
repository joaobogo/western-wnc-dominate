import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Gem, MessageSquare, TrendingUp, Mountain, ClipboardCheck, Ruler } from "lucide-react";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import GoldLine from "@/components/motion/GoldLine";
import { useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const pillars = [
  {
    icon: Gem,
    number: "01",
    title: "Craftsmanship Without Compromise",
    copy: "Every cut, fastener, and flashing detail is executed to outlast the weather it was built for. We don't hire rotating subcontractor pools — our crews have built their careers on these ridgelines, and their names are on the work.",
    detail: "Material-specific training · CertainTeed Master certification · Final walkthrough on every job",
  },
  {
    icon: MessageSquare,
    number: "02",
    title: "Communication as a Standard",
    copy: "You'll have a named project contact, a written scope before any work begins, and daily progress updates — not when you ask, but before you need to. We believe the fastest way to earn trust is to never make you chase information.",
    detail: "Named contact · Written scope · Daily updates · Pre-start documentation",
  },
  {
    icon: TrendingUp,
    number: "03",
    title: "Long-Term Value Over Low Bids",
    copy: "The cheapest bid is the most expensive mistake. We specify certified materials for your elevation and climate zone, back every project with documented warranties, and build for the next 30 years — not the next inspection.",
    detail: "Certified material specs · Full labor & material warranty · 30-year build philosophy",
  },
  {
    icon: Mountain,
    number: "04",
    title: "Built for This Terrain",
    copy: "WNC isn't a standard building environment. Ice loads at 4,000 feet, horizontal rain on exposed slopes, freeze-thaw cycling 60+ days a year. We engineer every project for the actual conditions your property faces — not coastal averages.",
    detail: "Elevation-specific specs · 8 WNC counties · Climate-zone engineering",
  },
  {
    icon: ClipboardCheck,
    number: "05",
    title: "Obsessive Quality Control",
    copy: "No project is considered complete until it passes our internal inspection process. We photograph every phase, document material lots, and walk every finished surface before you see a final invoice. If something isn't right, we catch it first.",
    detail: "Phase photography · Material lot tracking · Pre-invoice inspection protocol",
  },
  {
    icon: Ruler,
    number: "06",
    title: "Disciplined Project Management",
    copy: "Defined timeline. Sequenced phases. No open-ended chaos. From permits to punch list, every project follows a structured workflow — because precision isn't just how we build, it's how we run.",
    detail: "Structured timeline · Phase sequencing · Documented milestones · Clean jobsite policy",
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.07, duration: 0.55, ease: HIGHLAND_EASE }}
      className="group relative bg-dark-section-foreground/[0.03] border border-dark-section-foreground/[0.06] rounded-none overflow-hidden spotlight-hover hover:border-[hsl(var(--highland-gold)/0.15)] transition-all duration-500"
    >
      {/* Left gold accent on hover */}
      <div className="absolute left-0 top-0 w-[2px] h-0 bg-[hsl(var(--highland-gold))] group-hover:h-full transition-all duration-600 z-10" />

      {/* Number watermark */}
      <div className="absolute -right-2 -top-4 text-[72px] font-heading font-bold text-dark-section-foreground/[0.025] leading-none select-none pointer-events-none">
        {pillar.number}
      </div>

      <div className="relative z-10 p-6 md:p-8">
        {/* Icon + number row */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-none border border-dark-section-foreground/[0.08] flex items-center justify-center group-hover:border-[hsl(var(--highland-gold)/0.2)] transition-colors duration-300">
            <pillar.icon className="w-4.5 h-4.5 text-[hsl(var(--highland-gold)/0.5)] group-hover:text-[hsl(var(--highland-gold)/0.8)] transition-colors duration-300" />
          </div>
          <span className="text-[10px] font-body font-bold uppercase tracking-[0.2em] text-[hsl(var(--highland-gold)/0.3)]">
            {pillar.number}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base md:text-[1.1rem] font-heading font-bold text-dark-section-foreground/90 mb-3 leading-snug tracking-tight">
          {pillar.title}
        </h3>

        {/* Copy */}
        <p className="text-dark-section-foreground/45 text-[13px] leading-[1.75] font-body mb-5">
          {pillar.copy}
        </p>

        {/* Detail strip */}
        <div className="pt-4 border-t border-dark-section-foreground/[0.06]">
          <span className="text-[10px] font-body text-dark-section-foreground/25 tracking-wide leading-relaxed">
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
            <span className="text-[10px] font-body font-semibold uppercase tracking-[0.3em] text-[hsl(var(--highland-gold)/0.6)] mb-4 block">
              The Highlander Difference
            </span>
          </ScrollReveal>
          <HeadingReveal delay={0.1}>
            <h2 className="text-2xl md:text-3xl lg:text-[2.5rem] font-heading font-bold text-dark-section-foreground leading-snug mb-5 tracking-tight">
              Six Principles That Separate<br className="hidden md:block" />
              <span className="text-[hsl(var(--highland-gold))]"> Permanent Work</span> From Temporary Fixes.
            </h2>
          </HeadingReveal>
          <ScrollReveal variant="rise-subtle" delay={0.25}>
            <p className="text-dark-section-foreground/40 text-[15px] font-body max-w-xl mx-auto leading-relaxed">
              We didn't build our reputation on being the cheapest option in Western NC.
              We built it on being the one you don't have to call back.
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
          transition={{ delay: 0.5, duration: 0.6, ease: HIGHLAND_EASE }}
          className="text-center mt-14 md:mt-16"
        >
          <Link
            to="/request-inspection"
            className="group cta-gradient text-accent-foreground font-heading font-bold text-[13px] px-10 py-4 rounded-none inline-flex items-center gap-2.5 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden tracking-wide"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative">Discuss Your Project With Us</span>
            <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-[11px] text-dark-section-foreground/25 font-body mt-4 tracking-wide">
            No pressure. No sales pitch. Just a conversation about what your property needs.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProposition;
