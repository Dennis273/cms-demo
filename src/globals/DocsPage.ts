import type { GlobalConfig } from 'payload'
import { seoFields } from '@/fields/seo'

export const DocsPage: GlobalConfig = {
  slug: 'docs-page',
  label: {
    en: 'Docs Page',
    zh: '文档页面',
    ja: 'ドキュメントページ',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: {
        en: 'Page Title',
        zh: '页面标题',
        ja: 'ページタイトル',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      localized: true,
      label: {
        en: 'Subtitle',
        zh: '副标题',
        ja: 'サブタイトル',
      },
    },
    // SEO with FAQ Schema support
    seoFields,
  ],
}
