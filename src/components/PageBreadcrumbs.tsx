import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import HeaderOffset from "@/components/layout/HeaderOffset";
import { breadcrumbSchema } from "@/components/SEOHead";

export interface BreadcrumbCrumb {
  name: string;
  url: string;
}

/**
 * Reusable, mobile-friendly visible breadcrumbs.
 * Pass the SAME `items` array to both this component and
 * `buildPageSchema({... breadcrumbs: items })` so the visible
 * trail and the BreadcrumbList JSON-LD stay in sync.
 *
 * The last item is treated as the current page (no link).
 */
interface PageBreadcrumbsProps {
  items: BreadcrumbCrumb[];
  className?: string;
  /**
   * When true (default), emits a BreadcrumbList JSON-LD script into
   * <head> matching the visible trail. Set false only if the page
   * already ships an equivalent BreadcrumbList via buildPageSchema()
   * to avoid duplicate schema.
   */
  emitSchema?: boolean;
}

const SCHEMA_SCRIPT_ID = "ld-breadcrumbs";

const PageBreadcrumbs = ({ items, className = "", emitSchema = true }: PageBreadcrumbsProps) => {
  useEffect(() => {
    if (!emitSchema || !items || items.length === 0) return;
    let el = document.getElementById(SCHEMA_SCRIPT_ID) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = SCHEMA_SCRIPT_ID;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(breadcrumbSchema(items));
    return () => {
      const existing = document.getElementById(SCHEMA_SCRIPT_ID);
      if (existing) existing.remove();
    };
  }, [items, emitSchema]);

  if (!items || items.length === 0) return null;
  return (
    <HeaderOffset as="nav" aria-label="Breadcrumb" spacing="normal" className={className}>
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((c, i) => {
            const isLast = i === items.length - 1;
            return (
              <BreadcrumbItem key={`${c.url}-${i}`}>
                {isLast ? (
                  <BreadcrumbPage className="truncate max-w-[60vw] sm:max-w-none">
                    {c.name}
                  </BreadcrumbPage>
                ) : (
                  <>
                    <BreadcrumbLink asChild>
                      <Link to={c.url}>{c.name}</Link>
                    </BreadcrumbLink>
                    <BreadcrumbSeparator />
                  </>
                )}
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </HeaderOffset>
  );
};

export default PageBreadcrumbs;