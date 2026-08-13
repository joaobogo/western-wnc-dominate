import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/**
 * Shared skeleton shapes. They mirror the real layout so nothing shifts when
 * content lands. No raw spinners on primary content — see docs/design-tokens.md.
 */

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("border border-border rounded-sm overflow-hidden bg-card", className)}>
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/5" />
        <Skeleton className="h-3 w-2/5" />
      </div>
    </div>
  );
}

/** Gallery / project grid placeholder. */
export function GalleryGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Blog list placeholder: one feature card plus a card grid. */
export function BlogListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="space-y-6" aria-hidden="true">
      <div className="border border-border rounded-sm overflow-hidden bg-card grid md:grid-cols-12">
        <Skeleton className="md:col-span-5 h-56 md:h-full rounded-none" />
        <div className="md:col-span-7 p-6 md:p-8 space-y-4">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-7 w-11/12" />
          <Skeleton className="h-7 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-3 w-40" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

/** Dashboard stat tiles. */
export function StatGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border border-border rounded p-4 space-y-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-7 w-12" />
        </div>
      ))}
    </div>
  );
}

/** Table / list placeholder for dashboards. */
export function TableSkeleton({ rows = 6, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="border border-border rounded overflow-hidden" aria-hidden="true">
      <div className="bg-muted/50 px-3 py-2 flex gap-3">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-3 flex-1" />
        ))}
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="px-3 py-3 flex gap-3">
            {Array.from({ length: cols }).map((_, c) => (
              <Skeleton key={c} className="h-3 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Two-column breakdown panels used across the dashboard. */
export function BreakdownGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border border-border rounded">
          <div className="px-3 py-2 border-b border-border">
            <Skeleton className="h-3 w-40" />
          </div>
          <div className="divide-y divide-border">
            {Array.from({ length: 5 }).map((_, r) => (
              <div key={r} className="px-3 py-2 flex items-center gap-3">
                <Skeleton className="h-3 flex-1" />
                <Skeleton className="h-1.5 w-24" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Screen-reader announcement to pair with any skeleton. */
export function LoadingAnnouncement({ label }: { label: string }) {
  return (
    <p role="status" aria-live="polite" className="sr-only">
      {label}
    </p>
  );
}