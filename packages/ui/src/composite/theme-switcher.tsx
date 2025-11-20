'use client'

import { Moon, Sun, Monitor, Palette, Check } from 'lucide-react'
import { Button } from '../primitives/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../primitives/dropdown-menu'
import { useTheme, type Theme, type Mode } from '../providers/theme-provider'
import type { ReactNode } from 'react'

interface ThemeOption {
  value: Theme
  label: string
  description: string
}

const themes: ThemeOption[] = [
  { value: 'zinc', label: 'Zinc', description: 'Cool modern gray' },
  { value: 'slate', label: 'Slate', description: 'Professional blue-gray' },
  { value: 'stone', label: 'Stone', description: 'Warm natural gray' },
  { value: 'blue', label: 'Blue', description: 'Classic blue accent' },
  { value: 'green', label: 'Green', description: 'Fresh green accent' },
  { value: 'orange', label: 'Orange', description: 'Vibrant orange accent' },
  { value: 'red', label: 'Red', description: 'Bold red accent' },
  { value: 'violet', label: 'Violet', description: 'Royal violet accent' },
]

interface ModeOption {
  value: Mode
  label: string
  icon: typeof Sun
}

const modes: ModeOption[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
]

interface ThemeSwitcherProps {
  /**
   * Show as separate dropdowns (default) or combined
   */
  variant?: 'separate' | 'combined'
  /**
   * Align dropdown menu
   */
  align?: 'start' | 'center' | 'end'
}

export function ThemeSwitcher({ variant = 'separate', align = 'end' }: ThemeSwitcherProps): ReactNode {
  const { theme, mode, setTheme, setMode } = useTheme()

  if (variant === 'combined') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon-sm">
            <Palette className="h-4 w-4" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={align} className="w-64">
          <DropdownMenuLabel>Choose Theme</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {themes.map((t) => (
            <DropdownMenuItem
              key={t.value}
              onClick={() => setTheme(t.value)}
              className="cursor-pointer"
            >
              <div className="flex w-full items-center justify-between">
                <div>
                  <div className="font-medium">{t.label}</div>
                  <div className="text-xs text-muted-foreground">{t.description}</div>
                </div>
                {theme === t.value && <Check className="h-4 w-4 text-primary" />}
              </div>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {modes.map((m) => {
            const Icon = m.icon
            return (
              <DropdownMenuItem
                key={m.value}
                onClick={() => setMode(m.value)}
                className="cursor-pointer"
              >
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span>{m.label}</span>
                  </div>
                  {mode === m.value && <Check className="h-4 w-4 text-primary" />}
                </div>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  // Separate dropdowns
  return (
    <div className="flex items-center gap-2">
      {/* Theme Color Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon-sm">
            <Palette className="h-4 w-4" />
            <span className="sr-only">Choose theme color</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={align} className="w-56">
          <DropdownMenuLabel>Choose Theme</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {themes.map((t) => (
            <DropdownMenuItem
              key={t.value}
              onClick={() => setTheme(t.value)}
              className="cursor-pointer"
            >
              <div className="flex w-full items-center justify-between">
                <div>
                  <div className="font-medium">{t.label}</div>
                  <div className="text-xs text-muted-foreground">{t.description}</div>
                </div>
                {theme === t.value && <Check className="h-4 w-4 text-primary" />}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Light/Dark Mode Toggle */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon-sm">
            {mode === 'light' && <Sun className="h-4 w-4" />}
            {mode === 'dark' && <Moon className="h-4 w-4" />}
            {mode === 'system' && <Monitor className="h-4 w-4" />}
            <span className="sr-only">Toggle appearance</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={align}>
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {modes.map((m) => {
            const Icon = m.icon
            return (
              <DropdownMenuItem
                key={m.value}
                onClick={() => setMode(m.value)}
                className="cursor-pointer"
              >
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span>{m.label}</span>
                  </div>
                  {mode === m.value && <Check className="h-4 w-4 text-primary" />}
                </div>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
