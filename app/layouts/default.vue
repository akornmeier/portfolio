<script setup lang="ts"></script>

<template>
  <div>
    <UContainer
      class="border-default relative z-10 pt-10 sm:border-x"
      style="background-color: color-mix(in srgb, var(--ui-bg) 85%, transparent)"
    >
      <AppHeader :links="navLinks" />
      <slot />
      <AppFooter />
    </UContainer>
  </div>
</template>
