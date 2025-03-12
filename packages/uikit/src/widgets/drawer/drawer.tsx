'use client'
import type React from 'react'

import cx from 'classnames'

import { AnimatePresence, type FeatureBundle, LazyMotion } from 'motion/react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Overlay } from '../../components/overlay'
import useMediaQuery from '../../hooks/use-media-query'
import { getPortalRoot } from '../../utils/getPortalRoot'
import { useDrawer } from './drawer-context'

import { DrawerWrapper } from './index.js'

import type { ReactNode } from 'react'

import styles from './drawer.module.css'

type Styles = {
  [key: string]: string
}

const typedStyles: Styles = styles

const DomMax: () => Promise<FeatureBundle> = async () =>
  await import('./motionDomMax').then((mod) => mod.default)
const DomAnimation: () => Promise<FeatureBundle> = async () =>
  await import('./motionDomAnimation').then((mod) => mod.default)

export interface DrawerProps {
  id: string
  isOpen: boolean
  closeOnOverlayClick?: boolean
  onDismiss: () => void
  children: ReactNode
  width?: 'narrow' | 'wide'
}

export const Drawer: React.FC<DrawerProps> = ({
  id,
  isOpen,
  onDismiss,
  closeOnOverlayClick,
  children,
  width = 'narrow',
  ...rest
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)') ?? false
  const { addDrawer, removeDrawer, drawers } = useDrawer()
  const depth = drawers.indexOf(id)

  const handleOverlayDismiss = (e: any): void => {
    e.stopPropagation()
    e.preventDefault()
    if (closeOnOverlayClick === true) {
      onDismiss?.()
    }
  }

  useEffect(() => {
    if (isOpen) {
      addDrawer(id)
    } else {
      removeDrawer(id)
    }
    return () => removeDrawer(id)
  }, [isOpen, id, addDrawer, removeDrawer])

  const portal = getPortalRoot()

  if (portal === false) return null

  return createPortal(
    <LazyMotion features={isMobile ? DomMax : DomAnimation}>
      <AnimatePresence>
        {isOpen === true && (
          <DrawerWrapper
            style={{ zIndex: 100 + depth }}
            transition={{ duration: 0.2 }}
            onEscapeKey={handleOverlayDismiss}
            className={cx(
              typedStyles[`drawer-${width}`],
              typedStyles[`drawer-depth-${depth.toString()}`]
            )}
            {...rest}
          >
            <Overlay onClick={handleOverlayDismiss} isUnmounting={!(isOpen ?? false)} />
            {children}
          </DrawerWrapper>
        )}
      </AnimatePresence>
    </LazyMotion>,
    portal
  )
}
