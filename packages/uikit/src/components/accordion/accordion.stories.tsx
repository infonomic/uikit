// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type React from 'react'

import { ChevronDownIcon } from '@radix-ui/react-icons'
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
        'prose dark:prose-invert p-2 m-1',
        'border rounded bg-canvas-25 dark:border-canvas-800 dark:bg-canvas-900',
        'bg-gradient-to-tr from-canvas-50/10 to-canvas-50/10 dark:from-canvas-800/10 dark:to-canvas-800/10',
        'z-10'
      )}
    >
      <AccordionItem
        value="item-1"
        className={cx(
          'toc-item mb-2',
          'text-lg font-normal text-gray-600 dark:text-gray-400 sm:text-base',
          'm-0 block no-underline ',
          'text-secondary-600 dark:text-secondary-400'
        )}
      >
        <AccordionTrigger
          className={cx(
            'flex items-center text-lg font-normal text-gray-700 transition-all duration-500 ease-in-out dark:text-gray-200 sm:text-base',
            'm-0 block rounded px-2 py-1 no-underline hover:text-white hover:bg-secondary-400 dark:hover:bg-canvas-800'
          )}
        >
          Is it accessible?
          <ChevronDownIcon
            className="ml-auto -rotate-90 text-violet10 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-0"
            aria-hidden
          />
        </AccordionTrigger>
        <AccordionContent>
          <p className="m-0 ml-3">Yes. It adheres to the WAI-ARIA design pattern.</p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="item-2"
        className={cx(
          'toc-item mb-2',
          'text-lg font-normal text-gray-600 dark:text-gray-400 sm:text-base',
          'm-0 block no-underline ',
          'text-secondary-600 dark:text-secondary-400'
        )}
      >
        <AccordionHeader>
          <AccordionTrigger
            className={cx(
              'flex items-center text-lg font-normal text-gray-700 transition-all duration-500 ease-in-out dark:text-gray-200 sm:text-base',
              'm-0 block rounded px-2 py-1 no-underline hover:text-white hover:bg-secondary-400 dark:hover:bg-canvas-800'
            )}
          >
            Is it unstyled?
            <ChevronDownIcon
              className="ml-auto -rotate-90 text-violet10 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-0"
              aria-hidden
            />
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <ul className="list-none m-0 mt-2 ml-[10px] mb-1 p-0 border-l border-canvas-400 dark:border-canvas-600">
            <li className="m-0 mb-2 p-0 pl-[8px]">Submenu Item One</li>
            <li className="m-0 mb-2 p-0 pl-[8px]">Submenu Item Two</li>
            <li className="m-0 mb-2 p-0 pl-[8px]">Submenu Item Three</li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="item-3"
        className={cx(
          'toc-item mb-2',
          'text-lg font-normal text-gray-600 dark:text-gray-400 sm:text-base',
          'm-0 block no-underline ',
          'text-secondary-600 dark:text-secondary-400'
        )}
      >
        <AccordionTrigger
          className={cx(
            'flex items-center text-lg font-normal text-gray-700 transition-all duration-500 ease-in-out dark:text-gray-200 sm:text-base',
            'm-0 block rounded px-2 py-1 no-underline hover:text-white hover:bg-secondary-400 dark:hover:bg-canvas-800'
          )}
        >
          Can it be animated?
          <ChevronDownIcon
            className="ml-auto -rotate-90 text-violet10 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-0"
            aria-hidden
          />
        </AccordionTrigger>
        <AccordionContent>
          <p className="m-0 ml-3"> Yes! You can animate the Accordion with CSS or JavaScript.</p>
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
