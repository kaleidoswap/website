import { useEffect, useRef, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: 2 | 3
}

interface TableOfContentsProps {
  content: string
  hideTitle?: boolean
}

function parseHeadings(html: string): Heading[] {
  const matches = [...html.matchAll(/<h([23]) id="([^"]+)">([\s\S]*?)<\/h\1>/g)]
  return matches.map((m) => ({
    level: parseInt(m[1]) as 2 | 3,
    id: m[2],
    text: m[3].replace(/<[^>]+>/g, '').replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/&quot;/g, '"'),
  }))
}

export function TableOfContents({ content, hideTitle = false }: TableOfContentsProps) {
  const headings = parseHeadings(content)
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? '')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (headings.length === 0) return

    observerRef.current?.disconnect()

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      // Pick the topmost visible heading
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible.length > 0) setActiveId(visible[0].target.id)
    }

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: '-80px 0px -60% 0px',
      threshold: 0,
    })

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observerRef.current!.observe(el)
    })

    return () => observerRef.current?.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content])

  if (headings.length === 0) return null

  return (
    <nav aria-label="Table of contents">
      {!hideTitle && (
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
          Contents
        </p>
      )}
      <ul className="space-y-1">
        {headings.map(({ id, text, level }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
                setActiveId(id)
              }}
              className={[
                'block py-1 text-sm leading-snug transition-colors',
                level === 3 ? 'pl-3' : '',
                activeId === id
                  ? 'text-primary-400 font-medium'
                  : 'text-gray-500 hover:text-gray-300',
              ].join(' ')}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
