import type { SiteConfig, NavigationConfig, FooterConfig } from './types'

export const siteConfig: SiteConfig = {
  siteName: {
    zh: '喵喵企业邮箱',
    en: 'MeowMail',
    ja: 'ニャンニャンメール',
  },
  siteDescription: {
    zh: '安全、可靠、易用的企业邮箱解决方案',
    en: 'Secure, reliable, and easy-to-use enterprise email solution',
    ja: '安全で信頼性の高い、使いやすい企業メールソリューション',
  },
  favicon: '/favicon.ico',
  ogImage: '/images/og-image.png',
  defaultCurrency: 'USD',
  contactEmail: 'contact@meowmail.com',
  supportEmail: 'support@meowmail.com',
  analytics: {
    googleAnalyticsId: '',
  },
}

export const navigationConfig: NavigationConfig = {
  logo: '/images/logo.svg',
  logoText: {
    zh: '喵喵邮箱',
    en: 'MeowMail',
    ja: 'ニャンメール',
  },
  items: [
    {
      label: { zh: '功能', en: 'Features', ja: '機能' },
      link: '/#features',
    },
    {
      label: { zh: '定价', en: 'Pricing', ja: '料金' },
      link: '/plans',
    },
    {
      label: { zh: '文档', en: 'Docs', ja: 'ドキュメント' },
      link: '/docs',
    },
    {
      label: { zh: '案例', en: 'Showcase', ja: '導入事例' },
      link: '/showcase',
    },
    {
      label: { zh: '开始使用', en: 'Get Started', ja: '始める' },
      link: '/plans',
      highlight: true,
    },
  ],
}

export const footerConfig: FooterConfig = {
  columns: [
    {
      title: { zh: '产品', en: 'Product', ja: '製品' },
      links: [
        { label: { zh: '功能', en: 'Features', ja: '機能' }, link: '/#features' },
        { label: { zh: '定价', en: 'Pricing', ja: '料金' }, link: '/plans' },
        { label: { zh: '安全', en: 'Security', ja: 'セキュリティ' }, link: '/docs/security' },
      ],
    },
    {
      title: { zh: '资源', en: 'Resources', ja: 'リソース' },
      links: [
        { label: { zh: '文档', en: 'Documentation', ja: 'ドキュメント' }, link: '/docs' },
        { label: { zh: '案例', en: 'Showcase', ja: '導入事例' }, link: '/showcase' },
        { label: { zh: '博客', en: 'Blog', ja: 'ブログ' }, link: '/blog' },
      ],
    },
    {
      title: { zh: '公司', en: 'Company', ja: '会社' },
      links: [
        { label: { zh: '关于我们', en: 'About', ja: '会社概要' }, link: '/about' },
        { label: { zh: '联系我们', en: 'Contact', ja: 'お問い合わせ' }, link: '/contact' },
        { label: { zh: '招聘', en: 'Careers', ja: '採用情報' }, link: '/careers' },
      ],
    },
  ],
  socialLinks: [
    { platform: 'twitter', url: 'https://twitter.com/meowmail' },
    { platform: 'github', url: 'https://github.com/meowmail' },
    { platform: 'linkedin', url: 'https://linkedin.com/company/meowmail' },
  ],
  copyright: {
    zh: '© 2024 喵喵邮箱。保留所有权利。',
    en: '© 2024 MeowMail. All rights reserved.',
    ja: '© 2024 ニャンメール。全著作権所有。',
  },
  bottomLinks: [
    { label: { zh: '隐私政策', en: 'Privacy Policy', ja: 'プライバシーポリシー' }, link: '/privacy' },
    { label: { zh: '服务条款', en: 'Terms of Service', ja: '利用規約' }, link: '/terms' },
  ],
}
