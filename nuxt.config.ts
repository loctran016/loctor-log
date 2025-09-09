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

hooks: {
    'content:file:beforeParse'(ctx) {
      const { file } = ctx;

      if (file.id.endsWith(".md")) {
        file.body = file.body.replace(/<!--[\s\S]*?-->/g,'').replace(/<->/gi,'↔').replace(/<=>/gi,'⇔').replace(/->/gi, "→").replace(/=>/gi,'⇒').replace(/alpha/gi, "α").replace(/beta/gi, "β").replace(/gamma/gi,'γ').replace(/>=/gi,'≥')
      }
    },},

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
            'remark-flexible-markers': {
              },
            'remark-emoji': {}
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


//     fonts: {
//         families: [
//             { name:'Montserrat', weights: [400,600,700], provider: 'google'},
//             { name:'Open Sans', weights: [400,700]}
//         ]
//   },
  modules: [
    "@nuxt/content",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/device",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    '@nuxtjs/seo',
    '@vueuse/nuxt',
      // "nuxt-svgo",
    // not sure why?
  ],
});
