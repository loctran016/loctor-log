<script setup lang="ts">

await navigateTo('/')

import { findPageChildren } from '@nuxt/content/utils'
const route = useRoute();
const year = route.params.year;
const { data: queryData } = await useAsyncData(`content-${year}`, () =>
  queryCollectionNavigation("content",['title','path','date'])
    .where("path", "LIKE", `/${year}%`)
    .where("draft", "=", false)
);

const posts = findPageChildren(queryData.value,`/${year}`)

useSeoMeta({
  title: `LocTor Log | ${String(year).toUpperCase()}`,
});
</script>

<template>
  <!-- <div>
    <ul class="mb-10">
      <li v-for="post in posts.children" :key="post.id">
        <PostCard>
          <NuxtLink :to="post.path">
            <div class="px-4">
              <h2 class="font-[Montserrat] font-bold lg:text-lg mt-1 lg:mt-2">
                {{ post.title }}
              </h2>
              <p class="italic mb-2">{{ post.date }}</p>
          </NuxtLink>
        </PostCard>
      </li>
    </ul>
  </div> -->
</template>
