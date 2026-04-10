// src/constants/downloads.ts
import type { PlatformDownload, SecondaryDownload } from '@/types/downloads'
import {
  AppleIcon,
  LinuxIcon,
  WindowsIcon,
} from '@/components/icons/PlatformIcons'
import {
  getVersionInfo,
  getMacDownload,
  getLinuxDownload,
  getWindowsDownload,
  getSignatureUrl,
  getManifestUrl,
  getManifestSignatureUrl,
  buildGithubUrls,
} from '@/constants/versions'
import { DOCS } from '@/constants/urls'

export interface GithubReleaseAsset {
  name: string
  browser_download_url: string
}

export interface DownloadConfig {
  currentVersion: {
    version: string
    versionDisplay?: string
    date: string
    notes: string
  }
  platforms: PlatformDownload[]
  manifestUrl: string
  manifestSignatureUrl: string
  verificationGuideUrl: string
}

const findAsset = (
  assets: GithubReleaseAsset[] | undefined,
  matcher: (name: string) => boolean
) => assets?.find((asset) => matcher(asset.name.toLowerCase()))

const isSignature = (name: string) =>
  name.endsWith('.sig') || name.endsWith('.asc')

const formatSize = (bytes: number): string => {
  const mb = Math.round(bytes / (1024 * 1024))
  return `${mb} MB`
}

const findAssetWithSize = (
  assets: GithubReleaseAsset[] | undefined,
  matcher: (name: string) => boolean
) => {
  const asset = assets?.find((a) => matcher(a.name.toLowerCase()))
  return asset
    ? { url: asset.browser_download_url, size: 'size' in asset ? formatSize((asset as GithubReleaseAssetWithSize).size) : undefined, name: asset.name }
    : undefined
}

export interface GithubReleaseAssetWithSize extends GithubReleaseAsset {
  size: number
}

