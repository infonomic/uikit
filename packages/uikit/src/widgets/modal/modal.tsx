'use client'
/* eslint-disable @typescript-eslint/consistent-type-imports */
import type React from 'react'
import { createContext, useCallback, useState } from 'react'
import { createPortal } from 'react-dom'

import { AnimatePresence, type FeatureBundle, LazyMotion } from 'motion/react'

import { Overlay } from '../../components/overlay'
import { useMediaQuery } from '../../hooks/use-media-query'
import { getPortalRoot } from '../../utils/getPortalRoot'

import { ModalActions } from './modal-actions'
import { ModalContainer } from './modal-container'
import { ModalContent } from './modal-content'
import { ModalHeader } from './modal-header'
import { ModalWrapper } from './modal-wrapper'

const DomMax: () => Promise<FeatureBundle> = async () =>
  await import('./motionDomMax').then((mod) => mod.default)
const DomAnimation: () => Promise<FeatureBundle> = async () =>
  await import('./motionDomAnimation').then((mod) => mod.default)

export interface ModalProps {
  isOpen?: boolean
  onDismiss?: () => void
  closeOnOverlayClick?: boolean
  children?: React.ReactNode
}

export const ModalContext = createContext<{
  onDismiss?: () => void
}>({})

export type UseModalProps = ReturnType<typeof useModal>

export function useModal(): {
  onDismiss: () => void
  onOpen: () => void
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
} {
  const [isOpen, setIsOpen] = useState(false)

  const onDismiss = useCallback(() => {
    setIsOpen(false)
  }, [])

  const onOpen = useCallback(() => {
    setIsOpen(true)
  }, [])

  return {
    onDismiss,
    onOpen,
    isOpen,
    setIsOpen,
  }
}

function Modal({
  isOpen,
  onDismiss,
  closeOnOverlayClick,
  children,
  ...rest
}: ModalProps): React.ReactPortal | null {
  const isMobile = useMediaQuery('(max-width: 768px)') ?? false

  const handleOverlayDismiss = (e: any): void => {
    e.stopPropagation()
    e.preventDefault()
    if (closeOnOverlayClick === true) {
      onDismiss?.()
    }
  }

  const portal = getPortalRoot()

  if (portal === false) return null

  return createPortal(
    <ModalContext.Provider value={{ onDismiss }}>
      <LazyMotion features={isMobile ? DomMax : DomAnimation}>
        <AnimatePresence>
          {isOpen === true && (
            <ModalWrapper
              transition={{ duration: 0.2 }}
              onEscapeKey={handleOverlayDismiss}
              {...rest}
            >
              <Overlay onClick={handleOverlayDismiss} isUnmounting={!(isOpen ?? false)} />
              {children}
            </ModalWrapper>
          )}
        </AnimatePresence>
      </LazyMotion>
    </ModalContext.Provider>,
    portal
  )
}

Modal.displayName = 'Modal'

Modal.Container = ModalContainer
Modal.Header = ModalHeader
Modal.Content = ModalContent
Modal.Actions = ModalActions

export { Modal }
