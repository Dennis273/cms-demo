import type { CollectionConfig } from 'payload'

export const Plans: CollectionConfig = {
  slug: 'plans',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'isRecommended', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: {
        en: 'Plan Name',
        zh: '方案名称',
        ja: 'プラン名',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier (e.g., "basic", "pro", "enterprise")',
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
    {
      name: 'pricing',
      type: 'group',
      label: {
        en: 'Pricing',
        zh: '定价',
        ja: '価格',
      },
      fields: [
        {
          name: 'USD',
          type: 'group',
          fields: [
            {
              name: 'monthly',
              type: 'number',
              required: true,
              min: 0,
              label: 'Monthly (USD)',
            },
            {
              name: 'yearly',
              type: 'number',
              required: true,
              min: 0,
              label: 'Yearly (USD)',
            },
          ],
        },
        {
          name: 'CNY',
          type: 'group',
          fields: [
            {
              name: 'monthly',
              type: 'number',
              required: true,
              min: 0,
              label: 'Monthly (CNY)',
            },
            {
              name: 'yearly',
              type: 'number',
              required: true,
              min: 0,
              label: 'Yearly (CNY)',
            },
          ],
        },
        {
          name: 'JPY',
          type: 'group',
          fields: [
            {
              name: 'monthly',
              type: 'number',
              required: true,
              min: 0,
              label: 'Monthly (JPY)',
            },
            {
              name: 'yearly',
              type: 'number',
              required: true,
              min: 0,
              label: 'Yearly (JPY)',
            },
          ],
        },
      ],
    },
    {
      name: 'limits',
      type: 'group',
      label: {
        en: 'Limits',
        zh: '限制',
        ja: '制限',
      },
      fields: [
        {
          name: 'users',
          type: 'number',
          required: true,
          min: 1,
          label: {
            en: 'Max Users',
            zh: '最大用户数',
            ja: '最大ユーザー数',
          },
        },
        {
          name: 'storage',
          type: 'number',
          required: true,
          min: 1,
          label: {
            en: 'Storage (GB)',
            zh: '存储空间 (GB)',
            ja: 'ストレージ (GB)',
          },
        },
      ],
    },
    {
      name: 'features',
      type: 'array',
      label: {
        en: 'Features',
        zh: '功能列表',
        ja: '機能一覧',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          localized: true,
          label: {
            en: 'Feature Name',
            zh: '功能名称',
            ja: '機能名',
          },
        },
        {
          name: 'included',
          type: 'checkbox',
          defaultValue: true,
          label: {
            en: 'Included',
            zh: '包含',
            ja: '含む',
          },
        },
      ],
    },
    {
      name: 'isRecommended',
      type: 'checkbox',
      defaultValue: false,
      label: {
        en: 'Recommended',
        zh: '推荐',
        ja: 'おすすめ',
      },
      admin: {
        description: 'Highlight this plan as recommended',
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
        description: 'Lower numbers appear first',
      },
    },
  ],
}
