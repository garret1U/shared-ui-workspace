# Component Documentation for @garret1u/ui v2.2.0

**Advanced Components Guide**

---

## Table of Contents

- [Command Palette](#command-palette)
- [Combobox](#combobox)
- [Data Table](#data-table)

---

## Command Palette

A fast, composable command palette for keyboard-driven navigation. Built with `cmdk`.

### Installation

The Command component is included in `@garret1u/ui` v2.2.0+.

### Basic Usage

```tsx
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from '@garret1u/ui'

export function CommandPaletteDemo() {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <span>Calendar</span>
            <CommandShortcut>⌘K</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span>Search Emoji</span>
            <CommandShortcut>⌘E</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>Profile</CommandItem>
          <CommandItem>Billing</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
```

### Dialog Variant

```tsx
'use client'

import { useState, useEffect } from 'react'
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@garret1u/ui'

export function CommandPaletteDialog() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <p className="text-sm text-muted-foreground">
        Press{' '}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => {
              console.log('New Project')
              setOpen(false)
            }}>
              New Project
            </CommandItem>
            <CommandItem onSelect={() => {
              console.log('New File')
              setOpen(false)
            }}>
              New File
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
```

### Component API

#### Command

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Command content |

#### CommandInput

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | - | Input placeholder text |
| `value` | `string` | - | Controlled input value |
| `onValueChange` | `(value: string) => void` | - | Value change handler |

#### CommandItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSelect` | `(value: string) => void` | - | Selection handler |
| `disabled` | `boolean` | `false` | Disable the item |
| `value` | `string` | - | Item value for searching |

---

## Combobox

A searchable select component with single and multi-select variants.

### Installation

The Combobox component is included in `@garret1u/ui` v2.2.0+.

### Single Select

```tsx
import { Combobox } from '@garret1u/ui'

const frameworks = [
  { value: 'next', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
]

export function ComboboxDemo() {
  const [value, setValue] = useState('')

  return (
    <Combobox
      options={frameworks}
      value={value}
      onValueChange={setValue}
      placeholder="Select framework..."
      searchPlaceholder="Search framework..."
      emptyText="No framework found."
    />
  )
}
```

### Multi-Select

```tsx
import { MultiCombobox } from '@garret1u/ui'

const languages = [
  { value: 'typescript', label: 'TypeScript' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'rust', label: 'Rust' },
  { value: 'go', label: 'Go' },
]

export function MultiComboboxDemo() {
  const [values, setValues] = useState<string[]>([])

  return (
    <MultiCombobox
      options={languages}
      values={values}
      onValuesChange={setValues}
      placeholder="Select languages..."
      maxSelected={3}
    />
  )
}
```

### Component API

#### Combobox

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `ComboboxOption[]` | - | Array of options |
| `value` | `string` | - | Selected value (controlled) |
| `onValueChange` | `(value: string) => void` | - | Value change handler |
| `placeholder` | `string` | `"Select an option..."` | Button placeholder |
| `searchPlaceholder` | `string` | `"Search..."` | Search input placeholder |
| `emptyText` | `string` | `"No results found."` | Empty state text |
| `disabled` | `boolean` | `false` | Disable the combobox |
| `className` | `string` | - | Additional CSS classes |

#### MultiCombobox

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `ComboboxOption[]` | - | Array of options |
| `values` | `string[]` | `[]` | Selected values (controlled) |
| `onValuesChange` | `(values: string[]) => void` | - | Values change handler |
| `maxSelected` | `number` | - | Maximum selections allowed |
| All other props from Combobox | - | - | Inherited from Combobox |

#### ComboboxOption

```typescript
interface ComboboxOption {
  value: string
  label: string
  disabled?: boolean
}
```

---

## Data Table

A powerful data table component with sorting, filtering, pagination, and column visibility.

### Installation

The DataTable component is included in `@garret1u/ui` v2.2.0+.

### Basic Usage

```tsx
import { DataTable, DataTableColumnHeader } from '@garret1u/ui'
import { ColumnDef } from '@tanstack/react-table'

interface User {
  id: string
  name: string
  email: string
  role: string
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => (
      <Badge variant={row.original.role === 'admin' ? 'default' : 'secondary'}>
        {row.original.role}
      </Badge>
    ),
  },
]

const data: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
]

export function DataTableDemo() {
  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey="name"
      searchPlaceholder="Search by name..."
      showColumnVisibility
      showPagination
      pageSize={10}
    />
  )
}
```

### With Row Click Handler

```tsx
export function DataTableWithClick() {
  const handleRowClick = (user: User) => {
    console.log('Clicked user:', user)
    // Navigate to detail page, open modal, etc.
  }

  return (
    <DataTable
      columns={columns}
      data={data}
      onRowClick={handleRowClick}
      className="my-8"
    />
  )
}
```

### With Sortable Columns

```tsx
import { DataTableColumnHeader } from '@garret1u/ui'
import { ColumnDef } from '@tanstack/react-table'

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    // Sorting is enabled by default for columns with DataTableColumnHeader
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => {
      return new Date(row.original.createdAt).toLocaleDateString()
    },
  },
]
```

### With Custom Filters

```tsx
import { ColumnDef } from '@tanstack/react-table'

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.status === 'active' ? 'success' :
          row.original.status === 'pending' ? 'warning' :
          'destructive'
        }
      >
        {row.original.status}
      </Badge>
    ),
  },
]
```

### Component API

#### DataTable

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `ColumnDef<TData>[]` | - | Column definitions |
| `data` | `TData[]` | - | Table data |
| `searchKey` | `string` | - | Column key to enable search |
| `searchPlaceholder` | `string` | `"Search..."` | Search input placeholder |
| `showColumnVisibility` | `boolean` | `true` | Show column visibility toggle |
| `showPagination` | `boolean` | `true` | Show pagination controls |
| `pageSize` | `number` | `10` | Rows per page |
| `className` | `string` | - | Additional CSS classes |
| `onRowClick` | `(row: TData) => void` | - | Row click handler |

#### DataTableColumnHeader

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `column` | `Column<TData>` | - | TanStack Table column |
| `title` | `string` | - | Column header title |
| `className` | `string` | - | Additional CSS classes |

### Pagination Controls

The DataTable includes built-in pagination with:
- First page button (`<<`)
- Previous page button (`<`)
- Next page button (`>`)
- Last page button (`>>`)
- Rows per page selector (10, 20, 30, 40, 50)
- Page indicator (e.g., "Page 1 of 5")
- Selected rows counter

---

## Examples

### Full-Featured Data Table

```tsx
'use client'

import { useState } from 'react'
import {
  DataTable,
  DataTableColumnHeader,
  Badge,
  Button,
} from '@garret1u/ui'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Pencil, Trash } from 'lucide-react'

interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: 'active' | 'inactive'
}

export function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Laptop',
      category: 'Electronics',
      price: 999.99,
      stock: 50,
      status: 'active',
    },
    // ... more products
  ])

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Product" />
      ),
    },
    {
      accessorKey: 'category',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Category" />
      ),
    },
    {
      accessorKey: 'price',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Price" />
      ),
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('price'))
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(amount)
        return formatted
      },
    },
    {
      accessorKey: 'stock',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Stock" />
      ),
      cell: ({ row }) => {
        const stock = row.getValue('stock') as number
        return (
          <Badge variant={stock > 10 ? 'success' : 'warning'}>
            {stock} units
          </Badge>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Badge
          variant={row.original.status === 'active' ? 'success' : 'secondary'}
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={(e) => {
                e.stopPropagation()
                console.log('Edit', row.original)
              }}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={(e) => {
                e.stopPropagation()
                console.log('Delete', row.original)
              }}
            >
              <Trash className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products</h2>
        <Button>Add Product</Button>
      </div>

      <DataTable
        columns={columns}
        data={products}
        searchKey="name"
        searchPlaceholder="Search products..."
        onRowClick={(product) => {
          console.log('View product:', product)
          // Navigate to product detail
        }}
      />
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
