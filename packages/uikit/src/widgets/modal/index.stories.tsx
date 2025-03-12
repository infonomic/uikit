// biome-ignore lint/style/useImportType: <explanation>
import React from 'react'

import { Button } from '../../components/button/button.js'
import { IconButton } from '../../components/button/icon-button.js'
import { CloseIcon } from '../../icons/close-icon.js'

import {
  Modal,
  ModalActions,
  ModalContainer,
  ModalContent,
  ModalHeader,
  useModal,
} from './index.js'

export default {
  title: 'Widgets/Modal',
  component: Modal,
  argTypes: {},
}

export const Default = (): React.JSX.Element => {
  const { onDismiss, onOpen, isOpen, setIsOpen } = useModal()

  const whiteIcon = `
    .white-icon {
      fill: white;  
    }
  `

  return (
    <>
      <style>{whiteIcon}</style>
      <Button
        onClick={() => {
          setIsOpen(true)
        }}
      >
        Open Modal
      </Button>
      <Modal isOpen={isOpen} onDismiss={onDismiss} closeOnOverlayClick={true}>
        <ModalContainer className="sm:w-[500px]">
          <ModalHeader className="flex items-center justify-between mb-4">
            <h2>Modal Header</h2>
            <IconButton
              arial-label="Close"
              size="sm"
              onClick={() => {
                setIsOpen(false)
              }}
            >
              <CloseIcon width="16px" height="16px" svgClassName="white-icon" />
            </IconButton>
          </ModalHeader>
          <ModalContent>
            <p>
              Modal content with some text here that should run a little longer. And longer here.
              And the current theme is.
            </p>
          </ModalContent>
          <ModalActions>
            <Button
              size="sm"
              intent="noeffect"
              onClick={() => {
                setIsOpen(false)
              }}
              data-autofocus
            >
              Close
            </Button>
          </ModalActions>
        </ModalContainer>
      </Modal>
    </>
  )
}
