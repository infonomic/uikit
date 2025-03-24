'use client'

import type React from 'react'

import { Avatar as AvatarPrimitive } from 'radix-ui'

import styles from './avatar.module.css'

const url = 'https://picsum.photos/150'

export const Avatar = (): React.JSX.Element => {
  return (
    <AvatarPrimitive.Root className={styles['avatar-root']}>
      <AvatarPrimitive.Image src={url} alt="Avatar" className={styles['avatar-image']} />
      <AvatarPrimitive.Fallback className={styles['avatar-fallback']} delayMs={600}>
        <span className={styles['avatar-text']}>AB</span>
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
}
