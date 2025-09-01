<script setup lang="ts">
import { findPageChildren, findPageHeadline } from '@nuxt/content/utils'
import { formatTimeAgo } from '@vueuse/core'
import { useDateFormat } from '@vueuse/core'

const route = useRoute();
const year = route.params.year;
const subject = route.params.subject;

const { data: queryDatas } = await useAsyncData(`content-${year}`, () =>
  queryCollectionNavigation("content",['title','date','path','icon'])
    .where("path", "LIKE", `/${year}/${subject}%`)
    .where("draft", "=", false)
);


const posts = findPageChildren(queryDatas.value,`/${year}/${subject}`)
const headline = findPageHeadline(queryDatas.value, posts[0].path)
const headlineIcon = queryDatas.value?.[0]?.children?.[0]?.icon

const sixMothAgoDate = new Date();
sixMothAgoDate.setMonth(sixMothAgoDate.getMonth() - 6)


function transformDate(str: string) {
    const inputDate = new Date(str)
    return inputDate <= sixMothAgoDate  ? useDateFormat(inputDate,'DD/MM/YYYY') : formatTimeAgo(inputDate)

}

useSeoMeta({
  title: headline,
});
</script>

<template>
    <h2 class="text-xl lg:text-2xl  cursor-pointer font-bold mb-6 ml-6 lg:ml-10 xl:ml-20 mt-6 lg:mt-10 text-slate-900 dark:text-white tracking-wide align-middle flex items-center"><Icon :name="typeof headlineIcon === 'string' && headlineIcon ? headlineIcon : 'material-symbols-light:book-2'" class="align-middle text-2xl lg:text-3xl"/> {{ headline }}</h2>

    <ul class="grid grid-cols-[repeat(auto-fit,minmax(24rem,1fr))] gap-4 justify-center lg:justify-start w-4/5 mx-auto mt-2 mb-10 items-center">
      <li v-for="post in posts" :key="post.id" class="">
          <NuxtLink :to="post.path" class="px-4 flex flex-col gap-2 h-full rounded pb-2 bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 hover:bg-slate-200 transition-all duration-200 cursor-pointer pt-2 lg:py-3">
              <h3 class="font-[Montserrat] dark:text-white font-semibold lg:text-lg flex-grow tracking-wide lg:tracking-wider">
                {{ post.title }}
              </h3>
              <p class="italic mt-auto">{{ transformDate(post.date) }}</p>
              <!-- <p class="italic mt-auto">{{ useDateFormat(post.date,'DD/MM/YYYY') }}</p> -->
          </NuxtLink>
      </li>
    </ul>

</template>
