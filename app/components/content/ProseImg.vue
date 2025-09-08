<template>
  <figure class="md:-mx-8 lg:-mx-16">
    <NuxtImg
      class="rounded-md mx-auto shadow-lg max-xl:w-full hover:cursor-zoom-in"
      :src="refinedSrc"
      :alt="alt"
      @click.stop="() => { showLightbox = !showLightbox}"
      width="800"
      sizes="sm:600px md:800px"
      densities="x1 x2"
      :class="$device.isDesktop && 'xl:h-auto xl:w-auto xl:max-h-[85vh] xl:max-w-full'"
    />
    <figcaption class="text-sm text-center">{{ alt }}</figcaption>
  </figure>
  <Teleport to="body">
    <Transition
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="!($device.isApple) && $device.isDesktop && showLightbox"
        class="z-10 fixed h-screen w-screen top-0 left-0
               bg-black bg-opacity-50 flex items-center
               justify-center backdrop-blur-sm transition-all
               duration-300 md:p-8"
      >
      <div :style="(posX != 0 && posY != 0) && imgPos"
      ref="img"
            v-on-click-outside.stop="() => { showLightbox = !showLightbox }" class="z-20 top-1/2 left-1/2 fixed hover:cursor-move" :class="(posX != 0 && posY != 0) || '-translate-x-1/2 -translate-y-1/2'" >

          <NuxtImg
            :src="refinedSrc"
            :alt="alt"
            densities="x1 x2"
            class="max-lg:w-full lg:min-w-[50vw] lg:h-auto lg:w-auto lg:max-h-[90vh]"
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

const bodyClass = computed(() => `${showLightbox.value ? 'overflow-y-hidden relative' : ''}`)

useHeadSafe(
    {
        bodyAttrs: {
            class: bodyClass
        },
    }
)
</script>
