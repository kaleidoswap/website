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
  githubUrls
} from '@/constants/versions'

// Get current version info
export const currentVersion = getVersionInfo()

// Manifest URLs
export const manifestUrl = getManifestUrl()
export const manifestSignatureUrl = getManifestSignatureUrl()

// Platform configuration
export const platforms: PlatformDownload[] = [
  {
    platform: 'windows',
    icon: WindowsIcon,
    title: 'Windows',
    architecture: ['x64'],
    downloadUrl: getWindowsDownload(),
    signatureUrl: getSignatureUrl('win-installer')
  },
  {
    platform: 'mac',
    icon: AppleIcon,
    title: 'macOS',
    architecture: ['x64', 'arm64'],
    downloadUrl: getMacDownload(),
    signatureUrl: getSignatureUrl('mac')
  },
  {
    platform: 'linux',
    icon: LinuxIcon,
    title: 'Linux',
    architecture: ['x64', 'arm64'],
    downloadUrl: getLinuxDownload(),
    signatureUrl: getSignatureUrl('linux')
  }
]

// URL for verification guide
export const verificationGuideUrl = githubUrls.verification