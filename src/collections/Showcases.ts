import type { CollectionConfig } from 'payload'
import { seoFieldsBasic } from '@/fields/seo'

export const Showcases: CollectionConfig = {
  slug: 'showcases',
  admin: {
    useAsTitle: 'companyName',
    defaultColumns: ['companyName', 'industry', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      required: true,
      localized: true,
      label: {
        en: 'Company Name',
        zh: '公司名称',
        ja: '会社名',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: {
        en: 'Logo',
        zh: '公司Logo',
        ja: 'ロゴ',
      },
    },
    {
      name: 'industry',
      type: 'text',
      required: true,
      localized: true,
      label: {
        en: 'Industry',
        zh: '行业',
        ja: '業界',
      },
    },
    {
      name: 'companySize',
      type: 'select',
      label: {
        en: 'Company Size',
        zh: '公司规模',
        ja: '会社規模',
      },
      options: [
        { label: '1-10', value: '1-10' },
        { label: '11-50', value: '11-50' },
        { label: '51-200', value: '51-200' },
        { label: '201-500', value: '201-500' },
        { label: '500+', value: '500+' },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      localized: true,
      label: {
        en: 'Use Case Description',
        zh: '使用场景描述',
        ja: '使用事例の説明',
      },
    },
    {
      name: 'website',
      type: 'text',
      label: {
        en: 'Website',
        zh: '网站',
        ja: 'ウェブサイト',
      },
      admin: {
        description: 'Company website URL (optional)',
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
    },
    // SEO fields
    seoFieldsBasic,
  ],
}
