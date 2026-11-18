import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { MOST_REQUESTED_LINKS } from "@/data/most-requested-links";

/** Homepage "Most requested" row; destinations live in src/data/most-requested-links.ts. */
const MostRequestedLinks = () => (
  <nav aria-label="Most requested services" className="bg-background border-b border-border/60">
    <div className="mx-auto max-w-7xl px-5 md:px-10 py-4 flex flex-wrap items-center gap-x-2 gap-y-2">
      <span className="font-body text-body-sm font-bold text-foreground mr-2">Most requested:</span>
      <ul className="flex flex-wrap gap-2">
        {MOST_REQUESTED_LINKS.map((l) => (
          <li key={l.to}>
            <Link
              to={l.to}
              className="inline-flex items-center gap-1 min-h-[44px] px-3 border border-border bg-card font-body text-body-sm text-foreground transition-colors hover:border-[hsl(var(--highland-gold))]"
            >
              {l.label}
              <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </nav>
);

export default MostRequestedLinks;
