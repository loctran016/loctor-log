<script setup lang="ts">
import { findPageChildren, findPageHeadline } from '@nuxt/content/utils'
import { formatTimeAgo } from '@vueuse/core'
import { useDateFormat } from '@vueuse/core'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { ContentCollectionItem } from '@nuxt/content'
import type { Ref } from 'vue'

const route: RouteLocationNormalizedLoaded = useRoute();
const year: string | string[] = route.params.year as string | string[];
const subject: string | string[] = route.params.subject as string | string[];

const { data: queryDatas } = await useAsyncData(`content-${year}`, () =>
  queryCollectionNavigation("content",['title','date','path','icon','tags'])
    .where("path", "LIKE", `/${year}/${subject}%`)
    .where("draft", "=", false)
);

const posts: ContentCollectionItem[] = findPageChildren(queryDatas.value,`/${year}/${subject}`)
const headline: string = findPageHeadline(queryDatas.value, posts[0]?.path) || ''
const headlineIcon: string | undefined = queryDatas.value?.[0]?.children?.[0]?.icon as string | undefined


const uniqueTags: Set<string> = new Set();
posts.forEach((post: ContentCollectionItem) => {
        post.tags?.forEach((tag: string) => uniqueTags.add(tag));
})

const isNotDefaultTagsOnly: boolean = JSON.stringify([...uniqueTags]) !== JSON.stringify(['Lí thuyết']);

const selectedTag: Ref<string> = ref([...uniqueTags][0] || '')

const sixMothAgoDate: Date = new Date();
sixMothAgoDate.setMonth(sixMothAgoDate.getMonth() - 6)


function transformDate(str: string): string {
    const inputDate: Date = new Date(str)
    const formattedDate = useDateFormat(inputDate, 'DD/MM/YYYY')
    const timeAgo = formatTimeAgo(inputDate)
    return inputDate <= sixMothAgoDate ? formattedDate.value : timeAgo
}

useSeoMeta({
  title: headline,
});
</script>

<template>
    <section class="flex  mx-6 lg:mx-10 xl:mx-20 mb-6 mt-6 lg:mt-10 items-center justify-between">
        <h2 class="text-xl flex-shrink-0 lg:text-2xl font-bold text-slate-900 dark:text-white tracking-wide align-middle flex items-center gap-1 lg:gap-2"><Icon :name="typeof headlineIcon === 'string' && headlineIcon ? headlineIcon : 'material-symbols-light:book-2'" class="align-middle text-2xl lg:text-3xl"/> {{ headline }}</h2>
        <ul class="flex" v-if="uniqueTags && uniqueTags.size > 0 && false">
            <li v-for="tag in uniqueTags" :class="tag === selectedTag && 'underline text-black dark:text-white'" @click="selectedTag = tag" class="text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-slate-50 hover:underline underline-offset-4 rounded-3xl hover:bg-slate-200/50 dark:hover:bg-slate-800/50 py-2 px-4 transform-gpu duration-150 cursor-pointer"># {{ tag }}</li>
        </ul>
    </section>

    <ul class="grid grid-cols-[repeat(auto-fit,minmax(24rem,1fr))] gap-4 justify-center lg:justify-start w-4/5 mx-auto mt-2 mb-10 items-center">
      <li v-for="post in posts" :key="post.id" class="" >
          <NuxtLink :to="post.path" class="px-4 flex flex-col gap-2 h-full rounded pb-2 bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 hover:bg-slate-200 transition-all duration-200 cursor-pointer pt-2 lg:py-3">
              <h3 class="font-[Montserrat] dark:text-white font-semibold lg:text-lg flex-grow tracking-wide lg:tracking-wider ">
                {{ post.title }}
              </h3>
              <p class="flex items-center">
                <span class="italic mt-auto flex-shrink-0 flex items-center gap-1"><Icon name="material-symbols-light:event-note-rounded" class="text-lg lg:text-xl"/> {{ transformDate(post.date) }}</span>
                <ul v-if="isNotDefaultTagsOnly" class="flex text-right flex-wrap flex-grow ml-auto justify-end">
                    <li v-for="tag in post.tags" class="underline underline-offset-4 flex-grow self-end"># {{ tag }}</li>
                </ul>
                <Icon v-if="isNotDefaultTagsOnly" name="material-symbols-light:bookmarks-rounded" class="ml-2 text-lg lg:text-xl" />
            </p>

              <!-- <p class="italic mt-auto">{{ useDateFormat(post.date,'DD/MM/YYYY') }}</p> -->
          </NuxtLink>
      </li>
    </ul>

</template>
