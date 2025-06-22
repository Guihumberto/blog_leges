import { Client } from '@elastic/elasticsearch'

const config = useRuntimeConfig()

const client = new Client({
  node: config.elasticsearchNode,
  auth: {
    username: config.elasticsearchUser,
    password: config.elasticsearchPassword
  }
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
      const response = await client.search({
        index: 'blog_law_v2',
        body
      })

    return {
      data: {
        hits: response.hits.hits,
        total: response.hits.total,
        aggregations: response.aggregations
      }
    }
  } catch (error: any) {
    console.error('Erro na consulta Elasticsearch:', error.meta?.body?.error || error);
    throw createError({
      statusCode: 500,
      statusMessage: error.meta?.body?.error?.reason || 'Erro na consulta Elasticsearch'
    });
  }
})

