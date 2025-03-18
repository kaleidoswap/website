// src/constants/version.ts
/**
 * Central version configuration for KaleidoSwap
 * Update this file for new releases
 */

export const APP_VERSION = '0.1.0'
export const RELEASE_DATE = '2025-03-19'
export const GITHUB_REPO = 'kaleidoswap/desktop-app'

// Generates GitHub URLs for releases
export const githubUrls = {
  releaseTag: `https://github.com/${GITHUB_REPO}/releases/tag/v${APP_VERSION}`,
  releaseNotes: `https://github.com/${GITHUB_REPO}/releases/tag/v${APP_VERSION}`,
  downloadBase: `https://github.com/${GITHUB_REPO}/releases/download/v${APP_VERSION}`,
  verification: `https://docs.kaleidoswap.com/desktop-app/verify-binaries`,
  issues: `https://github.com/${GITHUB_REPO}/issues/new`
}

// Helper function to get download URLs 
export const getDownloadUrl = (platform: string) => 
  `${githubUrls.downloadBase}/KaleidoSwap-${APP_VERSION}-${platform}`

// Helper function to get signature URLs (deprecated, kept for backward compatibility)
export const getSignatureUrl = (platform: string) => 
  `${getDownloadUrl(platform)}.sig`

// Helper function to get manifest URL
export const getManifestUrl = () => 
  `${githubUrls.downloadBase}/manifest.txt`

// Helper function to get manifest signature URL
export const getManifestSignatureUrl = () => 
  `${githubUrls.downloadBase}/manifest.txt.sig`

// Helper function to get full version string (for display)
export const getVersionString = () => `v${APP_VERSION}`

// Helper function to get version release info
export const getVersionInfo = () => ({
  version: APP_VERSION,
  versionDisplay: getVersionString(),
  date: RELEASE_DATE,
  notes: githubUrls.releaseNotes
})