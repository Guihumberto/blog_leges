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
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' }
      ],
      title: 'Estudo da Lei - Blog Leges: Legislação Educacional, Comentários e Questões de Concurso',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Estudo da Lei - Blog especializado em legislação educacional com textos explicativos, comentários detalhados e questões de concurso. Conteúdo organizado por disciplina, banca e cargo para concursos públicos.'
        },
        { 
          name: 'keywords', 
          content: 'estudo da lei, blog estudo da lei, legislação educacional, concursos públicos, direito educacional, leis de educação, normativas educacionais, questões de concurso, comentários jurídicos, preparação concurso, estudo legislação, blog leges, leis comentadas, artigos lei, preparação concurso público'
        },
        { name: 'author', content: 'Blog Leges - Estudo da Lei' },
        { name: 'publisher', content: 'Legislação Educacional' },
        { name: 'language', content: 'pt-BR' },
        { name: 'geo.region', content: 'BR' },
        { name: 'geo.country', content: 'Brazil' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'googlebot', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
        { name: 'bingbot', content: 'index, follow' },
        { name: 'theme-color', content: '#1976d2' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { property: 'og:title', content: 'Estudo da Lei - Blog Leges: Legislação Educacional e Concursos' },
        { property: 'og:description', content: 'Blog especializado em estudo da lei com conteúdo sobre legislação educacional, comentários detalhados e questões de concurso para preparação em concursos públicos.' },
        { property: 'og:image', content: 'https://blogleges.estudodalei.com.br/og-image.jpg' },
        { property: 'og:image:alt', content: 'Blog Leges - Estudo da Lei: Legislação Educacional' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:url', content: 'https://blogleges.estudodalei.com.br/' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Blog Leges - Estudo da Lei' },
        { property: 'og:locale', content: 'pt_BR' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Estudo da Lei - Blog Leges: Legislação Educacional' },
        { name: 'twitter:description', content: 'Blog especializado em estudo da lei com legislação educacional, comentários e questões de concurso.' },
        { name: 'twitter:image', content: 'https://blogleges.estudodalei.com.br/og-image.jpg' },
        { name: 'twitter:image:alt', content: 'Blog Leges - Estudo da Lei' }
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
            "@type": ["WebSite", "Blog"],
            "name": "Blog Leges - Estudo da Lei",
            "alternateName": ["Estudo da Lei", "Blog Estudo da Lei", "Leges", "Legislação Educacional"],
            "description": "Blog especializado em estudo da lei com textos explicativos sobre legislação educacional, comentários detalhados e questões de concurso organizados por disciplina, banca e cargo.",
            "url": "https://blogleges.estudodalei.com.br",
            "mainEntityOfPage": "https://blogleges.estudodalei.com.br",
            "keywords": "estudo da lei, blog estudo da lei, legislação educacional, concursos públicos, direito educacional, leis comentadas, questões de concurso",
            "inLanguage": "pt-BR",
            "genre": ["Educação", "Direito", "Legislação", "Concursos"],
            "audience": {
              "@type": "EducationalAudience",
              "educationalRole": ["student", "teacher", "professional"],
              "audienceType": "Concurseiros e profissionais da educação"
            },
            "publisher": {
              "@type": "Organization", 
              "name": "Blog Leges",
              "alternateName": "Estudo da Lei",
              "url": "https://blogleges.estudodalei.com.br",
              "logo": {
                "@type": "ImageObject",
                "url": "https://blogleges.estudodalei.com.br/leges.png",
                "width": 512,
                "height": 512
              },
              "sameAs": [
                "https://blogleges.estudodalei.com.br"
              ]
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://blogleges.estudodalei.com.br/?search={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "mainEntity": {
              "@type": "ItemList",
              "name": "Posts sobre Legislação Educacional",
              "description": "Artigos e posts sobre estudo da lei, legislação educacional e questões de concurso"
            },
            "about": [
              {
                "@type": "Thing",
                "name": "Legislação Educacional",
                "sameAs": "https://pt.wikipedia.org/wiki/Legisla%C3%A7%C3%A3o_educacional"
              },
              {
                "@type": "Thing", 
                "name": "Concursos Públicos",
                "sameAs": "https://pt.wikipedia.org/wiki/Concurso_p%C3%BAblico"
              },
              {
                "@type": "Thing",
                "name": "Direito Educacional" 
              }
            ]
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
