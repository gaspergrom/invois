require('dotenv').config();

export default {
  ssr: false,
  head: {
    title: 'Invois',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'theme-color', content: '#ffffff' },
      { name: 'msapplication-TileImage', content: `/icons/app/ms-icon-144x144.png` },
    ],
    link: [
      { rel: 'icon', href: `/icons/app/favicon.ico` },
      { rel: 'apple-touch-icon', sizes: '57x57', href: `/icons/app/apple-icon-57x57.png` },
      { rel: 'apple-touch-icon', sizes: '60x60', href: `/icons/app/apple-icon-60x60.png` },
      { rel: 'apple-touch-icon', sizes: '72x72', href: `/icons/app/apple-icon-72x72.png` },
      { rel: 'apple-touch-icon', sizes: '76x76', href: `/icons/app/apple-icon-76x76.png` },
      { rel: 'apple-touch-icon', sizes: '114x114', href: `/icons/app/apple-icon-114x114.png` },
      { rel: 'apple-touch-icon', sizes: '120x120', href: `/icons/app/apple-icon-120x120.png` },
      { rel: 'apple-touch-icon', sizes: '144x144', href: `/icons/app/apple-icon-144x144.png` },
      { rel: 'apple-touch-icon', sizes: '152x152', href: `/icons/app/apple-icon-152x152.png` },
      { rel: 'apple-touch-icon', sizes: '180x180', href: `/icons/app/apple-icon-180x180.png` },
      { rel: 'icon', sizes: '192x192', href: `/icons/app/favicon-192x192.png` },
      { rel: 'icon', sizes: '32x32', href: `/icons/app/favicon-32x32.png` },
      { rel: 'icon', sizes: '96x96', href: `/icons/app/favicon-96x96.png` },
      { rel: 'icon', sizes: '16x16', href: `/icons/app/favicon-16x16.png` },
    ],
  },

  loading: {
    color: '#FFFFFF',
    height: '2px',
    duration: 5000,
  },

  loadingIndicator: {
    name: 'circle',
    color: '#FFFFFF',
  },

  css: [
    '@/assets/styles/main.scss',
  ],

  plugins: [
    '~/plugins/vuelidate.ts',
    '~/plugins/axios.js',
    '~/plugins/global.ts',
    '~/plugins/userback.js',
    '~/plugins/sanitize.ts',
  ],

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/router-extras',
    '@nuxtjs/sentry',
  ],

  axios: {
    proxy: true,
  },

  build: {
    babel: {
      plugins: [[
        'babel-plugin-istanbul', {
          exclude: [
            '.nuxt',
            'cypress',
            'coverage',
            'plugins',
          ],
          extension: [
            '.js',
            '.vue',
          ],
        },
      ]],
    },
  },

  dev: process.env.NODE_ENV === 'DEV',

  env: {
    apiUrl: process.env.API_URL || '/api/',
  },

  proxy: {
    '/api': {
      target: 'http://localhost:9090',
      pathRewrite: {
        '^/api': '',
      },
    },
  },


  vue: {
    config: {
      runtimeCompiler: true,
      devServer: {
        disableHostCheck: true,
        proxy: {
          '/api': {
            target: 'http://localhost:9090',
            pathRewrite: {
              '^/api': '',
            },
          },
        },
      },
    },
  },

  storybook: {
    stories: [
      '~/stories/**/*.stories.js',
    ],
    port: 9010,
  },

  presets: [
    [
      '@vue/app',
      {
        useBuiltIns: false,
        jsx: false,
      },
    ],
  ],
};
