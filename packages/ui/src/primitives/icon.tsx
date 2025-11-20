import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const iconVariants = cva('shrink-0', {
  variants: {
    size: {
      xs: 'size-3',
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
      xl: 'size-8',
      '2xl': 'size-10',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface IconProps
  extends React.SVGProps<SVGSVGElement>,
    VariantProps<typeof iconVariants> {
  as?: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

/**
 * Icon component for use with @heroicons/react
 *
 * @example
 * ```tsx
 * import { BeakerIcon } from '@heroicons/react/24/outline'
 * import { Icon } from '@garret1u/ui'
 *
 * <Icon as={BeakerIcon} size="lg" className="text-blue-500" />
 * ```
 *
 * @example with solid variant
 * ```tsx
 * import { BeakerIcon } from '@heroicons/react/24/solid'
 *
 * <Icon as={BeakerIcon} size="sm" />
 * ```
 *
 * @example direct import and use
 * ```tsx
 * import { HeroiconsOutline } from '@garret1u/ui'
 *
 * <Icon as={HeroiconsOutline.BeakerIcon} size="md" />
 * ```
 */
export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, size, as: Component, ...props }, ref) => {
    if (!Component) {
      return null
    }

    return (
      <Component
        ref={ref}
        className={cn(iconVariants({ size, className }))}
        {...props}
      />
    )
  }
)
Icon.displayName = 'Icon'

// Re-export heroicons for convenience
export * as HeroiconsOutline from '@heroicons/react/24/outline'
export * as HeroiconsSolid from '@heroicons/react/24/solid'
export * as HeroiconsMini from '@heroicons/react/20/solid'
