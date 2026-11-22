import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { smallSrc } from "@/lib/gallery-srcset";
import type { ServiceCard } from "@/content/construction/types";

/**
 * One card per construction service page (plan, hub note): a photo, one
 * line, and the keyword title as the link. Generated design examples carry
 * a visible "Design example" label.
 */
const ServiceCards = ({ heading, intro, cards }: { heading: string; intro?: string; cards: ServiceCard[] }) => (
  <section className="section-padding bg-background" aria-labelledby="service-cards-heading">
    <div className="container-tight">
      <h2 id="service-cards-heading" className="section-heading max-w-2xl">{heading}</h2>
      {intro && <p className="mt-3 max-w-2xl font-body text-muted-foreground">{intro}</p>}
      <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
        {cards.map((card) => (
          <li key={card.href} className="group relative flex flex-col overflow-hidden rounded-sm border border-border bg-card">
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={smallSrc(card.image.src)}
                srcSet={card.image.srcSet}
                sizes="(min-width: 768px) 360px, 50vw"
                alt={card.image.alt}
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              {card.image.example && (
                <span className="absolute left-2 top-2 bg-[hsl(var(--heritage-charcoal)/0.85)] px-2 py-0.5 font-body text-[0.68rem] font-bold uppercase tracking-[0.12em] text-white">
                  Design example
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-3 md:p-5">
              <h3 className="font-heading text-base font-bold leading-snug text-foreground md:text-xl">
                <Link to={card.href} className="after:absolute after:inset-0 hover:text-primary">
                  {card.title}
                </Link>
              </h3>
              <p className="mt-1.5 font-body text-body-xs leading-snug text-muted-foreground md:text-body-sm">{card.line}</p>
              <ArrowRight className="mt-auto h-4 w-4 pt-0 text-primary transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default ServiceCards;
