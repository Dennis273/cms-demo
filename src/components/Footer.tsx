import Link from 'next/link'
import { Locale } from '@/lib/i18n'

interface FooterLink {
  label: string
  link: string
  openInNewTab?: boolean | null
  id?: string | null
}

interface FooterColumn {
  title: string
  links?: FooterLink[] | null
  id?: string | null
}

interface SocialLink {
  platform: string
  url: string
  id?: string | null
}

interface FooterProps {
  columns?: FooterColumn[] | null
  socialLinks?: SocialLink[] | null
  copyright?: string | null
  bottomLinks?: FooterLink[] | null
  locale: Locale
}

const socialIcons: Record<string, string> = {
  twitter: '𝕏',
  facebook: 'f',
  linkedin: 'in',
  github: '⌨',
  youtube: '▶',
  instagram: '📷',
  wechat: '微',
  weibo: '微',
}

export function Footer({ columns, socialLinks, copyright, bottomLinks, locale }: FooterProps) {
  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        <div className="footer-columns">
          {columns?.map((column, index) => (
            <div key={index} className="footer-column">
              <h4>{column.title}</h4>
              <ul>
                {column.links?.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.link.startsWith('/') ? `/${locale}${link.link}` : link.link}
                      target={link.openInNewTab ? '_blank' : undefined}
                      rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {socialLinks && socialLinks.length > 0 && (
          <div className="footer-social">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                title={social.platform}
              >
                {socialIcons[social.platform] || social.platform[0]}
              </a>
            ))}
          </div>
        )}

        <div className="footer-bottom">
          {copyright && <p className="copyright">{copyright}</p>}
          {bottomLinks && bottomLinks.length > 0 && (
            <div className="bottom-links">
              {bottomLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.link.startsWith('/') ? `/${locale}${link.link}` : link.link}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
