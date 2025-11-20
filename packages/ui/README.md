# @garret1u/ui

**Version: 2.2.0** | Shared UI component library built with **shadcn/ui**, **Radix UI**, and **Tailwind CSS v4**.

## Features

- 🎨 **8 Beautiful Themes** - 3 neutral (Zinc, Slate, Stone) + 5 accent colors (Blue, Green, Orange, Red, Violet)
- 🌓 **Light/Dark Mode** - Full support with system preference detection
- 🎯 **OKLCH Color Space** - Perceptually uniform colors
- ⚡ **Tailwind v4** - Lightning-fast Rust engine with CSS-first configuration
- 🧩 **40+ Components** - Primitives + composites based on shadcn/ui patterns
- 💾 **Persistent Preferences** - Theme choices saved in localStorage
- ♿ **Accessible** - Built on Radix UI primitives with ARIA support

## Quick Start

```bash
# Install the package
pnpm add @garret1u/ui

# Install peer dependencies
pnpm add react react-dom next
```

```typescript
// app/layout.tsx
import '@garret1u/ui/styles'
import { Toaster, ThemeSwitcher } from '@garret1u/ui'
import { Providers } from './providers'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>
          <header>
            <ThemeSwitcher variant="separate" align="end" />
          </header>
          {children}
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  )
}
```

```typescript
// app/providers.tsx
'use client'
import { ThemeProvider } from '@garret1u/ui'

export function Providers({ children }) {
  return (
    <ThemeProvider defaultTheme="zinc" defaultMode="system">
      {children}
    </ThemeProvider>
  )
}
```

> **📦 Publishing**: This package is published as `@garret1u/ui` on GitHub Packages.
> See [GitHub Packages Deployment Guide](../../GITHUB_PACKAGES_DEPLOYMENT.md) for deployment instructions.

## Installation

### For Monorepo Projects

```bash
npm install @workspace/ui
```

### For Separate Repositories (via GitHub Packages)

```bash
# Install from GitHub Packages
npm install @garret1u/ui

# See GITHUB_PACKAGES_DEPLOYMENT.md for complete setup
```

## Setup

### 1. Import Styles

Add the following to your `app/layout.tsx` or `app/globals.css`:

```typescript
// app/layout.tsx
import '@workspace/ui/styles'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
```

### 2. Configure Tailwind

Update your `tailwind.config.ts` to include the UI package:

```typescript
import type { Config } from 'tailwindcss'
import uiConfig from '@workspace/ui/tailwind.config'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    // Include UI package components
    './node_modules/@workspace/ui/src/**/*.{ts,tsx}',
  ],
  presets: [uiConfig], // Extend UI package config
}

export default config
```

### 3. Add ThemeProvider (Required)

Wrap your application with the `ThemeProvider`:

```typescript
// app/providers.tsx
'use client'

import { ThemeProvider } from '@workspace/ui'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      defaultTheme="zinc"
      defaultMode="system"
      storageKey="my-app-theme"
    >
      {children}
    </ThemeProvider>
  )
}
```

```typescript
// app/layout.tsx
import '@workspace/ui/styles'
import { Toaster } from '@workspace/ui'
import { Providers } from './providers'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>
          {children}
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  )
}
```

## Theming System

### Available Themes

The library includes 8 carefully crafted themes:

**Neutral Themes** (Professional, versatile):
- **Zinc** (default) - Cool modern gray with subtle blue undertones
- **Slate** - Professional blue-gray with excellent readability
- **Stone** - Warm natural gray with earthy undertones

**Accent Themes** (Vibrant, expressive):
- **Blue** - Classic blue with vibrant accents
- **Green** - Fresh, vibrant green
- **Orange** - Energetic, warm orange
- **Red** - Bold, assertive red
- **Violet** - Elegant, royal violet

Each theme includes:
- ✅ Full light and dark mode variants
- ✅ Perceptually uniform OKLCH colors
- ✅ Complete semantic color palette
- ✅ Optimized shadows for each mode
- ✅ Focus states and accessibility

### Theme Switcher Component

Add the `ThemeSwitcher` to your UI to let users change themes:

```typescript
import { ThemeSwitcher } from '@workspace/ui'

export function Header() {
  return (
    <header>
      <h1>My App</h1>

      {/* Separate dropdowns for theme and mode */}
      <ThemeSwitcher variant="separate" align="end" />

      {/* Or combined in one dropdown */}
      <ThemeSwitcher variant="combined" align="end" />
    </header>
  )
}
```

