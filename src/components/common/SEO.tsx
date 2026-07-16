import { Helmet } from 'react-helmet-async'
import { STATIC_PAGE_META } from '@/constants/pageMeta'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  noIndex?: boolean
  datePublished?: string
  dateModified?: string
  author?: string
}

const DEFAULT_TITLE = STATIC_PAGE_META['/'].title
const DEFAULT_DESCRIPTION = STATIC_PAGE_META['/'].description
const DEFAULT_IMAGE = '/images/kaleido-full-logo-bg.jpg'
const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://kaleidoswap.com'

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'KaleidoSwap',
  url: SITE_URL,
  logo: `${SITE_URL}/kaleidoswap-pictogram.svg`,
  sameAs: [
    'https://x.com/kaleidoswap',
    'https://t.me/kaleidoswap',
    'https://github.com/kaleidoswap',
  ],
}

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'KaleidoSwap',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'macOS, Linux, Windows, Web',
  description: 'Non-custodial Bitcoin DEX for Bitcoin L2s. Bitcoin and stablecoin atomic swaps on Lightning, RGB, Arkade, Liquid, and Spark. Ready for agentic payments.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
}

export const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  image,
  url,
  type = 'website',
  noIndex = false,
  datePublished,
  dateModified,
  author,
}: SEOProps) => {
  const fullTitle = title ? `${title} | KaleidoSwap` : DEFAULT_TITLE
  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL
  const resolvedImage = image ?? (type === 'article' ? undefined : DEFAULT_IMAGE)
  const fullImage = resolvedImage
    ? resolvedImage.startsWith('http') ? resolvedImage : `${SITE_URL}${resolvedImage}`
    : undefined
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
{noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {fullImage && <meta property="og:image" content={fullImage} />}
      <meta property="og:site_name" content="KaleidoSwap" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {fullImage && <meta name="twitter:image" content={fullImage} />}
      <meta name="twitter:site" content="@kaleidoswap" />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationJsonLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(softwareJsonLd)}
      </script>
      {type === 'article' && title && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            headline: title,
            description,
            url: fullUrl,
            ...(fullImage ? { image: fullImage } : {}),
            ...(datePublished ? { datePublished } : {}),
            ...(dateModified ? { dateModified } : { ...(datePublished ? { dateModified: datePublished } : {}) }),
            ...(author ? { author: { '@type': 'Person', name: author } } : { author: { '@type': 'Organization', name: 'KaleidoSwap' } }),
            publisher: {
              '@type': 'Organization',
              name: 'KaleidoSwap',
              logo: { '@type': 'ImageObject', url: `${SITE_URL}/kaleidoswap-pictogram.svg` },
            },
          })}
        </script>
      )}
    </Helmet>
  )
}
