import cx from 'classnames'
import type React from 'react'

import styles from './help-text.module.css'

interface HelpTextProps {
  className?: string
  text: string
}

export function HelpText({ className, text }: HelpTextProps): React.JSX.Element {
  return <p className={cx('help-text', styles.text, className)}>{text}</p>
}
