import type React from 'react'

import cx from 'classnames'
import { ScrollArea as ScrollAreaPrimitive } from 'radix-ui'

import styles from './scroll-area.module.css'

interface ScrollAreaProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> { }

export const ScrollArea = ({ children, style, className }: ScrollAreaProps) => (
  <ScrollAreaPrimitive.Root style={style} className={cx('infonomic-scroll-area', styles.root, className)}>
    <ScrollAreaPrimitive.Viewport className={cx('infonomic-scroll-area-viewport', styles.viewport)}>
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollAreaPrimitive.Scrollbar className={cx('infonomic-scroll-area-scrollbar', styles.scrollbar)} orientation="vertical">
      <ScrollAreaPrimitive.Thumb className={cx('infonomic-scroll-area-thumb', styles.thumb)} />
    </ScrollAreaPrimitive.Scrollbar>
    <ScrollAreaPrimitive.Scrollbar className={cx('infonomic-scroll-area-scrollbar', styles.scrollbar)} orientation="horizontal">
      <ScrollAreaPrimitive.Thumb className={cx('infonomic-scroll-area-thumb', styles.thumb)} />
    </ScrollAreaPrimitive.Scrollbar>
    <ScrollAreaPrimitive.Corner className={cx('infonomic-scroll-area-corner', styles.corner)} />
  </ScrollAreaPrimitive.Root>
)
