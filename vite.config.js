import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@C': path.resolve(__dirname, 'src/components'),
      '@CA': path.resolve(__dirname, 'src/components/administrativo'),
      '@CL': path.resolve(__dirname, 'src/components/logistico'),
      '@CP': path.resolve(__dirname, 'src/components/produccion'),
      '@CV': path.resolve(__dirname, 'src/components/ventas'),
      '@A': path.resolve(__dirname, 'src/API'),
      '@AA': path.resolve(__dirname, 'src/API/administrativo'),
      '@AL': path.resolve(__dirname, 'src/API/logistico'),
      '@AP': path.resolve(__dirname, 'src/API/produccion'),
      '@AV': path.resolve(__dirname, 'src/API/ventas'),
      '@S': path.resolve(__dirname, 'src/Shared'),
    },
  },
})
