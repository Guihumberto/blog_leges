<template>
  <v-container fluid style="max-width: 1080px;">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">Legislação Educacional</h1>
        <p class="text-subtitle-1 mb-6">
          Textos explicativos sobre legislação educacional organizados por disciplina, banca, concurso e cargo
        </p>
      </v-col>
    </v-row>
    
    <FilterPanel 
      :filters="filters" 
      :aggregations="aggregations"
      @update:filters="updateFilters"
    />
    
    <v-row>
      <v-col cols="12">
        <div v-if="pending" class="text-center py-8">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
          <p class="mt-4">Carregando posts...</p>
        </div>
        
        <div v-else-if="error" class="text-center py-8">
          <v-alert type="error" class="mb-4">
            Erro ao carregar os posts. Tente novamente.
          </v-alert>
        </div>
        
        <div v-else>
          <div class="d-flex justify-space-between align-center mb-4">
            <span class="text-subtitle-2">
              {{ totalPosts }} posts encontrados
            </span>
          </div>
          
          <div v-if="posts.length === 0" class="text-center py-8">
            <v-icon icon="mdi-file-search" size="64" class="text-medium-emphasis mb-4"></v-icon>
            <p class="text-h6">Nenhum post encontrado</p>
            <p class="text-body-2">Tente ajustar os filtros de busca</p>
          </div>
          
          <div v-else>
            <PostCard 
              v-for="post in posts" 
              :key="post._id" 
              :post="post" 
            />
            
            <div v-if="hasMorePosts" class="text-center mt-6">
              <v-btn 
                color="primary" 
                variant="outlined"
                :loading="loadingMore"
                @click="loadMore"
              >
                Carregar Mais
              </v-btn>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  // SEO
  useHead({
    title: 'Legislação Educacional - Posts Explicativos',
    meta: [
      { 
        name: 'description', 
        content: 'Explore textos explicativos sobre legislação educacional organizados por disciplina, banca, concurso e cargo. Encontre informações atualizadas para concursos públicos.' 
      },
      { 
        name: 'keywords', 
        content: 'legislação educacional, concursos públicos, direito educacional, leis de educação, normativas educacionais' 
      }
    ]
  })

  const { searchPosts, getAggregations } = useElasticsearch()

  // Estado reativo
  const posts = ref([])
  const aggregations = ref({})
  const totalPosts = ref(0)
  const currentPage = ref(1)
  const pending = ref(true)
  const error = ref(null)
  const loadingMore = ref(false)

  const filters = ref({
    search: '',
    disciplina: null,
    banca: null,
    concurso: null,
    cargo: null,
    area: null
  })

  // Computed
  const hasMorePosts = computed(() => {
    return posts.value.length < totalPosts.value
  })

  // Métodos
  const loadPosts = async (reset = true) => {
    try {
      if (reset) {
        pending.value = true
        currentPage.value = 1
      } else {
        loadingMore.value = true
      }

      const result = await searchPosts(filters.value, currentPage.value, 20)
      
      if (reset) {
        posts.value = result.hits
      } else {
        posts.value.push(...result.hits)
      }
      
      totalPosts.value = result.total.value
      error.value = null
    } catch (err) {
      error.value = err
      console.error('Erro ao carregar posts:', err)
    } finally {
      pending.value = false
      loadingMore.value = false
    }
  }

  const loadAggregations = async () => {
    try {
      aggregations.value = await getAggregations()
    } catch (err) {
      console.error('Erro ao carregar agregações:', err)
    }
  }

  const updateFilters = (newFilters: any) => {
    filters.value = { ...newFilters }
    loadPosts(true)
  }

  const loadMore = () => {
    currentPage.value++
    loadPosts(false)
  }

  // Lifecycle
  onMounted(async () => {
    await Promise.all([
      loadPosts(),
      loadAggregations()
    ])
  })
</script>