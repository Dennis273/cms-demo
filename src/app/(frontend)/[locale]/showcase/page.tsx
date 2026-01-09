import Image from 'next/image'
import type { Metadata } from 'next'
import {
  getShowcasePageConfig,
  getShowcases,
  getTestimonials,
  isValidLocale,
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

  const showcasePage = getShowcasePageConfig(locale as Locale)
  const seo = showcasePage.seo

  return {
    title: seo?.metaTitle || showcasePage.title,
    description: seo?.metaDescription || showcasePage.subtitle,
    openGraph: {
      title: seo?.metaTitle || showcasePage.title,
      description: seo?.metaDescription || showcasePage.subtitle,
      type: 'website',
      ...(seo?.ogImage && {
        images: [{ url: seo.ogImage, width: 1200, height: 630, alt: showcasePage.title }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.metaTitle || showcasePage.title,
      description: seo?.metaDescription || showcasePage.subtitle,
      ...(seo?.ogImage && { images: [seo.ogImage] }),
    },
    ...(seo?.noIndex && {
      robots: { index: false, follow: false },
    }),
  }
}

export default async function ShowcasePage({ params }: PageProps) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const showcasePage = getShowcasePageConfig(locale as Locale)
  const showcases = getShowcases(locale as Locale)
  const testimonials = getTestimonials(locale as Locale)

  // Generate FAQ Schema JSON-LD
  const faqSchema = generateFAQSchema(showcasePage.seo?.faq || null)

  const t = {
    zh: {
      testimonialsTitle: '客户评价',
      industry: '行业',
      companySize: '公司规模',
      visitWebsite: '访问网站',
    },
    en: {
      testimonialsTitle: 'Customer Reviews',
      industry: 'Industry',
      companySize: 'Company Size',
      visitWebsite: 'Visit Website',
    },
    ja: {
      testimonialsTitle: 'お客様の声',
      industry: '業界',
      companySize: '会社規模',
      visitWebsite: 'ウェブサイトを見る',
    },
  }[locale as Locale]

  return (
    <div className="showcase-page">
      {/* FAQ Schema JSON-LD */}
      <JsonLd data={faqSchema} />

      <div className="container">
        <header className="page-header">
          <h1>{showcasePage.title}</h1>
          <p>{showcasePage.subtitle}</p>
        </header>

        {/* Showcases / Case Studies */}
        <section className="showcases-section">
          <div className="showcases-grid">
            {showcases.map((showcase) => (
              <div key={showcase.id} className="showcase-card">
                <div className="showcase-header">
                  {showcase.logo && (
                    <div className="showcase-logo">
                      <Image
                        src={showcase.logo}
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
                  <p>{showcase.description}</p>
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
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="testimonial-card">
                  <div className="testimonial-rating">
                    {'★'.repeat(testimonial.rating)}
                    {'☆'.repeat(5 - testimonial.rating)}
                  </div>
                  <p className="testimonial-content">&ldquo;{testimonial.content}&rdquo;</p>
                  <div className="testimonial-author">
                    {testimonial.avatar && (
                      <Image
                        src={testimonial.avatar}
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
