<script setup lang="ts">
import defaultLayout from "./default.vue";
import lightBox from "~/store/lightBox";
</script>

<template>
  <defaultLayout>
    <main class="mx-auto mt-10 min-h-screen h-max overflow-x-hidden" :class="lightBox().state.value && 'overflow-y-hidde'">
      <slot></slot>
    </main>
  </defaultLayout>
</template>
