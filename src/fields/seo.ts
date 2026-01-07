import type { Field, GroupField } from 'payload'

/**
 * FAQ Item fields for FAQ Schema (JSON-LD)
 */
export const faqFields: Field[] = [
  {
    name: 'question',
    type: 'text',
    required: true,
    localized: true,
    label: {
      en: 'Question',
      zh: '问题',
      ja: '質問',
    },
  },
  {
    name: 'answer',
    type: 'textarea',
    required: true,
    localized: true,
    label: {
      en: 'Answer',
      zh: '答案',
      ja: '回答',
    },
  },
]

/**
 * Complete SEO fields group with FAQ Schema support
 * Can be added to any Collection or Global
 */
export const seoFields: GroupField = {
  name: 'seo',
  type: 'group',
  label: {
    en: 'SEO Settings',
    zh: 'SEO 设置',
    ja: 'SEO設定',
  },
  fields: [
    {
      name: 'metaTitle',
      type: 'text',
      localized: true,
      label: {
        en: 'Meta Title',
        zh: 'Meta 标题',
        ja: 'メタタイトル',
      },
      admin: {
        description: {
          en: 'Title for search engines. Recommended: 50-60 characters.',
          zh: '搜索引擎标题。建议：50-60 个字符。',
          ja: '検索エンジン用タイトル。推奨：50〜60文字。',
        },
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      localized: true,
      label: {
        en: 'Meta Description',
        zh: 'Meta 描述',
        ja: 'メタ説明',
      },
      admin: {
        description: {
          en: 'Description for search engines. Recommended: 150-160 characters.',
          zh: '搜索引擎描述。建议：150-160 个字符。',
          ja: '検索エンジン用説明。推奨：150〜160文字。',
        },
      },
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      label: {
        en: 'Social Share Image',
        zh: '社交分享图片',
        ja: 'ソーシャル共有画像',
      },
      admin: {
        description: {
          en: 'Image for social media sharing. Recommended: 1200x630 pixels.',
          zh: '社交媒体分享图片。建议：1200x630 像素。',
          ja: 'SNS共有用画像。推奨：1200x630ピクセル。',
        },
      },
    },
    {
      name: 'canonicalURL',
      type: 'text',
      label: {
        en: 'Canonical URL',
        zh: '规范 URL',
        ja: '正規URL',
      },
      admin: {
        description: {
          en: 'Override the default canonical URL if needed.',
          zh: '如需覆盖默认的规范 URL，请在此输入。',
          ja: '必要に応じてデフォルトの正規URLを上書きします。',
        },
      },
    },
    {
      name: 'noIndex',
      type: 'checkbox',
      defaultValue: false,
      label: {
        en: 'No Index',
        zh: '禁止索引',
        ja: 'インデックス禁止',
      },
      admin: {
        description: {
          en: 'Prevent search engines from indexing this page.',
          zh: '阻止搜索引擎索引此页面。',
          ja: '検索エンジンによるインデックスを防止します。',
        },
      },
    },
    {
      name: 'faq',
      type: 'array',
      label: {
        en: 'FAQ Schema',
        zh: 'FAQ 结构化数据',
        ja: 'FAQスキーマ',
      },
      admin: {
        description: {
          en: 'Add FAQ items for Google FAQ Rich Results.',
          zh: '添加常见问题，用于 Google FAQ 富文本搜索结果。',
          ja: 'GoogleのFAQリッチリザルト用にFAQを追加します。',
        },
      },
      fields: faqFields,
    },
  ],
}

/**
 * Minimal SEO fields (without FAQ) for simpler use cases
 */
export const seoFieldsBasic: GroupField = {
  name: 'seo',
  type: 'group',
  label: {
    en: 'SEO Settings',
    zh: 'SEO 设置',
    ja: 'SEO設定',
  },
  fields: [
    {
      name: 'metaTitle',
      type: 'text',
      localized: true,
      label: {
        en: 'Meta Title',
        zh: 'Meta 标题',
        ja: 'メタタイトル',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      localized: true,
      label: {
        en: 'Meta Description',
        zh: 'Meta 描述',
        ja: 'メタ説明',
      },
    },
  ],
}
