import { useState, useMemo, useRef, useEffect } from 'react'
import { SlidersHorizontal, ArrowUpDown, Check } from 'lucide-react'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/footer/Footer'
import { SEO } from '@/components/common/SEO'
import { footerConfig } from '@/constants/footer'
import { getAllPosts } from '../lib/posts'
import { BlogCard } from './BlogCard'

const CATEGORIES = ['All', 'Announcement', 'Deep Dive', 'Partnership', 'Release Notes'] as const

type SortKey = 'date-desc' | 'date-asc' | 'alpha'

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'date-desc', label: 'Most Recent' },
  { value: 'date-asc', label: 'Oldest First' },
  { value: 'alpha', label: 'A → Z' },
]

function IconDropdown({
  icon,
  children,
  align = 'right',
}: {
  icon: React.ReactNode
  children: (close: () => void) => React.ReactNode
  align?: 'left' | 'right'
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`p-2 rounded-lg border transition-colors ${
          open
            ? 'bg-primary-500/20 border-primary-400/50 text-primary-300'
            : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/25 hover:text-white'
        }`}
      >
        {icon}
      </button>

      {open && (
        <div
          className={`absolute mt-2 w-44 rounded-xl border border-white/10 bg-gray-900/95 backdrop-blur-sm shadow-xl z-20 overflow-hidden ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  )
}

export function BlogList() {
  const allPosts = getAllPosts()
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [sort, setSort] = useState<SortKey>('date-desc')

  const posts = useMemo(() => {
    const filtered =
      selectedCategory === 'All'
        ? allPosts
        : allPosts.filter((p) => p.tags.includes(selectedCategory))

    return [...filtered].sort((a, b) => {
      if (sort === 'date-desc') return new Date(b.date).getTime() - new Date(a.date).getTime()
      if (sort === 'date-asc') return new Date(a.date).getTime() - new Date(b.date).getTime()
      return a.title.localeCompare(b.title)
    })
  }, [allPosts, selectedCategory, sort])

  return (
    <div className="min-h-screen bg-background-dark text-white font-display">
      <SEO
        title="Blog"
        description="Insights, tutorials, and updates from the KaleidoSwap team. Learn about RGB protocol, Lightning Network swaps, and the KaleidoSDK."
        url="/blog"
        keywords={['blog', 'RGB', 'Lightning', 'Bitcoin', 'DEX', 'SDK', 'KaleidoSwap']}
      />

      <div
        className="fixed inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(75% 75% at 80% 10%, rgba(14,157,255,0.08) 0%, transparent 100%), radial-gradient(75% 75% at 20% 90%, rgba(138,92,246,0.08) 0%, transparent 100%)',
        }}
      />

      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-20 relative z-10">

        {/* Header row: title | spacer | filter icon | sort icon */}
        <div className="flex items-center gap-3 mb-10">
          <h1 className="text-4xl font-bold text-white flex-1">Blog</h1>

          {/* Filter by category */}
          <IconDropdown icon={<SlidersHorizontal className="w-4 h-4" />} align="right">
            {(close) => (
              <>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); close() }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                      cat === selectedCategory
                        ? 'text-primary-300 bg-primary-500/10'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {cat}
                    {cat === selectedCategory && <Check className="w-3.5 h-3.5 text-primary-400" />}
                  </button>
                ))}
              </>
            )}
          </IconDropdown>

          {/* Sort order */}
          <IconDropdown icon={<ArrowUpDown className="w-4 h-4" />} align="right">
            {(close) => (
              <>
                {SORT_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    onClick={() => { setSort(o.value); close() }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                      o.value === sort
                        ? 'text-primary-300 bg-primary-500/10'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {o.label}
                    {o.value === sort && <Check className="w-3.5 h-3.5 text-primary-400" />}
                  </button>
                ))}
              </>
            )}
          </IconDropdown>
        </div>

        {/* Grid */}
        {posts.length === 0 ? (
          <div className="glass-card rounded-2xl p-10 text-center">
            <p className="text-gray-400">No posts in this category yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </main>

      <Footer {...footerConfig} />
    </div>
  )
}
