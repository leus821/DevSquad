import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  esbuild: {
    jsx: 'automatic',
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/shared/lib/test-setup.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.js', 'src/**/*.jsx'],
      exclude: ['src/**/*.test.*', 'src/**/index.js'],
      reportOnFailure: true,
    },
  },
});
