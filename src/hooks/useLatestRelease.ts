// src/hooks/useLatestRelease.ts
import { useEffect, useState } from 'react'
import { GITHUB } from '@/constants/urls'
import { stripVersionTag } from '@/constants/versions'
import type { GithubReleaseAsset } from '@/constants/downloads'

export interface LatestRelease {
  version: string
  date?: string
  notesUrl?: string
  body?: string
  assets: GithubReleaseAsset[]
}

type GithubRelease = {
  tag_name?: string
  published_at?: string
  html_url?: string
  body?: string
  assets?: GithubReleaseAsset[]
}

const CACHE_KEY = 'kaleidoswap_release_cache_v2'
const CACHE_TTL = 10 * 60 * 1000 // 10 minutes

/**
 * Fetches the latest desktop-app release from the GitHub API,
 * with a short sessionStorage cache shared across pages.
 */
export const useLatestRelease = () => {
  const [release, setRelease] = useState<LatestRelease | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const fetchLatestRelease = async () => {
      try {
        const cached = sessionStorage.getItem(CACHE_KEY)
        if (cached) {
          const { data, timestamp } = JSON.parse(cached)
          if (data?.version && Date.now() - timestamp < CACHE_TTL) {
            if (isMounted) {
              setRelease(data)
              setIsLoading(false)
            }
            return
          }
        }

        const response = await fetch(GITHUB.apiLatestRelease, {
          headers: {
            Accept: 'application/vnd.github+json'
          },
          signal: controller.signal
        })

        if (!response.ok) {
          throw new Error(`GitHub API responded with status ${response.status}`)
        }

        const data: GithubRelease = await response.json()
        const version = stripVersionTag(data.tag_name ?? '')
        if (!version) {
          if (isMounted) setIsLoading(false)
          return
        }

        const date = data.published_at
          ? new Date(data.published_at).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })
          : undefined

        const releaseData: LatestRelease = {
          version,
          date,
          notesUrl: data.html_url,
          body: data.body ?? '',
          assets: data.assets ?? []
        }

        try {
          sessionStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ data: releaseData, timestamp: Date.now() })
          )
        } catch {
          // sessionStorage full or unavailable — no-op
        }

        if (isMounted) {
          setRelease(releaseData)
          setIsLoading(false)
        }
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          return
        }

        console.error('Failed to fetch latest KaleidoSwap release', error)
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchLatestRelease()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  return { release, isLoading }
}
