import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['**/*.ts', '**/*.vue'],
      outDir: './dist',
      rollupTypes: false
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname)
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      formats: ['es'],
      fileName: 'index'
    },
    rollupOptions: {
      external: [
        'vue',
        'vue-router',
        'element-plus',
        '@element-plus/icons-vue',
        '@iconify/vue',
        '@iconify-icons/ep',
        'pinia',
        'axios',
        'qiankun',
        'socket.io-client',
        'fsevents',
        'sass-embedded',
        'node:fs',
        'node:path',
        'node:url',
        /node_modules/
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: '.'
      }
    }
  }
})
