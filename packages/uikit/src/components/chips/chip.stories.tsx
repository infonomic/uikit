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
            <Chip intent={i} variant="selectable" selected>
              {capitalize(i)} selectable
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
            <Chip variant={variant} selected={true} intent="success">{`${capitalize(variant)} with icon`}</Chip>
            {(variant === 'removable' || variant === 'selectable-removable') && (
              <Chip variant={variant} intent="info" onRemove={() => {}}>
                {`${capitalize(variant)} with remove`}
              </Chip>
            )}
          </Row>
        ))}
      </div>
    </div>
  ),
}

export const SelectableControlled: Story = {
  render: () => {
    const [selected, setSelected] = useState(false)
    return (
      <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
        <Row>
          <Chip
            variant="selectable"
            intent="primary"
            selected={selected}
            onToggle={(next: boolean) => setSelected(next)}
            startIcon={<CheckIcon />}
          >
            Toggle me
          </Chip>
        </Row>
      </div>
    )
  },
}

export const Removable: Story = {
  render: () => (
     <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <Row>
        <Chip
          variant="removable"
          intent="noeffect"
          startIcon={<CheckIcon />}
          onRemove={() => {}}
        >
          Removable chip
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
