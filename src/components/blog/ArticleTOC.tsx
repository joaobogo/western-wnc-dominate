import { useEffect, useState } from "react";
import { List } from "lucide-react";

export interface TocItem {
  id: string;
  label: string;
}

/**
 * Sticky desktop table of contents (Design Prompt 19).
 * Highlights the section currently in view and keeps long guides navigable.
 */
const ArticleTOC = ({ items }: { items: TocItem[] }) => {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (!items.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-120px 0px -65% 0px", threshold: 0 },
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="hidden lg:block bg-card border border-border rounded-sm p-5"
    >
      <div className="flex items-center gap-2 mb-3">
        <List className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" >
        <h2 className="font-heading font-semibold text-sm text-foreground">In This Article</h2>
      </div>
      <div className="space-y-0.5">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={activeId === item.id ? "true" : undefined}
            className="article-toc-link"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default ArticleTOC;
