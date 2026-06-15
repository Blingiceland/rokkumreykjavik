"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-display uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-base disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Warm amber CTA.
        // Text colour comes from --on-amber so it reads on the primary colour
        // in every look (gold/yellow -> dark, blue -> white).
        primary:
          "bg-amber text-[color:var(--on-amber)] hover:bg-amber-bright hover:-translate-y-0.5",
        // Neon outline secondary.
        neon:
          "border border-neon/50 text-neon bg-neon/5 hover:bg-neon/10 hover:border-neon hover:-translate-y-0.5",
        ghost:
          "border border-base-line text-bone hover:border-neon hover:text-neon bg-transparent",
        link: "text-bone-dim hover:text-neon underline-offset-4 hover:underline p-0 h-auto rounded-none",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-12 px-7 text-sm",
        lg: "h-14 px-9 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
