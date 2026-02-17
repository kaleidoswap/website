import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'
import { render, screen } from '@/test/test-utils'

// Must import ErrorBoundary after mocking console.error
import { ErrorBoundary } from './ErrorBoundary'

const ThrowingComponent = () => {
  throw new Error('Test error')
}

describe('ErrorBoundary', () => {
  // Suppress console.error for expected errors
  const originalError = console.error
  beforeAll(() => {
    console.error = vi.fn()
  })
  afterAll(() => {
    console.error = originalError
  })

  it('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <div>Child content</div>
      </ErrorBoundary>
    )
    expect(screen.getByText('Child content')).toBeInTheDocument()
  })

  it('renders fallback UI when child throws', () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    )
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText('Go to Homepage')).toBeInTheDocument()
  })
})
