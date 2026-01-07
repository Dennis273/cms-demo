'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Locale, locales } from '@/lib/i18n'

interface SubNavItem {
  label: string
  link: string
  openInNewTab?: boolean | null
  id?: string | null
}

interface NavItem {
  label: string
  link?: string | null
  openInNewTab?: boolean | null
  highlight?: boolean | null
  children?: SubNavItem[] | null
  id?: string | null
}

interface NavigationProps {
  logoText?: string | null
  items?: NavItem[] | null
  locale: Locale
}

export function Navigation({ logoText, items, locale }: NavigationProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
    return segments.join('/')
  }

  const getLocalizedHref = (link: string) => {
    return link.startsWith('/') ? `/${locale}${link}` : link
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <nav className="navigation">
        <div className="nav-container">
          <Link href={`/${locale}`} className="nav-logo">
            {logoText || 'MeowMail'}
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-items">
            {items?.map((item, index) => {
              const hasChildren = item.children && item.children.length > 0

              if (hasChildren) {
                return (
                  <div key={index} className="nav-dropdown">
                    <span className="nav-item nav-item-parent">
                      {item.label}
                      <svg
                        className="dropdown-arrow"
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1L5 5L9 1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <div className="nav-dropdown-menu">
                      {item.children?.map((child, childIndex) => (
                        <Link
                          key={childIndex}
                          href={getLocalizedHref(child.link)}
                          target={child.openInNewTab ? '_blank' : undefined}
                          rel={child.openInNewTab ? 'noopener noreferrer' : undefined}
                          className="nav-dropdown-item"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              }

              return (
                <Link
                  key={index}
                  href={item.link ? getLocalizedHref(item.link) : '#'}
                  target={item.openInNewTab ? '_blank' : undefined}
                  rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                  className={`nav-item ${item.highlight ? 'nav-item-highlight' : ''}`}
                >
                  {item.label}
                </Link>
              )
            })}

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

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-content">
          {items?.map((item, index) => {
            const hasChildren = item.children && item.children.length > 0

            if (hasChildren) {
              return (
                <div key={index} className="mobile-nav-group">
                  <span className="mobile-nav-label">{item.label}</span>
                  <div className="mobile-nav-children">
                    {item.children?.map((child, childIndex) => (
                      <Link
                        key={childIndex}
                        href={getLocalizedHref(child.link)}
                        target={child.openInNewTab ? '_blank' : undefined}
                        rel={child.openInNewTab ? 'noopener noreferrer' : undefined}
                        className="mobile-nav-item"
                        onClick={closeMobileMenu}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            }

            return (
              <Link
                key={index}
                href={item.link ? getLocalizedHref(item.link) : '#'}
                target={item.openInNewTab ? '_blank' : undefined}
                rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                className={`mobile-nav-item ${item.highlight ? 'mobile-nav-highlight' : ''}`}
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            )
          })}

          <div className="mobile-locale-switcher">
            {locales.map((loc) => (
              <Link
                key={loc}
                href={switchLocale(loc)}
                className={`mobile-locale-option ${loc === locale ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                {loc.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-nav-overlay" onClick={closeMobileMenu} />
      )}
    </>
  )
}
