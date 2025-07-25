import { DatePicker } from './datepicker.js'

export default {
  title: 'Widgets/DatePicker',
  component: DatePicker,
  argTypes: {},
}

export const Default = (): React.JSX.Element => {
  const handleDateChange = (value: Date | null): void => {
    console.log('Selected date:', value)
  }

  return (
    <div style={{ maxWidth: '270px', margin: '0 auto' }}>
      <DatePicker
        onDateChange={handleDateChange}
        id="published_on"
        name="published_on"
        variant="outlined"
        helpText="Select published on date."
      />
    </div>
  )
}
