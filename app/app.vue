<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
    opacity: 0;
  filter: blur(1rem);

}

html:has(.layout-leave-to),
html:has(.layout-enter-from)
{
    overflow:hidden;
}
/* .layout-leave-to {
  transform: translateX(-100%);
  z-index:-10;
} */
</style>
