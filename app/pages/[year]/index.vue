<script setup lang="ts">
const route = useRoute();
const year = route.params.year;
const { data: posts } = await useAsyncData(`content-${year}`, () =>
  queryCollection("content")
    .where("path", "LIKE", `/${year}/%`)
    .where("draft", "=", false)
    .all()
);

useSeoMeta({
  title: `LocTor Log | ${String(year).toUpperCase()}`,
});
</script>

<template>
  <div>
    <ul class="mb-10">
      <li v-for="post in posts" :key="post.id">
        <PostCard>
          <NuxtLink :to="post.path">
            <div class="px-4">
              <h2 class="font-[Montserrat] font-bold lg:text-lg mt-1 lg:mt-2">
                {{ post.title }}
              </h2>
              <p class="italic mb-2">{{ post.date }}</p>
              <!-- <p>{{ year }}/{{ subject }}</p> -->
            </div>
          </NuxtLink>
        </PostCard>
      </li>
    </ul>
  </div>
</template>