**Variants:**
- `separate` - Two icon buttons (color palette + sun/moon/monitor)
- `combined` - Single palette button with all options

### Programmatic Theme Control

Use the `useTheme` hook to control themes programmatically:

```typescript
'use client'

import { useTheme } from '@workspace/ui'

export function ThemeControls() {
  const { theme, mode, setTheme, setMode } = useTheme()

  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Current mode: {mode}</p>

      <button onClick={() => setTheme('blue')}>
        Switch to Blue Theme
      </button>

      <button onClick={() => setMode('dark')}>
        Enable Dark Mode
      </button>
    </div>
  )
}
```

**Available values:**
- `theme`: `'zinc' | 'slate' | 'stone' | 'blue' | 'green' | 'orange' | 'red' | 'violet'`
- `mode`: `'light' | 'dark' | 'system'`

### ThemeProvider Props

```typescript
interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: Theme // Default: 'zinc'
  defaultMode?: Mode   // Default: 'system'
  storageKey?: string  // Default: 'ui-theme'
}
```

The provider automatically:
- Loads saved preferences from `localStorage`
- Applies the theme via `data-theme` attribute
- Applies light/dark mode via class
- Detects system preference changes
- Persists user selections

### Design Tokens

All themes provide comprehensive design tokens:

**Colors:**
- `--color-background`, `--color-foreground`
- `--color-primary`, `--color-primary-foreground`
- `--color-secondary`, `--color-secondary-foreground`
- `--color-accent`, `--color-accent-foreground`
- `--color-muted`, `--color-muted-foreground`
- `--color-destructive`, `--color-success`, `--color-warning`, `--color-info`
- `--color-border`, `--color-input`, `--color-ring`

**Typography:**
- Font weights (300-700)
- Letter spacing (tighter to wider)
- Line heights (tight to loose)

**Motion:**
- Easing functions (spring, bounce)
- Duration tokens (instant to slower)

**Layout:**
- Z-index scale (dropdown to tooltip)
- Container widths (sm to 2xl)
- Border radius tokens

**Shadows:**
- 6-tier depth system (xs to 2xl)
- Optimized for light/dark modes

## Usage

### Basic Components

```typescript
import { Button, Card, Input, Label } from '@workspace/ui'

export default function MyComponent() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Login</Card.Title>
        <Card.Description>Enter your credentials</Card.Description>
      </Card.Header>
      <Card.Content className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <Button>Sign In</Button>
      </Card.Content>
    </Card>
  )
}
```

### Button Variants

```typescript
import { Button } from '@workspace/ui'

<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">
  <Icon />
</Button>
```

### Loading State

```typescript
import { LoadingCard } from '@workspace/ui'

export default function MyPage() {
  if (isLoading) {
    return <LoadingCard message="Loading data..." />
  }

  return <div>Content</div>
}
```

### Error Handling

```typescript
import { ErrorCard } from '@workspace/ui'

export default function MyPage() {
  if (error) {
    return (
      <ErrorCard
        error={error}
        onRetry={() => refetch()}
        title="Failed to load data"
      />
    )
  }

  return <div>Content</div>
}
```

### Data Table

```typescript
import { DataTable } from '@workspace/ui'
import { ColumnDef } from '@tanstack/react-table'

interface User {
  id: string
  name: string
  email: string
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
]

export default function UsersTable({ users }: { users: User[] }) {
  return (
    <DataTable
      columns={columns}
      data={users}
      searchKey="name"
      searchPlaceholder="Search by name..."
    />
  )
}
```

### Dialogs

```typescript
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Button } from '@workspace/ui'

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
    </DialogHeader>
    <div>This action cannot be undone.</div>
  </DialogContent>
</Dialog>
```

### Toast Notifications

```typescript
import { toast } from '@workspace/ui'

// Success
toast.success('Item saved successfully')

// Error
toast.error('Failed to save item')

// Loading
const toastId = toast.loading('Saving...')
// Later:
toast.success('Saved!', { id: toastId })

// With action
toast('Item archived', {
  action: {
    label: 'Undo',
    onClick: () => handleUndo()
  }
})
```

### Select

```typescript
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui'

<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>
```

### Dropdown Menu

```typescript
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Button
} from '@workspace/ui'

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
    <DropdownMenuItem onClick={handleDuplicate}>Duplicate</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-red-600" onClick={handleDelete}>
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Tabs

```typescript
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui'

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings here</TabsContent>
  <TabsContent value="password">Password settings here</TabsContent>
