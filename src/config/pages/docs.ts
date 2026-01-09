import type { DocsPageConfig } from '../types'

export const docsPageConfig: DocsPageConfig = {
  title: {
    zh: '帮助文档',
    en: 'Documentation',
    ja: 'ドキュメント',
  },
  subtitle: {
    zh: '了解如何使用喵喵企业邮箱的所有功能',
    en: 'Learn how to use all features of MeowMail',
    ja: 'ニャンメールのすべての機能の使い方を学ぶ',
  },
  seo: {
    zh: {
      metaTitle: '帮助文档 - 喵喵企业邮箱',
      metaDescription: '查看喵喵企业邮箱的帮助文档，快速上手各项功能。',
      faq: [
        {
          question: '如何快速上手？',
          answer: '请查看"快速入门"分类下的文档，按步骤操作即可完成基础设置。',
        },
        {
          question: '遇到问题怎么办？',
          answer: '您可以查看常见问题分类，或联系我们的客服团队获取帮助。',
        },
      ],
    },
    en: {
      metaTitle: 'Documentation - MeowMail',
      metaDescription: 'Browse MeowMail documentation to quickly get started with all features.',
      faq: [
        {
          question: 'How do I get started quickly?',
          answer: 'Check out the "Getting Started" category and follow the step-by-step guides.',
        },
        {
          question: 'What if I encounter issues?',
          answer: 'Browse our FAQ section or contact our support team for help.',
        },
      ],
    },
    ja: {
      metaTitle: 'ドキュメント - ニャンメール',
      metaDescription: 'ニャンメールのドキュメントを参照して、すべての機能をすぐに使い始めましょう。',
      faq: [
        {
          question: 'すぐに始めるには？',
          answer: '「はじめに」カテゴリのドキュメントを確認し、ステップバイステップで設定を完了してください。',
        },
        {
          question: '問題が発生したら？',
          answer: 'よくある質問を確認するか、サポートチームにお問い合わせください。',
        },
      ],
    },
  },
}