const buildPlatforms = (
  version: string,
  assets?: GithubReleaseAsset[]
): PlatformDownload[] => {
  // --- macOS ---
  const macArmAsset = findAsset(assets, (name) =>
    name.includes('aarch64') && name.endsWith('.dmg') && !isSignature(name)
  )
  const macIntelAsset = findAsset(assets, (name) =>
    name.includes('x64') && name.endsWith('.dmg') && !isSignature(name)
  )
  const macPrimaryAsset = macArmAsset ?? macIntelAsset
  const macSignatureAsset = macPrimaryAsset
    ? findAsset(assets, (name) =>
        name.includes(macPrimaryAsset.name.toLowerCase()) && isSignature(name)
      )
    : undefined

  const macSecondary: SecondaryDownload[] = []
  if (macArmAsset && macIntelAsset) {
    const intelSized = findAssetWithSize(assets, (name) =>
      name.includes('x64') && name.endsWith('.dmg') && !isSignature(name)
    )
    macSecondary.push({
      label: 'Intel (x64)',
      url: macIntelAsset.browser_download_url,
      size: intelSized?.size
    })
  }

  // --- Linux ---
  const linuxAppImageAsset = findAsset(assets, (name) =>
    name.includes('appimage') && !isSignature(name)
  )
  const linuxSignatureAsset = linuxAppImageAsset
    ? findAsset(assets, (name) =>
        name.includes(linuxAppImageAsset.name.toLowerCase()) && isSignature(name)
      )
    : undefined
  const linuxDebAsset = findAsset(assets, (name) =>
    name.endsWith('.deb') && !isSignature(name)
  )
  const linuxRpmAsset = findAsset(assets, (name) =>
    name.endsWith('.rpm') && !isSignature(name)
  )

  const linuxSecondary: SecondaryDownload[] = []
  if (linuxDebAsset) {
    const debSized = findAssetWithSize(assets, (name) =>
      name.endsWith('.deb') && !isSignature(name)
    )
    linuxSecondary.push({
      label: '.deb (Debian/Ubuntu)',
      url: linuxDebAsset.browser_download_url,
      size: debSized?.size
    })
  }
  if (linuxRpmAsset) {
    const rpmSized = findAssetWithSize(assets, (name) =>
      name.endsWith('.rpm') && !isSignature(name)
    )
    linuxSecondary.push({
      label: '.rpm (Fedora/RHEL)',
      url: linuxRpmAsset.browser_download_url,
      size: rpmSized?.size
    })
  }

  // --- Windows ---
  const windowsExeAsset = findAsset(assets, (name) =>
    name.includes('x64-setup') && name.endsWith('.exe') && !isSignature(name)
  )
  const windowsExeSignature = windowsExeAsset
    ? findAsset(assets, (name) =>
        name.includes(windowsExeAsset.name.toLowerCase()) && isSignature(name)
      )
    : undefined
  const windowsMsiAsset = findAsset(assets, (name) =>
    name.endsWith('.msi') && !isSignature(name)
  )

  const windowsSecondary: SecondaryDownload[] = []
  if (windowsMsiAsset) {
    const msiSized = findAssetWithSize(assets, (name) =>
      name.endsWith('.msi') && !isSignature(name)
    )
    windowsSecondary.push({
      label: 'MSI Installer',
      url: windowsMsiAsset.browser_download_url,
      size: msiSized?.size
    })
  }

  return [
    {
      platform: 'mac',
      icon: AppleIcon,
      title: 'macOS',
      architecture: ['Apple Silicon', ...(macIntelAsset ? ['Intel'] : [])],
      downloadUrl:
        macPrimaryAsset?.browser_download_url ?? getMacDownload(version),
      signatureUrl:
        macSignatureAsset?.browser_download_url ?? getSignatureUrl('mac', version),
      secondaryDownloads: macSecondary.length ? macSecondary : undefined
    },
    {
      platform: 'linux',
      icon: LinuxIcon,
      title: 'Linux',
      architecture: [
        'AppImage',
        ...(linuxDebAsset ? ['.deb'] : []),
        ...(linuxRpmAsset ? ['.rpm'] : [])
      ],
      downloadUrl:
        linuxAppImageAsset?.browser_download_url ?? getLinuxDownload(version),
      signatureUrl:
        linuxSignatureAsset?.browser_download_url ?? getSignatureUrl('linux', version),
      secondaryDownloads: linuxSecondary.length ? linuxSecondary : undefined
    },
    {
      platform: 'windows',
      icon: WindowsIcon,
      title: 'Windows',
      architecture: ['x64'],
      downloadUrl:
        windowsExeAsset?.browser_download_url ?? getWindowsDownload(version),
      signatureUrl:
        windowsExeSignature?.browser_download_url ??
        getSignatureUrl('win-installer', version),
      secondaryDownloads: windowsSecondary.length ? windowsSecondary : undefined
    }
  ]
}

export const createDownloadConfig = (params: {
  version: string
  date?: string
  notesUrl?: string
  assets?: GithubReleaseAsset[]
}): DownloadConfig => {
  const { version, date, notesUrl, assets } = params

  const versionInfo = getVersionInfo({
    version,
    date,
    notes: notesUrl
  })

  const platforms = buildPlatforms(version, assets)

  const manifestAsset = findAsset(assets, (name) =>
    name === 'latest.json'
  )

  const manifestSignatureAsset = manifestAsset
    ? findAsset(assets, (name) =>
        name === `${manifestAsset.name}.sig` || name === `${manifestAsset.name}.asc`
      )
    : undefined

  return {
    currentVersion: versionInfo,
    platforms,
    manifestUrl: manifestAsset?.browser_download_url ?? getManifestUrl(version),
    manifestSignatureUrl:
      manifestSignatureAsset?.browser_download_url ??
      getManifestSignatureUrl(version),
    verificationGuideUrl: DOCS.verifyBinaries
  }
}

// URL for verification guide
export const verificationGuideUrl = DOCS.verifyBinaries

// Re-export helper for convenience
export { buildPlatforms, buildGithubUrls }
