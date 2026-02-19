import { useNavigate } from 'react-router-dom'
import { openExternalLink } from '@/lib/utils'

export const useAppNavigation = () => {
  const navigate = useNavigate()

  const handleNavigation = (href: string, external = false) => {
    if (external) {
      openExternalLink(href)
    } else {
      navigate(href)
    }
  }

  return { handleNavigation }
}
