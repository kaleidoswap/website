import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    projects: [
      // UI tests: jsdom plus the DOM stubs in src/test/setup.ts.
      {
        extends: true,
        test: {
          name: 'app',
          environment: 'jsdom',
          setupFiles: ['./src/test/setup.ts'],
          include: ['src/**/*.{test,spec}.{ts,tsx}'],
        },
      },
      // Worker tests: no DOM, and none of the browser stubs — they exercise
      // request handling and Web Crypto against the runtime's own globals.
      {
        extends: true,
        test: {
          name: 'worker',
          environment: 'node',
          include: ['worker/**/*.{test,spec}.ts'],
        },
      },
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        'src/main.tsx',
        'src/vite-env.d.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
