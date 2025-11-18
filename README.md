# Shared UI Component Library Workspace

A monorepo containing a shared UI component library built with shadcn/ui, Radix UI, and Tailwind CSS v4.

## Structure

```
shared-ui-workspace/
├── packages/
│   └── ui/                 # Shared component library
│       ├── src/
│       │   ├── primitives/ # Core shadcn/ui components
│       │   ├── composite/  # Composite components
│       │   ├── hooks/      # Shared React hooks
│       │   └── lib/        # Utilities
│       └── package.json
├── apps/                   # Consumer applications
└── package.json            # Root workspace config
```

## Quick Start

### Install Dependencies

```bash
npm install
```

### Development

```bash
# Run all packages in dev mode
npm run dev

# Build all packages
npm run build

# Lint all packages
npm run lint

# Type check all packages
npm run type-check
```

## Packages

### @workspace/ui

Shared UI component library with:
- 20 core shadcn/ui primitives
- Composite components (LoadingCard, ErrorCard, DataTable)
- Shared hooks and utilities
- Tailwind v4 configuration

## Usage in Projects

```typescript
// Install in your app
npm install @workspace/ui

// Import components
import { Button, Card, LoadingCard } from '@workspace/ui'

function MyComponent() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Title</Card.Title>
      </Card.Header>
      <Card.Content>
        <Button>Click me</Button>
      </Card.Content>
    </Card>
  )
}
```

## Component Catalog

### Primitives (20 Core Components)

1. **Button** - Button with variants (default, destructive, outline, secondary, ghost, link)
2. **Card** - Card container with Header, Title, Description, Content, Footer
3. **Dialog** - Modal dialog with Portal, Overlay, Content
4. **Input** - Text input field
5. **Label** - Form label
6. **Select** - Dropdown select with Trigger, Content, Item
7. **Checkbox** - Checkbox input
8. **Switch** - Toggle switch
9. **Textarea** - Multi-line text input
10. **Badge** - Status badge with variants
11. **Alert** - Alert box with variants
12. **Skeleton** - Loading skeleton placeholder
13. **Tooltip** - Hover tooltip
14. **Dropdown Menu** - Dropdown menu with Trigger, Content, Item
15. **Tabs** - Tab navigation with List, Trigger, Content
16. **Separator** - Visual separator line
17. **Avatar** - User avatar with Image, Fallback
18. **Progress** - Progress bar
19. **Toast** - Toast notifications (Sonner)
20. **Table** - Data table with Header, Body, Row, Cell

### Composite Components

- **LoadingCard** - Card with loading spinner
- **ErrorCard** - Card with error state and retry button
- **DataTable** - Full-featured data table with TanStack React Table
- **DateRangePicker** - Date range picker with presets

## Development

### Adding a New Component

1. Create component in `packages/ui/src/primitives/` or `packages/ui/src/composite/`
2. Export from `packages/ui/src/index.ts`
3. Add to Storybook documentation
4. Run type-check: `npm run type-check`

### Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch
```

## Architecture Decisions

### Why Tailwind v4?
- Modern CSS-native configuration
- Better performance with inline @theme
- Smaller bundle sizes
- Future-proof approach

### Why shadcn/ui?
- Accessible by default (Radix UI)
- Customizable components
- Copy-paste approach (no runtime dependency)
- Battle-tested patterns

### Why Turborepo?
- Fast incremental builds
- Smart caching
- Task orchestration
- Easy to scale

## Contributing

1. Create a feature branch
2. Make changes
3. Run `npm run lint` and `npm run type-check`
4. Submit PR

## License

MIT
