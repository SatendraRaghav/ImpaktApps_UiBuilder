import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path"
import svgr from "vite-plugin-svgr"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    jsxImportSource: "@emotion/react",
  }),
  svgr()
],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@assets": resolve(__dirname, "src/assets"),
    },
  },
})
