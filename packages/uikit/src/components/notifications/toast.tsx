'use client'

import { useFocusTrap, useMergedRef } from '@mantine/hooks'
import cx from 'classnames'
import React from 'react'

import { Toast as ToastPrimitive } from 'radix-ui'

import { DangerIcon } from '../../icons/danger-icon'
import { InfoIcon } from '../../icons/info-icon'
import { PrimaryIcon } from '../../icons/primary-icon'
import { SuccessIcon } from '../../icons/success-icon'
import { WarningIcon } from '../../icons/warning-icon'

import { Button } from '../button/button.js'

import styles from './toast.module.css'

import { CloseIcon } from '../../icons/close-icon'
import type { IconType, Intent, OnOpenChange, Position } from './@types/toast.js'

const toastIcons = {
  success: SuccessIcon,
  info: InfoIcon,
  warning: WarningIcon,
  danger: DangerIcon,
}

export interface ToastProps extends React.InputHTMLAttributes<HTMLLIElement> {
  intent?: Intent
  position?: Position
  title: string
  message: string
  icon?: boolean
  iconType?: IconType
  close?: boolean
  open: boolean
  onOpenChange: OnOpenChange
  className?: string
}

export const ToastProvider = ToastPrimitive.Provider
export const ToastViewport = ToastPrimitive.Viewport

// Important!: see comments in app/ui/components/notifications/styles/toast.ts regarding toast position

export const Toast = function Toast({
  ref,
  intent = 'success',
  position = 'bottom-right',
  title,
  message,
  icon = true,
  iconType = 'success',
  close = true,
  open,
  onOpenChange,
  className,
}: ToastProps & {
  ref?: React.RefObject<HTMLLIElement>
}) {
  const eventDateRef = React.useRef(new Date())
  const timerRef = React.useRef(0)
  const focusTrapRef = useFocusTrap()
  const mergedRef = useMergedRef(ref, focusTrapRef)
  const Icon = toastIcons[iconType as keyof typeof toastIcons]

  const handleOnClose = (): void => {
    if (onOpenChange != null) onOpenChange(false)
  }

  const handleOnChange = (open: boolean): void => {
    console.log('handleOnChange', { open })
    if (open) {
      timerRef.current = window.setTimeout(() => {
        onOpenChange(false)
      }, 5000)
    } else {
      window.clearTimeout(timerRef.current)
    }
  }

  return (
    <ToastPrimitive.Root
      ref={mergedRef}
      className={cx(styles.root, styles[position])}
      open={open}
      onOpenChange={onOpenChange}
    >
      <div className={styles.header}>
        <time dateTime={eventDateRef.current.toISOString()} className="text-sm">
          {new Intl.DateTimeFormat('default', {
            hour12: true,
            hour: 'numeric',
            minute: 'numeric',
          }).format(eventDateRef.current)}
        </time>
        {close === true && (
          <ToastPrimitive.Close aria-label="Close" asChild>
            <Button
              intent={intent}
              tabIndex={0}
              variant="filled"
              aria-label="Close"
              className={styles.close}
              type="button"
              onClick={handleOnClose}
            >
              <CloseIcon height="12px" width="12px" />
            </Button>
          </ToastPrimitive.Close>
        )}
      </div>
      <ToastPrimitive.Title className={styles.title}>
        {icon != null && <Icon />}
        {title}
      </ToastPrimitive.Title>
      <ToastPrimitive.Description className={styles.description}>
        {message}
      </ToastPrimitive.Description>
      {/* <ToastPrimitive.Action className={styles.action} asChild altText="Goto schedule to undo">
        <div>
          <Button intent="primary" tabIndex={0} size="sm" variant="filled">
            Undo
          </Button>
        </div>
      </ToastPrimitive.Action> */}
    </ToastPrimitive.Root>
  )
}
