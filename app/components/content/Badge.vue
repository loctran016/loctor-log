<template>
<section class="pt-6 px-4 lg:px-6  border-2  rounded-md dark:prose-li:marker:text-gray-50/30 prose-li:marker:text-gray-900/20" :class="containerTypes[type].containerClass">
    <div class="mb-2 align-middle text-lg flex lg:items-center lg:text-xl" :class="containerTypes[type].headerClass">
        <Icon :name="containerTypes[type].headerIcon" class="align-middle text-2xl lg:text-3xl mr-2 max-lg:translate-y-1 shrink-0"/>
        <span class="">
            <slot mdc-unwrap="p" name="title"  />
        </span>
    </div>
    <div>
	    <slot />
    </div>
</section>
</template>

<script setup>

const containerTypes = {
    info: {
        containerClass: 'bg-emerald-400/20 border-green-300/50',
        headerClass: 'text-green-800 dark:text-green-500',
        headerIcon: 'material-symbols-light:info-outline-rounded',
    },
    warning: {
        containerClass: 'bg-amber-400/20 border-amber-300/50',
        headerClass: 'text-orange-600 dark:text-orange-400',
        headerIcon: 'material-symbols-light:warning-outline-rounded',
    },
    quiz: {
        containerClass: 'bg-sky-400/20 border-sky-300/50',
        headerClass: 'text-blue-600 dark:text-blue-400',
        headerIcon: 'material-symbols-light:help-outline-rounded',
    },
}

const props = defineProps({
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['info', 'warning','quiz'].includes(value),
  }
});
</script>
