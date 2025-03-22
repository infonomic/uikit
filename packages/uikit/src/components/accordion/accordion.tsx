'use client'

import type React from 'react'

import { ChevronDownIcon } from '@radix-ui/react-icons'
import { Accordion } from 'radix-ui'

import cx from 'classnames'

import styles from './accordion.module.css'

export type AccordionRootElement = React.ComponentRef<'div'>

export const AccordionRoot = ({
  children,
  className,
  ref,
  ...props
}: {
  children: React.ReactNode
  className?: string
  ref?: React.RefObject<AccordionRootElement>
} & (Accordion.AccordionSingleProps | Accordion.AccordionMultipleProps)) => {
  return (
    <Accordion.Root ref={ref} className={cx(styles.root, className)} {...props}>
      {children}
    </Accordion.Root>
  )
}

export type AccordionItemElement = React.ComponentRef<'div'>
export const AccordionItem = function AccordionItem({
  ref,
  children,
  className,
  ...props
}: Accordion.AccordionItemProps & {
  ref?: React.RefObject<AccordionItemElement>
}) {
  return (
    <Accordion.Item className={cx(styles.item, className)} {...props} ref={ref}>
      {children}
    </Accordion.Item>
  )
}

export type AccordionHeaderElement = React.ComponentRef<'h2'>
export const AccordionHeader = function AccordionHeader({
  ref,
  children,
  className,
  ...props
}: Accordion.AccordionHeaderProps & {
  ref?: React.RefObject<AccordionHeaderElement>
}) {
  return (
    <Accordion.Header className={cx(styles.header, className)} {...props} ref={ref}>
      {children}
    </Accordion.Header>
  )
}

export type AccordionTriggerElement = React.ComponentRef<'button'>
export const AccordionTrigger = function AccordionTrigger({
  ref,
  children,
  className,
  ...props
}: Accordion.AccordionTriggerProps & {
  ref?: React.RefObject<AccordionTriggerElement>
}) {
  return (
    <Accordion.Trigger ref={ref} className={cx(styles.trigger, className)} {...props}>
      {children}
      <ChevronDownIcon className={styles.chevron} aria-hidden />
    </Accordion.Trigger>
  )
}

export type AccordionContentElement = React.ComponentRef<'div'>
export const AccordionContent = function AccordionContent({
  ref,
  children,
  className,
  ...props
}: Accordion.AccordionContentProps & {
  ref?: React.RefObject<AccordionContentElement>
}) {
  return (
    <Accordion.Content className={cx(styles.content, className)} {...props} ref={ref}>
      <div className={styles['content-text']}>{children}</div>
    </Accordion.Content>
  )
}
