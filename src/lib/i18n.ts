// 纯客户端工具 - 不导入任何服务端模块

export type Locale = 'zh' | 'en' | 'ja'

export const locales: Locale[] = ['zh', 'en', 'ja']

export const localeNames: Record<Locale, string> = {
  zh: '简体中文',
  en: 'English',
  ja: '日本語',
}

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

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}
