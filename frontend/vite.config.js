import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from "dotenv";

dotenv.config({ path: '../.env' });

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        /**
         * This will be the prefix for /api
         * For example: /api/products will be http://localhost:5000/api/products
         */
        target: process.env.VITE_API_URL
      }
    }
  }
})
