import { Button } from '@infonomic/uikit'

const variant = ['filled', 'outlined', 'gradient', 'text'] as const
const intent = ['primary', 'secondary', 'noeffect', 'success', 'info', 'warning', 'danger'] as const

function capitalize(str: string): string {
  if (typeof str !== 'string' || str.length === 0) {
    return ''
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export default function ButtonsPage() {
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="w-[800px] mx-auto mb-6">
          {intent.map((i) => {
            return (
              <div key={i} className="grid grid-cols-4 gap-4 mb-6">
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
        <div className="w-[800px] mx-auto mb-6">
          <Button className="w-[600px] border-4 border-white border-solid">
            Tailwind Overrides Without !
          </Button>
        </div>
      </main>
    </div>
  )
}
