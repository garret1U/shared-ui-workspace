# Getting Started with @workspace/ui

Quick start guide for setting up and using the shared UI component library.

## Prerequisites

- Node.js 18+
- npm 9+
- Next.js 15+ project with App Router
- TypeScript 5+
- Tailwind CSS configured

## Installation

### Option 1: Local Development (Monorepo)

If working within the monorepo:

```bash
cd shared-ui-workspace
npm install
```

### Option 2: Install in Existing Project

From your project directory:

```bash
npm install @workspace/ui
```

## Initial Setup (5 minutes)

### 1. Install Package

```bash
npm install @workspace/ui
```

### 2. Import Styles

Add to your root layout:

```typescript
// app/layout.tsx
import '@workspace/ui/styles'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

### 3. Configure Tailwind

Update `tailwind.config.ts`:

```typescript
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

### 4. Add Toast Provider (Optional)

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

## Test Your Setup

Create a test page:

```typescript
// app/test/page.tsx
import { Button, Card } from '@workspace/ui'

export default function TestPage() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <Card.Header>
          <Card.Title>UI Library Test</Card.Title>
          <Card.Description>Testing @workspace/ui components</Card.Description>
        </Card.Header>
        <Card.Content className="space-y-4">
          <Button variant="default">Default Button</Button>
          <Button variant="destructive">Destructive Button</Button>
          <Button variant="outline">Outline Button</Button>
        </Card.Content>
      </Card>
    </div>
  )
}
```

Visit `http://localhost:3000/test` to verify setup.

## Your First Component

Let's build a simple login form:

```typescript
// app/login/page.tsx
'use client'

import { Button, Card, Input, Label, toast } from '@workspace/ui'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) throw new Error('Login failed')

      toast.success('Logged in successfully!')
    } catch (error) {
      toast.error('Failed to log in')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <Card.Header>
          <Card.Title>Login</Card.Title>
          <Card.Description>Enter your credentials to continue</Card.Description>
        </Card.Header>
        <Card.Content>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </Card.Content>
      </Card>
    </div>
  )
}
```

## Common Patterns

### Loading States

```typescript
import { LoadingCard } from '@workspace/ui'

if (isLoading) return <LoadingCard message="Loading data..." />
```

### Error Handling

```typescript
import { ErrorCard } from '@workspace/ui'

if (error) return <ErrorCard error={error} onRetry={refetch} />
```

### Dialogs

```typescript
import { Dialog, DialogContent, DialogHeader, DialogTitle, Button } from '@workspace/ui'

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm Action</DialogTitle>
    </DialogHeader>
    <p>Are you sure?</p>
    <Button onClick={handleConfirm}>Confirm</Button>
  </DialogContent>
</Dialog>
```

## Available Components

- ✅ Button (6 variants, 4 sizes)
- ✅ Card (with Header, Content, Footer)
- ✅ Dialog (Modal)
- ✅ Input
- ✅ Label
- ✅ Select
- ✅ Checkbox
- ✅ Switch
- ✅ Textarea
- ✅ Badge
- ✅ Alert
- ✅ Skeleton
- ✅ Tooltip
- ✅ Dropdown Menu
- ✅ Tabs
- ✅ Separator
- ✅ Avatar
- ✅ Progress
- ✅ Table
- ✅ Popover
- ✅ Toast (Sonner)
- ✅ LoadingCard (Composite)
- ✅ ErrorCard (Composite)
- ✅ DataTable (Composite)

## Next Steps

1. **Read the full documentation**: See `packages/ui/README.md`
2. **Review usage patterns**: Check `USAGE_GUIDE.md`
3. **Explore components**: Browse `packages/ui/src/primitives/`
4. **Build your first feature**: Start with a simple form or dashboard

## Troubleshooting

### Styles not working?

Ensure Tailwind content includes the UI package:

```typescript
content: [
  './app/**/*.{ts,tsx}',
  './node_modules/@workspace/ui/src/**/*.{ts,tsx}', // Important!
]
```

### Toast not showing?

Add the Toaster component to your layout:

```typescript
<body>
  {children}
  <Toaster />
</body>
```

### TypeScript errors?

Install peer dependencies:

```bash
npm install react@^19 react-dom@^19 next@^15
```

## Support

- 📚 Documentation: `packages/ui/README.md`
- 📖 Usage Guide: `USAGE_GUIDE.md`
- 🔧 Component API: Check TypeScript types

## Quick Reference

### Import Components

```typescript
import { Button, Card, Dialog, Input, toast } from '@workspace/ui'
```

### Show Toast

```typescript
toast.success('Success!')
toast.error('Error!')
toast.loading('Loading...')
```

### Loading State

```typescript
<LoadingCard message="Loading..." />
```

### Error State

```typescript
<ErrorCard error={error} onRetry={handleRetry} />
```

---

**Ready to build?** Start by importing components and building your first feature!
