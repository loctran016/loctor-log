<template>
  <nav class="toc" v-if="links && links.length">
    <h2>Table of Contents</h2>
    <ul>
      <li v-for="link in links" :key="link.id" :class="`toc-level-${link.depth}`">
        <a
          :href="`#${link.id}`"
          :class="{ active: activeId === link.id }"
          @click. prevent="scrollToHeading(link.id)"
        >
          {{ link.text }}
        </a>
        <!-- Nested headings -->
        <ul v-if="link.children && link.children.length">
          <li v-for="child in link.children" :key="child.id" :class="`toc-level-${child.depth}`">
            <a
              :href="`#${child.id}`"
              :class="{ active: activeId === child.id }"
              @click.prevent="scrollToHeading(child.id)"
            >
              {{ child.text }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

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

<style scoped>
.toc {
  position: sticky;
  top: 2rem;
  padding: 1. 5rem;
  border-left: 2px solid #e5e7eb;
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
}

.toc h2 {
  font-size: 1.125rem;
  font-weight:  600;
  margin-bottom: 1rem;
}

.toc ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc li {
  margin:  0.5rem 0;
}

.toc a {
  color: #6b7280;
  text-decoration: none;
  transition: color 0.2s;
  font-size: 0.875rem;
  display: block;
}

. toc a:hover {
  color: #111827;
}

.toc a.active {
  color: #3b82f6;
  font-weight: 500;
}

.toc-level-2 {
  padding-left: 0;
}

.toc-level-3 {
  padding-left: 1rem;
  font-size: 0.8125rem;
}

.toc-level-4 {
  padding-left: 2rem;
  font-size:  0.75rem;
}
</style>
