import type { Metadata } from 'next'
import { getPayload, Locale, localeToCurrency, currencySymbols, isValidLocale } from '@/lib/payload'
import { notFound } from 'next/navigation'
import { generateFAQSchema } from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    return {}
  }

  const payload = await getPayload()
  const plansPage = await payload.findGlobal({
    slug: 'plans-page',
    locale: locale as Locale,
  })

  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
    locale: locale as Locale,
  })

  const seo = plansPage?.seo
  const fallbackTitles = { zh: '定价方案', en: 'Pricing Plans', ja: '料金プラン' }
  const title = seo?.metaTitle || plansPage?.title || fallbackTitles[locale as keyof typeof fallbackTitles]
  const description = seo?.metaDescription || plansPage?.subtitle || ''

  const ogImage = typeof seo?.ogImage === 'object' && seo.ogImage?.url
    ? seo.ogImage.url
    : typeof siteSettings?.ogImage === 'object' && siteSettings.ogImage?.url
      ? siteSettings.ogImage.url
      : undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      ...(ogImage && {
        images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
    ...(seo?.noIndex && {
      robots: { index: false, follow: false },
    }),
  }
}

export default async function PlansPage({ params }: PageProps) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const payload = await getPayload()

  // Fetch plans page settings
  const plansPage = await payload.findGlobal({
    slug: 'plans-page',
    locale: locale as Locale,
  })

  const { docs: plans } = await payload.find({
    collection: 'plans',
    locale: locale as Locale,
    sort: 'order',
  })

  const currency = localeToCurrency[locale]
  const currencySymbol = currencySymbols[currency]

  // Generate FAQ Schema JSON-LD
  const faqSchema = generateFAQSchema(plansPage?.seo?.faq as Array<{ question: string; answer: string }> | null)

  const t = {
    zh: {
      title: '定价方案',
      subtitle: '选择最适合您团队的方案',
      perMonth: '/月',
      perYear: '/年',
      yearly: '年付',
      monthly: '月付',
      users: '用户',
      storage: 'GB 存储',
      recommended: '推荐',
      features: '功能特性',
      included: '✓',
      notIncluded: '✗',
      getStarted: '立即开始',
      contactSales: '联系销售',
    },
    en: {
      title: 'Pricing Plans',
      subtitle: 'Choose the perfect plan for your team',
      perMonth: '/month',
      perYear: '/year',
      yearly: 'Yearly',
      monthly: 'Monthly',
      users: 'users',
      storage: 'GB storage',
      recommended: 'Recommended',
      features: 'Features',
      included: '✓',
      notIncluded: '✗',
      getStarted: 'Get Started',
      contactSales: 'Contact Sales',
    },
    ja: {
      title: '料金プラン',
      subtitle: 'チームに最適なプランをお選びください',
      perMonth: '/月',
      perYear: '/年',
      yearly: '年払い',
      monthly: '月払い',
      users: 'ユーザー',
      storage: 'GB ストレージ',
      recommended: 'おすすめ',
      features: '機能',
      included: '✓',
      notIncluded: '✗',
      getStarted: '始める',
      contactSales: 'お問い合わせ',
    },
  }[locale]

  return (
    <div className="plans-page">
      {/* FAQ Schema JSON-LD */}
      <JsonLd data={faqSchema} />

      <div className="container">
        <header className="page-header">
          <h1>{plansPage?.title || t.title}</h1>
          <p>{plansPage?.subtitle || t.subtitle}</p>
        </header>

        <div className="plans-grid full">
          {plans.map((plan: any) => {
            const price = plan.pricing?.[currency]
            return (
              <div
                key={plan.id}
                className={`plan-card detailed ${plan.isRecommended ? 'recommended' : ''}`}
              >
                {plan.isRecommended && <span className="recommended-badge">{t.recommended}</span>}

                <div className="plan-header">
                  <h2>{plan.name}</h2>
                  <p className="plan-description">{plan.description}</p>
                </div>

                <div className="plan-pricing">
                  <div className="price-row">
                    <span className="price-label">{t.monthly}</span>
                    <span className="price">
                      {currencySymbol}
                      {price?.monthly}
                      <span className="period">{t.perMonth}</span>
                    </span>
                  </div>
                  <div className="price-row yearly">
                    <span className="price-label">{t.yearly}</span>
                    <span className="price">
                      {currencySymbol}
                      {price?.yearly}
                      <span className="period">{t.perYear}</span>
                    </span>
                  </div>
                </div>

                <div className="plan-limits">
                  <div className="limit-item">
                    <span className="limit-value">{plan.limits?.users}</span>
                    <span className="limit-label">{t.users}</span>
                  </div>
                  <div className="limit-item">
                    <span className="limit-value">{plan.limits?.storage}</span>
                    <span className="limit-label">{t.storage}</span>
                  </div>
                </div>

                {plan.features && plan.features.length > 0 && (
                  <div className="plan-features">
                    <h4>{t.features}</h4>
                    <ul>
                      {plan.features.map((feature: any, index: number) => (
                        <li key={index} className={feature.included ? 'included' : 'not-included'}>
                          <span className="feature-status">
                            {feature.included ? t.included : t.notIncluded}
                          </span>
                          {feature.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button className="btn btn-primary plan-cta">{t.getStarted}</button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
