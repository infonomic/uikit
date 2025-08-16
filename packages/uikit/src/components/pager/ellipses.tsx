'use client'

import cx from 'classnames'
import type React from 'react'

import { usePager } from './pagination'

import styles from './pagination.module.css'

export function Ellipses(): React.JSX.Element {
  const { variant } = usePager()
  return (
    // TODO - extract ellipses component
    <li className="flex">
      <div className={cx(styles.ellipses, 'pagination-ellipses')}>...</div>
    </li>
  )
}
