'use client'

import type React from 'react'
import { useEffect, useRef, useState } from 'react'

import { Button } from '../../components/button'
import { Input, InputAdornment } from '../../components/input'
import { CloseIcon, SearchIcon } from '../../icons'

import type { ClassName, Intent, Size, Variant } from '../../components/input/types/input'

export interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: Variant
  inputSize?: Size
  inputClassName?: ClassName
  intent?: Intent
  className?: ClassName
  ariaLabelForSearch?: string
  ariaLabelForClear?: string
  onClear?: () => void
  onEnter?: (value: string) => void
  onSearch?: (value: string) => void
  validatorFn?: (value: string) => {
    valid: boolean
    value: any
  }
  placeHolderText?: string
}

function fallbackSearchHandler(value: string): void {
  // Implement a fallback querystring search handler
  // but.... this will cause a page reload so not ideal
  // for React and therefore should rarely be called.
  const url = new URL(window.location.href)
  const params = new URLSearchParams(url.search)
  if (value.length > 0) {
    params.set('query', value)
  } else {
    params.delete('query')
  }
  window.location.search = params.toString()
}

export function Search({
  variant,
  inputSize,
  inputClassName,
  intent,
  className,
  onClear,
  onEnter,
  onSearch,
  validatorFn,
  placeHolderText = 'Search',
  ariaLabelForSearch = 'search',
  ariaLabelForClear = 'clear',
  ...rest
}: SearchProps): React.JSX.Element {
  const [search, setSearch] = useState<null | string>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClear = (): void => {
    setSearch(null)
    if (onClear != null) {
      onClear()
    } else {
      fallbackSearchHandler('')
    }
    if (inputRef?.current != null) {
      inputRef.current.value = ''
    }
  }

  const handleKeyDown = (event: { key: string }): void => {
    if (event.key === 'Enter') {
      if (search != null && search.length > 0) {
        if (validatorFn != null) {
          const result = validatorFn(search)
          if (result.valid) {
            if (onSearch != null) {
              onSearch(search)
            } else {
              fallbackSearchHandler(search)
            }
          }
        } else {
          if (onSearch != null) {
            onSearch(search)
          } else {
            fallbackSearchHandler(search)
          }
        }
      }
    }
  }

  const handleSearch = (): void => {
    if (search != null && search.length > 0) {
      if (validatorFn != null) {
        const result = validatorFn(search)
        if (result.valid) {
          if (onSearch != null) {
            onSearch(search)
          } else {
            fallbackSearchHandler(search)
          }
        }
      } else {
        if (onSearch != null) {
          onSearch(search)
        } else {
          fallbackSearchHandler(search)
        }
      }
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const currentSearch = searchParams.get('query')
    if (currentSearch != null && search == null) {
      setSearch(currentSearch)
    }
  })

  return (
    <div className={className}>
      <Input
        variant={variant}
        intent={intent}
        inputSize={inputSize}
        ref={inputRef}
        className={inputClassName}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
        id="search"
        defaultValue={search ?? ''}
        name="search"
        placeHolder={placeHolderText}
        disabled={false}
        error={false}
        startAdornment={
          <InputAdornment position="start">
            <Button
              role="button"
              className="flex align-self w-[28px] h-[28px] min-w-[28px] min-h-[28px] rounded-full"
              intent="primary"
              variant="text"
              ripple={false}
              arial-label={ariaLabelForSearch}
              size="sm"
              onClick={() => {
                handleSearch()
              }}
            >
              <SearchIcon width="20px" height="20px" />
            </Button>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <Button
              className="flex align-self w-[28px] h-[28px] min-w-[28px] min-h-[28px] rounded-full"
              intent="primary"
              variant="text"
              arial-label={ariaLabelForClear}
              size="sm"
              onClick={() => {
                handleClear()
              }}
            >
              <CloseIcon width="18px" height="18px" svgClassName="fill-gray-500 dark:fill-white" />
            </Button>
          </InputAdornment>
        }
        {...rest}
      />
    </div>
  )
}
