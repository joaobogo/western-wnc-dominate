import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Home, HardHat, ShieldCheck, Wrench, CloudLightning, Search, Layers, PaintBucket, PlusSquare, Hammer, Ruler, Settings, Compass } from "lucide-react";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import GoldLine from "@/components/motion/GoldLine";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import { useRef } from "react";

import metalRoof from "@/assets/gallery/metal-005.webp";
// NOTE: Construction Division image replaced per client (Robert) — the prior
// house photo must not appear in marketing. This is a temporary AI-generated
// WNC mountain construction visual. Client to provide a final approved
// Construction Division photo before launch.
import constructionImg from "@/assets/division-construction-v2.webp";
// NOTE: Temporary Design Division image. Client to provide final approved
// Design Division image before launch.
import designImg from "@/assets/division-design.webp";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const roofingData = {
  icon: Home,
  label: "Roofing Division",
  badge: "Est. 2017",
  title: "Mountain-Grade Roofing",
  subtitle: "Our Foundation",
  description: "Every material specified for your elevation, wind zone, and moisture exposure. Installed by crews who've spent their careers on WNC ridgelines.",
  stats: [
    { value: "4.9★", label: "Google Rating" },
    { value: "Top 1%", label: " Nationally Certified" },
  ],
  services: [
    { icon: Layers, name: "Full Roof Replacements" },
    { icon: Wrench, name: "Targeted Repairs" },
    { icon: CloudLightning, name: "Storm Damage & Insurance" },
    { icon: Search, name: "Professional Inspections" },
    { icon: PaintBucket, name: "Material Selection" },
    { icon: ShieldCheck, name: "Manufacturer Material Coverage" },
  ],
  cta: "Explore Roofing",
  href: "/roofing",
  image: metalRoof,
  imageAlt: "Standing seam metal roof on a Western North Carolina mountain home — Highlander Roofing & Construction",
};

const constructionData = {
  icon: HardHat,
  label: "Construction Division",
  badge: "Licensed GC",
  title: "Premium Home Construction",
  subtitle: "Our Craftsmanship",
  description: "Additions, outdoor living, and whole-home renovations. We treat every construction project with the same structural precision as our roofing division, ensuring your investment is built to last in the WNC environment.",
  stats: [
    { value: "GC", label: " Licensed Contractor" },
    { value: "5/5", label: " Client Satisfaction" },
  ],
  services: [
    { icon: PlusSquare, name: "Mountain Additions" },
    { icon: Settings, name: "Premium Decks & Porches" },
    { icon: Hammer, name: "Kitchen & Bath Remodels" },
    { icon: PaintBucket, name: "Siding & Exterior Wraps" },
    { icon: Ruler, name: "Structural Reinforcement" },
    { icon: ShieldCheck, name: "Custom Mountain Living" },
  ],
  cta: "Explore Construction",
  href: "/construction",
  image: constructionImg,
  imageAlt: "Construction project representing Highlander Roofing & Construction design-build services in Western North Carolina",
};

