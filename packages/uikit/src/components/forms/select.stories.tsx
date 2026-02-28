// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type React from 'react'

import { Select, SelectItem, type SelectValue } from './select.js'

export default {
  title: 'Components/Forms/Select',
  component: Select,
  argTypes: {},
}

const values: SelectValue[] = [
  { label: 'One', value: '1' },
  { label: 'Two', value: '2' },
  { label: 'Three', value: '3' },
  { label: 'Four', value: '4' },
  { label: 'Five', value: '5' },
]

export const Default = (): React.JSX.Element => {
  return (
    <>
      <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <Select size="xl" placeholder="Select one..." helpText="Extra Large select.">
          {values.map((value) => (
            <SelectItem key={value.value} value={value.value}>
              {value.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <Select size="lg" placeholder="Select one..." helpText="Large select.">
          {values.map((value) => (
            <SelectItem key={value.value} value={value.value}>
              {value.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <Select size="md" placeholder="Select one..." helpText="Medium select.">
          {values.map((value) => (
            <SelectItem key={value.value} value={value.value}>
              {value.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <Select size="sm" placeholder="Select one..." helpText="Small select.">
          {values.map((value) => (
            <SelectItem key={value.value} value={value.value}>
              {value.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <Select size="xs" placeholder="Select one..." helpText="Extra small select.">
          {values.map((value) => (
            <SelectItem key={value.value} value={value.value}>
              {value.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </>
  )
}
