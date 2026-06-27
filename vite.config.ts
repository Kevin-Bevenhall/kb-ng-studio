/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: ['es2020'],
    sourcemap: false
  },
  resolve: {
    mainFields: ['module'],
    tsconfigPaths: true
  },
  plugins: [
    analog({
      inlineStylesExtension: 'scss',
      ssr: false,
      prerender: {
        routes: []
      }
    }),
  ]
}));
