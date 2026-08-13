import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-none text-body md:text-body font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 font-body uppercase tracking-[0.16em] shadow-md border-2 border-transparent active:scale-[0.98] hover:shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/95 shadow-md hover:shadow-primary/20",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold border-border/50 hover:border-border",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline font-bold tracking-normal",
        /** Highland gold gradient — primary conversion CTA */
        highland: "cta-gradient text-accent-foreground font-extrabold tracking-[0.1em] btn-primary-interactive relative overflow-hidden shadow-[0_10px_30px_-5px_hsl(var(--highland-gold)/0.5)] hover:shadow-[0_15px_35px_-5px_hsl(var(--highland-gold)/0.6)] border border-[hsl(var(--highland-gold)/0.4)] hover:scale-[1.02] active:scale-[0.98]",
        /** Gold outline — secondary premium action */
        gold: "border-2 border-[hsl(var(--highland-gold)/0.5)] text-[hsl(var(--gold-ink))] bg-transparent hover:bg-[hsl(var(--highland-gold)/0.08)] hover:border-[hsl(var(--highland-gold)/0.8)] font-bold btn-ghost-interactive shadow-sm",
        /** Ghost premium — dark section secondary */
        "ghost-dark": "border-2 border-[hsl(var(--dark-section-foreground)/0.2)] text-[hsl(var(--dark-section-foreground))] hover:bg-[hsl(var(--dark-section-foreground)/0.1)] hover:border-[hsl(var(--highland-gold)/0.4)] font-semibold btn-ghost-interactive",
        /** Heritage — deep green filled */
        heritage: "bg-primary text-primary-foreground font-bold hover:bg-primary/90 btn-ghost-interactive shadow-lg",
      },
      size: {
        default: "h-14 px-10 text-body md:text-body",
        sm: "h-12 px-8 text-body-sm md:text-body",
        lg: "h-16 px-12 text-body md:text-body-lg tracking-[0.12em]",
        xl: "h-20 px-14 md:px-16 text-body-lg md:text-heading-sm tracking-[0.14em]",
        icon: "h-14 w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
