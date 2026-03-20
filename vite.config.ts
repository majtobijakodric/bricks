import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/bricks/',
  plugins: [tailwindcss()],
  build: {
    outDir: 'docs',
  }
})
