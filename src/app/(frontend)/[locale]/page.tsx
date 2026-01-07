import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getPayload, Locale, localeToCurrency, currencySymbols, isValidLocale } from '@/lib/payload'
import { notFound } from 'next/navigation'
import { generateFAQSchema } from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'
import { ScrollAnimator, StaggerContainer } from '@/components/ScrollAnimator'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    return {}
  }

  const payload = await getPayload()
  const homePage = await payload.findGlobal({
    slug: 'home-page',
    locale: locale as Locale,
  })

  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
    locale: locale as Locale,
  })

  const seo = homePage?.seo
  const title = seo?.metaTitle || homePage?.hero?.title || siteSettings?.siteName || 'MeowMail'
  const description = seo?.metaDescription || siteSettings?.siteDescription || ''

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

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const payload = await getPayload()

  // Fetch home page data
  const homePage = await payload.findGlobal({
    slug: 'home-page',
    locale: locale as Locale,
  })

  // Fetch plans for preview
  const { docs: plans } = await payload.find({
    collection: 'plans',
    locale: locale as Locale,
    sort: 'order',
    limit: 3,
  })

  // Fetch testimonials
  const { docs: testimonials } = await payload.find({
    collection: 'testimonials',
    locale: locale as Locale,
    sort: 'order',
    limit: 3,
  })

  const currency = localeToCurrency[locale]
  const currencySymbol = currencySymbols[currency]

  const t = {
    zh: {
      plansTitle: '选择适合您的方案',
      viewAllPlans: '查看所有方案',
      perMonth: '/月',
      perYear: '/年',
      users: '用户',
      storage: 'GB 存储',
      recommended: '推荐',
      testimonialsTitle: '用户评价',
      trustedBy: '已有众多企业信赖',
      learnMore: '进一步了解',
    },
    en: {
      plansTitle: 'Choose Your Plan',
      viewAllPlans: 'View All Plans',
      perMonth: '/mo',
      perYear: '/yr',
      users: 'users',
      storage: 'GB storage',
      recommended: 'Recommended',
      testimonialsTitle: 'What Our Customers Say',
      trustedBy: 'Trusted by leading companies worldwide',
      learnMore: 'Learn more',
    },
    ja: {
      plansTitle: 'プランを選択',
      viewAllPlans: 'すべてのプランを見る',
      perMonth: '/月',
      perYear: '/年',
      users: 'ユーザー',
      storage: 'GB ストレージ',
      recommended: 'おすすめ',
      testimonialsTitle: 'お客様の声',
      trustedBy: '世界中の企業から信頼',
      learnMore: '詳しく見る',
    },
  }[locale]

  // Generate FAQ Schema JSON-LD
  const faqSchema = generateFAQSchema(homePage?.seo?.faq as Array<{ question: string; answer: string }> | null)

  return (
    <div className="home-page">
      {/* FAQ Schema JSON-LD */}
      <JsonLd data={faqSchema} />

      {/* Hero Section */}
      <section className="hero">
        {homePage?.hero?.backgroundImage && typeof homePage.hero.backgroundImage === 'object' && (
          <div className="hero-bg">
            <Image
              src={homePage.hero.backgroundImage.url || ''}
              alt=""
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        )}
        <div className="hero-content">
          <h1>{homePage?.hero?.title || 'MeowMail'}</h1>
          <p className="hero-subtitle">{homePage?.hero?.subtitle}</p>
          <div className="hero-ctas">
            {homePage?.hero?.primaryCTA?.text && (
              <Link href={homePage.hero.primaryCTA.link || '#'} className="btn btn-primary btn-large">
                {homePage.hero.primaryCTA.text}
              </Link>
            )}
            {homePage?.hero?.secondaryCTA?.text && (
              <Link href={homePage.hero.secondaryCTA.link || '#'} className="btn btn-secondary btn-large">
                {homePage.hero.secondaryCTA.text} →
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section - Bento Grid Style */}
      {homePage?.features && homePage.features.length > 0 && (
        <section className="features">
          <div className="container">
            <StaggerContainer className="features-grid" staggerDelay={100}>
              {homePage.features.map((feature, index) => (
                <ScrollAnimator key={index}>
                  <div className="feature-card">
                    {feature.icon && <span className="feature-icon">{feature.icon}</span>}
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </ScrollAnimator>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* Stats Section - Dark & Bold */}
      {homePage?.stats && homePage.stats.length > 0 && (
        <section className="stats">
          <div className="container">
            <StaggerContainer className="stats-grid" staggerDelay={150}>
              {homePage.stats.map((stat, index) => (
                <ScrollAnimator key={index}>
                  <div className="stat-item">
                    <span className="stat-value">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                </ScrollAnimator>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* Plans Preview Section */}
      {plans && plans.length > 0 && (
        <section className="plans-preview">
          <div className="container">
            <ScrollAnimator>
              <h2>{t.plansTitle}</h2>
            </ScrollAnimator>
            <StaggerContainer className="plans-grid" staggerDelay={100}>
              {plans.map((plan: any) => {
                const price = plan.pricing?.[currency]
                return (
                  <ScrollAnimator key={plan.id}>
                    <div className={`plan-card ${plan.isRecommended ? 'recommended' : ''}`}>
                      {plan.isRecommended && (
                        <span className="recommended-badge">{t.recommended}</span>
                      )}
                      <h3>{plan.name}</h3>
                      <p className="plan-description">{plan.description}</p>
                      <div className="plan-price">
                        <span className="price">
                          {currencySymbol}
                          {price?.monthly}
                        </span>
                        <span className="period">{t.perMonth}</span>
                      </div>
                      <ul className="plan-limits">
                        <li>
                          {plan.limits?.users} {t.users}
                        </li>
                        <li>
                          {plan.limits?.storage} {t.storage}
                        </li>
                      </ul>
                      <Link href={`/${locale}/plans`} className="btn btn-outline plan-cta">
                        {t.viewAllPlans}
                      </Link>
                    </div>
                  </ScrollAnimator>
                )
              })}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* Client Logos */}
      {homePage?.clientLogos && homePage.clientLogos.length > 0 && (
        <section className="client-logos">
          <div className="container">
            <ScrollAnimator>
              <p className="logos-title">{t.trustedBy}</p>
            </ScrollAnimator>
            <StaggerContainer className="logos-grid" staggerDelay={100}>
              {homePage.clientLogos.map((client, index) => (
                <ScrollAnimator key={index}>
                  <div className="logo-item">
                    {typeof client.logo === 'object' && client.logo?.url && (
                      <Image
                        src={client.logo.url}
                        alt={client.name || ''}
                        width={120}
                        height={40}
                        style={{ objectFit: 'contain' }}
                      />
                    )}
                  </div>
                </ScrollAnimator>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonials && testimonials.length > 0 && (
        <section className="testimonials">
          <div className="container">
            <ScrollAnimator>
              <h2>{t.testimonialsTitle}</h2>
            </ScrollAnimator>
            <StaggerContainer className="testimonials-grid" staggerDelay={150}>
              {testimonials.map((testimonial: any) => (
                <ScrollAnimator key={testimonial.id}>
                  <div className="testimonial-card">
                    <div className="testimonial-rating">
                      {'★'.repeat(testimonial.rating)}
                      {'☆'.repeat(5 - testimonial.rating)}
                    </div>
                    <p className="testimonial-content">&ldquo;{testimonial.content}&rdquo;</p>
                    <div className="testimonial-author">
                      {typeof testimonial.avatar === 'object' && testimonial.avatar?.url && (
                        <Image
                          src={testimonial.avatar.url}
                          alt={testimonial.userName}
                          width={56}
                          height={56}
                          className="author-avatar"
                        />
                      )}
                      <div className="author-info">
                        <span className="author-name">{testimonial.userName}</span>
                        <span className="author-position">
                          {testimonial.position}, {testimonial.company}
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollAnimator>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}
    </div>
  )
}
