import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Simple Plan',
    title: 'Simple Plan',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fredoka&display=swap'},
      { rel: 'icon', href: "https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp" },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    defaultAssets: false,
    font: {
      family: 'Fredoka'
    },
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#546e7a',
          primaryLight: '#819ca9',
          primaryDark: '#29434e',
          secondary: '#6a1b9a',
          secondaryLight: '#9c4dcc',
          secondaryDark: '#38006b',
          primaryText: '#d84315',
          secondaryText: '#fafafa',
          info: colors.teal.lighten1,
          success: colors.green.darken3,
          caution: colors.red.darken3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  serverMiddleware: [
    {
      path: '/api',
      handler: '~/api/server.js'
    }
  ],

  auth: {
    strategies: {
      local: {
        // token: {
        //   property: 'token',
        //   global: true,
        //   // required: true,
        //   // type: 'Bearer'
        // },
        // user: {
        //   property: 'user',
        //   autoFetch: true
        // },
        endpoints: {
          login: { url: '/api/authentication/login', method: 'put', propertyName: 'user' },
          logout: { url: '/api/authentication/logout', method: 'put' },
          user: {url: '/api/accounts/', method: 'get', propertyName: 'user'}
        }
      }
    }
  }
}
