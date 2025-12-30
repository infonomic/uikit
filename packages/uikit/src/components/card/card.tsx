import type React from 'react'

import { Slot } from '@radix-ui/react-slot'
import cx from 'classnames'

import styles from './card.module.css'

type AsDiv = {
  asChild?: false
} & React.ComponentPropsWithoutRef<'div'>

interface AsSlot {
  asChild?: true
}

export type CardRefType<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref']

export type CardProps<C extends React.ElementType = 'div'> = {
  children: React.ReactNode
  className?: string
  hover?: boolean
  asChild?: boolean
  ref?: CardRefType<C>
} & (AsSlot | AsDiv)

const Card = <C extends React.ElementType = 'div'>({
  className,
  hover,
  children,
  asChild,
  ref,
  ...rest
}: CardProps<C>) => {
  const Comp: React.ElementType = asChild === true ? Slot : 'div'
  const hoverClasses = hover != null && hover === true ? styles['card-hover'] : undefined
  const classes = cx(styles.card, hoverClasses, className)

  return (
    <Comp ref={ref} className={classes} {...rest}>
      {children}
    </Comp>
  )
}

Card.displayName = 'Card'

interface OtherProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>
}

const Header = ({ className, ref, ...props }: OtherProps) => (
  <div ref={ref} className={cx(styles['card-header'], className)} {...props} />
)

Header.displayName = 'CardHeader'

const Title = ({ className, ref, ...props }: OtherProps) => (
  <div
    ref={ref as React.Ref<HTMLDivElement>}
    className={cx(styles['card-title'], className)}
    {...props}
  />
)
Title.displayName = 'CardTitle'

const Description = ({ className, ref, ...props }: OtherProps) => (
  <div ref={ref} className={cx(styles['card-description'], className)} {...props} />
)
Description.displayName = 'CardDescription'

const Content = ({ className, ref, ...props }: OtherProps) => (
  <div ref={ref} className={cx(styles['card-content'], className)} {...props} />
)
Content.displayName = 'CardContent'

const Footer = ({ className, ref, ...props }: OtherProps) => (
  <div ref={ref} className={cx(styles['card-footer'], className)} {...props} />
)
Footer.displayName = 'CardFooter'

Card.Header = Header
Card.Title = Title
Card.Description = Description
Card.Content = Content
Card.Footer = Footer

export { Card }
