// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type React from 'react'
import { useState } from 'react'

import { CheckboxGroup } from './checkbox-group.js'


export default {
  title: 'Components/Inputs/CheckboxGroup',
  component: CheckboxGroup,
  argTypes: {},
}

export const Default = (): React.JSX.Element => {
  const [checked, setChecked] = useState(false)

  const handleOnClick = (): void => {
    console.log('clicked')
    setChecked(!checked)
  }

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto 2rem' }}>
      <h2 className="text-xl" style={{ marginBottom: '1rem' }}>
        Checkbox Group
      </h2>
      <div className="grid gap-4 grid-cols-3">
        <div className="control">
          <CheckboxGroup
            groupName="roles"
            // TODO: Nullability of role.name
            checkBoxes={[
              { id: 'admin', label: 'Admin' },
              { id: 'editor', label: 'Editor' },
              { id: 'viewer', label: 'Viewer' },
            ]}
          // onChange={(selected) => {
          //   handleOnClick(selected)
          // }}
          />
        </div>
      </div>
    </div>
  )
}


