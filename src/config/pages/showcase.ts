import type { ShowcasePageConfig } from '../types'

export const showcasePageConfig: ShowcasePageConfig = {
  title: {
    zh: '客户案例',
    en: 'Customer Showcase',
    ja: '導入事例',
  },
  subtitle: {
    zh: '看看这些企业如何使用喵喵企业邮箱提升工作效率',
    en: 'See how these companies use MeowMail to boost productivity',
    ja: 'これらの企業がニャンメールでどのように生産性を向上させているかをご覧ください',
  },
  seo: {
    zh: {
      metaTitle: '客户案例 - 喵喵企业邮箱',
      metaDescription: '了解各行业企业如何使用喵喵企业邮箱，查看真实客户的使用案例和评价。',
      faq: [
        {
          question: '哪些行业的企业在使用喵喵邮箱？',
          answer: '我们的客户遍布科技、金融、教育、医疗等各个行业，从初创公司到大型企业都有。',
        },
        {
          question: '如何成为展示案例？',
          answer: '如果您愿意分享使用体验，请联系我们的市场团队，我们很乐意展示您的故事。',
        },
      ],
    },
    en: {
      metaTitle: 'Customer Showcase - MeowMail',
      metaDescription: 'Learn how companies across industries use MeowMail. View real customer cases and testimonials.',
      faq: [
        {
          question: 'What industries use MeowMail?',
          answer: 'Our customers span tech, finance, education, healthcare, and more - from startups to enterprises.',
        },
        {
          question: 'How can I become a featured case?',
          answer: 'If you would like to share your experience, contact our marketing team - we would love to feature your story.',
        },
      ],
    },
    ja: {
      metaTitle: '導入事例 - ニャンメール',
      metaDescription: '様々な業界の企業がニャンメールをどのように活用しているかをご覧ください。',
      faq: [
        {
          question: 'どの業界の企業がニャンメールを使用していますか？',
          answer: 'テクノロジー、金融、教育、医療など、スタートアップから大企業まで幅広いお客様にご利用いただいています。',
        },
        {
          question: '導入事例として紹介されるには？',
          answer: 'ご利用体験を共有いただける場合は、マーケティングチームにお問い合わせください。',
        },
      ],
    },
  },
}
