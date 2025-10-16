<script setup lang="ts">

// import { useScroll } from '@vueuse/core'

// const body = useTemplateRef<HTMLElement>('body')
// const { isScrolling, directions } = useScroll(body, {
//     offset: { top: 30, bottom: 30 },
//     behavior: 'smooth'
// })

// const scrollValue = computed(() => {
//   return isScrolling.value && directions.bottom
// })

useHead({
  bodyAttrs: {
    class: 'dark:bg-zinc-950 text-zinc-900 dark:text-gray-100 scrollbar-thin scrollbar-track-white dark:scrollbar-track-zinc-950'
  }
})
</script>

<template>
  <div class="min-w-screen min-h-screen select-text wrapper relative">
    <NavBar></NavBar>
    <slot></slot>
    <NuxtPwaManifest />
  </div>
</template>

<style scoped>
.wrapper {
  font-family:
    "Open Sans", "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
</style>
