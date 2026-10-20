import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  plugins: [react()],
  build: {
    outDir: 'offline-dist',
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: 'src/main.jsx',
      name: 'JingjuOperaSite',
      formats: ['iife'],
      fileName: () => 'jingju-site.js',
      cssFileName: 'jingju-site',
    },
  },
})
