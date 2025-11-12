import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import svgr from "vite-plugin-svgr";
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import fs from 'fs';

const __dirname = import.meta.dirname;


export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      experimental: {
        nonNestedRoutes: true,
      },
    }),
    react(), 
    svgr(), 
  ],
  server: {
    https: {
      key: fs.readFileSync("e:\\Studia_Teleinformatyka_2022_2023\\Praca_inżynierska\\Cert\\localhost-key.pem"),
      cert: fs.readFileSync("e:\\Studia_Teleinformatyka_2022_2023\\Praca_inżynierska\\Cert\\localhost.pem")
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
