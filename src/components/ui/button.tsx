import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-sm text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-body uppercase tracking-[0.05em]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 font-bold",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline font-bold tracking-normal",
        /** Highland gold gradient — primary conversion CTA */
        highland: "cta-gradient text-accent-foreground font-bold tracking-[0.08em] btn-primary-interactive relative overflow-hidden shadow-[0_8px_25px_-4px_hsl(var(--highland-gold)/0.4)] hover:shadow-[0_12px_30px_-4px_hsl(var(--highland-gold)/0.5)] border border-[hsl(var(--highland-gold)/0.3)]",
        /** Gold outline — secondary premium action */
        gold: "border-2 border-[hsl(var(--highland-gold)/0.5)] text-[hsl(var(--highland-gold))] bg-transparent hover:bg-[hsl(var(--highland-gold)/0.08)] hover:border-[hsl(var(--highland-gold)/0.8)] font-bold btn-ghost-interactive shadow-sm",
        /** Ghost premium — dark section secondary */
        "ghost-dark": "border-2 border-[hsl(var(--dark-section-foreground)/0.2)] text-[hsl(var(--dark-section-foreground))] hover:bg-[hsl(var(--dark-section-foreground)/0.1)] hover:border-[hsl(var(--highland-gold)/0.4)] font-semibold btn-ghost-interactive",
        /** Heritage — deep green filled */
        heritage: "bg-primary text-primary-foreground font-bold hover:bg-primary/90 btn-ghost-interactive shadow-lg",
      },
      size: {
        default: "h-12 px-6 py-3 text-base md:text-[17px]",
        sm: "h-10 px-4 text-[14px] md:text-base",
        lg: "h-14 px-8 text-lg md:text-[19px] tracking-[0.1em]",
        xl: "h-16 px-10 md:px-14 text-xl md:text-[22px] tracking-[0.12em]",
        icon: "h-11 w-11",
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
