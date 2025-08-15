// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: {
      name: "layout",
      mode: "out-in", // default
      },
      head: {
        // title: 'Nuxt', // default fallback title
        // htmlAttrs: {
        //   lang: 'en',
        // },
        link: [
              { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes:'96x96' },
              { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
            //   { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
              { rel: 'shortcut icon',  href: '/favicon.ico' },
              { rel: 'apple-touch-icon', sizes:"180x180", href: '/apple-touch-icon.png' },
              { rel: 'manifest', href: 'site.webmanifest' },
        ]
      }
  },

  tailwindcss: {
    cssPath: [`~/assets/css/tailwind.css`, { injectPosition: "first" }],
    // config: {},
    // viewer: true,
    // exposeConfig: false,
  },

  content: {
    experimental: { sqliteConnector: "native" },
    build: {
      markdown: {
            remarkPlugins: {
              'remark-gfm': {
                    options: {
                        singleTilde: false
                  },
            },
        },
        rehypePlugins: {},
        toc: {
          depth: 3, // include h3 headings
        },
        highlight: false,
      },
    },
  },

  site: {
    url: 'https://loctorloc.vercel.app',
    name: 'LocTor Log',
    description: 'Loc\'s log on the way to become a doctor at UMP!!!',
    defaultLocale: 'vi', // not needed if you have @nuxtjs/i18n installed
  },

  modules: [
    "@nuxt/content",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
      '@nuxtjs/seo',
    '@vueuse/nuxt',
      // "nuxt-svgo",
    // not sure why?
  ],
});
