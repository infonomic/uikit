'use client'

import { ProgressBarProvider } from '@/context/progress-bar-provider'

export interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return <ProgressBarProvider>{children}</ProgressBarProvider>
}
