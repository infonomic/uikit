'use client'

import type React from 'react'
import cx from 'classnames'
import { useEffect, useState } from 'react'

import style from './scroll-to-top.module.css'

type ScrollToTopIntrinsicProps = React.JSX.IntrinsicElements['button']

export interface ScrollToTopProps extends ScrollToTopIntrinsicProps {
  offset?: number,
  ref?: React.RefObject<HTMLButtonElement>
}

export function ScrollToTop({
  ref,
  offset = -65,
  ...rest
}: ScrollToTopProps) {
  const [show, setShow] = useState(false)

  const handleOnClick = (): void => {
    window.scrollTo({ top: offset, left: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const handleOnScroll = (): void => {
      const scrollTop = window.scrollY
      if (scrollTop > 200) {
        setShow(true)
      } else {
        setShow(false)
      }
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleOnScroll)
    }
    return () => {
      window.removeEventListener('scroll', handleOnScroll)
    }
  }, [])

  return (
    <button
      ref={ref}
      {...rest}
      onClick={handleOnClick}
      type="button"
      id="scroll-to-top"
      className={cx('scroll-to-top', style['scroll-to-top'], {
        'scroll-to-top-shown': show,
        [style['scroll-to-top-shown']]: show,
      })}
    >
      <span>
        <svg className="icon" style={{fill: 'currentColor'}} focusable="false" aria-hidden="true" viewBox="0 0 51 32">
          <path d="M25.4,9.8L45.6,30l4.5-4.5L25.4,0.8L0.8,25.4L5.3,30L25.4,9.8z" />
        </svg>
      </span>
    </button>
  )
}
