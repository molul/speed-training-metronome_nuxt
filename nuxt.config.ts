import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";

// https://nuxt.com/docs/api/configuration/nuxt-config
const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{blue.50}",
      100: "{blue.100}",
      200: "{blue.200}",
      300: "{blue.300}",
      400: "{blue.400}",
      500: "{blue.500}",
      600: "{blue.600}",
      700: "{blue.700}",
      800: "{blue.800}",
      900: "{blue.900}",
      950: "{blue.950}",
      color: "{yellow.700}",
    },
    button: {
      primary: {
        background: "{yellow.700}",
        color: "{blue.50}",
      },
    },
  },
});

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxt/icon",
    "@nuxtjs/tailwindcss",
    "@primevue/nuxt-module",
    "@vueuse/nuxt",
  ],
  primevue: {
    options: {
      ripple: true,
      theme: {
        preset: MyPreset,
        options: {
          // This is the magic line for PrimeVue 4
          darkModeSelector: ".dark",
        },
      },
    },
  },
});
