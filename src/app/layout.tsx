import { ReactNode } from 'react'
import { AppSidebarWrapper } from './AppSidebarWrapper'
import './globals.css'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col h-full">
        <AppSidebarWrapper>
          <div className="min-h-0 overflow-y-auto w-full">
            {children}
          </div>
        </AppSidebarWrapper>
      </body>
    </html>
  )
}
