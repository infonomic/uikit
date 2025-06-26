import cx from 'classnames'
import { ScrollArea as ScrollAreaPrimitive } from 'radix-ui'

import type React from 'react'
import styles from './scroll-area.module.css'

interface ScrollAreaProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {}

export const ScrollArea = ({ children, style, className }: ScrollAreaProps) => (
  <ScrollAreaPrimitive.Root style={style} className={cx(styles.root, className)}>
    <ScrollAreaPrimitive.Viewport className={styles.viewport}>
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollAreaPrimitive.Scrollbar className={styles.scrollbar} orientation="vertical">
      <ScrollAreaPrimitive.Thumb className={styles.thumb} />
    </ScrollAreaPrimitive.Scrollbar>
    <ScrollAreaPrimitive.Scrollbar className={styles.scrollbar} orientation="horizontal">
      <ScrollAreaPrimitive.Thumb className={styles.thumb} />
    </ScrollAreaPrimitive.Scrollbar>
    <ScrollAreaPrimitive.Corner className={styles.corner} />
  </ScrollAreaPrimitive.Root>
)
