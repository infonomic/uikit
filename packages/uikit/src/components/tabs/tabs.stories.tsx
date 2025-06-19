import type React from 'react'

import type { Meta } from '@storybook/react-vite'

import { Button } from '../button/button.js'
import { Tabs as TabsComponent } from './tabs.js'

const meta: Meta = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components',
  component: TabsComponent,
}

export default meta

export const Tabs = (): React.JSX.Element => (
  <div
    style={{
      maxWidth: '700px',
      marginBottom: '24px',
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <TabsComponent style={{ width: '400px', minHeight: '235px' }} defaultValue="detailsTab">
      <TabsComponent.List>
        <TabsComponent.Trigger asChild value="detailsTab">
          <Button size="sm">Details</Button>
        </TabsComponent.Trigger>
        <TabsComponent.Trigger asChild value="rolesTab">
          <Button size="sm">Roles</Button>
        </TabsComponent.Trigger>
      </TabsComponent.List>
      <TabsComponent.Content value="detailsTab" forceMount={true}>
        <p>Details tab content here. Some more text to make this tab content area a bit longer.</p>
        <p>Details tab content here. Some more text to make this tab content area a bit longer.</p>
      </TabsComponent.Content>
      <TabsComponent.Content value="rolesTab">
        <p>Roles tab content here. Some more text to make this tab content area a bit longer.</p>
        <p>Roles tab content here. Some more text to make this tab content area a bit longer.</p>
      </TabsComponent.Content>
    </TabsComponent>
  </div>
)
