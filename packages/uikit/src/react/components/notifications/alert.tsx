'use client'
/* eslint-disable react/jsx-pascal-case */
import type React from 'react'
import { useState } from 'react'

import { Transition } from '@headlessui/react'
import cx from 'classnames'

import { DangerIcon } from '../../icons/danger-icon'
import { InfoIcon } from '../../icons/info-icon'
import { SuccessIcon } from '../../icons/success-icon'
import { WarningIcon } from '../../icons/warning-icon'

import styles from './alert.module.css'
import { CloseButton } from './close'

import type { IconProps } from '../../icons/types/icon'
import type { Children, ClassName, Close, Icon, Intent } from './types/alert'

export interface AlertProps {
  intent?: Intent
  icon?: Icon
  close?: Close
  className?: ClassName
  title?: string
  children: Children
}

const alertIcons = {
  primary: WarningIcon,
  secondary: InfoIcon,
  success: SuccessIcon,
  info: InfoIcon,
  warning: WarningIcon,
  danger: DangerIcon,
}

function IconElement({
  showIcon,
  Icon,
}: {
  showIcon: boolean
  Icon: React.FC<IconProps>
}): React.JSX.Element {
  return (
    <>
      {showIcon != null && showIcon && (
        <div className={styles.alertIcon}>
          <Icon useSprite={true} />
        </div>
      )}
    </>
  )
}

function CloseElement({
  close,
  className,
  intent,
  handleClose,
}: {
  close: boolean
  className?: string
  intent: Intent
  handleClose: () => void
}): React.JSX.Element {
  return (
    <>
      {close != null && close && (
        <div className={cx(styles.alertClose, className)}>
          <CloseButton intent={intent} onClick={handleClose} />
        </div>
      )}
    </>
  )
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
}): React.JSX.Element {
  const [show, setShow] = useState(true)

  const Icon = alertIcons[intent as keyof typeof alertIcons]

  const handleClose = (): void => {
    setShow(false)
  }

  return (
    <Transition
      show={show}
      enter={styles.transitionOpacityEnter}
      enterFrom={styles.transitionOpacityEnterFrom}
      enterTo={styles.transitionOpacityEnterTo}
      leave={styles.transitionOpacityLeave}
      leaveFrom={styles.transitionOpacityLeaveFrom}
      leaveTo={styles.transitionOpacityLeaveTo}
    >
      <div ref={ref} className={styles.alert} {...rest}>
        {title != null ? (
          <>
            <div className={cx(styles.alertHeader)}>
              <div className={styles.alertIcon}>
                <IconElement showIcon={icon} Icon={Icon} />
              </div>
              <div className={cx(styles.alertTitle)}>{title}</div>
              <CloseElement intent={intent} close={close} handleClose={handleClose} />
            </div>
            <div className={cx(styles.alertContent)}>{children}</div>
          </>
        ) : (
          <>
            <div className={styles.alertIcon}>
              <IconElement showIcon={icon} Icon={Icon} />
            </div>
            <div className={styles.alertContent}>{children}</div>
            <CloseElement intent={intent} close={close} handleClose={handleClose} />
          </>
        )}
      </div>
    </Transition>
  )
}
