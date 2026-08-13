import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { LinkGroup } from "@/lib/local-link-graph";

interface LocalLinkWebProps {
  groups: LinkGroup[];
  eyebrow?: string;
  heading: string;
  intro?: string;
  className?: string;
}

/**
 * Grouped internal-linking web. Renders descriptive, crawlable anchors that
 * connect towns, town+service pages, county hubs, and local field guides so
 * every local page sits inside a dense, circular internal link graph.
 */
const LocalLinkWeb = ({
  groups,
  eyebrow = "Explore Locally",
  heading,
  intro,
  className = "",
}: LocalLinkWebProps) => {
  const visible = groups.filter((g) => g.links.length > 0);
  if (!visible.length) return null;

  return (
    <section aria-label="Related local pages" className={`section-padding bg-secondary/20 ${className}`}>
      <div className="container-tight max-w-6xl">
        <div className="mb-10 max-w-3xl">
          {eyebrow && <span className="eyebrow mb-3 block">{eyebrow}</span>}
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">{heading}</h2>
          {intro && <p className="text-muted-foreground mt-3 text-sm md:text-base leading-relaxed">{intro}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {visible.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h3 className="font-heading text-sm font-bold uppercase tracking-[0.16em] text-primary mb-4">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="group flex items-start gap-2 text-sm text-foreground hover:text-primary transition-colors"
                    >
                      <ArrowUpRight className="w-4 h-4 mt-0.5 shrink-0 text-primary/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                      <span className="leading-snug font-body">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocalLinkWeb;
