'use client'
import type React from 'react'

import { DismissableLayer } from '@radix-ui/react-dismissable-layer'
import { AnimatePresence, type FeatureBundle, LazyMotion } from 'motion/react'
import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { Overlay } from '../../components/overlay'
import useMediaQuery from '../../hooks/use-media-query'
import { getPortalRoot } from '../../utils/getPortalRoot'

import { DrawerContainer, DrawerContent, DrawerWrapper } from './index.js'

import type { ReactNode } from 'react'

const DomMax: () => Promise<FeatureBundle> = async () =>
  await import('./motionDomMax').then((mod) => mod.default)
const DomAnimation: () => Promise<FeatureBundle> = async () =>
  await import('./motionDomAnimation').then((mod) => mod.default)

interface DrawerContextType {
  drawers: string[]
  addDrawer: (id: string) => void
  removeDrawer: (id: string) => void
}

const DrawerContext = createContext<DrawerContextType>({
  drawers: [],
  addDrawer: () => {},
  removeDrawer: () => {},
})

interface DrawerProviderProps {
  children: ReactNode
}

export const DrawerProvider: React.FC<DrawerProviderProps> = ({ children }) => {
  const [drawers, setDrawers] = useState<string[]>([])

  const addDrawer = useCallback((id: string) => {
    setDrawers((prev) => [...prev, id])
  }, [])

  const removeDrawer = useCallback((id: string) => {
    setDrawers((prev) => prev.filter((drawerId) => drawerId !== id))
  }, [])

  return (
    <DrawerContext.Provider value={{ drawers, addDrawer, removeDrawer }}>
      {children}
    </DrawerContext.Provider>
  )
}

export function useDrawer(): DrawerContextType {
  const context = useContext(DrawerContext)
  if (context === undefined) {
    throw new Error('useDrawer must be used within a DrawerProvider')
  }
  return context
}

export interface DrawerProps {
  id: string
  isOpen: boolean
  closeOnOverlayClick?: boolean
  disableOutsidePointerEvents?: boolean
  onDismiss: () => void
  children: ReactNode
  width?: string
}

export const Drawer: React.FC<DrawerProps> = ({
  id,
  isOpen,
  onDismiss,
  closeOnOverlayClick,
  disableOutsidePointerEvents = true,
  children,
  width = '300px',
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
          <DismissableLayer
            role="dialog"
            disableOutsidePointerEvents={disableOutsidePointerEvents}
            onEscapeKeyDown={handleOverlayDismiss}
          >
            <DrawerWrapper transition={{ duration: 0.2 }} {...rest}>
              <Overlay onClick={handleOverlayDismiss} isUnmounting={!(isOpen ?? false)} />
              {children}
            </DrawerWrapper>
          </DismissableLayer>
        )}
      </AnimatePresence>
    </LazyMotion>,
    portal
  )
}
