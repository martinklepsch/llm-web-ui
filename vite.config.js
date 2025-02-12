// @ts-check
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from "vite-plugin-svgr";


// https://astro.build/config
export default {
  build: {
    chunkSizeWarningLimit: 1000
  },
  plugins: [tailwindcss(), react(), svgr(), tsconfigPaths()]
};