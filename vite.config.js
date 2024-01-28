import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://lepnoxic.github.io/exodus-project/",
  plugins: [react()],
})
