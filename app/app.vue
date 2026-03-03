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
  title: "Speed Training Metronome",
  ogTitle: "Speed Training Metronome",
  description:
    "The ultimate metronome for musicians. Practice scales, improve your speed, and keep perfect rhythm with our easy-to-use, high-performance training tool.",
  ogDescription:
    "The ultimate metronome for musicians. Practice scales, improve your speed, and keep perfect rhythm with our easy-to-use, high-performance training tool.",
  ogImage: "https://speed-training-metronome.vercel.app/social-card.png",
  twitterCard: "summary_large_image",
});

useScriptGoogleTagManager({
  id: "G-48PRP8WFCL",
});
</script>
