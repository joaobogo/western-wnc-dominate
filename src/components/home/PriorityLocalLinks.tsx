import { Link } from "react-router-dom";
import { MapPin, Store, ArrowUpRight } from "lucide-react";
import Section from "@/components/layout/Section";
import { ScrollReveal } from "@/components/motion";
import { FRANKLIN, SYLVA } from "@/data/business";

/**
 * Homepage body links into the six priority local markets and the two
 * physical showrooms. Anchors are descriptive ("roofing contractor in
 * Highlands, NC") so the target page's intent is obvious to a reader and
 * to a crawler — no "learn more" links.
 */
const townLinks: { anchor: string; to: string; note: string }[] = [
  {
    anchor: "roofing contractor in Highlands, NC",
    to: "/service-areas/highlands-nc",
    note: "Plateau homes above 4,000 feet — ice loading, high UV, steep rooflines.",
  },
  {
    anchor: "roofing contractor in Cashiers, NC",
    to: "/service-areas/cashiers-nc",
    note: "Temperate rainforest rainfall and fog, where drainage detail decides the roof.",
  },
  {
    anchor: "roofing company in Sylva, NC",
    to: "/service-areas/sylva-nc",
    note: "Historic downtown homes and Jackson County rentals near our Sylva showroom.",
  },
  {
    anchor: "roofing in Franklin, NC neighborhoods",
    to: "/service-areas/franklin-nc",
    note: "Cartoogechaye, Iotla, Holly Springs and the rest of our home market.",
  },
  {
    anchor: "roofing contractor in Waynesville, NC",
    to: "/service-areas/waynesville-nc",
    note: "Haywood County freeze-thaw cycles, historic districts, hillside builds.",
  },
  {
    anchor: "roofer in Bryson City, NC",
    to: "/service-areas/bryson-city-nc",
    note: "Cabins and short-term rentals scheduled around the booking calendar.",
  },
];

const PriorityLocalLinks = () => (
  <Section density="default" width="wide" className="bg-secondary/40 border-y border-border/60">
    <ScrollReveal variant="fade">
      <span className="eyebrow mb-3 block">Where we work</span>
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4 leading-tight">
        Local roofing pages for our busiest Western NC towns
      </h2>
      <p className="text-body text-muted-foreground font-body max-w-3xl mb-10">
        Every town below has its own page with local roof conditions, permitting notes, and nearby
        project proof — plus the showroom that serves it.
      </p>
    </ScrollReveal>

    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {townLinks.map((t) => (
        <li key={t.to}>
          <Link
            to={t.to}
            className="group flex h-full flex-col gap-2 border border-border bg-card p-5 transition-colors hover:border-[hsl(var(--highland-gold))]"
          >
            <span className="flex items-center gap-2 font-heading text-body font-bold text-foreground">
              <MapPin className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
              {t.anchor}
              <ArrowUpRight className="w-4 h-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
            <span className="font-body text-body-sm text-muted-foreground">{t.note}</span>
          </Link>
        </li>
      ))}
    </ul>

    <div className="mt-6 grid gap-4 md:grid-cols-2">
      {[
        {
          to: "/locations/franklin-nc",
          anchor: `Visit our ${FRANKLIN.locality}, NC roofing showroom`,
          note: `${FRANKLIN.streetAddress} — metal panels, shingle boards, and skylights on display.`,
        },
        {
          to: "/locations/sylva-nc",
          anchor: `Visit our ${SYLVA.locality}, NC roofing showroom`,
          note: `${SYLVA.streetAddress} — the walk-in base for Jackson, Swain, and Haywood counties.`,
        },
      ].map((l) => (
        <Link
          key={l.to}
          to={l.to}
          className="group flex flex-col gap-1 border border-border bg-background p-5 transition-colors hover:border-[hsl(var(--highland-gold))]"
        >
          <span className="flex items-center gap-2 font-heading text-body font-bold text-foreground">
            <Store className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
            {l.anchor}
          </span>
          <span className="font-body text-body-sm text-muted-foreground">{l.note}</span>
        </Link>
      ))}
    </div>
  </Section>
);

export default PriorityLocalLinks;
