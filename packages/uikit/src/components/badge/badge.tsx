import { Slot } from '@radix-ui/react-slot'
import cx from 'classnames'

import styles from './badge.module.css'
import type { Intent } from '../@types/shared'

type AsDiv = {
  asChild?: false
} & React.ComponentPropsWithoutRef<'div'>

interface AsSlot {
  asChild?: true
}

export type BadgeRefType<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref']

export type BadgeProps<C extends React.ElementType = 'div'> = {
  children: React.ReactNode
  intent?: Intent
  className?: string
  asChild?: boolean
  ref?: BadgeRefType<C>
} & (AsSlot | AsDiv)

export const Badge = <C extends React.ElementType = 'div'>({
  className,
  intent = 'primary',
  children,
  asChild,
  ref,
  ...rest
}: BadgeProps<C>): React.JSX.Element => {
  const Comp: React.ElementType = asChild === true ? Slot : 'div'
  return (
    <Comp
      ref={ref}
      className={cx(
        'infonomic-badge',
        `infonomic-badge-${intent}`,
        styles.badge,
        styles[intent],
        className
      )}
      {...rest}
    >
      {children}
    </Comp>
  )
}

Badge.displayName = 'Badge'
