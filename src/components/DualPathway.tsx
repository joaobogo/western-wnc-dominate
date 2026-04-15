import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Home, HardHat, ShieldCheck, Wrench, CloudLightning, Search, Layers, PaintBucket, PlusSquare, Hammer, Ruler, Settings } from "lucide-react";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import GoldLine from "@/components/motion/GoldLine";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import { useRef } from "react";

import metalRoof from "@/assets/gallery/metal-005.webp";
import cedarRoof from "@/assets/gallery/cedar-004.webp";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const roofingData = {
  icon: Home,
  label: "Roofing Division",
  badge: "Est. 2017",
  title: "Mountain-Grade Roofing",
  subtitle: "Our Foundation",
  description: "Every material specified for your elevation, wind zone, and moisture exposure. Installed by crews who've spent their careers on WNC ridgelines — not a rotating subcontractor pool.",
  stats: [
    { value: "500+", label: "Roofs Installed" },
    { value: "Top 1%", label: "Nationally Certified" },
  ],
  services: [
    { icon: Layers, name: "Full Roof Replacements" },
    { icon: Wrench, name: "Targeted Repairs" },
    { icon: CloudLightning, name: "Storm Damage & Insurance" },
    { icon: Search, name: "Professional Inspections" },
    { icon: PaintBucket, name: "Material Selection" },
    { icon: ShieldCheck, name: "Extended Warranty Coverage" },
  ],
  cta: "Explore Roofing Services",
  href: "/services",
  image: metalRoof,
};

const constructionData = {
  icon: HardHat,
  label: "Construction Division",
  badge: "Licensed GC",
  title: "Full-Scope Construction",
  subtitle: "Our Expertise",
  description: "Additions, renovations, siding, and outdoor living — built by the same in-house crews, under the same licensed GC oversight, with the same warranty you'd get on a Highlander roof. One team. One standard.",
  stats: [
    { value: "GC", label: "Licensed Contractor" },
    { value: "8", label: "WNC Counties" },
  ],
  services: [
    { icon: Hammer, name: "Renovations & Remodels" },
    { icon: PlusSquare, name: "Home Additions" },
    { icon: PaintBucket, name: "Siding & Exteriors" },
    { icon: Ruler, name: "Structural Improvements" },
    { icon: Settings, name: "Decks & Outdoor Living" },
    { icon: ShieldCheck, name: "Design-Build Projects" },
  ],
  cta: "Explore Construction Services",
  href: "/construction",
  image: cedarRoof,
};

