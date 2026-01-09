import type { PlansPageConfig } from '../types'

export const plansPageConfig: PlansPageConfig = {
  title: {
    zh: '定价方案',
    en: 'Pricing Plans',
    ja: '料金プラン',
  },
  subtitle: {
    zh: '选择最适合您团队的方案，随时可以升级或降级',
    en: 'Choose the perfect plan for your team. Upgrade or downgrade anytime.',
    ja: 'チームに最適なプランをお選びください。いつでもアップグレード・ダウングレード可能です。',
  },
  seo: {
    zh: {
      metaTitle: '定价方案 - 喵喵企业邮箱',
      metaDescription: '查看喵喵企业邮箱的定价方案，从免费版到企业版，满足不同规模团队的需求。',
      faq: [
        {
          question: '可以免费试用吗？',
          answer: '是的，所有付费方案都提供 14 天免费试用，无需信用卡。',
        },
        {
          question: '如何升级或降级方案？',
          answer: '您可以随时在账户设置中更改方案，费用将按比例计算。',
        },
        {
          question: '支持哪些支付方式？',
          answer: '我们支持信用卡、支付宝、微信支付等多种支付方式。',
        },
      ],
    },
    en: {
      metaTitle: 'Pricing Plans - MeowMail',
      metaDescription: 'View MeowMail pricing plans, from free to enterprise, meeting the needs of teams of all sizes.',
      faq: [
        {
          question: 'Can I try it for free?',
          answer: 'Yes, all paid plans come with a 14-day free trial, no credit card required.',
        },
        {
          question: 'How do I upgrade or downgrade?',
          answer: 'You can change your plan anytime in account settings. Charges will be prorated.',
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept credit cards, PayPal, and bank transfers.',
        },
      ],
    },
    ja: {
      metaTitle: '料金プラン - ニャンメール',
      metaDescription: 'ニャンメールの料金プランをご覧ください。無料版からエンタープライズ版まで、あらゆる規模のチームのニーズに対応。',
      faq: [
        {
          question: '無料で試せますか？',
          answer: 'はい、すべての有料プランは14日間の無料トライアルが可能で、クレジットカードは不要です。',
        },
        {
          question: 'アップグレードやダウングレードはどうすればいいですか？',
          answer: 'アカウント設定でいつでもプランを変更できます。料金は日割り計算されます。',
        },
        {
          question: 'どの支払い方法に対応していますか？',
          answer: 'クレジットカード、PayPal、銀行振込に対応しています。',
        },
      ],
    },
  },
}
