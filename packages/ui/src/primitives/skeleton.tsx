import * as React from "react"

import { cn } from "../lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'pulse' | 'shimmer'
}

function Skeleton({
  className,
  variant = 'shimmer',
  ...props
}: SkeletonProps) {
  const animation = variant === 'shimmer'
    ? 'animate-shimmer bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:1000px_100%]'
    : 'animate-pulse bg-muted'

  return (
    <div
      className={cn("rounded-md", animation, className)}
      {...props}
    />
  )
}

export { Skeleton }
