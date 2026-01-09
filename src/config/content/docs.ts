import type { DocCategory, Doc } from '../types'

export const docCategories: DocCategory[] = [
  {
    id: 'getting-started',
    name: {
      zh: '快速入门',
      en: 'Getting Started',
      ja: 'はじめに',
    },
    slug: 'getting-started',
    description: {
      zh: '从零开始，快速上手喵喵企业邮箱',
      en: 'Get up and running with MeowMail from scratch',
      ja: 'ゼロからニャンメールを始める',
    },
    icon: '🚀',
    order: 1,
  },
  {
    id: 'features',
    name: {
      zh: '功能指南',
      en: 'Feature Guide',
      ja: '機能ガイド',
    },
    slug: 'features',
    description: {
      zh: '深入了解各项功能的使用方法',
      en: 'Learn how to use all features in depth',
      ja: 'すべての機能の使い方を詳しく学ぶ',
    },
    icon: '📖',
    order: 2,
  },
  {
    id: 'security',
    name: {
      zh: '安全与隐私',
      en: 'Security & Privacy',
      ja: 'セキュリティとプライバシー',
    },
    slug: 'security',
    description: {
      zh: '了解我们如何保护您的数据安全',
      en: 'Learn how we protect your data',
      ja: 'データ保護の仕組みを学ぶ',
    },
    icon: '🔒',
    order: 3,
  },
  {
    id: 'faq',
    name: {
      zh: '常见问题',
      en: 'FAQ',
      ja: 'よくある質問',
    },
    slug: 'faq',
    description: {
      zh: '常见问题的解答',
      en: 'Answers to frequently asked questions',
      ja: 'よくある質問への回答',
    },
    icon: '❓',
    order: 4,
  },
]

export const docs: Doc[] = [
  // Getting Started
  {
    id: 'doc-1',
    title: {
      zh: '创建账户',
      en: 'Create an Account',
      ja: 'アカウントの作成',
    },
    slug: 'create-account',
    categorySlug: 'getting-started',
    excerpt: {
      zh: '了解如何创建您的喵喵企业邮箱账户',
      en: 'Learn how to create your MeowMail account',
      ja: 'ニャンメールアカウントの作成方法を学ぶ',
    },
    contentFile: 'getting-started/create-account',
    order: 1,
  },
  {
    id: 'doc-2',
    title: {
      zh: '配置域名',
      en: 'Configure Domain',
      ja: 'ドメインの設定',
    },
    slug: 'configure-domain',
    categorySlug: 'getting-started',
    excerpt: {
      zh: '将您的企业域名与喵喵邮箱绑定',
      en: 'Bind your enterprise domain with MeowMail',
      ja: '企業ドメインをニャンメールにバインドする',
    },
    contentFile: 'getting-started/configure-domain',
    order: 2,
  },
  {
    id: 'doc-3',
    title: {
      zh: '邀请团队成员',
      en: 'Invite Team Members',
      ja: 'チームメンバーの招待',
    },
    slug: 'invite-team',
    categorySlug: 'getting-started',
    excerpt: {
      zh: '邀请同事加入您的企业邮箱团队',
      en: 'Invite colleagues to join your enterprise email team',
      ja: '同僚を企業メールチームに招待する',
    },
    contentFile: 'getting-started/invite-team',
    order: 3,
  },
  // Features
  {
    id: 'doc-4',
    title: {
      zh: 'AI 智能助手',
      en: 'AI Assistant',
      ja: 'AIアシスタント',
    },
    slug: 'ai-assistant',
    categorySlug: 'features',
    excerpt: {
      zh: '使用 AI 助手提升邮件处理效率',
      en: 'Use AI assistant to improve email handling efficiency',
      ja: 'AIアシスタントでメール処理効率を向上させる',
    },
    contentFile: 'features/ai-assistant',
    order: 1,
  },
  {
    id: 'doc-5',
    title: {
      zh: '日历集成',
      en: 'Calendar Integration',
      ja: 'カレンダー統合',
    },
    slug: 'calendar-integration',
    categorySlug: 'features',
    excerpt: {
      zh: '将邮件与日历无缝集成',
      en: 'Seamlessly integrate email with calendar',
      ja: 'メールとカレンダーのシームレスな統合',
    },
    contentFile: 'features/calendar-integration',
    order: 2,
  },
  // Security
  {
    id: 'doc-6',
    title: {
      zh: '双因素认证',
      en: 'Two-Factor Authentication',
      ja: '二要素認証',
    },
    slug: 'two-factor-auth',
    categorySlug: 'security',
    excerpt: {
      zh: '启用双因素认证保护您的账户',
      en: 'Enable two-factor authentication to protect your account',
      ja: '二要素認証を有効にしてアカウントを保護する',
    },
    contentFile: 'security/two-factor-auth',
    order: 1,
  },
  {
    id: 'doc-7',
    title: {
      zh: '数据加密',
      en: 'Data Encryption',
      ja: 'データ暗号化',
    },
    slug: 'data-encryption',
    categorySlug: 'security',
    excerpt: {
      zh: '了解我们如何加密保护您的数据',
      en: 'Learn how we encrypt and protect your data',
      ja: 'データの暗号化と保護の仕組みを学ぶ',
    },
    contentFile: 'security/data-encryption',
    order: 2,
  },
  // FAQ
  {
    id: 'doc-8',
    title: {
      zh: '账户与计费',
      en: 'Account & Billing',
      ja: 'アカウントと請求',
    },
    slug: 'account-billing',
    categorySlug: 'faq',
    excerpt: {
      zh: '关于账户管理和付款的常见问题',
      en: 'Common questions about account management and payment',
      ja: 'アカウント管理と支払いに関するよくある質問',
    },
    contentFile: 'faq/account-billing',
    order: 1,
  },
]
