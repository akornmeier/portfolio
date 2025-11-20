<script setup lang="ts">
import type { ISourceOptions } from '@tsparticles/engine'

const colorMode = useColorMode()

const lightOptions: ISourceOptions = {
  background: {
    color: {
      value: 'transparent',
    },
  },
  fpsLimit: 120,
  particles: {
    color: {
      value: ['#ff4785', '#fc511f', '#4791ff'],
    },
    links: {
      color: '#888888',
      distance: 150,
      enable: true,
      opacity: 0.2,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.2,
      direction: 'none',
      random: false,
      straight: false,
      outModes: {
        default: 'bounce',
      },
    },
    number: {
      value: 80,
      density: {
        enable: true,
      },
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: 'circle',
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
}

const darkOptions: ISourceOptions = {
  background: {
    color: {
      value: 'transparent',
    },
  },
  fpsLimit: 120,
  particles: {
    color: {
      value: ['#ff4785', '#fc511f', '#4791ff'],
    },
    links: {
      color: '#ffffff',
      distance: 150,
      enable: true,
      opacity: 0.15,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.2,
      direction: 'none',
      random: false,
      straight: false,
      outModes: {
        default: 'bounce',
      },
    },
    number: {
      value: 80,
      density: {
        enable: true,
      },
    },
    opacity: {
      value: 0.4,
    },
    shape: {
      type: 'circle',
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
}

const options = computed(() => (colorMode.value === 'dark' ? darkOptions : lightOptions))
</script>

<template>
  <ClientOnly>
    <div class="pointer-events-none fixed top-0 left-0 z-0 h-screen w-full">
      <vue-particles id="tsparticles" :options="options" />
    </div>
  </ClientOnly>
</template>
