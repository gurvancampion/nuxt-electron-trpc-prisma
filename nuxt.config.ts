import vuetify from 'vite-plugin-vuetify'
import { withElectron } from 'nuxt-plugin-electron'

// https://nuxt.com/docs/api/configuration/nuxt-config
const nuxtConfig = defineNuxtConfig({
  ssr: false,
  vite: {
    server: {
      middlewareMode: false,
    },
  },
  modules: [
    async (options, nuxt) => {
      // @ts-expect-error: remove ts error
      nuxt.hooks.hook('vite:extendConfig', config => config.plugins.push(
        vuetify(),
      ))
    },
  ],
  build: {
    transpile: ['vuetify'],
  },
})

export default withElectron({
  include: ['electron', 'server'],
})(nuxtConfig)
