import Link from 'next/link'
import { getPayload, Locale, isValidLocale } from '@/lib/payload'
import { notFound } from 'next/navigation'
import { RichText } from '@/components/RichText'

interface PageProps {
  params: Promise<{ locale: string; category: string; slug: string }>
}

export default async function DocArticlePage({ params }: PageProps) {
  const { locale, category: categorySlug, slug } = await params

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

  // Find the doc
  const { docs } = await payload.find({
    collection: 'docs',
    where: {
      slug: { equals: slug },
      category: { equals: category.id },
    },
    locale: locale as Locale,
    limit: 1,
  })

  const doc = docs[0]
  if (!doc) {
    notFound()
  }

  // Fetch other docs in this category for sidebar
  const { docs: relatedDocs } = await payload.find({
    collection: 'docs',
    where: { category: { equals: category.id } },
    locale: locale as Locale,
    sort: 'order',
  })

  const t = {
    zh: {
      backToCategory: '← 返回',
      inThisCategory: '本分类文章',
    },
    en: {
      backToCategory: '← Back to',
      inThisCategory: 'In this category',
    },
    ja: {
      backToCategory: '← に戻る',
      inThisCategory: 'このカテゴリの記事',
    },
  }[locale]

  return (
    <div className="doc-article-page">
      <div className="container">
        <div className="doc-layout">
          {/* Sidebar */}
          <aside className="doc-sidebar">
            <Link href={`/${locale}/docs/${categorySlug}`} className="sidebar-category">
              {category.icon && <span className="category-icon">{category.icon}</span>}
              <span>{category.name}</span>
            </Link>
            <nav className="sidebar-nav">
              <h4>{t.inThisCategory}</h4>
              <ul>
                {relatedDocs.map((relatedDoc: any) => (
                  <li key={relatedDoc.id} className={relatedDoc.id === doc.id ? 'active' : ''}>
                    <Link href={`/${locale}/docs/${categorySlug}/${relatedDoc.slug}`}>
                      {relatedDoc.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main content */}
          <article className="doc-content">
            <Link href={`/${locale}/docs/${categorySlug}`} className="back-link mobile-only">
              {t.backToCategory} {category.name}
            </Link>
            <h1>{doc.title}</h1>
            {doc.excerpt && <p className="doc-excerpt">{doc.excerpt}</p>}
            <RichText content={doc.content} className="doc-body" />
          </article>
        </div>
      </div>
    </div>
  )
}
