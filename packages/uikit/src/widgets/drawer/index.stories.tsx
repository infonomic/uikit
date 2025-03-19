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
        Open Drawer
      </Button>
      <Drawer
        id="first-drawer"
        closeOnOverlayClick={true}
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

export const Wide = (): React.JSX.Element => {
  const [isOpen, setIsOpen] = React.useState(false)

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
        Open Drawer
      </Button>
      <Drawer
        id="first-drawer"
        closeOnOverlayClick={true}
        isOpen={isOpen}
        width="wide"
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

export const Nested = (): React.JSX.Element => {
  const [isOpen1, setIsOpen1] = React.useState(false)
  const [isOpen2, setIsOpen2] = React.useState(false)

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
          setIsOpen1(true)
        }}
      >
        Open Drawer 1
      </Button>
      <Drawer
        id="first-drawer"
        width="medium"
        closeOnOverlayClick={true}
        isOpen={isOpen1}
        onDismiss={() => setIsOpen1(false)}
      >
        <DrawerContainer aria-hidden={!isOpen1}>
          <DrawerHeader className="flex items-center justify-between mb-4">
            <h3>Drawer 1</h3>
            <IconButton
              arial-label="Close"
              size="sm"
              onClick={() => {
                setIsOpen1(false)
              }}
            >
              <CloseIcon width="16px" height="16px" svgClassName="white-icon" />
            </IconButton>
          </DrawerHeader>
          <DrawerContent>
            <>
              <p>Drawer 1 actions here...</p>
              <Button
                onClick={() => {
                  setIsOpen2(true)
                }}
              >
                Open Drawer 2
              </Button>
              <Drawer
                id="second-drawer"
                width="medium"
                closeOnOverlayClick={true}
                isOpen={isOpen2}
                onDismiss={() => setIsOpen2(false)}
              >
                <DrawerContainer aria-hidden={!isOpen2}>
                  <DrawerHeader className="flex items-center justify-between mb-4">
                    <h3>Drawer 2</h3>
                    <IconButton
                      arial-label="Close"
                      size="sm"
                      onClick={() => {
                        setIsOpen2(false)
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
          </DrawerContent>
        </DrawerContainer>
      </Drawer>
    </>
  )
}
