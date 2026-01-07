import Link from 'next/link'
import { getPayload, Locale, isValidLocale } from '@/lib/payload'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ locale: string; category: string }>
}

export default async function DocCategoryPage({ params }: PageProps) {
  const { locale, category: categorySlug } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const payload = await getPayload()

  // Find the category
  const { docs: categories } = await payload.find({
    collection: 'doc-categories',
    where: { slug: { equals: categorySlug } },
    locale: locale as Locale,
    limit: 1,
  })

  const category = categories[0]
  if (!category) {
    notFound()
  }

  // Fetch docs in this category
  const { docs } = await payload.find({
    collection: 'docs',
    where: { category: { equals: category.id } },
    locale: locale as Locale,
    sort: 'order',
  })

  const t = {
    zh: {
      backToDocs: '← 返回文档',
      articles: '篇文章',
    },
    en: {
      backToDocs: '← Back to Docs',
      articles: 'articles',
    },
    ja: {
      backToDocs: '← ドキュメントに戻る',
      articles: '記事',
    },
  }[locale]

  return (
    <div className="docs-page">
      <div className="container">
        <Link href={`/${locale}/docs`} className="back-link">
          {t.backToDocs}
        </Link>

        <header className="page-header category-header-full">
          {category.icon && <span className="category-icon large">{category.icon}</span>}
          <h1>{category.name}</h1>
          <p>{category.description}</p>
          <span className="article-count">
            {docs.length} {t.articles}
          </span>
        </header>

        <div className="docs-list">
          {docs.map((doc: any) => (
            <Link
              key={doc.id}
              href={`/${locale}/docs/${categorySlug}/${doc.slug}`}
              className="doc-item"
            >
              <h3>{doc.title}</h3>
              {doc.excerpt && <p>{doc.excerpt}</p>}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
