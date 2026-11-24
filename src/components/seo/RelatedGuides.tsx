import { Link } from "react-router-dom";
import type { GuideLink } from "@/data/guide-links";

/** One short line of related guides (fix list Nov 23, 2026, Task 2). */
const RelatedGuides = ({ links, className = "" }: { links: GuideLink[]; className?: string }) =>
  links.length ? (
    <aside aria-label="Related guides" className={`border-t border-border bg-background ${className}`}>
      <p className="container-tight py-5 font-body text-body-sm text-foreground/85">
        <span className="font-semibold text-foreground">Related guides: </span>
        {links.map((l, i) => (
          <span key={l.href}>
            {i > 0 && " · "}
            <Link to={l.href} className="font-semibold text-primary underline underline-offset-4">{l.anchor}</Link>
          </span>
        ))}
      </p>
    </aside>
  ) : null;

export default RelatedGuides;
