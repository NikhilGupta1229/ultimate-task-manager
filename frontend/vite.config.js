import { defineConfig } from 'vite'

export default defineConfig({
  preview: {
    host: true,
    port: process.env.PORT,
    allowedHosts: "all"
  }
})