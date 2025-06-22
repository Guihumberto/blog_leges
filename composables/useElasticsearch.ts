export const useElasticsearch = () => {
  const config = useRuntimeConfig()

  const searchPosts = async (filters: any = {}, page: number = 1, size: number = 20) => {
    try {
      const query: any = {
        bool: {
          must: [],
          filter: []
        }
      }

      // Adicionar filtros
      if (filters.disciplina) {
        query.bool.filter.push({ term: { "disciplina.keyword": filters.disciplina } })
      }
      if (filters.banca) {
        query.bool.filter.push({ term: { "banca.keyword": filters.banca } })
      }
      if (filters.concurso) {
        query.bool.filter.push({ term: { "concurso.keyword": filters.concurso } })
      }
      if (filters.cargo) {
        query.bool.filter.push({ term: { "cargo.keyword": filters.cargo } })
      }
      if (filters.area) {
        query.bool.filter.push({ term: { "area.keyword": filters.area } })
      }
      if (filters.search) {
        query.bool.must.push({
          multi_match: {
            query: filters.search,
            fields: ["titulo^2", "texto_original", "palavras_chaves"]
          }
        })
      }

      const searchBody = {
        query: Object.keys(query.bool.must).length === 0 && Object.keys(query.bool.filter).length === 0 
          ? { match_all: {} } 
          : query,
        from: (page - 1) * size,
        size,
        sort: [{ timestamp: { order: "desc" } }],
        highlight: {
          fields: {
            texto_original: {},
            titulo: {}
          }
        }
      }

      const { data } = await $fetch('/api/elasticsearch/search', {
        method: 'POST',
        body: searchBody
      });

      return data
    } catch (error) {
      console.error('Erro na busca:', error)
      throw error
    }
  }

  const getAggregations = async () => {
    try {
      const { data } = await $fetch('/api/elasticsearch/aggregations')
      return data
    } catch (error) {
      console.error('Erro ao buscar agregações:', error)
      throw error
    }
  }

  return {
    searchPosts,
    getAggregations
  }
}