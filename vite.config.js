import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '0.0.0.0', // Esto permite conexiones externas
    port: 5173,       // Asegúrate de que coincida con el puerto del túnel
    strictPort: true, // Mantiene el puerto si está en uso
  }
})
