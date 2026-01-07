import React from 'react'

export const metadata = {
  description: '喵喵企业邮箱 - 安全、稳定、专业的企业通讯解决方案',
  title: 'MeowMail - 喵喵企业邮箱',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return children
}
