import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Home, Wrench, Layers, CloudRain, Sun, Hammer, Compass, Trees, Mountain } from "lucide-react";
import type { TownData } from "@/data/towns";
import { serviceTownHref } from "@/data/service-town-content";

/** "Scaly Mountain mountain homes" reads badly — towns whose name already ends in Mountain get plain "homes". */
const homesIn = (name: string) => (/mountain$/i.test(name.trim()) ? `${name} homes` : `${name} mountain homes`);

interface Props {
  town: TownData;
}

type LinkBlock = {
  title: string;
  /** One short, town-specific line. The service itself is explained on the division page the card links to. */
  body: string;
  href: string;
  icon: typeof Home;
};

/**
 * P3.4: each card is one sentence + a link to the division page that owns the
 * generic explanation (/roofing/*, /construction/*). The town page keeps only
 * the town-specific hook (elevation, county, housing stock), which is what a
 * town page is for — the generic WNC copy was repeating across 19 town pages.
 */
const TownLocalServiceBlocks = ({ town }: Props) => {
  const t = town.name;
  const county = town.county.replace(/ County$/, "");

  // Cards point at the town's own indexable sub-page when it has one (core
  // towns), otherwise at the division page — same rule as every link block.
  const roofingCore: LinkBlock[] = [
    {
      title: `Roof repair in ${t}, NC`,
      body: `Leak and flashing repairs in ${t} and across ${county} County — a repair when a repair is the right call.`,
      href: serviceTownHref(town.slug, "roof-repair"),
      icon: Wrench,
    },
    {
      title: `Roof replacement for ${homesIn(t)}`,
      body: `Specified for the wind, ice, and moisture ${t} sees at ${town.elevation}.`,
      href: serviceTownHref(town.slug, "roof-replacement"),
      icon: Layers,
    },
    {
      title: `Metal roofing in ${t}, NC`,
      body: `Standing-seam systems sized for ${t}'s elevation-driven wind and snow loading.`,
      href: serviceTownHref(town.slug, "metal-roofing"),
      icon: Home,
    },
  ];

  const waterBlocks: LinkBlock[] = [
    {
      title: `Gutter installation in ${t}, NC`,
      body: `Gutters and downspouts sized for the rainfall ${t} homes actually get.`,
      href: "/roofing/gutters",
      icon: CloudRain,
    },
    {
      title: `Skylights & daylighting`,
      body: `Skylight replacement and re-flashing for ${t} homes.`,
      href: "/roofing/skylights",
      icon: Sun,
    },
  ];

  const constructionBlocks: LinkBlock[] = [
    {
      title: `Construction company in ${t}, NC`,
      body: `Licensed NC General Contractor for additions and renovations in ${t}.`,
      href: "/construction",
      icon: Hammer,
    },
    {
      title: `Design services for ${t} projects`,
      body: `Floor plans and elevations drawn for ${t} lots at ${town.elevation}.`,
      href: "/construction/design",
      icon: Compass,
    },
    {
      title: `Outdoor living projects in ${t}`,
      body: `Porches, decks, and outdoor rooms for ${homesIn(t)}.`,
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
              Every roofing service Highlander offers is available in {t} — the full list lives on the{" "}
              <Link to="/roofing" className="text-primary underline underline-offset-4 hover:no-underline">
                roofing division page
              </Link>
              ; below is what matters most for {county} County homes. Start with{" "}
              <Link to={serviceTownHref(town.slug, "roof-replacement")} className="text-primary underline underline-offset-4 hover:no-underline">roof replacement in {t}</Link>,{" "}
              <Link to={serviceTownHref(town.slug, "roof-repair")} className="text-primary underline underline-offset-4 hover:no-underline">roof repair in {t}</Link>,{" "}
              <Link to={serviceTownHref(town.slug, "metal-roofing")} className="text-primary underline underline-offset-4 hover:no-underline">metal roofing in {t}</Link>, or{" "}
              <Link to={serviceTownHref(town.slug, "storm-damage")} className="text-primary underline underline-offset-4 hover:no-underline">storm damage roofing in {t}</Link>.
            </p>
          </div>
        </div>

        {/* Section 2 — Roof Repair, Replacement & Metal */}
        <div>
          <div className="max-w-3xl mb-8">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground leading-tight mb-3">
              {["franklin-nc", "highlands-nc"].includes(town.slug) ? "Roof repair, shingle roof replacement & metal roofing" : "Roof repair, roof replacement & metal roofing"}
            </h3>
            <p className="text-muted-foreground font-body leading-relaxed">
              The three calls we get most often from {t}.
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
              In {t}, most roof problems are water problems — we treat gutters, flashing, and skylights as one system{town.slug === "franklin-nc" ? ", which is why gutter cleaning is part of a maintenance visit" : ""}.
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
              The same licensed team handles construction in {t} — see the{" "}
              <Link to="/construction" className="text-primary underline underline-offset-4 hover:no-underline">
                construction division page
              </Link>{" "}
              for how additions, renovations, design, and outdoor living work.
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
              <Mountain className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
              <span className="eyebrow">Local Conditions</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground leading-tight mb-5">
              {["franklin-nc", "highlands-nc", "cashiers-nc"].includes(town.slug) ? "Why Western North Carolina mountain homes need the right roof and exterior system" : `Why mountain homes in ${t} need the right roof and exterior system`}
            </h3>
            <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
              {/* The town's exposure sentence is quoted once, in the hero (15 Sep 2026 SEO audit: no repeats). */}
              <p>
                {t} sits at roughly {town.elevation} in {town.county}. {town.slug === "franklin-nc" ? "Steeper pitches" : "Pitch"}, exposure, site access and the county permitting office all change how a roof or an exterior project is detailed here, which is why {town.slug === "franklin-nc" ? `every new roof installed in ${t} is scoped` : `every ${t} scope is written`} after a site visit rather than from a template.
              </p>
              <p>{town.constructionContext}</p>
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
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <Link
        to={block.href}
        className="group h-full flex flex-col bg-card border border-border rounded-none p-7 hover:border-primary/40 hover:shadow-raised transition-all relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[hsl(var(--highland-gold))] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
        <div className="w-10 h-10 bg-primary/5 border border-primary/10 flex items-center justify-center mb-5">
          <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
        </div>
        <h4 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-snug mb-3">
          {block.title}
        </h4>
        <p className="text-sm text-muted-foreground font-body leading-relaxed mb-6">{block.body}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-body font-bold uppercase tracking-[0.14em] text-primary group-hover:gap-2.5 transition-all">
          Explore <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
        </span>
      </Link>
    </motion.div>
  );
};

export default TownLocalServiceBlocks;