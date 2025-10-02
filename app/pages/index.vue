<script setup>
const currentSchoolYear = 2;
const colorsStyle = [
    'text-yellow-800 dark:text-amber-300 dark:hover:text-amber-200 bg-amber-200/80 dark:bg-amber-700/20 ',
    'text-lime-800 dark:text-lime-300 dark:hover:text-lime-200 bg-lime-200/80 dark:bg-lime-800/20',
    'text-teal-800 dark:text-teal-300 dark:hover:text-teal-200 bg-teal-200/80 dark:bg-teal-700/20',
    'text-blue-800 dark:text-blue-300 dark:hover:text-blue-200 bg-blue-200/80 dark:bg-blue-700/20 ',
    'text-amber-800 dark:text-amber-300 dark:hover:text-amber-200 bg-amber-200/80 dark:bg-amber-700/20 ',
    'text-violet-800 dark:text-violet-300 dark:hover:text-violet-200 bg-violet-200/80 dark:bg-violet-700/20',
    'text-red-800 dark:text-red-300 dark:hover:text-red-200 dark:hover bg-red-200/80 dark:bg-red-700/20',
    'text-orange-800 dark:text-orange-300 dark:hover:text-orange-200 bg-orange-200/80 dark:bg-orange-700/20',
    'text-sky-800 dark:text-sky-300 dark:hover:text-sky-200 bg-sky-200/80 dark:bg-sky-700/20 ',
    'text-rose-800 dark:text-rose-300 dark:hover:text-rose-200 dark:bg-rose-700/20 bg-rose-200/80',
    'text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-200 dark:bg-zinc-700/20 bg-zinc-200/80',
]

const { data: queryDatas } = await useAsyncData(`content`, () =>
  queryCollectionNavigation("content",['title','date','path','icon'])
        .where("draft", "=", false)
);

// type Child = { date: number; [key: string]: any };
// type Year = { children?: Child[]; [key: string]: any };

queryDatas.value.forEach(e => {
    e.children?.sort((a, b) => b.date.localeCompare(a.date));
});

definePageMeta({ layout: "home" });
</script>

<template>
    <main class="grid grid-flow-col lg:grid-cols-2 max-lg:place-items-center grow">
        <ul class="grid font-bold grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] w-4/5 mx-auto gap-3 items-center lg:my-auto" v-for="year in queryDatas">
          <li
            v-for="(subject,index) in year.children"
            class="h-30 rounded-lg cursor-pointer pl-4 hover:rounded-xl duration-300 transform-gpu backdrop-blur"
            :class="colorsStyle[(year.children.length - index) % colorsStyle.length]"
          >
          <!-- hover:-translate-y-1 -->
            <NuxtLink :to="`${subject.path}`" class="flex items-center">
                <Icon :name="subject.icon" class="text-xl"/>
                <h2 class="py-4 px-2">{{ subject.title }}</h2>
            </NuxtLink>
          </li>
        </ul>
        <div class="bg-white dark:bg-black flex justify-center items-center max-lg:absolute max-lg:top-1/2  max-lg:right-1/2 max-lg:-translate-x-1/2  max-lg:-translate-y-1/2 max-lg:-z-10">
                  <div class="bg-white dark:bg-slate-900 rounded-lg aspect-square w-4/5 lg:w-80 shadow-md shadow-slate-800 dark:shadow-slate-700"></div>
        </div>
    </main>
</template>
