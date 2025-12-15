'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { NavItem } from '../molecules/NavItem'
import { Button } from '../atoms/Button'
import { Icon } from '../atoms/Icon'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Game', href: '/game' },
  { label: 'AI Usage', href: '/ai-usage' },
  { label: 'About Us', href: '/about' },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check localStorage or system preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDark(prefersDark)
      document.documentElement.classList.toggle('dark', prefersDark)
    }
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    document.documentElement.classList.toggle('dark', newIsDark)
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light')
  }

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-gradient">
              Pythagoras
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link href="/search">
              <Button variant="ghost" size="sm" aria-label="Tìm kiếm">
                <Icon name="search" size="sm" />
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              aria-label="Chuyển theme"
            >
              {mounted ? (
                <Icon name={isDark ? 'sun' : 'moon'} size="sm" />
              ) : (
                <Icon name="sun" size="sm" />
              )}
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              <Icon name={isMobileMenuOpen ? 'x' : 'menu'} size="sm" />
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <NavItem key={item.href} {...item} className="w-full" />
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
