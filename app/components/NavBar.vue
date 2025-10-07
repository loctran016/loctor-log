<script setup lang="ts">
// import DropDown from "./DropDown.vue";
// const colorMode = useColorMode()
</script>

<template>
  <nav
    class="w-full select-none flex items-center px-4 lg:px-6 py-3 text-xl shadow-sm shadow-slate-300 dark:shadow-zinc-800 drop-shadow-md sticky top-0 bg-white dark:bg-zinc-950"
  >
    <h2 class="font-[Montserrat] lg:text-xl ml-4 font-bold flex-grow <md:hidden ">
      <NuxtLink to="/" class="flex gap-3 items-center max-w-max"><NuxtImg src="/logo.svg" placeholder-class="h-2 w-2" width="35px" preload/><span class="hover:text-white duration-300 transform-all">LocTor Log</span></NuxtLink> </h2>
    <!-- <a href="https://www.facebook.com/trantanloc016" target="_blank" class="flex justify-center items-center text-gray-700 dark:text-gray-100 duration-200 transition-all rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 group w-11 h-11 text-3xl ">
    <Icon class="" name="ic:round-facebook"/>
    </a>
    <a href="https://www.github.com/loctran016" target="_blank" class="flex justify-center items-center text-gray-700 dark:text-gray-100 duration-200 transition-all rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 group w-11 h-11 text-3xl ">
    <Icon class="" name="mdi:github"/>
    </a> -->

    <button @click="$colorMode.preference = $colorMode.preference ==='light' ? 'dark':'light'" class="flex justify-center items-center text-gray-700 dark:text-gray-100 duration-200 transition-all rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 group w-11 h-11 text-3xl ">
    <!-- <Icon class="group-hover:rotate-12" v-if="$colorMode.value === 'system'" name="tabler:color-swatch"/> -->
    <Icon class="group-hover:rotate-12" v-if="$colorMode.value === 'light'" name="material-symbols-light:sunny-rounded"/>
    <Icon class="group-hover:rotate-12" v-else-if="$colorMode.value === 'dark'" name="material-symbols-light:dark-mode-rounded"/>
    </button>
  </nav>
</template>
