// src/constants/version.ts
/**
 * Central version configuration for KaleidoSwap
 * Update this file for new releases
 */

export const APP_VERSION = '0.1.0'
export const RELEASE_DATE = '2025-03-19'
export const GITHUB_REPO = 'kaleidoswap/desktop-app'

// Platform definitions
export const PLATFORMS = {
  LINUX_RPM: 'rpm',
  LINUX_DEB: 'deb',
  LINUX_APPIMAGE: 'appimage',
  MAC_DMG: 'mac',
  MAC_ARM: 'mac-arm',
  MAC_X64_TAR: 'mac-x64-tar',
  MAC_ARM_TAR: 'mac-arm-tar'
}

// Generates GitHub URLs for releases
export const githubUrls = {
  releaseTag: `https://github.com/${GITHUB_REPO}/releases/tag/app-v${APP_VERSION}`,
  releaseNotes: `https://github.com/${GITHUB_REPO}/releases/tag/app-v${APP_VERSION}`,
  downloadBase: `https://github.com/${GITHUB_REPO}/releases/download/app-v${APP_VERSION}`,
  verification: `https://docs.kaleidoswap.com/desktop-app/verify-binaries`,
  issues: `https://github.com/${GITHUB_REPO}/issues/new`
}


// Helper function to get download URLs based on platform
export const getDownloadUrl = (platform: string) => {
  switch(platform) {
    case PLATFORMS.LINUX_RPM:
      return `${githubUrls.downloadBase}/KaleidoSwap-${APP_VERSION}-1.x86_64.rpm`;
    case PLATFORMS.LINUX_DEB:
      return `${githubUrls.downloadBase}/KaleidoSwap_${APP_VERSION}_amd64.deb`;
    case PLATFORMS.LINUX_APPIMAGE:
      return `${githubUrls.downloadBase}/KaleidoSwap_${APP_VERSION}_amd64.AppImage`;
    case PLATFORMS.MAC_DMG:
      return `${githubUrls.downloadBase}/KaleidoSwap_${APP_VERSION}_x64.dmg`;
    case PLATFORMS.MAC_ARM:
      return `${githubUrls.downloadBase}/KaleidoSwap_${APP_VERSION}_arm64.dmg`;
    case PLATFORMS.MAC_X64_TAR:
      return `${githubUrls.downloadBase}/KaleidoSwap_x64.app.tar.gz`;
    case PLATFORMS.MAC_ARM_TAR:
      return `${githubUrls.downloadBase}/KaleidoSwap_aarch64.app.tar.gz`;
    default:
      return `${githubUrls.downloadBase}/KaleidoSwap-${APP_VERSION}-${platform}`;
  }
}

// Platform-specific download helpers
export const getLinuxDownload = () => getDownloadUrl(PLATFORMS.LINUX_APPIMAGE);
export const getMacDownload = () => getDownloadUrl(PLATFORMS.MAC_DMG);

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