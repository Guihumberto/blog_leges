// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },

  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  build: {
    transpile: ['vuetify'],
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
        { property: 'og:title', content: 'Blog Leges -  Estudo da Lei' },
        { property: 'og:description', content: 'Comentários e questões de concurso.' },
        { property: 'og:image', content: 'https://blogleges.estudodalei.com.br/og-image.jpg' },
        { property: 'og:url', content: 'https://blogleges.estudodalei.com.br/' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' }
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
    '@nuxtjs/sitemap'
  ],
  sitemap: {
    siteUrl: 'https://legislacao.estudodalei.com.br',
  },

  site: {
    url: 'https://legislacao.estudodalei.com.br'  
  },

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
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api'
    }
  }
})