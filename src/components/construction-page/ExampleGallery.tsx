import type { ContentImage } from "@/content/construction/types";

/**
 * Generated design examples for services with no real Highlander photos yet
 * (John, 21 Nov 2026). Every image carries a visible "Design example" label
 * and no town caption, so nobody reads it as a finished Highlander job.
 */
const ExampleGallery = ({ heading, body, images }: { heading: string; body?: string; images: ContentImage[] }) => (
  <section className="section-padding bg-secondary/40" aria-labelledby="examples-heading">
    <div className="container-tight">
      <h2 id="examples-heading" className="section-heading max-w-2xl">{heading}</h2>
      {body && <p className="mt-3 max-w-2xl font-body text-muted-foreground">{body}</p>}
      <ul className={`mt-8 grid gap-2.5 md:gap-5 ${images.length > 1 ? "grid-cols-2" : "max-w-3xl grid-cols-1"}`}>
        {images.map((img) => (
          <li key={img.src} className="relative overflow-hidden rounded-sm bg-muted">
            <img src={img.src} srcSet={img.srcSet} sizes="(min-width: 768px) 560px, 50vw" alt={img.alt} width={800} height={533} loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover" />
            <span className="absolute left-2 top-2 bg-[hsl(var(--heritage-charcoal)/0.85)] px-2 py-0.5 font-body text-[0.68rem] font-bold uppercase tracking-[0.12em] text-white">
              Design example
            </span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default ExampleGallery;
