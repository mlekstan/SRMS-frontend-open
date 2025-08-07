import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import svgr from "vite-plugin-svgr";
import { tanstackRouter } from '@tanstack/router-plugin/vite'

const __dirname = import.meta.dirname;


export default defineConfig({
  plugins: [
    react(), 
    svgr(), 
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
