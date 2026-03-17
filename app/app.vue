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
  title: "Speed Training Metronome | Free online metronome for improving speed",
  ogTitle: "Speed Training Metronome | Free online metronome for improving speed",
  description:
    "The ultimate free online metronome for musicians. Improve your speed and keep perfect rhythm with our easy-to-use, highly customizable training tool.",
  ogDescription:
    "The ultimate free online metronome for musicians. Improve your speed and keep perfect rhythm with our easy-to-use, highly customizable training tool.",
  ogImage: "https://speed-training-metronome.vercel.app/social-card.png",
  twitterCard: "summary_large_image",
});

// useScriptGoogleTagManager({
//   id: "G-48PRP8WFCL",
// });
</script>
