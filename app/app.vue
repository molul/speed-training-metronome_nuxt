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

useSeoMeta({
  title: 'Speed Training Metronome',
  ogTitle: 'Speed Training Metronome',
  description: 'A high-performance metronome designed for speed training and musical precision.',
  ogDescription: 'A high-performance metronome designed for speed training and musical precision.',
  ogImage: 'https://speed-training-metronome.vercel.app/social-card.png',
  twitterCard: 'summary_large_image',
})
</script>

