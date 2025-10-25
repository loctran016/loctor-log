<script setup>
import NotFound from "~/components/NotFound.vue";
import { findPageChildren, findPageHeadline } from '@nuxt/content/utils'
import { useDateFormat } from '@vueuse/core'
import Giscus from '@giscus/vue';
// import { findPageHeadline } from '@nuxt/content/utils'

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

const { data: queryNav } = await useAsyncData(`content-${year}`, () =>
  queryCollectionNavigation("content",['title'])
    .where("path", "LIKE", `/${year}/${subject}%`)
    .where("draft", "=", false)
);

const headline = findPageHeadline(queryNav.value, path)

useSeoMeta({
  title: post.value?.title,
  description: post.value?.description,
});
</script>

<template>
    <p class="text-sm lg:text-base dark:text-gray-200 font-bold mb-6 ml-6 xl:ml-8 mt-2 text-slate-900 hover:text-slate-950 hover:dark:text-white group tracking-wide ">
        <NuxtLink :to="`/${year}/${subject}`" class="flex items-center gap-2 max-w-1/2 w-max cursor-pointer">
            <Icon class="group-hover:-translate-x-1 duration-150 lg:text-lg" name="material-symbols-light:arrow-left-alt-rounded"></Icon>{{ headline }}</NuxtLink></p>
    <div class="mx-auto text-center" v-if="post">
        <h1 :class="$device.isTablet ? 'text-3xl lg:text-4xl':'text-2xl lg:text-4xl'" class="font-[Montserrat] max-w-[80vw] font-bold mx-auto">{{ post.title }}</h1>
        <p class="italic text-gray mt-2">{{ useDateFormat(post.date,'ddd, DD MMM YYYY') }}</p>
    </div>
  <!-- Render the content post as Prose & Vue components -->
   <article class="post-wrapper prose-headings:border-b-2 prose-headings:border-slate-500/30 hover:prose-headings:border-slate-500/80 dark:prose-headings:border-slate-700/30 hover:dark:prose-headings:border-slate-300/30 prose prose-headings:font-[Montserrat] dark:prose-invert mx-auto mb-14 dark:text-gray-100 max-md:max-w-[85vw] prose-h2:scroll-mt-20 prose-h3:scroll-mt-20 prose-headings:duration-100 prose-headings:transform-gpu" :class="$device.isTablet ? 'prose-xl md:prose-xl':'lg:prose-lg'" >
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
.post-wrapper h2 a, .post-wrapper h3 a, .post-wrapper h4 a, .post-wrapper h5 a {
    text-decoration-line: none;
}

@media (max-width: 1024px) {

    .post-wrapper u {
        text-underline-offset: 4px;
    }
}
.post-wrapper u {
    text-underline-offset: 2px;
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
