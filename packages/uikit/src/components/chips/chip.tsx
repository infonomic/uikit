'use client'

import type React from 'react'

import { Slot } from '@radix-ui/react-slot'
import cx from 'classnames'

import { CheckIcon } from '../../icons/check-icon.js'
import { CloseIcon } from '../../icons/close-icon.js'
import { IconButton } from '../button/icon-button.js'
import styles from './chip.module.css'
import type { ChipIntent, ChipSize, ChipVariant } from './@types/chip.js'

type AsButton = { asChild?: false } & React.ComponentPropsWithoutRef<'button'>

interface AsSlot {
  asChild?: true
}

export type ChipRefType<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref']

type ToggleEvent = React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
type RemoveEvent = React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>

export type ChipProps<C extends React.ElementType = 'button'> = {
  variant?: ChipVariant
  intent?: ChipIntent
  size?: ChipSize
  selected?: boolean
  disabled?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  selectedIcon?: React.ReactNode
  removeLabel?: string
  onToggle?: (selected: boolean, event: ToggleEvent) => void
  onRemove?: (event: RemoveEvent) => void
  className?: string
  ref?: ChipRefType<C>
} & (AsButton | AsSlot) &
  Omit<React.HTMLAttributes<HTMLElement>, 'onToggle'>

export const Chip = <C extends React.ElementType = 'button'>({
  variant = 'assist',
  intent = 'primary',
  size = 'md',
  selected = false,
  disabled = false,
  startIcon,
  endIcon,
  selectedIcon,
  removeLabel = 'Remove chip',
  onToggle,
  onRemove,
  className,
  children,
  asChild,
  ref,
  ...rest
}: ChipProps<C>) => {
  const { onClick, onKeyDown, role, tabIndex, ...restProps } = rest
  const Comp: React.ElementType = asChild === true ? Slot : 'button'
  const isSelectable = variant === 'selectable' || variant === 'selectable-removable'
  const isRemovable = variant === 'removable' || variant === 'selectable-removable'
  const isSelected = Boolean(selected)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      event.preventDefault()
      return
    }

    if (onClick) {
      ;(onClick as React.MouseEventHandler<HTMLElement>)(event)
    }

    if (isSelectable && onToggle) {
      onToggle(!isSelected, event)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (disabled) {
      return
    }

    if ((event.key === 'Enter' || event.key === ' ') && asChild === true) {
      event.preventDefault()
      if (onClick) {
        ;(onClick as React.MouseEventHandler<HTMLElement>)(
          event as unknown as React.MouseEvent<HTMLElement>
        )
      }
      if (isSelectable && onToggle) {
        onToggle(!isSelected, event)
      }
    }

    if ((event.key === 'Backspace' || event.key === 'Delete') && isRemovable && onRemove) {
      event.preventDefault()
      onRemove(event)
    }

    if (onKeyDown) {
      onKeyDown(event)
    }
  }

  const handleRemoveClick = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      return
    }
    event.stopPropagation()
    if (onRemove) {
      onRemove(event)
    }
  }

  const handleRemoveKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (disabled) {
      return
    }

    if (
      event.key === 'Enter' ||
      event.key === ' ' ||
      event.key === 'Backspace' ||
      event.key === 'Delete'
    ) {
      event.preventDefault()
      event.stopPropagation()
      if (onRemove) {
        onRemove(event)
      }
    }
  }

  const leadingIcon =
    startIcon ??
    (isSelectable && isSelected ? (selectedIcon ?? <CheckIcon className={styles.icon} />) : null)

  const trailingIcon = isRemovable ? (
    <button
      type="button"
      tabIndex={disabled ? -1 : 0}
      disabled={disabled}
      aria-label={removeLabel}
      onClick={handleRemoveClick}
      onKeyDown={handleRemoveKeyDown}
    >
      <CloseIcon className={cx(styles.icon, styles['close-icon'])} />
    </button>
  ) : (
    endIcon
  )

  const appliedVariant = isSelected ? 'filled' : 'outlined'

  return (
    <Comp
      ref={ref}
      type={asChild === true ? undefined : 'button'}
      role={role ?? (asChild === true ? 'button' : undefined)}
      tabIndex={disabled ? -1 : (tabIndex ?? 0)}
      aria-disabled={disabled || undefined}
      aria-pressed={isSelectable ? isSelected : undefined}
      aria-selected={isSelectable ? isSelected : undefined}
      className={cx(
        'chip',
        variant,
        intent,
        size,
        { selected: isSelected, disabled, removable: isRemovable },
        styles.chip,
        styles[appliedVariant],
        styles[intent],
        styles[size],
        className
      )}
      disabled={asChild === true ? undefined : disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...restProps}
    >
      {leadingIcon != null && <span className={cx(styles.iconWrapper)}>{leadingIcon}</span>}
      <span className={styles.label}>{children}</span>
      {trailingIcon != null && <span className={cx(styles.iconWrapper)}>{trailingIcon}</span>}
    </Comp>
  )
}

Chip.displayName = 'Chip'
