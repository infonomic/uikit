'use client'

import type { News, Story } from 'payload-types'
import type React from 'react'
import { createContext, useContext, useMemo } from 'react'

interface ContextType {
  recentNews: News[] | null
  recentStories: Story[] | null
  featuredStories: Story[] | null
}
const Context = createContext<ContextType | undefined>(undefined)

interface SharedContentProviderProps {
  recentNews: News[] | null
  recentStories: Story[] | null
  featuredStories: Story[] | null
  children: React.ReactNode
}

function SharedContentProvider({
  children,
  recentNews,
  recentStories,
  featuredStories,
}: SharedContentProviderProps): React.JSX.Element {
  const contextValue = useMemo(() => {
    return { recentNews, recentStories, featuredStories }
  }, [recentNews, recentStories, featuredStories])

  return <Context value={contextValue}>{children}</Context>
}

// Hook helper
function useSharedContentContext(): ContextType {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error('useSharedContentContext must be used within a SharedContentProvider')
  }
  return context
}

export { SharedContentProvider, useSharedContentContext }
