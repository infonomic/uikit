import type * as React from 'react'

import cx from 'classnames'

export type TableCellProps = React.JSX.IntrinsicElements['td']

export const TableCell = function TableCell({
  ref,
  className,
  children,
  ...rest
}: TableCellProps & {
  ref?: React.RefObject<HTMLTableCellElement>
}): React.JSX.Element {
  const classes = cx('not-prose px-2 py-2 text-sm [&_a]:underline', className)

  return (
    <td ref={ref} className={classes} {...rest}>
      {children}
    </td>
  )
}
