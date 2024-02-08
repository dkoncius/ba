import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Specify the host
    port:  3000, // Specify the port
    open: true, // Automatically open the browser when the server starts
  },
})
