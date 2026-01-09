import Link from 'next/link'
import type { Metadata } from 'next'
import {
  getCategoryBySlug,
  getDocsByCategory,
  isValidLocale,
} from '@/lib/data'
import type { Locale } from '@/config/types'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ locale: string; category: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, category: categorySlug } = await params

  if (!isValidLocale(locale)) {
    return {}
  }

  const category = getCategoryBySlug(locale as Locale, categorySlug)

  if (!category) {
    return {}
  }

  return {
    title: category.name,
    description: category.description,
  }
}

export default async function DocCategoryPage({ params }: PageProps) {
  const { locale, category: categorySlug } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const category = getCategoryBySlug(locale as Locale, categorySlug)
  if (!category) {
    notFound()
  }

  const docs = getDocsByCategory(locale as Locale, categorySlug)

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
  }[locale as Locale]

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
          {docs.map((doc) => (
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
