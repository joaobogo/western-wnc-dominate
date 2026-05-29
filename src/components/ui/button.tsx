import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        /** Highland gold gradient — primary conversion CTA */
        highland: "cta-gradient text-accent-foreground font-heading font-bold tracking-wide btn-primary-interactive relative overflow-hidden shadow-[0_8px_20px_-4px_hsl(var(--highland-gold)/0.3)] hover:shadow-[0_12px_25px_-4px_hsl(var(--highland-gold)/0.4)] border border-[hsl(var(--highland-gold)/0.2)]",
        /** Gold outline — secondary premium action */
        gold: "border border-[hsl(var(--highland-gold)/0.4)] text-[hsl(var(--highland-gold))] bg-transparent hover:bg-[hsl(var(--highland-gold)/0.08)] hover:border-[hsl(var(--highland-gold)/0.6)] font-body font-bold btn-ghost-interactive shadow-sm",
        /** Ghost premium — dark section secondary */
        "ghost-dark": "border border-[hsl(var(--dark-section-foreground)/0.2)] text-[hsl(var(--dark-section-foreground))] hover:bg-[hsl(var(--dark-section-foreground)/0.08)] hover:border-[hsl(var(--highland-gold)/0.3)] font-body font-semibold btn-ghost-interactive",
        /** Heritage — deep green filled */
        heritage: "bg-primary text-primary-foreground font-body font-semibold hover:bg-primary/90 btn-ghost-interactive",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-[13px]",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 md:px-12 text-[15px]",
        icon: "h-10 w-10",
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
