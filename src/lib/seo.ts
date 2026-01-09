import type { Metadata } from 'next'

export interface SEOData {
  metaTitle?: string | null
  metaDescription?: string | null
  ogImage?: string | null
  canonicalURL?: string | null
  noIndex?: boolean | null
  faq?: Array<{
    question: string
    answer: string
  }> | null
}

export interface GenerateMetadataOptions {
  seo?: SEOData | null
  fallbackTitle: string
  fallbackDescription?: string
  siteName: string
  siteUrl: string
  locale: string
  path?: string
  defaultOgImage?: string | null
}

/**
 * Generate Next.js Metadata object from SEO data
 */
export function generateSEOMetadata({
  seo,
  fallbackTitle,
  fallbackDescription,
  siteName,
  siteUrl,
  locale,
  path = '',
  defaultOgImage,
}: GenerateMetadataOptions): Metadata {
  const title = seo?.metaTitle || fallbackTitle
  const description = seo?.metaDescription || fallbackDescription || ''
  const canonicalUrl = seo?.canonicalURL || `${siteUrl}/${locale}${path}`

  // Get OG image URL
  const ogImageUrl = seo?.ogImage || defaultOgImage || undefined

  const metadata: Metadata = {
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'zh-CN': `${siteUrl}/zh${path}`,
        'en': `${siteUrl}/en${path}`,
        'ja': `${siteUrl}/ja${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName,
      locale: locale === 'zh' ? 'zh_CN' : locale === 'ja' ? 'ja_JP' : 'en_US',
      type: 'website',
      ...(ogImageUrl && {
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImageUrl && { images: [ogImageUrl] }),
    },
  }

  // Add noindex if specified
  if (seo?.noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
    }
  }

  return metadata
}

/**
 * Generate FAQ Schema JSON-LD
 */
export function generateFAQSchema(
  faq: Array<{ question: string; answer: string }> | null | undefined
): object | null {
  if (!faq || faq.length === 0) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

/**
 * Generate Organization Schema JSON-LD
 */
export function generateOrganizationSchema(options: {
  name: string
  url: string
  logo?: string
  description?: string
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: options.name,
    url: options.url,
    ...(options.logo && { logo: options.logo }),
    ...(options.description && { description: options.description }),
  }
}

/**
 * Generate WebPage Schema JSON-LD
 */
export function generateWebPageSchema(options: {
  name: string
  description?: string
  url: string
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: options.name,
    ...(options.description && { description: options.description }),
    url: options.url,
  }
}
