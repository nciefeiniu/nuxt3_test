// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  css: ['@/assets/css/index.css'],
  app: {
    head: {
      title: process.env.WEB_NAME || '负责任采购网',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, user-scalable=0',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'keywords',
        },
        {
          hid: 'description',
          name: 'description',
          content: 'description',
        },
      ],
      link: [],
      script: [],
    }
  },
  devtools: { enabled: false },
  vite: {
    vue: {
      customElement: true
    },
    vueJsx: {
      mergeProps: true
    },
    build: {
      minify: 'terser',
      extractCSS: true,
      cssCodeSplit: true,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    }
  },
  modules: [
    '@element-plus/nuxt',
  ],
  runtimeConfig: {
    public: {
      // baseURL: process.env.BASE_URL || 'http://www.cow66.buzz:8080'
    }
  },
  nitro: {
    devProxy: {
        '/api/**': {
            target: process.env.API_URL + '/api/**',
            changeOrigin: true
        }
    },
    // 该配置用于服务端请求转发
    routeRules: {
      '/api/**': {
        proxy: process.env.API_URL + '/api/**'
      }
    }
}
})
