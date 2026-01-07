import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: {
    en: 'Site Settings',
    zh: '站点设置',
    ja: 'サイト設定',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      localized: true,
      label: {
        en: 'Site Name',
        zh: '站点名称',
        ja: 'サイト名',
      },
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      localized: true,
      label: {
        en: 'Site Description',
        zh: '站点描述',
        ja: 'サイト説明',
      },
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
      label: {
        en: 'Favicon',
        zh: '网站图标',
        ja: 'ファビコン',
      },
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      label: {
        en: 'Default OG Image',
        zh: '默认社交分享图片',
        ja: 'デフォルトOG画像',
      },
      admin: {
        description: 'Default image for social media sharing',
      },
    },
    {
      name: 'defaultCurrency',
      type: 'select',
      defaultValue: 'USD',
      label: {
        en: 'Default Currency',
        zh: '默认货币',
        ja: 'デフォルト通貨',
      },
      options: [
        { label: 'USD ($)', value: 'USD' },
        { label: 'CNY (¥)', value: 'CNY' },
        { label: 'JPY (¥)', value: 'JPY' },
      ],
    },
    {
      name: 'contactEmail',
      type: 'email',
      label: {
        en: 'Contact Email',
        zh: '联系邮箱',
        ja: '連絡先メール',
      },
    },
    {
      name: 'supportEmail',
      type: 'email',
      label: {
        en: 'Support Email',
        zh: '支持邮箱',
        ja: 'サポートメール',
      },
    },
    {
      name: 'analytics',
      type: 'group',
      label: {
        en: 'Analytics',
        zh: '分析工具',
        ja: 'アナリティクス',
      },
      fields: [
        {
          name: 'googleAnalyticsId',
          type: 'text',
          label: 'Google Analytics ID',
          admin: {
            description: 'e.g., G-XXXXXXXXXX',
          },
        },
      ],
    },
  ],
}
