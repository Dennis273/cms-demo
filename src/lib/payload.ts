// 服务端专用 - 只在服务端组件中导入
import { getPayload as getPayloadBase } from 'payload'
import config from '@/payload.config'

export async function getPayload() {
  const payloadConfig = await config
  return getPayloadBase({ config: payloadConfig })
}

// 重新导出 i18n 工具（方便服务端组件使用）
export * from './i18n'
