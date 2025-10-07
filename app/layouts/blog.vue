<script setup lang="ts">
import defaultLayout from "./default.vue";
</script>

<template>
  <defaultLayout>
    <main class="mx-auto mt-2 lg:mt-4 min-h-screen h-max overflow-x-hidden">
      <slot></slot>
    </main>
    <Footer/>
  </defaultLayout>
</template>
