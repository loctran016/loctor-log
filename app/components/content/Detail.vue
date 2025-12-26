<template>
  <div :class="container && 'bg-slate-50 dark:bg-zinc-800/50 px-6 py-6 rounded-lg'" class="mb-4"   v-on-click-outside="() => showDetail = false">
    <div @click="showDetail = !showDetail"  class="flex items-center gap-1 cursor-pointer" >
        <Icon name="material-symbols-light:arrow-back-2-rounded" class="-rotate-180 text-2xl transform-gpu duration-100" :class="showDetail && '-rotate-90'" ></Icon>
        <p style="margin:0px">
            <slot mdc-unwrap="p" name="title"  />
        </p>
    </div>
    <Transition name="detail" class="mx-4">
        <div v-if="showDetail">
            <slot   />
        </div>
    </Transition>
  </div>
</template>

<style>
.detail-enter-active {
  transition: opacity 0.5s ease;
}
.detail-leave-active {
  transition: opacity 0.3s ease;
}

.detail-enter-from,
.detail-leave-to {
  /* height:0; */
  opacity: 0;
}
</style>


<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components'

const showDetail:Ref<boolean> = ref(false)

const props = defineProps({
  container: {
    type: Boolean,
    default: false,
  }
});
</script>
