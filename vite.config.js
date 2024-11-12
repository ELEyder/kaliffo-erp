import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@C': path.resolve(__dirname, 'src/Components'),
      '@V': path.resolve(__dirname, 'src/Views'),
      '@A': path.resolve(__dirname, 'src/API'),
    },
  },
})
