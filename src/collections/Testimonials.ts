import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'userName',
    defaultColumns: ['userName', 'company', 'rating', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'userName',
      type: 'text',
      required: true,
      localized: true,
      label: {
        en: 'User Name',
        zh: '用户名',
        ja: 'ユーザー名',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: {
        en: 'Avatar',
        zh: '头像',
        ja: 'アバター',
      },
    },
    {
      name: 'position',
      type: 'text',
      required: true,
      localized: true,
      label: {
        en: 'Position',
        zh: '职位',
        ja: '役職',
      },
    },
    {
      name: 'company',
      type: 'text',
      required: true,
      localized: true,
      label: {
        en: 'Company',
        zh: '公司',
        ja: '会社',
      },
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      localized: true,
      label: {
        en: 'Testimonial Content',
        zh: '评价内容',
        ja: '評価内容',
      },
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      defaultValue: 5,
      label: {
        en: 'Rating (1-5)',
        zh: '评分 (1-5)',
        ja: '評価 (1-5)',
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
  ],
}
