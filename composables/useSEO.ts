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
    const cleanContent = post.texto ? post.texto.replace(/<[^>]*>/g, '').substring(0, 160) : post.conteudo?.replace(/<[^>]*>/g, '').substring(0, 160) || ''
    const keywords = post.palavras_chaves ? post.palavras_chaves.join(', ') : (post.tags ? post.tags.join(', ') : '')
    const postUrl = `${baseUrl}/post/${post.id || post._id}`
    
    // Gerar slug do título para URL amigável
    const generateSlug = (title: string) => {
      return title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
        .replace(/^-|-$/g, '')
    }
    
    const slug = generateSlug(post.titulo)
    const canonicalUrl = `${baseUrl}/post/${slug}-${post.id || post._id}`
    
    setSEO({
      title: `${post.titulo} - Estudo da Lei | Blog Leges`,
      description: cleanContent + '... | Blog especializado em estudo da lei e legislação educacional para concursos públicos.',
      keywords: `${keywords}, estudo da lei, blog estudo da lei, legislação educacional, ${post.disciplina}, concursos públicos, ${post.banca || ''}, ${post.concurso || ''}, questões de concurso`,
      ogType: 'article',
      canonical: canonicalUrl,
      ogImage: 'https://blogleges.estudodalei.com.br/og-image.jpg'
    })

    // Schema.org para artigos - versão melhorada
    if (process.client) {
      const { $addJsonLd } = useNuxtApp()
      $addJsonLd({
        "@context": "https://schema.org",
        "@type": ["Article", "BlogPosting", "EducationalResource"],
        "headline": post.titulo,
        "description": cleanContent,
        "alternativeHeadline": `${post.titulo} - Estudo da Lei`,
        "keywords": `${keywords}, estudo da lei, legislação educacional`,
        "url": canonicalUrl,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": canonicalUrl
        },
        "image": {
          "@type": "ImageObject",
          "url": "https://blogleges.estudodalei.com.br/og-image.jpg",
          "width": 1200,
          "height": 630
        },
        "author": {
          "@type": "Organization",
          "name": "Blog Leges - Estudo da Lei",
          "url": "https://blogleges.estudodalei.com.br",
          "logo": {
            "@type": "ImageObject",
            "url": "https://blogleges.estudodalei.com.br/leges.png"
          }
        },
        "publisher": {
          "@type": "Organization",
          "name": "Blog Leges - Estudo da Lei",
          "url": "https://blogleges.estudodalei.com.br",
          "logo": {
            "@type": "ImageObject",
            "url": "https://blogleges.estudodalei.com.br/leges.png",
            "width": 512,
            "height": 512
          }
        },
        "datePublished": post?.timestamp || post?.createdAt || new Date().toISOString(),
        "dateModified": post?.timestamp || post?.createdAt || new Date().toISOString(),
        "articleSection": post.disciplina || "Legislação Educacional",
        "articleBody": cleanContent,
        "wordCount": cleanContent.split(' ').length,
        "inLanguage": "pt-BR",
        "isAccessibleForFree": true,
        "educationalLevel": "intermediate",
        "learningResourceType": ["Article", "Reading"],
        "educationalUse": ["study", "research", "reference"],
        "audience": {
          "@type": "EducationalAudience",
          "educationalRole": ["student", "teacher", "professional"],
          "audienceType": "Concurseiros e profissionais da educação"
        },
        "about": [
          {
            "@type": "Thing",
            "name": post.disciplina || "Legislação Educacional",
            "description": `Conteúdo sobre ${post.disciplina || "legislação educacional"} para concursos públicos`
          },
          {
            "@type": "Thing",
            "name": "Estudo da Lei",
            "description": "Material de estudo sobre legislação para concursos públicos"
          }
        ],
        "mentions": [
          ...(post.banca ? [{
            "@type": "Organization",
            "name": post.banca,
            "description": `Banca organizadora de concursos públicos`
          }] : []),
          ...(post.concurso ? [{
            "@type": "Thing",
            "name": post.concurso,
            "description": `Concurso público`
          }] : []),
          ...(post.cargo ? [{
            "@type": "Thing", 
            "name": post.cargo,
            "description": `Cargo público`
          }] : [])
        ],
        "isPartOf": {
          "@type": "Blog",
          "name": "Blog Leges - Estudo da Lei",
          "url": "https://blogleges.estudodalei.com.br",
          "description": "Blog especializado em estudo da lei e legislação educacional"
        }
      })
    }
  }

  return {
    setSEO,
    setPostSEO
  }
}
