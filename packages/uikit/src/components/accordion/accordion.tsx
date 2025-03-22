'use client'

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import type React from 'react'

import { Accordion } from 'radix-ui'

import cx from 'classnames'

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
    <Accordion.Root ref={ref} className={className} {...props}>
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
    <Accordion.Item className={className} {...props} ref={ref}>
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
    <Accordion.Header className="toc-header flex m-0" {...props} ref={ref}>
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
    <Accordion.Trigger
      ref={ref}
      className={cx('toc-trigger group flex items-center w-full cursor-pointer', className)}
      {...props}
    >
      {children}
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
    <Accordion.Content
      className={cx(
        'toc-content',
        'data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]',
        className
      )}
      {...props}
      ref={ref}
    >
      {children}
    </Accordion.Content>
  )
}
