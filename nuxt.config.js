import customize from './configs/customize'

export default {
  /*
  ** Headers of the page
  */
  head: {
    title: customize.title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: customize.description },
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Great+Vibes|Quicksand' },
    ],
  },
  /*
  ** Global CSS
  */
  css: [
    '@mdi/font/css/materialdesignicons.min.css',
    'vuetify/dist/vuetify.min.css',
  ],
  /*
  ** Add axios globally
  */
  build: {
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },
  },
  plugins: [
    '~/plugins/axios',
    '~/plugins/vuetify',
  ],
  serverMiddleware: [
    // API middleware
    '~/api/index.js',
  ],
}
