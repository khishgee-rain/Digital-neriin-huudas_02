'use client'

import { usePathname } from 'next/navigation'
import { AppSidebar } from './AppSidebar'
import Navbar from './Navbar'

export function AppSidebarWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const hideSidebar =
    pathname.startsWith('/auth/login') || pathname.startsWith('/members/')
  const hideNavbar =
    pathname.startsWith('/auth/login') || pathname.startsWith('/members/')

  return (
    <div className="flex flex-1 min-h-0">
      {!hideSidebar && (
        <aside className="w-64 shrink-0 border-r">
          <AppSidebar />
        </aside>
      )}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {!hideNavbar && <Navbar />}
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  )
}
