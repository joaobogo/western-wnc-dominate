import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/** One page-specific angle (plan page notes): a heading, 1–3 short paragraphs, optional links. */
const AngleBlock = ({ eyebrow, heading, paragraphs, links }: { eyebrow?: string; heading: string; paragraphs: string[]; links?: { label: string; href: string }[] }) => (
  <section className="section-padding bg-background" aria-labelledby="angle-heading">
    <div className="container-tight max-w-3xl">
      {eyebrow && <p className="eyebrow mb-2 block">{eyebrow}</p>}
      <h2 id="angle-heading" className="section-heading">{heading}</h2>
      <div className="mt-5 space-y-4 font-body text-body leading-relaxed text-foreground/85">
        {paragraphs.map((p) => <p key={p}>{p}</p>)}
      </div>
      {links && links.length > 0 && (
        <ul className="mt-5 flex flex-col gap-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link to={l.href} className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-primary underline-offset-4 hover:underline">
                {l.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  </section>
);

export default AngleBlock;
