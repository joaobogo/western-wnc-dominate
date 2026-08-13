import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Compass, ArrowRight } from "lucide-react";

// Homepage local-SEO block: names every core & satellite community
// Highlander serves, links to real town pages where they exist, and
// keeps unbuilt communities as elegant nearby-community chips.

type Area = { name: string; href?: string; county: string; hub?: boolean };

// Primary hubs — have dedicated service-area pages
const primaryAreas: Area[] = [
  { name: "Franklin", href: "/service-areas/franklin-nc", county: "Macon County", hub: true },
  { name: "Highlands", href: "/service-areas/highlands-nc", county: "Macon County", hub: true },
  { name: "Cashiers", href: "/service-areas/cashiers-nc", county: "Jackson County", hub: true },
  { name: "Sylva", href: "/service-areas/sylva-nc", county: "Jackson County", hub: true },
];

// Secondary — linked town pages
const secondaryAreas: Area[] = [
  { name: "Waynesville", href: "/service-areas/waynesville-nc", county: "Haywood County" },
  { name: "Hayesville", href: "/service-areas/hayesville-nc", county: "Clay County" },
  { name: "Murphy", href: "/service-areas/murphy-nc", county: "Cherokee County" },
  { name: "Bryson City", href: "/service-areas/bryson-city-nc", county: "Swain County" },
];

// Nearby communities — served but no dedicated page (no broken links)
const nearbyCommunities: Area[] = [
  { name: "Scaly Mountain", href: "/service-areas/scaly-mountain-nc", county: "Macon County" },
  { name: "Otto", href: "/service-areas/otto-nc", county: "Macon County" },
  { name: "Lake Glenville", href: "/service-areas/lake-glenville-nc", county: "Jackson County" },
  { name: "Lake Toxaway", href: "/service-areas/lake-toxaway-nc", county: "Transylvania County" },
  { name: "Sapphire", href: "/service-areas/sapphire-nc", county: "Jackson County" },
  { name: "Cherokee", href: "/service-areas/cherokee-nc", county: "Swain County" },
  { name: "Cullowhee", href: "/service-areas/cullowhee-nc", county: "Jackson County" },
  { name: "Dillsboro", href: "/service-areas/dillsboro-nc", county: "Jackson County" },
  { name: "Brevard", href: "/service-areas/brevard-nc", county: "Transylvania County" },
];

const ServiceAreaMap = ({ id }: { id?: string }) => {
  return (
    <section
      id={id}
      aria-labelledby="service-area-heading"
      className="section-padding bg-secondary relative overflow-hidden"
    >
      {/* subtle topographic wash */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, hsl(var(--highland-gold)) 0, transparent 40%), radial-gradient(circle at 80% 70%, hsl(var(--primary)) 0, transparent 45%)",
        }}
      />

      <div className="container-tight relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-12 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 mb-4"
          >
            <Compass className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
            <span className="eyebrow">Local Service Area</span>
          </motion.div>

          <motion.h2
            id="service-area-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-display font-heading font-bold leading-[0.98] tracking-tight mb-5"
          >
            Serving Franklin, Highlands, Cashiers, Sylva{" "}
            <span className="text-[hsl(var(--gold-ink))]">
              &amp; Western North Carolina.
            </span>
          </motion.h2>

          <div className="w-12 h-px bg-[hsl(var(--highland-gold))] mb-5" />

          <p className="text-foreground/85 text-body-sm md:text-body leading-relaxed font-body">
            Highlander is a Western NC roofing and construction company built
            around a specific footprint — the mountain communities we can reach
            fast, know intimately, and stand behind long after the last nail is
            driven. Below are the towns and counties our crews cover from our
            Franklin base.
          </p>
        </div>

        {/* Primary hubs — 4 large cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {primaryAreas.map((area, i) => (
            <motion.div
              key={area.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link
                to={area.href!}
                className="group block bg-card border border-border hover:border-primary/40 hover:shadow-raised transition-all p-6 h-full relative overflow-hidden"
              >
                {/* gold top rule on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[hsl(var(--highland-gold))] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />

                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
                  <span className="text-caption font-body font-bold uppercase tracking-[0.16em] text-muted-foreground">
                    Primary Hub
                  </span>
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                  {area.name}, NC
                </h3>
                <p className="text-sm text-muted-foreground font-body mb-5">{area.county}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-body font-bold text-primary group-hover:gap-2.5 transition-all">
                  Roofing &amp; Construction
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Secondary + Nearby chips */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Secondary linked areas */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-secondary/40 border border-border p-6"
          >
            <h3 className="text-caption font-body font-bold uppercase tracking-[0.18em] text-muted-foreground mb-4">
              Also Serving
            </h3>
            <ul className="flex flex-wrap gap-2">
              {secondaryAreas.map((area) => (
                <li key={area.name}>
                  <Link
                    to={area.href!}
                    className="btn btn-secondary btn-sm group"
                  >
                    <MapPin className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
                    {area.name}, NC
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-1 group-hover:opacity-70 group-hover:ml-0 transition-all" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Nearby mountain communities (some unlinked) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-secondary/40 border border-border p-6"
          >
            <h3 className="text-caption font-body font-bold uppercase tracking-[0.18em] text-muted-foreground mb-4">
              Nearby Mountain Communities
            </h3>
            <ul className="flex flex-wrap gap-2">
              {nearbyCommunities.map((area) =>
                area.href ? (
                  <li key={area.name}>
                    <Link
                      to={area.href}
                      className="btn btn-secondary btn-sm group"
                    >
                      <MapPin className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
                      {area.name}
                    </Link>
                  </li>
                ) : (
                  <li key={area.name}>
                    <span className="inline-flex items-center gap-1.5 bg-card/60 border border-border/70 px-3.5 py-2 text-sm font-body font-semibold text-muted-foreground">
                      <MapPin className="w-4 h-4 text-[hsl(var(--highland-gold)/0.7)]" aria-hidden="true" />
                      {area.name}
                    </span>
                  </li>
                ),
              )}
            </ul>
            <p className="text-xs text-muted-foreground mt-4 font-body italic">
              Don't see your town? If it's within our Western NC footprint, we
              likely serve it — call{" "}
              <a href="tel:+18285247773" className="text-primary font-semibold hover:underline not-italic">
                (828) 524-7773
              </a>
              .
            </p>
          </motion.div>
        </div>

        {/* Footer CTA line */}
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground font-body">
            Serving <strong className="text-foreground">8 primary counties</strong> across the Western North Carolina mountains.
          </p>
          <Link
            to="/service-areas"
            className="group inline-flex items-center gap-2 text-sm font-body font-bold text-primary uppercase tracking-wider hover:gap-3 transition-all"
          >
            View Full Service Territory
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaMap;