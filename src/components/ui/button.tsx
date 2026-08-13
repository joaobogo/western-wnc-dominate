import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * THE button system. Exactly four variants exist:
 *
 *   primary     — gold fill. The money action. One per view.
 *   secondary   — outlined. Supporting action beside a primary.
 *   ghost       — no chrome. Tertiary / in-place actions.
 *   destructive — irreversible actions only.
 *
 * Legacy shadcn names (`default`, `outline`, `link`, `highland`, `gold`,
 * `heritage`, `ghost-dark`) are kept as thin aliases so vendored primitives
 * keep working, but new code must use the four canonical names.
 *
 * Visual definitions live in `src/index.css` (`.btn*`) so plain anchors can
 * share the exact same rendering via `buttonClasses()`.
 */
const buttonVariants = cva("btn", {
  variants: {
    variant: {
      primary: "btn-primary",
      secondary: "btn-secondary",
      ghost: "btn-ghost",
      destructive: "btn-destructive",
      // ── aliases ──
      default: "btn-primary",
      highland: "btn-primary",
      heritage: "btn-primary",
      outline: "btn-secondary",
      gold: "btn-secondary",
      "ghost-dark": "btn-secondary btn-on-dark",
      link: "btn-ghost underline underline-offset-4 tracking-normal normal-case px-0 h-auto",
    },
    size: {
      sm: "btn-sm",
      md: "btn-md",
      lg: "btn-lg",
      icon: "btn-icon",
      // ── aliases ──
      default: "btn-md",
      xl: "btn-lg",
    },
    /** Renders the button at full container width. */
    block: {
      true: "btn-block",
      false: "",
    },
    /** Use on dark/forest sections so outlined and ghost stay legible. */
    onDark: {
      true: "btn-on-dark",
      false: "",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    block: false,
    onDark: false,
  },
});

/** Class string for the rare case a non-React surface needs button styling. */
export const buttonClasses = (opts?: Parameters<typeof buttonVariants>[0]) => buttonVariants(opts);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** Shows a spinner, blocks clicks, and announces busy state. */
  loading?: boolean;
  /** Replacement label while loading (defaults to the existing children). */
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, block, onDark, asChild = false, loading = false, loadingText, children, disabled, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, block, onDark }), className)}
        ref={ref}
        data-loading={loading ? "true" : undefined}
        aria-busy={loading || undefined}
        disabled={asChild ? undefined : disabled || loading}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {loading && <Loader2 className="animate-spin" aria-hidden="true" />}
            {loading && loadingText ? loadingText : children}
          </>
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
