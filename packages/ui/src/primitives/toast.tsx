'use client'

import { Toaster as SonnerToaster } from 'sonner'
import type { ToasterProps } from 'sonner'

export type { ToasterProps }

/**
 * Toast component using Sonner
 *
 * Usage in app layout:
 * ```tsx
 * import { Toaster } from '@workspace/ui'
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         {children}
 *         <Toaster position="bottom-right" />
 *       </body>
 *     </html>
 *   )
 * }
 * ```
 *
 * Usage in components:
 * ```tsx
 * import { toast } from 'sonner'
 *
 * // Success
 * toast.success('Item saved successfully')
 *
 * // Error
 * toast.error('Failed to save item')
 *
 * // Loading
 * const toastId = toast.loading('Saving...')
 * // Later:
 * toast.success('Saved!', { id: toastId })
 *
 * // Custom
 * toast('Custom message', {
 *   description: 'Additional details',
 *   action: {
 *     label: 'Undo',
 *     onClick: () => handleUndo()
 *   }
 * })
 * ```
 */
export function Toaster(props: ToasterProps) {
  return (
    <SonnerToaster
      theme="system"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  )
}

// Re-export toast function for convenience
export { toast } from 'sonner'
