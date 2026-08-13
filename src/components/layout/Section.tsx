import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * 8pt vertical rhythm system.
 *
 * Densities (all values are multiples of 8px):
 *  - compact: 32 / 48 / 64
 *  - default: 48 / 80 / 96
 *  - feature: 64 / 112 / 128
 *
 * Container widths pair with the 8pt horizontal gutters defined by
 * `.container-rhythm` (16 / 24 / 32).
 */
export type SectionDensity = "compact" | "default" | "feature" | "none";
export type SectionWidth = "narrow" | "tight" | "wide" | "full";

const densityClass: Record<SectionDensity, string> = {
  compact: "section-compact",
  default: "section-default",
  feature: "section-feature",
  none: "",
};

const widthClass: Record<SectionWidth, string> = {
  narrow: "container-rhythm max-w-3xl",
  tight: "container-rhythm max-w-5xl",
  wide: "container-rhythm max-w-7xl",
  full: "w-full",
};

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  density?: SectionDensity;
  width?: SectionWidth;
  /** Classes applied to the inner container element. */
  containerClassName?: string;
  /** Render without the inner container wrapper. */
  bare?: boolean;
  as?: "section" | "div" | "aside" | "footer";
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      density = "default",
      width = "wide",
      className,
      containerClassName,
      bare = false,
      as: Tag = "section",
      children,
      ...rest
    },
    ref,
  ) => {
    const Component = Tag as React.ElementType;
    return (
      <Component ref={ref} className={cn(densityClass[density], className)} {...rest}>
        {bare ? children : <div className={cn(widthClass[width], containerClassName)}>{children}</div>}
      </Component>
    );
  },
);

Section.displayName = "Section";

export default Section;
