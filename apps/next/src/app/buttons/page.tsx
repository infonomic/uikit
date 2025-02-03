import { Button } from '@infonomic/uikit'

const variant = ['filled', 'outlined', 'gradient', 'text'] as const
const intent = ['primary', 'secondary', 'noeffect', 'success', 'info', 'warning', 'danger'] as const

function capitalize(str: string): string {
  if (typeof str !== 'string' || str.length === 0) {
    return ''
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export default function Buttons() {
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="max-w-[1024px] mx-auto">
          {intent.map((i) => {
            return (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, minmax(0, 1fr)',
                  gap: '32px',
                  marginBottom: '32px'
                }}
              >
                {variant.map((v) => {
                  return (
                    <Button
                      key={`${i}-${v}`}
                      intent={i}
                      variant={v}
                    >{`${capitalize(i)} ${v}`}</Button>
                  )
                })}
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
