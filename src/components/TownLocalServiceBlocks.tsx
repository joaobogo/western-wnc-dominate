import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Home, Wrench, Layers, CloudRain, Sun, Hammer, Compass, Trees, Mountain } from "lucide-react";
import type { TownData } from "@/data/towns";

interface Props {
  town: TownData;
}

type LinkBlock = {
  title: string;
  body: string;
  href: string;
  icon: typeof Home;
};

const TownLocalServiceBlocks = ({ town }: Props) => {
  const t = town.name;

  const roofingCore: LinkBlock[] = [
    {
      title: `Roof repair in ${t}, NC`,
      body: `Leak diagnosis, flashing repair, and targeted fixes for ${t} homes. If a repair will genuinely protect the house, that's what we recommend — not a replacement you don't need.`,
      href: "/roofing/roof-repair",
      icon: Wrench,
    },
    {
      title: `Roof replacement for ${t} mountain homes`,
      body: `Full tear-off and reinstall for ${t}, NC homeowners, specified for wind, ice, and moisture exposure at ${town.elevation}.`,
      href: "/roofing/roof-replacement",
      icon: Layers,
    },
    {
      title: `Metal roofing in ${t}, NC`,
      body: `Standing seam and metal panel systems installed for ${t} residences, sized for elevation-driven wind, snow, and ice loading.`,
      href: "/roofing/metal",
      icon: Home,
    },
  ];

  const waterBlocks: LinkBlock[] = [
    {
      title: `Gutter installation in ${t}, NC`,
      body: `Seamless gutters, oversized downspouts, and drainage routing built for the rainfall totals ${t} homes actually see.`,
      href: "/roofing/gutters",
      icon: CloudRain,
    },
    {
      title: `Skylights & daylighting`,
      body: `Skylight replacement and re-flashing for ${t} homes where aging skylight units — not the roof itself — are the leak source.`,
      href: "/roofing/skylights",
      icon: Sun,
    },
  ];

  const constructionBlocks: LinkBlock[] = [
    {
      title: `Construction company in ${t}, NC`,
      body: `Licensed North Carolina General Contractor covering home additions, renovations, and exterior construction for ${t} homeowners.`,
      href: "/construction",
      icon: Hammer,
    },
    {
      title: `Design services for ${t} projects`,
      body: `In-house floor plans, elevations, and material planning that flow straight into the build under one accountable team.`,
      href: "/construction/design",
      icon: Compass,
    },
    {
      title: `Outdoor living projects in ${t}`,
      body: `Screened porches, decks, and outdoor rooms designed to extend how ${t} mountain homes are actually used.`,
      href: "/construction/outdoor-living",
      icon: Trees,
    },
  ];

  return (
    <section className="section-padding bg-secondary/20 border-y border-border/60">
      <div className="container-tight space-y-20">
        {/* Section 1 — Roofing Services in [Town], NC */}
        <div>
          <div className="max-w-3xl mb-10">
            <span className="eyebrow mb-3 block">Roofing Services</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight mb-4">
              Roofing services in {t}, NC
            </h2>
            <p className="text-lg text-muted-foreground font-body leading-relaxed">
              Highlander is a full-service{" "}
              <Link to="/roofing" className="text-primary underline-offset-4 hover:underline">
                roofing company serving {t}, NC
              </Link>{" "}
              and the surrounding Western North Carolina mountains — repair, replacement, metal roofing, gutters, and skylights, all installed by the same crew you'll meet on site.
            </p>
          </div>
        </div>

        {/* Section 2 — Roof Repair, Replacement & Metal */}
        <div>
          <div className="max-w-3xl mb-8">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground leading-tight mb-3">
              Roof repair, roof replacement & metal roofing
            </h3>
            <p className="text-muted-foreground font-body leading-relaxed">
              Three of the most common questions {t} homeowners ask us. Each answer is a real project pathway, not a checkbox.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {roofingCore.map((b, i) => (
              <ServiceLinkCard key={b.href} block={b} index={i} />
            ))}
          </div>
        </div>

        {/* Section 3 — Gutters, Skylights & Exterior Water Management */}
        <div>
          <div className="max-w-3xl mb-8">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground leading-tight mb-3">
              Gutters, skylights & exterior water management
            </h3>
            <p className="text-muted-foreground font-body leading-relaxed">
              In {t}, most roof problems are actually water problems — gutter capacity, flashing detail, and skylight condition. We treat them as one system.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {waterBlocks.map((b, i) => (
              <ServiceLinkCard key={b.href} block={b} index={i} />
            ))}
          </div>
        </div>

        {/* Section 4 — Construction, Design & Outdoor Living */}
        <div>
          <div className="max-w-3xl mb-8">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground leading-tight mb-3">
              Construction, design services & outdoor living
            </h3>
            <p className="text-muted-foreground font-body leading-relaxed">
              Highlander is a licensed North Carolina General Contractor as well as a{" "}
              <Link to="/roofing" className="text-primary underline-offset-4 hover:underline">
                roofing contractor in {t}, NC
              </Link>
              . Home additions, renovations, in-house design, and outdoor living all run through the same team, with the same warranty discipline.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {constructionBlocks.map((b, i) => (
              <ServiceLinkCard key={b.href} block={b} index={i} />
            ))}
          </div>
        </div>

        {/* Section 5 — Why mountain homes here need the right roof and exterior system */}
        <div className="bg-card border border-border/70 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-[hsl(var(--highland-gold))] opacity-70" />
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Mountain className="w-4 h-4 text-[hsl(var(--gold-ink))]" />
              <span className="eyebrow">Local Conditions</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground leading-tight mb-5">
              Why mountain homes in {t} need the right roof and exterior system
            </h3>
            <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
              <p>
                {t} sits at roughly {town.elevation} in {town.county}. {town.climateExposure}
              </p>
              <p>{town.constructionContext}</p>
              <p>
                That's why our specifications for {t} homes are calibrated for real elevation, real rainfall, and real ownership horizons — not generic mountain-town templates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceLinkCard = ({ block, index }: { block: LinkBlock; index: number }) => {
  const Icon = block.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <Link
        to={block.href}
        className="group h-full flex flex-col bg-card border border-border rounded-none p-7 hover:border-primary/40 hover:shadow-lg transition-all relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[hsl(var(--highland-gold))] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
        <div className="w-10 h-10 bg-primary/5 border border-primary/10 flex items-center justify-center mb-5">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h4 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-snug mb-3">
          {block.title}
        </h4>
        <p className="text-sm text-muted-foreground font-body leading-relaxed mb-6">{block.body}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-body font-bold uppercase tracking-[0.14em] text-primary group-hover:gap-2.5 transition-all">
          Explore <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </Link>
    </motion.div>
  );
};

export default TownLocalServiceBlocks;