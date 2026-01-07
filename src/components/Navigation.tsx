'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Locale, locales } from '@/lib/i18n'

interface NavItem {
  label: string
  link: string
  openInNewTab?: boolean | null
  highlight?: boolean | null
  id?: string | null
}

interface NavigationProps {
  logoText?: string | null
  items?: NavItem[] | null
  locale: Locale
}

export function Navigation({ logoText, items, locale }: NavigationProps) {
  const pathname = usePathname()

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
    return segments.join('/')
  }

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link href={`/${locale}`} className="nav-logo">
          {logoText || 'MeowMail'}
        </Link>

        <div className="nav-items">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.link.startsWith('/') ? `/${locale}${item.link}` : item.link}
              target={item.openInNewTab ? '_blank' : undefined}
              rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
              className={`nav-item ${item.highlight ? 'nav-item-highlight' : ''}`}
            >
              {item.label}
            </Link>
          ))}

          <div className="locale-switcher">
            {locales.map((loc) => (
              <Link
                key={loc}
                href={switchLocale(loc)}
                className={`locale-option ${loc === locale ? 'active' : ''}`}
              >
                {loc.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
