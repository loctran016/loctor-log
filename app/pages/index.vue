<script setup lang="ts">
const currentSchoolYear = 2;
const colorsStyle = {
    lime: 'text-lime-800 dark:text-lime-300 bg-lime-200/80 dark:bg-lime-800/20 border-lime-300',
    red: 'text-red-800 dark:text-red-300 bg-red-200/80 dark:bg-red-700/20  border-red-300',
    rose: 'text-rose-800 dark:bg-rose-700/20 bg-rose-200/80 dark:text-rose-200 border-rose-300',
    teal: 'text-teal-800 bg-teal-200/80 dark:bg-teal-700/20 dark:text-teal-200 border-teal-300',
    orange: 'text-orange-800 bg-orange-200/80 dark:bg-orange-700/20 dark:text-orange-200 border-orange-300',
    blue: 'text-blue-800 bg-blue-200/80 dark:bg-blue-700/20 dark:text-blue-200 border-blue-300',
}
// const colorsStyle = {
//     lime: 'text-lime-800 bg-lime-300 dark:text-lime-100 dark:bg-lime-800',
//     red: 'text-red-800 bg-red-300 dark:text-red-200 dark:bg-red-800',
//     rose: 'text-rose-800 bg-rose-300 dark:text-rose-200 dark:bg-rose-800',
//     teal: 'text-teal-800 bg-teal-300 dark:text-teal-200 dark:bg-teal-800',
//     orange: 'text-orange-800 bg-orange-300 dark:text-orange-100 dark:bg-orange-800',
//     blue: 'text-blue-800 bg-blue-200 dark:text-blue-200 dark:bg-blue-800',
// }

definePageMeta({ layout: "home" });

const { data: subjects } = await useAsyncData(
  `home`,
  () => queryCollection("json").where("stem", "=", `y${currentSchoolYear}/index`).first()
);
</script>

<template>
    <main class="grid grid-flow-col lg:grid-cols-2 max-lg:place-items-center grow">
        <ul class="grid font-bold grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] w-4/5 mx-auto gap-3 items-center lg:my-auto">
          <li
            v-for="([path, content],index) in Object.entries(subjects?.data ?? []) "
            class="h-30 rounded-lg pl-2 hover:rounded-2xl duration-200 transform-gpu backdrop-blur border-1 lg:border-2"
            :class="colorsStyle[content.color as keyof typeof colorsStyle] ?? ''"
            :key="index"
          >
            <NuxtLink :to="`/y${currentSchoolYear}/${path}`"
              >
                <h2 class="py-4 px-2">{{ content?.name }}</h2>
            </NuxtLink>
          </li>
        </ul>
        <div class="bg-white dark:bg-black flex justify-center items-center max-lg:absolute max-lg:top-1/2  max-lg:right-1/2 max-lg:-translate-x-1/2  max-lg:-translate-y-1/2 max-lg:-z-10">
                 <!-- <NuxtImg src="/logo.svg" sizes="80vw lg:100px" width="500" /> -->
                  <div class="bg-white dark:bg-slate-900 rounded-lg aspect-square w-4/5 lg:w-80 shadow-md shadow-slate-800 dark:shadow-slate-700"></div>
        </div>
    </main>
</template>
