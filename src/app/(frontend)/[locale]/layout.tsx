import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import {
  getSiteConfig,
  getNavigationConfig,
  getFooterConfig,
  isValidLocale,
} from '@/lib/data'
import type { Locale } from '@/config/types'
import '../styles.css'

export async function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }, { locale: 'ja' }]
}

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

// Generate metadata at the layout level for defaults
export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    return {}
  }

  const siteSettings = getSiteConfig(locale as Locale)

  return {
    title: {
      default: siteSettings.siteName,
      template: `%s | ${siteSettings.siteName}`,
    },
    description: siteSettings.siteDescription,
    openGraph: {
      siteName: siteSettings.siteName,
      locale: locale === 'zh' ? 'zh_CN' : locale === 'ja' ? 'ja_JP' : 'en_US',
      type: 'website',
      ...(siteSettings.ogImage && {
        images: [{ url: siteSettings.ogImage, width: 1200, height: 630 }],
      }),
    },
  }
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const navigation = getNavigationConfig(locale as Locale)
  const footer = getFooterConfig(locale as Locale)
  const siteSettings = getSiteConfig(locale as Locale)

  const langMap: Record<string, string> = {
    zh: 'zh-CN',
    en: 'en',
    ja: 'ja',
  }

  return (
    <html lang={langMap[locale]}>
      <body>
        <Navigation
          logoText={navigation.logoText || siteSettings.siteName}
          items={navigation.items}
          locale={locale}
        />
        <main className="main-content">{children}</main>
        <Footer
          columns={footer.columns}
          socialLinks={footer.socialLinks}
          copyright={footer.copyright}
          bottomLinks={footer.bottomLinks}
          locale={locale}
        />
      </body>
    </html>
  )
}
