import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), UnoCSS()],
  resolve: {
    alias: {
      '@ensol-test/frontend': path.resolve(__dirname, './src'),
    },
  },
});
