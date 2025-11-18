# @workspace/ui

Shared UI component library built with **shadcn/ui**, **Radix UI**, and **Tailwind CSS**.

> **📦 For separate repositories**: This package is published as `@garret1u/ui` on GitHub Packages.
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

### 3. Add Toast Provider (Optional)

If using toast notifications:

```typescript
// app/layout.tsx
import { Toaster } from '@workspace/ui'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
```

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

### Composite Components (3)

1. **LoadingCard** - Card with loading spinner
2. **ErrorCard** - Card with error state and retry
3. **DataTable** - Full-featured data table with TanStack React Table

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

## Dark Mode

All components support dark mode automatically via Tailwind's dark mode strategy. Use `next-themes` for theme switching:

```bash
npm install next-themes
```

```typescript
// app/providers.tsx
'use client'

import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}
```

## Contributing

1. Add new components to `src/primitives/` or `src/composite/`
2. Export from `src/primitives/index.ts` or `src/composite/index.ts`
3. Run `npm run type-check` to verify types
4. Update documentation

## License

MIT
