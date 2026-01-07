import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: {
    en: 'Home Page',
    zh: '首页',
    ja: 'ホームページ',
  },
  access: {
    read: () => true,
  },
  fields: [
    // Hero Section
    {
      name: 'hero',
      type: 'group',
      label: {
        en: 'Hero Section',
        zh: 'Hero 区域',
        ja: 'ヒーローセクション',
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
          name: 'subtitle',
          type: 'textarea',
          localized: true,
          label: {
            en: 'Subtitle',
            zh: '副标题',
            ja: 'サブタイトル',
          },
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          label: {
            en: 'Background Image',
            zh: '背景图片',
            ja: '背景画像',
          },
        },
        {
          name: 'primaryCTA',
          type: 'group',
          label: {
            en: 'Primary CTA Button',
            zh: '主要CTA按钮',
            ja: 'プライマリCTAボタン',
          },
          fields: [
            {
              name: 'text',
              type: 'text',
              localized: true,
              label: {
                en: 'Button Text',
                zh: '按钮文字',
                ja: 'ボタンテキスト',
              },
            },
            {
              name: 'link',
              type: 'text',
              label: {
                en: 'Link',
                zh: '链接',
                ja: 'リンク',
              },
            },
          ],
        },
        {
          name: 'secondaryCTA',
          type: 'group',
          label: {
            en: 'Secondary CTA Button',
            zh: '次要CTA按钮',
            ja: 'セカンダリCTAボタン',
          },
          fields: [
            {
              name: 'text',
              type: 'text',
              localized: true,
              label: {
                en: 'Button Text',
                zh: '按钮文字',
                ja: 'ボタンテキスト',
              },
            },
            {
              name: 'link',
              type: 'text',
              label: {
                en: 'Link',
                zh: '链接',
                ja: 'リンク',
              },
            },
          ],
        },
      ],
    },
    // Features Section
    {
      name: 'features',
      type: 'array',
      label: {
        en: 'Features',
        zh: '功能特性',
        ja: '機能',
      },
      maxRows: 6,
      fields: [
        {
          name: 'icon',
          type: 'text',
          label: {
            en: 'Icon',
            zh: '图标',
            ja: 'アイコン',
          },
          admin: {
            description: 'Icon name or emoji (e.g., "🔒", "shield", "cloud")',
          },
        },
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
          name: 'description',
          type: 'textarea',
          localized: true,
          label: {
            en: 'Description',
            zh: '描述',
            ja: '説明',
          },
        },
      ],
    },
    // Stats Section
    {
      name: 'stats',
      type: 'array',
      label: {
        en: 'Statistics',
        zh: '数据统计',
        ja: '統計データ',
      },
      maxRows: 4,
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          label: {
            en: 'Value',
            zh: '数值',
            ja: '数値',
          },
          admin: {
            description: 'e.g., "10,000+", "99.99%", "50M+"',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          label: {
            en: 'Label',
            zh: '标签',
            ja: 'ラベル',
          },
        },
      ],
    },
    // Client Logos Section
    {
      name: 'clientLogos',
      type: 'array',
      label: {
        en: 'Client Logos',
        zh: '客户Logo墙',
        ja: 'クライアントロゴ',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
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
          required: true,
          label: {
            en: 'Logo',
            zh: 'Logo',
            ja: 'ロゴ',
          },
        },
      ],
    },
    // SEO
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
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
    },
  ],
}
