import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
  noIndex?: boolean
}

const DEFAULT_TITLE = 'KaleidoSwap - Bitcoin L2 DEX'
const DEFAULT_DESCRIPTION =
  'Trade BTC, USDT, and any RGB asset across Lightning, RGB, Spark, and Arkade. Atomic swaps with low fees and better privacy. No bridges. No custody. No tokens.'
const DEFAULT_IMAGE = '/og-image.png'
const SITE_URL = 'https://kaleidoswap.com'

export const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = ['bitcoin', 'defi', 'rgb', 'lightning', 'atomic swaps', 'dex'],
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  noIndex = false,
}: SEOProps) => {
  const fullTitle = title ? `${title} | KaleidoSwap` : DEFAULT_TITLE
  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL
  const fullImage = image.startsWith('http') ? image : `${SITE_URL}${image}`

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
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content="KaleidoSwap" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@kaleidoswap" />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  )
}
