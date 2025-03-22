import type * as React from 'react'

import cx from 'classnames'

export type TableProps = React.JSX.IntrinsicElements['table']

export const Table = function Table({
  ref,
  className,
  children,
  ...rest
}: TableProps & {
  ref?: React.RefObject<HTMLTableElement>
}): React.JSX.Element {
  const classes = cx(
    'border-collapse w-full text-sm text-left text-gray-700 dark:text-gray-400 m-0',
    className
  )

  return (
    <table ref={ref} className={classes} {...rest}>
      {children}
    </table>
  )
}
