'use client'

import type React from 'react'
import { useEffect, useState } from 'react'

type ScrollToTopIntrinsicProps = React.JSX.IntrinsicElements['button']
interface ScrollToTopProps extends ScrollToTopIntrinsicProps {
  offset?: number
}

export type { ScrollToTopProps }

export const ScrollToTop = function ScrollToTop({
  ref,
  offset = -65,
  ...rest
}: ScrollToTopProps & {
  ref?: React.RefObject<HTMLButtonElement>
}) {
  const [show, setShow] = useState(false)

  const handleScrollToTopClick = (): void => {
    window.scrollTo({ top: offset, left: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const handleCheck = (): void => {
      const scrollTop = window.scrollY
      if (scrollTop > 200) {
        setShow(true)
      } else {
        setShow(false)
      }
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleCheck)
    }
    return () => {
      window.removeEventListener('scroll', handleCheck)
    }
  }, [])

  return (
    <button
      ref={ref}
      {...rest}
      onClick={handleScrollToTopClick}
      type="button"
      id="scroll-to-top"
      className={`btn-to-top ${show && 'btn-floating'}`}
    >
      <span>
        <svg className="icon" focusable="false" aria-hidden="true" viewBox="0 0 51 32">
          <path d="M25.4,9.8L45.6,30l4.5-4.5L25.4,0.8L0.8,25.4L5.3,30L25.4,9.8z" />
        </svg>
      </span>
    </button>
  )
}
