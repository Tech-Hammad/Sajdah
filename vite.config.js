import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: "/Sajdah/", 
  plugins: [
    tailwindcss(),
    react({
      plugins: [['babel-plugin-react-compiler']],
    }),
  ],
})