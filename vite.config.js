import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/v1/users": "http://localhost:8080",
      "/api/v1/chats": "http://localhost:8080",
      "/api/v1/group": "http://localhost:8080",
    },
  },
});
