import type * as React from 'react'

import cx from 'classnames'

export type TableRowProps = React.JSX.IntrinsicElements['tr']

export const TableRow = function TableRow({
  ref,
  className,
  children,
  ...rest
}: TableRowProps & {
  ref?: React.RefObject<HTMLTableRowElement>
}): React.JSX.Element {
  const classes = cx(
    'border-b border-solid border-canvas-200 bg-white hover:bg-canvas-100/50 dark:border-canvas-700/60 dark:bg-canvas-800/50 dark:hover:bg-canvas-700/50',
    className
  )

  return (
    <tr ref={ref} className={classes} {...rest}>
      {children}
    </tr>
  )
}
