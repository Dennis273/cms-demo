import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: {
    en: 'Footer',
    zh: '页脚',
    ja: 'フッター',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'columns',
      type: 'array',
      label: {
        en: 'Link Columns',
        zh: '链接列',
        ja: 'リンク列',
      },
      maxRows: 4,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          label: {
            en: 'Column Title',
            zh: '列标题',
            ja: '列タイトル',
          },
        },
        {
          name: 'links',
          type: 'array',
          label: {
            en: 'Links',
            zh: '链接',
            ja: 'リンク',
          },
          fields: [
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
            {
              name: 'link',
              type: 'text',
              required: true,
              label: {
                en: 'Link',
                zh: '链接',
                ja: 'リンク',
              },
            },
            {
              name: 'openInNewTab',
              type: 'checkbox',
              defaultValue: false,
              label: {
                en: 'Open in New Tab',
                zh: '在新标签页打开',
                ja: '新しいタブで開く',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: {
        en: 'Social Media Links',
        zh: '社交媒体链接',
        ja: 'ソーシャルメディアリンク',
      },
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          label: {
            en: 'Platform',
            zh: '平台',
            ja: 'プラットフォーム',
          },
          options: [
            { label: 'Twitter/X', value: 'twitter' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'GitHub', value: 'github' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'WeChat', value: 'wechat' },
            { label: 'Weibo', value: 'weibo' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: {
            en: 'URL',
            zh: '链接',
            ja: 'URL',
          },
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      localized: true,
      label: {
        en: 'Copyright Text',
        zh: '版权信息',
        ja: '著作権テキスト',
      },
      admin: {
        description: 'e.g., "© 2024 MeowMail. All rights reserved."',
      },
    },
    {
      name: 'bottomLinks',
      type: 'array',
      label: {
        en: 'Bottom Links',
        zh: '底部链接',
        ja: '下部リンク',
      },
      admin: {
        description: 'Links displayed at the very bottom (Privacy Policy, Terms, etc.)',
      },
      fields: [
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
        {
          name: 'link',
          type: 'text',
          required: true,
          label: {
            en: 'Link',
            zh: '链接',
            ja: 'リンク',
          },
        },
      ],
    },
  ],
}
