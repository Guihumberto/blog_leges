import { Client } from '@elastic/elasticsearch'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')

  const client = new Client({
    node: config.elasticsearchNode,
    auth: {
      username: config.elasticsearchUser,
      password: config.elasticsearchPassword
    }
  })

  try {
    const response = await client.get({
      index: 'blog_law_v2',
      id: id
    })

    return {
      data: response._source
    }
  } catch (error) {
    if (error.statusCode === 404) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Post não encontrado'
      })
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao buscar post'
    })
  }
})