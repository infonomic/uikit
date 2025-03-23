// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { EventPager } from './event-pager.js'

const meta: Meta<typeof EventPager> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/Pager',
  component: EventPager,
}

export default meta

const Pagers = (): React.JSX.Element => {
  const [page, setPage] = React.useState(1)

  const handlePageChange = (event: any, number: number): void => {
    setPage(number)
  }

  return (
    <>
      <div className="mb-6 max-w-[600px]">
        <p className="prose dark:prose-invert">Stateful Pagers: Current page: {page}</p>
        <EventPager
          className="py-4"
          page={page}
          count={24}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
          componentName="pager1"
          aria-label="Pager 1"
        />
        <EventPager
          page={page}
          count={24}
          onChange={handlePageChange}
          componentName="pager2"
          aria-label="Pager 2"
        />
        <EventPager
          className="py-4"
          page={page}
          count={24}
          onChange={handlePageChange}
          componentName="pager3"
          hideNextButton
          hidePrevButton
          aria-label="Pager 3"
        />
      </div>
    </>
  )
}

type Story = StoryObj<typeof EventPager>

export const Default: Story = {
  render: () => <Pagers />,
}
