import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// A hash target may not exist yet: routes are lazy-loaded, so on a cold deep link
// (/media-kit#press-coverage) the section mounts well after the location changes.
const TARGET_POLL_MS = 50
const TARGET_TIMEOUT_MS = 3000

export const ScrollToTop = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const id = hash ? decodeURIComponent(hash.slice(1)) : ''

    const scrollToTarget = () => {
      if (!id) return false
      const target = document.getElementById(id)
      if (!target) return false
      // `block: 'start'` honours the target's scroll-margin-top, which clears the
      // fixed navbar.
      target.scrollIntoView({ behavior: 'instant', block: 'start' })
      return true
    }

    // Already rendered (in-page anchor click): go straight there, no detour via the top.
    if (scrollToTarget()) return

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    if (!id) return

    // Poll for the section to mount. setTimeout rather than requestAnimationFrame,
    // which is throttled or suspended entirely while the tab is in the background.
    const deadline = Date.now() + TARGET_TIMEOUT_MS
    let timer = 0
    const poll = () => {
      if (scrollToTarget() || Date.now() > deadline) return
      timer = window.setTimeout(poll, TARGET_POLL_MS)
    }
    timer = window.setTimeout(poll, TARGET_POLL_MS)

    return () => window.clearTimeout(timer)
  }, [pathname, hash])

  return null
}
