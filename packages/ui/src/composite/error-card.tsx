'use client'

import * as React from 'react'
import { AlertCircle } from 'lucide-react'
import { Card, CardContent } from '../primitives/card'
import { Button } from '../primitives/button'
import { cn } from '../lib/utils'

export interface ErrorCardProps extends React.HTMLAttributes<HTMLDivElement> {
  error: Error | string
  onRetry?: () => void
  title?: string
  iconSize?: number
}

export function ErrorCard({
  error,
  onRetry,
  title = 'Error',
  iconSize = 32,
  className,
  ...props
}: ErrorCardProps): React.JSX.Element {
  const message = typeof error === 'string' ? error : error.message

  return (
    <Card className={cn('w-full border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950', className)} {...props}>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="text-red-600 dark:text-red-400" style={{ width: iconSize, height: iconSize }} />
        <p className="mt-4 font-medium text-red-600 dark:text-red-400">{title}</p>
        <p className="mt-2 max-w-md text-center text-sm text-red-600 dark:text-red-400">{message}</p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" className="mt-4">
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
