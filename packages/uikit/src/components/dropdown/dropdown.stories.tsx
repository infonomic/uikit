import type { Meta, StoryObj } from '@storybook/react'

import cx from 'classnames'

import { SignOutIcon } from '../../icons/sign-out-icon.js'
import { UserIcon } from '../../icons/user-icon.js'
import { Button } from '../button/button.js'
import { Dropdown as DropdownComponent } from './dropdown.js'

const meta: Meta = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/Dropdown',
  component: DropdownComponent.Root,
}

export default meta

type Story = StoryObj<typeof DropdownComponent.Root>

export const Dropdown: Story = {
  args: {
    modal: false,
  },
  render: (args) => {
    return (
      <div
        style={{
          maxWidth: '400px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <DropdownComponent.Root {...args}>
          <DropdownComponent.Trigger asChild>
            <Button size="sm" variant="filled">
              +
            </Button>
          </DropdownComponent.Trigger>

          <DropdownComponent.Portal>
            <DropdownComponent.Content align="end" sideOffset={10}>
              <DropdownComponent.Item>
                <div className="flex items-center">
                  <span className="inline-block w-[28px]">
                    <UserIcon width="22px" height="22px" />
                  </span>
                  <span className="text-left inline-block leading-none w-full flex-1 text-black dark:text-gray-300">
                    Account
                  </span>
                </div>
              </DropdownComponent.Item>
              <DropdownComponent.Item>
                <div className="flex items-center">
                  <span className="inline-block w-[28px]" />
                  <span className="text-left inline-block leading-none w-full flex-1 text-black dark:text-gray-300">
                    Menu Item 2
                  </span>
                </div>
              </DropdownComponent.Item>
              <DropdownComponent.Separator className="my-1 border-t border-t-gray-300 dark:border-t-gray-700 w-[90%] mx-auto" />
              <DropdownComponent.Item>
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
              </DropdownComponent.Item>
            </DropdownComponent.Content>
          </DropdownComponent.Portal>
        </DropdownComponent.Root>
      </div>
    )
  },
}
