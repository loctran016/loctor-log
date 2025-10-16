<script setup>
useHead({
  bodyAttrs: {
    class: 'dark:bg-zinc-950 text-zinc-900 dark:text-gray-100'
  }
})
</script>
<template>
  <div class="w-screen h-screen flex flex-col dark:bg-zinc-950 text-zinc-900 dark:text-gray-100">
    <NavBar></NavBar>
    <slot></slot>
    <NuxtPwaManifest />
  </div>
</template>

<style lang="css" scoped>
</style>
