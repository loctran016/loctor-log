<script setup lang="ts">
// import DropDown from "./DropDown.vue";
// const colorMode = useColorMode()
</script>

<template>
  <nav
    class="w-screen select-none flex items-center px-4 lg:px-6 py-4 text-xl shadow-sm shadow-slate-300 dark:shadow-slate-700 drop-shadow-sm sticky top-0 bg-white dark:bg-zinc-950"
  >
    <h2 class="font-[Montserrat] lg:text-2xl ml-4 font-bold flex-grow <md:hidden ">
      <NuxtLink to="/" class="flex gap-4 items-center"><NuxtImg src="/logo.svg" placeholder-class="h-6 w-6" width="50px" preload/><span class="hover:text-white duration-300 transform-all">LocTor Log</span></NuxtLink> </h2>
    <!-- <DropDown>
      <template #title><span>Năm học</span></template>
      <ul>
        <li
          v-for="n in 1"
          :key="n"
          class="py-4 px-6 bg-white dark:bg-zinc-900 rounded mt-2 text-base font-normal"
        >
          <NuxtLink :to="`/y${n + 1}`">Năm {{ n + 1 }}</NuxtLink>
        </li>
      </ul>
    </DropDown> -->
    <button @click="$colorMode.preference = $colorMode.preference ==='light' ? 'dark':'light'" class="flex justify-center items-center text-gray-700 dark:text-gray-100 duration-200 transition-all rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 group w-12 h-12 text-4xl ">
    <!-- <Icon class="group-hover:rotate-12" v-if="$colorMode.value === 'system'" name="tabler:color-swatch"/> -->
    <Icon class="group-hover:rotate-12" v-if="$colorMode.value === 'light'" name="material-symbols-light:sunny-rounded"/>
    <Icon class="group-hover:rotate-12" v-else-if="$colorMode.value === 'dark'" name="material-symbols-light:dark-mode-rounded"/>
    </button>
  </nav>
</template>