const DivisionCard = ({ data, accent, index }: {
  data: typeof roofingData;
  accent: "green" | "gold";
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isGold = accent === "gold";

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
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.18, duration: 0.7, ease: HIGHLAND_EASE }}
      className="group relative bg-card border border-border rounded-none overflow-hidden spotlight-hover flex flex-col"
    >
      {/* === IMAGE HEADER with curtain reveal === */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          whileInView={{ clipPath: "inset(0 0 0% 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: index * 0.15, ease: HIGHLAND_EASE }}
          className="absolute inset-0"
        >
          <motion.img
            src={data.image}
            alt={data.title}
            className="w-full h-full object-cover"
            loading="lazy"
            initial={{ scale: 1.18 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: index * 0.15 + 0.1, ease: HIGHLAND_EASE }}
          />
        </motion.div>
        {/* Cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
        <div className={`absolute inset-0 mix-blend-multiply opacity-20 ${
          isGold ? "bg-[hsl(var(--highland-gold))]" : "bg-[hsl(var(--heritage-green))]"
        }`} />

        {/* Division label + badge */}
        <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-none flex items-center justify-center backdrop-blur-md border ${
              isGold
                ? "bg-[hsl(var(--highland-gold)/0.15)] border-[hsl(var(--highland-gold)/0.25)]"
                : "bg-primary/15 border-primary-foreground/10"
            }`}>
              <data.icon className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="block text-[10px] font-body font-bold uppercase tracking-[0.2em] text-white/90">
                {data.label}
              </span>
              <span className="block text-[9px] font-body text-white/40 tracking-wide">
                {data.subtitle}
              </span>
            </div>
          </div>
          <span className={`text-[9px] font-body font-bold uppercase tracking-[0.15em] px-2.5 py-1 backdrop-blur-md border ${
            isGold
              ? "text-[hsl(var(--highland-gold))] bg-[hsl(var(--highland-gold)/0.1)] border-[hsl(var(--highland-gold)/0.2)]"
              : "text-white/70 bg-white/5 border-white/10"
          }`}>
            {data.badge}
          </span>
        </div>

        {/* Stats overlay at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
          <div className="flex items-end gap-6">
            {data.stats.map((stat) => (
              <div key={stat.label}>
                <AnimatedCounter
                  value={stat.value}
                  className={`text-xl md:text-2xl font-heading font-bold leading-none mb-0.5 ${
                    isGold ? "text-[hsl(var(--highland-gold))]" : "text-white"
                  }`}
                  duration={1600}
                />
                <span className="text-[9px] font-body text-white/40 uppercase tracking-[0.12em]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* === ACCENT LINE === */}
      <div className={`h-[2px] w-full ${
        isGold
          ? "bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.5)] to-transparent"
          : "bg-gradient-to-r from-transparent via-[hsl(var(--heritage-green)/0.4)] to-transparent"
      }`} />

      {/* === LEFT HOVER BORDER === */}
      <div className={`absolute left-0 top-0 w-[2px] h-0 group-hover:h-full transition-all duration-700 z-20 ${
        isGold ? "bg-[hsl(var(--highland-gold))]" : "bg-primary"
      }`} />

      {/* === CONTENT === */}
      <div className="p-7 md:p-9 flex flex-col flex-1">
        <h3 className="text-xl md:text-[1.65rem] font-heading font-bold text-foreground mb-3 leading-tight tracking-tight">
          {data.title}
        </h3>
        <p className="text-muted-foreground text-[13.5px] leading-[1.75] font-body mb-7">
          {data.description}
        </p>

        {/* Service grid — 2 columns */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 mb-8 flex-1">
          {data.services.map((service, si) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 + index * 0.1 + si * 0.04, duration: 0.3, ease: HIGHLAND_EASE }}
              className="flex items-center gap-2 group/item"
            >
              <service.icon className={`w-3.5 h-3.5 flex-shrink-0 transition-colors duration-200 ${
                isGold ? "text-[hsl(var(--highland-gold)/0.5)] group-hover/item:text-[hsl(var(--highland-gold)/0.8)]" : "text-primary/40 group-hover/item:text-primary/70"
              }`} />
              <span className="text-[12.5px] text-foreground/70 font-body font-medium leading-tight">
                {service.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <Link
          to={data.href}
          className={`inline-flex items-center gap-2.5 font-heading font-bold text-[13px] tracking-wide group/cta transition-all duration-300 mt-auto ${
            isGold
              ? "text-accent-foreground cta-gradient px-7 py-3.5 hover:opacity-90"
              : "text-primary-foreground bg-primary px-7 py-3.5 hover:bg-primary/90"
          }`}
        >
          {data.cta}
          <ArrowRight className="w-3.5 h-3.5 group-hover/cta:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

const DualPathway = () => {
  return (
    <section className="section-padding bg-secondary relative overflow-hidden">
      {/* Subtle tartan */}
      <div className="absolute inset-0 tartan-bg opacity-40" />

      <div className="container-tight relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-14 md:mb-18">
          <ScrollReveal variant="fade" delay={0.05}>
            <span className="eyebrow mb-4 block">Two Divisions. Equal Standards.</span>
          </ScrollReveal>
          <HeadingReveal delay={0.1}>
            <h2 className="section-heading mb-5">
              Choose Your Division.<br className="hidden md:block" />
              <span className="text-[hsl(var(--highland-gold))]"> The Standard Stays the Same.</span>
            </h2>
          </HeadingReveal>
          <ScrollReveal variant="rise-subtle" delay={0.25}>
            <p className="text-muted-foreground text-base font-body max-w-xl mx-auto leading-relaxed">
              Standing seam at 4,000 feet or a ground-up addition in Franklin — the process
              is identical. Certified materials, documented scope, named contact, warranty delivered at walkthrough.
            </p>
          </ScrollReveal>
          <GoldLine width="4rem" centered delay={0.4} className="mt-7" />
        </div>

        {/* Division Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-7 max-w-5xl mx-auto">
          <DivisionCard data={roofingData} accent="green" index={0} />
          <DivisionCard data={constructionData} accent="gold" index={1} />
        </div>

        {/* Bottom unifying message */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6, ease: HIGHLAND_EASE }}
          className="max-w-2xl mx-auto text-center mt-12 md:mt-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-border" />
            <span className="text-[10px] font-body font-bold uppercase tracking-[0.25em] text-muted-foreground/50">
              One Company · One Process · One Warranty
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-border" />
          </div>
          <p className="text-[13px] text-muted-foreground/60 font-body leading-relaxed max-w-md mx-auto">
            Most contractors do one thing. We do two — because your roof and your renovation
            shouldn't require two companies, two timelines, and two standards.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DualPathway;
