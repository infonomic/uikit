import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { AppBar } from '@/ui/components/app-bar.tsx'
import { SiteFooter } from '@/ui/components/site-footer.tsx'
import { ThemeProvider } from '@/ui/theme/provider'
import { Theme } from '@/ui/theme/utils'

import '@/ui/styles/global.css'

import { ScrollToTop } from '@infonomic/uikit/react'

export const Route = createRootRoute({
  component: () => {
    return (
      <ThemeProvider force={Theme.DARK}>
        <div className="layout-container flex flex-col w-full max-w-full min-h-screen h-full selection:text-white selection:bg-primary-400">
          <AppBar lng="en" />
          <main id="main-content" className="flex flex-1 flex-col pt-[38px]">
            <Outlet />
          </main>
          <SiteFooter />
          <ScrollToTop />
        </div>
        <TanStackRouterDevtools />
      </ThemeProvider>
    )
  },
})
