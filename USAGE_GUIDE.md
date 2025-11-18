# @workspace/ui Usage Guide

Complete guide for integrating and using the shared UI component library across projects.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Integration Steps](#integration-steps)
3. [Component Patterns](#component-patterns)
4. [Migration Guide](#migration-guide)
5. [Best Practices](#best-practices)
6. [Troubleshooting](#troubleshooting)

---

## Quick Start

### For New Projects

```bash
# Create new Next.js app (if needed)
npx create-next-app@latest my-app --typescript --tailwind --app

# Navigate to project
cd my-app

# Install shared UI
npm install @workspace/ui
```

### Minimal Setup

```typescript
// app/layout.tsx
import '@workspace/ui/styles'
import { Toaster } from '@workspace/ui'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
```

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'
import uiConfig from '@workspace/ui/tailwind.config'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './node_modules/@workspace/ui/src/**/*.{ts,tsx}',
  ],
  presets: [uiConfig],
}

export default config
```

---

## Integration Steps

### Step 1: Install Dependencies

In your project workspace:

```bash
npm install @workspace/ui
```

The package includes all peer dependencies:
- `react` ^19.0.0
- `react-dom` ^19.0.0
- `next` ^15.0.0

### Step 2: Import Global Styles

```typescript
// app/layout.tsx or app/globals.css
import '@workspace/ui/styles'
```

Or in your CSS file:

```css
/* app/globals.css */
@import '@workspace/ui/styles';

/* Your custom styles */
```

### Step 3: Configure Tailwind

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'
import uiConfig from '@workspace/ui/tailwind.config'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    // IMPORTANT: Include UI package
    './node_modules/@workspace/ui/src/**/*.{ts,tsx}',
  ],
  // Extend UI config
  presets: [uiConfig],

  // Optional: Override theme values
  theme: {
    extend: {
      // Your custom values
    },
  },
}

export default config
```

### Step 4: Add Toast Provider (Optional)

```typescript
// app/layout.tsx
import { Toaster } from '@workspace/ui'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster
          position="bottom-right"
          expand={false}
          richColors
        />
      </body>
    </html>
  )
}
```

---

## Component Patterns

### Pattern 1: Loading States

```typescript
'use client'

import { LoadingCard } from '@workspace/ui'
import { useState, useEffect } from 'react'

export default function DataView() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingCard message="Loading data..." />

  return <div>{/* Render data */}</div>
}
```

### Pattern 2: Error Handling

```typescript
'use client'

import { ErrorCard } from '@workspace/ui'
import { useState } from 'react'

export default function DataView() {
  const [error, setError] = useState<Error | null>(null)

  const fetchData = async () => {
    try {
      const res = await fetch('/api/data')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      // Handle data
    } catch (err) {
      setError(err as Error)
    }
  }

  if (error) {
    return (
      <ErrorCard
        error={error}
        onRetry={fetchData}
        title="Failed to load data"
      />
    )
  }

  return <div>{/* Render data */}</div>
}
```

### Pattern 3: Forms with Validation

```typescript
'use client'

import { Button, Input, Label, Card, toast } from '@workspace/ui'
import { useState } from 'react'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) throw new Error('Login failed')

      toast.success('Logged in successfully')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-md mx-auto">
      <Card.Header>
        <Card.Title>Login</Card.Title>
      </Card.Header>
      <Card.Content>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </Card.Content>
    </Card>
  )
}
```

### Pattern 4: Data Tables

```typescript
'use client'

import { DataTable } from '@workspace/ui'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@workspace/ui'

interface User {
  id: string
  name: string
  email: string
  role: string
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
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleEdit(user)}
        >
          Edit
        </Button>
      )
    },
  },
]

export default function UsersTable({ users }: { users: User[] }) {
  return (
    <DataTable
      columns={columns}
      data={users}
      searchKey="name"
      searchPlaceholder="Search users..."
      showColumnVisibility
      showPagination
      pageSize={10}
    />
  )
}
```

### Pattern 5: Dialogs & Modals

```typescript
'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  Button,
  Input,
  Label,
  toast
} from '@workspace/ui'
import { useState } from 'react'

export default function AddUserDialog() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email }),
      })

      toast.success('User added successfully')
      setOpen(false)
      setName('')
      setEmail('')
    } catch (error) {
      toast.error('Failed to add user')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add User</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add User</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
```

---

## Migration Guide

### Migrating from Project-Specific Components

#### Before (Project-specific)

```typescript
// components/ui/button.tsx
import { cn } from '@/lib/utils'

export function Button({ className, ...props }) {
  return <button className={cn('...', className)} {...props} />
}
```

```typescript
// app/page.tsx
import { Button } from '@/components/ui/button'
```

#### After (Shared Library)

```typescript
// app/page.tsx
import { Button } from '@workspace/ui'
```

### Migration Steps

1. **Identify components to migrate**:
   ```bash
   # List your custom components
   ls components/ui/
   ```

2. **Check component availability**:
   - Button ✅
   - Card ✅
   - Dialog ✅
   - Input ✅
   - (See full list in README)

3. **Update imports**:
   ```bash
   # Find all imports (example)
   grep -r "from '@/components/ui" app/
   ```

4. **Replace imports one by one**:
   ```diff
   - import { Button } from '@/components/ui/button'
   + import { Button } from '@workspace/ui'
   ```

5. **Remove old components**:
   ```bash
   rm -rf components/ui/
   ```

6. **Test thoroughly**:
   - Check all pages still render
   - Verify styling is correct
   - Test interactive components

### Handling Custom Components

If you have project-specific components, keep them separate:

```
your-project/
├── components/
│   ├── custom/           # Project-specific components
│   │   ├── FlightCard.tsx
│   │   └── CameraFeed.tsx
│   └── shared/           # Wrappers around UI library
│       └── AppButton.tsx
└── app/
```

---

## Best Practices

### 1. Import from Single Source

✅ **Good**:
```typescript
import { Button, Card, Dialog, Input } from '@workspace/ui'
```

❌ **Bad**:
```typescript
import { Button } from '@workspace/ui/primitives/button'
import { Card } from '@workspace/ui/primitives/card'
```

### 2. Use Toast for User Feedback

```typescript
import { toast } from '@workspace/ui'

// Success
toast.success('Changes saved')

// Error
toast.error('Failed to save changes')

// Promise-based
const promise = saveData()
toast.promise(promise, {
  loading: 'Saving...',
  success: 'Saved!',
  error: 'Failed to save',
})
```

### 3. Consistent Loading States

```typescript
import { LoadingCard, Skeleton } from '@workspace/ui'

// For entire views
if (isLoading) return <LoadingCard />

// For inline content
if (isLoading) return <Skeleton className="h-20 w-full" />
```

### 4. Type Safety

```typescript
import type { ButtonProps } from '@workspace/ui'

// Extend component props
interface CustomButtonProps extends ButtonProps {
  customProp?: string
}
```

### 5. Consistent Spacing

```typescript
// Use Tailwind spacing utilities
<div className="space-y-4">
  <Input />
  <Input />
  <Button />
</div>
```

---

## Troubleshooting

### Issue: Styles not applying

**Solution**: Ensure Tailwind content includes UI package:

```typescript
// tailwind.config.ts
content: [
  './app/**/*.{ts,tsx}',
  './node_modules/@workspace/ui/src/**/*.{ts,tsx}', // Add this
]
```

### Issue: "Module not found" error

**Solution**: Install package in project:

```bash
npm install @workspace/ui
```

### Issue: TypeScript errors

**Solution**: Ensure peer dependencies are installed:

```bash
npm install react@^19 react-dom@^19 next@^15
```

### Issue: Toast not showing

**Solution**: Add Toaster to layout:

```typescript
// app/layout.tsx
import { Toaster } from '@workspace/ui'

<body>
  {children}
  <Toaster /> {/* Add this */}
</body>
```

### Issue: Dark mode not working

**Solution**: Install and configure next-themes:

```bash
npm install next-themes
```

```typescript
// app/providers.tsx
'use client'
import { ThemeProvider } from 'next-themes'

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      {children}
    </ThemeProvider>
  )
}
```

---

## Advanced Usage

### Custom Theme Colors

Override CSS variables in your `globals.css`:

```css
@import '@workspace/ui/styles';

:root {
  --primary: 200 100% 50%; /* Custom blue */
  --destructive: 0 100% 50%; /* Custom red */
}
```

### Extending Components

Create wrappers for project-specific needs:

```typescript
// components/custom-button.tsx
import { Button, type ButtonProps } from '@workspace/ui'

export function CustomButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      className="custom-styles"
    />
  )
}
```

### Using with React Query

```typescript
import { useQuery } from '@tanstack/react-query'
import { LoadingCard, ErrorCard } from '@workspace/ui'

export default function DataView() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['data'],
    queryFn: fetchData,
  })

  if (isLoading) return <LoadingCard />
  if (error) return <ErrorCard error={error} onRetry={refetch} />

  return <div>{/* Render data */}</div>
}
```

---

## Support

For questions or issues:
1. Check this usage guide
2. Review component documentation in package README
3. Check TypeScript types for prop definitions
4. Contact the platform team

## Contributing

To add new components or improve existing ones:
1. Submit PR to shared-ui-workspace repository
2. Follow existing component patterns
3. Include TypeScript types
4. Update documentation
