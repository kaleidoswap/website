import { useState, useMemo } from 'react'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/footer/Footer'
import { SEO } from '@/components/common/SEO'
import { footerConfig } from '@/constants/footer'
import { getAllPosts } from '../lib/posts'
import { BlogCard } from './BlogCard'

const CATEGORIES = ['Announcement', 'Deep Dive', 'Partnership', 'Release Notes'] as const

type SortKey = 'date-desc' | 'date-asc' | 'alpha'

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'date-desc', label: 'Most Recent' },
  { value: 'date-asc', label: 'Oldest First' },
  { value: 'alpha', label: 'A → Z' },
]

export function BlogList() {
  const allPosts = getAllPosts()
  const [selected, setSelected] = useState<string[]>([])
  const [sort, setSort] = useState<SortKey>('date-desc')

  const toggleCategory = (cat: string) => {
    setSelected((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  const posts = useMemo(() => {
    const filtered =
      selected.length === 0
        ? allPosts
        : allPosts.filter((p) => p.tags.some((t) => selected.includes(t)))

    return [...filtered].sort((a, b) => {
      if (sort === 'date-desc') return new Date(b.date).getTime() - new Date(a.date).getTime()
      if (sort === 'date-asc') return new Date(a.date).getTime() - new Date(b.date).getTime()
      return a.title.localeCompare(b.title)
    })
  }, [allPosts, selected, sort])

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

        {/* Header row: title | categories | sort */}
        <div className="flex flex-wrap items-center gap-4 mb-10">

          {/* Title */}
          <h1 className="text-4xl font-bold text-white shrink-0">Blog</h1>

          {/* Category chips — centered */}
          <div className="flex flex-1 justify-center">
            <div className="flex flex-wrap gap-2 justify-center">
              {/* All chip */}
              <button
                onClick={() => setSelected([])}
                className={`rounded-full px-3.5 py-1 text-sm font-medium border transition-colors ${
                  selected.length === 0
                    ? 'bg-primary-500/25 text-primary-300 border-primary-400/60'
                    : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/25 hover:text-white'
                }`}
              >
                All
              </button>

              {CATEGORIES.map((cat) => {
                const active = selected.includes(cat)
                return (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`rounded-full px-3.5 py-1 text-sm font-medium border transition-colors ${
                      active
                        ? 'bg-primary-500/25 text-primary-300 border-primary-400/60'
                        : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/25 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Sort — right */}
          <div className="shrink-0">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="bg-white/5 border border-white/10 text-gray-300 text-sm rounded-lg px-3 py-1.5 outline-none hover:border-white/25 focus:border-primary-400/60 transition-colors cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} className="bg-gray-900">
                  {o.label}
                </option>
              ))}
            </select>
          </div>
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
