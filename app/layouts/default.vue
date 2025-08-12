<script setup>
useHead({
  bodyAttrs: {
    class: 'dark:bg-zinc-950 text-zinc-900 dark:text-gray-100 scrollbar-thin scrollbar-track-white dark:scrollbar-track-zinc-950'
  }
})
</script>

<template>
  <div class="min-w-screen min-h-screen wrapper overflow-x-hidden">
    <NavBar></NavBar>
    <slot></slot>
  </div>
</template>

<style scoped>
.wrapper {
  /* background-color: hsl(48, 29%, 97%); */
  font-family:
    "Open Sans", "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
</style>
