// src/constants/urls.ts
/**
 * Centralized URL configuration for KaleidoSwap
 * All external URLs should be defined here for easy maintenance
 */

// Base domains
const DOMAINS = {
  app: 'app.kaleidoswap.com',
  docs: 'docs.kaleidoswap.com',
  developers: 'developers.kaleidoswap.com',
  blog: 'kaleidoswap.medium.com',
} as const

// GitHub configuration
export const GITHUB = {
  org: 'kaleidoswap',
  repo: 'desktop-app',
  get orgUrl() {
    return `https://github.com/${this.org}`
  },
  get repoUrl() {
    return `https://github.com/${this.org}/${this.repo}`
  },
  get issuesUrl() {
    return `${this.repoUrl}/issues`
  },
  get newIssueUrl() {
    return `${this.repoUrl}/issues/new`
  },
  get securityUrl() {
    return `${this.repoUrl}/security`
  },
  get apiLatestRelease() {
    return `https://api.github.com/repos/${this.org}/${this.repo}/releases/latest`
  },
} as const

// Social media URLs
export const SOCIALS = {
  twitter: 'https://x.com/kaleidoswap',
  twitterLegacy: 'https://twitter.com/kaleidoswap',
  telegram: 'https://t.me/kaleidoswap',
  github: GITHUB.orgUrl,
} as const

// Product URLs
export const PRODUCTS = {
  app: `https://${DOMAINS.app}`,
  docs: `https://${DOMAINS.docs}`,
  developers: `https://${DOMAINS.developers}`,
  blog: `https://${DOMAINS.blog}`,
} as const

// Documentation URLs
export const DOCS = {
  home: PRODUCTS.docs,
  verifyBinaries: `${PRODUCTS.docs}/desktop-app/verify-binaries`,
  sdk: `${PRODUCTS.docs}/sdk/introduction`,
  desktop: `${PRODUCTS.docs}/desktop-app/getting-started/introduction`,
  rateExtension: `${PRODUCTS.docs}/extensions/rate/introduction`,
  webApp: `${PRODUCTS.docs}/web-app/introduction`,
  apiReference: `${PRODUCTS.docs}/api-reference/introduction`,
} as const

// External resources (third-party)
export const EXTERNAL = {
  rgbInfo: 'https://rgb.info',
  lightningNetwork: 'https://lightning.network',
  bitcoinWhitepaper: 'https://bitcoin.org/bitcoin.pdf',
} as const

// All URLs grouped for convenience
export const URLS = {
  github: GITHUB,
  socials: SOCIALS,
  products: PRODUCTS,
  docs: DOCS,
  external: EXTERNAL,
} as const
