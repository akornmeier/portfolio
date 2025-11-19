<script setup lang="ts">
const colorMode = useColorMode()

const color = computed(() => (colorMode.value === 'dark' ? '#020618' : 'white'))

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color },
  ],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'en',
  },
})

useSeoMeta({
  titleTemplate: '%s - Portfolio Site',
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/portfolio-light.png',
  twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/portfolio-light.png',
  twitterCard: 'summary_large_image',
})

const [{ data: navigation }, { data: files }] = await Promise.all([
  useAsyncData(
    'navigation',
    () => {
      return Promise.all([queryCollectionNavigation('blog')])
    },
    {
      transform: (data) => data.flat(),
    }
  ),
  useLazyAsyncData(
    'search',
    () => {
      return Promise.all([queryCollectionSearchSections('blog')])
    },
    {
      server: false,
      transform: (data) => data.flat(),
    }
  ),
])
</script>

<template>
  <div class="pointer-events-none fixed top-0 left-0 z-0 h-screen w-full overflow-hidden">
    <div class="ui-mx-auto ui-px-4 sm:ui-px-8 ui-max-w-8xl md:ui-px-8 relative h-full">
      <div
        class="absolute top-[-300px] -left-40 z-2 h-[500px] w-[500px] rounded-full bg-[radial-gradient(closest-side_at_50%_50%,rgba(255,71,133,1),rgba(255,71,133,0)),url('/home/texture.svg')] min-[600px]:h-[700px] min-[600px]:w-[700px] min-[960px]:top-[-500px] min-[960px]:left-[-100px] min-[960px]:h-[928px] min-[960px]:w-[928px] min-[1440px]:top-[-720px] min-[1440px]:left-[-20%] min-[1440px]:h-[1400px] min-[1440px]:w-[1400px]"
      ></div>
      <div
        class="absolute top-[-220px] left-[200px] z-1 h-[400px] w-[400px] rounded-full bg-[radial-gradient(closest-side_at_50%_50%,rgba(252,81,31,1),rgba(252,81,31,0)),url('/home/texture.svg')] opacity-80 min-[600px]:top-[-260px] min-[600px]:left-[360px] min-[600px]:h-[600px] min-[600px]:w-[600px] min-[960px]:top-[-420px] min-[960px]:left-[480px] min-[960px]:h-[900px] min-[960px]:w-[900px] min-[1440px]:left-[34%]"
      ></div>
      <div
        class="absolute top-40 right-[200px] z-1 h-[600px] w-[600px] rounded-full bg-[radial-gradient(closest-side_at_50%_50%,rgba(71,145,255,1),rgba(252,81,31,0)),url('/home/texture.svg')] opacity-90 min-[600px]:top-[220px] min-[600px]:right-[400px] min-[960px]:top-[260px] min-[960px]:right-0 min-[960px]:h-[1400px] min-[960px]:w-[1400px] min-[1440px]:right-[-16%]"
      ></div>
    </div>
  </div>
  <UApp>
    <NuxtLayout>
      <UMain>
        <NuxtPage />
      </UMain>
    </NuxtLayout>

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
        shortcut="meta_k"
        :links="navLinks"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </UApp>
</template>
