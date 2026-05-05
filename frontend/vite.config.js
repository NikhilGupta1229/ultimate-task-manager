import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: true
  },
  preview: {
    host: true,
    port: process.env.PORT,
    allowedHosts: [
      "ultimate-task-manager-production-23be.up.railway.app"
    ]
  }
})