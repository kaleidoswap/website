// src/constants/version.ts
/**
 * Central version configuration for KaleidoSwap
 * Update this file for new releases
 */

export const APP_VERSION = '0.3.0'
export const RELEASE_DATE = '2025-10-15'
export const GITHUB_REPO = 'kaleidoswap/desktop-app'

// Platform definitions
export const PLATFORMS = {
  WINDOWS_INSTALLER: 'win-installer',
  WINDOWS_PORTABLE: 'win-portable',
  LINUX_RPM: 'rpm',
  LINUX_DEB: 'deb',
  LINUX_APPIMAGE: 'appimage',
  MAC_DMG: 'mac',
  MAC_ARM: 'mac-arm',
  MAC_X64_TAR: 'mac-x64-tar',
  MAC_ARM_TAR: 'mac-arm-tar'
}

const DOCS_URLS = {
  verification: `https://docs.kaleidoswap.com/desktop-app/verify-binaries`,
  issues: `https://github.com/${GITHUB_REPO}/issues/new`
}

export const normalizeVersionTag = (version: string) =>
  version.startsWith('v') ? version : `v${version}`

export const stripVersionTag = (tag: string) =>
  tag.startsWith('v') ? tag.slice(1) : tag

// Generates GitHub URLs for releases (dynamic helper)
export const buildGithubUrls = (version: string) => {
  const tag = normalizeVersionTag(version)

  return {
    releaseTag: `https://github.com/${GITHUB_REPO}/releases/tag/${tag}`,
    releaseNotes: `https://github.com/${GITHUB_REPO}/releases/tag/${tag}`,
    downloadBase: `https://github.com/${GITHUB_REPO}/releases/download/${tag}`,
    verification: DOCS_URLS.verification,
    issues: DOCS_URLS.issues
  }
}

// Default GitHub URLs using fallback version
export const githubUrls = buildGithubUrls(APP_VERSION)

// Helper function to get download URLs based on platform
export const getDownloadUrl = (platform: string, version: string = APP_VERSION) => {
  const downloadBase = buildGithubUrls(version).downloadBase

  switch(platform) {
    case PLATFORMS.WINDOWS_INSTALLER:
      return `${downloadBase}/KaleidoSwap_${version}_x64-setup.msi`;
    case PLATFORMS.WINDOWS_PORTABLE:
      return `${downloadBase}/KaleidoSwap_${version}_x64-portable.exe`;
    case PLATFORMS.LINUX_RPM:
      return `${downloadBase}/KaleidoSwap-${version}-1.x86_64.rpm`;
    case PLATFORMS.LINUX_DEB:
      return `${downloadBase}/KaleidoSwap_${version}_amd64.deb`;
    case PLATFORMS.LINUX_APPIMAGE:
      return `${downloadBase}/KaleidoSwap_${version}_amd64.AppImage`;
    case PLATFORMS.MAC_DMG:
      return `${downloadBase}/KaleidoSwap_${version}_x64.dmg`;
    case PLATFORMS.MAC_ARM:
      return `${downloadBase}/KaleidoSwap_${version}_aarch64.dmg`;
    case PLATFORMS.MAC_X64_TAR:
      return `${downloadBase}/KaleidoSwap_x64.app.tar.gz`;
    case PLATFORMS.MAC_ARM_TAR:
      return `${downloadBase}/KaleidoSwap_aarch64.app.tar.gz`;
    default:
      return `${downloadBase}/KaleidoSwap_${version}_${platform}`;
  }
}

// Platform-specific download helpers
export const getWindowsDownload = (version: string = APP_VERSION) =>
  getDownloadUrl(PLATFORMS.WINDOWS_INSTALLER, version);
export const getLinuxDownload = (version: string = APP_VERSION) =>
  getDownloadUrl(PLATFORMS.LINUX_APPIMAGE, version);
export const getMacDownload = (version: string = APP_VERSION) =>
  getDownloadUrl(PLATFORMS.MAC_DMG, version);

// Helper function to get signature URLs (deprecated, kept for backward compatibility)
export const getSignatureUrl = (platform: string, version: string = APP_VERSION) => 
  `${getDownloadUrl(platform, version)}.sig`

// Helper function to get manifest URL
export const getManifestUrl = (version: string = APP_VERSION) => 
  `${buildGithubUrls(version).downloadBase}/manifest.txt`

// Helper function to get manifest signature URL
export const getManifestSignatureUrl = (version: string = APP_VERSION) => 
  `${buildGithubUrls(version).downloadBase}/manifest.txt.sig`

// Helper function to get full version string (for display)
export const getVersionString = (version: string = APP_VERSION) => `v${version}`

type VersionInfoOverrides = Partial<{
  version: string
  date: string
  notes: string
}>

// Helper function to get version release info
export const getVersionInfo = (overrides: VersionInfoOverrides = {}) => {
  const version = overrides.version ?? APP_VERSION

  return {
    version,
    versionDisplay: getVersionString(version),
    date: overrides.date ?? RELEASE_DATE,
    notes: overrides.notes ?? buildGithubUrls(version).releaseNotes
  }
}
