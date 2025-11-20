import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils"

const spinnerVariants = cva(
  "inline-block animate-spin rounded-full border-solid border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
  {
    variants: {
      size: {
        sm: "h-4 w-4 border-2",
        md: "h-6 w-6 border-2",
        lg: "h-8 w-8 border-[3px]",
        xl: "h-12 w-12 border-4",
      },
      variant: {
        default: "border-primary",
        secondary: "border-secondary",
        destructive: "border-destructive",
        success: "border-success",
        warning: "border-warning",
        info: "border-info",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
)

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string
}

function Spinner({
  className,
  size,
  variant,
  label,
  ...props
}: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label || "Loading"}
      className={cn(spinnerVariants({ size, variant }), className)}
      {...props}
    >
      <span className="sr-only">{label || "Loading..."}</span>
    </div>
  )
}

export { Spinner, spinnerVariants }
