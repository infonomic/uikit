import type React from 'react'

import cx from 'classnames'

import styles from './error-text.module.css'

interface ErrorTextProps {
  id: string
  className?: string
  text: string
}

export function ErrorText({ id, className, text }: ErrorTextProps): React.JSX.Element {
  return (
    <p id={id} className={cx(styles.text, className)}>
      {text}
    </p>
  )
}
