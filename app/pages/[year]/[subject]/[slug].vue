<script setup>
import NotFound from "~/components/NotFound.vue";
import { useDateFormat } from '@vueuse/core'
import lightBox from "~/store/lightBox";
import Giscus from '@giscus/vue';
import { vScrollLock } from '@vueuse/components'

definePageMeta({
  layout: "blog",
});

const route = useRoute();

const slug = route.params.slug;
const subject = route.params.subject;
const year = route.params.year;
// const relativeSlug = slug.split("/").slice(-3);
const { data: post } = await useAsyncData(`content-${slug}`, () => {
  return queryCollection("content")
    .path(`/${year}/${subject}/${slug}`)
    .where("draft", "=", false)
    .first();
});

useSeoMeta({
  title: post.value?.title,
  description: post.value?.description,
});
</script>

<template>
    <div class="mx-auto text-center" v-if="post">
        <h1 class="font-[Montserrat] max-w-4/5 text-xl lg:text-4xl mx-auto">{{ post.title }}</h1>
        <p class="italic text-gray mt-2">{{ useDateFormat(post.date,'ddd, DD MMM YYYY') }}</p>
    </div>
  <!-- Render the content post as Prose & Vue components -->
   <article v-scroll-lock="lightBox().state.value" class="post-content prose prose-headings:font-[Montserrat] prose-headings:underline-offset-8 lg:prose-lg dark:prose-invert mx-auto mb-14 dark:text-gray-100 max-md:max-w-[85vw]">

       <ContentRenderer v-if="post" :value="post" />
       <NotFound v-else></NotFound>
   </article>
   <div class="mt-10">
       <Giscus
            repo="loctran016/loctor-log"
            repoId="R_kgDOPUsuHw"
            category="Show and tell"
            categoryId="DIC_kwDOPUsuH84CuE_i"
            mapping="pathname"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme="noborder_gray"
            lang="vi"
            loading="lazy"
            crossorigin="anonymous"
            async />
   </div>
</template>

<style lang="css">
.post-content img {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
}

.post-content strong {
    font-family: 'Montserrat', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    letter-spacing: 0.02rem;
}

giscus-widget {
  display: flex;
  margin: auto;
  max-width: min(640px,80vw);
}
</style>
