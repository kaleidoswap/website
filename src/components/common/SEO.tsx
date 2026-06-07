import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  imageX?: string
  url?: string
  type?: 'website' | 'article'
  noIndex?: boolean
  datePublished?: string
  dateModified?: string
  author?: string
}

const DEFAULT_TITLE = 'KaleidoSwap - Bitcoin L2 DEX'
const DEFAULT_DESCRIPTION =
  'Trade BTC, USDT, and any RGB asset across Lightning, RGB, Spark, and Arkade. Atomic swaps with low fees and better privacy. No bridges. No custody. No tokens.'
const DEFAULT_IMAGE = '/images/kaleido-full-logo-bg.png'
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
  description: DEFAULT_DESCRIPTION,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
}

export const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = ['bitcoin', 'defi', 'rgb', 'lightning', 'atomic swaps', 'dex'],
  image,
  imageX,
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
  const resolvedImageX = imageX ?? resolvedImage
  const fullImageX = resolvedImageX
    ? resolvedImageX.startsWith('http') ? resolvedImageX : `${SITE_URL}${resolvedImageX}`
    : undefined

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
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
      {fullImageX && <meta name="twitter:image" content={fullImageX} />}
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
