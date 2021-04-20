const path = require("path");

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'


// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `$injectedColor: orange;` // 全局变量
      }
    }
  },
  // 引入第三方的配置
  optimizeDeps: {
    include: ["element-plus", "axios"]
  },
  plugins: [
    vue(),
    styleImport({
      libs: [{
        libraryName: 'element-plus',
        esModule: true,
        ensureStyleFile: true,
        resolveStyle: (name) => {
          name = name.slice(3)
          return `element-plus/packages/theme-chalk/src/${name}.scss`;
        },
        resolveComponent: (name) => {
          return `element-plus/lib/${name}`;
        },
      }]
    }),
  ],
  resolve: {
    alias: {
      // 路径映射必须以/开头和结尾
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `js/[name].js`,   // works
        chunkFileNames: `js/[name].js`,   // works
        assetFileNames: `[name].[ext]` // does not work for images
      }
    }
  }
})
