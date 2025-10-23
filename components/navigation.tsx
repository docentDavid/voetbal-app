'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const navItems = [
  { href: '/speeldagen', label: 'Speeldagen', icon: '⚽' },
  { href: '/info', label: 'Info', icon: 'ℹ️' },
  { href: '/profiel', label: 'Profiel', icon: '👤' },
]

const adminItems = [
  { href: '/admin/geschiedenis', label: 'Geschiedenis' },
  { href: '/admin/statistieken', label: 'Statistieken' },
]

export function TopNav() {
  const pathname = usePathname()

  return (
    <nav className="hidden lg:block border-b border-border bg-card">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/speeldagen" className="text-2xl font-bold text-primary">
            Voetbal App
          </Link>

          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-base font-medium transition-colors hover:text-primary ${
                  pathname === item.href ? 'text-primary' : 'text-foreground/70'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="h-6 w-px bg-border" />
            {adminItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href ? 'text-primary' : 'text-foreground/60'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              pathname === item.href ? 'text-primary' : 'text-foreground/60'
            }`}
          >
            <span className="text-2xl mb-1">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
