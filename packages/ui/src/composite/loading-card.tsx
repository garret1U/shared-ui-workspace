'use client'

import * as React from 'react'
import { Loader2 } from 'lucide-react'
import { Card, CardContent } from '../primitives/card'
import { cn } from '../lib/utils'

export interface LoadingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string
  iconSize?: number
}

export function LoadingCard({
  message = 'Loading...',
  iconSize = 32,
  className,
  ...props
}: LoadingCardProps): React.JSX.Element {
  return (
    <Card className={cn('w-full', className)} {...props}>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <Loader2 className="animate-spin text-primary" style={{ width: iconSize, height: iconSize }} />
        <p className="mt-4 text-sm text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  )
}
