import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { CloudflareContext, getCloudflareContext } from '@opennextjs/cloudflare'
import { GetPlatformProxyOptions } from 'wrangler'
import { r2Storage } from '@payloadcms/storage-r2'

// Collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Plans } from './collections/Plans'
import { DocCategories } from './collections/DocCategories'
import { Docs } from './collections/Docs'
import { Showcases } from './collections/Showcases'
import { Testimonials } from './collections/Testimonials'

// Globals
import { HomePage } from './globals/HomePage'
import { Navigation } from './globals/Navigation'
import { Footer } from './globals/Footer'
import { SiteSettings } from './globals/SiteSettings'
import { PlansPage } from './globals/PlansPage'
import { DocsPage } from './globals/DocsPage'
import { ShowcasePage } from './globals/ShowcasePage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isCLI = process.argv.some((value) => value.match(/^(generate|migrate):?/))
const isProduction = process.env.NODE_ENV === 'production'

const cloudflare =
  isCLI || !isProduction
    ? await getCloudflareContextFromWrangler()
    : await getCloudflareContext({ async: true })

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  // Collections
  collections: [
    Users,
    Media,
    Plans,
    DocCategories,
    Docs,
    Showcases,
    Testimonials,
  ],
  // Globals
  globals: [
    HomePage,
    Navigation,
    Footer,
    SiteSettings,
    PlansPage,
    DocsPage,
    ShowcasePage,
  ],
  // Localization
  localization: {
    locales: [
      {
        label: '简体中文',
        code: 'zh',
      },
      {
        label: 'English',
        code: 'en',
      },
      {
        label: '日本語',
        code: 'ja',
      },
    ],
    defaultLocale: 'zh',
    fallback: true,
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteD1Adapter({ binding: cloudflare.env.D1 }),
  plugins: [
    r2Storage({
      bucket: cloudflare.env.R2,
      collections: { media: true },
    }),
  ],
})

// Adapted from https://github.com/opennextjs/opennextjs-cloudflare/blob/d00b3a13e42e65aad76fba41774815726422cc39/packages/cloudflare/src/api/cloudflare-context.ts#L328C36-L328C46
function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  return import(/* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`).then(
    ({ getPlatformProxy }) =>
      getPlatformProxy({
        environment: process.env.CLOUDFLARE_ENV,
        remoteBindings: isProduction,
      } satisfies GetPlatformProxyOptions),
  )
}
