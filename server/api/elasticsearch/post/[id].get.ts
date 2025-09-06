import { Client } from '@elastic/elasticsearch'

interface PostData {
  id_law?: string
  art?: string
  [key: string]: any
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID do post é obrigatório'
    })
  }

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

    const postData = response._source as PostData

    let mindMap = null
    if (postData.id_law && postData.art) {
      try {
        const mindMapResponse = await client.search({
          index: 'mind_maps',
          body: {
            query: {
              bool: {
                must: [
                  { match: { id: postData.id_law } },
                  { match: { art: postData.art } },
                  { match: { typeGuide: "laws_mapmind" } }
                ]
              }
            }
          }
        })

        console.log('mindMapResponse', mindMapResponse);

        if (mindMapResponse.hits.hits.length > 0) {
          mindMap = mindMapResponse.hits.hits[0]._source
        }
      } catch (mindMapError) {
        // Mind map not found or error, continue without it
        console.log('Mind map not found for id_law:', postData.id_law, 'art:', postData.art)
      }
    }

    return {
      data: postData,
      mindMap: mindMap
    }
  } catch (error: any) {
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
