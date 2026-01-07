import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: {
    en: 'Navigation',
    zh: '导航菜单',
    ja: 'ナビゲーション',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: {
        en: 'Logo',
        zh: 'Logo',
        ja: 'ロゴ',
      },
    },
    {
      name: 'logoText',
      type: 'text',
      localized: true,
      label: {
        en: 'Logo Text',
        zh: 'Logo 文字',
        ja: 'ロゴテキスト',
      },
      admin: {
        description: 'Text displayed next to or instead of logo',
      },
    },
    {
      name: 'items',
      type: 'array',
      label: {
        en: 'Menu Items',
        zh: '菜单项',
        ja: 'メニュー項目',
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
        {
          name: 'highlight',
          type: 'checkbox',
          defaultValue: false,
          label: {
            en: 'Highlight (CTA Style)',
            zh: '高亮显示 (CTA样式)',
            ja: 'ハイライト（CTAスタイル）',
          },
        },
      ],
    },
  ],
}
