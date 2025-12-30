'use client'

/**
 * NOTE: An accordion can be used in a variety of ways, including
 * simple FAQs, complex navigation, and more. As such, we minimally
 * style the accordion here in order to provide a base for customization.
 */

import type React from 'react'

import cx from 'classnames'
import { Accordion as AccordionPrimitive } from 'radix-ui'

import styles from './accordion.module.css'

export type AccordionRootElement = React.ComponentRef<'div'>

const Root = ({
  children,
  className,
  ref,
  ...props
}: {
  children: React.ReactNode
  className?: string
  ref?: React.RefObject<AccordionRootElement>
} & (AccordionPrimitive.AccordionSingleProps | AccordionPrimitive.AccordionMultipleProps)) => {
  return (
    <AccordionPrimitive.Root ref={ref} className={className} {...props}>
      {children}
    </AccordionPrimitive.Root>
  )
}

export type AccordionItemElement = React.ComponentRef<'div'>
const Item = function AccordionItem({
  ref,
  children,
  className,
  ...props
}: AccordionPrimitive.AccordionItemProps & {
  ref?: React.RefObject<AccordionItemElement>
}) {
  return (
    <AccordionPrimitive.Item className={className} {...props} ref={ref}>
      {children}
    </AccordionPrimitive.Item>
  )
}

export type AccordionHeaderElement = React.ComponentRef<'h2'>
const Header = function AccordionHeader({
  ref,
  children,
  className,
  ...props
}: AccordionPrimitive.AccordionHeaderProps & {
  ref?: React.RefObject<AccordionHeaderElement>
}) {
  return (
    <AccordionPrimitive.Header className={cx(styles.header, className)} {...props} ref={ref}>
      {children}
    </AccordionPrimitive.Header>
  )
}

export type AccordionTriggerElement = React.ComponentRef<'button'>
const Trigger = function AccordionTrigger({
  ref,
  children,
  className,
  ...props
}: AccordionPrimitive.AccordionTriggerProps & {
  ref?: React.RefObject<AccordionTriggerElement>
}) {
  return (
    <AccordionPrimitive.Trigger ref={ref} className={cx(styles.trigger, className)} {...props}>
      {children}
    </AccordionPrimitive.Trigger>
  )
}

export type AccordionContentElement = React.ComponentRef<'div'>
const Content = function AccordionContent({
  ref,
  children,
  className,
  ...props
}: AccordionPrimitive.AccordionContentProps & {
  ref?: React.RefObject<AccordionContentElement>
}) {
  return (
    <AccordionPrimitive.Content className={cx(styles.content, className)} {...props} ref={ref}>
      {children}
    </AccordionPrimitive.Content>
  )
}

export const Accordion = {
  Root,
  Item,
  Header,
  Trigger,
  Content,
}
