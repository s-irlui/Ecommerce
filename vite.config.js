import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      react: fileURLToPath(new URL("./node_modules/react", import.meta.url)),
      "react-dom": fileURLToPath(new URL("./node_modules/react-dom", import.meta.url))
    },
    dedupe: ["react", "react-dom"]
  },
  server: {
    port: 5173,
    proxy: {
      "/products": {
        target: "http://localhost:3002",
        changeOrigin: true,
        secure: false
      }
    }
  }
})
