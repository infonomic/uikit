import { DatePicker } from './datepicker.js'

export default {
  title: 'Widgets/DatePicker',
  component: DatePicker,
  argTypes: {},
}

export const Default = (): React.JSX.Element => {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <DatePicker
        id="published_on"
        name="published_on"
        variant="outlined"
        helpText="Select published on date."
      />
    </div>
  )
}
