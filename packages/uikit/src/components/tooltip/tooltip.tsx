'use client'

import type React from 'react'

import { Tooltip as TooltipPrimitive } from 'radix-ui'

type TooltipIntrinsicProps = React.JSX.IntrinsicElements['div']
export interface TooltipProps extends TooltipIntrinsicProps {
  text: string
  delay?: number
  side?: 'bottom' | 'top' | 'right' | 'left' | undefined
  sideOffset?: number
  disableHoverableContent?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

import styles from './tooltip.module.css'

export const Tooltip = function Tooltip({
  ref,
  text,
  delay = 500,
  side = 'top',
  sideOffset = 0,
  disableHoverableContent,
  open,
  onOpenChange,
  children,
}: TooltipProps & {
  ref?: React.RefObject<HTMLDivElement>
}): React.JSX.Element {
  return (
    <TooltipPrimitive.Provider
      delayDuration={delay}
      disableHoverableContent={disableHoverableContent}
    >
      <TooltipPrimitive.Root open={open} onOpenChange={onOpenChange}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          ref={ref}
          side={side}
          sideOffset={sideOffset}
          className={styles.tooltip}
        >
          {text}
          <TooltipPrimitive.Arrow className={styles['tooltip-arrow']} />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
