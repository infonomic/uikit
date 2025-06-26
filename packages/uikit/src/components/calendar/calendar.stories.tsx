import type { Meta } from '@storybook/react-vite'
import { useRef, useState } from 'react'
import { Calendar as CalendarComponent } from './calendar.js'

const meta: Meta<typeof CalendarComponent> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/Calendar',
  component: CalendarComponent,
}

export default meta

export const Calendar = (): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const [time, setTime] = useState<string>('05:00')
  const [date, setDate] = useState<Date | undefined>(new Date())

  const calendarRef = useRef<HTMLDivElement | null>(null)

  return (
    <div ref={calendarRef} style={{ height: '100vh' }}>
      <CalendarComponent
        required
        mode="single"
        captionLayout="dropdown"
        selected={date}
        onSelect={(selectedDate: Date) => {
          if (selectedDate) {
            const [hours, minutes] = time.split(':')
            selectedDate.setHours(Number.parseInt(hours), Number.parseInt(minutes))
            setDate(selectedDate)
          }
        }}
        onDayClick={() => setIsOpen(false)}
        // fromYear={2000}
        // toYear={new Date().getFullYear()}
        // disabled={(date: Date) =>
        //   Number(date) < Date.now() - 1000 * 60 * 60 * 24 ||
        //   Number(date) > Date.now() + 1000 * 60 * 60 * 24 * 30
        // }
      />
    </div>
  )
}
