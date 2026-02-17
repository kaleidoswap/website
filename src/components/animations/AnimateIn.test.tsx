import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/test-utils'
import { AnimateIn } from './AnimateIn'

describe('AnimateIn', () => {
  it('renders children', () => {
    render(
      <AnimateIn>
        <p>Hello world</p>
      </AnimateIn>
    )
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <AnimateIn className="my-class">
        <p>Content</p>
      </AnimateIn>
    )
    expect(screen.getByText('Content').parentElement).toHaveClass('my-class')
  })

  it('becomes visible when in view (mock observer triggers)', () => {
    render(
      <AnimateIn variant="fade-up">
        <p>Animated content</p>
      </AnimateIn>
    )
    const wrapper = screen.getByText('Animated content').parentElement!
    // IntersectionObserver mock auto-triggers as intersecting
    expect(wrapper.style.opacity).toBe('1')
    expect(wrapper.style.transform).toBe('translateY(0)')
  })

  it('applies transition styles', () => {
    render(
      <AnimateIn variant="fade-left" delay={200} duration={500}>
        <p>Sliding</p>
      </AnimateIn>
    )
    const wrapper = screen.getByText('Sliding').parentElement!
    expect(wrapper.style.transition).toContain('500ms')
    expect(wrapper.style.transition).toContain('200ms')
  })
})
