import Image from 'next/image'
import { getPayload, Locale, isValidLocale } from '@/lib/payload'
import { notFound } from 'next/navigation'
import { RichText } from '@/components/RichText'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function ShowcasePage({ params }: PageProps) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const payload = await getPayload()

  // Fetch showcases
  const { docs: showcases } = await payload.find({
    collection: 'showcases',
    locale: locale as Locale,
    sort: 'order',
  })

  // Fetch testimonials
  const { docs: testimonials } = await payload.find({
    collection: 'testimonials',
    locale: locale as Locale,
    sort: 'order',
  })

  const t = {
    zh: {
      title: '客户案例',
      subtitle: '看看这些企业如何使用喵喵企业邮箱',
      testimonialsTitle: '客户评价',
      industry: '行业',
      companySize: '公司规模',
      visitWebsite: '访问网站',
    },
    en: {
      title: 'Showcase',
      subtitle: 'See how companies use MeowMail',
      testimonialsTitle: 'Customer Reviews',
      industry: 'Industry',
      companySize: 'Company Size',
      visitWebsite: 'Visit Website',
    },
    ja: {
      title: '導入事例',
      subtitle: '企業がMeowMailをどのように活用しているかご覧ください',
      testimonialsTitle: 'お客様の声',
      industry: '業界',
      companySize: '会社規模',
      visitWebsite: 'ウェブサイトを見る',
    },
  }[locale]

  return (
    <div className="showcase-page">
      <div className="container">
        <header className="page-header">
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </header>

        {/* Showcases / Case Studies */}
        <section className="showcases-section">
          <div className="showcases-grid">
            {showcases.map((showcase: any) => (
              <div key={showcase.id} className="showcase-card">
                <div className="showcase-header">
                  {typeof showcase.logo === 'object' && showcase.logo?.url && (
                    <div className="showcase-logo">
                      <Image
                        src={showcase.logo.url}
                        alt={showcase.companyName}
                        width={80}
                        height={80}
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  )}
                  <div className="showcase-info">
                    <h3>{showcase.companyName}</h3>
                    <div className="showcase-meta">
                      <span>
                        <strong>{t.industry}:</strong> {showcase.industry}
                      </span>
                      {showcase.companySize && (
                        <span>
                          <strong>{t.companySize}:</strong> {showcase.companySize}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="showcase-content">
                  <RichText content={showcase.description} />
                </div>
                {showcase.website && (
                  <a
                    href={showcase.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="showcase-link"
                  >
                    {t.visitWebsite} →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        {testimonials && testimonials.length > 0 && (
          <section className="testimonials-section">
            <h2>{t.testimonialsTitle}</h2>
            <div className="testimonials-grid">
              {testimonials.map((testimonial: any) => (
                <div key={testimonial.id} className="testimonial-card">
                  <div className="testimonial-rating">
                    {'★'.repeat(testimonial.rating)}
                    {'☆'.repeat(5 - testimonial.rating)}
                  </div>
                  <p className="testimonial-content">"{testimonial.content}"</p>
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
          </section>
        )}
      </div>
    </div>
  )
}
