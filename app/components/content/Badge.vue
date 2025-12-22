<template>
<section class="pt-4 pb-2 lg:pt-6 lg:pb-2 px-4 lg:px-6 border-l-2 lg:border-l-4 dark:prose-li:marker:text-gray-50/30 prose-li:marker:text-gray-900/20" :class="containerTypes[safeType].containerStyle">
    <div class="mb-2 align-middle text-lg flex lg:items-center lg:text-xl" :class="containerTypes[safeType].headerStyle">
        <Icon :name="containerTypes[safeType].headerIcon" class="align-middle text-2xl lg:text-3xl mr-2 max-lg:translate-y-1 shrink-0"/>
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
        containerStyle: 'bg-emerald-400/20 border-l-green-300/50',
        headerStyle: 'text-green-800 dark:text-green-500',
        headerIcon: 'material-symbols-light:info-outline-rounded',
    },
    warning: {
        containerStyle: 'bg-amber-400/20 border-l-amber-300/50',
        headerStyle: 'text-orange-600 dark:text-orange-400',
        headerIcon: 'material-symbols-light:warning-outline-rounded',
    },
    tip: {
        containerStyle: 'bg-violet-400/20 border-l-violet-300/50',
        headerStyle: 'text-violet-600 dark:text-violet-400',
        headerIcon: 'material-symbols-light:rocket-launch-outline-rounded',
    },
    quiz: {
        containerStyle: 'bg-sky-400/20 border-l-sky-300/50',
        headerStyle: 'text-blue-600 dark:text-blue-400',
        headerIcon: 'material-symbols-light:help-outline-rounded',
    },
}

const props = defineProps({
  type: {
    type: String,
    default: 'info'
  }
});

const safeType = computed(() => {
  return containerTypes[props.type] ? props.type : 'info';
});

// const inputType = type ||

/*const props = defineProps({
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['info', 'warning','quiz','tip'].includes(value),
  }
});*/
</script>
