import { notFound } from 'next/navigation'
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
      <head>
        <title>{siteSettings?.siteName || 'MeowMail'}</title>
        <meta name="description" content={siteSettings?.siteDescription || ''} />
      </head>
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
