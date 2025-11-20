# Release Notes: @garret1u/ui v2.3.0

**Release Date**: 2025-11-20
**Type**: Minor Release (Feature Addition)
**Status**: ✅ Ready for Release

---

## 🎯 Overview

Version 2.3.0 brings significant enhancements to @garret1u/ui based on a comprehensive audit of production applications (aviation-optimizer and google-analytics-app). This release focuses on mobile accessibility, enhanced component variants, and developer experience improvements.

**Key Highlights**:
- Enhanced Button component with loading states
- Expanded Badge variants for status indicators
- Comprehensive mobile accessibility utilities
- No breaking changes - fully backwards compatible

---

## ✨ New Features

### 1. Button Loading State

Buttons now support a `loading` prop that automatically displays a spinner and disables interaction.

**Usage**:
```tsx
import { Button } from '@garret1u/ui'

<Button loading={isSubmitting}>
  Submit Form
</Button>
```

**Features**:
- Automatic spinner display
- Disables button during loading
- Accessible loading state
- Works with all button variants

**API**:
```typescript
interface ButtonProps {
  loading?: boolean  // NEW
  // ... existing props
}
```

---

### 2. Enhanced Badge Variants

Badge component now includes three new status-specific variants: `active`, `inactive`, and `pending`.

**Usage**:
```tsx
import { Badge } from '@garret1u/ui'

<Badge variant="active">Active</Badge>
<Badge variant="inactive">Inactive</Badge>
<Badge variant="pending">Pending Approval</Badge>
```

**Visual Design**:
- **active**: Green background (success/20), green text
- **inactive**: Muted gray background, muted text
- **pending**: Yellow background (warning/20), warning text

**Complete Variant List**:
- `default` - Primary brand color
- `secondary` - Secondary color
- `destructive` - Red/error color
- `success` - Green color
- `warning` - Yellow color
- `info` - Blue color
- `outline` - Border only
- `active` - ✨ NEW: Status active indicator
- `inactive` - ✨ NEW: Status inactive indicator
- `pending` - ✨ NEW: Status pending indicator

---

### 3. Mobile Accessibility Utilities

A comprehensive set of mobile-first utilities has been added to ensure WCAG compliance and optimal mobile UX.

**File**: `packages/ui/src/styles/utilities.css`

#### 3.1 Touch Target Sizing (WCAG 2.5.5 Level AAA)

Automatically applies 44x44px minimum touch targets on mobile devices.

```css
/* Automatic on mobile for interactive elements */
@media (max-width: 640px) {
  button, a[role="button"], [role="button"] {
    min-height: 44px;
    min-width: 44px;
  }
}

/* Manual application */
<div className="touch-target">...</div>
```

**Opt-out**:
```tsx
<button className="touch-target-none">Small Button</button>
```

#### 3.2 iOS Zoom Prevention

Prevents unwanted zoom on input focus in iOS Safari by ensuring minimum 16px font size.

```css
input[type="text"],
input[type="email"],
select,
textarea {
  font-size: max(16px, 1rem);
}
```

**Automatically applied** - no configuration needed!

#### 3.3 Responsive Typography with Clamp

Fluid typography that scales smoothly across viewport sizes.

**Classes**:
```tsx
<h1 className="text-display-2xl">  {/* 2.5rem - 4.5rem */}
<h2 className="text-display-xl">   {/* 2rem - 3.75rem */}
<h3 className="text-display-lg">   {/* 1.875rem - 3rem */}
<h4 className="text-heading-xl">   {/* 1.5rem - 2.25rem */}
<h5 className="text-heading-lg">   {/* 1.25rem - 1.875rem */}
<h6 className="text-heading-md">   {/* 1.125rem - 1.5rem */}
<p className="text-body-lg">       {/* 1rem - 1.125rem */}
```

#### 3.4 Swipeable Containers

Horizontal scrolling with scroll-snap for mobile-optimized carousels.

```tsx
<div className="swipe-container">
  <div className="swipe-item">Card 1</div>
  <div className="swipe-item">Card 2</div>
  <div className="swipe-item">Card 3</div>
</div>
```

**Features**:
- Smooth scroll snapping
- Touch-optimized scrolling
- Hidden scrollbars
- Auto-sizing items (280px default)

#### 3.5 Mobile Table Transformation

Converts tables to card-style layout on mobile automatically.

```tsx
<table className="mobile-table">
  <thead>...</thead>
  <tbody>
    <tr>
      <td data-label="Name">John Doe</td>
      <td data-label="Email">john@example.com</td>
    </tr>
  </tbody>
</table>
```

**On Mobile (< 768px)**:
- Each row becomes a card
- Column labels appear from `data-label` attribute
- Responsive padding and borders

#### 3.6 Safe Area Insets

Support for iOS notch and home indicator.

```tsx
<header className="safe-area-inset-top">...</header>
<footer className="safe-area-inset-bottom">...</footer>
```

**Classes**:
- `safe-area-inset-top`
- `safe-area-inset-bottom`
- `safe-area-inset-left`
- `safe-area-inset-right`
- `safe-area-inset` (all sides)

#### 3.7 Enhanced Focus States

Improved keyboard navigation with accessible focus indicators.

```css
*:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}
```

**Automatically applied** - respects user's focus-visible preferences!

#### 3.8 Reduced Motion Support

Respects user's motion preferences.

```css
@media (prefers-reduced-motion: reduce) {
  /* Animations are minimal or disabled */
}
```

**Automatically applied** - ensures accessibility compliance!

#### 3.9 Additional Utilities

**Screen Reader Only**:
```tsx
<span className="sr-only">Loading...</span>
<a href="#main" className="sr-only-focusable">Skip to main content</a>
```

