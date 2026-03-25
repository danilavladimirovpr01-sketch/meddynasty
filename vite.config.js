import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  build: {
    target: 'es2018',
    rollupOptions: {
      output: {
        format: 'iife',
        entryFileNames: 'assets/app.js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
});
