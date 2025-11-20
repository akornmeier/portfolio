import Particles from '@tsparticles/vue3'
import { loadSlim } from '@tsparticles/slim'

export default defineNuxtPlugin(async (nuxtApp) => {
  nuxtApp.vueApp.use(Particles, {
    init: async (engine) => {
      await loadSlim(engine)
    },
  })
})
