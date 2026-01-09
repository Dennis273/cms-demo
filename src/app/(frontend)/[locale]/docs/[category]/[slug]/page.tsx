import Link from 'next/link'
import type { Metadata } from 'next'
import {
  getCategoryBySlug,
  getDocBySlug,
  getDocsByCategory,
  getDocContent,
  isValidLocale,
} from '@/lib/data'
import type { Locale } from '@/config/types'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ locale: string; category: string; slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params

  if (!isValidLocale(locale)) {
    return {}
  }

  const doc = getDocBySlug(locale as Locale, slug)

  if (!doc) {
    return {}
  }

  return {
    title: doc.title,
    description: doc.excerpt,
    openGraph: {
      title: doc.title,
      description: doc.excerpt,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: doc.title,
      description: doc.excerpt,
    },
  }
}

export default async function DocArticlePage({ params }: PageProps) {
  const { locale, category: categorySlug, slug } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const category = getCategoryBySlug(locale as Locale, categorySlug)
  if (!category) {
    notFound()
  }

  const doc = getDocBySlug(locale as Locale, slug)
  if (!doc || doc.categorySlug !== categorySlug) {
    notFound()
  }

  // Get markdown content
  const content = await getDocContent(locale as Locale, doc.contentFile)

  // Related docs in this category
  const relatedDocs = getDocsByCategory(locale as Locale, categorySlug)

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
  }[locale as Locale]

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
                {relatedDocs.map((relatedDoc) => (
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
            <div
              className="doc-body markdown-body"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
            />
          </article>
        </div>
      </div>
    </div>
  )
}

// 简单的 Markdown 解析器
function parseMarkdown(markdown: string): string {
  let html = markdown
    // 标题
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // 粗体和斜体
    .replace(/\*\*\*(.*?)\*\*\*/gim, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    // 代码块
    .replace(/```[\w]*\n([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
    .replace(/`([^`]+)`/gim, '<code>$1</code>')
    // 链接
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
    // 表格
    .replace(/\|(.+)\|/gim, (match) => {
      const cells = match.split('|').filter(c => c.trim())
      return '<tr>' + cells.map(c => `<td>${c.trim()}</td>`).join('') + '</tr>'
    })
    // 无序列表
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    // 有序列表
    .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')

  // 包装连续的 li 标签为 ul
  html = html.replace(/(<li>.*<\/li>\n?)+/gim, (match) => `<ul>${match}</ul>`)

  // 包装连续的 tr 标签为 table
  html = html.replace(/(<tr>.*<\/tr>\n?)+/gim, (match) => `<table>${match}</table>`)

  // 段落处理
  const lines = html.split('\n')
  const processed = lines.map(line => {
    const trimmed = line.trim()
    if (!trimmed) return ''
    if (trimmed.startsWith('<')) return line
    return `<p>${line}</p>`
  })

  return processed.join('\n')
}
