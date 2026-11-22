import { Droplets, FileText, Hammer, Home, Layers, Mountain, Ruler, Shield } from "lucide-react";
import type { IconCard } from "@/content/construction/types";

const ICONS = { shield: Shield, layers: Layers, file: FileText, home: Home, ruler: Ruler, hammer: Hammer, mountain: Mountain, droplets: Droplets };

/** Icon + title + one line. No paragraphs (plan §3.2.4). */
const IconCards = ({ eyebrow, heading, cards }: { eyebrow?: string; heading: string; cards: IconCard[] }) => (
  <section className="section-padding bg-secondary/40" aria-labelledby="icon-cards-heading">
    <div className="container-tight">
      {eyebrow && <p className="eyebrow mb-2 block">{eyebrow}</p>}
      <h2 id="icon-cards-heading" className="section-heading max-w-2xl">{heading}</h2>
      <ul className={`mt-8 grid gap-4 ${cards.length === 3 ? "md:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
        {cards.map((card) => {
          const Icon = ICONS[card.icon];
          return (
            <li key={card.title} className="flex gap-4 rounded-sm border border-border bg-card p-5">
              <Icon className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h3 className="font-heading text-lg font-bold leading-snug text-foreground">{card.title}</h3>
                <p className="mt-1 font-body text-body-sm leading-snug text-muted-foreground">{card.line}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);

export default IconCards;
