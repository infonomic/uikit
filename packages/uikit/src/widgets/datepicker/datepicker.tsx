'use client'

import cx from 'classnames'
import { Popover } from 'radix-ui'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import classNames from 'react-day-picker/style.module.css'
import { IconButton } from '../../components/button/index.js'
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
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(new Date(Date.now()))
  const [month, setMonth] = useState<Date | undefined>(date)
  const [value, setValue] = useState(formatDate(date))
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClear = (): void => {
    setDate(undefined)
    setMonth(undefined)
    setValue('')
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
      setMonth(date)
    }
    if (onChange != null && onChange instanceof Function) {
      // onChange(new Date(event.target.value))
    }
  }

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
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
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
        value={value}
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
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <IconButton id="date-picker" intent="noeffect" variant="text">
            D<span className="sr-only">Select date</span>
          </IconButton>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className={styles.content} sideOffset={5}>
            <DayPicker
              classNames={classNames}
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                setDate(date)
                setValue(formatDate(date))
                setOpen(false)
              }}
            />
            <Popover.Close className={styles.close} aria-label="Close">
              <CloseIcon width="16px" height="16px" />
            </Popover.Close>
            <Popover.Arrow className={styles.arrow} />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  )
}