</Tabs>
```

## Available Components

### Primitive Components (20)

1. **Button** - Button with 6 variants and 4 sizes
2. **Card** - Card container with sub-components
3. **Dialog** - Modal dialog
4. **Input** - Text input field
5. **Label** - Form label
6. **Select** - Dropdown select
7. **Checkbox** - Checkbox input
8. **Switch** - Toggle switch
9. **Textarea** - Multi-line text input
10. **Badge** - Status badge with variants
11. **Alert** - Alert component
12. **Skeleton** - Loading placeholder
13. **Tooltip** - Hover tooltip
14. **Dropdown Menu** - Dropdown menu
15. **Tabs** - Tab navigation
16. **Separator** - Visual separator
17. **Avatar** - User avatar
18. **Progress** - Progress bar
19. **Table** - Data table
20. **Popover** - Popover component
21. **Toast** - Toast notifications (Sonner)

### Composite Components (4)

1. **LoadingCard** - Card with loading spinner
2. **ErrorCard** - Card with error state and retry
3. **DataTable** - Full-featured data table with TanStack React Table
4. **ThemeSwitcher** - Theme and mode selector UI

### Utilities

- **cn()** - Merge Tailwind classes intelligently
- **formatCurrency()** - Format numbers as currency
- **formatNumber()** - Format numbers with separators
- **formatPercent()** - Format percentages
- **truncate()** - Truncate text with ellipsis

## TypeScript

All components are fully typed with TypeScript. Import types as needed:

```typescript
import type { ButtonProps, CardProps } from '@workspace/ui'
```

## Styling

Components use Tailwind CSS with CSS variables for theming. Customize colors by overriding CSS variables in your `globals.css`:

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* ... more variables */
}
```

## Migration Guide

### From v2.0.0 to v2.2.0

If you're upgrading from v2.0.0 (basic Tailwind v4), follow these steps:

1. **Update the package:**
```bash
pnpm add @garret1u/ui@2.2.0
```

2. **Replace globals.css import with themes.css:**
```typescript
// Before (app/layout.tsx)
import './globals.css'

// After
import '@garret1u/ui/styles'
```

3. **Add ThemeProvider:**
```typescript
// app/providers.tsx
'use client'

import { ThemeProvider } from '@garret1u/ui'

export function Providers({ children }) {
  return (
    <ThemeProvider defaultTheme="zinc" defaultMode="system">
      {children}
    </ThemeProvider>
  )
}
```

4. **Optional: Add ThemeSwitcher to your UI:**
```typescript
import { ThemeSwitcher } from '@garret1u/ui'

export function Header() {
  return (
    <header>
      <ThemeSwitcher variant="separate" align="end" />
    </header>
  )
}
```

### Benefits of the New Theme System

- **Better Color Science**: OKLCH provides perceptually uniform colors
- **More Options**: 8 themes instead of 1 default
- **User Choice**: Let users pick their preferred theme
- **Persistent**: Preferences saved in localStorage
- **System Integration**: Respects system dark mode preference
- **Enhanced Tokens**: More comprehensive design token system

## Contributing

1. Add new components to `src/primitives/` or `src/composite/`
2. Export from `src/primitives/index.ts` or `src/composite/index.ts`
3. Run `npm run type-check` to verify types
4. Update documentation

## Changelog

### v2.2.0 (2025-11-19)
- ✨ Added 5 accent themes (Blue, Green, Orange, Red, Violet)
- 📝 Complete 8-theme palette with light/dark variants
- 🎨 All themes use OKLCH color space
- 📚 Enhanced documentation with migration guide

### v2.1.0 (2025-11-19)
- ✨ Added multi-theme system with ThemeProvider
- ✨ Added ThemeSwitcher UI component
- 🎨 Initial 3 neutral themes (Zinc, Slate, Stone)
- 🎯 Enhanced design tokens (typography, motion, layout, shadows)
- 💾 localStorage persistence for theme preferences
- 🌓 System preference detection for dark mode
- 📝 Comprehensive theme documentation

### v2.0.0 (2025-11-18)
- ⚡ Migrated to Tailwind CSS v4
- 🚀 Rust-based engine for faster builds
- 🎨 CSS-first configuration with @theme directive
- 📦 Updated all dependencies

## License

MIT
