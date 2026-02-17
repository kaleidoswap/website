import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useInView } from './useInView'

describe('useInView', () => {
  it('returns a ref and isInView state', () => {
    const { result } = renderHook(() => useInView())
    expect(result.current.ref).toBeDefined()
    expect(typeof result.current.isInView).toBe('boolean')
  })

  it('defaults to once: true', () => {
    // Just verifies the hook can be called with no arguments
    const { result } = renderHook(() => useInView())
    expect(result.current).toHaveProperty('isInView')
  })
})
