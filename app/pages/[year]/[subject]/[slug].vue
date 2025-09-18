<script setup>
import NotFound from "~/components/NotFound.vue";
import { useDateFormat } from '@vueuse/core'
import Giscus from '@giscus/vue';
import { findPageHeadline } from '@nuxt/content/utils'

definePageMeta({
  layout: "blog",
});

const route = useRoute();

const slug = route.params.slug;
const subject = route.params.subject;
const year = route.params.year;

const path = `/${year}/${subject}/${slug}`

const { data: post } = await useAsyncData(`content-${slug}`, () => {
  return queryCollection("content")
    .path(path)
    .where("draft", "=", false)
    .first();
});

// const { data: queryNav } = await useAsyncData(`content-${path}`, () =>
//   queryCollectionNavigation("content",['title','date','path','icon','tags','category'])
//     .where("path", "LIKE", `${path}%`)
// );

// console.log(queryNav.value)

// const headline = findPageHeadline(queryNav.value, path)

useSeoMeta({
  title: post.value?.title,
  description: post.value?.description,
});
</script>

<template>
    <p class="text-sm lg:text-base dark:text-gray-200 font-bold mb-6 ml-6 xl:ml-8 mt-4 text-slate-900 hover:text-slate-950 hover:dark:text-white group tracking-wide ">
        <NuxtLink :to="`/${year}/${subject}`" class="flex items-center gap-2 max-w-1/2 w-max cursor-pointer">
            <Icon class="group-hover:-translate-x-1 duration-150 lg:text-lg" name="material-symbols-light:arrow-left-alt-rounded"></Icon>{{ headline }}</NuxtLink></p>
    <div class="mx-auto text-center" v-if="post">
        <h1 class="font-[Montserrat] max-w-[80vw] font-bold text-2xl lg:text-4xl mx-auto">{{ post.title }}</h1>
        <p class="italic text-gray mt-2">{{ useDateFormat(post.date,'ddd, DD MMM YYYY') }}</p>
    </div>
  <!-- Render the content post as Prose & Vue components -->
   <article class="post-content prose-wrapper prose-headings:font-[Montserrat] prose-headings:underline-offset-8 md:prose-xl lg:prose-lg dark:prose-invert mx-auto mb-14 dark:text-gray-100 max-md:max-w-[85vw]">
       <ContentRenderer v-if="post" :value="post" />
       <NotFound v-else></NotFound>
   </article>
   <div class="my-10 max-w-screen">
       <Giscus
            repo="loctran016/loctor-log"
            repoId="R_kgDOPUsuHw"
            category="Show and tell"
            categoryId="DIC_kwDOPUsuH84CuE_i"
            mapping="title"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            :theme="$colorMode.value === 'light' ? 'catppuccin_latte' : 'noborder_gray'"
            lang="vi"
            loading="lazy"
            crossorigin="anonymous"
            async />
   </div>
</template>

<style lang="css">
.post-wrapper strong {
    font-family: 'Montserrat', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    letter-spacing: 0.02rem;
}

.post-wrapper u {
    text-underline-offset: 3px;
}

.post-wrapper th {
    font-family: 'Montserrat', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    /* letter-spacing: 0.02rem; */
}

giscus-widget {
  display: flex;
  margin: auto;
  max-width: min(800px,80vw);
}
</style>
