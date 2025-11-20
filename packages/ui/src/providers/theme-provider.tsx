'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Theme = 'zinc' | 'slate' | 'stone' | 'blue' | 'green' | 'orange' | 'red' | 'violet'
export type Mode = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  mode: Mode
  setTheme: (theme: Theme) => void
  setMode: (mode: Mode) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: Theme
  defaultMode?: Mode
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = 'zinc',
  defaultMode = 'system',
  storageKey = 'ui-theme',
}: ThemeProviderProps): ReactNode {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)
  const [mode, setModeState] = useState<Mode>(defaultMode)

  // Load theme and mode from localStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(`${storageKey}-color`) as Theme | null
      const savedMode = localStorage.getItem(`${storageKey}-mode`) as Mode | null

      if (savedTheme && isValidTheme(savedTheme)) {
        setThemeState(savedTheme)
      }

      if (savedMode && isValidMode(savedMode)) {
        setModeState(savedMode)
      }
    } catch (error) {
      // localStorage might not be available (SSR, private browsing)
      console.warn('Failed to load theme from localStorage:', error)
    }
  }, [storageKey])

  // Apply theme to document
  useEffect(() => {
    try {
      const root = document.documentElement

      // Remove all theme attributes first
      root.removeAttribute('data-theme')

      // Set new theme
      root.setAttribute('data-theme', theme)

      // Persist to localStorage
      localStorage.setItem(`${storageKey}-color`, theme)
    } catch (error) {
      console.warn('Failed to apply theme:', error)
    }
  }, [theme, storageKey])

  // Apply mode (light/dark) to document
  useEffect(() => {
    const applyMode = (): (() => void) | undefined => {
      try {
        const root = document.documentElement
        root.classList.remove('light', 'dark')

        if (mode === 'system') {
          // Use system preference
          const systemMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
          root.classList.add(systemMode)

          // Listen for system preference changes
          const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
          const handleChange = (e: MediaQueryListEvent): void => {
            root.classList.remove('light', 'dark')
            root.classList.add(e.matches ? 'dark' : 'light')
          }

          mediaQuery.addEventListener('change', handleChange)

          // Persist to localStorage
          localStorage.setItem(`${storageKey}-mode`, mode)

          return () => mediaQuery.removeEventListener('change', handleChange)
        }

        // Use explicit mode
        root.classList.add(mode)

        // Persist to localStorage
        localStorage.setItem(`${storageKey}-mode`, mode)

        return undefined
      } catch (error) {
        console.warn('Failed to apply mode:', error)
        return undefined
      }
    }

    return applyMode()
  }, [mode, storageKey])

  const setTheme = (newTheme: Theme): void => {
    setThemeState(newTheme)
  }

  const setMode = (newMode: Mode): void => {
    setModeState(newMode)
  }

  return (
    <ThemeContext.Provider value={{ theme, mode, setTheme, setMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

// Type guards
function isValidTheme(value: string): value is Theme {
  return ['zinc', 'slate', 'stone', 'blue', 'green', 'orange', 'red', 'violet'].includes(value)
}

function isValidMode(value: string): value is Mode {
  return ['light', 'dark', 'system'].includes(value)
}
