// tailwind.config.ts
import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          450: '#3dd675',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        'background-dark': '#0d1117',
        'surface-dark': '#161b22',
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#00E5B8',
          600: '#00c9a0',
          700: '#00a888',
          800: '#008770',
          900: '#006658',
        },
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        secondary: {
          50: '#f5f3ff',
          100: '#ede8ff',
          200: '#dcd5ff',
          300: '#c3b4fe',
          400: '#a78bfc',
          500: '#8a5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        bitcoin: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#0d1117',
        },
        navbar: '#1f2937',
        background: '#1f2937',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            // ── measure & body rhythm ──
            maxWidth: '68ch',
            fontSize: '1.0625rem', // 17px
            lineHeight: '1.75',
            color: 'rgb(226 232 240)', // slate-200: softer than pure white for long-form
            p: {
              marginTop: '1.25em',
              marginBottom: '1.25em',
            },
            // gentle lede: the opening paragraph reads slightly larger
            '> p:first-of-type': {
              fontSize: '1.125em',
              lineHeight: '1.7',
              color: 'rgb(203 213 225)', // slate-300
            },

            // ── headings: tight tracking, room above, anchor offset ──
            'h2, h3, h4': {
              color: 'white',
              scrollMarginTop: '7rem', // TOC anchor jumps clear the fixed navbar
            },
            h1: { color: 'white' },
            h2: {
              fontSize: '1.5em',
              fontWeight: '700',
              letterSpacing: '-0.02em',
              lineHeight: '1.3',
              marginTop: '2.4em',
              marginBottom: '0.9em',
              paddingBottom: '0.4em',
              borderBottomWidth: '1px',
              borderBottomColor: 'rgba(255,255,255,0.08)',
            },
            h3: {
              fontSize: '1.2em',
              fontWeight: '600',
              letterSpacing: '-0.01em',
              marginTop: '2em',
              marginBottom: '0.75em',
            },
            strong: { color: 'white' },

            // ── links: brand green, visible but calm ──
            a: {
              color: 'rgb(74 222 128)', // primary-400
              fontWeight: '500',
              textDecoration: 'underline',
              textDecorationColor: 'rgba(74,222,128,0.35)',
              textUnderlineOffset: '3px',
              transition: 'color 150ms, text-decoration-color 150ms',
              '&:hover': {
                color: 'rgb(134 239 172)', // primary-300
                textDecorationColor: 'rgba(134,239,172,0.7)',
              },
            },

            // ── inline code: chip, no decorative backticks ──
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            code: {
              color: 'rgb(134 239 172)', // primary-300
              backgroundColor: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '0.375rem',
              padding: '0.125em 0.375em',
              fontSize: '0.875em',
              fontWeight: '500',
            },

            // ── code blocks: panel, scroll contained ──
            pre: {
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '0.75rem',
              padding: '1.25rem 1.5rem',
              fontSize: '0.875em',
              lineHeight: '1.7',
              marginTop: '1.75em',
              marginBottom: '1.75em',
            },
            'pre code': {
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '0',
              padding: '0',
              color: 'rgb(226 232 240)',
              fontSize: '1em',
              fontWeight: '400',
            },

            // ── lists: brand markers, breathing room ──
            'ul > li::marker': { color: 'rgb(74 222 128)' },
            'ol > li::marker': { color: 'rgb(148 163 184)' },
            li: {
              marginTop: '0.5em',
              marginBottom: '0.5em',
            },

            // ── blockquote: green spine, quiet tint ──
            blockquote: {
              fontStyle: 'normal',
              fontWeight: '400',
              color: 'rgb(203 213 225)',
              borderLeftWidth: '3px',
              borderLeftColor: 'rgb(74 222 128)',
              backgroundColor: 'rgba(74,222,128,0.05)',
              borderRadius: '0 0.5rem 0.5rem 0',
              padding: '0.75em 1.25em',
              quotes: 'none',
            },

            // ── images & captions ──
            img: {
              borderRadius: '0.75rem',
              border: '1px solid rgba(255,255,255,0.08)',
              marginTop: '2em',
              marginBottom: '0.75em',
            },
            // an <em> sharing a paragraph with an image = its caption
            'p:has(> img) > em': {
              display: 'block',
              textAlign: 'center',
              fontSize: '0.8125em',
              lineHeight: '1.6',
              color: 'rgb(148 163 184)', // slate-400
              marginTop: '0.875em',
            },
            // caption authored as its own italic paragraph after the image
            'p:has(> img) + p:has(> em:only-child)': {
              textAlign: 'center',
              fontSize: '0.8125em',
              lineHeight: '1.6',
              color: 'rgb(148 163 184)',
              marginTop: '0',
              marginBottom: '2.5em',
            },

            // ── misc ──
            hr: {
              borderColor: 'rgba(255,255,255,0.1)',
              marginTop: '3em',
              marginBottom: '3em',
            },
            thead: {
              borderBottomColor: 'rgba(255,255,255,0.15)',
            },
            'thead th': { color: 'white' },
            'tbody tr': {
              borderBottomColor: 'rgba(255,255,255,0.08)',
            },
          },
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(14, 157, 255, 0.15)',
        'glow-lg': '0 0 30px rgba(14, 157, 255, 0.2)',
        'glow-bitcoin': '0 0 20px rgba(245, 158, 11, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 8s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'scroll-logos': 'scroll-logos 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        shimmer: {
          '0%': {
            transform: 'translateX(-100%)'
          },
          '100%': {
            transform: 'translateX(100%)'
          },
        },
        'scroll-logos': {
          '0%': {
            transform: 'translateX(0)'
          },
          '100%': {
            transform: 'translateX(-33.333%)'
          },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-pattern': '20px 20px',
      },
    },
  },
  plugins: [typography],
} satisfies Config