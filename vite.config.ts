/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: ['es2020'],
    sourcemap: false
  },
  resolve: {
    mainFields: ['module'],
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
