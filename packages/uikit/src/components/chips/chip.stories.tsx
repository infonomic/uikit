import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { capitalize } from '../../utils/capitalize.js'
import { intent, size } from '../@types/shared.js'
import { CheckIcon } from '../../icons/check-icon.js'
import { Chip } from './chip.js'
import { chipVariant } from './@types/chip.js'

type Story = StoryObj<typeof Chip>

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>{children}</div>
)

export const Intents: Story = {
  render: () => (
     <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {intent.map((i) => (
          <Row key={i}>
            <Chip intent={i}>{capitalize(i)} chip</Chip>
            <Chip intent={i} variant="filter" selected>
              {capitalize(i)} filter
            </Chip>
          </Row>
        ))}
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
     <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <Row>
        {size.map((s) => (
          <Chip key={s} size={s} startIcon={<CheckIcon />}>{`Size ${s}`}</Chip>
        ))}
      </Row>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {chipVariant.map((variant) => (
          <Row key={variant}>
            <Chip variant={variant}>{capitalize(variant)} chip</Chip>
            <Chip variant={variant} intent="success" startIcon={<CheckIcon />}>{`${capitalize(variant)} with icon`}</Chip>
            <Chip variant={variant} intent="info" removable onRemove={() => {}}>
              {`${capitalize(variant)} removable`}
            </Chip>
          </Row>
        ))}
      </div>
    </div>
  ),
}

export const FilterSelectable: Story = {
  render: () => {
    const [selected, setSelected] = useState(false)
    return (
      <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
        <Row>
          <Chip
            variant="filter"
            intent="primary"
            selected={selected}
            onToggle={(next) => setSelected(next)}
            startIcon={<CheckIcon />}
          >
            Toggle me
          </Chip>
        </Row>
      </div>
    )
  },
}

export const InputRemovable: Story = {
  render: () => (
     <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <Row>
        <Chip
          variant="input"
          intent="noeffect"
          startIcon={<CheckIcon />}
          removable
          onRemove={() => {}}
        >
          Removable input chip
        </Chip>
      </Row>
    </div>
  ),
}

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
}

export default meta
