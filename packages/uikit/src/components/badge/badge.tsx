import cx from 'classnames'
import { Intent } from '../@types/shared'
import styles from './badge.module.css'

export function Badge({ children, intent = "primary" }: { children: React.ReactNode, intent?: Intent }): React.JSX.Element {
  return <div className={cx('badge', intent, styles.badge, styles[intent])}>{children}</div>
}