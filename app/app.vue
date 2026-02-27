<template>
  <div class="size-full min-h-svh flex items-center justify-center">
    <NuxtPage />
    <DynamicDialog />
  </div>
</template>

<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: "size-full bg-white dark:bg-zinc-900 mx-auto",
  },
});
</script>
