import { forwardRef, type ElementType, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared layout utility that reserves space for the fixed <Header />.
 *
 * Use this to wrap any top-of-page section (breadcrumbs, alert bars,
 * mini-hero, promo strips) so it never renders under the fixed header —
 * without hard-coding page-specific `pt-*` classes.
 *
 * Padding is driven by the shared CSS custom properties defined in
 * `src/index.css` (`--header-h`, `--header-h-md`) so header-height
 * changes are picked up globally.
 *
 * Props:
 *  - `as`        — semantic element (default `div`). Use `header`/`section`
 *                  when it makes the outline more meaningful.
 *  - `spacing`   — extra breathing room below the header.
 *      • `tight`  = header only
 *      • `normal` = header + 0.5rem / 0.75rem (default)
 *      • `loose`  = header + 1.5rem / 2rem
 *  - `bleed`     — when `true`, skips the container/px so callers can
 *                  supply their own full-bleed wrapper.
 */
type Spacing = "tight" | "normal" | "loose";

interface HeaderOffsetProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  spacing?: Spacing;
  bleed?: boolean;
  children?: ReactNode;
}

const SPACING: Record<Spacing, string> = {
  tight:
    "pt-[var(--header-h)] md:pt-[var(--header-h-md)]",
  normal:
    "pt-[calc(var(--header-h)+0.5rem)] md:pt-[calc(var(--header-h-md)+0.75rem)]",
  loose:
    "pt-[calc(var(--header-h)+1.5rem)] md:pt-[calc(var(--header-h-md)+2rem)]",
};

const HeaderOffset = forwardRef<HTMLElement, HeaderOffsetProps>(
  ({ as: Tag = "div", spacing = "normal", bleed = false, className, children, ...rest }, ref) => {
    const Component = Tag as ElementType;
    return (
      <Component
        ref={ref}
        data-header-offset={spacing}
        className={cn(
          SPACING[spacing],
          !bleed && "container mx-auto px-4",
          // scroll anchors land below the header, not under it
          "scroll-mt-[var(--header-h)] md:scroll-mt-[var(--header-h-md)]",
          className,
        )}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);
HeaderOffset.displayName = "HeaderOffset";

export default HeaderOffset;