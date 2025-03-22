// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type React from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import cx from 'classnames'

import { SignOutIcon } from '../icons/sign-out-icon.js'
import { UserIcon } from '../icons/user-icon.js'
import { Button } from './button/button.js'
import { Dropdown } from './dropdown.js'

const meta: Meta<typeof Dropdown> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/Dropdown',
}

export default meta

type Story = StoryObj<typeof Dropdown>

const Demo = (): React.JSX.Element => {
  const menuItemClasses = cx(
    'flex gap-1 w-full rounded px-[2px] py-[5px] md:text-sm',
    'hover:bg-canvas-50/30 dark:hover:bg-canvas-900',
    'cursor-default select-none items-center outline-none',
    'text-gray-600 focus:bg-canvas-50/30 dark:text-gray-300 dark:focus:bg-canvas-900'
  )

  return (
    <>
      <div className="mb-6 p-6 max-w-[600px] flex flex-col gap-12 items-center justify-center">
        <Dropdown.Root modal={false}>
          <Dropdown.Trigger asChild>
            <Button
              size="sm"
              variant="filled"
              className="p-0 mt-1 min-w-[32px] min-h-[32px] border"
            >
              +
            </Button>
          </Dropdown.Trigger>

          <Dropdown.Portal>
            <Dropdown.Content
              align="end"
              sideOffset={10}
              className={cx(
                'z-40 rounded radix-side-bottom:animate-slide-down radix-side-top:animate-slide-up',
                'w-[160px] px-1.5 py-1 shadow-md',
                'bg-white dark:bg-canvas-800 border dark:border-canvas-700 shadow'
              )}
            >
              <Dropdown.Item className={menuItemClasses}>
                <div className="flex items-center">
                  <span className="inline-block w-[28px]">
                    <UserIcon width="22px" height="22px" />
                  </span>
                  <span className="text-left inline-block leading-none w-full flex-1 text-black dark:text-gray-300">
                    Account
                  </span>
                </div>
              </Dropdown.Item>
              <Dropdown.Item className={menuItemClasses}>
                <div className="flex items-center">
                  <span className="inline-block w-[28px]" />
                  <span className="text-left inline-block leading-none w-full flex-1 text-black dark:text-gray-300">
                    Menu Item 2
                  </span>
                </div>
              </Dropdown.Item>
              <Dropdown.Separator className="my-1 border-t border-t-gray-300 dark:border-t-gray-700 w-[90%] mx-auto" />
              <Dropdown.Item className={menuItemClasses}>
                <div className="flex items-center">
                  <span className="inline-block w-[28px]">
                    <SignOutIcon />
                  </span>

                  <button
                    type="button"
                    className="text-left inline-block w-full flex-1 leading-none text-black dark:text-gray-300"
                  >
                    Sign Out
                  </button>
                </div>
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Portal>
        </Dropdown.Root>
      </div>
    </>
  )
}

export const All: Story = {
  render: () => <Demo />,
}
