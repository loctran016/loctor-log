

<template>
  <nav class="mx-auto mt-2" v-if="links && links.length">
    <div @click="showDetail = !showDetail"  class="flex items-center gap-1 cursor-pointer" >
        <Icon name="material-symbols-light:arrow-back-2-rounded" class="-rotate-180 text-2xl lg:text-4xl transform-gpu duration-100" :class="showDetail && '-rotate-90'" ></Icon>
        <h2 class="text-2xl lg:text-3xl font-[Montserrat]">On this page</h2>
    </div>
    <Transition name="detail" class="mx-4">
        <!-- <div > -->
    <ul v-if="showDetail" class="mt-4">
      <li v-for="link in links" :key="link.id" :class="`toc-level-${link.depth}`">
        <a
          :href="`#${link.id}`"
          :class="{ active: activeId === link.id }"
          @click. prevent="scrollToHeading(link.id)"
          class="text-xl font-bold transform-all duration-100 text-gray-800 dark:text-gray-200 font-[Montserrat] tracking-wide hover:text-fuchsia-800 dark:hover:text-fuchsia-500"
        >
          {{ link.text }}
        </a>
        <!-- Nested headings -->
        <ul v-if="link.children && link.children.length" class="mb-2">
          <li v-for="child in link.children" :key="child.id" :class="`toc-level-${child.depth}`">
            <a
              :href="`#${child.id}`"
              :class="{ active: activeId === child.id }"
              @click.prevent="scrollToHeading(child.id)"
              class="space-y-2 ml-6 hover:text-fuchsia-800 dark:hover:text-fuchsia-500"
            >
              {{ child.text }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
        <!-- </div> -->
    </Transition>
  </nav>
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

const props = defineProps({
  links: {
    type: Array as PropType<any[]>,
    default: () => []
  }
})

const activeId = ref('')

const scrollToHeading = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}


const showDetail:Ref<boolean> = ref(false)

// Track active heading on scroll
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeId.value = entry.target. id
        }
      })
    },
    { rootMargin: '-80px 0px -80% 0px' }
  )

  const headings = document.querySelectorAll('h2, h3, h4')
  headings.forEach((heading) => observer.observe(heading))

  onUnmounted(() => observer.disconnect())
})
</script>
