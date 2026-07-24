import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
}

const PageBreadcrumbs = ({ items, className = "" }: PageBreadcrumbsProps) => {
  if (!items || items.length === 0) return null;
  return (
    <div className={`container mx-auto px-4 pt-4 sm:pt-6 ${className}`}>
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
    </div>
  );
};

export default PageBreadcrumbs;