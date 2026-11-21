import { Fragment } from "react";
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
import { cn } from "@/lib/utils";

export interface BreadcrumbCrumb {
  name: string;
  url: string;
}

/**
 * Reusable, mobile-friendly visible breadcrumbs.
 *
 * This component renders the VISIBLE trail only. The matching BreadcrumbList
 * JSON-LD is emitted by SEOHead through `buildPageSchema({ ...breadcrumbs })`
 * on every page type, so pass the SAME `items` array to both and the trail and
 * the schema stay in sync. (It used to inject its own <script> as a fallback;
 * that path never fired on any prerendered page and JSON-LD outside SEOHead is
 * no longer allowed — one data-seo-ld node per page.)
 *
 * The last item is treated as the current page (no link).
 */
interface PageBreadcrumbsProps {
  items: BreadcrumbCrumb[];
  className?: string;
}

const PageBreadcrumbs = ({ items, className = "" }: PageBreadcrumbsProps) => {
  return (
    // Phones (under 768px): the visible trail is hidden (John, Nov 21: it wrapped
    // and looked broken above the hero, and phones have the menu and back
    // button). The wrapper still reserves the fixed header's height, and the
    // BreadcrumbList JSON-LD from SEOHead is unchanged, so search results keep
    // the trail. Tablets and desktops keep it on one tidy line.
    <HeaderOffset spacing="tight" className={cn("pb-2 border-b border-border/40 bg-background/50 backdrop-blur-sm max-md:pb-0 max-md:border-b-0 max-md:bg-transparent max-md:backdrop-blur-none", className)}>
      <Breadcrumb aria-label="Breadcrumb" className="pt-2 max-md:hidden">
        <BreadcrumbList className="text-[11px] sm:text-xs tracking-wide uppercase font-medium">
          {items.map((c, i) => {
            const isLast = i === items.length - 1;
            return (
              <Fragment key={`${c.url}-${i}`}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="truncate max-w-[60vw] sm:max-w-none text-muted-foreground">
                      {c.name}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      {/* inline-flex centres the text inside the 44px touch
                          target the global CSS gives links, so every crumb
                          sits on the same line. */}
                      <Link to={c.url} className="inline-flex items-center hover:text-[hsl(var(--heritage-green))] transition-colors">
                        {c.name}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator className="opacity-40" />}
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </HeaderOffset>
  );
};

export default PageBreadcrumbs;