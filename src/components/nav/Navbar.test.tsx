import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/test-utils'
import userEvent from '@testing-library/user-event'
import { Navbar } from './Navbar'

describe('Navbar', () => {
  it('renders the skip-to-content link', () => {
    render(<Navbar />)
    const skipLink = screen.getByText('Skip to main content')
    expect(skipLink).toBeInTheDocument()
    expect(skipLink).toHaveAttribute('href', '#main-content')
  })

  it('renders navigation with proper ARIA role', () => {
    render(<Navbar />)
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', 'Main navigation')
  })

  it('renders the logo link', () => {
    render(<Navbar />)
    const logo = screen.getByAltText('KaleidoSwap - Home')
    expect(logo).toBeInTheDocument()
  })

  it('renders Products dropdown button', () => {
    render(<Navbar />)
    const productsBtn = screen.getByRole('button', { name: /products/i })
    expect(productsBtn).toHaveAttribute('aria-expanded', 'false')
    expect(productsBtn).toHaveAttribute('aria-haspopup', 'true')
  })

  it('toggles Products dropdown on click', async () => {
    const user = userEvent.setup()
    render(<Navbar />)

    const productsBtn = screen.getByRole('button', { name: /products/i })
    await user.click(productsBtn)
    expect(productsBtn).toHaveAttribute('aria-expanded', 'true')

    const menu = screen.getByRole('menu')
    expect(menu).toBeInTheDocument()
  })

  it('closes Products dropdown on Escape key', async () => {
    const user = userEvent.setup()
    render(<Navbar />)

    const productsBtn = screen.getByRole('button', { name: /products/i })
    await user.click(productsBtn)
    expect(productsBtn).toHaveAttribute('aria-expanded', 'true')

    await user.keyboard('{Escape}')
    expect(productsBtn).toHaveAttribute('aria-expanded', 'false')
  })

  it('renders Launch App button', () => {
    render(<Navbar />)
    const launchBtns = screen.getAllByRole('button', { name: /launch app/i })
    expect(launchBtns.length).toBeGreaterThanOrEqual(1)
  })
})
