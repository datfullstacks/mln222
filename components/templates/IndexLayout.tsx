import { Button } from '../atomic/atoms/Button'
import { Divider } from '../atomic/atoms/Divider'
import { Icon } from '../atomic/atoms/Icon'
import Link from 'next/link'
import type { ReactNode } from 'react'

interface IndexLayoutProps {
  hero: {
    title: string
    subtitle: string
    description: string
  }
  children: ReactNode
}

export function IndexLayout({ hero, children }: IndexLayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-bg-0 via-surface-1 to-bg-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-600/10 via-transparent to-transparent" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="heading-1 mb-4">
            <span className="text-gradient">{hero.title}</span>
          </h1>
          <p className="heading-3 text-text-2 mb-6">{hero.subtitle}</p>
          <p className="body-large text-text-2 max-w-2xl mx-auto mb-8">
            {hero.description}
          </p>
        </div>
      </section>

      <Divider variant="gradient" className="max-w-2xl mx-auto" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {children}
      </div>
    </div>
  )
}
