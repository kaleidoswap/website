import { type ReactNode } from 'react'
import { Link2 } from 'lucide-react'

/**
 * A section heading that doubles as a shareable link target.
 *
 * Pair it with `id` + `scroll-mt-24` on the enclosing <section>, matching the
 * convention already used across the product pages. `ScrollToTop` resolves the
 * target on cold deep links, where the lazy-loaded route mounts late.
 *
 * `id` is always passed explicitly, never derived from the heading text: headings
 * go through t(), so a derived slug would change per locale and break shared links.
 *
 * The link icon is absolutely positioned so it takes no space in the flow — every
 * heading keeps the exact layout it had before, centred ones included.
 */
export const AnchorHeading = ({
  id,
  className = '',
  children,
}: {
  id: string
  /** The heading's own typography/spacing classes, passed through untouched. */
  className?: string
  children: ReactNode
}) => (
  <h2 className={className}>
    <a
      href={`#${id}`}
      className="group relative inline-flex items-center hover:text-primary-400 transition-colors"
    >
      {children}
      <Link2
        className="absolute -right-[1.1em] w-[0.55em] h-[0.55em] shrink-0 text-primary-400 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity"
        aria-hidden="true"
      />
    </a>
  </h2>
)
