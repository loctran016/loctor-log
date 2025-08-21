<script setup lang="ts">
const route = useRoute();
const year = route.params.year;
const subject = route.params.subject;
import { formatTimeAgo } from '@vueuse/core'
import { useDateFormat } from '@vueuse/core'

const { data: posts } = await useAsyncData(`content-${year}`, () =>
  queryCollection("content")
    .where("path", "LIKE", `/${year}/${subject}%`)
    .where("draft", "=", false)
    .all()
);

const { data: subjects } = await useAsyncData(
  `home`,
  () => queryCollection("json").where("stem", "=", `${year}/index`).first()
  //   queryCollection("json").where("path", "LIKE", "/y2/%").first()
);

function splitDateToNumber(str:string) {
    const splitDate = str.split('-');
    const transformedDate: number[] = [];
    splitDate.forEach(e => transformedDate.push(Number(e)));
    // console.log(str, transformedDate)
    return new Date(
        transformedDate[0] || 0,
        (transformedDate[1] || 1) - 1,
        transformedDate[2] || 1
    );
}

useSeoMeta({
  title: `LocTor Log | ${String(year).toUpperCase()}`,
});
</script>

<template>
    <h2 class="text-xl lg:text-2xl  dark:text-gray-200 cursor-pointer font-bold mb-6 ml-6 lg:ml-10 xl:ml-20 mt-6 lg:mt-10"><NuxtLink :to="`/${year}`">{{ String(year).toUpperCase() }}</NuxtLink> / <span class="text-slate-900 dark:text-white">{{ subjects?.data[`${subject}`]?.name }}</span></h2>

    <ul class="grid grid-cols-[repeat(auto-fit,minmax(24rem,1fr))] gap-4 justify-center lg:justify-start w-4/5 mx-auto mt-2 mb-10 items-center">
      <li v-for="post in posts" :key="post.id" class="">
          <NuxtLink :to="post.path" class="px-4 flex flex-col gap-2 h-full rounded pb-2 bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 hover:bg-slate-200 transition-all duration-200 cursor-pointer">
              <h3 class="font-[Montserrat] font-bold lg:text-lg mt-2 flex-grow">
                {{ post.title }}
              </h3>
              <p class="italic mt-auto">{{ formatTimeAgo(splitDateToNumber(post.date)) }}</p>
              <!-- <p class="italic mt-auto">{{ useDateFormat(post.date,'DD/MM/YYYY') }}</p> -->
          </NuxtLink>
      </li>
    </ul>

</template>
