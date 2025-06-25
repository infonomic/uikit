// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type React from 'react'

import type { RadioGroupValue } from './radio-group.js'
import { RadioGroup, RadioGroupItem } from './radio-group.js'

export default {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  argTypes: {},
}

const values: RadioGroupValue[] = [
  { id: 'rg1', label: 'One', value: '1' },
  { id: 'rg2', label: 'Two', value: '2' },
  { id: 'rg3', label: 'Three', value: '3' },
]

export const Default = (): React.JSX.Element => {
  return (
    <>
      <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <RadioGroup>
          {values.map((value) => (
            <RadioGroupItem key={value.id} value={value.value} id={value.id} label={value.label} />
          ))}
        </RadioGroup>
      </div>
    </>
  )
}
