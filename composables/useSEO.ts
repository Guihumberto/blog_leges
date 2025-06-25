interface SEOData {
  title: string
  description: string
  keywords?: string
  ogImage?: string
  ogType?: string
  canonical?: string
}

export const useSEO = () => {
  const setSEO = (data: SEOData) => {
    const { title, description, keywords, ogImage, ogType = 'website', canonical } = data

    
    useHead({
      title,
      meta: [
        { name: 'description', content: description },
        { name: 'keywords', content: keywords || '' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: ogType },
        { property: 'og:image', content: ogImage || '/default-og-image.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: ogImage || '/default-og-image.jpg' }
      ]
    })

    if (canonical) {
      useHead({
        link: [
          { rel: 'canonical', href: canonical }
        ]
      })
    }
  }

  const setPostSEO = (post: any, baseUrl: string) => {
    const cleanContent = post.conteudo.replace(/<[^>]*>/g, '').substring(0, 160)
    
    setSEO({
      title: `${post.titulo} - Legislação Educacional`,
      description: cleanContent + '...',
      keywords: post.tags.join(', '),
      ogType: 'article',
      canonical: `${baseUrl}/post/${post.id}`
    })

    // Schema.org para artigos
    if (process.client) {
      const { $addJsonLd } = useNuxtApp()
      $addJsonLd({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.titulo,
        "description": cleanContent,
        "author": {
          "@type": "Organization",
          "name": "Legislação Educacional"
        },
        "datePublished": post?.createdAt,
        "dateModified": post?.createdAt,
        "keywords": post.tags.join(', '),
        "articleSection": post.disciplina,
        "about": {
          "@type": "Thing",
          "name": post.disciplina
        }
      })
    }
  }

  return {
    setSEO,
    setPostSEO
  }
}