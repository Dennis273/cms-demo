'use client'

import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

interface RichTextProps {
  content: SerializedEditorState | null | undefined
  className?: string
}

function serializeNode(node: any): string {
  if (!node) return ''

  // Text node
  if (node.type === 'text') {
    let text = node.text || ''
    if (node.format & 1) text = `<strong>${text}</strong>` // Bold
    if (node.format & 2) text = `<em>${text}</em>` // Italic
    if (node.format & 8) text = `<u>${text}</u>` // Underline
    if (node.format & 4) text = `<s>${text}</s>` // Strikethrough
    if (node.format & 16) text = `<code>${text}</code>` // Code
    return text
  }

  // Get children content
  const children = node.children?.map(serializeNode).join('') || ''

  switch (node.type) {
    case 'root':
      return children
    case 'paragraph':
      return `<p>${children}</p>`
    case 'heading':
      const tag = `h${node.tag || 1}`
      return `<${tag}>${children}</${tag}>`
    case 'list':
      const listTag = node.listType === 'number' ? 'ol' : 'ul'
      return `<${listTag}>${children}</${listTag}>`
    case 'listitem':
      return `<li>${children}</li>`
    case 'link':
      const href = node.fields?.url || '#'
      const target = node.fields?.newTab ? ' target="_blank" rel="noopener noreferrer"' : ''
      return `<a href="${href}"${target}>${children}</a>`
    case 'quote':
      return `<blockquote>${children}</blockquote>`
    case 'code':
      return `<pre><code>${children}</code></pre>`
    default:
      return children
  }
}

export function RichText({ content, className }: RichTextProps) {
  if (!content?.root) return null

  const html = serializeNode(content.root)

  return (
    <div
      className={`rich-text ${className || ''}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
