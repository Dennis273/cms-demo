import { promises as fs } from 'fs'
import path from 'path'
import type { Locale, LocalizedString, LocalizedContent } from '@/config/types'
import {
  siteConfig,
  navigationConfig,
  footerConfig,
  homePageConfig,
  plansPageConfig,
  docsPageConfig,
  showcasePageConfig,
  plans,
  testimonials,
  showcases,
  docCategories,
  docs,
} from '@/config'

// 获取本地化字符串
export function getLocalizedString(value: LocalizedString, locale: Locale): string {
  return value[locale] || value.en
}

// 获取本地化内容
export function getLocalizedContent<T>(value: LocalizedContent<T>, locale: Locale): T {
  return value[locale] || value.en
}

// 站点配置
export function getSiteConfig(locale: Locale) {
  return {
    siteName: getLocalizedString(siteConfig.siteName, locale),
    siteDescription: getLocalizedString(siteConfig.siteDescription, locale),
    favicon: siteConfig.favicon,
    ogImage: siteConfig.ogImage,
    defaultCurrency: siteConfig.defaultCurrency,
    contactEmail: siteConfig.contactEmail,
    supportEmail: siteConfig.supportEmail,
    analytics: siteConfig.analytics,
  }
}

// 导航配置
export function getNavigationConfig(locale: Locale) {
  return {
    logo: navigationConfig.logo,
    logoText: getLocalizedString(navigationConfig.logoText, locale),
    items: navigationConfig.items.map(item => ({
      label: getLocalizedString(item.label, locale),
      link: item.link,
      openInNewTab: item.openInNewTab,
      highlight: item.highlight,
      children: item.children?.map(child => ({
        label: getLocalizedString(child.label, locale),
        link: child.link,
        openInNewTab: child.openInNewTab,
      })),
    })),
  }
}

// 页脚配置
export function getFooterConfig(locale: Locale) {
  return {
    columns: footerConfig.columns.map(column => ({
      title: getLocalizedString(column.title, locale),
      links: column.links.map(link => ({
        label: getLocalizedString(link.label, locale),
        link: link.link,
        openInNewTab: link.openInNewTab,
      })),
    })),
    socialLinks: footerConfig.socialLinks,
    copyright: getLocalizedString(footerConfig.copyright, locale),
    bottomLinks: footerConfig.bottomLinks.map(link => ({
      label: getLocalizedString(link.label, locale),
      link: link.link,
    })),
  }
}

// 首页配置
export function getHomePageConfig(locale: Locale) {
  return {
    hero: {
      title: getLocalizedString(homePageConfig.hero.title, locale),
      subtitle: getLocalizedString(homePageConfig.hero.subtitle, locale),
      backgroundImage: homePageConfig.hero.backgroundImage,
      primaryCTA: {
        text: getLocalizedString(homePageConfig.hero.primaryCTA.text, locale),
        link: homePageConfig.hero.primaryCTA.link,
      },
      secondaryCTA: homePageConfig.hero.secondaryCTA ? {
        text: getLocalizedString(homePageConfig.hero.secondaryCTA.text, locale),
        link: homePageConfig.hero.secondaryCTA.link,
      } : undefined,
    },
    features: homePageConfig.features.map(feature => ({
      icon: feature.icon,
      title: getLocalizedString(feature.title, locale),
      description: getLocalizedString(feature.description, locale),
    })),
    stats: homePageConfig.stats.map(stat => ({
      value: stat.value,
      label: getLocalizedString(stat.label, locale),
    })),
    clientLogos: homePageConfig.clientLogos,
    seo: getLocalizedContent(homePageConfig.seo, locale),
  }
}

// 定价页配置
export function getPlansPageConfig(locale: Locale) {
  return {
    title: getLocalizedString(plansPageConfig.title, locale),
    subtitle: getLocalizedString(plansPageConfig.subtitle, locale),
    seo: getLocalizedContent(plansPageConfig.seo, locale),
  }
}

// 文档页配置
export function getDocsPageConfig(locale: Locale) {
  return {
    title: getLocalizedString(docsPageConfig.title, locale),
    subtitle: getLocalizedString(docsPageConfig.subtitle, locale),
    seo: getLocalizedContent(docsPageConfig.seo, locale),
  }
}

// 案例页配置
export function getShowcasePageConfig(locale: Locale) {
  return {
    title: getLocalizedString(showcasePageConfig.title, locale),
    subtitle: getLocalizedString(showcasePageConfig.subtitle, locale),
    seo: getLocalizedContent(showcasePageConfig.seo, locale),
  }
}

