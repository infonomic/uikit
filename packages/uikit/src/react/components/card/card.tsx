import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import cx from 'classnames'
import styles from './card.module.css'

export type AsDiv = {
  asChild?: false
} & React.ComponentPropsWithoutRef<'div'>

export interface AsSlot {
  asChild?: true
}

export type CardRefType = React.Ref<HTMLDivElement | HTMLElement | null>

export type CardProps = {
  children: React.ReactNode
  className?: string
  hover?: boolean
} & (AsDiv | AsSlot)

interface OtherProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>
}

const Card = function Card({
  ref,
  className,
  hover,
  children,
  asChild,
  ...rest
}: CardProps & {
  ref?: React.RefObject<CardRefType>
}) {
  const Comp = asChild != null ? Slot : 'div'
  let hoverClasses: string | undefined
  if (hover != null && hover) {
    hoverClasses = styles.cardHover
  }
  const classes = cx(styles.card, hoverClasses, className)

  return (
    <Comp ref={ref as any} className={classes} {...rest}>
      {children}
    </Comp>
  )
}

Card.displayName = 'Card'

const CardHeader = ({ className, ref, ...props }: OtherProps) => (
  <div ref={ref} className={cx(styles.cardHeader, className)} {...props} />
)

CardHeader.displayName = 'CardHeader'

const CardTitle = ({ className, ref, ...props }: OtherProps) => (
  <div
    ref={ref as React.Ref<HTMLDivElement>}
    className={cx(styles.cardTitle, className)}
    {...props}
  />
)
CardTitle.displayName = 'CardTitle'

const CardDescription = ({ className, ref, ...props }: OtherProps) => (
  <div ref={ref} className={cx(styles.cardDescription, className)} {...props} />
)
CardDescription.displayName = 'CardDescription'

const CardContent = ({ className, ref, ...props }: OtherProps) => (
  <div ref={ref} className={cx(styles.cardContent, className)} {...props} />
)
CardContent.displayName = 'CardContent'

const CardFooter = ({ className, ref, ...props }: OtherProps) => (
  <div ref={ref} className={cx(styles.cardFooter, className)} {...props} />
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
