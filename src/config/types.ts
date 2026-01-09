// 配置文件类型定义

export type Locale = 'zh' | 'en' | 'ja'

export type LocalizedString = Record<Locale, string>
export type LocalizedContent<T> = Record<Locale, T>

// SEO 类型
export interface SEOConfig {
  metaTitle?: string
  metaDescription?: string
  ogImage?: string
  canonicalURL?: string
  noIndex?: boolean
  faq?: Array<{
    question: string
    answer: string
  }>
}

// 站点设置
export interface SiteConfig {
  siteName: LocalizedString
  siteDescription: LocalizedString
  favicon?: string
  ogImage?: string
  defaultCurrency: 'USD' | 'CNY' | 'JPY'
  contactEmail?: string
  supportEmail?: string
  analytics?: {
    googleAnalyticsId?: string
  }
}

// 导航配置
export interface NavItem {
  label: LocalizedString
  link?: string
  openInNewTab?: boolean
  highlight?: boolean
  children?: Array<{
    label: LocalizedString
    link: string
    openInNewTab?: boolean
  }>
}

export interface NavigationConfig {
  logo?: string
  logoText: LocalizedString
  items: NavItem[]
}

// 页脚配置
export interface FooterColumn {
  title: LocalizedString
  links: Array<{
    label: LocalizedString
    link: string
    openInNewTab?: boolean
  }>
}

export interface SocialLink {
  platform: 'twitter' | 'facebook' | 'linkedin' | 'github' | 'youtube' | 'instagram' | 'wechat' | 'weibo'
  url: string
}

export interface FooterConfig {
  columns: FooterColumn[]
  socialLinks: SocialLink[]
  copyright: LocalizedString
  bottomLinks: Array<{
    label: LocalizedString
    link: string
  }>
}

// 首页配置
export interface HomePageConfig {
  hero: {
    title: LocalizedString
    subtitle: LocalizedString
    backgroundImage?: string
    primaryCTA: {
      text: LocalizedString
      link: string
    }
    secondaryCTA?: {
      text: LocalizedString
      link: string
    }
  }
  features: Array<{
    icon?: string
    title: LocalizedString
    description: LocalizedString
  }>
  stats: Array<{
    value: string
    label: LocalizedString
  }>
  clientLogos: Array<{
    name: string
    logo: string
  }>
  seo: LocalizedContent<SEOConfig>
}

// 定价方案
export interface PlanPricing {
  USD: { monthly: number; yearly: number }
  CNY: { monthly: number; yearly: number }
  JPY: { monthly: number; yearly: number }
}

export interface PlanFeature {
  name: LocalizedString
  included: boolean
}

export interface Plan {
  id: string
  name: LocalizedString
  slug: string
  description: LocalizedString
  pricing: PlanPricing
  limits: {
    users: number
    storage: number
  }
  features: PlanFeature[]
  isRecommended: boolean
  order: number
}

// 定价页面配置
export interface PlansPageConfig {
  title: LocalizedString
  subtitle: LocalizedString
  seo: LocalizedContent<SEOConfig>
}

// 文档分类
export interface DocCategory {
  id: string
  name: LocalizedString
  slug: string
  description: LocalizedString
  icon?: string
  order: number
}

// 文档
export interface Doc {
  id: string
  title: LocalizedString
  slug: string
  categorySlug: string
  excerpt: LocalizedString
  contentFile: string // Markdown 文件路径（相对于 content/docs）
  order: number
  seo?: LocalizedContent<SEOConfig>
}

// 文档页面配置
export interface DocsPageConfig {
  title: LocalizedString
  subtitle: LocalizedString
  seo: LocalizedContent<SEOConfig>
}

// 客户案例
export interface Showcase {
  id: string
  companyName: LocalizedString
  logo?: string
  industry: LocalizedString
  companySize?: '1-10' | '11-50' | '51-200' | '201-500' | '500+'
  description: LocalizedString // 简单文本，不再使用富文本
  website?: string
  order: number
}

// 案例页面配置
export interface ShowcasePageConfig {
  title: LocalizedString
  subtitle: LocalizedString
  seo: LocalizedContent<SEOConfig>
}

// 用户评价
export interface Testimonial {
  id: string
  userName: LocalizedString
  avatar?: string
  position: LocalizedString
  company: LocalizedString
  content: LocalizedString
  rating: number
  order: number
}

// 导出所有配置的聚合类型
export interface SiteData {
  site: SiteConfig
  navigation: NavigationConfig
  footer: FooterConfig
}

export interface PageData {
  home: HomePageConfig
  plans: PlansPageConfig
  docs: DocsPageConfig
  showcase: ShowcasePageConfig
}

export interface ContentData {
  plans: Plan[]
  docCategories: DocCategory[]
  docs: Doc[]
  showcases: Showcase[]
  testimonials: Testimonial[]
}
