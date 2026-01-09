import type { Plan } from '../types'

export const plans: Plan[] = [
  {
    id: 'free',
    name: {
      zh: '免费版',
      en: 'Free',
      ja: '無料版',
    },
    slug: 'free',
    description: {
      zh: '适合个人和小型团队试用',
      en: 'Perfect for individuals and small teams to try',
      ja: '個人や小規模チームのお試しに最適',
    },
    pricing: {
      USD: { monthly: 0, yearly: 0 },
      CNY: { monthly: 0, yearly: 0 },
      JPY: { monthly: 0, yearly: 0 },
    },
    limits: {
      users: 5,
      storage: 5,
    },
    features: [
      { name: { zh: '基础邮件功能', en: 'Basic email features', ja: '基本メール機能' }, included: true },
      { name: { zh: '5GB 存储空间', en: '5GB storage', ja: '5GBストレージ' }, included: true },
      { name: { zh: '社区支持', en: 'Community support', ja: 'コミュニティサポート' }, included: true },
      { name: { zh: '自定义域名', en: 'Custom domain', ja: 'カスタムドメイン' }, included: false },
      { name: { zh: 'AI 智能助手', en: 'AI assistant', ja: 'AIアシスタント' }, included: false },
      { name: { zh: '高级安全功能', en: 'Advanced security', ja: '高度なセキュリティ' }, included: false },
    ],
    isRecommended: false,
    order: 1,
  },
  {
    id: 'pro',
    name: {
      zh: '专业版',
      en: 'Professional',
      ja: 'プロフェッショナル',
    },
    slug: 'pro',
    description: {
      zh: '适合成长中的团队和中小企业',
      en: 'Ideal for growing teams and SMBs',
      ja: '成長中のチームや中小企業に最適',
    },
    pricing: {
      USD: { monthly: 12, yearly: 120 },
      CNY: { monthly: 79, yearly: 790 },
      JPY: { monthly: 1500, yearly: 15000 },
    },
    limits: {
      users: 50,
      storage: 100,
    },
    features: [
      { name: { zh: '所有免费版功能', en: 'All Free features', ja: '無料版のすべての機能' }, included: true },
      { name: { zh: '100GB 存储空间', en: '100GB storage', ja: '100GBストレージ' }, included: true },
      { name: { zh: '自定义域名', en: 'Custom domain', ja: 'カスタムドメイン' }, included: true },
      { name: { zh: 'AI 智能助手', en: 'AI assistant', ja: 'AIアシスタント' }, included: true },
      { name: { zh: '优先邮件支持', en: 'Priority email support', ja: '優先メールサポート' }, included: true },
      { name: { zh: '高级安全功能', en: 'Advanced security', ja: '高度なセキュリティ' }, included: false },
    ],
    isRecommended: true,
    order: 2,
  },
  {
    id: 'enterprise',
    name: {
      zh: '企业版',
      en: 'Enterprise',
      ja: 'エンタープライズ',
    },
    slug: 'enterprise',
    description: {
      zh: '适合大型企业和组织',
      en: 'For large enterprises and organizations',
      ja: '大企業や組織向け',
    },
    pricing: {
      USD: { monthly: 49, yearly: 490 },
      CNY: { monthly: 329, yearly: 3290 },
      JPY: { monthly: 6000, yearly: 60000 },
    },
    limits: {
      users: 999,
      storage: 1000,
    },
    features: [
      { name: { zh: '所有专业版功能', en: 'All Professional features', ja: 'プロフェッショナル版のすべての機能' }, included: true },
      { name: { zh: '无限存储空间', en: 'Unlimited storage', ja: '無制限ストレージ' }, included: true },
      { name: { zh: '高级安全功能', en: 'Advanced security', ja: '高度なセキュリティ' }, included: true },
      { name: { zh: 'SSO 单点登录', en: 'SSO integration', ja: 'SSO統合' }, included: true },
      { name: { zh: '专属客户经理', en: 'Dedicated account manager', ja: '専任アカウントマネージャー' }, included: true },
      { name: { zh: 'SLA 保障', en: 'SLA guarantee', ja: 'SLA保証' }, included: true },
    ],
    isRecommended: false,
    order: 3,
  },
]
