import { Client } from '@elastic/elasticsearch'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const client = new Client({
    node: config.elasticsearchNode,
    auth: {
      username: config.elasticsearchUser,
      password: config.elasticsearchPassword
    }
  })

  try {
    const response = await client.search({
      index: 'blog_law_v2',
      body: {
        size: 0,
        aggs: {
          disciplinas: { terms: { field: "disciplina.keyword", size: 100 } },
          // bancas: { terms: { field: "banca.keyword", size: 100 } },
          // concursos: { terms: { field: "concurso.keyword", size: 100 } },
          // cargos: { terms: { field: "cargo.keyword", size: 100 } },
          // areas: { terms: { field: "area.keyword", size: 100 } }
        }
      }
    })

    return {
      data: response.aggregations
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao buscar agregações'
    })
  }
})