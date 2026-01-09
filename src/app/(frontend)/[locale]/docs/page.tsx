import Link from 'next/link'
import type { Metadata } from 'next'
import {
  getDocsPageConfig,
  getDocCategories,
  getDocs,
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

  const docsPage = getDocsPageConfig(locale as Locale)
  const seo = docsPage.seo

  return {
    title: seo?.metaTitle || docsPage.title,
    description: seo?.metaDescription || docsPage.subtitle,
    openGraph: {
      title: seo?.metaTitle || docsPage.title,
      description: seo?.metaDescription || docsPage.subtitle,
      type: 'website',
      ...(seo?.ogImage && {
        images: [{ url: seo.ogImage, width: 1200, height: 630, alt: docsPage.title }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.metaTitle || docsPage.title,
      description: seo?.metaDescription || docsPage.subtitle,
      ...(seo?.ogImage && { images: [seo.ogImage] }),
    },
    ...(seo?.noIndex && {
      robots: { index: false, follow: false },
    }),
  }
}

export default async function DocsPage({ params }: PageProps) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const docsPage = getDocsPageConfig(locale as Locale)
  const categories = getDocCategories(locale as Locale)
  const allDocs = getDocs(locale as Locale)

  // Generate FAQ Schema JSON-LD
  const faqSchema = generateFAQSchema(docsPage.seo?.faq || null)

  const t = {
    zh: {
      articles: '篇文章',
    },
    en: {
      articles: 'articles',
    },
    ja: {
      articles: '記事',
    },
  }[locale as Locale]

  // Group docs by category
  const docsByCategory: Record<string, typeof allDocs> = {}
  categories.forEach((cat) => {
    docsByCategory[cat.slug] = allDocs.filter((doc) => doc.categorySlug === cat.slug)
  })

  return (
    <div className="docs-page">
      {/* FAQ Schema JSON-LD */}
      <JsonLd data={faqSchema} />

      <div className="container">
        <header className="page-header">
          <h1>{docsPage.title}</h1>
          <p>{docsPage.subtitle}</p>
        </header>

        <div className="docs-categories">
          {categories.map((category) => {
            const categoryDocs = docsByCategory[category.slug] || []
            return (
              <div key={category.id} className="category-card">
                <Link href={`/${locale}/docs/${category.slug}`} className="category-header">
                  {category.icon && <span className="category-icon">{category.icon}</span>}
                  <div className="category-info">
                    <h2>{category.name}</h2>
                    <p>{category.description}</p>
                    <span className="article-count">
                      {categoryDocs.length} {t.articles}
                    </span>
                  </div>
                </Link>
                {categoryDocs.length > 0 && (
                  <ul className="category-docs">
                    {categoryDocs.slice(0, 3).map((doc) => (
                      <li key={doc.id}>
                        <Link href={`/${locale}/docs/${category.slug}/${doc.slug}`}>
                          {doc.title}
                        </Link>
                      </li>
                    ))}
                    {categoryDocs.length > 3 && (
                      <li className="more-link">
                        <Link href={`/${locale}/docs/${category.slug}`}>
                          +{categoryDocs.length - 3} more...
                        </Link>
                      </li>
                    )}
                  </ul>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
