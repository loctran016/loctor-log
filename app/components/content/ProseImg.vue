<template>
  <figure class="md:-mx-8 lg:-mx-16">
    <NuxtImg
      class="rounded-md shadow-lg w-full hover:cursor-zoom-in"
      :src="refinedSrc"
      :alt="alt"
      @click.stop="() => (showLightbox = !showLightbox)"
      width="800"
      sizes="sm:600px md:800px"
      densities="x1 x2"
    />
    <figcaption class="text-sm text-center">{{ alt }}</figcaption>
  </figure>
  <Teleport to="body">
    <Transition
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showLightbox"
        class="z-10 fixed h-screen w-screen top-0 left-0
               bg-black bg-opacity-50 flex items-center
               justify-center backdrop-blur-sm transition-all
               duration-300 md:p-8"
      >
      <div :style="(posX != 0 && posY != 0) && imgPos"
      ref="img"
            v-on-click-outside.stop="() => (showLightbox = !showLightbox)" class="z-20 top-1/2 left-1/2 -translate-1/2 fixed">

          <NuxtImg
            :src="refinedSrc"
            :alt="alt"
            densities="x1 x2"
            class="max-lg:w-full lg:h-3/4 lg:w-auto"

          />
      </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useDraggable } from '@vueuse/core'
import { vOnClickOutside } from '@vueuse/components'
import { withTrailingSlash, withLeadingSlash, joinURL } from 'ufo'

import { useTemplateRef } from 'vue'

const img = useTemplateRef<HTMLElement>('img')



const { x:posX,y:posY, style:imgPos } = useDraggable(img, {
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

const bodyClass = computed(() => `${showLightbox.value ? 'overflow-y-hidden' : ''}`)

useHeadSafe(
    {
        bodyAttrs: {
            class: bodyClass
    }
}
)
</script>
