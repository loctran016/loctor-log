<script setup lang="ts">
import { findPageChildren, findPageHeadline } from '@nuxt/content/utils'
import { formatTimeAgo } from '@vueuse/core'
import { useDateFormat } from '@vueuse/core'

import type { ContentNavigationItem } from '@nuxt/content';


const route = useRoute();
const year = route.params.year;
const subject = route.params.subject;

const { data: queryDatas } = await useAsyncData(`content-${year}`, () =>
  queryCollectionNavigation("content",['title','date','path','icon','tags','category'])
    .where("path", "LIKE", `/${year}/${subject}%`)
    .where("draft", "=", false)
);

const posts = findPageChildren(queryDatas.value,`/${year}/${subject}`)
const headline = findPageHeadline(queryDatas.value, posts[0].path)
const headlineIcon: string = <string>queryDatas.value?.[0]?.children?.[0]?.icon ?? 'material-symbols-light:book-2'

type CategoryKey = 'bv' | 'tbl' | 'cls' | 'lab';
type CategoryData = {
    [key in CategoryKey]: {
        name: string;
        class: string;
        containerClass: string;
        icon: string;
    }
};

const categoryData: CategoryData = {
    bv: {
        name: 'TH Bệnh Viện',
        class: 'text-fuchsia-700 dark:text-fuchsia-500',
        containerClass: '',
        icon: 'healthicons:hospital-outline'
    },
    tbl: {
        name: 'Team-based Learning',
        class: 'text-green-700 dark:text-green-500',
        containerClass: 'group-hover:bg-green-600/20',
        icon: 'healthicons:group-discussion-meetingx3-outline'
    },
    cls: {
        name: 'CLS',
        class: 'text-amber-700 dark:text-amber-400',
        containerClass: 'group-hover:bg-amber-600/30',
        icon: 'healthicons:virus-patient-outline'
    },
    lab: {
        name: 'TH tại Trường',
        class: 'text-sky-700 dark:text-sky-400',
        containerClass: '',
        icon: 'healthicons:lab-search-outline'
    },
};

const uniqueTags: Set<string> = new Set();
posts.forEach(post => {
        post.tags.forEach((tag: string) => uniqueTags.add(tag));
})

console.log('Post is here',posts)

const isNotDefaultTagsOnly:boolean = !(uniqueTags.has('Lí thuyết') && uniqueTags.size === 1);

const selectedTag = ref<string[]>([])

const sixMothAgoDate = new Date();
sixMothAgoDate.setMonth(sixMothAgoDate.getMonth() - 6)

const queryPostsByTags = computed(() => {
    if (selectedTag.value.length === 0) return posts.filter(post => post)
    else return posts.filter(post => post.tags.some((tag: string) => selectedTag.value.includes(tag)))
})

function transformDate(str: string) {
    const inputDate = new Date(str)
    return inputDate <= sixMothAgoDate ? useDateFormat(inputDate, 'DD/MM/YYYY') : formatTimeAgo(inputDate)
}

function toggleTags (inputTag:string) {
    const selectedTagsValue: string[] = selectedTag.value ?? [];
    if (selectedTagsValue.includes(inputTag)) selectedTag.value = selectedTagsValue.filter(item => item !== inputTag);
    else selectedTag.value.push(inputTag);
}

useSeoMeta({
  title: headline,
});
</script>

<template>
    <!-- Header section & tag selector -->
    <section class="grid grid-rows-[max-content,1fr] grid-cols-[max-content,1fr] max-lg:gap-2 lg:flex mx-6 lg:mx-10 xl:mx-20 mb-6 mt-6 lg:mt-10 items-center gap-3">
        <Icon :name="headlineIcon" class="align-middle text-2xl lg:text-3xl"/>
        <h2 class="text-xl flex-shrink-0 lg:text-2xl font-bold text-slate-900 dark:text-white tracking-wide align-middle flex items-center gap-1 lg:gap-2 max-w-8/10"> {{ headline }}</h2>
        <ul class="flex lg:ml-auto gap-2 max-lg:col-start-2" v-if="uniqueTags.size > 1">
            <li v-for="tag in uniqueTags" :class="selectedTag.includes(tag) ? 'underline text-teal-600 dark:text-teal-300 bg-teal-200/40 hover:bg-teal-200/70' : 'bg-slate-200/20 hover:bg-slate-200/50 hover:text-slate-900 dark:hover:text-slate-50 hover:underline'" @click="() => toggleTags(tag)" class="text-slate-700  dark:text-slate-200 underline-offset-4 rounded-3xl  dark:bg-slate-800/20 dark:hover:bg-slate-800/50 py-2 px-4 transform-gpu duration-150 cursor-pointer"># {{ tag }}</li>
        </ul>
        <Icon name="material-symbols-light:collections-bookmark-outline-rounded" class="text-xl lg:text-2xl max-lg:col-start-1 max-lg:row-start-2" v-if="uniqueTags.size > 1"/>
    </section>

    <!-- Main list of posts -->
    <TransitionGroup name="list" tag="ul" class="grid grid-cols-[repeat(auto-fit,minmax(24rem,1fr))] gap-4 justify-center lg:justify-start w-4/5 mx-auto mt-2 mb-10 items-center">
      <li v-for="(post,index)  in queryPostsByTags" :data-index="index" :key="index" class="h-[7rem] group" >
          <NuxtLink :to="post.path" class="px-4 flex flex-col gap-2  h-full rounded pb-2 bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 hover:bg-slate-200 transition-all duration-200 cursor-pointer pt-2 lg:py-3 relative">
              <h3 class="font-[Montserrat] dark:text-white font-semibold lg:text-lg flex-grow tracking-wide lg:tracking-wider max-w-[90%]">
                {{ post.title }}
              </h3>
              <div v-if="post.category" class="absolute right-2 top-2 flex items-center justify-center p-2 aspect-square rounded-full transform-gpu duration-200" :class="categoryData[post.category as CategoryKey].containerClass">
                  <LazyIcon  :class="categoryData[post.category as CategoryKey].class" class="text-2xl lg:text-3xl" :name="categoryData[post.category as CategoryKey].icon" />
                </div>
                <LazyIcon v-else class="text-xl lg:text-2xl absolute right-3 top-3" name="material-symbols-light:arrow-outward-rounded" />
              <p class="flex items-center">
                <span class="italic mt-auto flex-shrink-0 flex items-center gap-1"><LazyIcon name="material-symbols-light:event-note-rounded" class="text-lg lg:text-xl row-start-2"/> {{ transformDate(post.date) }}</span>
                <ul v-if="isNotDefaultTagsOnly" class="flex text-right flex-wrap flex-grow ml-auto justify-end">
                    <li v-for="tag in post.tags" class="underline underline-offset-4 flex-grow self-end"># {{ tag }}</li>
                </ul>
                <LazyIcon v-if="isNotDefaultTagsOnly" name="material-symbols-light:bookmarks-rounded" class="ml-2 text-lg lg:text-xl" />
            </p>

              <!-- <p class="italic mt-auto">{{ useDateFormat(post.date,'DD/MM/YYYY') }}</p> -->
          </NuxtLink>
      </li>
    </TransitionGroup>

</template>

<style>
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-active{
  transition: all 0.2s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
}

</style>
