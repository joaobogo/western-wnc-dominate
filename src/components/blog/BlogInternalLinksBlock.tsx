import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Wrench, BookOpen, Image as ImageIcon, ClipboardList } from "lucide-react";
import type { BlogInternalLinks } from "@/lib/blog-internal-links";

interface Props {
  links: BlogInternalLinks;
  town?: string;
}

/**
 * SEO internal-linking block. Every blog post ships 5 crawlable, descriptive
 * anchors: corresponding city page, corresponding service page, one related
 * blog, one relevant project, and the estimate/contact page.
 */
export const BlogInternalLinksBlock = ({ links, town }: Props) => {
  const rows = [
    { icon: MapPin, kind: "City Page", link: links.cityPage },
    { icon: Wrench, kind: "Service Page", link: links.servicePage },
    links.relatedBlog
      ? { icon: BookOpen, kind: "Related Guide", link: links.relatedBlog }
      : null,
    links.relatedProject
      ? { icon: ImageIcon, kind: "Project Proof", link: links.relatedProject }
      : null,
    { icon: ClipboardList, kind: "Get an Estimate", link: links.estimatePage },
  ].filter(Boolean) as Array<{ icon: any; kind: string; link: { label: string; path: string; description: string } }>;

  return (
    <nav
      aria-label={`Explore related pages${town ? ` for ${town}` : ""}`}
      className="mt-12 pt-10 border-t border-border"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="eyebrow">Explore More</span>
      </div>
      <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-1">
        Continue exploring{town ? ` ${town}` : " Western NC"}
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        Hand-picked next steps — services, projects, and neighboring guides across the same market.
      </p>
      <ul className="grid md:grid-cols-2 gap-3">
        {rows.map(({ icon: Icon, kind, link }) => (
          <li key={link.path + kind}>
            <Link
              to={link.path}
              className="group flex items-start gap-3 p-4 bg-secondary/50 border border-border rounded-sm hover:border-primary/30 hover:bg-secondary transition-colors h-full"
            >
              <span className="flex-shrink-0 w-9 h-9 rounded-sm bg-primary/8 flex items-center justify-center">
                <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-caption font-body font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                  {kind}
                </span>
                <span className="block font-heading font-semibold text-foreground text-sm leading-snug group-hover:text-primary transition-colors">
                  {link.label}
                </span>
                <span className="block text-muted-foreground text-xs mt-1 leading-relaxed line-clamp-2">
                  {link.description}
                </span>
              </span>
              <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-1 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BlogInternalLinksBlock;