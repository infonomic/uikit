import cx from 'classnames'

import { Cross2Icon } from '@radix-ui/react-icons'

import type React from 'react'

import { Button } from '../button'
import type { ButtonProps } from '../button'

import styles from './close.module.css'

export const CloseButton = function CloseButton({
  ref,
  intent,
  onClick,
  className,
  ...rest
}: Omit<ButtonProps, 'children'>): React.JSX.Element {
  return (
    <Button
      ref={ref}
      intent={intent}
      variant="filled"
      aria-label="Close"
      className={cx(styles.close, 'not-dark', className)}
      type="button"
      onClick={onClick}
      {...rest}
    >
      <Cross2Icon />
    </Button>
  )
}
