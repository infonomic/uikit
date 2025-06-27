'use client'

import cx from 'classnames'
import { format } from 'date-fns'
import { Popover } from 'radix-ui'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { Button, IconButton } from '../../components/button/index.js'
import { Calendar } from '../../components/calendar/calendar.js'
import { Input, InputAdornment } from '../../components/input'
import type { Intent, Size, Variant } from '../../components/input/@types/input.js'
import { ScrollArea } from '../../components/scroll-area/scroll-area.js'
import { CloseIcon } from '../../icons'
import styles from './datepicker.module.css'

function formatDate(date: Date | undefined) {
  if (date == null) {
    return ''
  }
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function isValidDate(date: Date | undefined) {
  if (date == null) {
    return false
  }
  return Number.isNaN(date.getTime()) === true
}

export interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  name: string
  variant?: Variant
  inputSize?: Size
  inputWrapperClassName?: string
  inputClassName?: string
  intent?: Intent
  containerClassName?: string
  helpText?: string
  errorText?: string
  ariaLabelForSearch?: string
  ariaLabelForClear?: string
  onClear?: () => void
  onDateChange?: (value: Date) => void
  validatorFn?: (value: Date) => {
    valid: boolean
    value: any
  }
  placeHolderText?: string
}

export function DatePicker({
  id,
  name,
  variant,
  inputSize,
  inputClassName,
  inputWrapperClassName,
  intent,
  containerClassName,
  onClear,
  onChange,
  validatorFn,
  helpText,
  errorText,
  placeHolderText = 'Date',
  ariaLabelForSearch = 'date',
  ariaLabelForClear = 'clear',
  ...rest
}: DatePickerProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const [time, setTime] = useState<string>('05:00')
  const [date, setDate] = useState<Date | undefined>(new Date()) // Default button height
  const [value, setValue] = useState<string | undefined>(undefined)

  const calendarRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClear = (): void => {
    setDate(undefined)
    setValue(undefined)
    if (onClear != null) {
      onClear()
    }
    if (inputRef?.current != null) {
      inputRef.current.value = ''
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const date = new Date(e.target.value)
    setValue(e.target.value)
    if (isValidDate(date)) {
      setDate(date)
    }
    if (onChange != null && onChange instanceof Function) {
      // onChange(new Date(event.target.value))
    }
  }

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIsOpen(true)
    }
  }

  return (
    <div className={cx(styles.container, containerClassName)}>
      <Input
        id={id}
        readOnly
        name={name}
        variant={variant}
        intent={intent}
        inputSize={inputSize}
        ref={inputRef}
        className={inputClassName}
        inputWrapperClassName={inputWrapperClassName}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsOpen(true)
        }}
        value={value ? `${format(value, 'PPP')}, ${time}` : 'Pick a date'}
        placeHolder={placeHolderText}
        helpText={helpText}
        disabled={false}
        error={false}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              role="button"
              intent="noeffect"
              variant="text"
              arial-label={ariaLabelForClear}
              size="xs"
              onClick={() => {
                handleClear()
              }}
            >
              <CloseIcon width="16px" height="16px" />
            </IconButton>
          </InputAdornment>
        }
        {...rest}
      />
      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger asChild>
          <IconButton id="date-picker" intent="noeffect" variant="text">
            D<span className="sr-only">Select date</span>
          </IconButton>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content sideOffset={5} className={styles.content}>
            <Popover.Arrow className={styles.arrow} />
            <div className={styles['content-components']}>
              <div ref={calendarRef}>
                <Calendar
                  mode="single"
                  captionLayout="dropdown"
                  selected={date}
                  onSelect={(selectedDate) => {
                    if (selectedDate) {
                      const [hours, minutes] = time.split(':')
                      selectedDate.setHours(Number.parseInt(hours), Number.parseInt(minutes))
                      setDate(selectedDate)
                    }
                  }}
                  onDayClick={() => setIsOpen(false)}
                  fromYear={2000}
                  toYear={new Date().getFullYear()}
                  disabled={(date) =>
                    Number(date) < Date.now() - 1000 * 60 * 60 * 24 ||
                    Number(date) > Date.now() + 1000 * 60 * 60 * 24 * 30
                  }
                />
              </div>
              <div className={styles['time-picker-container']}>
                <ScrollArea className={styles['time-picker-scroll-area']}>
                  <div className={styles['time-picker']}>
                    {Array.from({ length: 96 }).map((_, i) => {
                      const hour = Math.floor(i / 4)
                        .toString()
                        .padStart(2, '0')
                      const minute = ((i % 4) * 15).toString().padStart(2, '0')
                      const timeValue = `${hour}:${minute}`
                      return (
                        <Button
                          key={i}
                          size="sm"
                          className={styles['time-picker-button']}
                          variant="outlined"
                          onClick={() => {
                            setTime(timeValue)
                            if (date) {
                              const newDate = new Date(date.getTime())
                              newDate.setHours(Number.parseInt(hour), Number.parseInt(minute))
                              setDate(newDate)
                            }
                            setIsOpen(false)
                          }}
                        >
                          {timeValue}
                        </Button>
                      )
                    })}
                  </div>
                </ScrollArea>
              </div>
            </div>
            <div className={styles['content-actions']}>
              <Button size="sm" intent="noeffect" className={styles['content-actions-button']}>
                Cancel
              </Button>
              <Button
                variant="outlined"
                size="sm"
                className={styles['content-actions-button']}
                onClick={() => {
                  setIsOpen(false)
                  // if (date && onDateChange) {
                  //   onDateChange(date)
                  // }
                }}
              >
                Select
              </Button>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  )
}
