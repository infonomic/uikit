'use client'

import type React from 'react'

import { useFocusTrap, useMergedRef } from '@mantine/hooks'
import cx from 'classnames'
import { Toast as ToastPrimitive } from 'radix-ui'
import { twMerge } from 'tailwind-merge'

import { DangerIcon } from '../../icons/danger-icon'
import { InfoIcon } from '../../icons/info-icon'
import { PrimaryIcon } from '../../icons/primary-icon'
import { SuccessIcon } from '../../icons/success-icon'
import { WarningIcon } from '../../icons/warning-icon'
import objectsToString from '../../utils/objectsToString'
import { Button } from '../button/button'
import { CloseButton } from './close'
import { toastStyles } from './styles/index'

import type {
  ClassName,
  Close,
  Icon,
  IconType,
  Intent,
  Message,
  OnOpenChange,
  Open,
  Position,
  Title,
} from './types/toast'

const toastIcons = {
  success: SuccessIcon,
  info: InfoIcon,
  warning: WarningIcon,
  danger: DangerIcon,
}

export interface ToastProps extends React.InputHTMLAttributes<HTMLLIElement> {
  intent?: Intent
  position?: Position
  title: Title
  message: Message
  icon?: Icon
  iconType?: IconType
  close?: Close
  open: Open
  onOpenChange: OnOpenChange
  className?: ClassName
}

export const ToastProvider = ToastPrimitive.Provider
export const ToastViewport = ToastPrimitive.Viewport

// Important!: see comments in app/ui/components/notifications/styles/toast.ts regarding toast position

export const Toast = function Toast({
  ref,
  intent,
  position,
  title,
  message,
  icon,
  iconType,
  close,
  open,
  onOpenChange,
  className,
}: ToastProps & {
  ref?: React.RefObject<HTMLLIElement>
}) {
  const focusTrapRef = useFocusTrap()
  const mergedRef = useMergedRef(ref, focusTrapRef)
  // 1. init
  const { defaultProps, styles } = toastStyles
  const { base, intents, positions } = styles

  // 2. set default props
  intent = intent ?? defaultProps.intent
  position = position ?? defaultProps.position
  icon = icon ?? defaultProps.icon
  iconType = iconType ?? defaultProps.iconType
  close = close ?? defaultProps.close
  className = className ?? defaultProps.className

  // 3. set styles
  const toastBase = objectsToString(base.initial)
  const toastIntent = objectsToString(intents[intent as keyof typeof intents])
  const toastPosition = objectsToString(positions[position as keyof typeof positions])
  const classes = twMerge(cx('toast-root', toastBase, toastIntent, toastPosition), className)
  const Icon = toastIcons[iconType as keyof typeof toastIcons]

  const handleClose = (): void => {
    if (onOpenChange != null) onOpenChange(false)
  }

  return (
    <ToastPrimitive.Root
      open={open}
      ref={mergedRef}
      onOpenChange={onOpenChange}
      className={classes}
    >
      <div className="toast-header flex justify-between gap-3 px-4 pt-2">
        <div className="block pl-[4px] pt-[4px] text-sm">
          {new Intl.DateTimeFormat('default', {
            hour12: true,
            hour: 'numeric',
            minute: 'numeric',
          }).format(new Date())}
        </div>
        {close != null && (
          <ToastPrimitive.Close aria-label="Close" asChild>
            <div>
              <CloseButton intent={intent} onClick={handleClose} />
            </div>
          </ToastPrimitive.Close>
        )}
      </div>

      <div className="flex gap-3 px-4 pb-4 pt-2">
        <div className="toast-content radix flex w-full flex-1 flex-col">
          <ToastPrimitive.Title className="mb-2 flex items-center gap-2 text-base font-medium">
            {icon != null && <Icon />}
            {title}
          </ToastPrimitive.Title>
          <ToastPrimitive.Description className="ml-1 text-sm">
            {message}
          </ToastPrimitive.Description>
        </div>
        <div className="toast-actions flex flex-col gap-2 pt-4">
          <Button
            intent="secondary"
            variant="outlined"
            size="sm"
            className="border-gray-700 text-gray-800 dark:border-gray-100 dark:bg-transparent dark:text-white"
            onClick={(e: { preventDefault: () => void }) => {
              e.preventDefault()
              window.open('https://github.com/infonomic')
            }}
          >
            Review
          </Button>
        </div>
      </div>
    </ToastPrimitive.Root>
  )
}
