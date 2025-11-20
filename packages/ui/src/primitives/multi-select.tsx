/**
 * Multi-select component with checkbox selection
 */

'use client'

import * as React from 'react'
import { Check, ChevronsUpDown, X } from 'lucide-react'
import { Button } from './button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './popover'
import { cn } from '../lib/utils'

export interface MultiSelectOption {
  label: string
  value: string
}

interface MultiSelectProps {
  options: MultiSelectOption[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  className?: string
  maxDisplay?: number
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = 'Select items...',
  className,
  maxDisplay = 2,
}: MultiSelectProps): React.ReactElement {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (value: string): void => {
    const newSelected = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value]
    onChange(newSelected)
  }

  const handleClear = (e: React.MouseEvent): void => {
    e.stopPropagation()
    onChange([])
  }

  const getDisplayLabel = (): string => {
    if (selected.length === 0) {
      return placeholder
    }
    if (selected.length === options.length) {
      return 'All selected'
    }
    if (selected.length <= maxDisplay) {
      return selected
        .map((val) => options.find((opt) => opt.value === val)?.label || val)
        .join(', ')
    }
    return `${selected.length} selected`
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'justify-between font-normal',
            selected.length === 0 && 'text-muted-foreground',
            className
          )}
        >
          <span className="truncate">{getDisplayLabel()}</span>
          <div className="flex items-center gap-1 ml-2">
            {selected.length > 0 && (
              <X
                className="h-4 w-4 opacity-50 hover:opacity-100"
                onClick={handleClear}
              />
            )}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <div className="max-h-[300px] overflow-auto p-1">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={cn(
                'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground',
                selected.includes(option.value) && 'bg-accent/50'
              )}
            >
              <div
                className={cn(
                  'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                  selected.includes(option.value)
                    ? 'bg-primary text-primary-foreground'
                    : 'opacity-50 [&_svg]:invisible'
                )}
              >
                <Check className="h-3 w-3" />
              </div>
              <span>{option.label}</span>
            </div>
          ))}
          {options.length === 0 && (
            <div className="py-6 text-center text-sm text-muted-foreground">No options available</div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
