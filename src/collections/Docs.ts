import type { CollectionConfig } from 'payload'
import { seoFieldsBasic } from '@/fields/seo'

export const Docs: CollectionConfig = {
  slug: 'docs',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'order', 'updatedAt'],
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
        en: 'Title',
        zh: '标题',
        ja: 'タイトル',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier (e.g., "how-to-login", "smtp-settings")',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'doc-categories',
      required: true,
      label: {
        en: 'Category',
        zh: '分类',
        ja: 'カテゴリ',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
      label: {
        en: 'Excerpt',
        zh: '摘要',
        ja: '抜粋',
      },
      admin: {
        description: 'Brief summary shown in doc listings',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
      label: {
        en: 'Content',
        zh: '内容',
        ja: 'コンテンツ',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: {
        en: 'Display Order',
        zh: '显示顺序',
        ja: '表示順',
      },
      admin: {
        description: 'Order within category, lower numbers appear first',
      },
    },
    // SEO fields
    seoFieldsBasic,
  ],
}
