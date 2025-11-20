"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "../lib/utils"
import { Button } from "../primitives/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../primitives/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../primitives/popover"

export interface ComboboxOption {
  value: string
  label: string
  disabled?: boolean
}

export interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  emptyText?: string
  searchPlaceholder?: string
  disabled?: boolean
  className?: string
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select an option...",
  emptyText = "No results found.",
  searchPlaceholder = "Search...",
  disabled = false,
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [internalValue, setInternalValue] = React.useState(value || "")

  const selectedValue = value !== undefined ? value : internalValue
  const selectedOption = options.find((option) => option.value === selectedValue)

  const handleSelect = (currentValue: string): void => {
    const newValue = currentValue === selectedValue ? "" : currentValue

    if (value === undefined) {
      setInternalValue(newValue)
    }

    onValueChange?.(newValue)
    setOpen(false)
  }

  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value)
    }
  }, [value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "w-full justify-between",
            !selectedValue && "text-muted-foreground",
            className
          )}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={handleSelect}
                  disabled={option.disabled}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValue === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

// Multi-select variant
export interface MultiComboboxProps {
  options: ComboboxOption[]
  values?: string[]
  onValuesChange?: (values: string[]) => void
  placeholder?: string
  emptyText?: string
  searchPlaceholder?: string
  disabled?: boolean
  className?: string
  maxSelected?: number
}

export function MultiCombobox({
  options,
  values = [],
  onValuesChange,
  placeholder = "Select options...",
  emptyText = "No results found.",
  searchPlaceholder = "Search...",
  disabled = false,
  className,
  maxSelected,
}: MultiComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [internalValues, setInternalValues] = React.useState<string[]>(values)

  const selectedValues = values !== undefined ? values : internalValues
  const selectedCount = selectedValues.length

  const handleSelect = (currentValue: string): void => {
    let newValues: string[]

    if (selectedValues.includes(currentValue)) {
      newValues = selectedValues.filter((v) => v !== currentValue)
    } else {
      if (maxSelected && selectedValues.length >= maxSelected) {
        return
      }
      newValues = [...selectedValues, currentValue]
    }

    if (values === undefined) {
      setInternalValues(newValues)
    }

    onValuesChange?.(newValues)
  }

  React.useEffect(() => {
    if (values !== undefined) {
      setInternalValues(values)
    }
  }, [values])

  const displayText = React.useMemo(() => {
    if (selectedCount === 0) return placeholder
    if (selectedCount === 1) {
      const option = options.find((opt) => opt.value === selectedValues[0])
      return option?.label || placeholder
    }
    return `${selectedCount} selected`
  }, [selectedCount, selectedValues, options, placeholder])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "w-full justify-between",
            selectedCount === 0 && "text-muted-foreground",
            className
          )}
        >
          {displayText}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.includes(option.value)
                const isDisabled =
                  option.disabled ||
                  (maxSelected !== undefined &&
                    !isSelected &&
                    selectedCount >= maxSelected)

                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={handleSelect}
                    disabled={isDisabled}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        isSelected ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
