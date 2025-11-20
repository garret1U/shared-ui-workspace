# Theming Guide for @garret1u/ui v2.2.0

**Modern Multi-Theme Design System with OKLCH Colors and Tailwind v4**

---

## Table of Contents

- [Quick Start](#quick-start)
- [Available Themes](#available-themes)
- [Installation](#installation)
- [Usage](#usage)
- [Design Tokens](#design-tokens)
- [Component Enhancements](#component-enhancements)
- [Custom Themes](#custom-themes)
- [Migration Guide](#migration-guide)

---

## Quick Start

```tsx
// app/layout.tsx
import { ThemeProvider } from '@garret1u/ui/theme-provider'
import '@garret1u/ui/styles'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="zinc" defaultMode="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

```tsx
// components/header.tsx
import { ThemeSwitcher } from '@garret1u/ui/theme-switcher'

export function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <h1>My App</h1>
      <ThemeSwitcher variant="separate" align="end" />
    </header>
  )
}
```

---

## Available Themes

### Neutral Themes (3)

| Theme | Description | Best For |
|-------|-------------|----------|
| **Zinc** | Cool, modern gray with subtle blue undertones | Modern web apps, dashboards |
| **Slate** | Professional blue-gray with excellent readability | Enterprise apps, documentation |
| **Stone** | Warm, natural gray with earthy undertones | Content-heavy sites, blogs |

### Accent Themes (5)

| Theme | Description | Best For |
|-------|-------------|----------|
| **Blue** | Classic blue with vibrant accents | SaaS products, productivity tools |
| **Green** | Fresh, vibrant green | Health, finance, environmental apps |
| **Orange** | Energetic, vibrant orange | Creative tools, marketing |
| **Red** | Bold, assertive red | News, entertainment, alerts |
| **Violet** | Elegant, royal violet | Luxury brands, creative platforms |

### Light/Dark Mode

All themes support:
- **Light mode** - For daytime use
- **Dark mode** - For low-light environments
- **System** - Auto-detect user preference

---

## Installation

```bash
npm install @garret1u/ui
```

**Required peer dependencies:**
- `react` ^19.0.0
- `react-dom` ^19.0.0
- `next` ^15.0.0 || ^16.0.0

---

## Usage

### 1. Setup ThemeProvider

Wrap your app root with `ThemeProvider`:

```tsx
import { ThemeProvider } from '@garret1u/ui/theme-provider'
import '@garret1u/ui/styles'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          defaultTheme="zinc"    // zinc | slate | stone | blue | green | orange | red | violet
          defaultMode="system"   // light | dark | system
          storageKey="my-app-theme" // optional, defaults to "ui-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### 2. Add ThemeSwitcher Component

#### Separate Dropdowns (Default)

```tsx
import { ThemeSwitcher } from '@garret1u/ui/theme-switcher'

export function Header() {
  return (
    <header>
      <ThemeSwitcher variant="separate" align="end" />
    </header>
  )
}
```

#### Combined Dropdown

```tsx
import { ThemeSwitcher } from '@garret1u/ui/theme-switcher'

export function Header() {
  return (
    <header>
      <ThemeSwitcher variant="combined" align="end" />
    </header>
  )
}
```

### 3. Use the Theme Hook

```tsx
'use client'

import { useTheme } from '@garret1u/ui/theme-provider'

export function CustomThemeSwitcher() {
  const { theme, mode, setTheme, setMode } = useTheme()

  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Current mode: {mode}</p>

      <button onClick={() => setTheme('blue')}>
        Switch to Blue
      </button>

      <button onClick={() => setMode('dark')}>
        Switch to Dark Mode
      </button>
    </div>
  )
}
```

---

## Design Tokens

### Colors

All themes include these semantic color tokens:

```css
--color-background
--color-foreground
--color-card
--color-card-foreground
--color-popover
--color-popover-foreground
--color-primary
--color-primary-foreground
--color-secondary
--color-secondary-foreground
--color-muted
--color-muted-foreground
--color-accent
--color-accent-foreground
--color-destructive
--color-destructive-foreground
--color-success
--color-success-foreground
--color-warning
--color-warning-foreground
--color-info
--color-info-foreground
--color-border
--color-input
--color-ring
```

### Shadow System (6 Tiers)

```css
--shadow-xs     /* Subtle elevation */
--shadow-sm     /* Small elevation */
--shadow-md     /* Medium elevation */
--shadow-lg     /* Large elevation */
--shadow-xl     /* Extra large elevation */
--shadow-2xl    /* Maximum elevation */
```

**Usage:**
```tsx
<div className="shadow-md hover:shadow-lg">Card with elevation</div>
```

### Typography Scale

**Font Sizes:**
```css
--font-size-xs      /* 0.75rem / 12px */
--font-size-sm      /* 0.875rem / 14px */
--font-size-base    /* 1rem / 16px */
--font-size-lg      /* 1.125rem / 18px */
--font-size-xl      /* 1.25rem / 20px */
--font-size-2xl     /* 1.5rem / 24px */
--font-size-3xl     /* 1.875rem / 30px */
--font-size-4xl     /* 2.25rem / 36px */
```

**Font Weights:**
```css
--font-weight-light      /* 300 */
--font-weight-normal     /* 400 */
--font-weight-medium     /* 500 */
--font-weight-semibold   /* 600 */
--font-weight-bold       /* 700 */
```

**Line Heights:**
```css
--line-height-tight      /* 1.25 */
--line-height-snug       /* 1.375 */
--line-height-normal     /* 1.5 */
--line-height-relaxed    /* 1.625 */
--line-height-loose      /* 1.75 */
```

**Letter Spacing:**
```css
--letter-spacing-tighter /* -0.05em */
--letter-spacing-tight   /* -0.025em */
--letter-spacing-normal  /* 0em */
--letter-spacing-wide    /* 0.025em */
--letter-spacing-wider   /* 0.05em */
```

### Motion Design

**Animation Durations:**
```css
--duration-instant       /* 75ms - Micro-interactions */
--duration-fast          /* 150ms - Quick transitions */
--duration-normal        /* 250ms - Standard animations */
--duration-slow          /* 350ms - Deliberate animations */
--duration-slower        /* 500ms - Emphatic animations */
```

**Easing Functions:**
```css
--ease-linear
--ease-in
--ease-out
--ease-in-out
--ease-spring            /* Bouncy, energetic */
--ease-bounce            /* Extra bouncy */
```

**Keyframe Animations:**
- `fade-in` / `fade-out`
- `slide-up` / `slide-down` / `slide-left` / `slide-right`
- `scale-in`
- `shimmer` (for loading states)
- `spin` (for spinners)
- `pulse` (for attention)
- `bounce`
- `hover-lift` (for buttons/cards)
- `press-down` (for active states)

**Usage:**
```tsx
<div className="animate-fade-in">Fading in content</div>
<div className="animate-slide-up">Sliding up content</div>
```

### Layout Primitives

**Z-Index Scale:**
```css
--z-index-base: 0
--z-index-dropdown: 1000
--z-index-sticky: 1020
--z-index-fixed: 1030
--z-index-modal-backdrop: 1040
--z-index-modal: 1050
--z-index-popover: 1060
--z-index-tooltip: 1070
```

**Container Widths:**
```css
--container-sm: 640px
--container-md: 768px
--container-lg: 1024px
--container-xl: 1280px
--container-2xl: 1536px
```

**Prose Widths:**
```css
--prose-width: 65ch           /* Optimal reading width */
--prose-width-narrow: 45ch    /* Tight paragraphs */
--prose-width-wide: 80ch      /* Wider content */
```

**Aspect Ratios:**
```css
--aspect-square: 1 / 1
--aspect-video: 16 / 9
--aspect-portrait: 3 / 4
--aspect-landscape: 4 / 3
```

---

## Component Enhancements

### Enhanced Button Component

**New hover lift effect:**

```tsx
import { Button } from '@garret1u/ui'

// Buttons now lift on hover and press down on active
<Button>
  Hover me!
</Button>
```

**Features:**
- Hover lift: `-translate-y-0.5` + `shadow-md`
- Active press: `scale-95`
- Smooth transitions: `transition-all duration-normal`

### Enhanced Card Component

**New CVA variants:**

```tsx
import { Card } from '@garret1u/ui'

// Default card
<Card>
  <CardHeader>
    <CardTitle>Default Card</CardTitle>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>

// Filled card (muted background)
<Card variant="filled">
  <CardContent>Muted background</CardContent>
</Card>

// Outline card (2px border)
<Card variant="outline">
  <CardContent>Prominent border</CardContent>
</Card>

// Elevated card (larger shadow)
<Card variant="elevated">
  <CardContent>More elevated</CardContent>
</Card>

// Interactive card (hover lift + focus ring)
<Card interactive>
  <CardContent>Click me!</CardContent>
</Card>
```

**Variants:**
- `default` - Standard card with border and shadow-sm
- `filled` - Muted background, no border
- `outline` - 2px border for emphasis
- `elevated` - Larger shadow-lg

**Interactive mode:**
- Hover lift: `-translate-y-0.5` + `shadow-md`
- Focus-within ring
- Cursor pointer

### Skeleton Component

**Shimmer animation for loading states:**

```tsx
import { Skeleton } from '@garret1u/ui'

// Shimmer animation (default)
<Skeleton className="h-4 w-full" />

// Pulse animation
<Skeleton variant="pulse" className="h-4 w-full" />

// Card skeleton
<div className="rounded-xl border p-6 space-y-4">
  <Skeleton className="h-8 w-3/4" />
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-5/6" />
  <div className="flex gap-2">
    <Skeleton className="h-10 w-20" />
    <Skeleton className="h-10 w-20" />
  </div>
</div>
```

### Spinner Component

**Color variants matching badge:**

```tsx
import { Spinner } from '@garret1u/ui'

// Default spinner
<Spinner />

// Size variants
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />

// Color variants
<Spinner variant="default" />
<Spinner variant="destructive" />
<Spinner variant="success" />
<Spinner variant="warning" />
<Spinner variant="info" />
```

### Badge Component

**Success, warning, and info variants:**

```tsx
import { Badge } from '@garret1u/ui'

<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="outline">Outline</Badge>
```

---

## Custom Themes

### Creating a Custom Theme

You can create your own theme by adding CSS variables:

```css
/* custom-theme.css */
[data-theme="custom"] {
  --color-background: oklch(0.99 0.00 0);
  --color-foreground: oklch(0.21 0.01 180);
  --color-primary: oklch(0.55 0.20 180);
  --color-primary-foreground: oklch(0.99 0.00 0);
  /* ... other color variables */
}

[data-theme="custom"].dark {
  --color-background: oklch(0.14 0.00 180);
  --color-foreground: oklch(0.97 0.00 180);
  /* ... dark mode colors */
}
```

Then extend the ThemeProvider types:

```tsx
// theme.d.ts
declare module '@garret1u/ui/theme-provider' {
  export type Theme =
    | 'zinc'
    | 'slate'
    | 'stone'
    | 'blue'
    | 'green'
    | 'orange'
    | 'red'
    | 'violet'
    | 'custom'
}
```

---

## Migration Guide

### From v1.x to v2.2.0

**Breaking Changes:**
- Card component now uses CVA variants instead of `interactive` boolean prop (still supported, but use `interactive` prop)
- Button hover effects now include lift animation (may affect layouts with tight spacing)

**New Features:**
- 8 pre-built themes (Zinc, Slate, Stone, Blue, Green, Orange, Red, Violet)
- ThemeProvider component for theme management
- ThemeSwitcher component for user selection
- Enhanced design tokens (shadows, typography, motion, layout)
- Reduced motion support
- Focus-visible enhancements

**Migration Steps:**

1. **Update imports:**
   ```diff
   - import '@garret1u/ui/globals.css'
   + import '@garret1u/ui/styles'
   ```

2. **Wrap app with ThemeProvider:**
   ```tsx
   import { ThemeProvider } from '@garret1u/ui/theme-provider'

   <ThemeProvider defaultTheme="zinc" defaultMode="system">
     {children}
   </ThemeProvider>
   ```

3. **Update Card usage (optional):**
   ```diff
   - <Card interactive>
   + <Card interactive variant="default">
   ```

4. **Add theme switcher (optional):**
   ```tsx
   import { ThemeSwitcher } from '@garret1u/ui/theme-switcher'

   <ThemeSwitcher variant="separate" align="end" />
   ```

---

## Accessibility

### Reduced Motion Support

All animations respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Focus-Visible Enhancements

All interactive components include:
- Focus rings with proper offset
- High contrast colors
- Keyboard navigation support

```css
.focus-ring:focus-visible {
  outline-color: var(--color-ring);
  outline-width: var(--ring-width);
  outline-offset: var(--ring-offset);
}
```

---

## Benefits Over Other Design Systems

### vs shadcn/ui

1. **OKLCH colors** - Perceptually uniform (shadcn uses HSL)
2. **Tailwind v4 native** - Faster, cleaner (shadcn still on v3)
3. **Complete package** - No CLI needed, just npm install
4. **Type-safe** - Full TypeScript with strict mode
5. **More design tokens** - Typography, motion, layout primitives
6. **Better focus states** - Enhanced focus-visible with offsets

### vs Material-UI

1. **Smaller bundle size** - Tree-shakeable with Tailwind
2. **No runtime styles** - Pure CSS, no JS overhead
3. **Easier customization** - CSS variables vs theme objects
4. **Better performance** - No emotion/styled-components
5. **Modern design** - OKLCH colors, smooth animations

---

## Examples

### Dashboard Layout

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@garret1u/ui'
import { ThemeSwitcher } from '@garret1u/ui/theme-switcher'
import { Skeleton } from '@garret1u/ui'

export default function Dashboard() {
  const isLoading = false

  return (
    <div className="p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <ThemeSwitcher variant="separate" align="end" />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          <>
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
          </>
        ) : (
          <>
            <Card interactive>
              <CardHeader>
                <CardTitle>Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">12,345</p>
              </CardContent>
            </Card>

            <Card interactive variant="filled">
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">$45,678</p>
              </CardContent>
            </Card>

            <Card interactive variant="elevated">
              <CardHeader>
                <CardTitle>Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">+23%</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
```

---

## Support

- **GitHub**: [github.com/garret1U/shared-ui-workspace](https://github.com/garret1U/shared-ui-workspace)
- **Issues**: [Report a bug](https://github.com/garret1U/shared-ui-workspace/issues)
- **Version**: v2.2.0

---

**Last Updated**: 2025-11-20
