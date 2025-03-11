// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

import { Button } from '../../components/button/button.js'
import { IconButton } from '../../components/button/icon-button.js'
import { CloseIcon } from '../../icons/close-icon.js'

import { Drawer, DrawerContainer, DrawerContent, DrawerHeader } from './index.js'

export default {
  title: 'Widgets/Drawer',
  component: Drawer,
  argTypes: {},
}

export const Default = (): React.JSX.Element => {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true)
        }}
      >
        Open Drawer
      </Button>
      <Drawer
        id="first-drawer"
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)}
      >
        <DrawerContainer aria-hidden={!isOpen}>
          <DrawerHeader className="flex items-center justify-between mb-4">
            <h3>Drawer Actions Here</h3>
            <IconButton
              arial-label="Close"
              size="sm"
              onClick={() => {
                setIsOpen(false)
              }}
            >
              <CloseIcon width="16px" height="16px" svgClassName="white-icon" />
            </IconButton>
          </DrawerHeader>
          <DrawerContent>
            <p>Drawer content here...</p>
          </DrawerContent>
        </DrawerContainer>
      </Drawer>
    </>
  )
}
