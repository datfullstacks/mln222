import { Header } from '../atomic/organisms/Header'
import { Footer } from '../atomic/organisms/Footer'
import type { ReactNode } from 'react'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-bg-0">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
