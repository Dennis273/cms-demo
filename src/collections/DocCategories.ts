import type { CollectionConfig } from 'payload'

export const DocCategories: CollectionConfig = {
  slug: 'doc-categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'order'],
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
        en: 'Category Name',
        zh: '分类名称',
        ja: 'カテゴリ名',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier (e.g., "getting-started", "account", "api")',
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
      name: 'icon',
      type: 'text',
      label: {
        en: 'Icon',
        zh: '图标',
        ja: 'アイコン',
      },
      admin: {
        description: 'Icon name or emoji (e.g., "📚", "rocket", "settings")',
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
