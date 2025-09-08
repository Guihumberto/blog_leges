import { Client } from '@elastic/elasticsearch'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  setHeader(event, 'content-type', 'application/xml')

  const client = new Client({
    node: config.elasticsearchNode,
    auth: {
      username: config.elasticsearchUser,
      password: config.elasticsearchPassword
    }
  })

  // Função para gerar slug amigável
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim()
      .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
  }

  try {
    // Buscar todos os posts para o sitemap com mais campos para gerar URLs amigáveis
    const response = await client.search({
      index: 'legislacao_posts',
      body: {
        query: { match_all: {} },
        _source: ['titulo', 'disciplina', 'timestamp', 'createdAt', 'palavras_chaves', 'banca', 'concurso'],
        size: 10000,
        sort: [
          { timestamp: { order: 'desc' } }
        ]
      }
    })

    const baseUrl = 'https://blogleges.estudodalei.com.br' // Domínio do blog
    const currentDate = new Date().toISOString()
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`

    // Adicionar URLs das categorias principais
    const categories = ['legislacao-educacional', 'concursos-publicos', 'direito-educacional', 'estudo-da-lei']
    categories.forEach(category => {
      sitemap += `
  <url>
    <loc>${baseUrl}/?disciplina=${category}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    })

    // Adicionar URLs dos posts com slugs otimizados
    response.hits.hits.forEach((hit: any) => {
      const post = hit._source
      const slug = generateSlug(post.titulo || 'post')
      const postDate = post.timestamp || post.createdAt || currentDate
      
      // URL principal do post com slug amigável
      sitemap += `
  <url>
    <loc>${baseUrl}/post/${slug}-${hit._id}</loc>
    <lastmod>${postDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>${baseUrl}/og-image.jpg</image:loc>
      <image:title>${post.titulo || 'Estudo da Lei - Blog Leges'}</image:title>
      <image:caption>Artigo sobre ${post.disciplina || 'legislação educacional'} para concursos públicos</image:caption>
    </image:image>
  </url>`
      
      // URL alternativa (compatibilidade com ID apenas)
      sitemap += `
  <url>
    <loc>${baseUrl}/post/${hit._id}</loc>
    <lastmod>${postDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
    })

    sitemap += '\n</urlset>'

    return sitemap
  } catch (error) {
    console.error('Erro ao gerar sitemap:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao gerar sitemap'
    })
  }
})
