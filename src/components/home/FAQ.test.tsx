import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/test-utils'
import userEvent from '@testing-library/user-event'
import { FAQ } from './FAQ'

describe('FAQ', () => {
  it('renders section heading', () => {
    render(<FAQ />)
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument()
  })

  it('renders all 8 FAQ items', () => {
    render(<FAQ />)
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(8)
  })

  it('all answers are hidden by default', () => {
    render(<FAQ />)
    const answers = screen.getAllByRole('button')
    answers.forEach((button) => {
      expect(button).toHaveAttribute('aria-expanded', 'false')
    })
  })

  it('expands an answer when clicked', async () => {
    const user = userEvent.setup()
    render(<FAQ />)

    const firstQuestion = screen.getAllByRole('button')[0]
    expect(firstQuestion).toHaveAttribute('aria-expanded', 'false')

    await user.click(firstQuestion)
    expect(firstQuestion).toHaveAttribute('aria-expanded', 'true')
  })

  it('collapses an answer when clicked again', async () => {
    const user = userEvent.setup()
    render(<FAQ />)

    const firstQuestion = screen.getAllByRole('button')[0]

    await user.click(firstQuestion)
    expect(firstQuestion).toHaveAttribute('aria-expanded', 'true')

    await user.click(firstQuestion)
    expect(firstQuestion).toHaveAttribute('aria-expanded', 'false')
  })

  it('only one answer is open at a time', async () => {
    const user = userEvent.setup()
    render(<FAQ />)

    const buttons = screen.getAllByRole('button')

    await user.click(buttons[0])
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true')

    await user.click(buttons[1])
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false')
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true')
  })
})
