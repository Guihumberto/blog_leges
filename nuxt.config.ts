// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },

  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
    'vue3-mindmap/dist/style.css',
  ],
  build: {
    transpile: ['vuetify', 'vue3-mindmap'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },

  // SEO Configuration
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
      title: 'Blog Leges -  Estudo da Lei: Comentários e questões de concurso',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Textos explicativos sobre legislação educacional organizados por disciplina, banca, concurso e cargo'
        },
        { name: 'keywords', content: 'legislação, educação, concursos, direito educacional' },
        { name: 'author', content: 'Legislação Educacional' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'googlebot', content: 'index, follow' },
        { property: 'og:title', content: 'Blog Leges -  Estudo da Lei' },
        { property: 'og:description', content: 'Comentários e questões de concurso.' },
        { property: 'og:image', content: 'https://blogleges.estudodalei.com.br/og-image.jpg' },
        { property: 'og:url', content: 'https://blogleges.estudodalei.com.br/' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Blog Leges' },
        { property: 'og:locale', content: 'pt_BR' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Blog Leges - Estudo da Lei' },
        { name: 'twitter:description', content: 'Comentários e questões de concurso.' },
        { name: 'twitter:image', content: 'https://blogleges.estudodalei.com.br/og-image.jpg' }
      ],
      script: [
        // ResizeObserver polyfill for browser compatibility
        {
          src: 'https://cdn.jsdelivr.net/npm/resize-observer-polyfill@1.5.1/dist/ResizeObserver.min.js',
          defer: true
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Blog Leges - Estudo da Lei",
            "description": "Textos explicativos sobre legislação educacional organizados por disciplina, banca, concurso e cargo",
            "url": "https://blogleges.estudodalei.com.br",
            "publisher": {
              "@type": "Organization",
              "name": "Legislação Educacional",
              "url": "https://blogleges.estudodalei.com.br"
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://blogleges.estudodalei.com.br/?search={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }
      ]
    }
  },

  // Server-side rendering para SEO
  ssr: true,
  nitro: {
    prerender: {
      routes: ['/sitemap.xml'],
      failOnError: false
    }
  },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxtjs/google-fonts',
    '@nuxtjs/sitemap',
    '@nuxtjs/tailwindcss'
  ],


  googleFonts: {
    families: {
      Roboto: [300, 400, 500, 700]
    }
  },

  runtimeConfig: {
    elasticsearchNode: process.env.ELASTICSEARCH_NODE,
    elasticsearchUser: process.env.ELASTICSEARCH_USER,
    elasticsearchPassword: process.env.ELASTICSEARCH_PASSWORD,
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
      googleAnalytics: {
        id: process.env.GOOGLE_ANALYTICS_ID || ''
      }
    }
  },


})
