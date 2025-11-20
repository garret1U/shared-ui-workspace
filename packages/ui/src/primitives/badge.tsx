import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80 [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80 [a&]:hover:bg-destructive/90",
        success:
          "border-transparent bg-success text-success-foreground shadow hover:bg-success/80 [a&]:hover:bg-success/90",
        warning:
          "border-transparent bg-warning text-warning-foreground shadow hover:bg-warning/80 [a&]:hover:bg-warning/90",
        info:
          "border-transparent bg-info text-info-foreground shadow hover:bg-info/80 [a&]:hover:bg-info/90",
        outline: "text-foreground",
        // Status-specific variants
        active:
          "border-transparent bg-success/20 text-success hover:bg-success/30 [a&]:hover:bg-success/40",
        inactive:
          "border-transparent bg-muted text-muted-foreground hover:bg-muted/80 [a&]:hover:bg-muted/90",
        pending:
          "border-transparent bg-warning/20 text-warning hover:bg-warning/30 [a&]:hover:bg-warning/40",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

function Badge({ className, variant, asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
