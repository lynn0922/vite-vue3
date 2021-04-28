import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const isDev = () => process.env.NODE_ENV === 'development'

export default defineConfig({
    plugins: [vue()],
    build: {
        target: 'es2015',
        brotliSize: false,
        sourcemap: isDev() ? true : false,
        terserOptions: {
            compress: {
                drop_console: isDev() ? false : true,
                drop_debugger: isDev() ? false : true
            }
        },
        chunkSizeWarningLimit: 1500
    },
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
    },
    server: {
        open: true,
        https: false,
        proxy: {
            '/vsp': {
                target: '',
                changeOrigin: true,
                headers: {
                    Cookie: ''
                }
                // ws: false,
                // secure: false,
                // ignorePath: true,
            }
        }
    }
})
