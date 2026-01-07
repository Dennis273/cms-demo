import Link from 'next/link'
import Image from 'next/image'
import { getPayload, Locale, localeToCurrency, currencySymbols, isValidLocale } from '@/lib/payload'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ locale: string }>
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
    },
    en: {
      plansTitle: 'Choose Your Plan',
      viewAllPlans: 'View All Plans',
      perMonth: '/mo',
      perYear: '/yr',
      users: 'users',
      storage: 'GB storage',
      recommended: 'Recommended',
      testimonialsTitle: 'Testimonials',
      trustedBy: 'Trusted by',
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
      trustedBy: '信頼される企業',
    },
  }[locale]

  return (
    <div className="home-page">
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
              <Link href={homePage.hero.primaryCTA.link || '#'} className="btn btn-primary">
                {homePage.hero.primaryCTA.text}
              </Link>
            )}
            {homePage?.hero?.secondaryCTA?.text && (
              <Link href={homePage.hero.secondaryCTA.link || '#'} className="btn btn-secondary">
                {homePage.hero.secondaryCTA.text}
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      {homePage?.features && homePage.features.length > 0 && (
        <section className="features">
          <div className="container">
            <div className="features-grid">
              {homePage.features.map((feature, index) => (
                <div key={index} className="feature-card">
                  {feature.icon && <span className="feature-icon">{feature.icon}</span>}
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      {homePage?.stats && homePage.stats.length > 0 && (
        <section className="stats">
          <div className="container">
            <div className="stats-grid">
              {homePage.stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Plans Preview Section */}
      {plans && plans.length > 0 && (
        <section className="plans-preview">
          <div className="container">
            <h2>{t.plansTitle}</h2>
            <div className="plans-grid">
              {plans.map((plan: any) => {
                const price = plan.pricing?.[currency]
                return (
                  <div
                    key={plan.id}
                    className={`plan-card ${plan.isRecommended ? 'recommended' : ''}`}
                  >
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
                    <Link href={`/${locale}/plans`} className="btn btn-outline">
                      {t.viewAllPlans}
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Client Logos */}
      {homePage?.clientLogos && homePage.clientLogos.length > 0 && (
        <section className="client-logos">
          <div className="container">
            <p className="logos-title">{t.trustedBy}</p>
            <div className="logos-grid">
              {homePage.clientLogos.map((client, index) => (
                <div key={index} className="logo-item">
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
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonials && testimonials.length > 0 && (
        <section className="testimonials">
          <div className="container">
            <h2>{t.testimonialsTitle}</h2>
            <div className="testimonials-grid">
              {testimonials.map((testimonial: any) => (
                <div key={testimonial.id} className="testimonial-card">
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
                        width={48}
                        height={48}
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
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
