import type * as React from 'react'

import cx from 'classnames'

export type TableHeadingCellProps = React.JSX.IntrinsicElements['th']

export const TableHeadingCell = function TableHeadingCell({
  ref,
  className,
  children,
  ...rest
}: TableHeadingCellProps & {
  ref?: React.RefObject<HTMLTableCellElement>
}): React.JSX.Element {
  const classes = cx(
    'not-prose whitespace-nowrap px-2 py-4 text-sm text-gray-700 uppercase bg-canvas-100/50 dark:bg-canvas-800/50 dark:text-gray-200',
    className
  )
  return (
    <th ref={ref} className={classes} {...rest}>
      {children}
    </th>
  )
}
