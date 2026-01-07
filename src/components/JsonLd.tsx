interface JsonLdProps {
  data: object | null
}

/**
 * JSON-LD structured data component
 * Renders a script tag with JSON-LD data for SEO
 */
export function JsonLd({ data }: JsonLdProps) {
  if (!data) {
    return null
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  )
}