// 获取定价方案
export function getPlans(locale: Locale) {
  return plans
    .map(plan => ({
      id: plan.id,
      name: getLocalizedString(plan.name, locale),
      slug: plan.slug,
      description: getLocalizedString(plan.description, locale),
      pricing: plan.pricing,
      limits: plan.limits,
      features: plan.features.map(feature => ({
        name: getLocalizedString(feature.name, locale),
        included: feature.included,
      })),
      isRecommended: plan.isRecommended,
      order: plan.order,
    }))
    .sort((a, b) => a.order - b.order)
}

// 获取用户评价
export function getTestimonials(locale: Locale) {
  return testimonials
    .map(testimonial => ({
      id: testimonial.id,
      userName: getLocalizedString(testimonial.userName, locale),
      avatar: testimonial.avatar,
      position: getLocalizedString(testimonial.position, locale),
      company: getLocalizedString(testimonial.company, locale),
      content: getLocalizedString(testimonial.content, locale),
      rating: testimonial.rating,
      order: testimonial.order,
    }))
    .sort((a, b) => a.order - b.order)
}

// 获取客户案例
export function getShowcases(locale: Locale) {
  return showcases
    .map(showcase => ({
      id: showcase.id,
      companyName: getLocalizedString(showcase.companyName, locale),
      logo: showcase.logo,
      industry: getLocalizedString(showcase.industry, locale),
      companySize: showcase.companySize,
      description: getLocalizedString(showcase.description, locale),
      website: showcase.website,
      order: showcase.order,
    }))
    .sort((a, b) => a.order - b.order)
}

// 获取文档分类
export function getDocCategories(locale: Locale) {
  return docCategories
    .map(category => ({
      id: category.id,
      name: getLocalizedString(category.name, locale),
      slug: category.slug,
      description: getLocalizedString(category.description, locale),
      icon: category.icon,
      order: category.order,
    }))
    .sort((a, b) => a.order - b.order)
}

// 获取文档列表
export function getDocs(locale: Locale) {
  return docs
    .map(doc => ({
      id: doc.id,
      title: getLocalizedString(doc.title, locale),
      slug: doc.slug,
      categorySlug: doc.categorySlug,
      excerpt: getLocalizedString(doc.excerpt, locale),
      contentFile: doc.contentFile,
      order: doc.order,
    }))
    .sort((a, b) => a.order - b.order)
}

// 根据分类获取文档
export function getDocsByCategory(locale: Locale, categorySlug: string) {
  return getDocs(locale).filter(doc => doc.categorySlug === categorySlug)
}

// 根据 slug 获取单个文档
export function getDocBySlug(locale: Locale, slug: string) {
  const localizedDocs = getDocs(locale)
  return localizedDocs.find(doc => doc.slug === slug)
}

// 根据 slug 获取分类
export function getCategoryBySlug(locale: Locale, slug: string) {
  const categories = getDocCategories(locale)
  return categories.find(cat => cat.slug === slug)
}

// 读取文档 Markdown 内容
export async function getDocContent(locale: Locale, contentFile: string): Promise<string> {
  try {
    const filePath = path.join(process.cwd(), 'content', 'docs', contentFile.replace('/', `/${locale}/`) + '.md')
    const content = await fs.readFile(filePath, 'utf-8')
    return content
  } catch {
    // 如果找不到对应语言的文件，尝试读取英文版
    if (locale !== 'en') {
      try {
        const fallbackPath = path.join(process.cwd(), 'content', 'docs', contentFile.replace('/', '/en/') + '.md')
        return await fs.readFile(fallbackPath, 'utf-8')
      } catch {
        return '# Content Not Found\n\nThis document is not available yet.'
      }
    }
    return '# Content Not Found\n\nThis document is not available yet.'
  }
}

// 货币配置
export const currencySymbols: Record<string, string> = {
  USD: '$',
  CNY: '¥',
  JPY: '¥',
}

export const localeToCurrency: Record<Locale, string> = {
  zh: 'CNY',
  en: 'USD',
  ja: 'JPY',
}

// 验证 locale
export const locales: Locale[] = ['zh', 'en', 'ja']

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

export const localeNames: Record<Locale, string> = {
  zh: '简体中文',
  en: 'English',
  ja: '日本語',
}
