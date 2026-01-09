import type { Testimonial } from '../types'

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    userName: {
      zh: '张明',
      en: 'Zhang Ming',
      ja: '張明',
    },
    avatar: '/images/avatars/zhang-ming.jpg',
    position: {
      zh: '技术总监',
      en: 'CTO',
      ja: 'CTO',
    },
    company: {
      zh: '创新科技有限公司',
      en: 'Innovation Tech Co.',
      ja: 'イノベーションテック株式会社',
    },
    content: {
      zh: '喵喵企业邮箱帮助我们团队大幅提升了沟通效率，AI 智能分类功能让我每天节省了至少一个小时处理邮件的时间。',
      en: 'MeowMail has significantly improved our team communication. The AI smart categorization saves me at least an hour every day handling emails.',
      ja: 'ニャンメールでチームのコミュニケーション効率が大幅に向上しました。AIスマート分類機能で毎日少なくとも1時間のメール処理時間を節約できています。',
    },
    rating: 5,
    order: 1,
  },
  {
    id: 'testimonial-2',
    userName: {
      zh: '李婷',
      en: 'Li Ting',
      ja: '李婷',
    },
    avatar: '/images/avatars/li-ting.jpg',
    position: {
      zh: '运营经理',
      en: 'Operations Manager',
      ja: 'オペレーションマネージャー',
    },
    company: {
      zh: '环球贸易集团',
      en: 'Global Trade Group',
      ja: 'グローバルトレードグループ',
    },
    content: {
      zh: '作为一家跨国企业，我们需要一个可靠且安全的邮件系统。喵喵邮箱的多语言支持和全球节点让我们的国际业务沟通变得无比顺畅。',
      en: 'As a multinational company, we needed a reliable and secure email system. MeowMail\'s multilingual support and global nodes make our international business communication incredibly smooth.',
      ja: '多国籍企業として、信頼性が高く安全なメールシステムが必要でした。ニャンメールの多言語サポートとグローバルノードにより、国際ビジネスコミュニケーションが非常にスムーズになりました。',
    },
    rating: 5,
    order: 2,
  },
  {
    id: 'testimonial-3',
    userName: {
      zh: '王强',
      en: 'Wang Qiang',
      ja: '王強',
    },
    avatar: '/images/avatars/wang-qiang.jpg',
    position: {
      zh: 'IT 主管',
      en: 'IT Director',
      ja: 'IT部長',
    },
    company: {
      zh: '未来教育科技',
      en: 'Future Education Tech',
      ja: 'フューチャーエデュケーションテック',
    },
    content: {
      zh: '迁移到喵喵邮箱后，我们的邮件系统稳定性有了质的飞跃。99.99% 的可用性让我们再也不用担心邮件服务中断问题。',
      en: 'After migrating to MeowMail, our email system stability improved dramatically. The 99.99% uptime means we never worry about email service interruptions anymore.',
      ja: 'ニャンメールに移行後、メールシステムの安定性が劇的に向上しました。99.99%の稼働率で、メールサービスの中断を心配する必要がなくなりました。',
    },
    rating: 5,
    order: 3,
  },
]
