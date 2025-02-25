// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type React from 'react'

import { Select, SelectItem, type SelectValue } from './select.js'

export default {
  title: 'Components/Select',
  component: Select,
  argTypes: {},
}

const values: SelectValue[] = [
  { label: 'One', value: '1' },
  { label: 'Two', value: '2' },
  { label: 'Three', value: '3' },
]

export const Default = (): React.JSX.Element => {
  return (
    <>
      <div className="mb-6">
        <div className="max-w-[400px]">
          <Select placeholder="Select one..." helpText="Select an item.">
            {values.map((value) => (
              <SelectItem key={value.value} value={value.value}>
                {value.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </>
  )
}
