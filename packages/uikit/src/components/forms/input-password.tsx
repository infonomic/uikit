import { useState } from 'react'

import { EyeClosedIcon } from '../../icons/eye-closed-icon.js'
import { EyeOpenIcon } from '../../icons/eye-open-icon.js'
import { Input } from './input'
import type { InputProps } from './input'

export function InputPassword({ ...props }: InputProps) {
  const [visible, setVisible] = useState(false)

  return (
    <Input
      type={visible ? 'text' : 'password'}
      endAdornment={visible ? <EyeOpenIcon width="18px" height="18px" onClick={() => setVisible(!visible)} /> : <EyeClosedIcon width="18px" height="18px" onClick={() => setVisible(!visible)} />}
      {...props}
    />
  )
}
