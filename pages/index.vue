<template>
  <v-container fluid style="max-width: 1080px;">
      <v-row class="blog-header" no-gutters>
        <v-col cols="12">
          <div class="header-container">
            <!-- Seção do conteúdo -->
            <div class="content-section">
              <!-- <div class="icon-wrapper">
                <v-icon size="48" color="primary">mdi-scale-balance</v-icon>
              </div> -->
              <div class="text-content">
                <h1 class="blog-title">Blog Estudo da Lei</h1>
                <p class="blog-subtitle">
                  Textos explicativos e questões sobre legislação para concursos
                  <br>
                  <span class="highlight-text">Organizado por disciplina, banca, concurso e cargo</span>
                </p>
              </div>
            </div>
            
            <!-- Seção da imagem ilustrativa -->
            <div class="image-section">
              <div class="law-illustration">
                <v-icon size="120" color="grey-lighten-2">mdi-gavel</v-icon>
                <div class="decorative-lines">
                  <div class="line line-1"></div>
                  <div class="line line-2"></div>
                  <div class="line line-3"></div>
                </div>
              </div>
            </div>
          </div>
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

<style scoped>
.blog-header {
  background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
  border-bottom: 1px solid #e0e0e0;
  padding: 2rem 0;
  margin-bottom: 2rem;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  gap: 3rem;
}

.content-section {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.icon-wrapper {
  background: rgba(33, 150, 243, 0.1);
  border-radius: 50%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  height: 80px;
}

.text-content {
  flex: 1;
}

.blog-title {
  font-size: 2.5rem !important;
  font-weight: 700 !important;
  color: #263238 !important;
  margin-bottom: 0.75rem !important;
  line-height: 1.2 !important;
  letter-spacing: -0.02em;
}

.blog-subtitle {
  font-size: 1.1rem !important;
  color: #546e7a !important;
  line-height: 1.6 !important;
  margin: 0 !important;
  font-weight: 400 !important;
}

.highlight-text {
  color: #37474f;
  font-weight: 500;
}

.image-section {
  flex-shrink: 0;
  position: relative;
}

.law-illustration {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 150px;
}

.decorative-lines {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.line {
  position: absolute;
  background: linear-gradient(90deg, transparent, #e0e0e0, transparent);
  height: 1px;
}

.line-1 {
  top: 30%;
  left: -20px;
  right: -20px;
  opacity: 0.6;
}

.line-2 {
  top: 50%;
  left: -30px;
  right: -30px;
  opacity: 0.4;
}

.line-3 {
  top: 70%;
  left: -20px;
  right: -20px;
  opacity: 0.6;
}

/* Responsividade */
@media (max-width: 960px) {
  .header-container {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
  
  .content-section {
    flex-direction: column;
    gap: 1rem;
  }
  
  .blog-title {
    font-size: 2rem !important;
  }
  
  .image-section {
    display: none;
  }
}

@media (max-width: 600px) {
  .blog-header {
    padding: 1.5rem 0;
  }
  
  .header-container {
    padding: 0 1rem;
  }
  
  .blog-title {
    font-size: 1.75rem !important;
  }
  
  .blog-subtitle {
    font-size: 1rem !important;
  }
  
  .icon-wrapper {
    min-width: 60px;
    height: 60px;
    padding: 0.75rem;
  }
}</style>