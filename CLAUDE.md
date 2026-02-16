# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

KaleidoSwap landing page - a React/TypeScript website for a Bitcoin Lightning Network trading platform. The site is multilingual and deployed to Cloudflare Workers.

## Development Commands

### Core Commands
```bash
npm run dev           # Start development server on http://localhost:5173
npm run build         # Build for production (includes TypeScript compilation)
npm run preview       # Preview production build locally
npm run lint          # Run ESLint on all files
```

### Testing
```bash
npm run test          # Run tests in watch mode
npm run test:run      # Run tests once
npm run test:coverage # Run tests with coverage report
```

### Internationalization
```bash
npm run i18n:sync     # Extract translation keys from source and sync to all locale files
```

## Architecture

### Path Alias
- `@/` maps to `./src/`
- Used consistently throughout the codebase
- Configured in both `vite.config.ts` and `tsconfig.json`

### Directory Structure
- `/src/components/home/` - Home page section components (Hero, Features, Products, etc.)
- `/src/components/common/` - Reusable UI components (Button, Logo, SEO, LanguageSwitcher)
- `/src/components/animations/` - Animation components using react-bits library
- `/src/pages/` - Route page components (Home, Products, Downloads, etc.)
- `/src/pages/products/` - Product-specific pages (WebApp, Desktop, SDK)
- `/src/constants/` - Static data and configuration
- `/src/types/` - TypeScript type definitions
- `/src/i18n/` - i18next configuration
- `/src/test/` - Test utilities and setup files
- `/public/locales/{lang}/translation.json` - Translation files for each language

### Routing
- Uses React Router v7 with lazy-loaded routes
- All pages are code-split for optimal performance
- Route definitions in `src/App.tsx`
- Each page includes SEO metadata via the `SEO` component

### Internationalization (i18n)
- **Supported languages**: English (en), Spanish (es), Italian (it), Chinese (zh), German (de), French (fr), Japanese (ja)
- **Key pattern**: Flat keys with no nesting (keySeparator: false, nsSeparator: false)
- **Usage**: Import `useTranslation` hook and call `t('key')` with flat key strings
- **Translation sync**: After adding new translation keys, run `npm run i18n:sync` to extract keys and update all locale files
- **Storage**: Language preference stored in localStorage as `kaleidoswap_locale`
- **Detection**: Automatically detects browser language or uses stored preference

### Styling
- Tailwind CSS for utility-first styling
- Custom Tailwind configuration in `tailwind.config.ts`
- Global styles in `src/index.css`
- Uses `tailwind-merge` for conditional class merging (via `lib/utils.ts`)

### Testing
- **Framework**: Vitest with jsdom environment
- **Libraries**: @testing-library/react, @testing-library/user-event, @testing-library/jest-dom
- **Setup**: Test setup in `src/test/setup.ts`
- **Mock i18n**: i18n mocked in `src/test/i18n-mock.ts` for testing
- **Location**: Place test files next to source files with `.test.tsx` or `.spec.tsx` extension
- **Coverage**: Excludes node_modules, test files, type definitions, and main.tsx

## Development Patterns

### Adding New Translation Keys
1. Use translation keys in components: `t('key.name')`
2. Run `npm run i18n:sync` to extract keys and sync to all locale files
3. Update translations in `/public/locales/en/translation.json` (English source)
4. Non-English locales will show `[TODO]` prefix for new untranslated keys

### Component Organization
- Home page sections are split into individual components in `/components/home/`
- Reusable components go in `/components/common/`
- Each component should have corresponding TypeScript types in `/types/`
- Static data for components should be defined in `/constants/`

### Adding New Routes
1. Create page component in `/src/pages/`
2. Add lazy import in `src/App.tsx`
3. Add route definition in the Routes component
4. Include `<SEO />` component in the page for metadata

### Type Safety
- TypeScript strict mode enabled
- noUnusedLocals and noUnusedParameters enforced
- Types organized by feature area in `/src/types/`

## Deployment

- **Target**: Cloudflare Workers
- **Config**: `wrangler.jsonc`
- **Build output**: `dist/` directory
- **Worker**: `_worker.js` serves static assets
