'use client'
import type React from 'react'
import { useEffect, useState } from 'react'

import cx from 'classnames'

import { Button } from '../button/button.js'

import { CloseIcon } from '../../icons/close-icon'
import { DangerIcon } from '../../icons/danger-icon'
import { InfoIcon } from '../../icons/info-icon'
import { SuccessIcon } from '../../icons/success-icon'
import { WarningIcon } from '../../icons/warning-icon'

import type { Intent } from './@types/alert.js'

import styles from './alert.module.css'

export interface AlertProps {
  intent?: Intent
  icon?: boolean
  close?: boolean
  className?: string
  title?: string
  children: React.ReactNode
}

const alertIcons = {
  primary: WarningIcon,
  secondary: InfoIcon,
  success: SuccessIcon,
  info: InfoIcon,
  warning: WarningIcon,
  danger: DangerIcon,
}

export const Alert = function Alert({
  ref,
  intent = 'success',
  icon = true,
  close = true,
  title,
  className,
  children,
  ...rest
}: AlertProps & {
  ref?: React.RefObject<HTMLDivElement>
}): React.JSX.Element | null {
  const [show, setShow] = useState(true)
  const [fade, setFade] = useState(false)

  const Icon = alertIcons[intent as keyof typeof alertIcons]

  const handleOnClose = (): void => {
    setFade(true)
    setTimeout(() => setShow(false), 400) // Match the CSS transition duration
  }

  useEffect(() => {
    if (!show) {
      // Perform any cleanup if necessary
    }
  }, [show])

  if (show === false) return null

  return (
    <div
      ref={ref}
      className={cx(styles.alert, styles[intent], className, { [styles.fade]: fade })}
      {...rest}
    >
      {title != null ? (
        <>
          <div className={styles['alert-with-title']}>
            <div className={cx(styles.header)}>
              {icon && <Icon useSprite={true} className={styles.icon} />}
              <div className={cx(styles.title)}>
                <span>{title}</span>
              </div>
              {close === true && (
                <Button
                  intent={intent}
                  variant="filled"
                  aria-label="Close"
                  className={cx(styles.close)}
                  type="button"
                  onClick={handleOnClose}
                  {...rest}
                >
                  <CloseIcon height="12px" width="12px" />
                </Button>
              )}
            </div>
            <div className={cx(styles.content)}>{children}</div>
          </div>
        </>
      ) : (
        <>
          {icon && <Icon useSprite={true} className={styles.icon} />}
          <div className={styles.content}>{children}</div>
          {close === true && (
            <Button
              intent={intent}
              variant="filled"
              aria-label="Close"
              className={styles.close}
              type="button"
              onClick={handleOnClose}
              {...rest}
            >
              <CloseIcon height="12px" width="12px" />
            </Button>
          )}
        </>
      )}
    </div>
  )
}
