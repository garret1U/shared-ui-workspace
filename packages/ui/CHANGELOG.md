# Changelog

All notable changes to @garret1u/ui will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.3.1] - 2025-11-20

### Fixed

- **CRITICAL**: Fixed Tailwind CSS v4 compatibility - all color utilities now generate correctly
  - Added color variable registration to base `@theme` block in themes.css
  - All semantic colors (`text-primary`, `bg-primary`, `border-primary`, etc.) now work correctly
  - Enables all color utilities with opacity variants (`bg-primary/50`, `text-primary/80`, etc.)

- **CRITICAL**: Fixed invisible Spinner component
  - Changed from `border-current` + `text-*` pattern to direct `border-*` utilities
  - Spinner now renders visibly in all color variants (default, secondary, destructive, success, warning, info)
  - Loading states now work correctly across all consuming applications

- **CRITICAL**: Fixed colorless Alert component icons
  - Alert icons now display with correct semantic colors based on variant
  - All variants (default, destructive, success, warning, info) render correctly

- **CRITICAL**: Fixed invisible Checkbox check marks
  - Check icon now visible when checkbox is in checked state
  - Uses proper color inheritance from parent component

### Changed

- Consolidated CSS configuration for single source of truth
  - Removed duplicate `@theme` block from `globals.css` (~180 lines)
  - Simplified `globals.css` to import-only structure
  - All theme configuration now lives in `themes.css`
  - Improved maintainability and consistency

### Technical Details

- Package is now fully compatible with Tailwind CSS v4.1.17+
- Multi-theme system (8 themes) now fully functional with v4
- All 20+ components render correctly with proper colors
- Zero breaking changes to component API
- Type checking passes with no errors

## [2.3.0] - 2025-11-19

### Added

- Multi-theme support with 8 pre-built themes:
  - Zinc (default) - Cool, modern gray
  - Slate - Professional blue-gray
  - Stone - Warm, natural gray
  - Blue - Classic vibrant blue
  - Green - Fresh, vibrant green
  - Orange - Energetic orange
  - Red - Bold, assertive red
  - Violet - Elegant, royal violet

- Theme provider for programmatic theme switching
- Dark mode support for all themes
- OKLCH color space for perceptually uniform colors

### Changed

- Migrated to Tailwind CSS v4 CSS-first configuration
- Updated color system to use CSS custom properties
- Enhanced component styling with improved design tokens

## [2.2.0] - 2025-11-18

### Added

- Initial component library release
- Core primitives: Button, Input, Card, Badge, etc.
- Composite components: Combobox, DataTable, etc.
- shadcn/ui compatible components

[2.3.1]: https://github.com/garret1U/shared-ui-workspace/compare/v2.3.0...v2.3.1
[2.3.0]: https://github.com/garret1U/shared-ui-workspace/compare/v2.2.0...v2.3.0
[2.2.0]: https://github.com/garret1U/shared-ui-workspace/releases/tag/v2.2.0
