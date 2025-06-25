// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type React from 'react'

import type { RadioGroupValue } from './radio-group.js'
import { RadioGroup, RadioGroupItem } from './radio-group.js'

export default {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  argTypes: {},
}

const values1: RadioGroupValue[] = [
  { id: 'rg1', label: 'One', value: '1' },
  { id: 'rg2', label: 'Two', value: '2' },
  { id: 'rg3', label: 'Three', value: '3' },
]

const values2: RadioGroupValue[] = [
  { id: 'rg4', label: 'One', value: '1' },
  { id: 'rg5', label: 'Two', value: '2' },
  { id: 'rg6', label: 'Three', value: '3' },
]

const values3: RadioGroupValue[] = [
  { id: 'rg4', label: 'One', value: '1' },
  { id: 'rg5', label: 'Two', value: '2' },
  { id: 'rg6', label: 'Three', value: '3' },
]

export const Default = (): React.JSX.Element => {
  return (
    <>
      <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <RadioGroup direction="row">
          {values1.map((value) => (
            <RadioGroupItem key={value.id} value={value.value} id={value.id} label={value.label} />
          ))}
        </RadioGroup>
      </div>
      <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <RadioGroup direction="row">
          {values2.map((value) => (
            <RadioGroupItem
              intent="secondary"
              key={value.id}
              value={value.value}
              id={value.id}
              label={value.label}
            />
          ))}
        </RadioGroup>
      </div>
      <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <RadioGroup direction="column">
          {values3.map((value) => (
            <RadioGroupItem
              intent="success"
              key={value.id}
              value={value.value}
              id={value.id}
              label={value.label}
            />
          ))}
        </RadioGroup>
      </div>
    </>
  )
}
