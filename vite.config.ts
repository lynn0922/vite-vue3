const path = require('path')
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'

export default defineConfig({
    plugins: [
        vue(),
        styleImport({
            libs: [
                {
                    libraryName: 'element-plus',
                    esModule: true,
                    ensureStyleFile: true,
                    resolveStyle: (name) => {
                        name = name.slice(3)
                        return `element-plus/packages/theme-chalk/src/${name}.scss`
                    },
                    resolveComponent: (name) => {
                        return `element-plus/lib/${name}`
                    }
                }
            ]
        })
    ],
    css: {
        preprocessorOptions: {
            scss: {
                //全局引入scss
                additionalData: `@import "./src/assets/styles/global.scss"; ` //scss文件路径
            }
        }
    },
    resolve: {
        alias: {
            // 配置别名
            '@': path.resolve(__dirname, './src')
        }
    }
    // server: {
    //     open: false,
    //     https: false,
    //     proxy: {
    //         '/': {
    //             target: 'http://union.vip.com',
    //             changeOrigin: true,
    //             ws: false,
    //             secure: false,
    //             ignorePath: true
    //         }
    //     }
    // }
})
