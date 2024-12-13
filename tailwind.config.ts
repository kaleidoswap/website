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
        sans: ['Mulish', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
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
            maxWidth: '65ch',
            color: 'white',
            h1: {
              color: 'white',
            },
            h2: {
              color: 'white',
            },
            strong: {
              color: 'white',
            },
            a: {
              color: 'rgb(56, 189, 248)',
              '&:hover': {
                color: 'rgb(14, 165, 233)',
              },
            },
          },
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config