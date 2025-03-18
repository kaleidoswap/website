// src/constants/downloads.ts
import type { PlatformDownload } from '@/types/downloads'
import {
  AppleIcon,
  LinuxIcon,
  AlertCircleIcon
} from '@/components/icons/PlatformIcons'
import {
  getVersionInfo,
  getDownloadUrl,
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
    icon: AlertCircleIcon,
    title: 'Windows',
    architecture: [],
    downloadUrl: '#',
    signatureUrl: '#',
    disabled: true,
    note: 'Windows support is coming in a future release'
  },
  {
    platform: 'mac',
    icon: AppleIcon,
    title: 'macOS',
    architecture: ['x64', 'arm64'],
    downloadUrl: getDownloadUrl('mac'),
    signatureUrl: getSignatureUrl('mac')
  },
  {
    platform: 'linux',
    icon: LinuxIcon,
    title: 'Linux',
    architecture: ['x64', 'arm64'],
    downloadUrl: getDownloadUrl('linux'),
    signatureUrl: getSignatureUrl('linux')
  }
]

// URL for verification guide
export const verificationGuideUrl = githubUrls.verification