import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Hammer, Home, Ruler, MapPin } from "lucide-react";

type LinkItem = { label: string; to: string };

const columns: { title: string; icon: typeof Home; links: LinkItem[] }[] = [
  {
    title: "Roofing",
    icon: Home,
    links: [
      { label: "Roofing services in Western NC", to: "/roofing" },
      { label: "Residential roofing for mountain homes", to: "/roofing/residential" },
      { label: "Roof repair in Western North Carolina", to: "/roofing/roof-repair" },
      { label: "Roof replacement for mountain homes", to: "/roofing/roof-replacement" },
      { label: "Metal roofing options", to: "/roofing/metal" },
      { label: "Seamless gutters", to: "/roofing/gutters" },
      { label: "Skylight installation", to: "/roofing/skylights" },
    ],
  },
  {
    title: "Construction & Design",
    icon: Hammer,
    links: [
      { label: "Construction and design services", to: "/construction" },
      { label: "In-house design services", to: "/construction/design" },
      { label: "Outdoor living projects", to: "/construction/outdoor-living" },
    ],
  },
  {
    title: "Local & Insights",
    icon: MapPin,
    links: [
      { label: "Roofing contractor in Highlands, NC", to: "/service-areas/highlands-nc" },
      { label: "Recent Western NC projects", to: "/recent-projects" },
      { label: "Metal vs. shingle roofs in Western NC", to: "/blog/metal-vs-shingle-roof-western-nc" },
      { label: "Best roofing materials for Highlands, NC", to: "/blog/best-roofing-materials-highlands-nc" },
    ],
  },
  {
    title: "Next Steps",
    icon: Ruler,
    links: [
      { label: "Request an inspection", to: "/request-inspection" },
      { label: "Contact Highlander", to: "/contact" },
      { label: "Read frequently asked questions", to: "/faq" },
    ],
  },
];

const ExploreHighlander = () => {
  return (
    <section
      id="explore"
      className="section-padding bg-background relative overflow-hidden border-t border-border/40"
      aria-labelledby="explore-heading"
    >
      <div className="container-tight relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <span className="eyebrow mb-3 block">Explore Highlander</span>
          <h2 id="explore-heading" className="section-heading mb-4">
            Keep Exploring{" "}
            <span className="text-[hsl(var(--gold-ink))]">Roofing, Construction & Western NC.</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg font-body max-w-2xl mx-auto">
            Direct paths into the services, service areas, and field guides most useful to Western North Carolina homeowners.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((col, ci) => {
            const Icon = col.icon;
            return (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: ci * 0.06 }}
                className="group relative bg-card border border-border/70 rounded-sm p-6 hover:border-primary/40 transition-colors"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold))]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-2.5 mb-4">
                  <Icon className="w-4 h-4 text-primary" aria-hidden="true">
                  <h3 className="font-heading font-bold text-foreground text-base tracking-wide">
                    {col.title}
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="group/link flex items-start gap-1.5 text-sm font-body text-muted-foreground hover:text-primary transition-colors leading-snug"
                      >
                        <ArrowUpRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary/80 group-hover/link:text-primary transition-colors" aria-hidden="true">
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExploreHighlander;