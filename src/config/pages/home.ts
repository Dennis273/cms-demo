import type { HomePageConfig } from '../types'

export const homePageConfig: HomePageConfig = {
  hero: {
    title: {
      zh: '企业邮箱，从此不同',
      en: 'Enterprise Email, Reimagined',
      ja: '企業メール、新しいカタチ',
    },
    subtitle: {
      zh: '安全、高效、智能的企业邮箱解决方案，助力团队协作更上一层楼',
      en: 'Secure, efficient, and intelligent enterprise email solution that takes team collaboration to the next level',
      ja: '安全で効率的、インテリジェントな企業メールソリューションで、チームコラボレーションを次のレベルへ',
    },
    backgroundImage: '/images/hero-bg.jpg',
    primaryCTA: {
      text: {
        zh: '免费试用',
        en: 'Start Free Trial',
        ja: '無料トライアル',
      },
      link: '/plans',
    },
    secondaryCTA: {
      text: {
        zh: '了解更多',
        en: 'Learn More',
        ja: '詳しく見る',
      },
      link: '/docs',
    },
  },
  features: [
    {
      icon: '🔒',
      title: {
        zh: '企业级安全',
        en: 'Enterprise Security',
        ja: 'エンタープライズセキュリティ',
      },
      description: {
        zh: '端到端加密、多因素认证、高级威胁防护，全方位保障企业数据安全',
        en: 'End-to-end encryption, multi-factor authentication, and advanced threat protection for complete data security',
        ja: 'エンドツーエンド暗号化、多要素認証、高度な脅威対策で完全なデータセキュリティを実現',
      },
    },
    {
      icon: '⚡',
      title: {
        zh: '极速性能',
        en: 'Lightning Fast',
        ja: '超高速パフォーマンス',
      },
      description: {
        zh: '全球分布式架构，毫秒级响应，无论身处何地都能享受流畅体验',
        en: 'Globally distributed architecture with millisecond response times for a smooth experience anywhere',
        ja: 'グローバル分散アーキテクチャ、ミリ秒単位のレスポンス、どこにいてもスムーズな体験',
      },
    },
    {
      icon: '🤖',
      title: {
        zh: 'AI 智能助手',
        en: 'AI Assistant',
        ja: 'AIアシスタント',
      },
      description: {
        zh: '智能分类、自动回复、日程管理，让 AI 成为你的邮件管家',
        en: 'Smart categorization, auto-reply, and schedule management - let AI be your email butler',
        ja: 'スマート分類、自動返信、スケジュール管理 - AIをあなたのメール執事に',
      },
    },
    {
      icon: '🔗',
      title: {
        zh: '无缝集成',
        en: 'Seamless Integration',
        ja: 'シームレス統合',
      },
      description: {
        zh: '与主流办公软件无缝对接，一键同步日历、通讯录、文件',
        en: 'Seamlessly integrates with major office software, syncing calendars, contacts, and files with one click',
        ja: '主要なオフィスソフトとシームレスに連携、カレンダー、連絡先、ファイルをワンクリックで同期',
      },
    },
    {
      icon: '📱',
      title: {
        zh: '多端同步',
        en: 'Multi-device Sync',
        ja: 'マルチデバイス同期',
      },
      description: {
        zh: '网页、桌面、移动端全平台支持，随时随地处理邮件',
        en: 'Full support for web, desktop, and mobile platforms - handle emails anytime, anywhere',
        ja: 'Web、デスクトップ、モバイル全プラットフォーム対応、いつでもどこでもメール処理',
      },
    },
    {
      icon: '📊',
      title: {
        zh: '数据分析',
        en: 'Analytics',
        ja: '分析ダッシュボード',
      },
      description: {
        zh: '深入洞察团队沟通效率，智能报告助力管理决策',
        en: 'Deep insights into team communication efficiency with intelligent reports for management decisions',
        ja: 'チームコミュニケーション効率の深い洞察、インテリジェントレポートで経営判断をサポート',
      },
    },
  ],
  stats: [
    {
      value: '10,000+',
      label: { zh: '企业用户', en: 'Enterprise Users', ja: '企業ユーザー' },
    },
    {
      value: '99.99%',
      label: { zh: '服务可用性', en: 'Uptime', ja: '稼働率' },
    },
    {
      value: '50M+',
      label: { zh: '日处理邮件', en: 'Daily Emails', ja: '日次メール処理' },
    },
    {
      value: '24/7',
      label: { zh: '技术支持', en: 'Support', ja: 'サポート' },
    },
  ],
  clientLogos: [
    { name: 'TechCorp', logo: '/images/clients/techcorp.svg' },
    { name: 'GlobalBank', logo: '/images/clients/globalbank.svg' },
    { name: 'StartupHub', logo: '/images/clients/startuphub.svg' },
    { name: 'DesignStudio', logo: '/images/clients/designstudio.svg' },
  ],
  seo: {
    zh: {
      metaTitle: '喵喵企业邮箱 - 安全可靠的企业邮箱解决方案',
      metaDescription: '喵喵企业邮箱提供安全、高效、智能的企业邮箱服务，支持多端同步、AI 智能助手等功能。',
      faq: [
        {
          question: '喵喵企业邮箱有什么特点？',
          answer: '喵喵企业邮箱提供企业级安全保护、极速性能、AI 智能助手、无缝集成等功能，是现代企业的理想选择。',
        },
        {
          question: '如何开始使用？',
          answer: '您可以点击"免费试用"按钮，注册账户后即可开始 14 天免费试用期。',
        },
      ],
    },
    en: {
      metaTitle: 'MeowMail - Secure Enterprise Email Solution',
      metaDescription: 'MeowMail provides secure, efficient, and intelligent enterprise email services with multi-device sync, AI assistant, and more.',
      faq: [
        {
          question: 'What makes MeowMail special?',
          answer: 'MeowMail offers enterprise-grade security, lightning-fast performance, AI assistant, and seamless integrations - the ideal choice for modern businesses.',
        },
        {
          question: 'How do I get started?',
          answer: 'Click the "Start Free Trial" button and register an account to begin your 14-day free trial.',
        },
      ],
    },
    ja: {
      metaTitle: 'ニャンメール - 安全な企業メールソリューション',
      metaDescription: 'ニャンメールは、マルチデバイス同期、AIアシスタントなどを備えた、安全で効率的、インテリジェントな企業メールサービスを提供します。',
      faq: [
        {
          question: 'ニャンメールの特徴は？',
          answer: 'ニャンメールは、エンタープライズグレードのセキュリティ、超高速パフォーマンス、AIアシスタント、シームレスな統合を提供します。',
        },
        {
          question: '始め方は？',
          answer: '「無料トライアル」ボタンをクリックし、アカウントを登録すると14日間の無料トライアルが開始されます。',
        },
      ],
    },
  },
}
