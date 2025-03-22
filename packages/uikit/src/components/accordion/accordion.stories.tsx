// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type React from 'react'

import cx from 'classnames'

import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from './accordion.js'

const AccordionDemo = (): React.JSX.Element => (
  <AccordionRoot asChild type="single" defaultValue="item-1" collapsible>
    <nav
      className={cx(
        'p-2 m-1',
        'border rounded bg-canvas-25 dark:border-canvas-800 dark:bg-canvas-900',
        'bg-gradient-to-tr from-canvas-50/10 to-canvas-50/10 dark:from-canvas-800/10 dark:to-canvas-800/10',
        'z-10'
      )}
    >
      <AccordionItem value="item-1">
        <AccordionHeader>
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <p>Yes. It adheres to the WAI-ARIA design pattern.</p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionHeader>
          <AccordionTrigger>Is it unstyled?</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <ul>
            <li>Submenu Item One</li>
            <li>Submenu Item Two</li>
            <li>Submenu Item Three</li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionHeader>
          <AccordionTrigger>Can it be animated?</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <p> Yes! You can animate the Accordion with CSS or JavaScript.</p>
        </AccordionContent>
      </AccordionItem>
    </nav>
  </AccordionRoot>
)

export default {
  title: 'Components/Accordion',
  component: AccordionDemo,
  argTypes: {},
}

export const Default = (): React.JSX.Element => {
  return (
    <>
      <div className="mb-6">
        <div className="max-w-[300px]">
          <AccordionDemo />
        </div>
      </div>
    </>
  )
}
