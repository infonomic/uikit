import { Slot } from '@radix-ui/react-slot'
import cx from 'classnames'
import { Intent } from '../@types/shared'
import styles from './badge.module.css'

export type AsDiv = {
  asChild?: false
} & React.ComponentPropsWithoutRef<'div'>

export interface AsSlot {
  asChild?: true
}

export type BadgeProps<C extends React.ElementType = 'div'> = {
  children: React.ReactNode
  intent?: Intent
  className?: string
  asChild?: boolean
} & (AsSlot | AsDiv)

export function Badge({ 
  className,
  intent = 'primary',
  children,
  asChild,
  ...rest }: BadgeProps): React.JSX.Element {
   const Comp: React.ElementType = asChild === true ? Slot : 'div'
  return (
    <Comp 
      className={cx('badge', intent, styles.badge, styles[intent], className)} {...rest}>
      {children}
    </Comp>
  )
}