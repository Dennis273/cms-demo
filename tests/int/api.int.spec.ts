import { describe, it, expect } from 'vitest'
import {
  getSiteConfig,
  getNavigationConfig,
  getFooterConfig,
  getPlans,
  getDocCategories,
  getDocs,
  isValidLocale,
} from '@/lib/data'

describe('Config Data API', () => {
  it('returns valid site config for each locale', () => {
    const locales = ['zh', 'en', 'ja'] as const
    for (const locale of locales) {
      const config = getSiteConfig(locale)
      expect(config.siteName).toBeDefined()
      expect(config.siteDescription).toBeDefined()
    }
  })

  it('returns navigation items', () => {
    const nav = getNavigationConfig('en')
    expect(nav.items).toBeDefined()
    expect(nav.items.length).toBeGreaterThan(0)
  })

  it('returns footer columns', () => {
    const footer = getFooterConfig('en')
    expect(footer.columns).toBeDefined()
    expect(footer.copyright).toBeDefined()
  })

  it('returns pricing plans', () => {
    const plans = getPlans('en')
    expect(plans.length).toBeGreaterThan(0)
    expect(plans[0].name).toBeDefined()
    expect(plans[0].pricing).toBeDefined()
  })

  it('returns doc categories', () => {
    const categories = getDocCategories('en')
    expect(categories.length).toBeGreaterThan(0)
    expect(categories[0].name).toBeDefined()
    expect(categories[0].slug).toBeDefined()
  })

  it('returns docs', () => {
    const docs = getDocs('en')
    expect(docs.length).toBeGreaterThan(0)
    expect(docs[0].title).toBeDefined()
    expect(docs[0].slug).toBeDefined()
  })

  it('validates locales correctly', () => {
    expect(isValidLocale('en')).toBe(true)
    expect(isValidLocale('zh')).toBe(true)
    expect(isValidLocale('ja')).toBe(true)
    expect(isValidLocale('fr')).toBe(false)
    expect(isValidLocale('')).toBe(false)
  })
})