const designData = {
  icon: Ruler,
  label: "Design Division",
  badge: "Pre-Con Support",
  title: "Design",
  subtitle: "Our Intelligence",
  description: "Before the first board is cut, we ensure your project is intelligently mapped. From layouts and floor plans to detailed scoping, we eliminate surprises and protect design integrity end-to-end.",
  stats: [
    { value: "100%", label: " Pre-Con Clarity" },
    { value: "Site", label: " Optimized Plans" },
  ],
  services: [
    { icon: Ruler, name: "Floor Plan Layouts" },
    { icon: Search, name: "Site Feasibility" },
    { icon: Layers, name: "Material Selection" },
    { icon: HardHat, name: "Permit Coordination" },
    { icon: Compass, name: "Construction Documents" },
    { icon: ShieldCheck, name: "Scope Definition" },
  ],
  cta: "Explore Design Services",
  href: "/layouts-planning",
  image: designImg,
  imageAlt: "Design plans and 3D views for a custom WNC mountain home — Highlander Design Division",
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
      className="group relative bg-card border border-border rounded-none overflow-hidden spotlight-hover flex flex-col hover:border-[hsl(var(--highland-gold)/0.3)] transition-all duration-500"
    >
      {/* === IMAGE HEADER with curtain reveal === */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <img
          src={data.image}
          alt={data.imageAlt ?? data.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          loading="lazy"
          decoding="async"
          width={800}
          height={500}
        />
        {/* Cinematic overlay — refined for clarity */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--heritage-charcoal)/0.3)] via-transparent to-transparent" />
        <div className={`absolute inset-0 mix-blend-multiply opacity-15 ${
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
              <span className="block text-[10px] font-body font-bold uppercase tracking-[0.2em] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                {data.label}
              </span>
              <span className="block text-[9px] font-body text-white/95 tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
                {data.subtitle}
              </span>
            </div>
          </div>
          <span className={`text-[9px] font-body font-bold uppercase tracking-[0.15em] px-2.5 py-1 backdrop-blur-md border ${
            isGold
              ? "text-[hsl(var(--gold-ink))] bg-[hsl(var(--heritage-charcoal)/0.55)] border-[hsl(var(--highland-gold)/0.4)]"
              : "text-white bg-[hsl(var(--heritage-charcoal)/0.55)] border-white/25"
          }`}>
            {data.badge}
          </span>
        </div>

        {/* Stats overlay at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
          <div className="flex items-center gap-5 flex-wrap">
            {data.stats.map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-1.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.65)]">
                <AnimatedCounter
                  value={stat.value}
                  className={`text-lg md:text-xl font-heading font-bold leading-none ${
                    isGold ? "text-[hsl(var(--gold-ink))]" : "text-white"
                  }`}
                  duration={1600}
                />
                <span className="text-[12px] md:text-[13px] font-body font-bold text-white uppercase tracking-[0.1em] leading-none">
                  {stat.label.trim()}
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
        <p className="text-foreground/90 text-base md:text-lg leading-relaxed font-body mb-7 font-bold">
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
                isGold ? "text-[hsl(var(--highland-gold)/0.9)] group-hover/item:text-[hsl(var(--highland-gold)/0.8)]" : "text-primary/80 group-hover/item:text-primary/70"
              }`} />
              <span className="text-[14px] md:text-[15px] text-foreground/80 font-body font-bold leading-tight">
                {service.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <Link
          to={data.href}
          className={`inline-flex items-center justify-center gap-3 font-body font-bold text-base tracking-[0.08em] uppercase group/cta transition-all duration-300 mt-auto min-h-[56px] shadow-lg ${
            isGold
              ? "text-accent-foreground cta-gradient px-10 py-4 hover:opacity-95 hover:scale-[1.02]"
              : "text-primary-foreground bg-primary px-10 py-4 hover:bg-primary/95 hover:scale-[1.02]"
          }`}
        >
          {data.cta}
          <ArrowRight className="w-5 h-5 group-hover/cta:translate-x-1.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

const ThreeDivisionPathway = ({ paths = "three" }: { paths?: "two" | "three" }) => {
  const twoPath = paths === "two";
  return (
    <section className="section-padding bg-secondary relative overflow-hidden">
      {/* Subtle tartan */}
      <div className="absolute inset-0 tartan-bg opacity-[0.035]" />

      <div className="container-tight relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-14 md:mb-18">
          <ScrollReveal variant="fade" delay={0.05}>
            <span className="eyebrow mb-4 block">{twoPath ? "Roofing · Construction" : "Roofing · Construction · Design"}</span>
          </ScrollReveal>
          <HeadingReveal delay={0.1}>
            <h2 className="section-heading mb-5">
              {twoPath ? "Choose Your Path." : "Choose Your Division."}<br className="hidden md:block" />
              <span className="text-[hsl(var(--gold-ink))]"> The Standard Stays the Same.</span>
            </h2>
          </HeadingReveal>
          <ScrollReveal variant="rise-subtle" delay={0.25}>
            <p className="text-foreground text-lg md:text-xl font-body max-w-xl mx-auto leading-relaxed font-bold">

              Standing seam at 4,000 feet or a ground-up addition in Franklin. The process
              is identical: certified materials, a documented written scope, and one named contact
              from first visit to final walkthrough.
            </p>
          </ScrollReveal>
          <GoldLine width="4rem" centered delay={0.4} className="mt-7" />
        </div>

        {/* Division Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7 mx-auto ${twoPath ? "max-w-5xl" : "lg:grid-cols-3 max-w-7xl"}`}>
          <DivisionCard data={roofingData} accent="green" index={0} />
          <DivisionCard data={constructionData} accent="gold" index={1} />
          {!twoPath && <DivisionCard data={designData} accent="gold" index={2} />}
        </div>

        {/* Bottom unifying message */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.6, ease: HIGHLAND_EASE }}
          className="max-w-2xl mx-auto text-center mt-12 md:mt-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-border" />
            <span className="text-[12px] font-body font-bold uppercase tracking-[0.25em] text-foreground">
              {twoPath ? "Roofing · Construction" : "Roofing · Construction · Design"}
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-border" />
          </div>
          <p className="text-[16px] text-foreground font-body font-semibold leading-relaxed max-w-md mx-auto">
            Your project shouldn't be split across multiple companies and conflicting schedules.
            With Highlander, you get one standard across every division.
          </p>
          {twoPath && (
            <p className="mt-4 text-[14px] font-body text-muted-foreground">
              Planning a build?{" "}
              <Link to="/layouts-planning" className="text-primary font-semibold underline underline-offset-4 hover:no-underline">
                Start with design and planning
              </Link>
              .
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ThreeDivisionPathway;
