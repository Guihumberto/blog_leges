// Plugin para melhorias adicionais de SEO
export default defineNuxtPlugin(() => {
  const route = useRoute()
  const router = useRouter()

  // Adicionar dados estruturados para breadcrumbs
  const addBreadcrumbStructuredData = () => {
    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Início",
          "item": "https://blogleges.estudodalei.com.br/"
        }
      ]
    }

    if (route.path.startsWith('/post/')) {
      breadcrumbData.itemListElement.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Posts",
        "item": "https://blogleges.estudodalei.com.br/"
      })
    }

    // Adicionar o script de dados estruturados
    useHead({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(breadcrumbData)
        }
      ]
    })
  }

  // Adicionar FAQ estruturado para página inicial
  const addFAQStructuredData = () => {
    if (route.path === '/') {
      const faqData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "O que é o Blog Leges - Estudo da Lei?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O Blog Leges é um blog especializado em estudo da lei com foco em legislação educacional, oferecendo textos explicativos, comentários detalhados e questões de concurso organizadas por disciplina, banca e cargo para concursos públicos."
            }
          },
          {
            "@type": "Question", 
            "name": "Como funciona o estudo da lei no blog?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Nosso conteúdo de estudo da lei é organizado de forma didática, com explicações claras sobre legislação educacional, comentários de especialistas e questões práticas para auxiliar na preparação para concursos públicos."
            }
          },
          {
            "@type": "Question",
            "name": "Quais tipos de conteúdo encontro no Blog Estudo da Lei?",
            "acceptedAnswer": {
              "@type": "Answer", 
              "text": "Você encontra textos explicativos sobre legislação educacional, comentários detalhados de leis, questões de concurso com gabarito comentado, material organizado por disciplina, banca organizadora, concurso e cargo específico."
            }
          },
          {
            "@type": "Question",
            "name": "O conteúdo é gratuito?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim, todo o conteúdo do Blog Leges - Estudo da Lei é gratuito e acessível, com o objetivo de democratizar o acesso ao conhecimento sobre legislação educacional para concursos públicos."
            }
          }
        ]
      }

      useHead({
        script: [
          {
            type: 'application/ld+json',
            innerHTML: JSON.stringify(faqData)
          }
        ]
      })
    }
  }

  // Adicionar dados de organização
  const addOrganizationStructuredData = () => {
    const organizationData = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "Blog Leges - Estudo da Lei",
      "alternateName": ["Estudo da Lei", "Blog Estudo da Lei", "Leges"],
      "url": "https://blogleges.estudodalei.com.br",
      "logo": "https://blogleges.estudodalei.com.br/leges.png",
      "description": "Blog especializado em estudo da lei com foco em legislação educacional para concursos públicos",
      "sameAs": [
        "https://blogleges.estudodalei.com.br"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": "Portuguese"
      },
      "areaServed": "Brazil",
      "educationalCredentialAwarded": "Conhecimento em Legislação Educacional",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Conteúdo Educacional Gratuito",
        "itemListElement": [
          {
            "@type": "Course",
            "name": "Legislação Educacional",
            "description": "Conteúdo sobre leis e normativas da educação",
            "provider": {
              "@type": "Organization",
              "name": "Blog Leges"
            }
          }
        ]
      }
    }

    useHead({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(organizationData)
        }
      ]
    })
  }

  // Função para melhorar loading e performance
  const optimizePageLoad = () => {
    // Preload de recursos importantes
    useHead({
      link: [
        { rel: 'preload', href: '/leges.png', as: 'image', type: 'image/png' },
        { rel: 'preload', href: '/og-image.jpg', as: 'image', type: 'image/jpeg' }
      ]
    })
  }

  // Executar melhorias baseadas na rota
  router.afterEach((to) => {
    nextTick(() => {
      addBreadcrumbStructuredData()
      addFAQStructuredData()
      addOrganizationStructuredData()
      optimizePageLoad()
      
      // Adicionar canonical dinâmico se não existir
      if (!document.querySelector('link[rel="canonical"]')) {
        useHead({
          link: [
            { rel: 'canonical', href: `https://blogleges.estudodalei.com.br${to.path}` }
          ]
        })
      }
    })
  })

  // Executar na inicialização também
  if (process.client) {
    onMounted(() => {
      addBreadcrumbStructuredData()
      addFAQStructuredData() 
      addOrganizationStructuredData()
      optimizePageLoad()
    })
  }
})
