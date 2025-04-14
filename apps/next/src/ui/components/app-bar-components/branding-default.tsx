import cx from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import type React from 'react'

export function BrandingDefault({
  hasScrolled,
  pathName,
}: {
  hasScrolled: boolean
  pathName: string
}): React.JSX.Element {
  const brandingBackground =
    hasScrolled || pathName.length > 3 ? 'bg-white dark:bg-canvas-800' : 'bg-transparent'

  return (
    <div
      className={cx(
        'branding flex items-center pl-2 sm:pl-6 pr-8 sm:pr-0 transition-colors duration-300',
        brandingBackground
      )}
    >
      <div className="w-[150px] sm:w-[150px]">
        <Link prefetch={false} href="/">
          Logo here...
        </Link>
      </div>
    </div>
  )
}