**Truncation**:
```tsx
<p className="truncate-1">Single line truncation</p>
<p className="truncate-2">Two line truncation</p>
<p className="truncate-3">Three line truncation</p>
```

**Loading Overlay**:
```tsx
<div className="loading-overlay">
  Content with automatic spinner overlay
</div>
```

**Aspect Ratios**:
```tsx
<div className="aspect-square">1:1</div>
<div className="aspect-video">16:9</div>
<div className="aspect-portrait">3:4</div>
<div className="aspect-landscape">4:3</div>
```

**High Contrast Mode**:
```css
@media (prefers-contrast: high) {
  /* Enhanced borders and contrast automatically applied */
}
```

**Print Optimization**:
```tsx
<button className="no-print">Don't print this</button>
<section className="page-break-before">New page</section>
<div className="page-break-avoid">Keep together</div>
```

---

## 🔄 Enhancements

### Design Token System

All existing design tokens have been verified and are production-ready:

**Shadows** (6-tier system):
```css
--shadow-xs:  0 1px 2px 0 rgb(0 0 0 / 0.05)
--shadow-sm:  0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)
--shadow-md:  0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
--shadow-lg:  0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)
--shadow-xl:  0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25)
```

**Z-Index Hierarchy**:
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

**Animation Durations**:
```css
--duration-instant: 75ms
--duration-fast: 150ms
--duration-normal: 250ms
--duration-slow: 350ms
--duration-slower: 500ms
```

**Easing Functions**:
```css
--ease-linear: linear
--ease-in: cubic-bezier(0.4, 0, 1, 1)
--ease-out: cubic-bezier(0, 0, 0.2, 1)
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
--ease-spring: cubic-bezier(0.68, -0.55, 0.265, 1.55)
--ease-bounce: cubic-bezier(0.68, -0.6, 0.32, 1.6)
```

---

## 📦 What's Included

### Complete Component Library

All 33+ components are available and fully documented:

**Core Components**:
- Button (with loading state ✨)
- Badge (with status variants ✨)
- Avatar
- Spinner
- Skeleton (with shimmer)

**Form Components**:
- Input
- Textarea
- Select
- Checkbox
- Switch
- Label
- Multi-Select
- Calendar

**Layout Components**:
- Card (with interactive mode)
- Separator
- Tabs
- Accordion
- Collapsible
- Sidebar
- Table

**Overlay Components**:
- Dialog
- Alert Dialog
- Sheet
- Dropdown Menu
- Popover
- Tooltip

**Feedback Components**:
- Alert
- Progress
- Toast

**Advanced Components**:
- Command Palette
- Combobox
- Data Table

---

## 📚 Documentation

### Updated Files

1. **DEEP_AUDIT_FINDINGS.md** - Comprehensive audit report comparing @garret1u/ui with production applications
2. **THEMING.md** - Complete theming guide with 8 themes
3. **COMPONENTS.md** - Documentation for Command Palette, Combobox, and Data Table
4. **utilities.css** - Mobile accessibility utilities with inline documentation

### Usage Examples

All components include TypeScript definitions and usage examples. Check the respective component files for detailed API documentation.

---

## 🔧 Migration Guide

### From v2.2.0 to v2.3.0

**No breaking changes!** All existing code will continue to work.

**Optional Enhancements**:

1. **Add Mobile Utilities** (Recommended):
```tsx
// In your app's global CSS or layout
import '@garret1u/ui/styles/utilities.css'
```

2. **Use Button Loading State**:
```tsx
// Before
<Button disabled={isLoading}>
  {isLoading ? <Spinner size="sm" /> : null}
  Submit
</Button>

// After (simpler!)
<Button loading={isLoading}>
  Submit
</Button>
```

3. **Use Status Badge Variants**:
```tsx
// Before
<Badge variant={user.active ? "success" : "secondary"}>
  {user.active ? "Active" : "Inactive"}
</Badge>

// After (more semantic!)
<Badge variant={user.active ? "active" : "inactive"}>
  {user.active ? "Active" : "Inactive"}
</Badge>
```

---

## 🐛 Bug Fixes

- None - this is a feature release with no bug fixes

---

## ⚠️ Breaking Changes

**None** - This release is fully backwards compatible with v2.2.0.

---

## 📊 Performance

No performance regressions. All new utilities use CSS-only solutions with no JavaScript overhead.

**CSS Bundle Size**:
- utilities.css: ~8KB gzipped
- Total impact: < 1% increase in bundle size

---

## 🎯 Next Steps (v2.4.0 Roadmap)

Based on the deep audit findings, future enhancements may include:

- Container query support for Card component
- Additional animation utilities
- Enhanced data visualization helpers
- Form validation utilities
- More responsive layout patterns

---

## 🙏 Credits

This release was informed by design patterns from:
- aviation-optimizer (Gantt charts, flight management)
- google-analytics-app (data visualization, responsive tables)

Special thanks to the WCAG guidelines and iOS/Android best practices for mobile accessibility patterns.

---

## 📦 Installation

```bash
npm install @garret1u/ui@2.3.0

# or
yarn add @garret1u/ui@2.3.0

# or
pnpm add @garret1u/ui@2.3.0
```

---

## 🔗 Links

- **GitHub**: https://github.com/garret1U/shared-ui-workspace
- **Documentation**: See THEMING.md and COMPONENTS.md
- **Audit Report**: See DEEP_AUDIT_FINDINGS.md

---

## ✅ Release Checklist

- [x] All TypeScript type-checks pass
- [x] No breaking changes
- [x] Documentation updated
- [x] Release notes created
- [ ] Version bumped to 2.3.0 in package.json
- [ ] Git tag created
- [ ] Published to npm

---

**Thank you for using @garret1u/ui!** 🎉
