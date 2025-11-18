# Component Catalog

Complete reference guide for all components in @workspace/ui.

## Table of Contents

- [Primitives](#primitives) (21 components)
- [Composite](#composite) (3 components)
- [Utilities](#utilities)

---

## Primitives

### 1. Button

Multi-variant button component with size options.

**Variants**: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
**Sizes**: `default`, `sm`, `lg`, `icon`

```typescript
import { Button } from '@workspace/ui'

<Button variant="default">Click me</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline" size="sm">Small</Button>
<Button variant="ghost" size="icon"><Icon /></Button>
```

**Props**:
- `variant?`: ButtonVariant
- `size?`: ButtonSize
- `asChild?`: boolean (render as child component via Radix Slot)

---

### 2. Card

Container component with semantic sub-components.

```typescript
import { Card } from '@workspace/ui'

<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Description>Description text</Card.Description>
  </Card.Header>
  <Card.Content>
    Main content here
  </Card.Content>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

**Sub-components**: `Header`, `Title`, `Description`, `Content`, `Footer`

---

### 3. Dialog

Modal dialog with overlay and animations.

```typescript
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@workspace/ui'

<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    <p>Content here</p>
  </DialogContent>
</Dialog>
```

**Sub-components**: `Portal`, `Overlay`, `Content`, `Header`, `Footer`, `Title`, `Description`, `Close`

**Props**:
- `open?`: boolean
- `onOpenChange?`: (open: boolean) => void

---

### 4. Input

Standard text input with focus states.

```typescript
import { Input } from '@workspace/ui'

<Input type="email" placeholder="you@example.com" />
```

**Props**: Extends `HTMLInputElement` attributes

---

### 5. Label

Form label with accessibility support.

```typescript
import { Label } from '@workspace/ui'

<Label htmlFor="email">Email</Label>
<Input id="email" />
```

---

### 6. Select

Dropdown select with keyboard navigation.

```typescript
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui'

<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

**Sub-components**: `Trigger`, `Value`, `Content`, `Item`, `Group`, `Label`, `Separator`

---

### 7. Checkbox

Checkbox with indeterminate state support.

```typescript
import { Checkbox } from '@workspace/ui'

<Checkbox checked={checked} onCheckedChange={setChecked} />
```

**Props**:
- `checked?`: boolean | 'indeterminate'
- `onCheckedChange?`: (checked: boolean) => void

---

### 8. Switch

Toggle switch component.

```typescript
import { Switch } from '@workspace/ui'

<Switch checked={enabled} onCheckedChange={setEnabled} />
```

---

### 9. Textarea

Multi-line text input with auto-resize support.

```typescript
import { Textarea } from '@workspace/ui'

<Textarea placeholder="Enter text..." rows={4} />
```

---

### 10. Badge

Status badge with variants.

**Variants**: `default`, `secondary`, `destructive`, `outline`

```typescript
import { Badge } from '@workspace/ui'

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>
```

---

### 11. Alert

Alert component with variants.

**Variants**: `default`, `destructive`

```typescript
import { Alert, AlertTitle, AlertDescription } from '@workspace/ui'

<Alert>
  <AlertTitle>Note</AlertTitle>
  <AlertDescription>This is an alert message.</AlertDescription>
</Alert>
```

---

### 12. Skeleton

Loading placeholder with pulse animation.

```typescript
import { Skeleton } from '@workspace/ui'

<Skeleton className="h-12 w-full" />
<Skeleton className="h-4 w-[250px]" />
```

---

### 13. Tooltip

Hover tooltip with customizable content.

```typescript
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@workspace/ui'

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent>
      <p>Tooltip content</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

---

### 14. Dropdown Menu

Full-featured dropdown menu.

```typescript
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@workspace/ui'

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

**Sub-components**: `Trigger`, `Content`, `Item`, `CheckboxItem`, `RadioItem`, `Label`, `Separator`, `Shortcut`, `Group`, `Portal`, `Sub`, `SubContent`, `SubTrigger`

---

### 15. Tabs

Tab navigation component.

```typescript
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui'

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

---

### 16. Separator

Visual divider line.

```typescript
import { Separator } from '@workspace/ui'

<div>
  <p>Section 1</p>
  <Separator />
  <p>Section 2</p>
</div>

{/* Vertical */}
<div className="flex">
  <span>Item 1</span>
  <Separator orientation="vertical" className="h-4" />
  <span>Item 2</span>
</div>
```

---

### 17. Avatar

User avatar with image and fallback.

```typescript
import { Avatar, AvatarImage, AvatarFallback } from '@workspace/ui'

<Avatar>
  <AvatarImage src="/avatar.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

---

### 18. Progress

Progress bar component.

```typescript
import { Progress } from '@workspace/ui'

<Progress value={progress} max={100} />
```

---

### 19. Table

Data table with semantic structure.

```typescript
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui'

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

**Sub-components**: `Header`, `Body`, `Footer`, `Row`, `Head`, `Cell`, `Caption`

---

### 20. Popover

Popover with trigger and content.

```typescript
import { Popover, PopoverContent, PopoverTrigger } from '@workspace/ui'

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p>Popover content here</p>
  </PopoverContent>
</Popover>
```

---

### 21. Toast

Toast notifications using Sonner.

```typescript
import { Toaster, toast } from '@workspace/ui'

// In layout
<Toaster position="bottom-right" />

// In components
toast.success('Success!')
toast.error('Error!')
toast.loading('Loading...')

// With action
toast('Message', {
  action: {
    label: 'Undo',
    onClick: () => handleUndo()
  }
})

// Promise-based
const promise = fetchData()
toast.promise(promise, {
  loading: 'Loading...',
  success: 'Success!',
  error: 'Error!'
})
```

---

## Composite

### 1. LoadingCard

Card with loading spinner and message.

```typescript
import { LoadingCard } from '@workspace/ui'

<LoadingCard message="Loading data..." iconSize={32} />
```

**Props**:
- `message?`: string (default: "Loading...")
- `iconSize?`: number (default: 32)
- `className?`: string

---

### 2. ErrorCard

Card with error state and retry button.

```typescript
import { ErrorCard } from '@workspace/ui'

<ErrorCard
  error={error}
  onRetry={handleRetry}
  title="Failed to load"
  iconSize={32}
/>
```

**Props**:
- `error`: Error | string
- `onRetry?`: () => void
- `title?`: string (default: "Error")
- `iconSize?`: number (default: 32)
- `className?`: string

---

### 3. DataTable

Full-featured data table with TanStack React Table.

```typescript
import { DataTable } from '@workspace/ui'
import { ColumnDef } from '@tanstack/react-table'

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

<DataTable
  columns={columns}
  data={users}
  searchKey="name"
  searchPlaceholder="Search users..."
  showColumnVisibility={true}
  showPagination={true}
  pageSize={10}
/>
```

**Props**:
- `columns`: ColumnDef<TData, TValue>[]
- `data`: TData[]
- `searchKey?`: string (column to search)
- `searchPlaceholder?`: string
- `showColumnVisibility?`: boolean (default: true)
- `showPagination?`: boolean (default: true)
- `pageSize?`: number (default: 10)

**Features**:
- Sorting
- Filtering
- Column visibility toggles
- Pagination
- Row selection
- Responsive design

---

## Utilities

### cn()

Merge Tailwind CSS classes intelligently.

```typescript
import { cn } from '@workspace/ui'

const className = cn(
  'base-class',
  condition && 'conditional-class',
  'override-class'
)
```

### formatCurrency()

Format numbers as currency.

```typescript
import { formatCurrency } from '@workspace/ui'

formatCurrency(1234.56) // "$1,234.56"
formatCurrency(1234.56, 'EUR') // "€1,234.56"
```

### formatNumber()

Format numbers with thousand separators.

```typescript
import { formatNumber } from '@workspace/ui'

formatNumber(1234567) // "1,234,567"
```

### formatPercent()

Format percentages.

```typescript
import { formatPercent } from '@workspace/ui'

formatPercent(45.678) // "45.7%"
formatPercent(45.678, 2) // "45.68%"
```

### truncate()

Truncate text with ellipsis.

```typescript
import { truncate } from '@workspace/ui'

truncate('Long text here', 10) // "Long text..."
```

---

## Component Usage Patterns

### Form Pattern

```typescript
import { Button, Input, Label, Card, toast } from '@workspace/ui'

<Card>
  <Card.Header>
    <Card.Title>Form Title</Card.Title>
  </Card.Header>
  <Card.Content>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="field">Field Label</Label>
        <Input id="field" value={value} onChange={onChange} />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  </Card.Content>
</Card>
```

### Data Display Pattern

```typescript
import { Card, Badge, Separator } from '@workspace/ui'

<Card>
  <Card.Header>
    <div className="flex items-center justify-between">
      <Card.Title>Item Name</Card.Title>
      <Badge>Status</Badge>
    </div>
  </Card.Header>
  <Separator />
  <Card.Content>
    <dl className="space-y-2">
      <div>
        <dt className="text-sm font-medium">Field</dt>
        <dd className="text-sm text-muted-foreground">Value</dd>
      </div>
    </dl>
  </Card.Content>
</Card>
```

### Modal Pattern

```typescript
import { Dialog, DialogContent, DialogHeader, DialogTitle, Button } from '@workspace/ui'

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm Action</DialogTitle>
    </DialogHeader>
    <p>Are you sure you want to continue?</p>
    <div className="flex justify-end gap-2 mt-4">
      <Button variant="outline" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button onClick={handleConfirm}>
        Confirm
      </Button>
    </div>
  </DialogContent>
</Dialog>
```

---

## Theme Customization

Override CSS variables in your `globals.css`:

```css
@import '@workspace/ui/styles';

:root {
  --primary: 200 100% 50%;
  --destructive: 0 100% 50%;
  --radius: 0.75rem;
}
```

See `packages/ui/src/styles/globals.css` for all available variables.
