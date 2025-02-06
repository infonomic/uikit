// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

import { type Meta, type StoryObj } from '@storybook/react'
import { capitalize } from '../../utils/capitalize.js'

import { Button } from './button.js'
import { variant } from './types/button.js'
import { size } from '../types/shared.js'

type Story = StoryObj<typeof Button>

const AllVariants = (): React.JSX.Element => {
  return (
    <>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {variant.map((variant: any) => {
          return (
            <div
              key={variant}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, minmax(0, 1fr)',
                gap: '32px',
                marginBottom: '32px'
              }}
            >
              {size.map((size: any) => {
                return (
                  <Button key={`${variant}=${size}`} size={size} variant={variant}>
                    {`${capitalize(variant)} ${size.toUpperCase()}`}
                  </Button>
                )
              })}
              <Button key={`${variant}=${size}`} disabled variant={variant}>
                {`${capitalize(variant)} Disabled`}
              </Button>
            </div>
          )
        })}
      </div>
    </>
  )
}

export const Variants: Story = {
  render: () => <AllVariants />
}

const meta: Meta<typeof Button> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/Button',
  component: Button
}

export default meta
