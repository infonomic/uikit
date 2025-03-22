'use client'

import type React from 'react'
import { useCallback, useEffect, useState } from 'react'

import cx from 'classnames'

interface HamburgerProps {
  className?: string
  color?: string
  activeBorderColor?: string
  open: boolean
  onChange: (event: React.MouseEvent<HTMLButtonElement> | null) => void
}

export function Hamburger({
  className,
  color = 'bg-white before:bg-white after:bg-white',
  activeBorderColor,
  open,
  onChange,
  ...other
}: HamburgerProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setIsOpen(!isOpen)
    onChange(event)
  }

  const handleEscapeKey = useCallback(
    (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        if (isOpen) {
          setIsOpen(false)
          onChange(null)
        }
      }
    },
    [isOpen, onChange]
  )

  useEffect(() => {
    setIsOpen(open)
    document.addEventListener('keydown', handleEscapeKey, false)
    return () => {
      document.removeEventListener('keydown', handleEscapeKey, false)
    }
  }, [open, handleEscapeKey])

  return (
    <button
      onClick={handleClick}
      className={cx(`component--hamburger ${isOpen ? 'is_active' : ''}`, className)}
      tabIndex={0}
      aria-label="Open main menu"
      aria-controls="main-menu"
      aria-haspopup="true"
      {...other}
    >
      <span className="box" aria-hidden="true">
        <span className={cx('inner', color)} />
      </span>
    </button>
  )
}
