<template>
  <div class="md:-mx-8 lg:-mx-16">
    <NuxtImg
      class="rounded-md shadow-lg w-full hover:cursor-zoom-in"
      :src="src"
      :alt="alt"
      @click.stop="() => (showLightbox = !showLightbox)"
      width="800"
      sizes="sm:600px md:800px"
      densities="x1 x2"
    />
    <figcaption class="text-sm text-center -translate-y-4">{{ alt }}</figcaption>
  </div>
  <Teleport to="body">
    <Transition
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showLightbox"
        class="z-10 fixed bottom-0 right-0 top-0 left-0
               bg-black bg-opacity-50 flex items-center
               justify-center backdrop-blur-sm transition-all
               duration-300 md:p-8"
        @click.stop="() => (showLightbox = !showLightbox)"
      >
        <NuxtImg
          :src="src"
          :alt="alt"
          densities="x1 x2"
          class="m-10 max-lg:w-full max-h-4/5 max-w-4/5 lg:h-4/5 absolute z-20"
          ref="el" :style="style"
        />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useDraggable } from '@vueuse/core'
import { withTrailingSlash, withLeadingSlash, joinURL } from 'ufo'

import { useTemplateRef } from 'vue'

const el = useTemplateRef<HTMLElement>('el')

const { x, y, style } = useDraggable(el, {
  preventDefault: true,
  // with `preventDefault: true`
  // you can disable the native behavior (e.g., for img)
  // and control the drag-and-drop, preventing the browser interference.
})
const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
});

const showLightbox = ref(false);

const refinedSrc = computed(() => {
  if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
    const _base = withLeadingSlash(withTrailingSlash(useRuntimeConfig().app.baseURL))
    if (_base !== '/' && !props.src.startsWith(_base)) {
      return joinURL(_base, props.src)
    }
  }
  return props.src
})
</script>
