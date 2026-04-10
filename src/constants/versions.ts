// src/constants/version.ts
/**
 * Central version configuration for KaleidoSwap
 * Version and release date are fetched from the GitHub API at runtime.
 */

import { GITHUB, DOCS } from '@/constants/urls'

export const GITHUB_REPO = `${GITHUB.org}/${GITHUB.repo}`

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
  verification: DOCS.verifyBinaries,
  issues: GITHUB.newIssueUrl
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

// Helper function to get download URLs based on platform
export const getDownloadUrl = (platform: string, version: string) => {
  const downloadBase = buildGithubUrls(version).downloadBase

  switch(platform) {
    case PLATFORMS.WINDOWS_INSTALLER:
      return `${downloadBase}/KaleidoSwap_${version}_x64-setup.exe`;
    case PLATFORMS.WINDOWS_PORTABLE:
      return `${downloadBase}/KaleidoSwap_${version}_x64_en-US.msi`;
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
export const getWindowsDownload = (version: string) =>
  getDownloadUrl(PLATFORMS.WINDOWS_INSTALLER, version);
export const getLinuxDownload = (version: string) =>
  getDownloadUrl(PLATFORMS.LINUX_APPIMAGE, version);
export const getMacDownload = (version: string) =>
  getDownloadUrl(PLATFORMS.MAC_DMG, version);

// Returns the GPG detached signature URL (.asc) for a given binary download URL
export const getSignatureUrl = (platform: string, version: string) =>
  `${getDownloadUrl(platform, version)}.asc`

// Manifest.txt is produced by CI and uploaded as a GitHub Actions artifact (not a release asset).
// The URL below will resolve only if the file has been manually attached to the release.
export const getManifestUrl = (version: string) =>
  `${buildGithubUrls(version).releaseTag}`

// No manifest.txt.sig exists in the release; signatures are per-binary (.asc files).
// This returns the releases page URL as a fallback so users can find the .asc files.
export const getManifestSignatureUrl = (version: string) =>
  `${buildGithubUrls(version).releaseTag}`

// Helper function to get full version string (for display)
export const getVersionString = (version: string) => `v${version}`

// Helper function to get version release info
export const getVersionInfo = (params: {
  version: string
  date?: string
  notes?: string
}) => {
  return {
    version: params.version,
    versionDisplay: getVersionString(params.version),
    date: params.date ?? '',
    notes: params.notes ?? buildGithubUrls(params.version).releaseNotes
  }
}
