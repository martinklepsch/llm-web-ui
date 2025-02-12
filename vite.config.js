// @ts-check
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';


// https://astro.build/config
export default {
    plugins: [tailwindcss(), react(), tsconfigPaths()]
};