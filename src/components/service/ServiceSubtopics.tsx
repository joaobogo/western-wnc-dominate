import { CheckCircle2 } from "lucide-react";

/**
 * Named sub-topic sections on a service page.
 *
 * T16 (15 Sep 2026 SEO spec): each of the old site's flat pages —
 * /gutter-protection-installation, /chimney-flashing-repair,
 * /metal-roof-repair and the rest — now 301s to a division page. The redirect
 * only works if the destination actually answers the query the old page ranked
 * for, so every sub-topic its predecessors covered gets a named, linkable
 * section here rather than a passing mention in a bullet list.
 */
export interface Subtopic {
  /** Rendered as the section's H3 and used as its anchor id. */
  title: string;
  body: string;
  /** Short, concrete specifics — what we actually do on that sub-topic. */
  points?: string[];
}

const slugify = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const ServiceSubtopics = ({
  eyebrow = "What This Covers",
  heading,
  intro,
  items,
}: {
  eyebrow?: string;
  heading: string;
  intro?: string;
  items: Subtopic[];
}) => (
  <section className="section-padding bg-background">
    <div className="container-tight">
      <div className="max-w-2xl mb-10 md:mb-12">
        <span className="eyebrow mb-3 block">{eyebrow}</span>
        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">{heading}</h2>
        {intro && <p className="text-muted-foreground font-body leading-relaxed">{intro}</p>}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.title} id={slugify(item.title)} className="border border-border bg-card rounded-sm p-6 scroll-mt-28">
            <h3 className="font-heading font-bold text-foreground text-lg mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">{item.body}</p>
            {item.points && item.points.length > 0 && (
              <ul className="mt-4 space-y-2">
                {item.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[hsl(var(--gold-ink))] shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-sm text-foreground/85 font-body leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServiceSubtopics;
