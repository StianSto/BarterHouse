import path, { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: path.resolve(__dirname, 'src'),
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    },
  },
  server: {
    port: 8080,
    hot: true,
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, './src/index.html'),
        listings: resolve(__dirname, './src/listings/index.html'),
        view_listing: resolve(__dirname, './src/listings/view/index.html'),
        edit_listing: resolve(__dirname, './src/listings/edit/index.html'),
        auth: resolve(__dirname, './src/auth/index.html'),
        profiles: resolve(__dirname, 'src/profiles/index.html'),
      },
    },
    outDir: '../dist',
    emptyOutDir: true,
  },
  // base: './',
});
