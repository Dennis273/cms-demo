import Link from 'next/link'
import type { Metadata } from 'next'
import { getPayload, Locale, isValidLocale } from '@/lib/payload'
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
  const docsPage = await payload.findGlobal({
    slug: 'docs-page',
    locale: locale as Locale,
  })

  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
    locale: locale as Locale,
  })

  const seo = docsPage?.seo
  const fallbackTitles = { zh: '帮助文档', en: 'Documentation', ja: 'ドキュメント' }
  const title = seo?.metaTitle || docsPage?.title || fallbackTitles[locale as keyof typeof fallbackTitles]
  const description = seo?.metaDescription || docsPage?.subtitle || ''

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

export default async function DocsPage({ params }: PageProps) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const payload = await getPayload()

  // Fetch docs page settings
  const docsPage = await payload.findGlobal({
    slug: 'docs-page',
    locale: locale as Locale,
  })

  // Fetch categories
  const { docs: categories } = await payload.find({
    collection: 'doc-categories',
    locale: locale as Locale,
    sort: 'order',
  })

  // Fetch all docs
  const { docs: allDocs } = await payload.find({
    collection: 'docs',
    locale: locale as Locale,
    sort: 'order',
    limit: 100,
  })

  // Generate FAQ Schema JSON-LD
  const faqSchema = generateFAQSchema(docsPage?.seo?.faq as Array<{ question: string; answer: string }> | null)

  const t = {
    zh: {
      title: '帮助文档',
      subtitle: '了解如何使用喵喵企业邮箱',
      searchPlaceholder: '搜索文档...',
      articles: '篇文章',
    },
    en: {
      title: 'Documentation',
      subtitle: 'Learn how to use MeowMail',
      searchPlaceholder: 'Search docs...',
      articles: 'articles',
    },
    ja: {
      title: 'ドキュメント',
      subtitle: 'MeowMailの使い方を学ぶ',
      searchPlaceholder: 'ドキュメントを検索...',
      articles: '記事',
    },
  }[locale]

  // Group docs by category
  const docsByCategory: Record<string, any[]> = {}
  categories.forEach((cat: any) => {
    docsByCategory[cat.id] = allDocs.filter(
      (doc: any) =>
        (typeof doc.category === 'object' ? doc.category?.id : doc.category) === cat.id,
    )
  })

  return (
    <div className="docs-page">
      {/* FAQ Schema JSON-LD */}
      <JsonLd data={faqSchema} />

      <div className="container">
        <header className="page-header">
          <h1>{docsPage?.title || t.title}</h1>
          <p>{docsPage?.subtitle || t.subtitle}</p>
        </header>

        <div className="docs-categories">
          {categories.map((category: any) => {
            const categoryDocs = docsByCategory[category.id] || []
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
                    {categoryDocs.slice(0, 3).map((doc: any) => (
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
