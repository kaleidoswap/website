// src/constants/downloads.ts
import type { PlatformDownload } from '@/types/downloads'
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

const buildPlatforms = (
  version: string,
  assets?: GithubReleaseAsset[]
): PlatformDownload[] => {
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

  const macArchitectures: string[] = []
  if (macArmAsset) {
    macArchitectures.push(
      macPrimaryAsset === macArmAsset ? 'Apple Silicon' : 'Apple Silicon (via releases)'
    )
  }
  if (macIntelAsset) {
    macArchitectures.push(
      macPrimaryAsset === macIntelAsset ? 'Intel' : 'Intel (via releases)'
    )
  }
  if (!macArchitectures.length) {
    macArchitectures.push('Apple Silicon')
  }

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

  const linuxArchitectures = ['AppImage']
  const hasLinuxPackages = linuxDebAsset || linuxRpmAsset
  if (hasLinuxPackages) {
    linuxArchitectures.push('DEB & RPM via releases')
  }

  const windowsInstallerAsset = findAsset(assets, (name) =>
    name.includes('x64-setup') && name.endsWith('.exe') && !isSignature(name)
  )

  const windowsSignatureAsset = windowsInstallerAsset
    ? findAsset(assets, (name) =>
        name.includes(windowsInstallerAsset.name.toLowerCase()) && isSignature(name)
      )
    : undefined

  return [
    {
      platform: 'mac',
      icon: AppleIcon,
      title: 'macOS',
      architecture: macArchitectures,
      downloadUrl:
        macPrimaryAsset?.browser_download_url ?? getMacDownload(version),
      signatureUrl:
        macSignatureAsset?.browser_download_url ?? getSignatureUrl('mac', version),
      note:
        macArmAsset && macIntelAsset
          ? macPrimaryAsset === macArmAsset
            ? 'Intel build available via GitHub releases.'
            : 'Apple Silicon build available via GitHub releases.'
          : undefined
    },
    {
      platform: 'linux',
      icon: LinuxIcon,
      title: 'Linux',
      architecture: linuxArchitectures,
      downloadUrl:
        linuxAppImageAsset?.browser_download_url ?? getLinuxDownload(version),
      signatureUrl:
        linuxSignatureAsset?.browser_download_url ?? getSignatureUrl('linux', version),
      note: hasLinuxPackages
        ? 'Additional DEB and RPM packages available on GitHub.'
        : undefined
    },
    {
      platform: 'windows',
      icon: WindowsIcon,
      title: 'Windows',
      architecture: ['x64'],
      downloadUrl:
        windowsInstallerAsset?.browser_download_url ?? getWindowsDownload(version),
      signatureUrl:
        windowsSignatureAsset?.browser_download_url ??
        getSignatureUrl('win-installer', version)
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
