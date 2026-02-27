<script setup lang="ts">
import MyButton from "./MyButton.vue";

// Nuxt Color Mode gives us a reactive object
const colorMode = useColorMode();

// Computed property to check if we are currently dark
// colorMode.value will be 'system', 'light', or 'dark'
const isDark = computed(() => colorMode.value === "dark");

const toggleTheme = () => {
  // We simply change the value; the module handles the CSS class and LocalStorage
  colorMode.preference = isDark.value ? "light" : "dark";
};
</script>

<template>
  <MyButton
    @click="toggleTheme"
    severity="secondary"
    :full-width="true"
    :label="isDark ? 'Light theme' : 'Dark theme'"
    :aria-label="isDark ? 'Light theme' : 'Dark theme'"
    :icon="isDark ? 'solar:sun-bold' : 'solar:moon-bold'"
  />
</template>
