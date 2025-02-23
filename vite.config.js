import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    allowedHosts: ["d93a-2400-adc5-401-7500-7c42-3423-5bbf-2899.ngrok-free.app"]
  },
  plugins: [react()],
})
