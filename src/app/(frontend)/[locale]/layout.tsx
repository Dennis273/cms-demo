import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { getPayload, isValidLocale, Locale } from '@/lib/payload'
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

  const payload = await getPayload()
  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
    locale: locale as Locale,
  })

  const ogImage = typeof siteSettings?.ogImage === 'object' && siteSettings.ogImage?.url
    ? siteSettings.ogImage.url
    : undefined

  return {
    title: {
      default: siteSettings?.siteName || 'MeowMail',
      template: `%s | ${siteSettings?.siteName || 'MeowMail'}`,
    },
    description: siteSettings?.siteDescription || '',
    openGraph: {
      siteName: siteSettings?.siteName || 'MeowMail',
      locale: locale === 'zh' ? 'zh_CN' : locale === 'ja' ? 'ja_JP' : 'en_US',
      type: 'website',
      ...(ogImage && {
        images: [{ url: ogImage, width: 1200, height: 630 }],
      }),
    },
  }
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const payload = await getPayload()

  // Fetch navigation data
  const navigation = await payload.findGlobal({
    slug: 'navigation',
    locale: locale as Locale,
  })

  // Fetch footer data
  const footer = await payload.findGlobal({
    slug: 'footer',
    locale: locale as Locale,
  })

  // Fetch site settings
  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
    locale: locale as Locale,
  })

  const langMap: Record<string, string> = {
    zh: 'zh-CN',
    en: 'en',
    ja: 'ja',
  }

  return (
    <html lang={langMap[locale]}>
      <body>
        <Navigation
          logoText={navigation?.logoText || siteSettings?.siteName || 'MeowMail'}
          items={navigation?.items || []}
          locale={locale}
        />
        <main className="main-content">{children}</main>
        <Footer
          columns={footer?.columns || []}
          socialLinks={footer?.socialLinks || []}
          copyright={footer?.copyright || ''}
          bottomLinks={footer?.bottomLinks || []}
          locale={locale}
        />
      </body>
    </html>
  )
}
