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
    <HeaderOffset spacing="tight" className={cn("py-2 border-b border-border/40 bg-background/50 backdrop-blur-sm", className)}>
      <Breadcrumb aria-label="Breadcrumb">
        <BreadcrumbList className="text-[11px] sm:text-xs tracking-wide uppercase font-medium">
          {items.map((c, i) => {
            const isLast = i === items.length - 1;
            return (
              <Fragment key={`${c.url}-${i}`}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="truncate max-w-[60vw] sm:max-w-none text-muted-foreground/70">
                      {c.name}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={c.url} className="hover:text-[hsl(var(--heritage-green))] transition-colors">
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