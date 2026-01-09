import type { Showcase } from '../types'

export const showcases: Showcase[] = [
  {
    id: 'showcase-1',
    companyName: {
      zh: '创新科技有限公司',
      en: 'Innovation Tech Co.',
      ja: 'イノベーションテック株式会社',
    },
    logo: '/images/showcases/innovation-tech.svg',
    industry: {
      zh: '科技',
      en: 'Technology',
      ja: 'テクノロジー',
    },
    companySize: '51-200',
    description: {
      zh: '作为一家快速成长的科技公司，我们选择喵喵企业邮箱来支撑团队的高效协作。AI 智能助手帮助我们的工程师快速处理技术邮件，节省大量时间用于核心开发工作。',
      en: 'As a fast-growing tech company, we chose MeowMail to support efficient team collaboration. The AI assistant helps our engineers quickly handle technical emails, saving valuable time for core development work.',
      ja: '急成長中のテック企業として、効率的なチームコラボレーションのためにニャンメールを選びました。AIアシスタントがエンジニアの技術メール処理を効率化し、コア開発作業に集中できる時間を確保しています。',
    },
    website: 'https://example.com/innovation-tech',
    order: 1,
  },
  {
    id: 'showcase-2',
    companyName: {
      zh: '环球贸易集团',
      en: 'Global Trade Group',
      ja: 'グローバルトレードグループ',
    },
    logo: '/images/showcases/global-trade.svg',
    industry: {
      zh: '国际贸易',
      en: 'International Trade',
      ja: '国際貿易',
    },
    companySize: '201-500',
    description: {
      zh: '我们的业务遍布全球 30 多个国家，喵喵邮箱的全球分布式架构确保了无论在哪个时区，我们的团队都能快速、稳定地收发邮件。多语言界面也让我们的国际员工使用起来更加便捷。',
      en: 'With operations in over 30 countries, MeowMail\'s globally distributed architecture ensures our team can send and receive emails quickly and reliably in any time zone. The multilingual interface also makes it convenient for our international staff.',
      ja: '30カ国以上で事業を展開する当社にとって、ニャンメールのグローバル分散アーキテクチャにより、どのタイムゾーンでもチームが迅速かつ確実にメールを送受信できます。多言語インターフェースも国際スタッフにとって便利です。',
    },
    website: 'https://example.com/global-trade',
    order: 2,
  },
  {
    id: 'showcase-3',
    companyName: {
      zh: '未来教育科技',
      en: 'Future Education Tech',
      ja: 'フューチャーエデュケーションテック',
    },
    logo: '/images/showcases/future-edu.svg',
    industry: {
      zh: '教育科技',
      en: 'EdTech',
      ja: 'エドテック',
    },
    companySize: '11-50',
    description: {
      zh: '作为一家在线教育平台，我们需要与数千名教师和学生保持高效沟通。喵喵邮箱的群组邮件和自动化功能大大简化了我们的通知流程，家校沟通变得更加顺畅。',
      en: 'As an online education platform, we need to maintain efficient communication with thousands of teachers and students. MeowMail\'s group email and automation features have greatly simplified our notification process, making parent-school communication much smoother.',
      ja: 'オンライン教育プラットフォームとして、数千人の教師や生徒との効率的なコミュニケーションが必要です。ニャンメールのグループメールと自動化機能により、通知プロセスが大幅に簡素化され、学校と保護者間のコミュニケーションがスムーズになりました。',
    },
    website: 'https://example.com/future-edu',
    order: 3,
  },
]
