<script setup lang="ts">
const { data: page } = await useAsyncData('about', () => {
  return queryCollection('about').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
}

const { global } = useAppConfig()

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description,
})
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      orientation="horizontal"
      :ui="{
        container: 'lg:flex sm:flex-row items-center',
        title: '!mx-0 text-left',
        description: '!mx-0 text-left',
        links: 'justify-start',
      }"
    >
      <!-- '#ff4785', '#fc511f', ' -->
      <div
        class="ring-offset-bg size-24 shrink-0 overflow-hidden rounded-lg ring-3 ring-[#fc511f] ring-offset-3 sm:size-28 sm:rotate-4 md:size-36 lg:size-44 dark:ring-[#ff4785]"
      >
        <NuxtImg
          :src="$colorMode.value === 'dark' ? global.picture2?.dark! : global.picture2?.light!"
          :alt="global.picture2?.alt!"
          width="512"
          height="512"
          class="h-full w-full object-cover"
          quality="90"
        />
      </div>
    </UPageHero>
    <UPageSection
      :ui="{
        container: '!pt-0',
      }"
    >
      <MDC :value="page.content" unwrap="p" />
    </UPageSection>
  </UPage>
</template>
