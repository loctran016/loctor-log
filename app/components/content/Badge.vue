<template>
<section class="pt-6 px-4  lg:px-6 bg-emerald-400/20 border-2 border-green-300/50 rounded-md dark:prose-li:marker:text-gray-50 prose-li:marker:text-gray-900/20 ">
    <div class="text-green-800 dark:text-green-500 mb-2 align-middle text-lg flex lg:items-center lg:text-xl dark:marker:text-slate-50">
        <Icon name="material-symbols-light:info-outline-rounded" class="align-middle text-2xl lg:text-3xl mr-2 max-lg:translate-y-1"/>
        <span class="">
            <slot mdc-unwrap="p" name="title"  />
        </span>
    </div>
    <div>
	    <slot />
    </div>
</section>
</template>
<script>
// const props = defineProps({
//   type: {
//     type: 'info' || 'warning',
//     default: 'info',
//   }
// });
</script>
