import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/skymaxxtv-pro-tips/', // UPDATE THIS to match the new repo name
})