import Link from 'next/link'
import { getPayload, Locale, isValidLocale } from '@/lib/payload'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function DocsPage({ params }: PageProps) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const payload = await getPayload()

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
      <div className="container">
        <header className="page-header">
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
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
