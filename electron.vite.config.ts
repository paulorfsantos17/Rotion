import path from 'node:path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import tsConfigPathsPlugin from 'vite-tsconfig-paths'

const tsConfigPaths = tsConfigPathsPlugin({
  projects: [path.resolve('tsconfig.json')],
})

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin(), tsConfigPaths],
    publicDir: path.resolve('public'),
  },
  preload: {
    plugins: [externalizeDepsPlugin(), tsConfigPaths],
  },
  renderer: {
    define: {
      'process.platform': JSON.stringify(process.platform),
    },
    css: {
      postcss: {
        plugins: [
          tailwindcss({
            config: './src/renderer/tailwind.config.js',
          }),
        ],
      },
    },
    resolve: {
      alias: {
        '@renderer': path.resolve('src/renderer/src'),
      },
    },
    plugins: [react(), tsConfigPaths],
  },
})
