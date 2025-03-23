'use client'

import type React from 'react'

import cx from 'classnames'

import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui'

import styles from './dropdown.module.css'

function Root({ children, ...rest }: DropdownMenuPrimitive.DropdownMenuProps): React.JSX.Element {
  return <DropdownMenuPrimitive.Root {...rest}>{children}</DropdownMenuPrimitive.Root>
}

const Trigger = ({
  ref,
  className,
  children,
  ...rest
}: DropdownMenuPrimitive.DropdownMenuTriggerProps & {
  ref?: React.RefObject<React.ComponentRef<'button'>>
}): React.JSX.Element => {
  return (
    <DropdownMenuPrimitive.Trigger
      className={cx('dropdown-menu-trigger', className)}
      ref={ref}
      {...rest}
    >
      {children}
    </DropdownMenuPrimitive.Trigger>
  )
}
Trigger.displayName = 'Trigger'

function Portal({
  children,
  ...rest
}: DropdownMenuPrimitive.DropdownMenuPortalProps): React.JSX.Element {
  return <DropdownMenuPrimitive.Portal {...rest}>{children}</DropdownMenuPrimitive.Portal>
}

const Content = ({
  ref,
  className,
  children,
  ...rest
}: DropdownMenuPrimitive.DropdownMenuContentProps & {
  ref?: React.RefObject<React.ComponentRef<'div'>>
}): React.JSX.Element => {
  return (
    <DropdownMenuPrimitive.Content
      ref={ref}
      className={cx('dropdown-menu-content', styles['dropdown-content'], className)}
      {...rest}
    >
      {children}
    </DropdownMenuPrimitive.Content>
  )
}
Content.displayName = 'Content'

const Group = ({
  ref,
  className,
  children,
  ...rest
}: DropdownMenuPrimitive.DropdownMenuGroupProps & {
  ref?: React.RefObject<React.ComponentRef<'div'>>
}): React.JSX.Element => {
  return (
    <DropdownMenuPrimitive.Group
      ref={ref}
      className={cx('dropdown-menu-group', className)}
      {...rest}
    >
      {children}
    </DropdownMenuPrimitive.Group>
  )
}
Group.displayName = 'Group'

const Item = ({
  ref,
  className,
  children,
  ...rest
}: DropdownMenuPrimitive.DropdownMenuItemProps & {
  ref?: React.RefObject<React.ComponentRef<'div'>>
}): React.JSX.Element => {
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cx('dropdown-menu-item', styles['dropdown-item'], className)}
      {...rest}
    >
      {children}
    </DropdownMenuPrimitive.Item>
  )
}
Item.displayName = 'Item'

const Label = ({
  ref,
  className,
  children,
  ...rest
}: DropdownMenuPrimitive.DropdownMenuLabelProps & {
  ref?: React.RefObject<React.ComponentRef<'div'>>
}): React.JSX.Element => {
  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cx('dropdown-menu-label', className)}
      {...rest}
    >
      {children}
    </DropdownMenuPrimitive.Label>
  )
}
Label.displayName = 'Label'

const Separator = ({
  ref,
  className,
  ...props
}: DropdownMenuPrimitive.DropdownMenuSeparatorProps & {
  ref?: React.RefObject<React.ComponentRef<'div'>>
}): React.JSX.Element => {
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cx('dropdown-menu-separator', styles['dropdown-separator'], className)}
      {...props}
    />
  )
}
Separator.displayName = 'Separator'

function Sub({ children, ...rest }: DropdownMenuPrimitive.DropdownMenuSubProps): React.JSX.Element {
  return <DropdownMenuPrimitive.Sub {...rest}>{children}</DropdownMenuPrimitive.Sub>
}

const SubContent = ({
  ref,
  className,
  children,
  ...rest
}: DropdownMenuPrimitive.DropdownMenuSubContentProps & {
  ref?: React.RefObject<React.ComponentRef<'div'>>
}): React.JSX.Element => {
  return (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={cx('dropdown-menu-subcontent', className)}
      {...rest}
    >
      {children}
    </DropdownMenuPrimitive.SubContent>
  )
}
SubContent.displayName = 'SubContent'

const SubTrigger = ({
  ref,
  className,
  children,
  ...rest
}: DropdownMenuPrimitive.DropdownMenuSubTriggerProps & {
  ref?: React.RefObject<React.ComponentRef<'div'>>
}): React.JSX.Element => {
  return (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={cx('dropdown-menu-trigger', className)}
      {...rest}
    >
      {children}
    </DropdownMenuPrimitive.SubTrigger>
  )
}
SubTrigger.displayName = 'SubTrigger'

export const Dropdown = {
  Root,
  Trigger,
  Portal,
  Content,
  Group,
  Item,
  Label,
  Separator,
  Sub,
  SubContent,
  SubTrigger,
}
