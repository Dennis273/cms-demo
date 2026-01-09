import type { Metadata } from 'next'
import {
  getPlansPageConfig,
  getPlans,
  isValidLocale,
  localeToCurrency,
  currencySymbols,
} from '@/lib/data'
import type { Locale } from '@/config/types'
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

  const plansPage = getPlansPageConfig(locale as Locale)
  const seo = plansPage.seo

  return {
    title: seo?.metaTitle || plansPage.title,
    description: seo?.metaDescription || plansPage.subtitle,
    openGraph: {
      title: seo?.metaTitle || plansPage.title,
      description: seo?.metaDescription || plansPage.subtitle,
      type: 'website',
      ...(seo?.ogImage && {
        images: [{ url: seo.ogImage, width: 1200, height: 630, alt: plansPage.title }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.metaTitle || plansPage.title,
      description: seo?.metaDescription || plansPage.subtitle,
      ...(seo?.ogImage && { images: [seo.ogImage] }),
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

  const plansPage = getPlansPageConfig(locale as Locale)
  const plans = getPlans(locale as Locale)

  const currency = localeToCurrency[locale as Locale]
  const currencySymbol = currencySymbols[currency]

  // Generate FAQ Schema JSON-LD
  const faqSchema = generateFAQSchema(plansPage.seo?.faq || null)

  const t = {
    zh: {
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
    },
    en: {
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
    },
    ja: {
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
    },
  }[locale as Locale]

  return (
    <div className="plans-page">
      {/* FAQ Schema JSON-LD */}
      <JsonLd data={faqSchema} />

      <div className="container">
        <header className="page-header">
          <h1>{plansPage.title}</h1>
          <p>{plansPage.subtitle}</p>
        </header>

        <div className="plans-grid full">
          {plans.map((plan) => {
            const price = plan.pricing[currency as keyof typeof plan.pricing]
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
                      {plan.features.map((feature, index) => (
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
