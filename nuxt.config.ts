import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";
import tailwindcss from "@tailwindcss/vite";

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
  ssr: true,
  nitro: {
    prerender: {
      routes: ["/"], // Genera el HTML real de la home al compilar
    },
  },
  sourcemap: {
    server: false,
    client: false,
  },
  app: {
    head: {
      title: "Speed Training Metronome",
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "UTF-8" },
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover",
        },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black-translucent",
        },
        // Theme colors for PWA
        {
          name: "theme-color",
          content: "#fff",
          media: "(prefers-color-scheme: light)",
        },
        {
          name: "theme-color",
          content: "#18181b",
          media: "(prefers-color-scheme: dark)",
        },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/metronome-favicon.svg" },
        { rel: "manifest", href: "/manifest.webmanifest" },
        { rel: "apple-touch-icon", href: "/icon-192x192.png" },
      ],
      // This handles your Google Analytics setup
      script: [
        {
          src: "https://www.googletagmanager.com/gtag/js?id=G-48PRP8WFCL",
          async: true,
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-48PRP8WFCL');
          `,
          type: "text/javascript",
        },
      ],
    },
  },
  css: ["~/style.css"],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxt/icon",
    "@primevue/nuxt-module",
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/sitemap",
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  icon: {
    clientBundle: {
      scan: true,
    },
  },
  colorMode: {
    classSuffix: "",
  },
  site: {
    url: "https://speed-training-metronome-vue.vercel.app/",
    name: "Speed Training Metronome",
  },
  primevue: {
    autoImport: true,
    options: {
      ripple: true,
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: ".dark",
        },
      },
    },
  },
});
