import { REVIEW_STARS } from "@/data/business";
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
// P5.1: responsive renditions — the 800×500 card boxes were downloading the 1600px masters (190–240 KB each) on phones.
import metalRoofSet from "@/assets/gallery/metal-005.webp?w=480;800;1200&format=webp&as=srcset";
import constructionImgSet from "@/assets/division-construction-v2.webp?w=480;800;1200&format=webp&as=srcset";
import designImgSet from "@/assets/division-design.webp?w=480;800;1200&format=webp&as=srcset";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const roofingData = {
  icon: Home,
  label: "Roofing Division",
  badge: "Est. 2017",
  title: "Mountain-Grade Roofing",
  subtitle: "Our Foundation",
  promise: "We keep water out of mountain homes with systems specified for your elevation, wind zone, and moisture exposure.",
  links: [
    { name: "Roof Repair", href: "/roofing/roof-repair", note: "Leaks and storm damage" },
    { name: "Roof Replacement", href: "/roofing/roof-replacement", note: "Full tear-off and rebuild" },
    { name: "Metal Roofing", href: "/roofing/metal", note: "Standing seam systems" },
  ],
  description: "Every material specified for your elevation, wind zone, and moisture exposure. Installed by crews who've spent their careers on WNC ridgelines.",
  stats: [
    { value: REVIEW_STARS, label: "Google Rating" },
    { value: "CertainTeed", label: " ShingleMaster Credentialed" },
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
  imageSrcSet: metalRoofSet,
  imageAlt: "Standing seam metal roof on a Western North Carolina mountain home — Highlander Building Services",
};

const constructionData = {
  icon: HardHat,
  label: "Construction Division",
  badge: "Licensed GC",
  title: "Premium Home Construction",
  subtitle: "Our Craftsmanship",
  promise: "We add and rebuild living space on mountain lots with one licensed contractor holding the schedule and the scope.",
  links: [
    { name: "Home Additions", href: "/construction/additions", note: "More space, built on" },
    { name: "Outdoor Living", href: "/construction/outdoor-living", note: "Decks and porches" },
    { name: "Renovations", href: "/construction/renovations", note: "Kitchens, baths, whole-home" },
  ],
  description: "Additions, outdoor living, and whole-home renovations. We treat every construction project with the same structural precision as our roofing division, ensuring your investment is built to last in the WNC environment.",
  stats: [
    { value: "GC", label: " Licensed Contractor" },
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
  imageSrcSet: constructionImgSet,
  imageAlt: "Construction project representing Highlander Building Services design-build services in Western North Carolina",
};

const designData = {
  icon: Ruler,
  label: "Design Division",
  badge: "Pre-Con Support",
  title: "Design",
  subtitle: "Our Intelligence",
  promise: "We map the project before the first board is cut so the scope, plan, and budget are settled up front.",
  links: [
    { name: "Layouts & Planning", href: "/construction/design", note: "Floor plans and feasibility" },
    { name: "Design Services", href: "/construction/design", note: "Pre-construction detail" },
    { name: "Talk It Through", href: "/request-inspection?context=construction_pathway&type=construction", note: "Start with a short project inquiry" },
  ],
  description: "Before the first board is cut, we ensure your project is intelligently mapped. From layouts and floor plans to detailed scoping, we eliminate surprises and protect design integrity end-to-end.",
  stats: [
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
  href: "/construction/design",
  image: designImg,
  imageSrcSet: designImgSet,
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.18, duration: 0.4, ease: HIGHLAND_EASE }}
      className="group relative bg-card border border-border rounded-none overflow-hidden spotlight-hover flex flex-col hover:border-[hsl(var(--highland-gold)/0.3)] transition-all duration-500"
    >
      {/* === IMAGE HEADER with curtain reveal === */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <img
          src={data.image}
          srcSet={data.imageSrcSet}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
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
                : "bg-primary/15 border-dark-section-border"
            }`}>
              <data.icon className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="block text-caption font-body font-bold uppercase tracking-[0.2em] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                {data.label}
              </span>
              <span className="block text-caption font-body text-white/95 tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
                {data.subtitle}
              </span>
            </div>
          </div>
          <span className={`text-caption font-body font-bold uppercase tracking-[0.15em] px-2.5 py-1 backdrop-blur-md border ${
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
                <span className="text-body-xs md:text-body-xs font-body font-bold text-white uppercase tracking-[0.1em] leading-none">
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
        <h3 className="text-xl md:text-heading-sm font-heading font-bold text-foreground mb-3 leading-tight tracking-tight">
          {data.title}
        </h3>

        {/* One-sentence promise — the only prose in the card */}
        <p className="text-foreground/90 text-base md:text-lg leading-relaxed font-body mb-7 font-bold text-pretty">
          {data.promise}
        </p>

        {/* Three sub-links, scoped to this division only */}
        <ul className="mb-8 flex-1 divide-y divide-border/70 border-y border-border/70">
          {data.links.map((link, si) => (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 + index * 0.1 + si * 0.06, duration: 0.3, ease: HIGHLAND_EASE }}
            >
              <Link
                to={link.href}
                className="group/item flex items-center justify-between gap-4 py-3 min-h-[48px] transition-colors"
              >
                <span className="flex flex-col">
                  <span className={`font-body font-bold text-body-sm md:text-base leading-tight text-foreground transition-colors ${
                    isGold ? "group-hover/item:text-[hsl(var(--highland-gold))]" : "group-hover/item:text-primary"
                  }`}>
                    {link.name}
                  </span>
                  <span className="text-body-xs font-body text-muted-foreground leading-tight mt-0.5">
                    {link.note}
                  </span>
                </span>
                <ArrowRight className={`w-4 h-4 flex-shrink-0 transition-transform group-hover/item:translate-x-1 ${
                  isGold ? "text-[hsl(var(--highland-gold))]" : "text-primary"
                }`} aria-hidden="true" />
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          to={data.href}
          className={`inline-flex items-center justify-center gap-3 font-body font-bold text-base tracking-[0.08em] uppercase group/cta transition-all duration-300 mt-auto min-h-[56px] shadow-raised ${
            isGold
              ? "text-accent-foreground cta-gradient px-10 py-4 hover:opacity-95 hover:scale-[1.02]"
              : "text-primary-foreground bg-primary px-10 py-4 hover:bg-primary/95 hover:scale-[1.02]"
          }`}
        >
          {data.cta}
          <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1.5 transition-transform" aria-hidden="true" />
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
          transition={{ delay: 0.3, duration: 0.4, ease: HIGHLAND_EASE }}
          className="max-w-2xl mx-auto text-center mt-12 md:mt-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-border" />
            <span className="text-body-xs font-body font-bold uppercase tracking-[0.25em] text-foreground">
              {twoPath ? "Roofing · Construction" : "Roofing · Construction · Design"}
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-border" />
          </div>
          <p className="text-body-sm text-foreground font-body font-semibold leading-relaxed max-w-md mx-auto">
            Your project shouldn't be split across multiple companies and conflicting schedules.
            With Highlander, you get one standard across every division.
          </p>
          {twoPath && (
            <p className="mt-4 text-body-xs font-body text-muted-foreground">
              Planning a build?{" "}
              <Link to="/construction/design" className="text-primary font-semibold underline underline-offset-4 hover:no-underline">
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
