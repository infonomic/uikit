'use client'

import type * as React from 'react'

import cx from 'classnames'
import { Tabs as TabsPrimitive } from 'radix-ui'

import styles from './tabs.module.css'

const Tabs = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
  ref?: React.RefObject<React.ComponentRef<typeof TabsPrimitive.Root>>
}) => (
  <TabsPrimitive.Root
    ref={ref}
    className={cx(styles['tabs-root'], 'tabs-root', className)}
    {...props}
  />
)
Tabs.displayName = TabsPrimitive.Root.displayName

const TabsList = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
  ref?: React.RefObject<React.ComponentRef<typeof TabsPrimitive.List>>
}) => (
  <TabsPrimitive.List
    ref={ref}
    className={cx(styles['tabs-list'], 'tabs-list', className)}
    {...props}
  />
)
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
  ref?: React.RefObject<React.ComponentRef<typeof TabsPrimitive.Trigger>>
}) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cx(styles['tabs-trigger'], 'tabs-trigger', className)}
    {...props}
  />
)
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & {
  ref?: React.RefObject<React.ComponentRef<typeof TabsPrimitive.Content>>
}) => (
  <TabsPrimitive.Content
    ref={ref}
    forceMount={true}
    className={cx(styles['tabs-content'], 'tabs-content', className)}
    {...props}
  />
)
TabsContent.displayName = TabsPrimitive.Content.displayName

Tabs.List = TabsList
Tabs.Trigger = TabsTrigger
Tabs.Content = TabsContent

export { Tabs }
