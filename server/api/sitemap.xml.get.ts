import { Client } from '@elastic/elasticsearch'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  setHeader(event, 'content-type', 'application/xml')

  const client = new Client({
    node: config.elasticsearchNode,
    auth: {
      apiKey: config.elasticsearchApiKey
    }
  })

  try {
    // Buscar todos os posts para o sitemap
    const response = await client.search({
      index: 'legislacao_posts',
      body: {
        query: { match_all: {} },
        _source: ['createdAt'],
        size: 10000
      }
    })

    const baseUrl = 'https://blogleges.estudodalei.com.br' // Domínio do blog
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`

    // Adicionar URLs dos posts
    response.hits.hits.forEach((hit: any) => {
      sitemap += `
  <url>
    <loc>${baseUrl}/post/${hit._id}</loc>
    <lastmod>${hit._source.createdAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
    })

    sitemap += '\n</urlset>'

    return sitemap
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao gerar sitemap'
    })
  }
})
